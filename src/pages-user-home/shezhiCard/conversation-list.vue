<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { TUIConversation } from '@/TUIKit'
import { initTUIKitAuto, logoutTUIKit } from '@/utils/tuikit'
import '@dcloudio/uni-app'

const userStore = useUserStore()
const isInitialized = ref(false)
const loading = ref(true)
const error = ref('')

// 初始化TUIKit
function initializeTUIKit() {
  try {
    loading.value = true
    error.value = ''

    // 检查用户是否登录
    if (!userStore.isLoggedIn) {
      throw new Error('用户未登录，请先登录')
    }

    // 自动初始化TUIKit
    initTUIKitAuto().then(() => {
      isInitialized.value = true
      console.log('TUIKit初始化成功')
    }).catch((err) => {
      console.error('TUIKit初始化失败:', err)
      error.value = err instanceof Error ? err.message : 'TUIKit初始化失败'
      isInitialized.value = false
    }).finally(() => {
      loading.value = false
    })
  }
  catch (err) {
    console.error('TUIKit初始化失败:', err)
    error.value = err instanceof Error ? err.message : 'TUIKit初始化失败'
    isInitialized.value = false
    loading.value = false
  }
}

// 处理会话点击，进入聊天页面
function handleConversationClick() {
  // 导航到聊天页面
  uni.navigateTo({ url: '/pages-user-home/shezhiCard/chat' })
}

// 生命周期
onMounted(() => {
  initializeTUIKit()
})

onUnmounted(() => {
  // 页面卸载时登出TUIKit
  if (isInitialized.value) {
    logoutTUIKit().then(() => {
      console.log('TUIKit登出成功')
    }).catch((err) => {
      console.error('TUIKit登出失败:', err)
    })
  }
})
</script>

<template>
  <view class="conversation-list-container h-screen bg-gray-50">
    <!-- 页面头部 -->
    <view class="header sticky top-0 z-10 bg-white shadow-sm">
      <view class="flex items-center px-4 py-3">
        <text class="text-lg font-medium">我的消息</text>
      </view>
    </view>

    <!-- 加载状态 -->
    <view v-if="loading" class="h-[calc(100%-50px)] flex items-center justify-center">
      <view class="text-center">
        <text class="text-gray-500">正在加载会话列表...</text>
      </view>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="error" class="h-[calc(100%-50px)] flex items-center justify-center px-6">
      <view class="text-center">
        <text class="text-base text-red-500">{{ error }}</text>
        <button
          class="mt-4 rounded-full bg-blue-500 px-6 py-2 text-white"
          @click="initializeTUIKit"
        >
          重试
        </button>
      </view>
    </view>

    <!-- 会话列表组件 -->
    <view v-else class="h-[calc(100%-50px)]">
      <TUIConversation
        class="conversation-list"
        @click="handleConversationClick"
      />
    </view>

    <!-- 空状态提示 -->
    <view v-if="isInitialized && !loading" class="no-conversation absolute inset-0 flex flex-col items-center justify-center">
      <view class="mb-4 h-24 w-24 opacity-30">
        <text class="text-6xl">💬</text>
      </view>
      <text class="text-gray-400">暂无消息</text>
    </view>
  </view>
</template>

<style scoped>
.conversation-list {
  height: 100%;
}

.no-conversation {
  pointer-events: none;
  z-index: -1;
}
</style>
