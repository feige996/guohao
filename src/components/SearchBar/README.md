# SearchBar 搜索栏组件

一个可复用的搜索栏组件，具有自定义样式和事件处理功能。

## 功能特性

- 🎨 可自定义样式（宽度、高度、边距等）
- 📝 可自定义占位符文本和按钮文本
- 🎯 支持点击和搜索事件
- 💫 响应式设计，适配不同屏幕尺寸

## 使用方法

### 基础用法

```vue
<template>
  <SearchBar 
    @search="handleSearch"
    @click="handleSearchBarClick"
  />
</template>

<script setup>
import SearchBar from '@/components/SearchBar'

const handleSearch = () => {
  console.log('执行搜索')
  // 添加搜索逻辑
}

const handleSearchBarClick = () => {
  console.log('点击搜索栏')
  // 添加点击处理逻辑
}
</script>
```

### 自定义配置

```vue
<template>
  <SearchBar 
    placeholder="请输入关键词"
    button-text="查找"
    width="600rpx"
    height="70rpx"
    margin-left="20rpx"
    margin-top="50rpx"
    @search="handleSearch"
    @click="handleSearchBarClick"
  />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| placeholder | string | '搜索疾病、症状、科室等' | 占位符文本 |
| buttonText | string | '搜索' | 搜索按钮文本 |
| width | string | '702rpx' | 搜索栏宽度 |
| height | string | '80rpx' | 搜索栏高度 |
| marginLeft | string | '24rpx' | 左边距 |
| marginTop | string | '104rpx' | 上边距 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| search | 点击搜索按钮时触发 | - |
| click | 点击搜索栏时触发 | - |

## 样式说明

组件使用了以下设计元素：
- 圆角边框设计
- 渐变背景色
- 搜索图标
- 可点击的搜索按钮

## 注意事项

1. 确保项目中存在搜索图标文件：`/static/homepage/search-icon.png`
2. 组件使用了 rpx 单位，适配小程序和移动端
3. 事件处理函数需要在父组件中定义
