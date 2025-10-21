<script setup lang="ts">
// 电话问诊页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '电话问诊',
  },
})

// 响应式数据
const doctorInfo = ref({
  id: '1',
  name: '孙医生',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=center',
  department: '骨科专家',
  title: 'XX疗法传承人'
})

const isMuted = ref(false)
const isSpeakerEnabled = ref(false)
const isCallActive = ref(true)
const callDuration = ref(0)
const isSwitchingCamera = ref(false)

// 格式化通话时长
const formattedDuration = computed(() => {
  const minutes = Math.floor(callDuration.value / 60)
  const seconds = callDuration.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// 通话计时器
let timer: number | ReturnType<typeof setInterval> | null = null

// 开始计时
function startTimer() {
  timer = setInterval(() => {
    callDuration.value++
  }, 1000)
}

// 停止计时
function stopTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

// 切换静音
function toggleMute() {
  isMuted.value = !isMuted.value
  // 实际项目中这里应该调用真实的通话API
  console.log('切换静音:', isMuted.value)
}

// 切换免提
function toggleSpeaker() {
  isSpeakerEnabled.value = !isSpeakerEnabled.value
  // 实际项目中这里应该调用真实的通话API
  console.log('切换免提:', isSpeakerEnabled.value)
}

// 挂断电话
function endCall() {
  isCallActive.value = false
  stopTimer()
  
  // 显示确认对话框
  uni.showModal({
    title: '确认挂断',
    content: '确定要结束本次问诊吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户确认挂断')
        // 跳转到医师评价页面，传递医生信息
        uni.navigateTo({
          url: `/pages/normal/online-consultation/doctor-rating?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&doctorTitle=${encodeURIComponent(doctorInfo.value.title)}&doctorSpecialty=${encodeURIComponent(doctorInfo.value.department)}&doctorAvatar=${encodeURIComponent(doctorInfo.value.avatar)}`
        })
      } else {
        // 用户取消挂断，恢复通话状态
        isCallActive.value = true
        startTimer()
      }
    }
  })
}

// 切换摄像头
function toggleCamera() {
  isSwitchingCamera.value = !isSwitchingCamera.value
  console.log('切换摄像头:', isSwitchingCamera.value)
}

// 打开病历
function openMedicalRecord() {
  uni.showToast({
    title: '打开病历',
    icon: 'none'
  })
}

// 转接给其他医生
function transferCall() {
  uni.showToast({
    title: '转接通话',
    icon: 'none'
  })
}

// 记录通话
function recordCall() {
  uni.showToast({
    title: '记录通话',
    icon: 'none'
  })
}

// 查看费用
function viewCost() {
  uni.showToast({
    title: '查看费用',
    icon: 'none'
  })
}

// 生命周期
onLoad((options: { doctorId?: string; serviceType?: string }) => {
  console.log('电话问诊页面加载，参数:', options)
  
  // 如果传入了医生ID，可以根据ID获取医生信息
  if (options.doctorId) {
    // 实际项目中这里应该调用API获取医生信息
    console.log('根据医生ID获取信息:', options.doctorId)
  }
  
  // 开始计时
  startTimer()
})

onUnload(() => {
  // 停止计时
  stopTimer()
})
</script>

