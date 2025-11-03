<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

const userStore = useUserStore()
const appointmentCardRef = ref<HTMLElement>()

// 定义消息类型接口
interface Message {
  id: number
  content: string
  sender: 'user' | 'doctor'
  avatar?: string
  time?: string
}

// 消息列表
const messages = ref<Message[]>([
  {
    id: 1,
    content: '你好，请问什么是湿热体质？',
    sender: 'user',
    avatar: '/static/images/user-avatar.png',
    time: '09:30',
  },
  {
    id: 2,
    content: '你好，我是国浩健康顾问，小浩医生。\n\n湿热体质是中医九大体质之一，指体内湿气与\n热邪结合，导致脏腑功能失调的状态，常见于\n长期处于湿热环境或过度饮酒、口味偏重、舌\n苔黄腻、大便黏滞，易长痘痘或湿疹等，易引发\n炎症、代谢类疾病。',
    sender: 'doctor',
    avatar: '/static/images/doctor-avatar.png',
    time: '09:31',
  },
  {
    id: 3,
    content: '请问如何改善湿热体质呢？',
    sender: 'user',
    avatar: '/static/images/user-avatar.png',
    time: '09:32',
  },
  {
    id: 4,
    content: '1、饮食调理：湿热体质者应适量吃清热利湿\n的食物，如红豆、薏米、冬瓜、绿豆等，帮\n助排出体内湿热。\n\n2、运动调理：坚持适度运动，如跑步、游\n泳、瑜伽等，通过出汗促进湿热排出，提升\n新陈代谢能力。\n\n3、生活习惯调整：避免长期熬夜、久坐不\n动，保持规律的作息，保证每日7-8小时睡\n眠，以调节身体阴阳平衡，祛湿清热。\n\n4、药物治疗：若湿热症状明显，如口干口\n苦、舌苔黄腻、大便黏滞等，可在医生指导\n下服用清热利湿的中成药，如甘露消毒丹、\n葛根芩连丸、龙胆泻肝丸等。',
    sender: 'doctor',
    avatar: '/static/images/doctor-avatar.png',
    time: '09:33',
  },
])

// 输入框内容
const inputValue = ref('')

