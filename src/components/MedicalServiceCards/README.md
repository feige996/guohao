# MedicalServiceCards 医疗服务卡片组件

## 组件描述

医疗服务卡片组件，用于展示医疗相关服务的双卡片布局，如购药服务和智慧自诊等。

## 功能特性

- 🎨 支持自定义卡片配置
- 🖼️ 支持背景图片
- 🎯 支持点击事件处理
- 📱 响应式设计
- 🔧 TypeScript 支持

## 使用方法

### 基础用法

```vue
<template>
  <MedicalServiceCards 
    :cards="cards" 
    @card-click="handleCardClick" 
  />
</template>

<script setup lang="ts">
import { MedicalServiceCards, MEDICAL_SERVICE_CARDS_CONFIG } from '@/components/MedicalServiceCards'
import type { MedicalServiceCardConfig } from '@/components/MedicalServiceCards'

// 使用预定义配置
const cards = MEDICAL_SERVICE_CARDS_CONFIG

// 处理卡片点击事件
const handleCardClick = (card: MedicalServiceCardConfig) => {
  console.log('点击了卡片:', card.title)
  // 根据 card.action 或 card.id 进行路由跳转或其他操作
  if (card.action === 'goToMedicineService') {
    // 跳转到购药服务页面
  } else if (card.action === 'goToSmartDiagnosis') {
    // 跳转到智慧自诊页面
  }
}
</script>
```

### 自定义配置

```vue
<template>
  <MedicalServiceCards 
    :cards="customCards" 
    class-name="my-custom-class"
    @card-click="handleCardClick" 
  />
</template>

<script setup lang="ts">
import { MedicalServiceCards } from '@/components/MedicalServiceCards'
import type { MedicalServiceCardConfig } from '@/components/MedicalServiceCards'

// 自定义卡片配置
const customCards: MedicalServiceCardConfig[] = [
  {
    id: 'custom-service-1',
    title: '自定义服务1',
    subtitle1: '副标题1',
    subtitle2: '副标题2',
    buttonText: '点击按钮',
    buttonColor: '#ff6b6b',
    backgroundImage: '/static/images/custom-bg1.png',
    action: 'customAction1'
  },
  {
    id: 'custom-service-2',
    title: '自定义服务2',
    subtitle1: '副标题1',
    subtitle2: '副标题2',
    buttonText: '点击按钮',
    buttonColor: '#4ecdc4',
    backgroundImage: '/static/images/custom-bg2.png',
    action: 'customAction2'
  }
]

const handleCardClick = (card: MedicalServiceCardConfig) => {
  // 处理自定义点击事件
}
</script>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cards | `MedicalServiceCardConfig[]` | `[]` | 卡片配置数组 |
| className | `string` | `''` | 自定义样式类名 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| cardClick | `(card: MedicalServiceCardConfig)` | 卡片点击事件 |

### Types

#### MedicalServiceCardConfig

```typescript
interface MedicalServiceCardConfig {
  id: string                    // 卡片唯一标识
  title: string                 // 主标题
  subtitle1: string             // 副标题1
  subtitle2: string             // 副标题2
  buttonText: string            // 按钮文本
  buttonColor: string           // 按钮背景色
  backgroundImage: string       // 背景图片路径
  action?: string              // 点击事件处理函数名
}
```

## 预定义配置

组件提供了预定义的医疗服务卡片配置 `MEDICAL_SERVICE_CARDS_CONFIG`，包含：

1. **购药服务卡片**
   - 在线开方
   - 便捷购药
   - 去选药按钮

2. **智慧自诊卡片**
   - 快速自测
   - 获取初步建议
   - 开始自测按钮

## 注意事项

1. 确保背景图片路径正确
2. 按钮颜色使用十六进制格式
3. 组件使用了 rpx 单位，适配小程序环境
4. 建议在点击事件中进行路由跳转或业务逻辑处理
