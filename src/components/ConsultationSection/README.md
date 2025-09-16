# ConsultationSection 专业咨询区域组件

一个可复用的专业咨询区域组件，包含医生装饰图、咨询服务介绍、健康管家消息框和会员升级提示。

## 功能特性

- 🎨 可自定义文本内容和样式
- 🖼️ 包含医生装饰图和渐变背景
- 💬 健康管家消息交互
- 🎯 支持多种点击事件
- 📱 响应式设计，适配不同屏幕尺寸

## 使用方法

### 基础用法

```vue
<template>
  <ConsultationSection
    @consult-click="handleConsultClick"
    @upgrade-click="handleUpgradeClick"
    @health-manager-click="handleHealthManagerClick"
  />
</template>

<script setup>
import ConsultationSection from '@/components/ConsultationSection'

const handleConsultClick = () => {
  console.log('点击问医生')
  // 添加问医生逻辑
}

const handleUpgradeClick = () => {
  console.log('点击升级会员')
  // 添加升级会员逻辑
}

const handleHealthManagerClick = () => {
  console.log('点击健康管家消息')
  // 添加健康管家消息逻辑
}
</script>
```

### 自定义配置

```vue
<template>
  <ConsultationSection
    title="在线咨询"
    subtitle="专业医生为您提供健康指导"
    health-manager-message="[AI助手]今天感觉如何？"
    consult-button-text="立即咨询"
    membership-text="开通VIP 享专属服务"
    upgrade-text="立即开通"
    width="600rpx"
    height="280rpx"
    @consult-click="handleConsultClick"
    @upgrade-click="handleUpgradeClick"
    @health-manager-click="handleHealthManagerClick"
  />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | '专业咨询' | 主标题文本 |
| subtitle | string | '为您及家人健康提供专属服务' | 副标题文本 |
| healthManagerMessage | string | '[健康管家]您最近身体怎么样？' | 健康管家消息内容 |
| consultButtonText | string | '问医生' | 咨询按钮文本 |
| membershipText | string | '升级会员 享更多权益' | 会员权益文本 |
| upgradeText | string | '去升级' | 升级按钮文本 |
| width | string | '702rpx' | 组件宽度 |
| height | string | '300rpx' | 组件高度 |
| marginLeft | string | '24rpx' | 左边距 |
| marginTop | string | '60rpx' | 上边距 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| consultClick | 点击问医生按钮时触发 | - |
| upgradeClick | 点击升级会员区域时触发 | - |
| healthManagerClick | 点击健康管家消息框时触发 | - |

## 样式说明

组件包含以下设计元素：
- **医生装饰图**：右上角的医生形象图片
- **渐变背景**：金黄色渐变背景
- **标题区域**：渐变文字效果的主标题和白色副标题
- **健康管家消息框**：带有头像和消息内容的交互卡片
- **问医生按钮**：渐变背景的行动按钮
- **会员升级区域**：底部的会员权益提示区域

## 依赖资源

确保项目中存在以下图片资源：
- `@img/homepage/decoration.png` - 医生装饰图
- `@img/homepage/arrow-icon.png` - 箭头图标
- `@img/homepage/health-manager-icon.png` - 健康管家头像
- `@img/homepage/upgrade-arrow.png` - 升级箭头图标

## 注意事项

1. 组件使用了复杂的层级结构和定位，请确保父容器有足够的空间
2. 组件使用了 rpx 单位，适配小程序和移动端
3. 所有点击区域都添加了 cursor-pointer 样式
4. 事件处理函数需要在父组件中定义
