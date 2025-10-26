# FunctionCards 功能卡片组件

## 功能描述

通用的功能卡片组件，支持传入卡片数组，自动按行排列，支持自定义背景图片、文本样式和点击事件。

## 组件特性

- 📱 响应式设计，适配移动端
- 🎨 支持自定义背景图片和样式
- 🖱️ 支持点击交互，每个卡片独立可点击
- 📝 可传入卡片数组，灵活配置
- 🔧 支持启用/禁用状态
- 🎯 自动按行分组布局
- 🎨 支持全部功能卡片

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cards | FunctionCardItem[] | [] | 功能卡片数组 |
| allFunctionCard | AllFunctionCard | 默认配置 | 全部功能卡片配置 |
| showAllFunction | boolean | true | 是否显示全部功能卡片 |
| cardsPerRow | number | 2 | 每行显示的卡片数量 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| cardClick | 点击功能卡片时触发 | (item: FunctionCardItem) |
| allFunctionClick | 点击全部功能卡片时触发 | - |

## 类型定义

### FunctionCardItem

```typescript
interface FunctionCardItem {
  id: string              // 唯一标识
  title: string           // 卡片标题
  backgroundImage: string // 背景图片路径
  enabled?: boolean       // 是否启用，默认 true
  className?: string      // 自定义样式类名
  textStyle?: {           // 文本位置调整
    marginLeft?: string
    marginTop?: string
    width?: string
  }
}
```

### AllFunctionCard

```typescript
interface AllFunctionCard {
  title: string          // 主标题
  subtitle1: string      // 副标题1
  subtitle2: string      // 副标题2
  backgroundImage1: string // 背景图片1
  backgroundImage2: string // 背景图片2
  decorationIcon: string   // 装饰图标
}
```

## 使用示例

### 基础用法

```vue
<template>
  <FunctionCards
    :cards="functionCards"
    @card-click="handleCardClick"
    @all-function-click="handleAllFunctionClick"
  />
</template>

<script setup>
import FunctionCards, { type FunctionCardItem } from '@/components/FunctionCards'

const functionCards: FunctionCardItem[] = [
  {
    id: 'appointment',
    title: '预约问诊',
    backgroundImage: '/static/homepage/appointment-icon.png',
    enabled: true,
  },
  {
    id: 'message',
    title: '我的消息',
    backgroundImage: '/static/homepage/message-icon.png',
    enabled: true,
  },
  {
    id: 'collection',
    title: '养生收藏',
    backgroundImage: '/static/homepage/collection-icon.png',
    enabled: true,
  },
  {
    id: 'product',
    title: '关注商品',
    backgroundImage: '/static/homepage/product-icon.png',
    enabled: false, // 禁用状态
  },
]

function handleCardClick(item: FunctionCardItem) {
  console.log('点击卡片:', item)
  // 根据 item.id 处理不同的业务逻辑
}

function handleAllFunctionClick() {
  console.log('点击全部功能')
}
</script>
```

### 自定义配置

```vue
<template>
  <FunctionCards
    :cards="customCards"
    :all-function-card="customAllFunction"
    :cards-per-row="3"
    @card-click="handleCardClick"
  />
</template>

<script setup>
import FunctionCards, { 
  type FunctionCardItem, 
  type AllFunctionCard 
} from '@/components/FunctionCards'

const customCards: FunctionCardItem[] = [
  {
    id: 'consult',
    title: '在线咨询',
    backgroundImage: '/static/custom/consult.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'health',
    title: '健康档案',
    backgroundImage: '/static/custom/health.png',
    enabled: true,
    className: 'custom-card-style',
  },
]

const customAllFunction: AllFunctionCard = {
  title: '更多服务',
  subtitle1: '专业团队',
  subtitle2: '贴心服务',
  backgroundImage1: '/static/custom/bg1.png',
  backgroundImage2: '/static/custom/bg2.png',
  decorationIcon: '/static/custom/icon.png',
}

function handleCardClick(item: FunctionCardItem) {
  switch (item.id) {
    case 'consult':
      // 处理在线咨询
      break
    case 'health':
      // 处理健康档案
      break
  }
}
</script>
```

### 隐藏全部功能

```vue
<template>
  <FunctionCards
    :cards="functionCards"
    :show-all-function="false"
    @card-click="handleCardClick"
  />
</template>
```

### 定义卡片数据

```vue
<template>
  <FunctionCards
    :cards="functionCards"
    @card-click="handleCardClick"
    @all-function-click="handleAllFunctionClick"
  />
</template>

<script setup>
import FunctionCards, { type FunctionCardItem } from '@/components/FunctionCards'

// 定义功能卡片数据
const functionCards: FunctionCardItem[] = [
  {
    id: 'appointment',
    title: '预约问诊',
    backgroundImage: '/static/images/homepage/appointment-icon.png',
    enabled: true,
  },
  {
    id: 'message',
    title: '我的消息',
    backgroundImage: '/static/images/homepage/message-icon.png',
    enabled: true,
  },
  // ... 更多卡片
]

function handleCardClick(item: FunctionCardItem) {
  console.log('点击卡片:', item.id, item.title)
}

function handleAllFunctionClick() {
  console.log('点击全部功能')
}
</script>
```

## 样式说明

- 卡片尺寸：328rpx × 156rpx
- 卡片间距：14rpx
- 全部功能卡片：328rpx × 156rpx，带渐变背景
- 支持自定义文本位置和样式类名

## 注意事项

1. 组件使用了 rpx 单位，适配小程序和移动端
2. 背景图片使用 `img` 标签实现，支持 `@img` 别名路径
3. 卡片自动按 `cardsPerRow` 参数进行分组布局
4. 禁用状态的卡片会显示半透明效果且不可点击
5. 支持通过 `textStyle` 精确控制文本位置
6. 可通过 `className` 添加自定义样式类名
7. 背景图片会自动填充整个卡片区域，文本内容会覆盖在图片上方

## 数据管理

组件采用无默认数据的设计，需要在使用的页面中定义具体的卡片数据。这样设计的优势：

1. **更加灵活**：不同页面可以定义不同的功能卡片
2. **更好的维护性**：数据和业务逻辑放在具体页面中，便于管理
3. **更强的可定制性**：可以根据用户权限、角色等动态配置功能
4. **更好的复用性**：组件专注于展示逻辑，数据由外部提供

### 推荐的数据组织方式

```typescript
// 在页面中定义功能卡片数据
const functionCards: FunctionCardItem[] = [
  // 基础功能
  {
    id: 'appointment',
    title: '预约问诊',
    backgroundImage: '/static/images/homepage/appointment-icon.png',
    enabled: true,
  },
  // 可以根据用户权限动态添加或禁用功能
  {
    id: 'vip-service',
    title: 'VIP服务',
    backgroundImage: '/static/images/homepage/vip-icon.png',
    enabled: user.isVip, // 根据用户状态动态设置
  },
]
```
