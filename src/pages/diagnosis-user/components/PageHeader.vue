<script setup lang="ts">
interface Props {
  title: string
  showBack?: boolean
  showRight?: boolean
  rightIcon?: 'favorite' | 'more' | 'custom'
  isFavorited?: boolean
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true,
  showRight: false,
  rightIcon: 'more',
  isFavorited: false,
  backgroundColor: '#FFFFFF',
})

const emit = defineEmits<{
  back: []
  rightClick: []
}>()

function handleBack() {
  emit('back')
}

function handleRightClick() {
  emit('rightClick')
}
</script>

<template>
  <view
    class="z-100 flex flex-shrink-0 items-center justify-between px-24rpx pb-16rpx pt-20rpx shadow-sm backdrop-blur-8rpx"
    :style="{ backgroundColor: `${backgroundColor}/98` }"
  >
    <!-- 返回按钮 -->
    <button
      v-if="showBack"
      class="h-60rpx w-60rpx flex flex-shrink-0 items-center justify-center rounded-full border-none bg-primary/8 transition-all active:scale-95 active:bg-primary/15"
      aria-label="返回"
      @tap="handleBack"
    >
      <text class="text-32rpx text-primary font-bold">←</text>
    </button>
    <view v-else class="h-60rpx w-60rpx flex-shrink-0" />

    <!-- 标题 -->
    <text class="flex-1 text-center text-32rpx text-gray-800 font-bold">{{ title }}</text>

    <!-- 右侧按钮 -->
    <view
      v-if="showRight"
      class="h-60rpx w-60rpx flex flex-shrink-0 items-center justify-center rounded-full transition-all active:scale-95"
      :class="rightIcon === 'favorite' && isFavorited ? 'text-red-500' : 'text-gray-400'"
      aria-label="右侧操作"
      @tap="handleRightClick"
    >
      <!-- 收藏图标 -->
      <svg v-if="rightIcon === 'favorite'" viewBox="0 0 16 16" fill="currentColor" class="h-40rpx w-40rpx">
        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
      <!-- 更多图标 -->
      <svg v-else-if="rightIcon === 'more'" viewBox="0 0 24 24" fill="currentColor" class="h-48rpx w-48rpx text-gray-800">
        <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
      </svg>
      <!-- 自定义插槽 -->
      <slot v-else name="right-icon" />
    </view>
    <view v-else class="h-60rpx w-60rpx flex-shrink-0" />
  </view>
</template>
