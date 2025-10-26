<script setup lang="ts">
import SummaryCard from './components/SummaryCard.vue'
// 患者信息列表
const patientList = [
  {
    id: 1,
    name: '王军',
    gender: '男',
    disease: '2型糖尿病',
    lastVisit: '6月10日',
    timestamp: '2025/02/11 14:32:21',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: '复诊',
  },
  {
    id: 2,
    name: '刘艳',
    gender: '女',
    disease: '2型糖尿病',
    lastVisit: '6月10日',
    timestamp: '2025/02/11 14:32:21',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: '复诊',
  },
]

// 处理患者点击
function handlePatientClick(patientId: number) {
  console.log('查看患者详情:', patientId)
  // 这里可以添加跳转到患者详情页的逻辑
}

// 处理功能卡片点击
function handleCardClick(type: string) {
  console.log('点击卡片类型:', type)
  // 这里可以添加跳转到对应页面的逻辑
}

// 搜索处理
function handleSearch(keyword: string) {
  console.log('搜索关键词:', keyword)
  // 这里可以添加搜索逻辑
}
</script>

<template>
  <view class="min-h-screen bg-gray-50 px-3">
    <!-- 搜索栏 -->
    <view class="bg-white px-4 pb-2 pt-2">
      <view class="relative">
        <input
          type="text"
          placeholder="搜索患者名称/疾病"
          class="h-10 w-full rounded-full bg-gray-100 pl-10 pr-4 text-sm focus:outline-none"
          @confirm="handleSearch($event.target.value)"
        >
        <text class="absolute left-3 top-1/2 transform text-gray-400 -translate-y-1/2">🔍</text>
        <button class="absolute right-2 top-1/2 transform rounded-full bg-amber-700 px-3 py-1 text-sm text-white -translate-y-1/2">
          搜索
        </button>
      </view>
    </view>

    <!-- 患者数据统计 -->
    <SummaryCard class="mt-3" />

    <!-- 功能卡片 -->
    <FunctionCard class="mt-3" />

    <!-- 患者列表 -->
    <view class="mt-4 px-4">
      <view class="mb-2 flex items-center justify-between">
        <text class="text-lg font-semibold">新增患者</text>
      </view>

      <!-- 患者列表项 -->
      <view class="space-y-3">
        <template v-for="patient in patientList" :key="patient.id">
          <view class="rounded-lg bg-white p-3 shadow-sm" @click="handlePatientClick(patient.id)">
            <view class="flex items-start">
              <image :src="patient.avatar" class="mr-3 h-12 w-12 rounded-lg" mode="aspectFill" />
              <view class="flex-1">
                <view class="flex items-center">
                  <text class="text-base font-semibold">{{ patient.name }}</text>
                  <text class="ml-2 text-xs text-gray-500">{{ patient.gender }}</text>
                </view>
                <view class="mt-1 flex items-center">
                  <text class="rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-700">
                    {{ patient.type }}
                  </text>
                  <text class="ml-2 text-sm text-gray-600">{{ patient.disease }}</text>
                </view>
                <text class="mt-1 text-xs text-gray-400">上次问诊: {{ patient.lastVisit }}</text>
                <text class="text-xs text-gray-400">{{ patient.timestamp }}</text>
              </view>
            </view>

            <view class="mt-3 flex space-x-2">
              <button class="flex-1 rounded-md bg-red-500 py-1.5 text-sm text-white">
                图文问诊
              </button>
              <button class="flex-1 rounded-md bg-amber-500 py-1.5 text-sm text-white">
                健康档案
              </button>
              <button class="flex-1 rounded-md bg-green-500 py-1.5 text-sm text-white">
                发送提醒
              </button>
            </view>
          </view>
        </template>
      </view>
    </view>

    <!-- 底部空间 -->
    <view class="h-20" />
  </view>
</template>
