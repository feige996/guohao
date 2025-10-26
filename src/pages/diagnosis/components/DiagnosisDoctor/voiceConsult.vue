<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义页面配置
const router = useRouter()

// 定义消息类型
interface Message {
  id: number
  sender: 'doctor' | 'patient'
  content: string
  time: string
}

definePage({
  style: {
    navigationBarTitleText: '语音问诊',
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

// 通话时长
const callDuration = ref('01:09')

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
    content: '确定要结束本次通话吗？',
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

// 处理免提切换
function toggleSpeaker() {
  console.log('切换免提状态')
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 发送消息
function sendMessage() {
  if (!messageInput.value.trim())
    return

  const newMessage: Message = {
    id: messages.value.length + 1,
    sender: 'doctor',
    content: messageInput.value.trim(),
    time: '00:00', // 实际应用中应该使用当前时间
  }

  messages.value.push(newMessage)
  messageInput.value = ''

  // 发送消息后滚动到底部
  // setTimeout(() => {
  //   uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').boundingClientRect((rect: any) => {
  //     if (rect && typeof rect === 'object') {
  //       uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').scrollOffset((offset: any) => {
  //         if (offset && typeof offset === 'object') {
  //           uni.createSelectorQuery().in(getCurrentInstance() as any).select('.message-list').scrollTo({
  //             scrollTop: (offset.scrollTop || 0) + (rect.height || 0),
  //             duration: 0,
  //           })
  //         }
  //       }).exec()
  //     }
  //   }).exec()
  // }, 100)
}

// 组件挂载
onMounted(() => {
  console.log('语音问诊页面已挂载')
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-800 text-white">
    <!-- 顶部导航 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800 p-4">
      <text class="text-base text-white" @click="navigateBack">‹</text>
      <text class="text-lg font-medium">语音问诊</text>
      <view class="w-6" />
    </view>

    <!-- 患者信息区域 -->
    <view class="flex flex-col items-center justify-center p-8">
      <image :src="patientInfo.avatar" class="mb-4 h-24 w-24 border-4 border-blue-500 rounded-full" />
      <text class="mb-2 text-xl font-medium">{{ patientInfo.name }} {{ patientInfo.gender }} {{ patientInfo.age }}岁</text>
      <text class="text-blue-400">病历档案</text>
    </view>

    <!-- 通话时长 -->
    <view class="flex justify-center py-8">
      <text class="text-4xl font-medium">{{ callDuration }}</text>
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

    <!-- 通话控制按钮 -->
    <view class="flex items-center justify-around py-6">
      <!-- 静音按钮 -->
      <view class="flex flex-col items-center">
        <view class="h-14 w-14 flex items-center justify-center rounded-full bg-gray-700" @click="toggleMute">
          <text class="text-2xl">🔇</text>
        </view>
        <text class="mt-1 text-xs">静音</text>
      </view>

      <!-- 挂断按钮 -->
      <view class="flex flex-col items-center">
        <view class="h-16 w-16 flex items-center justify-center rounded-full bg-red-500" @click="handleHangup">
          <text class="text-3xl">📞</text>
        </view>
        <text class="mt-1 text-xs">挂断</text>
      </view>

      <!-- 免提按钮 -->
      <view class="flex flex-col items-center">
        <view class="h-14 w-14 flex items-center justify-center rounded-full bg-gray-700" @click="toggleSpeaker">
          <text class="text-2xl">🔊</text>
        </view>
        <text class="mt-1 text-xs">免提</text>
      </view>
    </view>
  </view>
</template>