// 发送消息
function sendMessage() {
  if (!inputValue.value.trim())
    return

  const newMessage: Message = {
    id: Date.now(),
    content: inputValue.value,
    sender: 'user',
    avatar: '/static/images/user-avatar.png',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  }

  messages.value.push(newMessage)
  inputValue.value = ''

  // 模拟医生回复（实际项目中应该调用API）
  setTimeout(() => {
    const doctorReply: Message = {
      id: Date.now() + 1,
      content: '感谢您的咨询！我会尽快为您提供专业的健康建议。请稍等片刻...',
      sender: 'doctor',
      avatar: '/static/images/doctor-avatar.png',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    messages.value.push(doctorReply)
    // 滚动到底部
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, 1000)

  // 滚动到底部
  scrollToBottom()
}

// 滚动到底部
function scrollToBottom() {
  setTimeout(() => {
    const scrollView = document.querySelector('.chat-scroll-view') as HTMLElement
    if (scrollView) {
      scrollView.scrollTop = scrollView.scrollHeight
    }
  }, 0)
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 跳转到预约问诊页面
function goToAppointment() {
  console.log('goToAppointment called')
  console.log('Navigate to:', '/pages/normal/index/appointmentConsult')
  try {
    uni.navigateTo({
      url: '/pages/normal/index/appointmentConsult',
      success: () => {
        console.log('Navigation success')
      },
      fail: (err) => {
        console.error('Navigation failed:', err)
      },
    })
  }
  catch (e) {
    console.error('Error during navigation:', e)
  }
}

onMounted(() => {
  // 手动绑定点击事件到预约问诊卡片
  if (appointmentCardRef.value) {
    appointmentCardRef.value.addEventListener('click', () => {
      console.log('Manual click event triggered')
      goToAppointment()
    })
    console.log('Appointment card click listener added')
  }
})

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <view class="h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px`, paddingBottom: `${safeAreaInsets?.bottom}px` }">
    <!-- 顶部导航栏
    <view class="h-[92rpx] flex items-center justify-between border-b border-[#f0f0f0] bg-white px-[32rpx]">
      <view class="h-[44rpx] w-[44rpx] flex touch-none items-center justify-center bg-transparent p-0" style="background: transparent; border: none; outline: none; tap-highlight-color: transparent; -webkit-tap-highlight-color: transparent;" @click="goBack">
        <text class="text-[#333333] font-medium text-[36rpx]">‹</text>
      </view>
      <text class="text-[#333333] font-medium text-[32rpx]">专业咨询</text>
      <view class="w-[116rpx] flex items-center space-x-[40rpx]">
        <image src="/static/images/phone-icon.png" class="h-[36rpx] w-[36rpx]" mode="aspectFit" />
        <image src="/static/images/more-icon.png" class="h-[36rpx] w-[36rpx]" mode="aspectFit" />
      </view>
    </view> -->

    <!-- 聊天内容区域 -->
    <scroll-view
      class="chat-scroll-view flex-1"
      scroll-y
      :scroll-into-view="`message-${messages.length}`"
      scroll-with-animation
    >
      <view class="p-[32rpx]">
        <!-- 健康问答标题 -->
        <view class="mb-[32rpx] rounded-[16rpx] bg-[#fff9f2] p-[24rpx]">
          <view class="flex items-start">
            <image src="/static/images/question-icon.png" class="mt-[4rpx] h-[40rpx] w-[40rpx]" mode="aspectFit" />
            <view class="ml-[16rpx]">
              <text class="text-[#333333] font-medium text-[28rpx]">专业咨询</text>
              <text class="mt-[8rpx] block text-[#999999] text-[24rpx]">服务指引，健康咨询</text>
            </view>
          </view>
        </view>

        <!-- 预约问诊 -->
        <view class="mb-[32rpx] rounded-[16rpx] bg-[#fff9f2] p-[32rpx]">
          <view class="flex items-center">
            <image src="/static/images/doctor-avatar.png" class="h-[100rpx] w-[100rpx] rounded-[16rpx] object-cover" mode="aspectFit" />
            <view class="ml-[24rpx] flex-1">
              <text class="text-[#333333] font-medium text-[32rpx]">预约问诊</text>
              <text class="mt-[8rpx] block text-[#666666] text-[24rpx]">专业医生一对一视频咨询</text>
            </view>
            <button class="ml-[24rpx] h-[80rpx] flex-shrink-0 rounded-[40rpx] bg-[#ff6b3b] px-[32rpx] text-white text-[28rpx]" @click="goToAppointment">
              立即预约
            </button>
          </view>
        </view>

        <!-- 消息列表 -->
        <view class="space-y-[32rpx]">
          <view
            v-for="message in messages"
            :id="`message-${message.id}`"
            :key="message.id"
            class="flex"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- 头像 -->
            <image
              v-if="message.sender === 'doctor'"
              :src="message.avatar || '/static/images/doctor-avatar.png'"
              class="h-[72rpx] w-[72rpx] rounded-full"
              mode="aspectFit"
            />

            <!-- 消息内容 -->
            <view
              class="relative max-w-[560rpx] rounded-[16rpx] p-[24rpx]"
              :class="message.sender === 'user' ? 'bg-[#e6f2ff] text-[#333333] rounded-br-none ml-[16rpx]' : 'bg-white text-[#333333] rounded-bl-none mr-[16rpx]'"
            >
              <text class="whitespace-pre-line text-[28rpx] leading-[40rpx]">{{ message.content }}</text>
              <text
                class="absolute bottom-[8rpx] text-[#999999] text-[20rpx]"
                :class="message.sender === 'user' ? 'right-[16rpx]' : 'left-[16rpx]'"
              >
                {{ message.time }}
              </text>
            </view>

            <!-- 头像（用户） -->
            <image
              v-if="message.sender === 'user'"
              :src="message.avatar || '/static/images/user-avatar.png'"
              class="h-[72rpx] w-[72rpx] rounded-full"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="h-[140rpx] flex items-center border-t border-[#f0f0f0] bg-white px-[32rpx]">
      <view class="h-[92rpx] flex flex-1 items-center rounded-[46rpx] bg-[#f5f5f5] px-[32rpx]">
        <input
          v-model="inputValue"
          type="text"
          placeholder="请输入您的问题..."
          placeholder-style="color:#999999; font-size:28rpx"
          class="h-full flex-1 text-[#333333] text-[28rpx]"
        >
      </view>
      <button
        class="!important ml-[24rpx] h-[88rpx] w-[120rpx] flex items-center justify-center rounded-[20rpx] bg-blue-500"
        style="background-color: #3b82f6; opacity: 0.9; border: none;"
        :disabled="!inputValue.trim()"
        @click="sendMessage"
      >
        <text class="text-white font-medium text-[28rpx]">发送</text>
      </button>
    </view>
  </view>
</template>
