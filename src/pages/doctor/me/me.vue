<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '医生我的',
  },
})

// 模拟医生信息数据
const doctorInfo = ref({
  name: '李浩',
  title: '主任医师',
  department: '内分泌科',
  hospital: '国浩中医院',
  rating: '100%',
  consultationCount: 56800,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=center',
  recordDate: '2025/02/11 14:32:21',
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

// 点击档案区域
function handleRecordClick() {
  console.log('点击了档案区域')
  // 这里可以添加跳转到详细档案页面的逻辑
}

// 点击收入区域
function handleIncomeClick() {
  console.log('点击了收入区域')
  // 这里可以添加跳转到收入明细页面的逻辑
}

// 点击评价区域
function handleRatingClick() {
  console.log('点击了评价区域')
  // 这里可以添加跳转到评价详情页面的逻辑
}

// 格式化数字，添加千分位分隔符
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 顶部医生信息卡片 -->
    <view class="bg-white p-4">
      <view class="flex items-center">
        <!-- 医生头像 -->
        <image
          :src="doctorInfo.avatar"
          class="h-20 w-20 border-2 border-gray-200 rounded-full object-cover"
        />

        <!-- 医生信息 -->
        <view class="ml-4 flex-1">
          <view class="flex items-center">
            <text class="text-xl font-semibold">{{ doctorInfo.name }}</text>
            <text class="ml-2 text-base text-gray-600">{{ doctorInfo.title }}</text>
          </view>
          <view class="mt-1 flex items-center">
            <text class="mr-3 text-sm text-blue-500">{{ doctorInfo.department }}</text>
            <text class="text-sm text-gray-500">{{ doctorInfo.hospital }}</text>
          </view>
          <view class="mt-2 flex items-center">
            <text class="text-xs text-gray-500">好评:</text>
            <text class="ml-1 text-xs text-green-500">{{ doctorInfo.rating }}</text>
            <text class="ml-3 text-xs text-gray-500">接诊:</text>
            <text class="ml-1 text-xs text-blue-500">{{ formatNumber(doctorInfo.consultationCount) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 我的档案区域 -->
    <view class="mt-3 bg-white p-4" @click="handleRecordClick">
      <view class="flex items-center">
        <view class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
          <text class="text-blue-500">👤</text>
        </view>
        <view class="ml-4 flex-1">
          <view class="flex items-center justify-between">
            <text class="text-base font-medium">我的档案</text>
            <text class="text-xs text-gray-500">{{ doctorInfo.name }} {{ doctorInfo.title }}</text>
          </view>
          <view class="mt-1 flex items-center">
            <text class="mr-3 text-xs text-gray-500">{{ doctorInfo.department }}</text>
            <text class="text-xs text-gray-500">{{ doctorInfo.hospital }}</text>
          </view>
          <text class="mt-1 text-xs text-gray-400">{{ doctorInfo.recordDate }}</text>
        </view>
      </view>
    </view>

    <!-- 统计卡片区域 -->
    <view class="flex gap-4 mt-3 px-3">
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
      <view class="flex-1 rounded-lg bg-white p-4 shadow-sm" @click="handleRatingClick">
        <view class="flex items-center">
          <view class="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100">
            <text class="text-yellow-500">💬</text>
          </view>
          <text class="ml-3 text-base font-medium">患者评价</text>
        </view>
        <view class="mt-2">
          <view class="flex items-center">
            <text class="text-yellow-400 text-xs">⭐⭐⭐⭐⭐</text>
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
    <view class="mt-3 bg-white p-4">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <view class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
            <text class="text-red-500">⚙️</text>
          </view>
          <text class="ml-3 text-base font-medium">服务设置</text>
        </view>
      </view>

      <!-- 设置项 -->
      <view class="mt-4">
        <!-- 图文问诊 -->
        <view class="flex items-center justify-between border-b border-gray-100 py-3">
          <text class="text-base">图文问诊</text>
          <wd-switch
            v-model="serviceSettings.textConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @change="(val: any) => handleSwitchChange('text', val)"
          />
        </view>

        <!-- 语音问诊 -->
        <view class="flex items-center justify-between border-b border-gray-100 py-3">
          <text class="text-base">语音问诊</text>
          <wd-switch
            v-model="serviceSettings.voiceConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @change="(val: any) => handleSwitchChange('voice', val)"
          />
        </view>

        <!-- 视频问诊 -->
        <view class="flex items-center justify-between py-3">
          <text class="text-base">视频问诊</text>
          <wd-switch
            v-model="serviceSettings.videoConsult"
            active-color="#8c2303"
            inactive-color="#dcdfe6"
            @change="(val: any) => handleSwitchChange('video', val)"
          />
        </view>
      </view>
    </view>
  </view>
</template>
