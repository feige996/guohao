<script setup lang="ts">
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// cquanyiCard 页面组件
const pageTitle = '权益中心'

// 跳转到预约问诊页面
function navigateToAppointment() {
  uni.navigateTo({
    url: '/pages-user-index/cquanyiCard/AppointmentConsult'
  })
}

// 跳转到其他页面的示例函数
function navigateToOtherPage(pagePath: string) {
  uni.navigateTo({
    url: pagePath
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
        <view class="bg-gradient-to-r from-[#fff1f0] to-[#fff2e8] rounded-[20rpx] p-[32rpx] mb-[24rpx] shadow-sm">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="w-[100rpx] h-[100rpx] bg-white rounded-full flex items-center justify-center shadow-sm">
                <text class="text-[#ff6b35] text-[50rpx]">👨‍⚕️</text>
              </view>
              <view class="ml-[24rpx]">
                <text class="text-[36rpx] font-medium text-[#333333]">预约问诊</text>
                <text class="text-[24rpx] text-[#666666] mt-[8rpx] block">专业医师在线问诊服务</text>
              </view>
            </view>
            <wot-button
              type="ghost"
              size="small"
              class="text-[#ff6b35] border-[#ff6b35]"
              @click="navigateToAppointment"
            >
              立即预约
            </wot-button>
          </view>
        </view>

        <!-- 其他权益卡片示例 -->
        <view class="grid grid-cols-2 gap-[24rpx]">
          <!-- 权益卡片1 -->
          <view class="bg-white rounded-[20rpx] p-[24rpx] shadow-sm border border-[#f0f0f0]" @click="navigateToOtherPage('/pages-user-index/cquanyiCard/HealthcareFavorites')">
            <view class="w-[80rpx] h-[80rpx] bg-[#f6ffed] rounded-full flex items-center justify-center mb-[16rpx]">
              <text class="text-[#52c41a] text-[40rpx]">❤️</text>
            </view>
            <text class="text-[28rpx] font-medium text-[#333333]">养生收藏</text>
            <text class="text-[22rpx] text-[#999999] mt-[4rpx] block">管理您的收藏内容</text>
          </view>

          <!-- 权益卡片2 -->
          <view class="bg-white rounded-[20rpx] p-[24rpx] shadow-sm border border-[#f0f0f0]" @click="navigateToOtherPage('/pages-user-index/cquanyiCard/message')">
            <view class="w-[80rpx] h-[80rpx] bg-[#e6f7ff] rounded-full flex items-center justify-center mb-[16rpx]">
              <text class="text-[#1890ff] text-[40rpx]">💬</text>
            </view>
            <text class="text-[28rpx] font-medium text-[#333333]">我的消息</text>
            <text class="text-[22rpx] text-[#999999] mt-[4rpx] block">查看系统通知</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>