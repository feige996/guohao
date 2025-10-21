<script setup lang="ts">
// 图文问诊页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '图文问诊',
  },
})

// 医生信息数据（占位用）
const doctorsData = [
  {
    id: '1',
    name: '孙医生',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=center',
    department: '骨科专家',
    title: 'XX疗法传承人',
  },
  {
    id: '2',
    name: '李医生',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
    department: '内科医师',
    title: '主治医师',
  },
  {
    id: '3',
    name: '韩医生',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=center',
    department: '中医师',
    title: '副主任医师',
  },
]

// 响应式数据
const doctorInfo = ref(doctorsData[0])
const consultationStatus = ref('问诊中')
const inputMessage = ref('')
const messageList = ref([
  {
    id: '1',
    content: '让您久等了，我是内科专家李洁医生，请将你的情况和症状在对话框输入，也可启动视频问诊',
    sender: 'doctor',
    time: '10:30',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: '2',
    content: '李医生，我说下我的情况。',
    sender: 'patient',
    time: '10:31',
    avatar: '',
  },
  {
    id: '3',
    content: '好的。',
    sender: 'doctor',
    time: '10:32',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: '4',
    content: '近期经常头痛，血压高，吃西药没有改善，睡眠也不好。',
    sender: 'patient',
    time: '10:33',
    avatar: '',
  },
])

// 生命周期
onLoad((options: { doctorId?: string, serviceType?: string }) => {
  console.log('图文问诊页面加载，参数:', options)

  // 设置医生信息
  if (options.doctorId) {
    const doctor = doctorsData.find(d => d.id === options.doctorId)
    if (doctor) {
      doctorInfo.value = doctor
    }
  }

  // 滚动到底部
  setTimeout(() => {
    scrollToBottom()
  }, 100)
})

// 处理返回 - 跳转到医师评价页面
function handleBack() {
  // 显示确认对话框
  uni.showModal({
    title: '结束问诊',
    content: '确定要结束本次问诊并去评价医生吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户确认结束问诊')
        // 跳转到医师评价页面，传递医生信息
        uni.navigateTo({
          url: `/pages/normal/online-consultation/doctor-rating?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&doctorTitle=${encodeURIComponent(doctorInfo.value.title)}&doctorSpecialty=${encodeURIComponent(doctorInfo.value.department)}&doctorAvatar=${encodeURIComponent(doctorInfo.value.avatar)}`,
        })
      }
    },
  })
}

// 投诉建议
function handleComplaint() {
  uni.showModal({
    title: '投诉建议',
    content: '如有问题请联系客服：400-123-4567',
    showCancel: false,
  })
}

// 发送消息
function sendMessage() {
  if (!inputMessage.value.trim())
    return

  const newMessage = {
    id: Date.now().toString(),
    content: inputMessage.value.trim(),
    sender: 'patient',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    avatar: '',
  }

  messageList.value.push(newMessage)
  inputMessage.value = ''

  // 滚动到底部
  setTimeout(() => {
    scrollToBottom()

    // 模拟医生回复
    setTimeout(() => {
      const doctorReply = {
        id: (Date.now() + 1).toString(),
        content: '收到您的信息，让我了解一下您的具体情况...',
        sender: 'doctor',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        avatar: doctorInfo.value.avatar,
      }
      messageList.value.push(doctorReply)
      scrollToBottom()
    }, 1000)
  }, 100)
}

// 滚动到底部
function scrollToBottom() {
  const query = uni.createSelectorQuery()
  query.select('.message-list').boundingClientRect()
  query.select('.chat-container').scrollOffset()
  query.exec((res) => {
    if (res && res.length === 2 && res[0] && res[1]) {
      const rect = res[0]
      const scroll = res[1]
      uni.pageScrollTo({
        scrollTop: scroll.scrollTop + rect.height,
        duration: 100,
      })
    }
  })
}

// 选择图片
function chooseImage() {
  uni.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 这里可以处理图片上传和发送
      console.log('选择的图片:', res.tempFilePaths)
    },
  })
}

// 启动视频问诊
function startVideoConsultation() {
  uni.showModal({
    title: '视频问诊',
    content: '即将启动视频问诊，是否继续？',
    success: (res) => {
      if (res.confirm) {
        console.log('启动视频问诊')
        // 这里可以调用视频问诊的逻辑
      }
    },
  })
}

// 上传病历
function uploadMedicalRecord() {
  uni.chooseMessageFile({
    count: 5,
    type: 'file',
    extension: ['doc', 'docx', 'pdf', 'jpg', 'png'],
    success: (res) => {
      console.log('选择的文件:', res.tempFiles)
      // 这里可以处理文件上传逻辑
    },
  })
}

// 查看历史记录
function viewHistory() {
  uni.showModal({
    title: '历史记录',
    content: '功能开发中',
    showCancel: false,
  })
}

