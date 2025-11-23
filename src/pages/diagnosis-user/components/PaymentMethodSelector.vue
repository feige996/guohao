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
  showDescription: true,
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
      class="flex cursor-pointer items-center gap-20rpx border-2rpx rounded-16rpx p-20rpx transition-all active:scale-98"
      :class="modelValue === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'"
      @tap="selectMethod(method.id)"
    >
      <!-- 选择圆圈 -->
      <view class="h-40rpx w-40rpx flex flex-shrink-0 items-center justify-center">
        <view
          class="h-20rpx w-20rpx border-2rpx rounded-full transition-all"
          :class="modelValue === method.id ? 'border-primary bg-primary' : 'border-gray-300'"
        />
      </view>

      <!-- 支付方式图标 -->
      <view
        v-if="method.bgColor"
        class="h-80rpx w-80rpx flex flex-shrink-0 items-center justify-center rounded-12rpx"
        :style="{ background: method.bgColor }"
      >
        <image
          v-if="method.iconType === 'wechat'"
          src="~@/static/wx-h5.svg"
          class="h-56rpx w-56rpx"
          mode="aspectFit"
        />
        <image
          v-else-if="method.iconType === 'alipay'"
          src="~@/static/zfb-icon.svg"
          class="h-56rpx w-56rpx"
          mode="aspectFit"
        />
        <text v-else class="text-48rpx">{{ method.icon }}</text>
      </view>
      <text v-else class="flex-shrink-0 text-48rpx">{{ method.icon }}</text>

      <!-- 支付方式信息 -->
      <view class="flex flex-1 flex-col gap-6rpx">
        <text class="text-28rpx text-gray-800 font-semibold">{{ method.name }}</text>
        <text v-if="showDescription && method.description" class="text-24rpx text-gray-500">
          {{ method.description }}
        </text>
      </view>

      <!-- 右箭头 -->
      <view class="flex-shrink-0 text-32rpx text-gray-300 font-bold">
        <text>›</text>
      </view>
    </view>
  </view>
</template>
