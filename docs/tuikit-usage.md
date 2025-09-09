# TUIKit 封装使用指南 (Vue3 版本)

## 概述

本项目对腾讯云 TUIKit 进行了封装，专为 Vue3 项目设计，提供了更便捷和可维护的使用方式。

## 文件结构

```
src/
├── utils/tuikit.ts          # TUIKit 核心封装（包含配置管理）
├── types/tuikit.d.ts        # TypeScript 类型声明
└── App-final.vue            # 使用示例
```

## 快速开始

### 1. 配置 TUIKit

TUIKit 配置已自动化，无需手动配置：

```typescript
export const defaultTUIKitConfig: TUIKitConfig = {
  SDKAppID: 1400210571,          // 固定值
  userID: '',                    // 从 userStore.userInfo.id 自动获取
  userSig: '',                   // 从 API 自动获取
  useUploadPlugin: true,         // 启用上传插件
}
```

**自动获取逻辑**：
- `SDKAppID`: 固定为 `1400210571`
- `userID`: 从 `userStore.userInfo.id` 获取
- `userSig`: 通过 API `apiAppGenimusersigUseridGet` 获取

### 2. 在 App.vue 中初始化 (Vue3 Composition API)

**推荐方式：自动初始化**

```typescript
<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { initTUIKitAuto } from '@/utils/tuikit'
import { useUserStore } from '@/store/userStore'

onLaunch(async () => {
  // 延迟初始化，确保 store 数据已恢复
  setTimeout(async () => {
    const userStore = useUserStore()

    // 检查用户是否已登录
    if (userStore.isLoggedIn) {
      try {
        // 自动获取配置并初始化
        await initTUIKitAuto()
        console.log('TUIKit 初始化成功')
      } catch (error) {
        console.error('TUIKit 初始化失败:', error)
      }
    }
  }, 1000)
})
</script>
```

**手动方式：**

```typescript
<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { initTUIKit } from '@/utils/tuikit'
import { getTUIKitConfig, validateTUIKitConfig } from '@/utils/tuikit'

onLaunch(async () => {
  try {
    // 获取配置（异步）
    const config = await getTUIKitConfig()

    // 验证配置
    if (validateTUIKitConfig(config)) {
      // 初始化 TUIKit
      await initTUIKit(config)
    }
  } catch (error) {
    console.error('TUIKit 初始化失败:', error)
  }
})
</script>
```

## 主要功能

### TUIKitManager 类

- `setConfig(config)` - 设置配置
- `init(config?)` - 初始化 TUIKit
- `logout()` - 登出 TUIKit
- `reinit(config?)` - 重新初始化
- `initialized` - 检查是否已初始化
- `getConfig()` - 获取当前配置

### 便捷函数

- `initTUIKit(config)` - 使用指定配置初始化
- `initTUIKitAuto()` - 自动获取配置并初始化（推荐）
- `logoutTUIKit()` - 快速登出
- `getTUIKitManager()` - 获取管理器实例
- `getTUIKitConfig()` - 异步获取配置
- `getTUIKitConfigSync()` - 同步获取配置（需要已有 userSig）

## 使用场景

### 1. 应用启动时初始化 (Vue3)

```typescript
// App.vue
<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(async () => {
  const config = getTUIKitConfig()
  await initTUIKit(config)
})
</script>
```

### 2. 用户登录后重新初始化

```typescript
// 登录成功后
async function onLoginSuccess(userInfo) {
  const config = {
    SDKAppID: 您的SDKAppID,
    userID: userInfo.id,
    userSig: userInfo.userSig,
    useUploadPlugin: true
  }
  
  await tuiKitManager.reinit(config)
}
```

### 3. 用户退出登录

```typescript
// 退出登录时
async function onLogout() {
  await logoutTUIKit()
}
```

## 环境变量配置

可以通过环境变量配置 TUIKit：

```env
# .env
VITE_TUIKIT_SDK_APP_ID=您的SDKAppID
VITE_TUIKIT_USER_ID=默认用户ID
VITE_TUIKIT_USER_SIG=默认用户签名
```

## 错误处理

封装提供了完善的错误处理机制：

```typescript
try {
  await initTUIKit(config)
} catch (error) {
  if (error.code === 70001) {
    // userSig 过期
  } else if (error.code === 70009) {
    // userSig 验证失败
  }
}
```

## 注意事项

1. **userSig 获取**：
   - 测试环境：可从腾讯云控制台获取
   - 生产环境：必须从服务器获取
   - 参考：https://cloud.tencent.com/document/product/269/32688

2. **Vue3 支持**：
   - 框架版本固定为 Vue3
   - 使用 Composition API 和 `<script setup>` 语法

3. **平台兼容性**：
   - App 和 H5 平台会初始化 TUIChatKit
   - 微信小程序等其他平台只初始化 TUILogin

4. **单例模式**：
   - TUIKitManager 使用单例模式，确保全局唯一实例

5. **配置验证**：
   - 初始化前会自动验证配置的有效性

## 完整示例

参考 `src/App-tuikit-example.vue` 文件查看完整的使用示例。
