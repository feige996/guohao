import type { AppUserInfo } from '@/api/guohao-api/globals'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Apis from '@/api/guohao-api'
import { isDoubleTokenMode } from '@/utils'
import { initTUIKitAuto, logoutTUIKit } from '@/utils/tuikit'

// 登录响应类型定义
interface SingleTokenRes {
  accessToken: string
  expiresIn: number
}

interface DoubleTokenRes {
  accessToken: string
  refreshToken: string
  expiresIn: number
  refreshExpiresIn?: number
}

// 统一的登录响应类型
type IAuthLoginRes = SingleTokenRes | DoubleTokenRes

// 登录响应类型检查函数
function isDoubleTokenRes(tokenInfo: any): tokenInfo is DoubleTokenRes {
  return tokenInfo && typeof tokenInfo.accessToken === 'string' && typeof tokenInfo.refreshToken === 'string'
}

function isSingleTokenRes(tokenInfo: any): tokenInfo is SingleTokenRes {
  return tokenInfo && typeof tokenInfo.accessToken === 'string' && !tokenInfo.refreshToken
}

/**
 * 获取微信登录凭证
 * @returns Promise 包含微信登录凭证(code)
 */
function getWxCode() {
  return new Promise<UniApp.LoginRes>((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: res => resolve(res),
      fail: err => reject(new Error(err)),
    })
  })
}

// 登录输出接口定义
interface LoginOutput {
  accessToken?: string | null
  refreshToken?: string | null
  expiresIn?: number
  userInfo?: AppUserInfo
  userSig?: string | null // 用户登录即时通信 IM 时使用的密码
}

// 初始化token状态
const tokenInfoState: IAuthLoginRes = isDoubleTokenMode
  ? {
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
      refreshExpiresIn: 0,
    }
  : {
      accessToken: '',
      expiresIn: 0,
    }

