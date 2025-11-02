<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConstitutionTag from './ConstitutionTag.vue'

// 跳转到健康状态页面
function navigateToHealthStatus() {
  uni.navigateTo({
    url: '/pages/VshouyeType/briqiCard/healthStatus',
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
  <!-- 右侧体质状态卡片 -->
  <view
    class="flex flex-1 flex-col justify-between rounded-lg bg-[#FCE3E1] p-2"
    @click="navigateToHealthStatus"
  >
    <!-- 体质状态标题 -->
    <view class="mb-[16rpx] flex items-center">
      <view class="text-xs text-[#BA7210] font-700">
        体质状态：
      </view>
      <ConstitutionTag :constitution="bodyConstitution" />
    </view>

    <view class="rounded bg-[#ffffff80] p-2">
      <!-- 节气养生建议 -->
      <view class="mb-[16rpx] font-medium text-[28rpx]">
        <text class="text-[#666666]">气节养生建议:</text>
        <text class="ml-[8rpx] text-[#333333]">{{ healthAdvice }}</text>
      </view>

      <!-- 养生详细内容 -->
      <view class="text-xs text-[#ABABAB] leading-[40rpx]">
        {{ healthDetail }}
      </view>
    </view>
  </view>
</template>
