<script setup lang="ts">
import { onMounted, ref } from 'vue'

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
    lunarDayStr = `${lunarDays[Math.floor((day)/10)]}${day === 10 ? '十' : ''}`
  } else if (day < 10) {
    lunarDayStr = `${lunarDays[0]}${day}`
  } else if (day < 20) {
    lunarDayStr = `${lunarDays[1]}${day - 10}`
  } else if (day < 30) {
    lunarDayStr = `${lunarDays[2]}${day - 20}`
  } else {
    lunarDayStr = '三十'
  }
  
  lunarDay.value = lunarDayStr
  lunarDate.value = `${lunarYear.value} - ${lunarMonth.value}月${lunarDay.value}`
  yearAnimal.value = '水'
}

onMounted(() => {
  formatDate()
})
</script>

<template>
  <div class="flex space-x-[12px]">
    <!-- 日期信息矩形框 -->
    <div class="w-[168px] h-[172px] bg-white rounded-[8px] p-[12px] shadow-md relative">
      <!-- 农历日期 -->
      <div class="mb-[8px]">
        <div class="flex items-center">
          <span class="text-[16px] font-medium text-[#333333]">{{ lunarYear }}</span>
          <span class="mx-[4px] text-[16px] text-[#333333]">-</span>
          <span class="text-[16px] font-medium text-[#333333]">{{ lunarMonth }}月{{ lunarDay }}</span>
          <span class="ml-[8px] text-[12px] text-[#999999]">{{ yearAnimal }}气</span>
        </div>
        <span class="text-[14px] text-[#666666] mt-[4px] block">{{ currentDate }}</span>
      </div>
      
      <!-- 日期数字 -->
      <div class="flex items-end justify-between">
        <div class="flex flex-col">
          <span class="text-[28px] font-bold text-[#333333]">{{ dayOfMonth }}</span>
          <span class="text-[14px] text-[#666666]">{{ month }} / 16</span>
        </div>
      </div>
      
      <!-- 数字标签 -->
      <div class="absolute top-[12px] right-[12px] text-[16px] font-medium text-[#333333]">16</div>
    </div>
    
    <!-- 体质状态矩形框 -->
    <div class="w-[168px] h-[172px] bg-white rounded-[8px] p-[12px] shadow-md relative">
      <div class="mb-[8px]">
        <div class="flex items-center">
          <span class="text-[14px] text-[#666666]">体质状态：</span>
          <span class="text-[14px] font-medium text-[#333333]">{{ bodyStatus }}</span>
        </div>
        <div class="flex items-start mt-[4px]">
          <span class="text-[14px] text-[#666666]">气节养生建议：</span>
          <span class="text-[14px] font-medium text-[#333333] ml-[4px]">{{ qiCondition }}</span>
        </div>
      </div>
      
      <div class="space-y-[2px]">
        <span class="text-[12px] text-[#999999] block">血压 {{ bloodPressure }}</span>
        <span class="text-[12px] text-[#999999] block">心率 {{ heartRate }}</span>
        <span class="text-[12px] text-[#999999] block">血氧 {{ bloodOxygen }}</span>
      </div>
      
      <!-- 备注信息 -->
      <div class="mt-[8px]">
        <span class="text-[12px] text-[#999999]">{{ note }}</span>
      </div>
      
      <!-- 数字标签 -->
      <div class="absolute top-[12px] right-[12px] text-[16px] font-medium text-[#333333]">16</div>
    </div>
  </div>
</template>