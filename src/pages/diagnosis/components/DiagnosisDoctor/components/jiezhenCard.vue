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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="white" />
        </svg>
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
      <span v-if="!isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-6 align-middle">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z" clip-rule="evenodd" />
        </svg>
        立即接诊</span>
      <span v-else class="flex items-center">
        <svg class="mr-2 h-4 w-4 animate-spin text-[#8E4337] -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        处理中...
      </span>
    </button>
  </div>
</template>
