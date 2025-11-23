<script setup lang="ts">
import type { ChatMessage } from '@/data'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, ref } from 'vue'
import { mockChatMessages } from '@/data'

definePage({
  style: {
    navigationBarTitleText: 'IM 聊天',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationStyle: 'default', // 使用默认导航栏
  },
})

const patientInfo = ref({
  id: '',
  name: '患者姓名',
  age: '',
  gender: '',
  avatar: '',
  chiefComplaint: '暂无主诉信息',
})

const messageInput = ref('')
const messageListRef = ref<HTMLElement | null>(null)

// 聊天消息数据
const messages = ref<ChatMessage[]>(mockChatMessages.map(msg => ({
  ...msg,
  avatar: msg.type === 'patient'
    ? patientInfo.value.avatar || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
    : msg.type === 'doctor'
      ? 'https://cdn.pixabay.com/photo/2015/07/20/12/57/doctor-852770_640.jpg'
      : undefined,
})))

onLoad((options) => {
  if (options) {
    patientInfo.value = {
      id: options.id || '',
      name: options.name || '患者姓名',
      age: options.age || '',
      gender: options.gender || '',
      avatar: options.avatar || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png', // 默认患者头像
      chiefComplaint: options.symptom || '暂无主诉信息',
    }
    // 更新消息列表中的患者头像
    messages.value.forEach((msg) => {
      if (msg.type === 'patient') {
        msg.avatar = patientInfo.value.avatar
      }
    })
  }
})

onMounted(() => {
  scrollToBottom()
})

function handleBack() {
  uni.navigateBack()
}

function scrollToBottom() {
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight
  }
}

function sendMessage() {
  if (!messageInput.value.trim()) {
    uni.showToast({
      title: '请输入消息内容',
      icon: 'none',
    })
    return
  }

  const now = new Date()
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

  messages.value.push({
    type: 'patient',
    content: messageInput.value,
    time: timeStr,
    avatar: patientInfo.value.avatar,
  })

  messageInput.value = ''
  // 延迟滚动，确保DOM更新完成
  setTimeout(() => {
    scrollToBottom()
  }, 50)

  uni.showToast({
    title: '消息已发送',
    icon: 'none',
  })
}

// 输入框高度自适应
function adjustTextareaHeight(e: any) {
  const textarea = e.target
  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`
}
</script>

<template>
  <view class="h-screen w-full flex flex-col overflow-hidden bg-gray-50">
    <!-- 主诉信息卡片 -->
    <view class="flex flex-shrink-0 items-start gap-16rpx border-b-2rpx border-red-100 bg-orange-50 p-24rpx">
      <svg viewBox="0 0 20 20" fill="currentColor" class="mt-8rpx h-40rpx w-40rpx flex-shrink-0 text-orange-600">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
      </svg>
      <view class="flex-1">
        <text class="mb-10rpx block text-24rpx text-orange-600 font-medium">患者主诉</text>
        <text class="block break-all text-28rpx text-gray-500 leading-relaxed">{{ patientInfo.chiefComplaint }}</text>
      </view>
    </view>

    <!-- 消息列表区域 -->
    <scroll-view ref="messageListRef" scroll-y class="min-h-0 flex-1 overflow-y-auto bg-gray-50 p-24rpx" :scroll-with-animation="true" :scroll-into-view="`msg-${messages.length}`">
      <view class="mb-32rpx flex justify-center">
        <text class="rounded-full bg-white px-24rpx py-8rpx text-24rpx text-gray-400">今天 10:30</text>
      </view>

      <view
        v-for="(msg, index) in messages" :id="`msg-${index + 1}`" :key="index"
        class="mb-32rpx flex items-start gap-16rpx" :class="{ 'justify-end': msg.type === 'patient' }"
      >
        <image v-if="msg.type === 'patient' || (msg.type === 'doctor' && msg.avatar)" :src="msg.avatar" class="h-64rpx w-64rpx flex-shrink-0 overflow-hidden rounded-full bg-red-50" mode="aspectFill" :class="{ 'order-1': msg.type === 'patient' }" />
        <view class="max-w-70% flex-1 break-words rounded-24rpx p-24rpx text-28rpx leading-relaxed shadow-sm" :class="msg.type === 'patient' ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-tr-8rpx rounded-tl-24rpx' : 'bg-white text-gray-800 rounded-tl-8rpx rounded-tr-24rpx'">
          <text>{{ msg.content }}</text>
        </view>
        <text class="mt-4rpx self-end text-24rpx text-gray-400" :class="{ 'mr-16rpx': msg.type === 'patient' }">{{ msg.time }}</text>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="w-full flex flex-shrink-0 items-end gap-16rpx border-t-2rpx border-gray-200 bg-white p-24rpx">
      <button class="h-72rpx w-72rpx flex items-center justify-center rounded-12rpx border-none bg-transparent text-gray-500 transition-all active:scale-95 active:bg-primary/8" aria-label="表情">
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-48rpx w-48rpx">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class="h-72rpx w-72rpx flex items-center justify-center rounded-12rpx border-none bg-transparent text-gray-500 transition-all active:scale-95 active:bg-primary/8" aria-label="图片">
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-48rpx w-48rpx">
          <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <view class="flex flex-1 items-center border-2rpx border-gray-200 rounded-12rpx bg-gray-50 px-16rpx transition-colors focus-within:border-primary">
        <textarea
          v-model="messageInput"
          placeholder="输入消息..."
          :auto-height="true"
          :maxlength="-1"
          class="max-h-160rpx min-h-56rpx w-full flex-1 resize-none bg-transparent py-16rpx text-28rpx text-gray-800 leading-normal placeholder:text-gray-400"
          @input="adjustTextareaHeight"
          @confirm="sendMessage"
        />
      </view>
      <button class="active:bg-primary-dark h-72rpx w-72rpx flex items-center justify-center rounded-12rpx border-none bg-primary transition-all active:scale-95" aria-label="发送" @tap="sendMessage">
        <svg viewBox="0 0 24 24" fill="currentColor" class="h-40rpx w-40rpx text-white">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </view>
  </view>
</template>
