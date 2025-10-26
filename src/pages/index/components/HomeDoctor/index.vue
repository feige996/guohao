<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationBarTitleText: '工作台',
  },
})

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
  <view class="min-h-screen bg-[#f8f8f8]" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }">
    <!-- 医生信息区域 -->
    <view class="bg-white px-4 py-5">
      <view class="flex items-center">
        <image src="https://via.placeholder.com/100" alt="医生头像" class="h-16 w-16 border-2 border-[#f0f0f0] rounded-full" />
        <view class="ml-4 flex-1">
          <view class="flex items-center">
            <text class="text-lg font-semibold">李浩</text>
            <text class="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">主任医师</text>
          </view>
          <text class="mt-1 text-sm text-gray-500">内分泌科 | 团结中国医院</text>
          <view class="mt-2 flex items-center">
            <text class="text-sm text-gray-600">好评：</text>
            <text class="text-sm text-red-500">100%</text>
            <text class="ml-3 text-sm text-gray-600">接诊：</text>
            <text class="text-sm text-red-500">56800</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 统计卡片区域 -->
    <view class="mt-2 bg-white px-4 py-4">
      <view class="grid grid-cols-3 gap-2">
        <view class="flex flex-col items-center">
          <text class="text-lg font-semibold">36</text>
          <text class="mt-1 text-sm text-gray-500">开方数</text>
          <image src="/static/tabbar/index.png" alt="开方" class="mt-1 h-8 w-8" />
        </view>
        <view class="flex flex-col items-center">
          <text class="text-lg font-semibold">18</text>
          <text class="mt-1 text-sm text-gray-500">患者数</text>
          <image src="/static/tabbar/index.png" alt="患者" class="mt-1 h-8 w-8" />
        </view>
        <view class="flex flex-col items-center">
          <text class="text-lg font-semibold">6</text>
          <text class="mt-1 text-sm text-gray-500">接诊数</text>
          <image src="/static/tabbar/index.png" alt="接诊" class="mt-1 h-8 w-8" />
        </view>
      </view>
    </view>

    <!-- 温馨提醒区域 -->
    <view class="mt-2 bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="text-orange-500">⚠️</text>
        <text class="ml-2 text-base font-medium">温馨提醒</text>
      </view>
      <view class="mt-2">
        <text class="mb-1 block text-sm text-gray-600">1. 您有2位患者等待接诊，请您及时安排</text>
        <text class="mb-1 block text-sm text-gray-600">2. 患者（王某）已超时请尽快处理</text>
        <text class="block text-sm text-gray-600">3. 患者（车某）已超时请尽快处理</text>
      </view>
    </view>

    <!-- 功能模块区域 -->
    <view class="mt-2 bg-white px-4 py-4">
      <view class="grid grid-cols-2 gap-4">
        <!-- 看诊安排 - 左侧正方形卡片 -->
        <view class="relative aspect-square flex flex-col items-center justify-center rounded-lg bg-[#f0f7ff]" @click="handleConsultationClick">
          <view class="absolute inset-0 border border-blue-200 rounded-lg border-dashed -m-1" />
          <view class="h-24 w-24 flex items-center justify-center rounded-full bg-red-50">
            <text class="text-4xl">👨‍⚕️</text>
          </view>
          <text class="mt-4 text-lg text-gray-700 font-medium">看诊安排</text>
        </view>

        <!-- 右侧卡片容器 -->
        <view class="flex flex-col gap-4">
          <!-- 处方管理 - 右侧上方 -->
          <view class="flex items-center justify-center rounded-lg bg-white shadow-sm" style="height: 89.18px !important; min-height: 89.18px; max-height: 89.18px;" @click="handlePrescriptionClick">
            <view class="h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
              <text class="text-xl">📋</text>
            </view>
            <view class="ml-2 flex items-center justify-between">
              <text class="text-gray-700 font-medium">处方管理</text>
              <text class="text-xs text-red-500">+</text>
            </view>
          </view>

          <!-- 我的消息 - 右侧下方 -->
          <view class="flex items-center justify-center rounded-lg bg-white shadow-sm" style="height: 89.18px !important; min-height: 89.18px; max-height: 89.18px;" @click="handleMessageClick">
            <view class="flex items-center">
              <view class="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100">
                <text class="text-xl">💬</text>
              </view>
              <text class="ml-2 text-gray-700 font-medium">我的消息</text>
              <text class="ml-auto text-gray-400">›</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部占位，确保内容不被导航栏遮挡 -->
    <view class="h-20" />
  </view>
</template>
