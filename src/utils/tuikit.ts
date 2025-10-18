/**
 * 腾讯云 TUIKit 封装模块
 * 用于初始化和管理腾讯云即时通讯功能
 */

import { TUILogin } from '@tencentcloud/tui-core'
import Apis from '@/api/guohao-api'
import { useUserStore } from '@/store/userStore'

// // #ifdef APP-PLUS || H5
// import { TUIChatKit } from '@/TUIKit'
// // #endif

import { TUIChatKit } from '@/TUIKit'

/**
 * TUIKit 配置接口
 */
export interface TUIKitConfig {
  SDKAppID: number
  userID: string
  userSig: string
  useUploadPlugin?: boolean
}

/**
 * TUIKit 默认配置
 *
 * 注意：
 * 1. SDKAppID: 固定为 1400210571
 * 2. userID: 从 userStore 中的 userInfo.id 获取
 * 3. userSig: 通过 API apiAppGenimusersigUseridGet 从服务器获取
 *
 * 获取 userSig 的方法：
 * - 生产环境：通过 API /api/app/genImUserSig/{userId} 获取
 * - 参考文档：https://cloud.tencent.com/document/product/269/32688
 */
export const defaultTUIKitConfig: TUIKitConfig = {
  // 固定的 SDKAppID
  SDKAppID: 1400210571,

  // 用户ID，从 userStore 获取
  userID: '',

  // 用户签名，从 API 获取
  userSig: '',

  // 是否使用上传插件，发送富媒体消息时需要设置为 true
  useUploadPlugin: true,
}

/**
 * 开发环境配置
 */
export const devTUIKitConfig: TUIKitConfig = {
  ...defaultTUIKitConfig,
  // 开发环境特定配置
}

/**
 * 生产环境配置
 */
export const prodTUIKitConfig: TUIKitConfig = {
  ...defaultTUIKitConfig,
  // 生产环境特定配置
}

/**
 * TUIKit 管理类
 */
class TUIKitManager {
  private config: TUIKitConfig | null = null
  private isInitialized = false
  private readonly vueVersion = 3 // 固定为 Vue3

  constructor() {
    // Vue 版本固定为 3
  }

  /**
   * 设置 TUIKit 配置
   * @param config TUIKit 配置对象
   */
  setConfig(config: TUIKitConfig) {
    this.config = config

    // 设置全局变量（兼容原有代码）
    uni.$SDKAppID = config.SDKAppID
    uni.$userID = config.userID
    uni.$userSig = config.userSig
  }

  /**
   * 初始化 TUIKit
   * @param config 可选的配置对象，如果不传则使用之前设置的配置
   */
  async init(config?: TUIKitConfig): Promise<void> {
    if (config) {
      this.setConfig(config)
    }

    if (!this.config) {
      throw new Error('TUIKit 配置未设置，请先调用 setConfig 方法')
    }

    // 添加调试信息
    console.log('TUIKit 配置检查:', {
      SDKAppID: this.config.SDKAppID,
      userID: this.config.userID,
      userSig: this.config.userSig ? '已设置' : '未设置',
      userSigLength: this.config.userSig?.length || 0,
    })

    // 验证配置
    if (!validateTUIKitConfig(this.config)) {
      throw new Error('TUIKit 配置验证失败')
    }

    if (this.isInitialized) {
      console.warn('TUIKit 已经初始化，跳过重复初始化')
      return
    }

    try {
      // #ifdef APP-PLUS || H5
      // 初始化 TUIChatKit 并等待完成
      TUIChatKit.init()
      // #endif

      setTimeout(async () => {
        await this.performTUIKitLoginWithRetry()
      }, 2000)
    }
    catch (error) {
      console.error('TUIKit 初始化失败:', error)
      throw error
    }
  }

  /**
   * 执行 TUIKit 登录（带重试机制）
   * @private
   * @param maxRetries 最大重试次数，默认3次
   * @param retryDelay 重试间隔时间（毫秒），默认2000ms
   */
  private async performTUIKitLoginWithRetry(maxRetries: number = 3, retryDelay: number = 2000): Promise<void> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`TUIKit 登录尝试 ${attempt}/${maxRetries}`)
        await this.performTUIKitLogin()
        console.log(`TUIKit 登录成功（第 ${attempt} 次尝试）`)
        return // 成功则直接返回
      }
      catch (error) {
        lastError = error as Error
        console.warn(`TUIKit 登录失败（第 ${attempt} 次尝试）:`, error)

        // 如果不是最后一次尝试，则等待后重试
        if (attempt < maxRetries) {
          console.log(`等待 ${retryDelay}ms 后进行第 ${attempt + 1} 次尝试...`)
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        }
      }
    }

    // 所有尝试都失败了
    console.error(`TUIKit 登录失败，已尝试 ${maxRetries} 次`)
    throw lastError || new Error('TUIKit 登录失败')
  }

  /**
   * 执行 TUIKit 登录
   * @private
   */
  private async performTUIKitLogin(): Promise<void> {
    if (!this.config) {
      throw new Error('TUIKit 配置未设置')
    }

    // 登录 TUIKit
    await TUILogin.login({
      SDKAppID: this.config.SDKAppID,
      userID: this.config.userID,
      userSig: this.config.userSig,
      useUploadPlugin: this.config.useUploadPlugin ?? true,
      framework: `vue${this.vueVersion}`,
    })

    this.isInitialized = true
    console.log('TUIKit 初始化成功')
  }

  /**
   * 登出 TUIKit
   */
  async logout(): Promise<void> {
    try {
      await TUILogin.logout()
      this.isInitialized = false
      console.log('TUIKit 登出成功')
    }
    catch (error) {
      console.error('TUIKit 登出失败:', error)
      // throw error
    }
  }

  /**
   * 检查是否已初始化
   */
  get initialized(): boolean {
    return this.isInitialized
  }

  /**
   * 获取当前配置
   */
  getConfig(): TUIKitConfig | null {
    return this.config
  }

  /**
   * 重新初始化（先登出再初始化）
   */
  async reinit(config?: TUIKitConfig): Promise<void> {
    if (this.isInitialized) {
      await this.logout()
    }
    await this.init(config)
  }
}