<template>
  <view class="bg-[#f5f5f5] min-h-screen relative">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 border-b border-[#eee]">
      <text class="text-[#333] font-medium text-[32rpx]">电话问诊</text>
    </view>

    <!-- 顶部功能按钮 -->
    <view class="flex justify-around bg-white p-4">
      <view class="flex flex-col items-center" @click="toggleCamera">
        <view class="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-1">
          <text class="text-[#666] text-[28rpx]">📷</text>
        </view>
        <text class="text-[20rpx] text-[#666]">拍照</text>
      </view>
      
      <view class="flex flex-col items-center" @click="openMedicalRecord">
        <view class="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-1">
          <text class="text-[#666] text-[28rpx]">📋</text>
        </view>
        <text class="text-[20rpx] text-[#666]">病历</text>
      </view>
      
      <view class="flex flex-col items-center" @click="transferCall">
        <view class="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-1">
          <text class="text-[#666] text-[28rpx]">↩️</text>
        </view>
        <text class="text-[20rpx] text-[#666]">转接</text>
      </view>
      
      <view class="flex flex-col items-center" @click="recordCall">
        <view class="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-1">
          <text class="text-[#666] text-[28rpx]">📝</text>
        </view>
        <text class="text-[20rpx] text-[#666]">记录</text>
      </view>
      
      <view class="flex flex-col items-center" @click="viewCost">
        <view class="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-1">
          <text class="text-[#666] text-[28rpx]">💰</text>
        </view>
        <text class="text-[20rpx] text-[#666]">费用</text>
      </view>
    </view>

    <!-- 通话主体区域 -->
    <view class="p-6">
      <!-- 医生信息 -->
      <view class="flex items-center mb-6">
        <image :src="doctorInfo.avatar" class="w-16 h-16 rounded-full mr-4" mode="aspectFill"></image>
        <view>
          <view class="flex items-center">
            <text class="text-[#333] font-medium text-[32rpx]">{{ doctorInfo.name }}</text>
            <text class="ml-2 px-2 py-0.5 bg-[#e6f7ff] text-[#1890ff] text-[20rpx] rounded">在线</text>
          </view>
          <text class="text-[#666] text-[24rpx]">{{ doctorInfo.department }}</text>
          <text class="text-[#999] text-[20rpx]">{{ doctorInfo.title }}</text>
        </view>
      </view>

      <!-- 通话画面区域 -->
      <view class="relative bg-white rounded-lg overflow-hidden mb-6">
        <!-- 通话背景 -->
        <image src="https://images.unsplash.com/photo-1581092915527-4a527c745f4a?w=800&auto=format&fit=crop&q=60" 
               class="w-full h-[400rpx] object-cover opacity-90" mode="aspectFill"></image>
        
        <!-- 通话状态 -->
        <view class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
          <text class="text-white text-[32rpx] font-medium block mb-1">语音问诊中</text>
          <text class="text-white text-[28rpx]">{{ formattedDuration }}</text>
        </view>
        
        <!-- 医生头像 -->
        <view class="absolute top-4 right-4 flex items-center">
          <image :src="doctorInfo.avatar" class="w-20 h-20 rounded-lg border-2 border-white" mode="aspectFill"></image>
          <view class="ml-2 bg-[#52c41a] h-4 w-4 rounded-full border-2 border-white"></view>
        </view>
        
        <!-- 通话指示器 -->
        <view class="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 px-3 py-1 rounded-full">
          <text class="text-[#52c41a] mr-1">🔴</text>
          <text class="text-white text-[20rpx]">通话中</text>
        </view>
        
        <!-- 摄像头切换提示 -->
        <view v-if="isSwitchingCamera" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 px-4 py-2 rounded">
          <text class="text-white text-[24rpx]">摄像头已切换</text>
        </view>
      </view>

      <!-- 通话控制按钮 -->
      <view class="flex justify-around items-center mb-6">
        <!-- 静音按钮 -->
        <view 
          class="w-20 h-20 rounded-full flex items-center justify-center" 
          :class="isMuted ? 'bg-[#ff4d4f]' : 'bg-[#f0f0f0]'"
          @click="toggleMute"
        >
          <text class="text-[#666] text-[48rpx]">{{ isMuted ? '🔇' : '🔊' }}</text>
        </view>
        
        <!-- 挂断按钮 -->
        <view 
          class="w-24 h-24 rounded-full bg-[#ff4d4f] flex items-center justify-center" 
          @click="endCall"
        >
          <text class="text-white text-[48rpx]">📞</text>
        </view>
        
        <!-- 免提按钮 -->
        <view 
          class="w-20 h-20 rounded-full flex items-center justify-center" 
          :class="isSpeakerEnabled ? 'bg-[#1890ff]' : 'bg-[#f0f0f0]'"
          @click="toggleSpeaker"
        >
          <text class="text-[#666] text-[48rpx]">{{ isSpeakerEnabled ? '🔊' : '🔈' }}</text>
        </view>
      </view>

      <!-- 通话提示 -->
      <view class="text-center text-[24rpx] text-[#666]">
        <text>问诊过程中请勿挂断电话</text>
        <text class="block">如有问题请联系客服</text>
      </view>
    </view>

    <!-- 投诉建议入口 -->
    <view class="absolute bottom-6 right-6">
      <view class="w-16 h-16 rounded-full bg-[#ff8c00] flex items-center justify-center shadow-lg">
        <text class="text-white text-[32rpx]">📝</text>
      </view>
    </view>
  </view>
</template>