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
  showManage: true
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  manage: []
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
    <view class="flex items-center justify-between mb-24rpx">
      <text class="text-32rpx font-bold text-gray-800">收货地址</text>
      <button 
        v-if="showManage"
        class="text-26rpx text-primary bg-transparent border-none px-16rpx py-8rpx" 
        @tap="handleManage" 
        aria-label="管理地址"
      >
        <text>管理地址</text>
      </button>
    </view>

    <!-- 地址列表 -->
    <view class="flex flex-col gap-16rpx">
      <view
        v-for="(address, index) in addresses"
        :key="address.id"
        class="flex items-center gap-16rpx p-24rpx rounded-16rpx border-2rpx transition-all cursor-pointer active:scale-98"
        :class="index === modelValue ? 'border-primary bg-primary/2' : 'border-gray-100'"
        @tap="selectAddress(index)"
      >
        <!-- 选择圆圈 -->
        <view class="flex-shrink-0 w-40rpx h-40rpx flex items-center justify-center">
          <view 
            class="w-20rpx h-20rpx rounded-full border-2rpx transition-all" 
            :class="index === modelValue ? 'border-primary bg-primary' : 'border-gray-300'" 
          />
        </view>

        <!-- 地址信息 -->
        <view class="flex-1 flex flex-col gap-8rpx">
          <view class="flex items-center gap-16rpx">
            <text class="text-30rpx font-semibold text-gray-800">{{ address.name }}</text>
            <text class="text-26rpx text-gray-500">{{ address.phone }}</text>
            <view 
              v-if="address.isDefault" 
              class="px-12rpx py-4rpx bg-primary text-white rounded-full text-20rpx font-medium"
            >
              默认
            </view>
          </view>
          <text class="text-26rpx text-gray-500 leading-normal">
            {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
          </text>
        </view>

        <!-- 右箭头 -->
        <view class="flex-shrink-0 text-gray-300 text-32rpx font-bold">
          <text>›</text>
        </view>
      </view>
    </view>
  </view>
</template>
