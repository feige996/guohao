<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

// 患者基本信息
const patientInfo = reactive({
  name: '张帅',
  gender: '男',
  age: 32,
  createDate: '2024年12月12日',
  firstVisitDate: '2025年1月6日'
})

// 时间选择
const selectedYear = ref('2025')
const selectedMonth = ref('05')
const selectedYearIndex = ref(1) // 2025年在数组中的索引
const selectedMonthIndex = ref(4) // 5月在数组中的索引（5-1=4）

// 年份和月份选项
const yearOptions = []
for (let i = 2024; i <= 2026; i++) {
  yearOptions.push(i.toString())
}

const monthOptions = []
for (let i = 1; i <= 12; i++) {
  monthOptions.push(i.toString().padStart(2, '0'))
}

// 问诊日期列表
const consultationDates = [
  { date: '2025/5/5', displayDate: '5月5日' },
  { date: '2025/5/18', displayDate: '5月18日' },
  { date: '2025/5/28', displayDate: '5月28日' }
]

// 当前选中的日期
const selectedDate = ref('2025/5/5')

// 问诊记录数据（根据日期不同显示不同内容）
const consultationData = {
  '2025/5/5': {
    consultationType: '图文问诊',
    chiefComplaint: '头痛，睡眠不安',
    diagnosis: '头痛',
    syndromeType: '肝胆上亢证',
    treatmentMethod: '平肝潜阳，滋养肝肾',
    prescription: [
      { name: '太子参', dosage: '15克' },
      { name: '枣仁', dosage: '15克' },
      { name: '龙骨', dosage: '15克' },
      { name: '牡蛎', dosage: '15克' },
      { name: '菊花', dosage: '15克' },
      { name: '川穹', dosage: '15克' },
      { name: '石菖蒲', dosage: '15克' }
    ],
    nursingSuggestions: [
      '情志：保持心情舒畅...',
      '饮食：清淡为宜...',
      '作息：避免熬夜...'
    ]
  },
  '2025/5/18': {
    consultationType: '图文问诊',
    chiefComplaint: '头痛减轻，睡眠有所改善',
    diagnosis: '头痛',
    syndromeType: '肝阳上亢，兼气血不足',
    treatmentMethod: '平肝潜阳，益气养血',
    prescription: [
      { name: '太子参', dosage: '15克' },
      { name: '枣仁', dosage: '15克' },
      { name: '黄芪', dosage: '15克' },
      { name: '当归', dosage: '10克' },
      { name: '菊花', dosage: '15克' },
      { name: '川穹', dosage: '10克' },
      { name: '甘草', dosage: '6克' }
    ],
    nursingSuggestions: [
      '情志：保持心情愉悦...',
      '饮食：增加营养，均衡饮食...',
      '作息：保持规律作息...'
    ]
  },
  '2025/5/28': {
    consultationType: '图文问诊',
    chiefComplaint: '头痛明显好转，睡眠质量提高',
    diagnosis: '头痛',
    syndromeType: '气血调和，肝阳已平',
    treatmentMethod: '调和气血，巩固疗效',
    prescription: [
      { name: '太子参', dosage: '15克' },
      { name: '黄芪', dosage: '15克' },
      { name: '白术', dosage: '10克' },
      { name: '茯苓', dosage: '10克' },
      { name: '当归', dosage: '10克' },
      { name: '白芍', dosage: '10克' },
      { name: '甘草', dosage: '6克' }
    ],
    nursingSuggestions: [
      '情志：继续保持良好心态...',
      '饮食：可适当增加滋补食物...',
      '作息：保持良好作息习惯...',
      '运动：适当进行有氧运动...'
    ]
  }
}

// 获取当前选中日期的数据
const currentConsultation = ref(consultationData[selectedDate.value])

// 处理日期选择
function handleDateSelect(date: string) {
  selectedDate.value = date
  currentConsultation.value = consultationData[date]
}

// 处理年份选择
function handleYearChange(e: any) {
  selectedYearIndex.value = e.detail.value
  selectedYear.value = yearOptions[e.detail.value]
  // 这里可以根据选择的年份更新日期列表
  console.log('选择年份:', selectedYear.value)
}

