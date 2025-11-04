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
    <view class="mt-6 mb-8">
      <view class="flex justify-center gap-4">
        <button 
          @click="openConversationList" 
          class="py-2 px-6 rounded-full bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition-colors"
        >
          打开会话列表
        </button>
        <button 
          @click="openContact" 
          class="py-2 px-6 rounded-full bg-white text-blue-500 font-medium shadow-md border border-blue-500 hover:bg-blue-50 transition-colors"
        >
          打开联系人
        </button>
        <button 
          @click="openTUIKitDebug" 
          class="py-2 px-6 rounded-full bg-yellow-500 text-white font-medium shadow-md hover:bg-yellow-600 transition-colors"
        >
          TUIKit调试
        </button>
      </view>
    </view>
  </view>
</template>
