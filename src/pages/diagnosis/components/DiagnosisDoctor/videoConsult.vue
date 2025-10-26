<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '视频问诊',
  },
})

// 定义消息类型
interface Message {
  id: number
  sender: 'doctor' | 'patient'
  content: string
  time: string
}

// 患者信息
const patientInfo = ref({
  name: '吴姗姗',
  gender: '女',
  age: 32,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
})

// 医生信息
const doctorInfo = ref({
  name: '李浩',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=center',
})

// 消息列表
const messages = ref<Message[]>([
  {
    id: 1,
    sender: 'doctor',
    content: '你好，吴女士，我是李浩医生。请讲一下你的症状。',
    time: '00:01',
  },
  {
    id: 2,
    sender: 'patient',
    content: '李医生，最近几天头痛厉害。',
    time: '00:03',
  },
])

// 消息输入
const messageInput = ref('')

// 处理静音切换
function toggleMute() {
  console.log('切换静音状态')
}

// 处理挂断电话
function handleHangup() {
  console.log('挂断电话')
  uni.showModal({
    title: '提示',
    content: '确定要结束本次视频问诊吗？',
    success: (res) => {
      if (res.confirm) {
        // 跳转到诊断书页面
        uni.navigateTo({
          url: `/pages/doctor/diagnosis/diagnosisReport?patientInfo=${encodeURIComponent(JSON.stringify(patientInfo.value))}`,
        })
      }
    },
  })
}

// 处理视频开关
function toggleVideo() {
  console.log('切换视频状态')
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 发送消息
// 格式化时间
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function sendMessage() {
  if (!messageInput.value.trim())
    return

  // 添加消息到列表 - 确保类型正确
  const newMessage: Message = {
    id: Date.now(),
    content: messageInput.value.trim(),
    sender: 'doctor',
    time: formatTime(new Date()),
  }
  messages.value.push(newMessage)

  // 清空输入框
  messageInput.value = ''

  // 发送消息后滚动到底部
  setTimeout(() => {
    uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').boundingClientRect((rect: any) => {
      if (rect && typeof rect === 'object') {
        uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').scrollOffset((offset: any) => {
          if (offset && typeof offset === 'object') {
            uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').scrollTo({
              scrollTop: (offset.scrollTop || 0) + (rect.height || 0),
              duration: 0,
            })
          }
        }).exec()
      }
    }).exec()
  }, 100)
}

// 组件挂载
onMounted(() => {
  console.log('视频问诊页面已挂载')
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-800 text-white">
    <!-- 顶部导航 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800 p-4">
      <text class="text-base text-white" @click="navigateBack">‹</text>
      <text class="text-lg font-medium">视频问诊</text>
      <view class="w-6" />
    </view>

    <!-- 视频区域 -->
    <view class="p-4">
      <!-- 患者大视频 -->
      <view class="relative mb-4 h-56 overflow-hidden rounded-lg bg-gray-800">
        <image
          :src="patientInfo.avatar"
          class="h-full w-full object-cover opacity-80"
          style="filter: blur(2px)"
        />
        <view class="absolute inset-0 flex items-center justify-center">
          <image
            :src="patientInfo.avatar"
            class="h-32 w-32 border-4 border-blue-500 rounded-full object-cover"
          />
        </view>
        <text class="absolute left-4 top-4 rounded-full bg-blue-600 bg-opacity-80 px-3 py-1 text-sm">
          {{ patientInfo.name }}
        </text>
        <text class="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm">
          视频通话中
        </text>
      </view>

      <!-- 医生小视频 -->
      <view class="relative h-32 overflow-hidden rounded-lg bg-gray-800">
        <image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
          class="h-full w-full object-cover"
        />
        <view class="absolute left-2 top-2 rounded-full bg-blue-600 bg-opacity-80 px-3 py-1 text-sm">
          {{ doctorInfo.name }}医生
        </view>
        <!-- 病历档案按钮 -->
        <button class="absolute bottom-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs">
          病历档案
        </button>
      </view>
    </view>

    <!-- 消息区域 -->
    <view class="message-list flex-1 overflow-y-auto p-4">
      <view v-for="message in messages" :key="message.id" class="mb-4">
        <!-- 医生消息 -->
        <view v-if="message.sender === 'doctor'" class="flex items-end gap-2">
          <image :src="doctorInfo.avatar" class="h-10 w-10 rounded-full" />
          <view>
            <view class="max-w-[70%] rounded-bl-xl rounded-br-xl rounded-tl-none rounded-tr-xl bg-blue-600 p-3">
              <text>{{ message.content }}</text>
            </view>
            <text class="mt-1 text-xs text-gray-400">{{ message.time }}</text>
          </view>
        </view>

        <!-- 患者消息 -->
        <view v-else class="flex items-end justify-end gap-2">
          <view class="text-right">
            <view class="max-w-[70%] rounded-bl-xl rounded-br-none rounded-tl-xl rounded-tr-xl bg-gray-700 p-3">
              <text>{{ message.content }}</text>
            </view>
            <text class="mt-1 text-xs text-gray-400">{{ message.time }}</text>
          </view>
          <image :src="patientInfo.avatar" class="h-10 w-10 rounded-full" />
        </view>
      </view>
    </view>

    <!-- 消息输入区域 -->
    <view class="border-t border-gray-700 p-3">
      <view class="flex items-center gap-2">
        <input
          v-model="messageInput"
          class="flex-1 rounded-full bg-gray-700 p-3 text-white placeholder-gray-400"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        >
        <button class="rounded-full bg-blue-600 p-3 text-xl" @click="sendMessage">
          +
        </button>
      </view>
    </view>

    <!-- 视频控制按钮 -->
    <view class="flex items-center justify-around py-6">
      <!-- 静音按钮 -->
      <view class="flex flex-col items-center">
        <view class="h-14 w-14 flex items-center justify-center rounded-full bg-gray-700" @click="toggleMute">
          <text class="text-2xl">🔇</text>
        </view>
        <text class="mt-1 text-xs">静音</text>
      </view>

      <!-- 视频开关 -->
      <view class="flex flex-col items-center">
        <view class="h-14 w-14 flex items-center justify-center rounded-full bg-gray-700" @click="toggleVideo">
          <text class="text-2xl">📹</text>
        </view>
        <text class="mt-1 text-xs">摄像头</text>
      </view>

      <!-- 挂断按钮 -->
      <view class="flex flex-col items-center">
        <view class="h-16 w-16 flex items-center justify-center rounded-full bg-red-500" @click="handleHangup">
          <text class="text-3xl">📞</text>
        </view>
        <text class="mt-1 text-xs">挂断</text>
      </view>
    </view>
  </view>
</template>
