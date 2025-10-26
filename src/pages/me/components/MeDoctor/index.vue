<script lang="ts" setup>
import { ref } from 'vue'
import DoctorCard from '@/components/DoctorCard/index.vue'
import ToggleRole from '../ToggleRole.vue'
import DoctorProfile from './Components/DoctorProfile.vue'
import ServiceSetting from './Components/ServiceSetting.vue'

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

// 点击收入区域
function handleIncomeClick() {
  console.log('点击了收入区域')
  // 跳转到收入明细页面
  uni.navigateTo({
    url: '/pages/doctor/me/income',
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
    <ServiceSetting />

    <ToggleRole />
  </view>
</template>
