<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  showButton?: boolean
  buttonText?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索',
  showButton: true,
  buttonText: '搜索',
  backgroundColor: '#FFFFFF',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': []
  'confirm': []
}>()

function handleInput(e: any) {
  emit('update:modelValue', e.detail.value)
}

function handleSearch() {
  emit('search')
}

function handleConfirm() {
  emit('confirm')
}
</script>

<template>
  <view class="px-24rpx py-20rpx shadow-sm" :style="{ backgroundColor }">
    <view class="relative h-72rpx w-full flex items-center">
      <!-- 搜索图标 -->
      <view class="absolute left-24rpx z-10 flex items-center justify-center">
        <text class="text-32rpx opacity-50">🔍</text>
      </view>

      <!-- 输入框 -->
      <input
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        class="h-72rpx w-full flex-1 border-2rpx border-gray-200 rounded-36rpx bg-white pl-72rpx text-26rpx text-gray-800 placeholder:text-gray-400"
        :class="{ 'pr-140rpx': showButton, 'pr-24rpx': !showButton }"
        @input="handleInput"
        @confirm="handleConfirm"
      >

      <!-- 搜索按钮 -->
      <view
        v-if="showButton"
        class="absolute right-6rpx h-60rpx flex items-center justify-center border border-primary/12 rounded-30rpx from-primary/8 to-primary/12 bg-gradient-to-br px-28rpx transition-all active:scale-97"
        @tap="handleSearch"
      >
        <text class="text-26rpx text-primary font-medium">{{ buttonText }}</text>
      </view>
    </view>
  </view>
</template>