// 查看处方
function viewPrescription() {
  uni.showModal({
    title: '查看处方',
    content: '功能开发中',
    showCancel: false,
  })
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">图文问诊</text>
      </view>
    </view>

    <!-- 医生信息 -->
    <view class="mb-3 bg-white p-4">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image :src="doctorInfo.avatar" class="mr-3 h-16 w-16 rounded-full" mode="aspectFill" />
          <view>
            <view class="flex items-center">
              <text class="text-[#333] font-medium text-[28rpx]">{{ doctorInfo.name }}</text>
              <text class="ml-2 text-[#666] text-[24rpx]">{{ doctorInfo.department }}</text>
            </view>
            <text class="text-[#999] text-[22rpx]">{{ doctorInfo.title }}</text>
          </view>
        </view>
        <view class="flex items-center">
          <view class="mr-2 h-2 w-2 rounded-full bg-[#52c41a]" />
          <text class="text-[#52c41a] text-[24rpx]">{{ consultationStatus }}</text>
        </view>
      </view>
    </view>

    <!-- 投诉建议按钮 -->
    <view class="mb-3 px-4">
      <view class="flex items-center justify-between border border-[#ffccc7] rounded-[8rpx] bg-[#fff1f0] px-3 py-2">
        <text class="text-[#ff4d4f] text-[24rpx]">问诊过程中如有不满，可随时投诉</text>
        <text class="rounded-[4rpx] bg-[#ff4d4f] bg-opacity-10 px-3 py-1 text-[#ff4d4f] text-[24rpx]" @click="handleComplaint">投诉建议</text>
      </view>
    </view>

    <!-- 聊天区域 -->
    <view class="chat-container min-h-[calc(100vh-300rpx)] flex-1 overflow-y-auto px-4 pb-20">
      <view class="message-list py-3 space-y-5">
        <!-- 医生消息 -->
        <view v-for="message in messageList" :key="message.id" class="flex" :class="message.sender === 'doctor' ? 'justify-start' : 'justify-end'">
          <template v-if="message.sender === 'doctor'">
            <image :src="message.avatar" class="mr-2 h-12 w-12 flex-shrink-0 rounded-full" mode="aspectFill" />
            <view class="max-w-[70%]">
              <view class="rounded-bl-[12rpx] rounded-br-[12rpx] rounded-tl-none rounded-tr-[12rpx] bg-white p-3 shadow-sm">
                <text class="text-[#333] text-[26rpx]">{{ message.content }}</text>
              </view>
              <text class="mt-1 block text-[#999] text-[20rpx]">{{ message.time }}</text>
            </view>
          </template>
          <template v-else>
            <view class="max-w-[70%] flex justify-end">
              <view class="rounded-bl-[12rpx] rounded-br-none rounded-tl-[12rpx] rounded-tr-[12rpx] bg-[#93c5fd] p-3 shadow-sm">
                <text class="text-white text-[26rpx]">{{ message.content }}</text>
              </view>
              <text class="mt-1 block text-right text-[#999] text-[20rpx]">{{ message.time }}</text>
            </view>
          </template>
        </view>
      </view>
    </view>

    <!-- 功能按钮 -->
    <view class="fixed bottom-[120rpx] left-0 right-0 flex justify-around border-t border-[#eee] bg-white py-2">
      <view class="flex flex-col items-center" @click="chooseImage">
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-[40rpx]">
          📷
        </view>
        <text class="mt-1 text-[#666] text-[20rpx]">拍照</text>
      </view>
      <view class="flex flex-col items-center" @click="uploadMedicalRecord">
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-[40rpx]">
          📋
        </view>
        <text class="mt-1 text-[#666] text-[20rpx]">病历</text>
      </view>
      <view class="flex flex-col items-center" @click="startVideoConsultation">
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-[40rpx]">
          🎥
        </view>
        <text class="mt-1 text-[#666] text-[20rpx]">视频</text>
      </view>
      <view class="flex flex-col items-center" @click="viewHistory">
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-[40rpx]">
          📅
        </view>
        <text class="mt-1 text-[#666] text-[20rpx]">记录</text>
      </view>
      <view class="flex flex-col items-center" @click="viewPrescription">
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-[#f0f0f0] text-[#666] text-[40rpx]">
          💊
        </view>
        <text class="mt-1 text-[#666] text-[20rpx]">处方</text>
      </view>
    </view>

    <!-- 输入框 -->
    <view class="fixed bottom-0 left-0 right-0 border-t border-[#eee] bg-white px-3 py-2">
      <view class="flex items-center">
        <view class="mr-2 flex-1">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="请输入您想咨询的问题"
            class="w-full rounded-[24rpx] bg-[#f5f5f5] px-4 py-2 text-[26rpx]"
            placeholder-style="text-[#999]"
          >
        </view>
        <view
          class="rounded-[24rpx] bg-[#1890ff] px-5 py-2 text-white text-[26rpx]"
          :class="!inputMessage.trim() ? 'bg-[#d9d9d9]' : ''"
          :disabled="!inputMessage.trim()"
          @click="sendMessage"
        >
          发送
        </view>
      </view>
    </view>
  </view>
</template>
