# HealthcareCard 医疗服务卡片组件

一个用于展示医疗服务信息的卡片组件，支持自定义配置和交互。

## 功能特性

- 🎨 **高度可定制**：支持自定义颜色、图片、文本等
- 🖱️ **交互友好**：支持点击事件和禁用状态
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🎯 **类型安全**：完整的 TypeScript 支持
- 🔧 **预设配置**：内置导诊顾问和在线问诊配置

## 组件 Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `config` | HealthcareCardConfig | - | 卡片配置对象 |
| `className` | string | '' | 自定义样式类名 |

## 配置对象 (HealthcareCardConfig)

| 属性 | 类型 | 说明 |
|------|------|------|
| `id` | string | 卡片唯一标识 |
| `title` | string | 主标题 |
| `subtitle1` | string | 副标题1 |
| `subtitle2` | string | 副标题2 |
| `gradientColors` | object | 背景渐变色配置 |
| `titleColor` | string | 主标题颜色 |
| `subtitleColor` | string | 副标题颜色 |
| `images` | object | 图片资源配置 |
| `features` | object | 底部功能区配置 |
| `enabled` | boolean | 是否启用（可选） |

## 组件事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `click` | config: HealthcareCardConfig | 卡片点击时触发 |

## 使用示例

### 基础用法

```vue
<template>
  <HealthcareCard
    :config="guideConfig"
    @click="handleCardClick"
  />
</template>

<script setup>
import HealthcareCard, { HEALTHCARE_CARD_CONFIGS } from '@/components/HealthcareCard'

// 使用预设配置
const guideConfig = HEALTHCARE_CARD_CONFIGS.GUIDE

function handleCardClick(config) {
  console.log('点击了卡片:', config.id, config.title)
  // 处理点击逻辑
}
</script>
```

### 自定义配置

```vue
<template>
  <HealthcareCard
    :config="customConfig"
    class="custom-card"
    @click="handleCardClick"
  />
</template>

<script setup>
import HealthcareCard, { type HealthcareCardConfig } from '@/components/HealthcareCard'

const customConfig: HealthcareCardConfig = {
  id: 'custom',
  title: '自定义服务',
  subtitle1: '专业医疗',
  subtitle2: '贴心服务',
  gradientColors: {
    from: '#e3f2fd',
    to: '#bbdefb'
  },
  titleColor: '#1976d2',
  subtitleColor: '#42a5f5',
  images: {
    background: '/static/images/custom/bg.png',
    decoration: '/static/images/custom/decoration.png',
    avatar: '/static/images/custom/avatar.png',
    icon1: '/static/images/custom/icon1.png',
    icon2: '/static/images/custom/icon2.png',
    arrow: '/static/images/custom/arrow.png'
  },
  features: {
    feature1: '24小时服务',
    feature2: '专业团队'
  },
  enabled: true
}

function handleCardClick(config) {
  // 处理自定义卡片点击
}
</script>
```

### 多卡片布局

```vue
<template>
  <view class="flex flex-row gap-[14rpx]">
    <HealthcareCard
      v-for="config in cardConfigs"
      :key="config.id"
      :config="config"
      @click="handleCardClick"
    />
  </view>
</template>

<script setup>
import HealthcareCard, { HEALTHCARE_CARD_CONFIGS } from '@/components/HealthcareCard'

const cardConfigs = [
  HEALTHCARE_CARD_CONFIGS.GUIDE,
  HEALTHCARE_CARD_CONFIGS.CONSULT
]

function handleCardClick(config) {
  switch (config.id) {
    case 'guide':
      // 处理导诊顾问逻辑
      break
    case 'consult':
      // 处理在线问诊逻辑
      break
  }
}
</script>
```

## 预设配置

组件提供了两个预设配置：

### HEALTHCARE_CARD_CONFIGS.GUIDE
导诊顾问卡片配置，包含橙色渐变背景和相关图标。

### HEALTHCARE_CARD_CONFIGS.CONSULT
在线问诊卡片配置，包含蓝色渐变背景和相关图标。

## 注意事项

1. 所有图片路径使用绝对路径 `/static/images/`
2. 颜色值支持 HEX、RGB、RGBA 等格式
3. 禁用状态的卡片会显示半透明效果且不可点击
4. 组件使用 rpx 单位，适配不同屏幕尺寸
5. 建议为每个卡片设置唯一的 `id` 用于事件处理
6. 渐变色和动态尺寸使用内联样式实现，避免 UnoCSS 动态类名解析问题

## 扩展性

组件设计时考虑了扩展性：
- 可以轻松添加新的预设配置
- 支持完全自定义的卡片样式
- 可以通过 `className` 添加额外样式
- 事件系统支持复杂的交互逻辑