// 处理月份选择
function handleMonthChange(e: any) {
  selectedMonthIndex.value = e.detail.value
  selectedMonth.value = monthOptions[e.detail.value]
  // 这里可以根据选择的月份更新日期列表
  console.log('选择月份:', selectedMonth.value)
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 跳转到健康档案页面
function switchToHealthRecord() {
  uni.navigateTo({ url: '/pages-user-home/fuwuCard/HealthRecordModal' })
}

// 组件挂载
onMounted(() => {
  console.log('问诊记录页面已加载')
})
</script>

<template>
  <view class="page bg-gray-50 min-h-screen">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex h-12 items-center justify-between bg-white px-4 shadow-sm">
      <view class="flex items-center gap-2">
        <view class="text-lg font-medium" @click="handleBack">
          <text class="text-gray-800">&lt;</text>
        </view>
        <view class="text-lg font-medium text-gray-800">问诊记录</view>
      </view>
    </view>

    <!-- 患者信息 -->
    <view class="bg-white px-4 py-4">
      <view class="flex items-center gap-3">
        <view class="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <text class="text-blue-600 text-xl font-medium">{{ patientInfo.name.substring(0, 1) }}</text>
        </view>
        <view>
          <view class="text-lg font-medium text-gray-800">{{ patientInfo.name }}</view>
          <view class="text-sm text-gray-500">{{ patientInfo.gender }} {{ patientInfo.age }}岁</view>
        </view>
      </view>
      <view class="mt-3 text-sm text-gray-500">
        <view class="mb-1">建档时间：{{ patientInfo.createDate }}</view>
        <view>初诊时间：{{ patientInfo.firstVisitDate }}</view>
      </view>
    </view>

    <!-- 标签切换 -->
    <view class="flex bg-white px-4 pt-4">
      <view class="flex-1" @click="switchToHealthRecord">
        <view class="w-full border-b-2 border-blue-500 pb-2 text-center text-sm text-blue-500 font-medium">健康档案</view>
      </view>
      <view class="flex-1">
        <view class="w-full border-b-2 border-blue-500 pb-2 text-center text-sm text-blue-500 font-medium">问诊记录</view>
      </view>
    </view>

    <!-- 时间选择 -->
    <view class="mt-4 bg-white px-4 py-3">
      <view class="flex items-center justify-between">
        <picker :value="selectedYearIndex" :range="yearOptions" @change="handleYearChange" class="flex items-center">
          <view class="flex items-center gap-1">
            <text>{{ selectedYear }}</text>
            <text class="text-gray-500 text-xl">▼</text>
          </view>
        </picker>
        <picker :value="selectedMonthIndex" :range="monthOptions" @change="handleMonthChange" class="flex items-center">
          <view class="flex items-center gap-1">
            <text>{{ selectedMonth }}</text>
            <text class="text-gray-500 text-xl">▼</text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 问诊日期列表 -->
    <view class="mt-4 overflow-x-auto">
      <view class="flex px-4 pb-2">
        <view 
          v-for="item in consultationDates" 
          :key="item.date"
          @click="handleDateSelect(item.date)"
          class="flex-shrink-0 mr-4 px-3 py-2 rounded-lg"
          :class="selectedDate === item.date ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200'"
        >
          {{ item.displayDate }}
        </view>
      </view>
    </view>

    <!-- 问诊详情 -->
    <view class="mt-4 bg-white px-4 py-4">
      <!-- 问诊日期和方式 -->
      <view class="mb-4 pb-3 border-b border-gray-100">
        <view class="text-sm text-gray-500 mb-1">{{ selectedDate }}</view>
        <view class="text-sm">问诊方式：{{ currentConsultation.consultationType }}</view>
      </view>

      <!-- 主诉 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">主诉：</view>
        <view class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          {{ currentConsultation.chiefComplaint }}
        </view>
      </view>

      <!-- 中医诊断 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">中医诊断：</view>
        <view class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          {{ currentConsultation.diagnosis }}
        </view>
      </view>

      <!-- 辨证分型 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">辨证分型：</view>
        <view class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          {{ currentConsultation.syndromeType }}
        </view>
      </view>

      <!-- 治法 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">治法：</view>
        <view class="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
          {{ currentConsultation.treatmentMethod }}
        </view>
      </view>

      <!-- 方药 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">方药：</view>
        <view class="bg-gray-50 rounded-lg p-3">
          <view 
            v-for="(med, index) in currentConsultation.prescription" 
            :key="index"
            class="flex justify-between border-b border-gray-100 py-2 last:border-0"
          >
            <view class="text-sm text-gray-600">{{ med.name }}</view>
            <view class="text-sm text-gray-600">{{ med.dosage }}</view>
          </view>
        </view>
      </view>

      <!-- 调护建议 -->
      <view class="mb-4">
        <view class="mb-2 text-sm font-medium text-gray-700">调护建议：</view>
        <view class="bg-gray-50 rounded-lg p-3">
          <view 
            v-for="(suggestion, index) in currentConsultation.nursingSuggestions" 
            :key="index"
            class="mb-2 last:mb-0 text-sm text-gray-600"
          >
            {{ suggestion }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>