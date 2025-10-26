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

// 格式化数字，添加千分位分隔符
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 点击评价区域
function handleRatingClick() {
  console.log('点击了评价区域')
  // 这里可以添加跳转到评价详情页面的逻辑
}
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
</template>
