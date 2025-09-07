import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import type { IDoubleTokenRes } from '@/api/types/login'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import VueHook from 'alova/vue'
import { nextTick } from 'vue'
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { isDoubleTokenMode } from '@/utils'
import { createApis, mountApis, withConfigType } from './createApis'

// 业务状态码枚举
export enum ResultEnum {
  Success = 0, // 成功
  Error = 400, // 错误
  Unauthorized = 401, // 未授权
  Forbidden = 403, // 禁止访问
  NotFound = 404, // 未找到
  InternalServerError = 500, // 服务器错误
}

// Content-Type 枚举
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

// 刷新 token 状态管理
let refreshing = false // 防止重复刷新 token 标识
let taskQueue: (() => void)[] = [] // 刷新 token 请求队列

/**
 * 根据状态码生成错误信息
 */
function getErrorMessage(status: number | string): string {
  const statusMap: Record<number, string> = {
    400: '请求错误(400)',
    401: '未授权，请重新登录(401)',
    403: '拒绝访问(403)',
    404: '请求出错(404)',
    408: '请求超时(408)',
    500: '服务器错误(500)',
    501: '服务未实现(501)',
    502: '网络错误(502)',
    503: '服务不可用(503)',
    504: '网络超时(504)',
    505: 'HTTP版本不受支持(505)',
  }
  const message = statusMap[Number(status)] || `连接出错(${status})!`
  return `${message}，请检查网络或联系管理员！`
}

/**
 * 创建带认证的请求实例
 */
const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
  typeof VueHook,
  typeof uniappRequestAdapter
>({
  refreshTokenOnError: {
    isExpired: (error) => {
      return error.response?.statusCode === ResultEnum.Unauthorized
        || error.response?.data?.code === ResultEnum.Unauthorized
    },
    handler: async () => {
      try {
        const tokenStore = useTokenStore()
        if (isDoubleTokenMode) {
          await tokenStore.refreshToken()
        }
        else {
          throw new Error('Token refresh failed')
        }
      }
      catch (error) {
        // 刷新失败，跳转到登录页
        uni.reLaunch({ url: LOGIN_PAGE })
        throw error
      }
    },
  },
})

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:5005',
  ...AdapterUniapp(),
  timeout: 10000, // 10秒超时
  statesHook: VueHook,

  beforeRequest: onAuthRequired((method) => {
    const tokenStore = useTokenStore()

    // 设置默认 Content-Type
    method.config.headers = {
      'Content-Type': ContentTypeEnum.JSON,
      'Accept': 'application/json, text/plain, */*',
      ...method.config.headers,
    }

    // 处理认证信息
    const { config } = method
    const ignoreAuth = config.meta?.ignoreAuth !== true

    if (ignoreAuth) {
      const token = tokenStore.validToken
      if (token) {
        // 根据后端要求设置 token 头部，这里使用 Authorization
        method.config.headers.Authorization = `Bearer ${token}`
        // 或者使用其他字段名，如：
        // method.config.headers.token = token
      }
      else if (!config.meta?.allowAnonymous) {
        // 如果没有 token 且不允许匿名访问，抛出错误
        throw new Error('[请求错误]：未登录')
      }
    }

    // 处理动态域名
    if (config.meta?.domain) {
      method.baseURL = config.meta.domain
      console.log('当前域名', method.baseURL)
    }
  }),

  responded: onResponseRefreshToken(async (response, method) => {
    const { config } = method
    const { requestType } = config
    const {
      statusCode,
      data: rawData,
      errMsg,
    } = response as UniNamespace.RequestSuccessCallbackResult

    // 处理特殊请求类型（上传/下载）
    if (requestType === 'upload' || requestType === 'download') {
      return response
    }

    // 处理 HTTP 状态码错误
    if (statusCode !== 200) {
      const errorMessage = getErrorMessage(statusCode)
      console.error('HTTP错误===>', errorMessage, errMsg)

      // 根据配置决定是否显示错误提示
      if (config.meta?.hideErrorToast !== true) {
        uni.showToast({
          title: errorMessage,
          icon: 'error',
        })
      }
      throw new Error(`${errorMessage}：${errMsg}`)
    }

    // 处理业务逻辑错误
    const responseData = rawData as IResAdminData<any>

    // 检查是否是标准的业务响应格式
    if (responseData && typeof responseData === 'object' && 'code' in responseData) {
      const { code, message, result } = responseData

      // 处理 401 未授权错误
      if (code === ResultEnum.Unauthorized) {
        const tokenStore = useTokenStore()

        if (!isDoubleTokenMode) {
          // 未启用双token策略，清理用户信息，跳转到登录页
          await tokenStore.logout()
          uni.navigateTo({ url: LOGIN_PAGE })
          throw new Error(`请求错误[${code}]：${message}`)
        }

        /* -------- 无感刷新 token ----------- */
        const { refreshToken } = tokenStore.tokenInfo as IDoubleTokenRes || {}

        // token 失效的，且有刷新 token 的，才放到请求队列里
        if (refreshToken) {
          return new Promise((resolve, reject) => {
            taskQueue.push(async () => {
              try {
                // 重新发起请求
                const newResponse = await method.send()
                resolve(newResponse)
              }
              catch (error) {
                reject(error)
              }
            })

            // 如果未在刷新中，发起刷新 token 请求
            if (!refreshing) {
              refreshing = true

              tokenStore.refreshToken()
                .then(() => {
                  // 刷新 token 成功
                  refreshing = false
                  nextTick(() => {
                    uni.hideToast()
                    uni.showToast({
                      title: 'token 刷新成功',
                      icon: 'none',
                    })
                  })
                  // 将任务队列的所有任务重新请求
                  taskQueue.forEach(task => task())
                })
                .catch(async (refreshErr) => {
                  console.error('刷新 token 失败:', refreshErr)
                  refreshing = false

                  // 刷新 token 失败，跳转到登录页
                  nextTick(() => {
                    uni.hideToast()
                    uni.showToast({
                      title: '登录已过期，请重新登录',
                      icon: 'none',
                    })
                  })

                  // 清除用户信息
                  await tokenStore.logout()

                  // 跳转到登录页
                  setTimeout(() => {
                    uni.navigateTo({ url: LOGIN_PAGE })
                  }, 2000)

                  // 拒绝队列中的所有请求
                  taskQueue.forEach(() => {
                    reject(new Error('登录已过期'))
                  })
                })
                .finally(() => {
                  // 不管刷新 token 成功与否，都清空任务队列
                  taskQueue = []
                })
            }
          })
        }
        else {
          // 没有 refreshToken 或已过期，直接跳转登录页
          await tokenStore.logout()
          uni.navigateTo({ url: LOGIN_PAGE })
          throw new Error(`请求错误[${code}]：${message}`)
        }
      }

      // 处理其他业务错误
      if (code !== ResultEnum.Success) {
        if (config.meta?.hideErrorToast !== true) {
          uni.showToast({
            title: message || '请求失败',
            icon: 'none',
          })
        }
        throw new Error(`请求错误[${code}]：${message}`)
      }

      // 处理成功响应，返回业务数据
      return result
    }

    // 如果不是标准格式，直接返回原始数据
    return rawData
  }),
})

export const $$userConfigMap = withConfigType({})

const Apis = createApis(alovaInstance, $$userConfigMap)

mountApis(Apis)

export default Apis
