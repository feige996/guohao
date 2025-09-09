<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationBarTitleText: '医生用户首页',
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
</script>

<template>
  <view class="bg-white px-4 pt-2" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <view class="mt-10">
      <image src="/static/logo.svg" alt="" class="mx-auto block h-28 w-28" />
    </view>
    <view class="mt-4 text-center text-4xl text-[#d14328]">
      医生用户首页
    </view>

    <!-- TUIKit 功能按钮 -->
    <view class="mt-8 px-4">
      <button
        class="w-full mb-4 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium"
        @click="openConversationList"
      >
        打开会话列表
      </button>
      <button
        class="w-full py-3 bg-green-500 text-white rounded-lg text-lg font-medium"
        @click="openContact"
      >
        打开联系人
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
