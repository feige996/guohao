<script setup lang="ts">
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

// 点击档案区域
function handleRecordClick() {
  console.log('点击了档案区域')
  // 跳转到详细档案页面
  uni.navigateTo({
    url: '/pages/doctor/me/doctorInfo',
  })
}
</script>

<template>
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
</template>
