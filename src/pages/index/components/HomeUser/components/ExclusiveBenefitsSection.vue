<script lang="ts" setup>
// 专属权益列表
const zsqyList = [
  {
    title: '预约问诊',
    bgImg: 'src/static/images/home-user/zsqy/appointment-icon.png',
  },
  {
    title: '我的消息',
    bgImg: 'src/static/images/home-user/zsqy/message-icon.png',
  },
  {
    title: '养生收藏',
    bgImg: 'src/static/images/home-user/zsqy/collection-icon.png',
  },
  {
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
        :key="item.title"
        class="h-[60px] rounded-lg bg-cover bg-right p-3 text-sm text-[#333333] font-500 leading-[60px]"
        :class="{
          'bg-gradient-to-r from-blue-50 to-green-50': index === 0,
          'bg-gradient-to-r from-orange-50 to-yellow-50': index === 1,
          'bg-gradient-to-r from-blue-50 to-indigo-50': index === 2,
          'bg-gradient-to-r from-pink-50 to-red-50': index === 3,

        }"
        :style="{
          backgroundImage: `url(${item.bgImg})`,
        }"
      >
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
