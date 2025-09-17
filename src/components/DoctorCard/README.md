# DoctorCard 医生卡片组件

## 概述

DoctorCard 是一个用于显示医生信息的卡片组件，包含医生姓名、职称、科室、医院、接诊量、好评率、擅长领域等信息。

## 组件特性

- 🎨 **美观设计**: 采用现代化的卡片设计风格
- 📱 **响应式**: 适配不同屏幕尺寸
- 🎯 **可点击**: 支持点击事件处理
- 🔧 **可配置**: 支持自定义医生信息
- 📦 **TypeScript**: 完整的类型支持

## 组件结构

```
DoctorCard/
├── DoctorCard.vue          # 单个医生卡片组件
├── DoctorCardList.vue      # 医生卡片列表组件
├── types.ts                # TypeScript 类型定义
├── index.ts                # 导出文件
└── README.md               # 说明文档
```

## 使用方法

### 基础用法

```vue
<script setup>
import { DoctorCard } from '@/components/DoctorCard'

const doctorConfig = {
  id: 'doctor1',
  name: '陈广志',
  title: '主任医师',
  department: '内分泌科',
  hospital: '佛山中医院主治医师',
  consultationCount: 56800,
  rating: 100,
  specialty: '长期从事内分泌、代谢性疾病的诊断和中西医结合治疗，在糖尿病等疾病...',
  avatar: '/static/images/healthcare/doctor-avatar.png'
}

function handleDoctorClick(doctor) {
  console.log('点击了医生:', doctor.name)
}
</script>

<template>
  <DoctorCard 
    :config="doctorConfig"
    @click="handleDoctorClick"
  />
</template>
```

### 列表用法

```vue
<script setup>
import { DoctorCardList, DOCTOR_CARD_CONFIGS } from '@/components/DoctorCard'

const doctors = DOCTOR_CARD_CONFIGS

function handleDoctorClick(doctor) {
  console.log('点击了医生:', doctor.name)
}
</script>

<template>
  <DoctorCardList 
    :doctors="doctors"
    @doctor-click="handleDoctorClick"
  />
</template>
```

## API

### DoctorCard Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| config | DoctorCardConfig | 是 | - | 医生配置信息 |

### DoctorCard Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (config: DoctorCardConfig) | 点击卡片时触发 |

### DoctorCardList Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| doctors | DoctorCardConfig[] | 是 | - | 医生列表数据 |

### DoctorCardList Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| doctor-click | (config: DoctorCardConfig) | 点击医生卡片时触发 |

### DoctorCardConfig 类型

```typescript
interface DoctorCardConfig {
  id: string                // 医生唯一标识
  name: string             // 医生姓名
  title: string            // 职称
  department: string       // 科室
  hospital: string         // 医院
  consultationCount: number // 接诊量
  rating: number           // 好评率
  specialty: string        // 擅长领域
  avatar: string           // 头像图片路径
}
```

## 样式说明

组件使用 UnoCSS 进行样式管理，主要特点：

- 卡片尺寸：702rpx × 310rpx
- 圆角：16rpx
- 背景色：白色
- 响应式布局，支持不同屏幕尺寸

## 注意事项

1. 图片资源需要放在 `/static/images/` 目录下
2. 组件使用 rpx 单位，自动适配不同设备
3. 文本内容支持省略号显示（擅长领域最多显示2行）
4. 确保传入的数据格式符合 DoctorCardConfig 接口定义
