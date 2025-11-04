<script setup lang="ts">
import { ref } from 'vue'
import ChatEntry from './chat-entry.vue'
import '@dcloudio/uni-app'

const activeTab = ref('customer-service') // customer-service 或 my-messages

// 切换标签
function switchTab(tab: string) {
  activeTab.value = tab
}
</script>

<template>
  <view class="message-service-container min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <view class="header sticky top-0 z-10 bg-white shadow-sm">
      <!-- 标签栏 -->
      <view class="flex border-b">
        <view
          class="flex-1 py-3 text-center"
          :class="activeTab === 'customer-service' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'"
          @tap="switchTab('customer-service')"
        >
          在线客服
        </view>
        <view
          class="flex-1 py-3 text-center"
          :class="activeTab === 'my-messages' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'"
          @tap="switchTab('my-messages')"
        >
          我的消息
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content p-4">
      <!-- 在线客服区域 -->
      <view v-if="activeTab === 'customer-service'" class="space-y-4">
        <!-- 客服介绍卡片 -->
        <view class="rounded-lg bg-white p-4 shadow-sm">
          <view class="mb-3 flex items-center">
            <view class="mr-3 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
              <text class="text-2xl text-blue-500">👨‍💼</text>
            </view>
            <view>
              <text class="block text-lg font-medium">专业客服团队</text>
              <text class="text-sm text-gray-500">工作时间：9:00-18:00</text>
            </view>
          </view>
          <text class="text-sm text-gray-600">
            我们的客服团队随时为您提供帮助，解答您在使用过程中遇到的任何问题。
          </text>
        </view>

        <!-- 常见问题卡片 -->
        <view class="rounded-lg bg-white p-4 shadow-sm">
          <text class="mb-3 block text-base font-medium">常见问题</text>
          <view class="space-y-3">
            <view class="flex items-center text-sm text-gray-600">
              <text class="mr-2 text-blue-500">•</text>
              <text>如何修改个人信息？</text>
            </view>
            <view class="flex items-center text-sm text-gray-600">
              <text class="mr-2 text-blue-500">•</text>
              <text>如何申请退款？</text>
            </view>
            <view class="flex items-center text-sm text-gray-600">
              <text class="mr-2 text-blue-500">•</text>
              <text>如何查看历史订单？</text>
            </view>
          </view>
        </view>

        <!-- 联系客服按钮 -->
        <button
          class="w-full rounded-lg bg-blue-500 py-3 text-base text-white font-medium"
          @tap="uni.navigateTo({ url: '/pages-user-home/shezhiCard/chat' })"
        >
          立即咨询
        </button>
      </view>

      <!-- 我的消息区域 -->
      <view v-else class="space-y-4">
        <!-- 消息入口组件 -->
        <ChatEntry />

        <!-- 消息设置提示 -->
        <view class="border border-yellow-100 rounded-lg bg-yellow-50 p-4">
          <view class="flex items-start">
            <text class="mr-2 text-lg text-yellow-500">⚠️</text>
            <view class="text-sm text-gray-700">
              <text class="mb-1 block font-medium">消息通知设置</text>
              <text>请确保您已开启消息通知权限，以便及时收到新消息提醒。</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
