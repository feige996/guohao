<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 跳转到健康状态页面
function navigateToHealthStatus() {
  uni.navigateTo({
    url: '/pages-user-index/briqiCard/healthStatus',
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
  <view class="w-[120px] flex flex-col justify-between rounded-lg bg-[#ebf4ff] p-2">
    <!-- 农历信息区域 -->
    <view class="mb-[12rpx] flex items-center justify-between">
      <view class="flex flex-col gap-1 text-[#999999] font-medium text-[32rpx]">
        <text class="">{{ lunarMonth }}{{ lunarDay }}</text>
        <text class="">{{ lunarYear }}</text>
      </view>
      <!-- 天气状况标签 -->
      <view class="w-[36rpx] rounded-lg bg-[#8bafd7] px-1 py-2 text-center font-500">
        <text v-for="char in weatherCondition" :key="char" class="block text-white text-[26rpx] leading-[32rpx]">
          {{ char }}
        </text>
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
