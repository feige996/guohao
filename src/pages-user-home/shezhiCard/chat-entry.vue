<script setup lang="ts">
import '@dcloudio/uni-app'

// 跳转到会话列表
function goToConversations() {
  uni.navigateTo({ url: '/pages/user-chat/index' })
}

// 直接进入在线客服聊天
function goToCustomerService() {
  uni.navigateTo({ url: '/pages-user-home/shezhiCard/chat' })
}
</script>

<template>
  <view class="chat-entry-container rounded-lg bg-white shadow-sm">
    <!-- 标题 -->
    <view class="border-b p-4">
      <text class="text-lg font-medium">消息服务</text>
    </view>

    <!-- 功能选项 -->
    <view class="space-y-2">
      <!-- 我的消息 -->
      <view
        class="flex items-center justify-between border-b p-4 active:bg-gray-100 hover:bg-gray-50"
        @tap="goToConversations"
      >
        <view class="flex items-center">
          <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
            <text class="text-blue-500">💬</text>
          </view>
          <text class="text-base">我的消息</text>
        </view>
        <text class="text-gray-300">›</text>
      </view>

      <!-- 在线客服 -->
      <view
        class="flex items-center justify-between p-4 active:bg-gray-100 hover:bg-gray-50"
        @tap="goToCustomerService"
      >
        <view class="flex items-center">
          <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
            <text class="text-green-500">👨‍💼</text>
          </view>
          <text class="text-base">在线客服</text>
        </view>
        <text class="text-gray-300">›</text>
      </view>
    </view>

    <!-- 提示信息 -->
    <view class="bg-gray-50 p-4 text-xs text-gray-500">
      <text>有任何问题，随时与我们的客服团队联系</text>
    </view>
  </view>
</template>
