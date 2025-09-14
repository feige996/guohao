# Token Store 合并和清理总结

## 问题描述
项目中存在多个文件尝试导入 `@/store/token`，但该模块不存在，导致 TypeScript 编译错误：
```
Cannot find module '@/store/token' or its corresponding type declarations.
```

## 解决方案
将 `src/store/token.ts` 和 `src/store/user.ts` 的功能合并到现有的 `src/store/userStore.ts` 中，然后将所有使用 `useTokenStore` 的地方替换为 `useUserStore`，最后删除 `token.ts` 文件。

## 完成的工作

### 1. 合并功能到 userStore.ts
- ✅ 添加了 token 相关的类型导入
- ✅ 添加了 token 状态管理（`tokenInfo`）
- ✅ 添加了 token 相关的计算属性：
  - `isTokenExpired` - 判断token是否过期
  - `isRefreshTokenExpired` - 判断refreshToken是否过期
  - `getValidToken` - 获取有效的token
  - `hasLoginInfo` - 检查是否有登录信息
  - `hasValidLogin` - 检查是否已登录且token有效
- ✅ 添加了 token 管理方法：
  - `setTokenInfo` - 设置Token信息
  - `login` - 用户登录
  - `wxLogin` - 微信登录
  - `logout` - 退出登录
  - `refreshTokenMethod` - 刷新token
  - `tryGetValidToken` - 尝试获取有效token

### 2. 替换所有 useTokenStore 使用
- ✅ 替换了 `src/pages/doctor/me/me.vue` 中的所有 `useTokenStore` 调用
- ✅ 替换了 `src/pages/normal/me/me.vue` 中的所有 `useTokenStore` 调用
- ✅ 替换了 `src/http/http.ts` 中的所有 `useTokenStore` 调用
- ✅ 替换了 `src/http/interceptor.ts` 中的所有 `useTokenStore` 调用
- ✅ 替换了 `src/router/interceptor.ts` 中的所有 `useTokenStore` 调用

### 3. 清理工作
- ✅ 删除了已注释的 `src/store/user.ts` 文件
- ✅ 删除了 `src/store/token.ts` 文件
- ✅ 更新了 `src/store/index.ts` 的导出
- ✅ 修复了 `src/App.vue` 中的 `isTokenExpired` 调用（从函数改为计算属性）

### 4. 功能特性
- ✅ 支持单token和双token模式
- ✅ 自动token过期检测和刷新
- ✅ 微信小程序登录支持
- ✅ IM（即时通讯）集成
- ✅ 数据持久化存储
- ✅ 完整的错误处理

## 迁移完成
所有原有的 `useTokenStore` 调用已经完全替换为 `useUserStore`：
- ✅ `src/http/http.ts` - 已替换
- ✅ `src/pages/doctor/me/me.vue` - 已替换
- ✅ `src/pages/normal/me/me.vue` - 已替换
- ✅ `src/http/interceptor.ts` - 已替换
- ✅ `src/router/interceptor.ts` - 已替换
- ✅ `src/store/token.ts` - 已删除

## API 映射
| 原 Token Store API | 新 User Store API | 说明 |
|-------------------|-------------------|------|
| `login` | `login` | 用户登录 |
| `wxLogin` | `wxLogin` | 微信登录 |
| `logout` | `logout` | 退出登录 |
| `hasLogin` | `hasLogin` | 是否已登录 |
| `refreshToken` | `refreshTokenMethod` | 刷新token |
| `tokenInfo` | `tokenInfo` | token信息 |
| `setTokenInfo` | `setTokenInfo` | 设置token信息 |

## 测试建议
1. 测试普通登录流程
2. 测试微信登录流程
3. 测试token自动刷新
4. 测试退出登录
5. 测试页面刷新后的状态恢复

## 注意事项
- `isTokenExpired` 现在是计算属性，不是函数
- 所有token相关的状态都会自动持久化
- 支持单token和双token两种模式
- IM登录/登出已集成到用户登录/登出流程中
