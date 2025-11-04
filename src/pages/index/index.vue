<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import HomeDoctor from './components/HomeDoctor/index.vue'
import HomeUser from './components/HomeUser/index.vue'

const userStore = useUserStore()

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
})

// 打开会话列表
function openConversationList() {
  uni.navigateTo({ url: '/TUIKit/components/TUIConversation/index' })
}

// 打开联系人
function openContact() {
  uni.navigateTo({ url: '/TUIKit/components/TUIContact/index' })
}

function openTUIKitDebug() {
  uni.navigateTo({ url: '/pages/tuikit-debug/index' })
}
</script>

<template>
  <view class="page-home px-3 pt-4">
    <HomeDoctor v-if="userStore.isDoctor" />
    <HomeUser v-else />

    <!-- TUIKit 聊天功能入口 -->
    <view class="mb-8 mt-6">
      <view class="flex justify-center gap-4">
        <button
          class="rounded-full bg-blue-500 px-6 py-2 text-white font-medium shadow-md transition-colors hover:bg-blue-600"
          @click="openConversationList"
        >
          打开会话列表
        </button>
        <button
          class="border border-blue-500 rounded-full bg-white px-6 py-2 text-blue-500 font-medium shadow-md transition-colors hover:bg-blue-50"
          @click="openContact"
        >
          打开联系人
        </button>
        <button
          class="rounded-full bg-yellow-500 px-6 py-2 text-white font-medium shadow-md transition-colors hover:bg-yellow-600"
          @click="openTUIKitDebug"
        >
          TUIKit调试
        </button>
      </view>
    </view>
  </view>
</template>
