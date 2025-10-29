<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 跳转到健康状态页面
function navigateToHealthStatus() {
  uni.navigateTo({
    url: '/pages/normal/index/healthStatus',
  })
}

// 日期相关数据
const year = ref('2025')
const month = ref('09')
const day = ref('06')
const lunarMonth = ref('七月')
const lunarDay = ref('十五')
const lunarYear = ref('乙巳蛇年')
const weatherCondition = ref('雨水')

// 体质状态相关数据
const bodyConstitution = ref('平和体质')
const healthAdvice = ref('神仙粥')
const healthDetail = ref('糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。')

// 初始化日期数据
function initDateData() {
  const date = new Date()
  // 这里可以使用更精确的农历转换库
  // 当前使用设计稿中的示例数据
  year.value = '2025'
  month.value = '09'
  day.value = '06'
}

onMounted(() => {
  initDateData()
})
</script>

<template>
  <view class="w-full flex gap-[12px] p-[16rpx]">
    <!-- 左侧日期卡片 -->
    <view class="relative flex-1 overflow-hidden rounded-lg bg-[#F2F6FF] p-[16rpx]">
      <!-- 农历信息区域 -->
      <view class="mb-[12rpx] flex items-center justify-between">
        <view class="flex items-center">
          <text class="text-[#666666] font-medium text-[28rpx]">{{ lunarMonth }}{{ lunarDay }}</text>
          <text class="mx-[12rpx] text-[#666666] text-[24rpx]">·</text>
          <text class="text-[#666666] font-medium text-[28rpx]">{{ lunarYear }}</text>
        </view>
        <!-- 天气状况标签 -->
        <view class="rounded-full bg-[#6495ED] px-[12rpx] py-[4rpx]">
          <text class="text-white text-[24rpx]">{{ weatherCondition }}</text>
        </view>
      </view>

      <!-- 公历日期显示 -->
      <view class="mb-[24rpx] flex items-end gap-[4rpx]">
        <text class="text-[#3366CC] font-bold text-[56rpx]">{{ year }}</text>
      </view>

      <!-- 主要日期显示 -->
      <view class="flex items-baseline gap-[8rpx]">
        <text class="text-[#3366CC] font-bold text-[72rpx]">{{ day }}</text>
        <text class="text-[#3366CC] font-bold text-[48rpx]">/</text>
        <text class="text-[#3366CC] font-bold text-[48rpx]">{{ month }}</text>
      </view>
    </view>

    <!-- 右侧体质状态卡片 -->
    <view
      class="relative flex-1 cursor-pointer overflow-hidden rounded-lg bg-[#FFF5F5] p-[16rpx]"
      @click="navigateToHealthStatus"
    >
      <!-- 体质状态标题 -->
      <view class="mb-[16rpx] flex items-center">
        <text class="text-[#666666] font-medium text-[28rpx]">体质状态：</text>
        <view class="ml-[8rpx] rounded-full bg-[#FF6B6B] px-[16rpx] py-[4rpx]">
          <text class="text-white font-medium text-[24rpx]">{{ bodyConstitution }}</text>
        </view>
      </view>

      <!-- 节气养生建议 -->
      <view class="mb-[16rpx]">
        <text class="text-[#666666] font-medium text-[28rpx]">气节养生建议：</text>
        <text class="ml-[8rpx] text-[#333333] font-medium text-[28rpx]">{{ healthAdvice }}</text>
      </view>

      <!-- 养生详细内容 -->
      <view class="rounded-lg bg-[#FFF0F0] p-[16rpx]">
        <text class="text-[#666666] text-[26rpx] leading-[36rpx]">{{ healthDetail }}</text>
      </view>

      <!-- 点击提示箭头 -->
      <view class="absolute h-[48rpx] w-[48rpx] rotate-45 transform bg-[#FFE0E0] -bottom-[12rpx] -right-[12rpx]">
        <text class="absolute left-[16rpx] top-[8rpx] text-[#FF6B6B] font-bold text-[32rpx]">></text>
      </view>
    </view>
  </view>
</template>
