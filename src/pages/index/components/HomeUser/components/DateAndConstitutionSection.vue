<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 跳转到健康状态页面
function navigateToHealthStatus() {
  uni.navigateTo({
    url: '/pages/normal/index/healthStatus',
  })
}

// 定义日期和状态数据
const currentDate = ref('')
const lunarDate = ref('')
const yearAnimal = ref('')
const dayOfMonth = ref('')
const month = ref('')
const lunarDay = ref('')
const lunarMonth = ref('')
const lunarYear = ref('')

// 体质状态数据
const bodyStatus = ref('平和体质')
const qiCondition = ref('神气弱')
const bodyTemperature = ref('36.5°C')
const bloodPressure = ref('120/80mmHg')
const heartRate = ref('72次/分')
const respiratoryRate = ref('16次/分')
const bloodOxygen = ref('98%')
const note = ref('预防：适当运动，保持心情愉悦')

// 格式化日期函数
function formatDate() {
  const date = new Date()
  const year = date.getFullYear()
  const monthNum = date.getMonth() + 1
  const day = date.getDate()

  // 设置公历日期
  month.value = monthNum.toString().padStart(2, '0')
  dayOfMonth.value = day.toString().padStart(2, '0')
  currentDate.value = `${year}-${month.value}-${dayOfMonth.value}`

  // 简化的农历转换（实际项目中应使用更精确的农历库）
  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  const lunarDays = ['初', '十', '廿', '卅']

  lunarYear.value = '乙未禧年'
  lunarMonth.value = lunarMonths[monthNum - 1]

  // 简化的农历日计算
  let lunarDayStr = ''
  if (day === 10 || day === 20 || day === 30) {
    lunarDayStr = `${lunarDays[Math.floor((day) / 10)]}${day === 10 ? '十' : ''}`
  }
  else if (day < 10) {
    lunarDayStr = `${lunarDays[0]}${day}`
  }
  else if (day < 20) {
    lunarDayStr = `${lunarDays[1]}${day - 10}`
  }
  else if (day < 30) {
    lunarDayStr = `${lunarDays[2]}${day - 20}`
  }
  else {
    lunarDayStr = '三十'
  }

  lunarDay.value = lunarDayStr
  lunarDate.value = `${lunarYear.value} - ${lunarMonth.value}月${lunarDay.value}`
  yearAnimal.value = '乙巳蛇年'
}

onMounted(() => {
  formatDate()
})
</script>

<template>
  <div class="my-[16rpx] w-full flex space-x-[12px]">
    <!-- 日期信息矩形框 - 左侧 -->
    <div class="relative flex-1 overflow-hidden rounded-[12rpx] bg-white p-[20rpx] shadow-sm">
      <!-- 农历年份 -->
      <div class="mb-[8rpx]">
        <div class="flex items-center">
          <span class="text-[#333333] font-medium text-[28rpx]">{{ lunarYear }}</span>
          <span class="mx-[4rpx] text-[#333333] text-[28rpx]">·</span>
          <span class="text-[#333333] font-medium text-[28rpx]">{{ lunarMonth }}月{{ lunarDay }}</span>
        </div>
      </div>

      <!-- 公历日期 -->
      <div class="mb-[12rpx]">
        <span class="text-[#666666] text-[24rpx]">{{ currentDate }}</span>
      </div>

      <!-- 节气信息 -->
      <div class="mb-[16rpx] rounded-[8rpx] bg-[#FFF7E9] p-[12rpx]">
        <span class="text-[#FF6E36] text-[26rpx]">{{ yearAnimal }}</span>
      </div>

      <!-- 日期数字 -->
      <div class="flex items-baseline justify-between">
        <div class="flex items-baseline">
          <span class="text-[#333333] font-bold text-[52rpx]">{{ dayOfMonth }}</span>
          <span class="ml-[8rpx] text-[#666666] text-[24rpx]">{{ month }}/06</span>
        </div>
      </div>

      <!-- 移除数字标签 -->
    </div>

    <!-- 体质状态矩形框 - 右侧 -->
    <div class="relative flex-1 cursor-pointer rounded-[12rpx] bg-white p-[20rpx] shadow-sm" @click="navigateToHealthStatus">
      <div class="mb-[8rpx]">
        <div class="flex items-center">
          <span class="text-[#666666] text-[24rpx]">体质状态：</span>
          <span class="text-[#333333] font-medium text-[24rpx]">{{ bodyStatus }}</span>
        </div>
      </div>

      <div class="mb-[12rpx]">
        <div class="flex items-start">
          <span class="text-[#666666] text-[24rpx]">气节养生建议：</span>
          <span class="ml-[4rpx] text-[#333333] font-medium text-[24rpx]">{{ qiCondition }}</span>
        </div>
      </div>

      <!-- 养生详细建议 -->
      <div class="mb-[12rpx] line-clamp-2 rounded-[8rpx] bg-[#FFF7E9] p-[12rpx] text-[#666666] text-[22rpx]">
        {{ note }}
      </div>

      <!-- 健康数据 -->
      <div class="space-y-[8rpx]">
        <span class="block text-[#999999] text-[22rpx]">血压 {{ bloodPressure }}</span>
        <span class="block text-[#999999] text-[22rpx]">心率 {{ heartRate }}</span>
        <span class="block text-[#999999] text-[22rpx]">血氧 {{ bloodOxygen }}</span>
      </div>

      <!-- 移除数字标签 -->

      <!-- 点击提示 -->
      <div class="absolute bottom-[20rpx] right-[20rpx] flex items-center text-[#999999] text-[20rpx]">
        点击查看详情
        <uni-icons name="arrowright" size="16rpx" class="ml-[4rpx]" />
      </div>
    </div>
  </div>
</template>
