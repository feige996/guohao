<script lang="ts" setup>
// 功能卡片类型定义
interface FunctionCardItem {
  id: string
  title: string
  bgImg: string
}

// 功能卡片事件处理
function handleFunctionCardClick(item: FunctionCardItem) {
  console.log('点击功能卡片:', item)
  // 根据卡片 ID 处理不同的业务逻辑
  switch (item.id) {
    case 'appointment':
      console.log('跳转到预约问诊')
      uni.navigateTo({
        url: '/pages-user-index/cquanyiCard/AppointmentConsult',
      })
      break
    case 'message':
      console.log('跳转到我的消息')
      uni.navigateTo({
        url: '/pages-user-index/cquanyiCard/message',
      })
      break
    case 'collection':
      console.log('跳转到养生收藏')
      uni.navigateTo({
        url: '/pages-user-index/cquanyiCard/HealthcareFavorites',
      })
      break
    case 'product':
      console.log('跳转到关注商品')
      uni.navigateTo({
        url: '/pages/normal/index/favoriteProducts',
      })
      break
    default:
      console.log('未知功能:', item.id)
  }
}

// 专属权益列表
const zsqyList: FunctionCardItem[] = [
  {
    id: 'appointment',
    title: '预约问诊',
    bgImg: 'src/static/images/home-user/zsqy/appointment-icon.png',
  },
  {
    id: 'message',
    title: '我的消息',
    bgImg: 'src/static/images/home-user/zsqy/message-icon.png',
  },
  {
    id: 'collection',
    title: '养生收藏',
    bgImg: 'src/static/images/home-user/zsqy/collection-icon.png',
  },
  {
    id: 'product',
    title: '关注商品',
    bgImg: 'src/static/images/home-user/zsqy/product-icon.png',
  },
]
</script>

<template>
  <view class="rounded-lg bg-white px-3 py-4">
    <!-- 标题栏 -->
    <view class="flex items-center">
      <view class="text-base text-[#333333] font-500">
        您的专属权益
      </view>
      <view class="ml-auto text-xs text-[#999999]">
        设置
      </view>
      <img
        class="ml-1 h-[24rpx] w-[24rpx]"
        src="/static/images/home-user/settings-arrow.png"
      >
    </view>
    <!-- 功能卡片网格布局 -->
    <view class="grid grid-cols-2 mt-3 gap-3">
      <view
        v-for="(item, index) in zsqyList"
        :key="item.id"
        class="h-[60px] rounded-lg bg-cover bg-right p-3 text-sm text-[#333333] font-500 leading-[60px] active:opacity-80 transition-opacity"
        :class="{
          'bg-gradient-to-r from-blue-50 to-green-50': index === 0,
          'bg-gradient-to-r from-orange-50 to-yellow-50': index === 1,
          'bg-gradient-to-r from-blue-50 to-indigo-50': index === 2,
          'bg-gradient-to-r from-pink-50 to-red-50': index === 3,
        }"
        :style="{
          backgroundImage: `url(${item.bgImg})`,
        }"
        @click="handleFunctionCardClick(item)"
      >
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