/**
 * 用户状态管理Store
 * 管理用户登录状态、用户信息等
 */
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<AppUserInfo | null>(null)

  // 访问令牌
  const accessToken = ref<string>('')

  // 刷新令牌
  const refreshToken = ref<string>('')

  // 令牌过期时间
  const expiresIn = ref<number>(0)

  // IM用户签名
  const userSig = ref<string>('')

  // Token信息（兼容原token.ts的结构）
  const tokenInfo = ref<IAuthLoginRes>({ ...tokenInfoState })

  // 计算属性：是否已登录
  const isLoggedIn = computed(() => {
    return !!(accessToken.value && userInfo.value?.id)
  })

  // 计算属性：用户名显示
  const displayName = computed(() => {
    if (!userInfo.value)
      return ''
    return userInfo.value.nickName || userInfo.value.username || userInfo.value.mobile || '用户'
  })

  // 计算属性：用户头像
  const userAvatar = computed(() => {
    return userInfo.value?.avatar || ''
  })

  // Token相关计算属性
  /**
   * 判断token是否过期
   */
  const isTokenExpired = computed(() => {
    if (!tokenInfo.value) {
      return true
    }

    const now = Date.now()
    const expireTime = uni.getStorageSync('accessTokenExpireTime')

    if (!expireTime)
      return true
    return now >= expireTime
  })

  /**
   * 判断refreshToken是否过期
   */
  const isRefreshTokenExpired = computed(() => {
    if (!isDoubleTokenMode)
      return true

    const now = Date.now()
    const refreshExpireTime = uni.getStorageSync('refreshTokenExpireTime')

    if (!refreshExpireTime)
      return true
    return now >= refreshExpireTime
  })

  /**
   * 获取有效的token
   */
  const getValidToken = computed(() => {
    // token已过期，返回空
    if (isTokenExpired.value) {
      return ''
    }

    if (!isDoubleTokenMode) {
      return isSingleTokenRes(tokenInfo.value) ? tokenInfo.value.accessToken : ''
    }
    else {
      return isDoubleTokenRes(tokenInfo.value) ? tokenInfo.value.accessToken : ''
    }
  })

  /**
   * 检查是否有登录信息（不考虑token是否过期）
   */
  const hasLoginInfo = computed(() => {
    if (!tokenInfo.value) {
      return false
    }
    if (isDoubleTokenMode) {
      return isDoubleTokenRes(tokenInfo.value) && !!tokenInfo.value.accessToken
    }
    else {
      return isSingleTokenRes(tokenInfo.value) && !!tokenInfo.value.accessToken
    }
  })

  /**
   * 检查是否已登录且token有效
   */
  const hasValidLogin = computed(() => {
    return hasLoginInfo.value && !isTokenExpired.value
  })

  // 计算属性: 默认首页
  const userDefaultIndexPage = computed(() => {
    // 优先使用后端返回的defaultRole，如果没有则使用普通用户
    const targetRole = userInfo.value?.defaultRole || 777

    // 根据用户角色返回对应的 userDefaultIndexPage 配置
    switch (targetRole) {
      case 666: // Agent (代理)
        return '/pages/normal/index/index'
      case 777: // NormalUser (普通用户)
        return '/pages/normal/index/index'
      case 888: // Doctor (医生)
        return '/pages/doctor/index/index'
      case 999: // Consultant (顾问)
        return '/pages/normal/index/index'
      default: // 默认使用普通用户配置
        return '/pages/normal/index/index'
    }
  })

  // 计算属性: tabbar
  const userTabbarItems = computed(() => {
    // 优先使用后端返回的defaultRole，如果没有则使用普通用户
    const targetRole = userInfo.value?.defaultRole || 777

    // 根据用户角色返回对应的 tabbar 配置
    switch (targetRole) {
      case 666: // Agent (代理)
        return [
          { name: 'index_Normal', title: '代理首页', icon: 'home', pagePath: 'pages/tabbar/index_Normal' },
          { name: 'user_Normal', title: '代理个人中心', icon: 'user', pagePath: 'pages/tabbar/user_Normal' },
        ]

      case 777: // NormalUser (普通用户)
        return [
          { name: 'index_Normal', title: '普通用户首页', icon: 'home', pagePath: 'pages/tabbar/index_Normal' },
          { name: 'user_Normal', title: '普通用户个人中心', icon: 'user', pagePath: 'pages/tabbar/user_Normal' },
        ]

      case 888: // Doctor (医生)
        return [
          { name: 'index_Doctor', title: '医生首页', icon: 'home', pagePath: 'pages/tabbar/index_Doctor' },
          { name: 'user_Doctor', title: '医生个人中心', icon: 'user', pagePath: 'pages/tabbar/user_Doctor' },
        ]

      case 999: // Consultant (顾问)
        return [
          { name: 'index_Normal', title: '顾问首页', icon: 'home', pagePath: 'pages/tabbar/index_Normal' },
          { name: 'user_Normal', title: '顾问个人中心', icon: 'user', pagePath: 'pages/tabbar/user_Normal' },
        ]

      default: // 默认使用普通用户配置
        return [
          { name: 'index_Normal', title: '普通用户首页', icon: 'home', pagePath: 'pages/tabbar/index_Normal' },
          { name: 'user_Normal', title: '普通用户个人中心', icon: 'user', pagePath: 'pages/tabbar/user_Normal' },
        ]
    }
  })

  /**
   * 设置Token信息
   * @param val Token信息
   */
  const setTokenInfo = (val: IAuthLoginRes) => {
    tokenInfo.value = val

    // 计算并存储过期时间
    const now = Date.now()
    if (isSingleTokenRes(val)) {
      // 单token模式
      const expireTime = now + val.expiresIn * 1000
      uni.setStorageSync('accessTokenExpireTime', expireTime)
      // 同步到原有的状态
      accessToken.value = val.accessToken
      expiresIn.value = val.expiresIn
    }
    else if (isDoubleTokenRes(val)) {
      // 双token模式
      const doubleTokenVal = val as DoubleTokenRes
      const accessExpireTime = now + doubleTokenVal.expiresIn * 1000
      const refreshExpireTime = now + (doubleTokenVal.refreshExpiresIn || doubleTokenVal.expiresIn) * 1000
      uni.setStorageSync('accessTokenExpireTime', accessExpireTime)
      uni.setStorageSync('refreshTokenExpireTime', refreshExpireTime)
      // 同步到原有的状态
      accessToken.value = doubleTokenVal.accessToken
      refreshToken.value = doubleTokenVal.refreshToken
      expiresIn.value = doubleTokenVal.expiresIn
    }
  }

  /**
   * 保存登录结果
   * @param loginResult 登录API返回的结果
   */
  async function saveLoginResult(loginResult: LoginOutput) {
    // console.log('保存登录结果:', loginResult)

    // 保存令牌信息
    if (loginResult.accessToken) {
      accessToken.value = loginResult.accessToken
    }

    if (loginResult.refreshToken) {
      refreshToken.value = loginResult.refreshToken
    }

    if (loginResult.expiresIn) {
      expiresIn.value = loginResult.expiresIn
    }

    if (loginResult.userSig) {
      userSig.value = loginResult.userSig
    }

    // 保存用户信息
    if (loginResult.userInfo) {
      userInfo.value = loginResult.userInfo
    }

    // 登录成功后重新初始化IM
    // 延迟一下确保store数据已更新
    setTimeout(async () => {
      try {
        console.log('登录成功，开始重新初始化IM...')
        await initTUIKitAuto()
        console.log('IM重新初始化成功')
      }
      catch (error) {
        console.error('IM重新初始化失败:', error)
        // 显示用户友好的错误提示
        uni.showToast({
          title: '即时通讯初始化失败',
          icon: 'none',
          duration: 2000,
        })
      }
    }, 500) // 延迟500ms，确保store数据已更新

    // console.log('用户信息已保存到store:', {
    //   isLoggedIn: isLoggedIn.value,
    //   userInfo: userInfo.value,
    //   hasToken: !!accessToken.value,
    // })
  }

  /**
   * 更新用户信息
   * @param newUserInfo 新的用户信息
   */
  function updateUserInfo(newUserInfo: Partial<AppUserInfo>) {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...newUserInfo }
    }
    else {
      userInfo.value = newUserInfo as AppUserInfo
    }
  }

  /**
   * 清除用户信息（登出）
   */
  async function clearUserInfo() {
    // 先登出IM
    try {
      console.log('开始登出IM...')
      await logoutTUIKit()
      console.log('IM登出成功')
    }
    catch (error) {
      console.error('IM登出失败:', error)
      // 登出失败不影响用户信息清除
    }

    // 清除用户信息
    userInfo.value = null
    accessToken.value = ''
    refreshToken.value = ''
    expiresIn.value = 0
    userSig.value = ''

    // 清除token信息
    uni.removeStorageSync('accessTokenExpireTime')
    uni.removeStorageSync('refreshTokenExpireTime')
    tokenInfo.value = { ...tokenInfoState }
    uni.removeStorageSync('token')

    console.log('用户信息已清除')
  }

  /**
   * 用户登录
   * @param credentials 登录参数
   * @returns 登录结果
   */
  const login = async (credentials: {
    account: string
    password: string
    loginFrom?: string
  }) => {
    try {
      const res = await Apis.app.apiAppLoginPost({
        data: credentials,
      })
      console.log('普通登录-res: ', res)

      if (res.result) {
        // 设置token信息
        const tokenData = {
          accessToken: res.result.accessToken || '',
          refreshToken: res.result.refreshToken || '',
          expiresIn: res.result.expiresIn || 7200,
        }
        setTokenInfo(tokenData as any)

        // 设置用户信息
        if (res.result.userInfo) {
          userInfo.value = res.result.userInfo
        }

        // 设置用户签名
        if (res.result.userSig) {
          userSig.value = res.result.userSig
        }
      }

      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
      // 初始化 IM
      await initTUIKitAuto()
      return res
    }
    catch (error) {
      console.error('登录失败:', error)
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'error',
      })
      throw error
    }
  }

  /**
   * 微信登录
   * @returns 登录结果
   */
  const wxLogin = async () => {
    try {
      // 获取微信小程序登录的code
      const code = await getWxCode()
      console.log('微信登录-code: ', code)

      // 调用微信登录API
      const res = await Apis.app.apiAppLoginbywechatPost({
        data: {
          openId: code.code, // 使用code作为openId，实际项目中可能需要先获取openId
          loginFrom: 'miniprogram',
        },
      })
      console.log('微信登录-res: ', res)

      if (res.result) {
        // 设置token信息
        const tokenData = {
          accessToken: res.result.accessToken || '',
          refreshToken: res.result.refreshToken || '',
          expiresIn: res.result.expiresIn || 7200,
        }
        setTokenInfo(tokenData as any)

        // 设置用户信息
        if (res.result.userInfo) {
          userInfo.value = res.result.userInfo
        }

        // 设置用户签名
        if (res.result.userSig) {
          userSig.value = res.result.userSig
        }
      }

      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
      // 初始化 IM
      await initTUIKitAuto()
      return res
    }
    catch (error) {
      console.error('微信登录失败:', error)
      uni.showToast({
        title: '微信登录失败，请重试',
        icon: 'error',
      })
      throw error
    }
  }

  /**
   * 退出登录
   */
  const logout = async () => {
    try {
      await Apis.app.apiAppLogoutPost({})
    }
    catch (error) {
      console.error('退出登录失败:', error)
    }
    finally {
      // 无论成功失败，都需要清除本地信息
      await clearUserInfo()
      // 退出IM
      await logoutTUIKit()
    }
  }

  /**
   * 刷新token
   * @returns 刷新结果
   */
  const refreshTokenMethod = async () => {
    if (!isDoubleTokenMode) {
      console.error('单token模式不支持刷新token')
      throw new Error('单token模式不支持刷新token')
    }

    try {
      // 安全检查，确保refreshToken存在
      if (!isDoubleTokenRes(tokenInfo.value) || !tokenInfo.value.refreshToken) {
        throw new Error('无效的refreshToken')
      }

      // 注意：当前API中没有专门的refreshToken接口
      // 这里可能需要重新登录或者使用其他方式刷新token
      // 暂时抛出错误，由alova的createServerTokenAuthentication处理
      throw new Error('RefreshToken method not implemented in API')
    }
    catch (error) {
      console.error('刷新token失败:', error)
      throw error
    }
  }

  /**
   * 尝试获取有效的token，如果过期且可刷新，则刷新token
   * @returns 有效的token或空字符串
   */
  const tryGetValidToken = async (): Promise<string> => {
    if (!getValidToken.value && isDoubleTokenMode && !isRefreshTokenExpired.value) {
      try {
        await refreshTokenMethod()
        return getValidToken.value
      }
      catch (error) {
        console.error('尝试刷新token失败:', error)
        return ''
      }
    }
    return getValidToken.value
  }

  /**
   * 获取授权头
   * @returns Authorization header value
   */
  function getAuthHeader(): string {
    return accessToken.value ? `Bearer ${accessToken.value}` : ''
  }

  return {
    // 状态
    userInfo,
    accessToken,
    refreshToken,
    expiresIn,
    userSig,
    tokenInfo,

    // 计算属性
    userDefaultIndexPage,
    userTabbarItems,
    isLoggedIn,
    displayName,
    userAvatar,
    isTokenExpired,
    isRefreshTokenExpired,
    getValidToken,
    hasLoginInfo,
    hasValidLogin,

    // 核心API方法
    login,
    wxLogin,
    logout,

    // Token管理方法
    setTokenInfo,
    refreshTokenMethod,
    tryGetValidToken,

    // 兼容原有方法
    saveLoginResult,
    updateUserInfo,
    clearUserInfo,
    getAuthHeader,

    // 兼容token.ts的属性
    hasLogin: hasValidLogin,
    validToken: getValidToken,
  }
}, {
  persist: true,
})
