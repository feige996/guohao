<script lang="ts" setup>
import { onMounted, ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '图文问诊',
  },
})

// 患者信息
const patientInfo = ref({
  name: '吴姗姗',
  gender: '女',
  age: 32,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
})

// 医生信息
const doctorInfo = ref({
  name: '李李浩',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=center',
})

// 聊天消息列表
const messages = ref([
  {
    id: 1,
    content: '你好，吴女士，我是李李浩医生。请讲一下你的症状。',
    sender: 'doctor',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 2,
    content: '李医生，我说下我的情况。',
    sender: 'patient',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 3,
    content: '好的。',
    sender: 'doctor',
    timestamp: new Date().toLocaleTimeString(),
  },
  {
    id: 4,
    content: '近期经常头痛，血压高，吃东西没有改善，睡眠也不好。',
    sender: 'patient',
    timestamp: new Date().toLocaleTimeString(),
  },
])

// 输入框内容
const inputContent = ref('')

// 发送消息
function sendMessage() {
  if (inputContent.value.trim()) {
    const newMessage = {
      id: Date.now(),
      content: inputContent.value,
      sender: 'doctor',
      timestamp: new Date().toLocaleTimeString(),
    }
    messages.value.push(newMessage)
    inputContent.value = ''

    // 滚动到底部
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }
}

// 滚动到底部
function scrollToBottom() {
  const chatContainer = document.querySelector('.chat-container')
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight
  }
}

// 查看病历档案
function viewMedicalRecord() {
  console.log('查看病历档案')
  // 可以跳转到病历档案页面
}

// 结束问诊
function endConsultation() {
  console.log('结束问诊')
  // 可以添加确认对话框
  uni.showModal({
    title: '提示',
    content: '确定要结束本次问诊吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户确认结束问诊')
        // 跳转到诊断书页面
        uni.navigateTo({
          url: `/pages/doctor/diagnosis/diagnosisReport?patientInfo=${encodeURIComponent(JSON.stringify(patientInfo.value))}`
        })
      }
    },
  })
}

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-50">
    <!-- 顶部导航 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
      <text class="text-base text-blue-500" @click="navigateBack">‹</text>
      <text class="text-lg font-medium">图文问诊</text>
      <view class="w-6" />
    </view>

    <!-- 患者信息 -->
    <view class="flex items-center justify-between border-b border-gray-200 bg-white p-3">
      <view class="flex items-center">
        <image :src="patientInfo.avatar" class="mr-3 h-10 w-10 rounded-full" />
        <text class="text-base">{{ patientInfo.name }} {{ patientInfo.gender }} {{ patientInfo.age }}岁</text>
      </view>
      <button class="rounded-full bg-blue-50 px-4 py-1 text-sm text-blue-500" @click="viewMedicalRecord">
        病历档案
      </button>
    </view>

    <!-- 问诊状态 -->
    <view class="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-2">
      <button class="rounded-full bg-green-100 px-4 py-1 text-sm text-green-600">
        问诊中
      </button>
      <button class="rounded-full bg-red-100 px-4 py-1 text-sm text-red-600" @click="endConsultation">
        结束问诊
      </button>
    </view>

    <!-- 聊天内容区域 -->
    <view class="chat-container flex-1 overflow-y-auto p-4">
      <view
        v-for="message in messages"
        :key="message.id"
        :class="message.sender === 'doctor' ? 'flex justify-end mb-4' : 'flex justify-start mb-4'"
      >
        <!-- 医生消息 -->
        <template v-if="message.sender === 'doctor'">
          <view class="mr-2 max-w-[70%] rounded-lg rounded-br-none bg-blue-500 p-3 text-white">
            <text>{{ message.content }}</text>
          </view>
          <image :src="doctorInfo.avatar" class="h-10 w-10 rounded-full" />
        </template>

        <!-- 患者消息 -->
        <template v-else>
          <image :src="patientInfo.avatar" class="mr-2 h-10 w-10 rounded-full" />
          <view class="max-w-[70%] border border-gray-200 rounded-lg rounded-bl-none bg-white p-3 text-gray-800">
            <text>{{ message.content }}</text>
          </view>
        </template>
      </view>
    </view>

    <!-- 底部输入区域 -->
    <view class="border-t border-gray-200 bg-white p-3">
      <view class="flex items-center gap-2">
        <button class="h-10 w-10 flex items-center justify-center text-gray-600">
          <text class="text-xl">+</text>
        </button>
        <input
          v-model="inputContent"
          type="text"
          class="h-10 flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm"
          placeholder="请输入消息..."
        >
        <button
          class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white"
          @click="sendMessage"
        >
          <text class="text-lg">↑</text>
        </button>
      </view>
    </view>
  </view>
</template>
