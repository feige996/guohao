<script lang="ts" setup>
import { ref } from 'vue'
import ServiceCardItem from './Item.vue'

// 服务项配置
const list = [
  {
    id: 'consultation-record',
    title: '问诊记录',
    icon: '/static/images/me-user/diagnosis-record.png',
    bgColor: 'bg-[#fff0f0]',
  },
  {
    id: 'order',
    title: '商品订单',
    icon: '/static/images/me-user/order-list.png',
    bgColor: 'bg-[#f8f4e6]',
  },
  {
    id: 'health-record',
    title: '健康档案',
    icon: '/static/images/me-user/jkda.png',
    bgColor: 'bg-[#f0f7f0]',
  },
  {
    id: 'address',
    title: '地址管理',
    icon: '/static/images/me-user/address.png',
    bgColor: 'bg-[#f0f5ff]',
  },
]

// 服务项点击处理
function handleServiceClick(title: string) {
  console.log('点击服务项:', title)
  if (title === '健康档案') {
    // 跳转到健康档案详情页面
    uni.navigateTo({
      url: '/pages-user-home/fuwuCard/HealthRecordModal',
    })
  }
  else if (title === '问诊记录') {
    // 跳转到问诊记录页面
    uni.navigateTo({
      url: '/pages-user-home/fuwuCard/ConsultationRecord',
    })
  }
  else if (title === '地址管理') {
    uni.navigateTo({
      url: '/pages-user-home/fuwuCard/AddressManagement',
    })
  }

  else if (title === '商品订单') {
    // 跳转到购物车页面
    uni.navigateTo({
      url: '/pages/shop/cart',
    })
  }
  else {
    uni.showToast({
      title: '功能开发中',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="rounded-[8rpx] bg-white bg-white px-3 py-4">
    <view class="flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]">
      我的服务
    </view>
    <view class="grid grid-cols-4 w-full gap-[16rpx]">
      <ServiceCardItem
        v-for="service in list"
        :key="service.id"
        :title="service.title"
        :icon-url="service.icon"
        @click="handleServiceClick(service.title)"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
