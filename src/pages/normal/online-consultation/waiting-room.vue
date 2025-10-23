<script setup lang="ts">
// 候诊室页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '候诊室',
  },
})

// 医生信息数据（占位用）
const doctorsData = [
  {
    id: '1',
    name: '孙医生',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=center',
    department: '骨科专家',
  },
  {
    id: '2',
    name: '李医生',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
    department: '内科医师',
  },
  {
    id: '3',
    name: '韩医生',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=center',
    department: '中医师',
  },
]

// 响应式数据
const doctorInfo = ref(doctorsData[0])
const serviceType = ref('视频问诊') // 默认视频问诊
const countdown = ref('0小时0分')
const isDoctorOnline = ref(true)
const isConsultationAvailable = ref(true) // 模拟环境，默认可点击

// 模拟生成预约时间
function getAppointmentTime() {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 30)
  const dateStr = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const timeStr = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return `${dateStr} ${timeStr}`
}

const appointmentTime = ref(getAppointmentTime())

// 流程状态数据
const flowStatus = [
  { id: 'appointment', name: '预约', status: 'completed' },
  { id: 'payment', name: '付款', status: 'completed' },
  { id: 'waiting', name: '候诊', status: 'current' },
  { id: 'diagnosis', name: '问诊', status: 'pending' },
  { id: 'prescription', name: '开方', status: 'pending' },
  { id: 'medicine', name: '配药', status: 'pending' },
  { id: 'delivery', name: '配送', status: 'pending' },
  { id: 'taking', name: '服用', status: 'pending' },
]

// 倒计时定时器
let timer: any = null

// 格式化倒计时
function formatCountdown(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}小时${mins}分`
}

// 开始倒计时
function startCountdown() {
  // 模拟环境：直接设置为可点击状态，不需要等待
  countdown.value = '0小时0分'
  isConsultationAvailable.value = true

  // 如果需要恢复倒计时功能，取消下面的注释
  /*
  let remainingSeconds = 20
  timer = setInterval(() => {
    remainingSeconds--
    countdown.value = `0小时${Math.ceil(remainingSeconds / 60)}分`

    if (remainingSeconds <= 0) {
      remainingSeconds = 0
      isConsultationAvailable.value = true
      countdown.value = '0小时0分'
      timer && clearInterval(timer)
    }
  }, 1000) // 每秒更新一次
  */
}

// 开始问诊 - 根据服务类型跳转到不同的问诊页面
function startConsultation() {
  console.log('开始问诊，服务类型:', serviceType.value)
  
  // 标准化服务类型
  const currentServiceType = serviceType.value.trim()
  console.log('处理后的服务类型:', currentServiceType)
  
  // 根据服务类型跳转到不同的问诊页面
  if (currentServiceType === '视频问诊' || currentServiceType === '视频挂号') {
    // 视频问诊或视频挂号跳转到视频会诊页面
    console.log('跳转到视频问诊页面')
    uni.navigateTo({
      url: `/pages/normal/online-consultation/video-consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}&serviceType=${encodeURIComponent(currentServiceType)}`
    })
  } else if (currentServiceType === '图文问诊') {
    // 图文问诊跳转到图文问诊页面
    console.log('跳转到图文问诊页面')
    uni.navigateTo({
      url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&serviceType=${encodeURIComponent(currentServiceType)}`
    })
  } else if (currentServiceType === '电话问诊') {
    // 电话问诊跳转到电话问诊页面
    console.log('跳转到电话问诊页面')
    uni.navigateTo({
      url: `/pages/normal/online-consultation/phone-consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}&serviceType=${encodeURIComponent(currentServiceType)}`
    })
  } else {
    // 默认为视频问诊
    console.log('未识别的服务类型，默认跳转到视频问诊页面')
    uni.navigateTo({
      url: `/pages/normal/online-consultation/video-consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}`
    })
  }
}

