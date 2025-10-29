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
  <!-- 左侧日期卡片 -->
  <view class="flex flex-1 flex-col justify-between rounded-lg bg-[#ebf4ff] p-2">
    <!-- 农历信息区域 -->
    <view class="mb-[12rpx] flex items-center justify-between">
      <view class="flex flex-col gap-1 text-[#999999] font-medium text-[32rpx]">
        <text class="">{{ lunarMonth }}{{ lunarDay }}</text>
        <text class="">{{ lunarYear }}</text>
      </view>
      <!-- 天气状况标签 -->
      <view class="rounded-full bg-[#6495ED] px-[12rpx] py-[4rpx]">
        <text class="text-white text-[24rpx]">{{ weatherCondition }}</text>
      </view>
    </view>
    <div class="rounded-lg bg-white p-2 text-[#286bab]">
      <!-- 公历日期显示 -->
      <view class="mb-[12rpx] flex items-end gap-[4rpx]">
        <text class="font-bold text-[26rpx]">{{ year }}</text>
      </view>

      <!-- 主要日期显示 -->
      <view class="flex items-baseline gap-[8rpx] font-bold text-[48rpx]">
        <text class="">{{ day }}</text>
        <text class="">/</text>
        <text class="">{{ month }}</text>
      </view>
    </div>
  </view>
</template>
