<script lang="ts" setup>
import FunctionCard from './components/FunctionCard.vue'
import SummaryCard from './components/SummaryCard.vue'

// 待诊患者数据
const waitingPatients = [
  {
    id: 1,
    name: '王军',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 2,
    name: '刘艳',
    gender: '女',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 3,
    name: '陈泰来',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
]

// 处理图文问诊
function handleTextConsult(patientId: number) {
  console.log('图文问诊:', patientId)
}

// 处理查看档案
function handleViewRecord(patientId: number) {
  console.log('查看档案:', patientId)
}

// 处理发送提醒
function handleSendReminder(patientId: number) {
  console.log('发送提醒:', patientId)
}

// 导航到我的诊室
function navigateToConsultationRoom() {
  console.log('导航到我的诊室')
  uni.navigateTo({
    url: '/pages/doctor/diagnosis/consultationRoom',
  })
}

// 导航到开方页面
function navigateToPrescription(): void {
  console.log('导航到开方页面')
  uni.navigateTo({
    url: '/pages/doctor/diagnosis/newPrescription',
  })
}
</script>

<template>
  <view class="">
    <!-- 问诊数据区域 -->
    <SummaryCard />

    <!-- 功能按钮区域 -->
    <view class="mt-4">
      <FunctionCard />
    </view>

    <!-- 待诊患者区域 -->
    <view class="mt-3 bg-white p-4">
      <view class="mb-4 text-base font-medium">
        待诊患者
      </view>

      <!-- 患者列表 -->
      <view class="space-y-4">
        <view
          v-for="patient in waitingPatients"
          :key="patient.id"
          class="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
        >
          <view class="mb-2 flex items-center">
            <image
              :src="patient.avatar"
              class="mr-3 h-10 w-10 rounded-full object-cover"
            />
            <view>
              <view class="flex items-center">
                <text class="mr-2 text-base font-medium">{{ patient.name }}</text>
                <text :class="patient.gender === '男' ? 'text-blue-500' : 'text-pink-500'">
                  {{ patient.gender === '男' ? '男' : '女' }}
                </text>
              </view>
              <view class="mt-1 flex items-center text-xs text-gray-500">
                <text class="mr-2">{{ patient.type }}</text>
                <text class="mr-2">{{ patient.disease }}</text>
                <text>上次问诊: {{ patient.lastConsultDate }}</text>
              </view>
            </view>
          </view>

          <text class="mb-3 text-xs text-gray-400">{{ patient.consultationTime }}</text>

          <view class="flex gap-2">
            <button
              class="flex-1 rounded bg-red-500 py-2 text-sm text-white"
              @click="handleTextConsult(patient.id)"
            >
              图文问诊
            </button>
            <button
              class="flex-1 rounded bg-yellow-500 py-2 text-sm text-white"
              @click="handleViewRecord(patient.id)"
            >
              检索档案
            </button>
            <button
              class="flex-1 rounded bg-green-500 py-2 text-sm text-white"
              @click="handleSendReminder(patient.id)"
            >
              发送提醒
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-gray-200 bg-white py-2">
      <view class="flex flex-col items-center py-1 text-xs text-gray-500">
        <text class="mb-1 text-lg">🏠</text>
        <text>首页</text>
      </view>
      <view class="flex flex-col items-center py-1 text-xs text-gray-500">
        <text class="mb-1 text-lg">👥</text>
        <text>患者</text>
      </view>
      <view class="flex flex-col items-center py-1 text-xs text-red-500">
        <text class="mb-1 text-lg">💊</text>
        <text>问诊</text>
      </view>
      <view class="flex flex-col items-center py-1 text-xs text-gray-500">
        <text class="mb-1 text-lg">📊</text>
        <text>病历</text>
      </view>
    </view>
  </view>
</template>
