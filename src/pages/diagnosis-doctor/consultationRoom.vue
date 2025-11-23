<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '我的诊室',
  },
})

// 患者信息
const patientInfo = ref({
  name: '吴姗姗',
  gender: '女',
  age: 32,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
})

// 健康档案信息
const healthRecord = ref({
  quickInfo: '健康档案快照',
  firstDiagnosis: '1. 中医诊断：肝阳上亢证',
  allergy: '过敏史：无',
  consultationHistory: [
    {
      date: '2025/6/5',
      status: '已完成',
      diagnosis: '肝阳上亢证',
      treatment: '平肝潜阳，滋养肝肾',
    },
  ],
})

// 处理图文问诊
function handleTextConsult() {
  uni.showActionSheet({
    itemList: ['图文问诊', '语音问诊', '视频问诊'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 点击图文问诊
        uni.navigateTo({
          url: '/pages/doctor/diagnosis/textConsult'
        })
      } else if (res.tapIndex === 1) {
        // 点击语音问诊
        uni.navigateTo({
          url: '/pages/doctor/diagnosis/voiceConsult'
        })
      } else if (res.tapIndex === 2) {
        // 点击视频问诊
        uni.navigateTo({
          url: '/pages/doctor/diagnosis/videoConsult'
        })
      }
    }
  })
}

// 处理发送提醒
function handleSendReminder() {
  console.log('发送提醒')
}

// 处理视频问诊
function handleVideoConsult() {
  console.log('视频问诊')
}

// 完善健康档案
function handleCompleteHealthRecord() {
  console.log('完善健康档案')
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <view class="sticky top-0 z-10 bg-white flex items-center justify-between p-4">
      <text class="text-base text-blue-500" @click="navigateBack">‹</text>
      <text class="text-lg font-medium">我的诊室</text>
      <view class="w-6"></view>
    </view>
    
    <!-- 患者信息卡片 -->
    <view class="mt-2 mb-3 bg-white p-4">
      <view class="flex items-center">
        <image
          :src="patientInfo.avatar"
          class="mr-4 h-16 w-16 rounded-full object-cover"
        />
        <view>
          <view class="flex items-center">
            <text class="text-xl font-medium">{{ patientInfo.name }}</text>
            <text class="ml-2 text-gray-600">{{ patientInfo.gender }}</text>
            <text class="ml-2 text-gray-600">{{ patientInfo.age }}岁</text>
          </view>
          <view class="mt-2 flex gap-2">
            <button
              class="rounded-full bg-red-500 py-1 px-4 text-sm text-white"
              @click="handleTextConsult"
            >
              图文问诊
            </button>
            <button
              class="rounded-full bg-green-500 py-1 px-4 text-sm text-white"
              @click="handleSendReminder"
            >
              发送提醒
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 健康档案区域 -->
    <view class="mb-3 bg-white p-4">
      <view class="mb-2 text-base font-medium">
        {{ healthRecord.quickInfo }}
      </view>
      
      <!-- 健康档案信息 -->
      <view class="mb-3">
        <text class="block mb-2 text-sm text-gray-700">{{ healthRecord.firstDiagnosis }}</text>
        <text class="block text-sm text-gray-700">{{ healthRecord.allergy }}</text>
      </view>
      
      <!-- 完善健康档案按钮 -->
      <button
        class="w-full rounded-full border border-blue-500 py-2 text-sm text-blue-500"
        @click="handleCompleteHealthRecord"
      >
        完善健康档案
      </button>
    </view>
    
    <!-- 健康档案览 -->
    <view class="bg-white p-4">
      <view class="mb-3 text-base font-medium">
        健康档案览
      </view>
      
      <!-- 问诊记录 -->
      <view v-for="(record, index) in healthRecord.consultationHistory" :key="index" class="mb-3 border-b border-gray-100 pb-3">
        <view class="flex items-center justify-between mb-1">
          <text class="text-sm text-gray-700">{{ record.date }}</text>
          <text class="text-sm text-green-500">{{ record.status }}</text>
        </view>
        <text class="block mb-1 text-sm text-gray-600">诊断医师: 张帅</text>
        <text class="block mb-1 text-sm text-gray-600">医生诊断: {{ record.diagnosis }}</text>
        <text class="block text-sm text-gray-600">治疗方案: {{ record.treatment }}</text>
      </view>
      
      <!-- 视频问诊按钮 -->
      <button
        class="w-full rounded-full bg-blue-500 py-2 text-sm text-white"
        @click="handleVideoConsult"
      >
        视频问诊
      </button>
    </view>
  </view>
</template>