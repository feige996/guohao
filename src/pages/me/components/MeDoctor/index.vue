<script lang="ts" setup>
import { ref } from 'vue'
import DoctorCard from '@/components/DoctorCard/index.vue'
import ToggleRole from '../ToggleRole.vue'
import DoctorProfile from './Components/DoctorProfile.vue'

definePage({
  style: {
    navigationBarTitleText: '医生我的',
  },
})

// 模拟收入数据
const incomeData = ref({
  month: '50.00',
  today: '50.00',
})

// 模拟评价数据
const ratingData = ref({
  goodCount: 188,
  replyCount: 160,
})

// 服务设置状态
const serviceSettings = ref({
  textConsult: true,
  voiceConsult: false,
  videoConsult: false,
})

// 处理开关切换
function handleSwitchChange(type: string, value: boolean) {
  switch (type) {
    case 'text':
      serviceSettings.value.textConsult = value
      break
    case 'voice':
      serviceSettings.value.voiceConsult = value
      break
    case 'video':
      serviceSettings.value.videoConsult = value
      break
  }
  console.log(`开关${type}已切换为:`, value)
}

// 点击收入区域
function handleIncomeClick() {
  console.log('点击了收入区域')
  // 跳转到收入明细页面
  uni.navigateTo({
    url: '/pages/doctor/me/income',
  })
}

// 点击服务设置
function handleServiceSettingsClick() {
  console.log('点击了服务设置')
  // 跳转到服务与排诊设置页面
  uni.navigateTo({
    url: '/pages/doctor/me/serviceSchedule',
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 px-3 pt-4">
    <!-- 顶部医生信息卡片 -->
    <DoctorCard />
    <!-- 我的档案区域 -->
    <DoctorProfile />

    <!-- 统计卡片区域 -->
    <view class="mt-3 flex gap-4">
      <!-- 我的收入卡片 -->
      <view class="flex-1 rounded-lg bg-white p-4 shadow-sm" @click="handleIncomeClick">
        <view class="flex items-center">
          <view class="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100">
            <text class="text-orange-500">💰</text>
          </view>
          <text class="ml-3 text-base font-medium">我的收入</text>
        </view>
        <view class="mt-2">
          <view class="flex items-center justify-between">
            <text class="text-xs text-gray-500">本月:</text>
            <text class="text-sm text-orange-500">¥{{ incomeData.month }}</text>
          </view>
          <view class="mt-1 flex items-center justify-between">
            <text class="text-xs text-gray-500">今日:</text>
            <text class="text-sm text-orange-500">¥{{ incomeData.today }}</text>
          </view>
        </view>
      </view>

      <!-- 患者评价卡片 -->
      <view class="flex-1 rounded-lg bg-white p-4 shadow-sm">
        <view class="flex items-center">
          <view class="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100">
            <text class="text-yellow-500">💬</text>
          </view>
          <text class="ml-3 text-base font-medium">患者评价</text>
        </view>
        <view class="mt-2">
          <view class="flex items-center">
            <text class="text-xs text-yellow-400">⭐⭐⭐⭐⭐</text>
          </view>
          <view class="mt-1">
            <text class="text-xs text-gray-500">累计好评: {{ ratingData.goodCount }}条</text>
          </view>
          <view class="mt-1">
            <text class="text-xs text-gray-500">累计回复: {{ ratingData.replyCount }}条</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 服务设置区域 -->
    <view class="mt-3 bg-white">
      <!-- 标题区域 - 可点击跳转 -->
      <view class="p-4" @click="handleServiceSettingsClick">
        <view class="flex items-center justify-between">
          <view class="flex items-center">
            <view class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
              <text class="text-red-500">⚙️</text>
            </view>
            <text class="ml-3 text-base font-medium">服务设置</text>
          </view>
          <text class="text-gray-400">›</text>
        </view>
      </view>

      <!-- 设置项 - 不可点击跳转 -->
      <view class="px-4 pb-4">
        <!-- 图文问诊 -->
        <view class="flex items-center justify-between border-b border-gray-100 py-3">
          <text class="text-base">图文问诊</text>
          <wd-switch
            v-model="serviceSettings.textConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @update:model-value="(val) => handleSwitchChange('text', val)"
          />
        </view>

        <!-- 语音问诊 -->
        <view class="flex items-center justify-between border-b border-gray-100 py-3">
          <text class="text-base">语音问诊</text>
          <wd-switch
            v-model="serviceSettings.voiceConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @update:model-value="(val) => handleSwitchChange('voice', val)"
          />
        </view>

        <!-- 视频问诊 -->
        <view class="flex items-center justify-between py-3">
          <text class="text-base">视频问诊</text>
          <wd-switch
            v-model="serviceSettings.videoConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @update:model-value="(val) => handleSwitchChange('video', val)"
          />
        </view>
      </view>
    </view>

    <ToggleRole />
  </view>
</template>
