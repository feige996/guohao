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
      <wd-icon name="warn-bold" size="16px" text-orange-600 />
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
      <button class="h-72rpx w-72rpx flex items-center justify-center border-none bg-transparent text-gray-500 transition-all active:scale-95 active:bg-primary/8" aria-label="表情">
        <wd-icon name="github-filled" size="18px" />
      </button>
      <button class="h-72rpx w-72rpx flex items-center justify-center border-none bg-transparent text-gray-500 transition-all active:scale-95 active:bg-primary/8" aria-label="图片">
        <wd-icon name="picture" size="18px" />
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
      <button class="active:bg-primary-dark h-72rpx w-72rpx flex items-center justify-center border-none bg-primary transition-all active:scale-95" aria-label="发送" @tap="sendMessage">
        <wd-icon name="chevron-up-rectangle" size="18px" />
      </button>
    </view>
  </view>
</template>

<style>
/* 全局box-sizing设置，确保所有元素使用border-box模型 */
*.border {
  box-sizing: border-box;
}

/* 确保页面内容不会超出安全区域，特别是在iOS设备上 */
page {
  box-sizing: border-box;
}

/* 确保scroll-view正确处理内边距和box-sizing */
.scroll-view {
  box-sizing: border-box;
}

/* 确保textarea不会超出容器 */
textarea {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}

/* 确保所有带边框的容器正确计算宽度 */
.border {
  box-sizing: border-box;
}
</style>
