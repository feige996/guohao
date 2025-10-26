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
function handleClickCard() {
  console.log('点击了档案区域')
  // 跳转到详细档案页面
  uni.navigateTo({
    url: '/pages/doctor/me/doctorInfo',
  })
}
</script>

<template>
  <view class="bg-img mt-3 rounded-lg bg-white p-4" @click="handleClickCard">
    <view class="flex items-start gap-2">
      <image
        src="/static/images/me-doctor/people.png"
        class="h-7 w-7 rounded-full object-cover"
      />
      <view class="flex-1">
        <view class="text-base text-#070707 font-medium">
          我的档案
        </view>
        <view class="mt-1 flex items-center gap-2">
          <text class="text-base text-#484848 font-500">{{ doctorInfo.name }}</text>
          <text class="text-base text-#999999">{{ doctorInfo.title }}</text>
        </view>
        <view class="mt-1 flex items-center gap-1 text-xs">
          <text class="rounded bg-#E7F0FF px-3 py-1 text-#69B0F7">{{ doctorInfo.department }}</text>
          <text class="rounded bg-#EFEDFA px-3 py-1 text-#9F80EF">{{ doctorInfo.hospital }}</text>
        </view>
        <view class="mt-3 text-xs text-#B0B0B0">
          {{ doctorInfo.recordDate }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.bg-img {
  background-image: url('/static/images/me-doctor/card-bg-icon.png');
  background-size: 100px 100px;
  background-position: bottom right;
  background-repeat: no-repeat;
}
</style>
