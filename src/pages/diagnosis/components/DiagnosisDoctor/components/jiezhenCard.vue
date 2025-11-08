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
  if (isLoading.value) return
  
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
        url: '/pages-doctor-diagnosis/yuyinwenzhen/order-list'
      })
    }, 500)
  }, 1500)
}
</script>

<template>
  <div class="w-full p-5 rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] bg-[#8E4337] text-white mb-5">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="white"/>
        </svg>
        <span class="text-white text-lg font-medium leading-7">图文语音消息接诊</span>
      </div>
      <div class="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-semibold">待接诊</div>
    </div>
    
    <div class="mb-5">
      <div class="text-white text-3xl font-bold leading-9 mb-1">{{ pendingCount }}</div>
      <div class="text-white/80 text-sm leading-5">等待您的接诊</div>
    </div>
    
    <button 
      class="w-full py-3 bg-white text-[#8E4337] rounded-lg text-sm font-medium leading-5 hover:bg-gray-100 transition-colors active:scale-98 flex items-center justify-center gap-2"
      :disabled="isLoading"
      :class="{ 'opacity-70 cursor-not-allowed': isLoading }"
      @click="handleReceiveConsultation"
    >
      <span v-if="!isLoading">立即接诊</span>
      <span v-else class="flex items-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-[#8E4337]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        处理中...
      </span>
    </button>
  </div>
</template>