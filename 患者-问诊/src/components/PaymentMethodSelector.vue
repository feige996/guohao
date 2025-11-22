<script setup lang="ts">
interface PaymentMethod {
  id: string
  name: string
  icon: string
  description?: string
  iconType?: 'wechat' | 'alipay' | 'emoji'
  bgColor?: string
}

interface Props {
  methods: PaymentMethod[]
  modelValue: string
  showDescription?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectMethod(methodId: string) {
  emit('update:modelValue', methodId)
}
</script>

<template>
  <view class="flex flex-col gap-16rpx">
    <view
      v-for="method in methods"
      :key="method.id"
      class="flex items-center gap-20rpx p-20rpx rounded-16rpx border-2rpx transition-all cursor-pointer active:scale-98"
      :class="modelValue === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'"
      @tap="selectMethod(method.id)"
    >
      <!-- 选择圆圈 -->
      <view class="flex-shrink-0 w-40rpx h-40rpx flex items-center justify-center">
        <view 
          class="w-20rpx h-20rpx rounded-full border-2rpx transition-all" 
          :class="modelValue === method.id ? 'border-primary bg-primary' : 'border-gray-300'" 
        />
      </view>

      <!-- 支付方式图标 -->
      <view
        v-if="method.bgColor"
        class="w-80rpx h-80rpx rounded-12rpx flex items-center justify-center flex-shrink-0"
        :style="{ background: method.bgColor }"
      >
        <image
          v-if="method.iconType === 'wechat'"
          src="~@/static/wx-h5.svg"
          class="w-56rpx h-56rpx"
          mode="aspectFit"
        />
        <image
          v-else-if="method.iconType === 'alipay'"
          src="~@/static/zfb-icon.svg"
          class="w-56rpx h-56rpx"
          mode="aspectFit"
        />
        <text v-else class="text-48rpx">{{ method.icon }}</text>
      </view>
      <text v-else class="text-48rpx flex-shrink-0">{{ method.icon }}</text>

      <!-- 支付方式信息 -->
      <view class="flex-1 flex flex-col gap-6rpx">
        <text class="text-28rpx font-semibold text-gray-800">{{ method.name }}</text>
        <text v-if="showDescription && method.description" class="text-24rpx text-gray-500">
          {{ method.description }}
        </text>
      </view>

      <!-- 右箭头 -->
      <view class="flex-shrink-0 text-gray-300 text-32rpx font-bold">
        <text>›</text>
      </view>
    </view>
  </view>
</template>
