import type { AppUserInfo } from '@/api/guohao-api/globals'
/*
 * @Author: AI Assistant
 * @Date: 2025-01-14
 * @Description: 用户状态管理Store
 * @FilePath: /guohaox/src/store/userStore.ts
 */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { initTUIKitAuto, logoutTUIKit } from '@/utils/tuikit'

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

    console.log('用户信息已清除')
  }

  /**
   * 检查令牌是否过期
   * @returns 是否过期
   */
  function isTokenExpired(): boolean {
    if (!expiresIn.value)
      return true

    // 这里简化处理，实际项目中应该根据具体的过期时间逻辑来判断
    return false
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
    userTabbarItems,
    isLoggedIn,
    displayName,
    userAvatar,

    // 方法
    saveLoginResult,
    updateUserInfo,
    clearUserInfo,
    isTokenExpired,
    getAuthHeader,
  }
}, {
  persist: true,
})
