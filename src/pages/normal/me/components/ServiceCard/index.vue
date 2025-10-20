<script lang="ts" setup>
import ServiceCard from './Item.vue'
// 服务项配置
const list = [
  {
    id: 'consultation-record',
    title: '问诊记录',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226508/77bc/5dd6/9844/c4a72f29c70308915a12d88e1bf7f368.png',
    bgColor: 'bg-[#fff0f0]',
  },
  {
    id: 'order',
    title: '商品订单',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650223673/8c52/9644/88b4/95fa6e626f409bfcabe3ab2b20269ed2.png',
    bgColor: 'bg-[#f8f4e6]',
  },
  {
    id: 'health-record',
    title: '健康档案',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650224797/4274/2528/339b/600c29854c72cbe3017db993e255c8cd.png',
    bgColor: 'bg-[#f0f7f0]',
  },
  {
    id: 'address',
    title: '地址管理',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650228089/e392/c333/b6d3/06fc2f16d63579eacfc1f05951fca735.png',
    bgColor: 'bg-[#f0f5ff]',
  },
]

// 服务项点击处理
function handleServiceClick(item: any) {
  console.log('点击服务项:', item)
  switch (item.id) {
    case 'vip':
      uni.navigateTo({ url: '/pages/vip/vip' })
      break
    case 'customer-service':
      uni.navigateTo({ url: '/pages/customer-service/customer-service' })
      break
    default:
      uni.showToast({
        title: '功能开发中',
        icon: 'none',
      })
  }
}
</script>

<template>
  <view class="mx-[24rpx] mt-[16rpx] flex flex-col items-start justify-center gap-[32rpx] rounded-[8rpx] bg-white bg-white pb-[32rpx] pl-[32rpx] pr-[32rpx] pt-[32rpx]">
    <span class="flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]"> 我的服务 </span>
    <view class="grid grid-cols-4 w-full gap-[16rpx]">
      <ServiceCard
        v-for="(service, index) in list"
        :key="index"
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
