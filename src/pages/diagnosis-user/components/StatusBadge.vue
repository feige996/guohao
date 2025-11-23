<script setup lang="ts">
interface Props {
  status: string
  text: string
  type?: 'consultation' | 'prescription' | 'payment' | 'custom'
  size?: 'small' | 'medium' | 'large'
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'custom',
  size: 'medium',
  showIcon: true,
})

const badgeClass = computed(() => {
  const sizeClasses = {
    small: 'px-12rpx py-6rpx text-20rpx',
    medium: 'px-16rpx py-8rpx text-22rpx',
    large: 'px-20rpx py-10rpx text-24rpx',
  }

  // 根据类型和状态返回样式
  const statusClasses: Record<string, string> = {
    // 问诊状态
    waiting: 'bg-blue-100 text-blue-600',
    ongoing: 'bg-orange-100 text-orange-600',
    completed: 'bg-green-100 text-green-600',
    cancelled: 'bg-gray-100 text-gray-600',

    // 处方状态
    unpaid: 'bg-orange-50 text-orange-600',
    paid: 'bg-green-100 text-green-600',
    expired: 'bg-red-50 text-red-500',

    // 坐诊状态
    consulting: 'bg-red-100 text-red-600',
    available: 'bg-green-100 text-green-600',

    // 派单模式
    smart: 'bg-purple-100 text-purple-600',
    assign: 'bg-blue-100 text-blue-600',
    clinic: 'bg-green-100 text-green-600',
  }

  return `${sizeClasses[props.size]} ${statusClasses[props.status] || 'bg-gray-100 text-gray-600'} rounded-full font-semibold flex items-center gap-8rpx flex-shrink-0`
})

const iconText = computed(() => {
  const icons: Record<string, string> = {
    waiting: '○',
    ongoing: '●',
    completed: '✓',
    cancelled: '✕',
    unpaid: '💰',
    paid: '✓',
    expired: '⚠',
    consulting: '●',
    available: '○',
    smart: '⚡',
    assign: '👤',
    clinic: '🏥',
  }
  return icons[props.status] || ''
})
</script>

<template>
  <view :class="badgeClass">
    <text v-if="showIcon && iconText">{{ iconText }}</text>
    <text>{{ text }}</text>
    <slot />
  </view>
</template>
