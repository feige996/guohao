<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { TUIChat } from '@/TUIKit'
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

    // 自动初始化TUIKit（从userStore获取用户信息，从API获取userSig）
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

// 处理关闭聊天
function handleCloseChat() {
  // 返回上一页
  uni.navigateBack()
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
  <view class="chat-container h-screen bg-gray-50">
    <!-- 加载状态 -->
    <view v-if="loading" class="h-[calc(100%-50px)] flex items-center justify-center">
      <view class="text-center">
        <text class="text-gray-500">正在初始化聊天...</text>
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

    <!-- 聊天组件 -->
    <view v-else class="h-[calc(100%-50px)]">
      <TUIChat @close-chat="handleCloseChat" />
    </view>
  </view>
</template>
