# ConstitutionCard 体质状态卡片组件

## 功能描述

体质状态卡片组件，用于显示用户的体质类型和相关的养生建议。支持从后端API随机获取健康小妙招。

## 组件特性

- 📱 响应式设计，适配移动端
- 🎨 渐变背景和圆角设计
- 🖱️ 支持点击交互
- 📝 可自定义体质类型和养生建议内容
- 🖼️ 支持自定义体质徽章图片
- 🔄 **新增**：自动获取随机健康小妙招
- ⚡ **新增**：点击刷新健康小妙招功能
- 🔃 **新增**：加载状态显示

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| constitutionType | string | '平和体质' | 体质类型文本 |
| adviceTitle | string | '气节养生建议：神仙粥' | 养生建议标题（作为默认值，会被API数据覆盖） |
| adviceContent | string | '糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。' | 养生建议内容（作为默认值，会被API数据覆盖） |
| badgeImageUrl | string | '@img/homepage/constitution-badge.png' | 体质徽章背景图片路径 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击整个卡片时触发 | - |
| constitutionClick | 点击体质状态区域时触发 | - |
| adviceClick | 点击养生建议区域时触发（会自动刷新健康小妙招） | - |

## 使用示例

### 基础用法

```vue
<template>
  <ConstitutionCard />
</template>

<script setup>
import ConstitutionCard from '@/components/ConstitutionCard'
</script>
```

### 自定义内容

```vue
<template>
  <ConstitutionCard
    constitution-type="阳虚体质"
    advice-title="冬季养生建议：温补汤"
    advice-content="当归10g+黄芪15g+生姜3片炖汤，温阳补气，适合冬季进补。"
    badge-image-url="@img/homepage/yang-xu-badge.png"
    @click="handleCardClick"
    @constitution-click="handleConstitutionClick"
    @advice-click="handleAdviceClick"
  />
</template>

<script setup>
import ConstitutionCard from '@/components/ConstitutionCard'

function handleCardClick() {
  console.log('点击了体质卡片')
}

function handleConstitutionClick() {
  console.log('点击了体质状态')
}

function handleAdviceClick() {
  console.log('点击了养生建议')
}
</script>
```

## 样式说明

- 卡片尺寸：334rpx × 280rpx
- 背景：从 #fff1f2 到 #fce3e1 的渐变
- 圆角：16rpx
- 体质徽章尺寸：144rpx × 40rpx
- 养生建议区域：半透明白色背景

## 🚀 新功能：随机健康小妙招

### API 接口
组件使用 `/api/app_healthskill/random` 接口获取随机健康小妙招：

```typescript
// API 响应数据结构
interface HealthTipResponse {
  code?: number
  message?: string | null
  result?: {
    id?: number
    title?: string | null        // 健康症状/标题
    content?: string | null      // 健康小妙招内容
    createTime?: string | null
    // ... 其他字段
  }
}
```

### 工作流程
1. **组件挂载**：自动调用API获取随机健康小妙招
2. **数据更新**：成功获取后更新显示内容
3. **用户交互**：点击养生建议区域重新获取新的小妙招
4. **加载状态**：显示"正在获取健康小妙招..."提示
5. **错误处理**：失败时保持原有内容，不影响用户体验

### 使用示例

```vue
<template>
  <ConstitutionCard
    constitution-type="平和体质"
    @advice-click="handleAdviceClick"
  />
</template>

<script setup>
import ConstitutionCard from '@/components/ConstitutionCard'

function handleAdviceClick() {
  console.log('点击了养生建议，将自动刷新健康小妙招')
}
</script>
```

## 注意事项

1. 组件使用了 rpx 单位，适配小程序和移动端
2. 背景图片路径需要确保资源文件存在
3. 点击事件支持事件冒泡控制，子区域点击不会触发父级点击事件
4. **新增**：需要确保后端API `/api/app_healthskill/random` 可正常访问
5. **新增**：网络错误时会在控制台输出错误信息，但不会影响界面显示
