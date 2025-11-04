<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { TUIChat, TUIConversation } from '@/TUIKit'
import { isH5, isMp } from '@/utils/platform'
import { safeAreaInsets } from '@/utils/systemInfo'
import { initTUIKitAuto, logoutTUIKit } from '@/utils/tuikit'

// 状态管理
const userStore = useUserStore()
const currentConversation = ref<any>(null)
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

// 初始化TUIKit
async function initializeTUIKit() {
  try {
    loading.value = true
    error.value = false
    errorMessage.value = ''

    // 检查用户登录状态
    if (!userStore.isLoggedIn) {
      throw new Error('用户未登录')
    }

    // 初始化TUIKit
    await initTUIKitAuto()
    console.log('TUIKit初始化成功')
  }
  catch (err) {
    console.error('TUIKit初始化失败:', err)
    error.value = true
    errorMessage.value = err instanceof Error ? err.message : '初始化失败'
  }
  finally {
    loading.value = false
  }
}

// 选择会话
function handleSelectConversation(conversation: any) {
  console.log('选择会话:', conversation)
  currentConversation.value = conversation
}

// 消息发送回调
function handleMessageSend(message: any) {
  console.log('消息发送成功:', message)
}

// 返回上一页
function handleBack() {
  if (currentConversation.value) {
    currentConversation.value = null
  }
  else {
    uni.navigateBack()
  }
}

// 页面生命周期
onMounted(async () => {
  await initializeTUIKit()
})

onUnmounted(() => {
  // 页面卸载时可以选择登出TUIKit
  // logoutTUIKit().catch(err => console.error('TUIKit登出失败:', err))
})
</script>

<template>
  <view class="h-screen flex flex-col bg-gray-50">
    <!-- 加载状态 -->
    <view v-if="loading" class="flex flex-1 items-center justify-center bg-white">
      <view class="flex flex-col items-center">
        <uni-icons type="spinner-cycle" size="40" color="#007aff" class="animate-spin" />
        <text class="mt-2 text-gray-500">加载中...</text>
      </view>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="error" class="flex flex-1 flex-col items-center justify-center bg-white p-6">
      <uni-icons type="close" size="60" color="#ff3b30" />
      <text class="mt-4 text-center text-gray-600">{{ errorMessage }}</text>
      <button
        class="mt-6 rounded-full bg-blue-500 px-8 py-2 text-white font-medium shadow-sm transition-colors hover:bg-blue-600"
        type="primary"
        @click="initializeTUIKit"
      >
        重试
      </button>
    </view>

    <!-- 主内容区域 -->
    <view v-else class="flex flex-1">
      <!-- 会话列表 -->
      <view
        v-if="!currentConversation"
        class="w-full overflow-hidden border-r border-gray-200 bg-white md:w-[300px]"
      >
        <TUIConversation
          :on-select="handleSelectConversation"
          :current-conversation="currentConversation"
        />
      </view>

      <!-- 聊天窗口 -->
      <view
        v-else
        class="flex-1 overflow-hidden bg-white"
      >
        <TUIChat
          :conversation="currentConversation"
          :on-message-send="handleMessageSend"
        />
      </view>
    </view>
  </view>
</template>
