<script setup lang="ts">
import { ref } from 'vue'

const pendingCount = ref(5)
const isLoading = ref(false)

// 先定义showToast函数
function showToast(message: string) {
  // 实际项目中应该使用全局的Toast组件或工具
  console.log(message)
}

// 使用function关键字声明函数
function handleReceiveConsultation() {
  if (isLoading.value)
    return

  isLoading.value = true
  // 模拟网络请求
  setTimeout(() => {
    isLoading.value = false
    showToast('正在为您转接问诊...')
    // 跳转到订单列表页面
    setTimeout(() => {
      // 在uni-app中使用页面跳转
      // 使用正确的uni-app路由格式
      uni.navigateTo({
        url: '/pages-doctor-diagnosis/yuyinwenzhen/order-list',
      })
    }, 500)
  }, 1500)
}
</script>

<template>
  <div class="mb-5 w-full rounded-[20px] bg-[#8E4337] p-5 text-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
    <div class="mb-4 flex items-start justify-between">
      <div class="flex items-center gap-2">
        <wd-icon name="chat1" size="20px" color="white" />
        <span class="text-lg text-white font-medium leading-7">图文语音消息接诊</span>
      </div>
      <div class="rounded-full bg-white/20 px-3 py-1 text-sm text-white font-semibold">
        待接诊
      </div>
    </div>

    <div class="mb-5">
      <div class="mb-1 text-3xl text-white font-bold leading-9">
        {{ pendingCount }}
      </div>
      <div class="text-sm text-white/80 leading-5">
        等待您的接诊
      </div>
    </div>

    <button
      class="w-full flex items-center justify-center gap-2 rounded-lg bg-white py-4 text-sm text-[#8E4337] font-medium leading-5 transition-colors active:scale-98 hover:bg-gray-100"
      :disabled="isLoading"
      :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
      @click="handleReceiveConsultation"
    >
      <div v-if="!isLoading" class="flex items-center justify-center">
        <wd-icon name="login" size="22px" />
        <span>立即接诊</span>
      </div>
      <span v-else class="flex items-center">
        <wd-icon name="loading" size="16px" color="#8E4337" class="mr-2 animate-spin" />
        处理中...
      </span>
    </button>
  </div>
</template>