// 联系客服
function handleContactService() {
  uni.showToast({
    title: '联系客服功能开发中',
    icon: 'none'
  })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 生命周期
onLoad((options: { doctorId?: string; doctorName?: string; department?: string; avatar?: string; serviceType?: string }) => {
  console.log('候诊室页面加载，参数:', options)
  
  // 强制打印serviceType参数，确保正确接收
  console.log('接收到的serviceType参数:', options.serviceType)
  
  // 如果传入了医生信息，更新医生信息
  if (options.doctorId) {
    const doctor = doctorsData.find(d => d.id === options.doctorId)
    if (doctor) {
      doctorInfo.value = doctor
    } else if (options.doctorName && options.department) {
      // 使用传入的医生信息
      doctorInfo.value = {
        id: options.doctorId || '1',
        name: options.doctorName,
        department: options.department,
        avatar: options.avatar || doctorInfo.value.avatar
      }
    }
  }
  
  // 接收服务类型参数
  if (options.serviceType) {
    serviceType.value = options.serviceType
    console.log('更新服务类型:', serviceType.value)
  } else {
    console.log('未接收到serviceType参数，使用默认值:', serviceType.value)
  }
  
  // 开始倒计时
  startCountdown()
})

onUnload(() => {
  // 清理定时器
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">候诊室</text>
      </view>
    </view>

    <!-- 流程状态 -->
    <view class="mb-4 bg-white p-4">
      <text class="mb-3 block text-[#333] font-medium text-[28rpx]">流程状态</text>

      <!-- 流程状态图容器 - 使用相对定位 -->
      <view class="relative mb-4">
        <!-- 第一行流程 -->
        <view class="mb-8 flex items-center justify-center">
          <!-- 预约 -->
          <view class="flex items-center justify-center rounded bg-[#52c41a] px-4 py-2 text-white text-[24rpx]">
            预约
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#52c41a]" />
            <text class="ml-1 text-[#52c41a] text-[20rpx]">→</text>
          </view>
          <!-- 付款 -->
          <view class="flex items-center justify-center rounded bg-[#52c41a] px-4 py-2 text-white text-[24rpx]">
            付款
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#52c41a]" />
            <text class="ml-1 text-[#52c41a] text-[20rpx]">→</text>
          </view>
          <!-- 候诊 -->
          <view class="flex items-center justify-center rounded bg-[#ff8c00] px-4 py-2 text-white text-[24rpx]">
            候诊
          </view>
        </view>

        <!-- 垂直连接线1 - 从付款到第二行付款 -->
        <view class="absolute left-[50%] top-[40px] h-24 w-0.5 bg-[#52c41a]" />

        <!-- 第二行流程 -->
        <view class="mb-8 flex items-center justify-center">
          <!-- 付款 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            付款
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#d9d9d9]" />
            <text class="ml-1 text-[#d9d9d9] text-[20rpx]">→</text>
          </view>
          <!-- 开方 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            开方
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#d9d9d9]" />
            <text class="ml-1 text-[#d9d9d9] text-[20rpx]">→</text>
          </view>
          <!-- 问诊 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            问诊
          </view>
        </view>

        <!-- 垂直连接线2 - 从开方和问诊到第三行 -->
        <view class="absolute left-[calc(50%-60px)] top-[100px] h-24 w-0.5 bg-[#d9d9d9]" />
        <view class="absolute left-[calc(50%+60px)] top-[100px] h-24 w-0.5 bg-[#d9d9d9]" />

        <!-- 第三行流程 -->
        <view class="flex items-center justify-center">
          <!-- 配药 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            配药
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#d9d9d9]" />
            <text class="ml-1 text-[#d9d9d9] text-[20rpx]">→</text>
          </view>
          <!-- 配送 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            配送
          </view>
          <!-- 连接线和箭头 -->
          <view class="mx-1 flex items-center">
            <view class="h-0.5 w-6 bg-[#d9d9d9]" />
            <text class="ml-1 text-[#d9d9d9] text-[20rpx]">→</text>
          </view>
          <!-- 服用 -->
          <view class="flex items-center justify-center rounded bg-[#d9d9d9] px-4 py-2 text-white text-[24rpx]">
            服用
          </view>
        </view>
      </view>

      <!-- 说明文字 -->
      <view class="text-[#999] text-[22rpx]">
        <text class="mb-1 block">1.绿色表示已完成流程，橙色表示当前流程，灰色表示未到达。</text>
        <text class="block">2.过程中如有任何问题，可联系客服咨询。</text>
      </view>
    </view>

    <!-- 候诊信息 -->
    <view class="mb-4 bg-white p-4">
      <text class="mb-3 block text-[#333] font-medium text-[28rpx]">候诊信息</text>

      <view class="space-y-3">
        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">预约医师</text>
          <text class="text-[#333] text-[24rpx]">{{ doctorInfo.name }}</text>
        </view>

        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">预约时间</text>
          <text class="text-[#333] text-[24rpx]">{{ appointmentTime }}</text>
        </view>

        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">问诊方式</text>
          <text class="text-[#333] text-[24rpx]">{{ serviceType }}</text>
        </view>

        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">预约状态</text>
          <text class="text-[#333] text-[24rpx]">已确定</text>
        </view>

        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">医师是否在线</text>
          <view class="flex items-center">
            <view class="mr-2 h-3 w-3 rounded-full" :class="isDoctorOnline ? 'bg-[#52c41a]' : 'bg-[#d9d9d9]'" />
            <text class="text-[#333] text-[24rpx]">{{ isDoctorOnline ? '在线' : '离线' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部信息栏 -->
    <view class="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="text-[#333] text-[24rpx]">问诊倒计时：</text>
        <text class="text-[#52c41a] font-medium text-[24rpx]">{{ countdown }}</text>
      </view>
      <view class="flex gap-3">
        <view class="rounded-[8rpx] bg-[#1890ff] px-5 py-2 text-white text-[24rpx]" @click="handleContactService">
          联系客服
        </view>
        <view
          class="rounded-[8rpx] px-5 py-2 text-white text-[24rpx]"
          :class="isConsultationAvailable ? 'bg-[#52c41a]' : 'bg-[#d9d9d9]'"
          :disabled="!isConsultationAvailable"
          @click="() => isConsultationAvailable && startConsultation()"
        >
          {{ isConsultationAvailable ? '开始问诊' : '等待中' }}
        </view>
      </view>
    </view>
  </view>
</template>
