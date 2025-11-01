<script lang="ts" setup>
import { useUserStore } from '@/store'
import StatisticCard from './components/StatisticCard.vue'

const userStore = useUserStore()
// 处理看诊安排点击
function handleConsultationClick() {
  console.log('点击看诊安排')
}

// 处理处方管理点击
function handlePrescriptionClick() {
  console.log('点击处方管理')
}

// 处理我的消息点击
function handleMessageClick() {
  console.log('点击我的消息')
}
</script>

<template>
  <view class="">
    <!-- 顶部医生信息卡片 -->
    <DoctorCard :doctor-info="userStore.userInfo" />

    <!-- 统计卡片区域 -->
    <StatisticCard />

    <!-- 温馨提醒区域 -->
    <view class="mt-3 rounded-lg bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="text-base text-#AE956D font-medium">温馨提醒</text>
      </view>
      <view class="mt-2">
        <text class="mb-1 block text-sm text-#89A2BE">1. 您有2位患者等待接诊，请您及时安排</text>
        <text class="mb-1 block text-sm text-#89A2BE">2. 患者<text class="text-#FF5100">（王某）</text>已超时请尽快处理</text>
        <text class="block text-sm text-#89A2BE">3. 患者<text class="text-#FF5100">（李某）</text>已超时请尽快处理</text>
      </view>
    </view>

    <!-- 功能模块区域 -->
    <view class="mt-3">
      <view class="grid grid-cols-2 gap-4">
        <!-- 看诊安排 - 左侧正方形卡片 -->
        <view class="flex flex-col items-center gap-3 rounded-lg bg-white pt-4" @click="handleConsultationClick">
          <image src="/static/images/home-doctor/schedule.png" class="h-120px w-120px" />
          <view class="text-lg text-#333333 font-medium">
            看诊安排
          </view>
        </view>

        <!-- 右侧卡片容器 -->
        <view class="flex flex-col gap-4">
          <!-- 处方管理 - 右侧上方 -->
          <view class="flex items-center justify-between rounded-lg bg-white px-4" style="height: 89.18px !important; min-height: 89.18px; max-height: 89.18px;" @click="handlePrescriptionClick">
            <text class="text-lg text-#333333 font-medium">处方管理</text>
            <image src="/static/images/home-doctor/prescription.png" class="h-30px w-30px" />
          </view>

          <!-- 我的消息 - 右侧下方 -->
          <view class="flex items-center justify-between rounded-lg bg-white px-4" style="height: 89.18px !important; min-height: 89.18px; max-height: 89.18px;" @click="handleMessageClick">
            <text class="text-lg text-#333333 font-medium">我的消息</text>
            <image src="/static/images/home-doctor/message.png" class="h-30px w-30px" />
          </view>
        </view>
      </view>
    </view>

    <!-- 底部占位，确保内容不被导航栏遮挡 -->
    <view class="h-20" />
  </view>
</template>
