<script setup lang="ts">
import { useRouter } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/userStore'
import { reactive } from 'vue'

const router = useRouter()
const userStore = useUserStore()

// 模拟用户信息，实际应从store获取
const userInfo = reactive({
  username: '李工',
  avatar: '/static/images/avatar-placeholder.png',
  isVIP: true,
  vipExpireDate: '2024-12-31'
})

// 跳转到在线客服
function goToCustomerService() {
  router.push('/pages-user-home/shezhiCard/chat')
}

// 跳转到消息服务
function goToMessageService() {
  router.push('/pages-user-home/shezhiCard/message-service')
}

// 跳转到反馈页面
function goToFeedback() {
  router.push('/pages-user-home/shezhiCard/feedback')
}

// 退出登录
function handleLogout() {
  // 实际应调用退出登录API
  uni.showModal({
    title: '退出登录',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        router.replace('/pages/login/index')
      }
    }
  })
}
</script>

<template>
  <view class="setting-page min-h-screen bg-gray-50">
    <!-- 用户信息卡片 -->
    <view class="user-card bg-gradient-to-r from-orange-400 to-red-500 p-5 text-white">
      <view class="flex items-center">
        <image :src="userInfo.avatar" class="w-16 h-16 rounded-full border-2 border-white" />
        <view class="ml-4">
          <view class="flex items-center">
            <text class="text-lg font-bold">{{ userInfo.username }}</text>
            <view v-if="userInfo.isVIP" class="ml-2 bg-yellow-400 text-xs px-2 py-0.5 rounded-full">
              健康VIP
            </view>
          </view>
          <text class="text-sm opacity-90">会员有效期至: {{ userInfo.vipExpireDate }}</text>
        </view>
      </view>
      
      <!-- VIP功能入口 -->
      <view class="flex mt-5 space-x-4">
        <view class="flex-1 bg-white/20 p-3 rounded-lg text-center">
          <text class="block text-sm">开通VIP</text>
          <text class="block text-xs opacity-90 mt-1">享更多尊贵权益</text>
        </view>
        <view class="flex-1 bg-white/20 p-3 rounded-lg text-center">
          <text class="block text-sm">升级服务</text>
          <text class="block text-xs opacity-90 mt-1">专属健康管理</text>
        </view>
      </view>
    </view>
    
    <!-- 关注状态 -->
    <view class="flex bg-white p-4 border-b border-gray-100">
      <view class="flex-1 flex flex-col items-center">
        <text class="text-2xl">❤️</text>
        <text class="mt-2 text-sm">关注医生</text>
      </view>
      <view class="flex-1 flex flex-col items-center">
        <text class="text-2xl">📋</text>
        <text class="mt-2 text-sm">健康档案</text>
      </view>
    </view>
    
    <!-- 我的服务 -->
    <view class="mt-3 bg-white">
      <text class="text-base font-medium px-4 py-3 block border-b border-gray-100">我的服务</text>
      <view class="grid grid-cols-4 text-center py-3">
        <view class="flex flex-col items-center">
          <text class="text-2xl">💊</text>
          <text class="mt-2 text-sm">用药记录</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="text-2xl">🏥</text>
          <text class="mt-2 text-sm">看病记录</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="text-2xl">📝</text>
          <text class="mt-2 text-sm">健康检测</text>
        </view>
        <view class="flex flex-col items-center">
          <text class="text-2xl">📍</text>
          <text class="mt-2 text-sm">地址管理</text>
        </view>
      </view>
    </view>
    
    <!-- 账户与设置 -->
    <view class="mt-3 bg-white">
      <text class="text-base font-medium px-4 py-3 block border-b border-gray-100">账户与设置</text>
      <view class="border-b border-gray-100" @tap="goToFeedback">
        <view class="flex justify-between items-center px-4 py-4">
          <text class="text-base">用户反馈</text>
          <text class="text-gray-400">＞</text>
        </view>
      </view>
      <view class="border-b border-gray-100" @tap="goToCustomerService">
        <view class="flex justify-between items-center px-4 py-4">
          <text class="text-base">在线客服</text>
          <text class="text-gray-400">＞</text>
        </view>
      </view>
      <view class="border-b border-gray-100" @tap="goToMessageService">
        <view class="flex justify-between items-center px-4 py-4">
          <text class="text-base">消息设置</text>
          <text class="text-gray-400">＞</text>
        </view>
      </view>
      <view class="border-b border-gray-100">
        <view class="flex justify-between items-center px-4 py-4">
          <text class="text-base">关于系统</text>
          <text class="text-gray-400">＞</text>
        </view>
      </view>
    </view>
    
    <!-- 退出登录按钮 -->
    <view class="mt-6 px-4">
      <button 
        class="w-full bg-red-500 text-white py-3 rounded-lg text-base font-medium"
        @tap="handleLogout"
      >
        退出登录
      </button>
    </view>
    
    <!-- 底部信息 -->
    <view class="mt-6 mb-4 text-center text-gray-400 text-xs">
      <text>当前角色: 普通用户</text>
      <button class="ml-2 text-blue-500 text-xs">切换角色</button>
    </view>
  </view>
</template>