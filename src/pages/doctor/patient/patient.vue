<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: '患者',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})

// 患者数据统计
const patientStats = {
  total: 36,
  revisit: 18,
  appointment: 6
}

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
    type: '复诊'
  },
  {
    id: 2,
    name: '刘艳',
    gender: '女',
    disease: '2型糖尿病',
    lastVisit: '6月10日',
    timestamp: '2025/02/11 14:32:21',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: '复诊'
  }
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
  <view class="min-h-screen bg-gray-50">
    <!-- 搜索栏 -->
    <view class="px-4 pt-2 pb-2 bg-white">
      <view class="relative">
        <input 
          type="text" 
          placeholder="搜索患者名称/疾病" 
          class="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 text-sm focus:outline-none"
          @confirm="handleSearch($event.target.value)"
        />
        <text class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</text>
        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-amber-700 text-white text-sm rounded-full">
          搜索
        </button>
      </view>
    </view>

    <!-- 患者数据统计 -->
    <view class="mt-4 px-4">
      <view class="flex items-center justify-between mb-2">
        <text class="text-lg font-semibold">患者数据</text>
      </view>
      <view class="grid grid-cols-3 gap-2 bg-white rounded-lg p-4">
        <view class="flex flex-col items-center">
          <view class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-1">
            <text class="text-red-500 text-xl">👤</text>
          </view>
          <text class="text-sm text-gray-500">患者数</text>
          <text class="text-lg font-semibold text-gray-800">{{ patientStats.total }}</text>
        </view>
        <view class="flex flex-col items-center">
          <view class="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center mb-1">
            <text class="text-yellow-500 text-xl">🔄</text>
          </view>
          <text class="text-sm text-gray-500">复诊数</text>
          <text class="text-lg font-semibold text-gray-800">{{ patientStats.revisit }}</text>
        </view>
        <view class="flex flex-col items-center">
          <view class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-1">
            <text class="text-green-500 text-xl">⏰</text>
          </view>
          <text class="text-sm text-gray-500">预约数</text>
          <text class="text-lg font-semibold text-gray-800">{{ patientStats.appointment }}</text>
        </view>
      </view>
    </view>

    <!-- 功能卡片 -->
    <view class="mt-4 px-4">
      <view class="grid grid-cols-2 gap-3">
        <view 
          class="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-4 relative overflow-hidden"
          @click="handleCardClick('patients')"
        >
          <view class="absolute top-1 right-1">
            <text class="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</text>
          </view>
          <text class="text-lg font-bold text-gray-800">我的患者</text>
          <text class="text-sm text-gray-600 mt-1">已接诊366名患者</text>
          <view class="flex items-center justify-between mt-3">
            <text class="text-xs text-gray-500">查看全部</text>
            <text class="text-gray-700">›</text>
          </view>
        </view>
        <view 
          class="bg-gradient-to-br from-amber-100 to-yellow-100 rounded-lg p-4 relative overflow-hidden"
          @click="handleCardClick('ratings')"
        >
          <view class="absolute top-1 right-1">
            <text class="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</text>
          </view>
          <text class="text-lg font-bold text-gray-800">患者评价</text>
          <text class="text-sm text-gray-600 mt-1">接收366条评价</text>
          <view class="flex items-center justify-between mt-3">
            <text class="text-xs text-gray-500">查看全部</text>
            <text class="text-gray-700">›</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 患者列表 -->
    <view class="mt-4 px-4">
      <view class="flex items-center justify-between mb-2">
        <text class="text-lg font-semibold">新增患者</text>
      </view>
      
      <!-- 患者列表项 -->
      <view class="space-y-3">
        <template v-for="patient in patientList" :key="patient.id">
          <view class="bg-white rounded-lg p-3 shadow-sm" @click="handlePatientClick(patient.id)">
            <view class="flex items-start">
              <image :src="patient.avatar" class="w-12 h-12 rounded-lg mr-3" mode="aspectFill" />
              <view class="flex-1">
                <view class="flex items-center">
                  <text class="text-base font-semibold">{{ patient.name }}</text>
                  <text class="text-xs text-gray-500 ml-2">{{ patient.gender }}</text>
                </view>
                <view class="flex items-center mt-1">
                  <text class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    {{ patient.type }}
                  </text>
                  <text class="text-sm text-gray-600 ml-2">{{ patient.disease }}</text>
                </view>
                <text class="text-xs text-gray-400 mt-1">上次问诊: {{ patient.lastVisit }}</text>
                <text class="text-xs text-gray-400">{{ patient.timestamp }}</text>
              </view>
            </view>
            
            <view class="flex space-x-2 mt-3">
              <button class="flex-1 py-1.5 bg-red-500 text-white text-sm rounded-md">
                图文问诊
              </button>
              <button class="flex-1 py-1.5 bg-amber-500 text-white text-sm rounded-md">
                健康档案
              </button>
              <button class="flex-1 py-1.5 bg-green-500 text-white text-sm rounded-md">
                发送提醒
              </button>
            </view>
          </view>
        </template>
      </view>
    </view>

    <!-- 底部空间 -->
    <view class="h-20"></view>
  </view>
</template>
