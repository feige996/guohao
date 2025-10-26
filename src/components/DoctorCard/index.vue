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
  <view class="linear-bg p-4">
    <view class="flex items-center">
      <!-- 医生头像 -->
      <image
        :src="doctorInfo.avatar"
        class="h-20 w-20 border-2 border-gray-200 rounded-full object-cover"
      />

      <!-- 医生信息 -->
      <view class="ml-4 flex-1">
        <view class="flex items-center gap-2">
          <text class="text-xl text-#484848 font-bold">{{ doctorInfo.name }}</text>
          <text class="text-base text-#999999">{{ doctorInfo.title }}</text>
        </view>
        <view class="mt-1 flex items-center gap-1 text-xs">
          <text class="rounded bg-#E7F0FF px-3 py-1 text-#69B0F7">{{ doctorInfo.department }}</text>
          <text class="rounded bg-#EFEDFA px-3 py-1 text-#9F80EF">{{ doctorInfo.hospital }}</text>
        </view>
        <view class="mt-2 flex items-center gap-3">
          <view class="flex items-center">
            <text class="text-xs text-#999999">好评：</text>
            <text class="text-sm text-#FD6302 font-bold">{{ doctorInfo.rating }}</text>
          </view>
          <view class="flex items-center">
            <text class="text-xs text-#999999">接诊：</text>
            <text class="text-sm text-#FD6302 font-bold">{{ doctorInfo.consultationCount }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.linear-bg {
  background-image: linear-gradient(180deg, #fcf1e8 0%, #ffffff 100%);
  border-radius: 8px;
}
</style>
