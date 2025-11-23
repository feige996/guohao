<script setup lang="ts">
interface Props {
  icon?: string
  text?: string
  description?: string
  showAction?: boolean
  actionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '📭',
  text: '暂无数据',
  description: '',
  showAction: false,
  actionText: '刷新',
})

const emit = defineEmits<{
  action: []
}>()

function handleAction() {
  emit('action')
}
</script>

<template>
  <view class="flex flex-col items-center justify-center gap-24rpx px-24rpx py-120rpx">
    <!-- 图标 -->
    <text class="text-96rpx opacity-30">{{ icon }}</text>

    <!-- 文本 -->
    <view class="flex flex-col items-center gap-12rpx">
      <text class="text-28rpx text-gray-400 font-medium">{{ text }}</text>
      <text v-if="description" class="text-center text-24rpx text-gray-400 leading-relaxed">
        {{ description }}
      </text>
    </view>

    <!-- 操作按钮 -->
    <button
      v-if="showAction"
      class="mt-16rpx rounded-full border-none bg-primary/8 px-48rpx py-16rpx text-26rpx text-primary font-medium transition-all active:scale-95 active:bg-primary/12"
      @tap="handleAction"
    >
      {{ actionText }}
    </button>

    <!-- 自定义插槽 -->
    <slot />
  </view>
</template>
