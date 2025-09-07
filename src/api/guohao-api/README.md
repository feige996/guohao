# Guohao API - 增强版 Alova 实例

这是一个基于 Alova 的增强版 API 实例，集成了完整的认证、错误处理、无感刷新 Token 等企业级功能。

## 🚀 主要功能

### 1. **自动 Token 认证**
- 自动在请求头中添加 Authorization Bearer Token
- 支持单 Token 和双 Token 模式
- 自动检测 Token 过期并处理

### 2. **无感刷新 Token**
- 当 Token 过期时自动刷新
- 请求队列管理，避免重复刷新
- 刷新失败自动跳转登录页

### 3. **完善的错误处理**
- HTTP 状态码错误处理
- 业务逻辑错误处理
- 友好的错误提示
- 可配置的错误提示开关

### 4. **企业级特性**
- 动态域名支持
- 请求超时配置
- 上传/下载特殊处理
- 匿名访问支持

## 📖 使用方法

### 基本使用

```typescript
// 自动生成的 API 调用
import Apis from '@/api/guohao-api'

// 调用 API
const result = await Apis.user.getUserInfo()
```

### 配置选项

通过 `meta` 配置请求行为：

```typescript
// 忽略认证
const result = await Apis.public.getConfig({
  meta: {
    ignoreAuth: true
  }
})

// 允许匿名访问
const result = await Apis.user.getUserInfo({
  meta: {
    allowAnonymous: true
  }
})

// 隐藏错误提示
const result = await Apis.user.updateProfile(data, {
  meta: {
    hideErrorToast: true
  }
})

// 使用不同域名
const result = await Apis.external.getData({
  meta: {
    domain: 'https://api.example.com'
  }
})
```

## 🔧 配置说明

### 环境变量

确保在 `.env` 文件中配置：

```bash
# 认证模式：single | double
VITE_AUTH_MODE=double

# API 基础地址
VITE_SERVER_BASEURL=http://localhost:5005
```

### Token 模式

#### 单 Token 模式 (`VITE_AUTH_MODE=single`)
- 只使用一个 token
- Token 过期后需要重新登录

#### 双 Token 模式 (`VITE_AUTH_MODE=double`)
- 使用 accessToken 和 refreshToken
- accessToken 过期时自动使用 refreshToken 刷新
- 提供无感的用户体验

## 🎯 响应数据格式

### 标准业务响应

```typescript
interface IResData<T> {
  code: number    // 业务状态码，0 表示成功
  msg: string     // 响应消息
  data: T         // 业务数据
}
```

### 成功响应

API 会自动提取 `data` 字段返回：

```typescript
// 后端返回：{ code: 0, msg: "success", data: { id: 1, name: "张三" } }
// 你收到的：{ id: 1, name: "张三" }
const user = await Apis.user.getUserInfo()
console.log(user.name) // "张三"
```

### 错误处理

```typescript
try {
  const result = await Apis.user.getUserInfo()
} catch (error) {
  // 错误已经自动显示 Toast 提示
  console.error('请求失败:', error.message)
}
```

## 🔐 认证流程

### 1. 登录
```typescript
import { useTokenStore } from '@/store/token'

const tokenStore = useTokenStore()
await tokenStore.login({
  username: 'admin',
  password: '123456',
  code: '1234',
  uuid: 'uuid-string'
})
```

### 2. 自动认证
登录后，所有 API 请求会自动携带 Token，无需手动处理。

### 3. Token 刷新
当 Token 过期时，系统会自动刷新，用户无感知。

### 4. 登出
```typescript
await tokenStore.logout()
```

## 🛠️ 高级用法

### 自定义请求配置

```typescript
// 在 $$userConfigMap 中配置全局默认值
export const $$userConfigMap = withConfigType({
  'user.getUserInfo': {
    meta: {
      hideErrorToast: true
    }
  }
})
```

### 错误处理钩子

```typescript
// 全局错误处理
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('请求错误')) {
    // 处理 API 错误
    console.log('API 请求失败:', event.reason.message)
  }
})
```

## 📝 注意事项

1. **Token 存储**：Token 信息会自动持久化到本地存储
2. **网络错误**：网络异常会显示友好的错误提示
3. **登录跳转**：Token 过期或认证失败会自动跳转到登录页
4. **并发请求**：多个并发请求在 Token 过期时会合并刷新，避免重复请求

## 🔄 与原有 HTTP 工具对比

| 功能 | 原有 http.ts | 增强版 Alova |
|------|-------------|-------------|
| 基础请求 | ✅ | ✅ |
| Token 认证 | ✅ | ✅ |
| 无感刷新 | ✅ | ✅ |
| 错误处理 | ✅ | ✅ |
| 类型安全 | ❌ | ✅ |
| 自动生成 API | ❌ | ✅ |
| 状态管理集成 | ❌ | ✅ |
| 请求缓存 | ❌ | ✅ |

## 🚀 迁移指南

如果你之前使用的是 `src/http/http.ts`，可以逐步迁移到这个增强版本：

1. 保持现有的 Token Store 不变
2. 使用自动生成的 API 替代手动编写的请求
3. 利用类型安全和自动完成功能
4. 享受更好的开发体验
