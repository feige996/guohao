<script setup lang="ts">
interface Props {
  visible: boolean
  title: string
  content: string
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  confirmColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '确定',
  cancelText: '取消',
  showCancel: true,
  confirmColor: '#8e4337'
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  'update:visible': [value: boolean]
}>()

function handleConfirm() {
  emit('confirm')
  emit('update:visible', false)
}

function handleCancel() {
  emit('cancel')
  emit('update:visible', false)
}

function handleMaskClick() {
  if (props.showCancel) {
    handleCancel()
  }
}
</script>

<template>
  <view 
    v-if="visible" 
    class="fixed inset-0 bg-black/50 z-200 flex items-center justify-center p-32rpx"
    @tap="handleMaskClick"
  >
    <view 
      class="w-full max-w-600rpx bg-white rounded-24rpx flex flex-col overflow-hidden"
      @tap.stop
    >
      <!-- 标题 -->
      <view class="px-32rpx py-24rpx border-b border-gray-200">
        <text class="text-32rpx font-bold text-gray-800">{{ title }}</text>
      </view>

      <!-- 内容 -->
      <view class="px-32rpx py-32rpx">
        <text class="text-28rpx text-gray-600 leading-relaxed whitespace-pre-wrap">{{ content }}</text>
      </view>

      <!-- 按钮区域 -->
      <view class="flex items-center border-t border-gray-200">
        <button
          v-if="showCancel"
          class="flex-1 h-88rpx border-none bg-transparent text-28rpx text-gray-600 font-medium transition-all active:bg-gray-50"
          @tap="handleCancel"
        >
          {{ cancelText }}
        </button>
        <view v-if="showCancel" class="w-1rpx h-60rpx bg-gray-200" />
        <button
          class="flex-1 h-88rpx border-none bg-transparent text-28rpx font-semibold transition-all active:bg-gray-50"
          :style="{ color: confirmColor }"
          @tap="handleConfirm"
        >
          {{ confirmText }}
        </button>
      </view>
    </view>
  </view>
</template>
