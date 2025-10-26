<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('问诊登记')

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理简述问诊需求按钮点击
function handleDescribeNeeds() {
  // 跳转到留言表单页面
  uni.navigateTo({
    url: '/pages/normal/consultation-guide/message-form',
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#eee]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 页面内容 -->
    <div class="p-[16px]">
      <!-- 提示信息卡片 -->
      <div class="mb-[20px] rounded-[12px] bg-white p-[20px] shadow-sm">
        <div class="text-[14px] text-[#666666] leading-[20px] space-y-[8px]">
          <p>当前顾问繁忙，正在加急处理中，已为您排队。</p>
          <p>最近的顾问已接近完成，我们收到您的需求信息后，顾问将优先为您安排，并在30分钟内主动联系您。</p>
        </div>
      </div>

      <!-- 简述问诊需求按钮 -->
      <div
        class="rounded-[12px] bg-[#e6f7ff] p-[20px] cursor-pointer"
        @click="handleDescribeNeeds"
      >
        <p class="text-[16px] text-[#0957DE] font-medium">
          简述我的问诊需求
        </p>
      </div>
    </div>
  </div>
</template>