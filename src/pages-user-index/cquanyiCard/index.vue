<script setup lang="ts">
// cquanyiCard 页面组件
const pageTitle = '权益中心'

// 跳转到预约问诊页面
function navigateToAppointment() {
  uni.navigateTo({
    url: '/pages-user-index/cquanyiCard/AppointmentConsult',
  })
}

// 跳转到其他页面的示例函数
function navigateToOtherPage(pagePath: string) {
  uni.navigateTo({
    url: pagePath,
  })
}
</script>

<template>
  <view class="page-container">
    <view class="page-header">
      <text class="page-title">{{ pageTitle }}</text>
    </view>
    <view class="page-content">
      <!-- 权益卡片区域 -->
      <view class="p-[24rpx]">
        <!-- 预约问诊卡片 -->
        <view class="mb-[24rpx] rounded-[20rpx] from-[#fff1f0] to-[#fff2e8] bg-gradient-to-r p-[32rpx] shadow-sm">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="h-[100rpx] w-[100rpx] flex items-center justify-center rounded-full bg-white shadow-sm">
                <text class="text-[#ff6b35] text-[50rpx]">👨‍⚕️</text>
              </view>
              <view class="ml-[24rpx]">
                <text class="text-[#333333] font-medium text-[36rpx]">预约问诊</text>
                <text class="mt-[8rpx] block text-[#666666] text-[24rpx]">专业医师在线问诊服务</text>
              </view>
            </view>
            <wot-button
              type="ghost"
              size="small"
              class="border-[#ff6b35] text-[#ff6b35]"
              @click="navigateToAppointment"
            >
              立即预约
            </wot-button>
          </view>
        </view>

        <!-- 其他权益卡片示例 -->
        <view class="grid grid-cols-2 gap-[24rpx]">
          <!-- 权益卡片1 -->
          <view class="border border-[#f0f0f0] rounded-[20rpx] bg-white p-[24rpx] shadow-sm" @click="navigateToOtherPage('/pages-user-index/cquanyiCard/HealthcareFavorites')">
            <view class="mb-[16rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-full bg-[#f6ffed]">
              <text class="text-[#52c41a] text-[40rpx]">❤️</text>
            </view>
            <text class="text-[#333333] font-medium text-[28rpx]">养生收藏</text>
            <text class="mt-[4rpx] block text-[#999999] text-[22rpx]">管理您的收藏内容</text>
          </view>

          <!-- 权益卡片2 -->
          <view class="border border-[#f0f0f0] rounded-[20rpx] bg-white p-[24rpx] shadow-sm" @click="navigateToOtherPage('/pages-user-index/cquanyiCard/message')">
            <view class="mb-[16rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-full bg-[#e6f7ff]">
              <text class="text-[#1890ff] text-[40rpx]">💬</text>
            </view>
            <text class="text-[#333333] font-medium text-[28rpx]">我的消息</text>
            <text class="mt-[4rpx] block text-[#999999] text-[22rpx]">查看系统通知</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