// 创建单例实例
export const tuiKitManager = new TUIKitManager()

/**
 * 便捷的初始化函数
 * @param config TUIKit 配置
 */
export async function initTUIKit(config: TUIKitConfig): Promise<void> {
  return tuiKitManager.init(config)
}

/**
 * 从 userStore 和 API 动态获取 TUIKit 配置
 */
export async function getTUIKitConfig(): Promise<TUIKitConfig> {
  const userStore = useUserStore()

  // 检查用户是否已登录
  if (!userStore.isLoggedIn || !userStore.userInfo?.id) {
    throw new Error('用户未登录或用户信息不完整，无法初始化 TUIKit')
  }

  const userId = userStore.userInfo.id

  // 如果 userStore 中已有 userSig，直接使用
  if (userStore.userSig) {
    return {
      ...defaultTUIKitConfig,
      userID: userId.toString(),
      userSig: userStore.userSig,
    }
  }

  // 否则从 API 获取 userSig
  try {
    const response = await Apis.app.apiAppGenimusersigUseridGet({
      pathParams: { userId },
    })

    const userSig = response.result || ''

    if (!userSig) {
      throw new Error('获取 userSig 失败：API 返回空值')
    }

    // 将 userSig 保存到 userStore 中
    userStore.userSig = userSig

    return {
      ...defaultTUIKitConfig,
      userID: userId.toString(),
      userSig,
    }
  }
  catch (error) {
    console.error('获取 userSig 失败:', error)
    throw new Error(`获取 userSig 失败: ${error}`)
  }
}

/**
 * 同步方式获取配置（仅在已有 userSig 时使用）
 */
export function getTUIKitConfigSync(): TUIKitConfig {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn || !userStore.userInfo?.id) {
    throw new Error('用户未登录或用户信息不完整')
  }

  if (!userStore.userSig) {
    throw new Error('userSig 不存在，请先调用 getTUIKitConfig() 异步获取')
  }

  return {
    ...defaultTUIKitConfig,
    userID: userStore.userInfo.id.toString(),
    userSig: userStore.userSig,
  }
}

/**
 * 验证配置是否有效
 */
export function validateTUIKitConfig(config: TUIKitConfig): boolean {
  if (!config.SDKAppID || config.SDKAppID !== 1400210571) {
    console.error('TUIKit 配置错误: SDKAppID 必须为 1400210571')
    return false
  }

  if (!config.userID || config.userID.trim() === '') {
    console.error('TUIKit 配置错误: userID 不能为空')
    return false
  }

  if (!config.userSig || config.userSig.trim() === '') {
    console.error('TUIKit 配置错误: userSig 不能为空')
    return false
  }

  return true
}

/**
 * 自动获取配置并初始化 TUIKit
 * 从 userStore 获取用户信息，从 API 获取 userSig
 */
export async function initTUIKitAuto(): Promise<void> {
  try {
    // 动态获取配置
    const config = await getTUIKitConfig()

    // 验证配置
    if (!validateTUIKitConfig(config)) {
      throw new Error('TUIKit 配置验证失败')
    }

    // 初始化
    await tuiKitManager.init(config)
  }
  catch (error) {
    console.error('自动初始化 TUIKit 失败:', error)
    throw error
  }
}

/**
 * 便捷的登出函数
 */
export async function logoutTUIKit(): Promise<void> {
  return tuiKitManager.logout()
}

/**
 * 获取 TUIKit 管理器实例
 */
export function getTUIKitManager(): TUIKitManager {
  return tuiKitManager
}
let tuikitModule: typeof import('@/utils/tuikit') | null = null
let isLoading = false

/**
 * 懒加载 TUIKit 模块
 */
export async function loadTUIKitModule() {
  if (tuikitModule) {
    return tuikitModule
  }

  if (isLoading) {
    // 如果正在加载，等待加载完成
    // eslint-disable-next-line no-unmodified-loop-condition
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return tuikitModule
  }

  try {
    isLoading = true
    console.log('开始动态加载 TUIKit 模块...')

    tuikitModule = await import('@/utils/tuikit')
    console.log('TUIKit 模块加载成功')

    return tuikitModule
  }
  catch (error) {
    console.error('TUIKit 模块加载失败:', error)
    throw error
  }
  finally {
    isLoading = false
  }
}

// 默认导出管理器实例
export default tuiKitManager
