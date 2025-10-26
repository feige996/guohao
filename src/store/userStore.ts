import type { AppUserInfo } from '@/api/guohao-api/globals'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Apis from '@/api/guohao-api'

// 登录输出接口定义
interface LoginOutput {
  accessToken?: string | null
  refreshToken?: string | null
  expiresIn?: number
  userInfo?: AppUserInfo
  userSig?: string | null // 用户登录即时通信 IM 时使用的密码
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

  /**
   * 解密 JWT token 的信息
   * @param token jwt token 字符串
   * @returns <any>object
   */
  function decryptJWT(token: string): any {
    token = token.replace(/_/g, '/').replace(/-/g, '+')
    const json = decodeURIComponent(escape(window.atob(token.split('.')[1])))
    return JSON.parse(json)
  }

  /**
   * 将 JWT 时间戳转换成 Date
   * @description 主要针对 `exp`，`iat`，`nbf`
   * @param timestamp 时间戳
   * @returns Date 对象
   */
  function getJWTDate(timestamp: number): Date {
    return new Date(timestamp * 1000)
  }

  // Token相关计算属性
  /**
   * 判断token是否过期
   */
  const isTokenExpired = computed(() => {
    // console.log('accessToken.value: ', accessToken.value)
    if (!accessToken.value) {
      return true
    }
    // 判断 accessToken 是否过期
    const jwt: any = decryptJWT(accessToken.value)
    //   {
    //     "UserId": 703181956661317,
    //     "Account": "user_2525",
    //     "RealName": "用户2525",
    //     "LoginMode": 2,
    //     "iat": 1757837170,
    //     "nbf": 1757837170,
    //     "exp": 1758441970,
    //     "iss": "Admin.NET",
    //     "aud": "Admin.NET"
    // }

    console.log('jwt: ', jwt.exp)
    const exp = getJWTDate(jwt.exp as number)
    console.log('exp: ', exp)
    if (new Date() >= exp)
      return true // token 已经过期
    return false
  })

  const isDoctor = computed(() => {
    return userInfo.value?.defaultRole === 888
  })

  // 计算属性：是否已登录
  const isLoggedIn = computed(() => {
    return !!(accessToken.value && userInfo.value?.id && isTokenExpired.value === false)
  })

  // 计算用户默认首页
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

  const toggleUserDefaultRole = () => {
    if (userInfo.value?.defaultRole === 777) {
      userInfo.value.defaultRole = 888
    }
    else {
      userInfo.value.defaultRole = 777
    }
  }

  /**
   * 保存登录结果
   * @param loginResult 登录API返回的结果
   */
  async function saveLoginResult(loginResult: LoginOutput) {
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
    // 清除用户信息
    userInfo.value = null
    accessToken.value = ''
    refreshToken.value = ''
    expiresIn.value = 0
    userSig.value = ''

    // 清除token信息
    // console.log('用户信息已清除')
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
      const res = await Apis.appAuth.apiAppauthLoginPost({
        data: credentials,
      })
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
   * 退出登录
   */
  const logout = async () => {
    try {
      await Apis.appAuth.apiAppauthLogoutPost({})
    }
    catch (error) {
      console.error('退出登录失败:', error)
    }
    finally {
      // 无论成功失败，都需要清除本地信息
      await clearUserInfo()
      uni.switchTab({ url: userDefaultIndexPage.value })
      // 退出IM
      // await logoutTUIKit()
    }
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

    // 计算属性
    userDefaultIndexPage,
    isLoggedIn,
    displayName,
    userAvatar,
    isTokenExpired,
    isDoctor,

    // 核心API方法
    login,
    logout,

    // 兼容原有方法
    saveLoginResult,
    updateUserInfo,
    clearUserInfo,
    getAuthHeader,
    toggleUserDefaultRole,
  }
}, {
  persist: true,
})
