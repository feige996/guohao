<script setup lang="ts">
// 视频问诊页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '视频问诊',
  },
})

// 响应式数据
const doctorInfo = ref({
  id: '1',
  name: '李医生',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  department: '内科医师',
  title: '专家'
})

const isMuted = ref(false)
const isSpeakerEnabled = ref(false)
const isCallActive = ref(true)
const callDuration = ref(0)
const isCameraEnabled = ref(true)

// 格式化通话时长
const formattedDuration = computed(() => {
  const minutes = Math.floor(callDuration.value / 60)
  const seconds = callDuration.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// 获取当前时间
const currentTime = computed(() => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `下午${hours}:${minutes}`
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
  console.log('切换静音:', isMuted.value)
}

// 切换免提
function toggleSpeaker() {
  isSpeakerEnabled.value = !isSpeakerEnabled.value
  console.log('切换免提:', isSpeakerEnabled.value)
}

// 切换摄像头
function toggleCamera() {
  isCameraEnabled.value = !isCameraEnabled.value
  console.log('切换摄像头:', isCameraEnabled.value)
}

// 挂断电话
function endCall() {
  isCallActive.value = false
  stopTimer()
  
  // 显示确认对话框
  uni.showModal({
    title: '确认挂断',
    content: '确定要结束本次视频问诊吗？',
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

// 打开病历
function openMedicalRecord() {
  uni.showToast({
    title: '打开病历',
    icon: 'none'
  })
}

// 图文交流
function openChat() {
  uni.navigateTo({
    url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&serviceType=视频问诊`
  })
}

// 查看医生信息
function viewDoctorInfo() {
  uni.showToast({
    title: '查看医生信息',
    icon: 'none'
  })
}

// 发送爱心
function sendHeart() {
  // 这里可以实现发送爱心的动画效果
  console.log('发送爱心')
}

// 生命周期
onLoad((options: { doctorId?: string; serviceType?: string }) => {
  console.log('视频问诊页面加载，参数:', options)
  
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
  <view class="bg-black min-h-screen relative text-white">
    <!-- 顶部信息栏 -->
    <view class="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3 z-10">
      <!-- 返回按钮 -->
      <text class="text-white text-[36rpx]" @click="endCall">←</text>
      
      <!-- 标题 -->
      <text class="text-white font-medium text-[32rpx]">视频会诊</text>
      
      <!-- 网络和时间 -->
      <view class="flex items-center text-[24rpx]">
        <text class="mr-1">无SIM卡</text>
        <text class="mr-1">5G</text>
        <text>🔋</text>
      </view>
    </view>

    <!-- 顶部功能按钮 -->
    <view class="absolute top-[80rpx] left-0 right-0 flex justify-around px-4 z-10">
      <view class="flex flex-col items-center">
        <view class="w-14 h-14 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-1">
          <text class="text-white text-[32rpx]">📷</text>
        </view>
      </view>
      
      <view class="flex flex-col items-center" @click="openMedicalRecord">
        <view class="w-14 h-14 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-1">
          <text class="text-white text-[32rpx]">📋</text>
        </view>
      </view>
      
      <view class="flex flex-col items-center">
        <view class="w-14 h-14 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-1">
          <text class="text-white text-[32rpx]">↩️</text>
        </view>
      </view>
      
      <view class="flex flex-col items-center">
        <view class="w-14 h-14 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-1">
          <text class="text-white text-[32rpx]">📝</text>
        </view>
      </view>
      
      <view class="flex flex-col items-center">
        <view class="w-14 h-14 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-1">
          <text class="text-white text-[32rpx]">💰</text>
        </view>
      </view>
    </view>

    <!-- 时间显示 -->
    <view class="absolute top-[220rpx] right-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-[24rpx] z-10">
      {{ currentTime }}
    </view>

    <!-- 主视频区域（医生画面） -->
    <view class="w-full h-full flex items-center justify-center">
      <!-- 医生视频画面 -->
      <image 
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=60" 
        class="w-full h-full object-cover"
        mode="aspectFill"
      ></image>
      
      <!-- 通话状态 -->
      <view class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <view class="flex items-center justify-center mb-4">
          <text class="text-[#52c41a] mr-2 text-[40rpx]">🔴</text>
          <text class="text-white text-[36rpx]">视频通话中</text>
        </view>
        <text class="text-white text-[48rpx] font-medium">{{ formattedDuration }}</text>
      </view>
    </view>

    <!-- 小窗口视频（用户画面） -->
    <view class="absolute top-[300rpx] right-4 w-32 h-48 rounded-lg overflow-hidden border-2 border-white z-10">
      <image 
        v-if="isCameraEnabled" 
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&auto=format&fit=crop&q=60" 
        class="w-full h-full object-cover"
        mode="aspectFill"
      ></image>
      <view v-else class="w-full h-full bg-gray-800 flex items-center justify-center">
        <text class="text-white text-[64rpx]">📹</text>
      </view>
    </view>

    <!-- 底部控制区域 -->
    <view class="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center z-10">
      <!-- 通话控制按钮 -->
      <view class="flex justify-around items-center w-full mb-8">
        <!-- 静音按钮 -->
        <view 
          class="w-16 h-16 rounded-full flex items-center justify-center" 
          :class="isMuted ? 'bg-red-600' : 'bg-white bg-opacity-30'"
          @click="toggleMute"
        >
          <text class="text-white text-[48rpx]">{{ isMuted ? '🔇' : '🔊' }}</text>
        </view>
        
        <!-- 摄像头开关按钮 -->
        <view 
          class="w-16 h-16 rounded-full flex items-center justify-center" 
          :class="isCameraEnabled ? 'bg-white bg-opacity-30' : 'bg-red-600'"
          @click="toggleCamera"
        >
          <text class="text-white text-[48rpx]">{{ isCameraEnabled ? '📹' : '📷' }}</text>
        </view>
        
        <!-- 挂断按钮 -->
        <view 
          class="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center" 
          @click="endCall"
        >
          <text class="text-white text-[48rpx]">📞</text>
        </view>
        
        <!-- 免提按钮 -->
        <view 
          class="w-16 h-16 rounded-full flex items-center justify-center" 
          :class="isSpeakerEnabled ? 'bg-green-500' : 'bg-white bg-opacity-30'"
          @click="toggleSpeaker"
        >
          <text class="text-white text-[48rpx]">{{ isSpeakerEnabled ? '🔊' : '🔈' }}</text>
        </view>
        
        <!-- 切换摄像头按钮 -->
        <view 
          class="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center"
          @click="toggleCamera"
        >
          <text class="text-white text-[48rpx]">🔄</text>
        </view>
      </view>

      <!-- 功能按钮 -->
      <view class="flex justify-around items-center w-full">
        <!-- 发送爱心按钮 -->
        <view 
          class="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center shadow-lg"
          @click="sendHeart"
        >
          <text class="text-white text-[32rpx]">❤️</text>
        </view>
        
        <!-- 图文交流按钮 -->
        <view 
          class="px-6 py-2.5 bg-blue-500 rounded-full text-white text-[28rpx] font-medium"
          @click="openChat"
        >
          图文交流
        </view>
        
        <!-- 查看医生信息按钮 -->
        <view 
          class="px-6 py-2.5 bg-white bg-opacity-30 rounded-full text-white text-[28rpx] font-medium"
          @click="viewDoctorInfo"
        >
          查看医生信息
        </view>
      </view>
    </view>
  </view>
</template>