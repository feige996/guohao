# Healthcare 页面 API 对接说明

## 概述

Healthcare（养生）页面已成功对接后端API，实现了动态数据加载和分类管理功能。

## 主要功能

### 1. 分类管理
- **API**: `app_HealthArticleCategory.apiApp_healtharticlecategoryListGet`
- **功能**: 获取健康文章分类列表
- **参数**: 
  - `Name`: 分类名称（可选）
  - `ParentId`: 父级分类ID（可选）

### 2. 文章列表
- **API**: `app_HealthArticle.apiApp_healtharticlePagePost`
- **功能**: 分页获取健康文章列表
- **参数**:
  - `page`: 当前页码
  - `pageSize`: 每页数量
  - `categoryId`: 分类ID（可选）
  - `keyword`: 搜索关键词（可选）
  - `isPublished`: 是否已发布（固定为true）
  - `field`: 排序字段（publishTime）
  - `order`: 排序方向（desc）

### 3. 搜索功能
- 支持按关键词搜索文章
- 实时搜索，输入关键词后点击搜索按钮触发
- 搜索结果按发布时间倒序排列

### 4. 动态分类Tab
- **完全基于后端分类数据生成Tab**
- 自动添加"全部"Tab作为第一个选项
- 按分类的`orderNo`字段排序
- Tab切换时自动加载对应分类的文章
- 初始显示"加载中..."状态

## 数据结构

### HealthArticle 接口
```typescript
interface HealthArticle {
  id: number
  title: string
  summary: string
  content?: string
  coverImageUrl?: string
  viewCount: number
  likeCount: number
  favoriteCount: number
  commentCount: number
  tags?: string[]
  categoryId?: number
  publishTime?: string
  isPublished: boolean
  isRecommend: boolean
}
```

### HealthCategory 接口
```typescript
interface HealthCategory {
  id: number
  name: string
  description?: string
  parentId?: number
  orderNo: number
}
```

## 页面状态

### 加载状态
- `articlesLoading`: 文章加载状态
- 显示"加载中..."提示

### 空状态
- 当没有文章时显示"暂无内容"

### 错误处理
- API调用失败时自动显示错误提示
- 支持匿名访问（`allowAnonymous: true`）

## 使用方式

1. **页面初始化**
   - 自动加载分类列表
   - 动态生成Tab标签（包含"全部"和各个分类）
   - 自动加载第一个Tab（"全部"）的文章数据

2. **搜索文章**
   - 在搜索框输入关键词
   - 点击搜索按钮或按回车键

3. **切换分类**
   - 点击不同的Tab标签（基于真实分类数据）
   - "全部"Tab显示所有文章
   - 其他Tab显示对应分类的文章

4. **查看文章详情**
   - 点击文章卡片
   - 跳转到文章详情页（待实现）

## 技术特点

- 使用 Alova 进行API请求管理
- 支持 TypeScript 类型检查
- 响应式数据绑定
- 组件化设计
- 错误处理和加载状态管理

## 注意事项

1. 所有API调用都设置了 `allowAnonymous: true`，支持未登录用户访问
2. 文章列表只显示已发布的文章（`isPublished: true`）
3. 默认按发布时间倒序排列
4. ~~分类映射需要根据实际后端数据调整~~（已完成：现在完全使用后端分类数据）
5. 文章详情页跳转功能待实现

## 🎯 数据流程

1. **页面初始化** → 加载分类列表 → 动态生成Tab标签 → 加载"全部"分类的文章
2. **切换Tab** → 获取当前Tab的分类ID → 重新加载对应分类的文章列表
3. **搜索** → 带关键词重新请求当前分类的API → 更新文章列表
4. **点击文章** → 准备跳转详情页（待实现）

## 📋 Tab生成逻辑

- 首先添加"全部"Tab（categoryId: null）
- 然后按`orderNo`排序添加所有分类Tab
- 每个分类Tab包含：`title`（分类名称）和`categoryId`（分类ID）
- 初始状态显示"加载中..."直到分类数据加载完成
