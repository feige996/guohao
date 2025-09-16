# DateCard 日期卡片组件

一个集成了 lunar-javascript 库的智能日期卡片组件，可以显示公历日期、农历日期、干支年份和当前节气。

## 功能特性

- 📅 **实时日期显示**：自动获取当前日期并显示
- 🌙 **农历支持**：显示农历月日（如：七月十五）
- 🐲 **干支年份**：显示干支纪年和生肖（如：乙巳蛇年）
- 🌸 **节气显示**：显示当前节气，自动换行显示
- 🎨 **精美设计**：带有背景图片和渐变效果

## 依赖库

使用了 [lunar-javascript](https://gitee.com/6tail/lunar-javascript) 库来处理农历和节气计算。

```bash
pnpm add lunar-javascript
```

## 使用方法

### 基础用法

```vue
<template>
  <DateCard />
</template>

<script setup>
import DateCard from './DateCard.vue'
</script>
```

### 带样式属性

```vue
<template>
  <DateCard :style="{ marginTop: '20rpx' }" />
</template>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| style | Object | - | 自定义样式对象 |

## 显示内容

### 农历信息区域（左上）
- **农历日期**：如 "七月十五"
- **干支年份**：如 "乙巳蛇年"

### 节气区域（右上）
- **当前节气**：如 "雨水"（自动换行显示）
- 如果当前没有节气，默认显示 "立春"

### 公历日期区域（下方白色区域）
- **年份**：如 "2025"
- **月日**：如 "09 / 16"（自动补零）

## 技术实现

### 核心逻辑

```typescript
// 获取当前日期
const now = new Date()
const solar = Solar.fromDate(now)
const lunar = solar.getLunar()

// 计算显示数据
const dateInfo = computed(() => {
  // 公历日期
  const year = solar.getYear()
  const month = String(solar.getMonth()).padStart(2, '0')
  const day = String(solar.getDay()).padStart(2, '0')
  
  // 农历日期
  const lunarMonth = lunar.getMonthInChinese()
  const lunarDay = lunar.getDayInChinese()
  
  // 生肖年
  const yearInGanZhi = lunar.getYearInGanZhi()
  const yearShengXiao = lunar.getYearShengXiao()
  
  // 节气处理
  const jieQi = lunar.getJieQi()
  
  return {
    year,
    month,
    day,
    lunarDate: `${lunarMonth}${lunarDay}`,
    ganZhiYear: `${yearInGanZhi}${yearShengXiao}年`,
    jieQi: formatJieQi(jieQi || '立春')
  }
})
```

### 节气格式化

```typescript
const formatJieQi = (jq: string) => {
  if (!jq) return '立春'
  if (jq.length === 2) {
    return `${jq.charAt(0)}<br>${jq.charAt(1)}`
  }
  return jq
}
```

## 依赖资源

确保项目中存在以下图片资源：
- `/static/images/homepage/date-card-bg.png` - 卡片背景图
- `/static/images/homepage/date-card-content.png` - 卡片内容装饰图

## 样式特性

- **响应式设计**：使用 rpx 单位适配不同屏幕
- **遮罩效果**：使用 CSS mask 实现背景图片遮罩
- **层级管理**：合理的 z-index 层级设计
- **渐变效果**：多种渐变背景和文字效果

## 注意事项

1. **实时更新**：组件会根据当前系统时间自动显示对应的日期信息
2. **农历准确性**：使用 lunar-javascript 库确保农历计算的准确性
3. **节气显示**：节气信息会根据当前日期自动计算
4. **类型支持**：已添加 TypeScript 类型声明文件

## 更新日志

- **v1.1.0**：集成 lunar-javascript 库，支持实时农历和节气显示
- **v1.0.0**：基础静态日期卡片组件
