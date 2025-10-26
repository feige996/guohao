<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '预约付费',
  },
})

// 响应式数据
const doctorId = ref('1')
const serviceType = ref('视频问诊')
const fee = ref('20')

// 医生信息（模拟数据）
const doctorInfo = ref({
  name: '李医生',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  department: '内科医师',
  title: '专家'
})

// 页面加载时获取参数
onLoad((options: { doctorId?: string, serviceType?: string, fee?: string }) => {
  console.log('支付页面加载，参数:', options)
  
  if (options.doctorId) {
    doctorId.value = options.doctorId
  }
  
  if (options.serviceType) {
    serviceType.value = options.serviceType
  }
  
  if (options.fee) {
    fee.value = options.fee
  }
})

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 确认支付
function confirmPayment() {
  // 模拟支付成功
  uni.showToast({
    title: '支付成功',
    icon: 'success',
    duration: 1500,
    success: () => {
      // 支付成功后跳转到候诊室
      setTimeout(() => {
        uni.navigateTo({
          url: `/pages/normal/online-consultation/waiting-room?doctorId=${doctorId.value}&serviceType=${encodeURIComponent(serviceType.value)}`
        })
      }, 1500)
    }
  })
}
</script>

<template>
  <view class="h-screen w-full flex flex-col bg-[#f5f5f5]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">预约付费</text>
      </view>
    </view>

    <!-- 主内容区域 -->
    <scroll-view class="flex-1" scroll-y>
      <!-- 服务类型信息 -->
      <view class="mb-4 bg-white p-4">
        <text class="text-[#333] font-medium text-[32rpx]">{{ serviceType }}</text>
        <text class="text-[#999] text-[24rpx]">灵活视频时间</text>
      </view>

      <!-- 患者信息确认 -->
      <view class="mb-4 bg-white p-4">
        <text class="flex items-center justify-between text-[#333] font-medium text-[28rpx]">
          <span>患者信息</span>
          <span class="text-[#1890ff] text-[24rpx]">李夫人-内科-未就诊</span>
        </text>
      </view>

      <!-- 医生信息 -->
      <view class="mb-4 bg-white p-4">
        <view class="flex items-center mb-4">
          <image :src="doctorInfo.avatar" class="w-16 h-16 rounded-full mr-3" mode="aspectFill"></image>
          <view>
            <view class="flex items-center">
              <text class="text-[#333] font-medium text-[32rpx]">{{ doctorInfo.name }}</text>
              <text class="ml-2 px-2 py-0.5 bg-[#e6f7ff] text-[#1890ff] text-[20rpx] rounded">在线</text>
            </view>
            <text class="text-[#666] text-[24rpx]">{{ doctorInfo.department }}</text>
          </view>
        </view>
      </view>

      <!-- 费用详情 -->
      <view class="mb-4 bg-white p-4">
        <text class="mb-3 block text-[#333] font-medium text-[28rpx]">{{ serviceType }}详情</text>
        
        <view class="space-y-3">
          <view class="flex justify-between">
            <text class="text-[#666] text-[24rpx]">问诊价格</text>
            <text class="text-[#333] text-[24rpx]">¥{{ fee }}</text>
          </view>
          
          <view class="flex justify-between">
            <text class="text-[#666] text-[24rpx]">服务时长</text>
            <text class="text-[#333] text-[24rpx]">灵活预约时间</text>
          </view>
        </view>
      </view>

      <!-- 支付方式 -->
      <view class="mb-4 bg-white p-4">
        <text class="mb-3 block text-[#333] font-medium text-[28rpx]">支付方式</text>
        
        <view class="space-y-4">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="w-6 h-6 rounded-full border border-[#1890ff] flex items-center justify-center mr-3">
                <view class="w-3 h-3 rounded-full bg-[#1890ff]"></view>
              </view>
              <text class="text-[#333] text-[24rpx]">找人代付</text>
            </view>
            <text class="text-[#1890ff] text-[24rpx]">选择代付人 ></text>
          </view>
          
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="w-6 h-6 rounded-full border border-[#1890ff] flex items-center justify-center mr-3">
                <view class="w-3 h-3 rounded-full bg-[#1890ff]"></view>
              </view>
              <text class="text-[#333] text-[24rpx]">微信支付</text>
            </view>
            <text class="text-[#1890ff] text-[24rpx]">></text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部支付栏 -->
    <view class="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="text-[#333] text-[24rpx]">实付 ¥</text>
        <text class="text-[#ff6b35] font-semibold text-[32rpx]">{{ fee }}</text>
      </view>
      <view class="rounded-[8rpx] bg-[#52c41a] px-8 py-3 text-white font-medium text-[28rpx]" @click="confirmPayment">
        确认支付
      </view>
    </view>
  </view>
</template>