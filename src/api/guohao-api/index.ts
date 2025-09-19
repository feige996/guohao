import type { uniappRequestAdapter } from '@alova/adapter-uniapp'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import VueHook from 'alova/vue'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { isDoubleTokenMode } from '@/utils'
import { createApis, mountApis, withConfigType } from './createApis'

// 业务状态码枚举
export enum ResultEnum {
  Success = 200, // 成功
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

// 标准响应数据格式
export interface IResAdminData<T = any> {
  code: number
  message: string
  result: T
}

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
        const userStore = useUserStore()
        if (isDoubleTokenMode && userStore.refreshToken) {
          // 使用 userStore 的 refreshTokenMethod 方法
          // await userStore.refreshTokenMethod()
        }
        else {
          throw new Error('Token refresh failed')
        }
      }
      catch (error) {
        // 刷新失败，清理用户信息并跳转到登录页
        const userStore = useUserStore()
        await userStore.clearUserInfo()
        uni.reLaunch({ url: LOGIN_PAGE })
        throw error
      }
    },
  },
})

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVER_BASEURL || 'http://192.168.0.68:5005',
  ...AdapterUniapp(),
  timeout: 10000, // 10秒超时
  statesHook: VueHook,

  beforeRequest: onAuthRequired((method) => {
    const userStore = useUserStore()

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
      const token = userStore.accessToken
      if (token) {
        // 根据后端要求设置 token 头部，这里使用 Authorization
        method.config.headers.Authorization = `Bearer ${token}`
      }
      else if (!config.meta?.allowAnonymous) {
        // 如果没有 token 且不允许匿名访问，抛出错误
        throw new Error('[请求错误]：未登录')
      }
    }

    // 处理动态域名
    if (config.meta?.domain) {
      method.baseURL = config.meta.domain
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
