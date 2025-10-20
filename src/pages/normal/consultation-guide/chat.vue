<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 导航栏标题
const pageTitle = ref('在线沟通')
// 客服信息
const customerService = {
  name: '小浩',
  avatar: '/src/static/images/avatar.png', // 假设的头像路径，实际需要替换
  title: '国华在线客服'
}

// 聊天记录
const messages = ref([
  {
    id: 1,
    content: '您好，请问有什么可以帮助您的吗？',
    type: 'received', // received: 收到的消息, sent: 发送的消息
    time: '10:18'
  },
  {
    id: 2,
    content: '您好，最近几天一直很头痛，吃了药也不好，想约个检查。',
    type: 'sent',
    time: '10:18'
  },
  {
    id: 3,
    content: '好的，请问您之前在国华医院体检咨询过吗？\n我需要为您安排预约信息',
    type: 'received',
    time: '10:18'
  },
  {
    id: 4,
    content: '没有的，第一次使用国华中医。',
    type: 'sent',
    time: '10:19'
  },
  {
    id: 5,
    content: '好的，您可以选择现场挂号，在线预约也可以，我为您推荐一位医师。',
    type: 'received',
    time: '10:19'
  },
  {
    id: 6,
    content: '麻烦帮我推荐一位医师。',
    type: 'sent',
    time: '10:20'
  }
])

// 输入框内容
const inputText = ref('')
// 消息容器引用
const messageContainer = ref<HTMLElement>()

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 发送消息
function sendMessage() {
  if (!inputText.value.trim()) return
  
  const newMessage = {
    id: Date.now(),
    content: inputText.value.trim(),
    type: 'sent' as const,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }
  
  messages.value.push(newMessage)
  inputText.value = ''
  
  // 滚动到底部
  setTimeout(() => {
    scrollToBottom()
  }, 100)
  
  // 模拟客服回复
  setTimeout(() => {
    const replyMessage = {
      id: Date.now() + 1,
      content: '好的，我已收到您的消息，正在为您查询相关信息...',
      type: 'received' as const,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(replyMessage)
    
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, 1000)
}

// 滚动到底部
function scrollToBottom() {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

// 页面加载时滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#eee]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 聊天头部信息 -->
    <div class="flex items-center bg-white p-[12px] border-b border-[#eee]">
      <div class="h-[40px] w-[40px] rounded-full overflow-hidden mr-[10px]">
        <image :src="customerService.avatar" class="h-full w-full object-cover" />
      </div>
      <div>
        <h2 class="text-[16px] font-medium text-[#333]">{{ customerService.name }}</h2>
        <p class="text-[12px] text-[#999] mt-0.5">{{ customerService.title }}</p>
      </div>
    </div>

    <!-- 聊天消息区域 -->
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-[16px] min-h-[calc(100vh-170px)]">
      <div class="space-y-[16px]">
        <div v-for="message in messages" :key="message.id" :class="{
          'flex justify-start': message.type === 'received',
          'flex justify-end': message.type === 'sent'
        }">
          <!-- 收到的消息 -->
          <template v-if="message.type === 'received'">
            <div class="h-[36px] w-[36px] rounded-full overflow-hidden mr-[8px]">
              <image :src="customerService.avatar" class="h-full w-full object-cover" />
            </div>
            <div class="relative">
              <div class="bg-white rounded-[10px] rounded-tl-none p-[10px] max-w-[70%] shadow-sm">
                <p class="text-[15px] text-[#333] leading-[1.4]">{{ message.content }}</p>
              </div>
              <span class="text-[11px] text-[#999] mt-1 block">{{ message.time }}</span>
            </div>
          </template>
          
          <!-- 发送的消息 -->
          <template v-else>
            <div class="relative">
              <div class="bg-[#94d0fa] rounded-[10px] rounded-tr-none p-[10px] max-w-[70%] shadow-sm">
                <p class="text-[15px] text-[#333] leading-[1.4]">{{ message.content }}</p>
              </div>
              <span class="text-[11px] text-[#999] mt-1 block text-right">{{ message.time }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="bg-white p-[10px] border-t border-[#eee]">
      <div class="flex items-center">
        <input
          v-model="inputText"
          type="text"
          class="flex-1 bg-[#f5f5f5] rounded-[20px] px-[16px] py-[8px] text-[15px] outline-none"
          placeholder="请输入您想咨询的内容..."
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="ml-[10px] px-[20px] py-[8px] bg-[#0957DE] text-white rounded-[20px] text-[15px] font-medium"
          :disabled="!inputText.trim()"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>