<script setup lang="ts">
interface Address {
  id: string | number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault?: boolean
}

interface Props {
  addresses: Address[]
  modelValue: number
  showManage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showManage: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'manage': []
}>()

function selectAddress(index: number) {
  emit('update:modelValue', index)
}

function handleManage() {
  emit('manage')
}
</script>

<template>
  <view class="flex flex-col">
    <!-- 标题栏 -->
    <view class="mb-24rpx flex items-center justify-between">
      <text class="text-32rpx text-gray-800 font-bold">收货地址</text>
      <button
        v-if="showManage"
        class="border-none bg-transparent px-16rpx py-8rpx text-26rpx text-primary"
        aria-label="管理地址"
        @tap="handleManage"
      >
        <text>管理地址</text>
      </button>
    </view>

    <!-- 地址列表 -->
    <view class="flex flex-col gap-16rpx">
      <view
        v-for="(address, index) in addresses"
        :key="address.id"
        class="flex cursor-pointer items-center gap-16rpx border-2rpx rounded-16rpx p-24rpx transition-all active:scale-98"
        :class="index === modelValue ? 'border-primary bg-primary/2' : 'border-gray-100'"
        @tap="selectAddress(index)"
      >
        <!-- 选择圆圈 -->
        <view class="h-40rpx w-40rpx flex flex-shrink-0 items-center justify-center">
          <view
            class="h-20rpx w-20rpx border-2rpx rounded-full transition-all"
            :class="index === modelValue ? 'border-primary bg-primary' : 'border-gray-300'"
          />
        </view>

        <!-- 地址信息 -->
        <view class="flex flex-1 flex-col gap-8rpx">
          <view class="flex items-center gap-16rpx">
            <text class="text-30rpx text-gray-800 font-semibold">{{ address.name }}</text>
            <text class="text-26rpx text-gray-500">{{ address.phone }}</text>
            <view
              v-if="address.isDefault"
              class="rounded-full bg-primary px-12rpx py-4rpx text-20rpx text-white font-medium"
            >
              默认
            </view>
          </view>
          <text class="text-26rpx text-gray-500 leading-normal">
            {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
          </text>
        </view>

        <!-- 右箭头 -->
        <view class="flex-shrink-0 text-32rpx text-gray-300 font-bold">
          <text>›</text>
        </view>
      </view>
    </view>
  </view>
</template>
