<template>
  <view
    class="flex flex-row items-start justify-center"
    :class="className"
    :style="{
      height,
      width,
      gap,
    }"
  >
    <HealthcareCard
      v-for="config in configs"
      :key="config.id"
      :config="config"
      @click="handleCardClick"
    />
  </view>
</template>

<script setup lang="ts">
import type { HealthcareCardConfig, HealthcareCardEmits } from './types'
import HealthcareCard from './HealthcareCard.vue'

// 定义 Props
interface HealthcareCardGroupProps {
  /** 卡片配置数组 */
  configs: HealthcareCardConfig[]
  /** 容器高度 */
  height?: string
  /** 容器宽度 */
  width?: string
  /** 卡片间距 */
  gap?: string
  /** 自定义样式类名 */
  className?: string
}

const props = withDefaults(defineProps<HealthcareCardGroupProps>(), {
  height: '264rpx',
  width: '702rpx',
  gap: '14rpx',
  className: '',
})

// 定义事件
const emit = defineEmits<HealthcareCardEmits>()

// 处理卡片点击事件
function handleCardClick(config: HealthcareCardConfig) {
  emit('click', config)
}
</script>
