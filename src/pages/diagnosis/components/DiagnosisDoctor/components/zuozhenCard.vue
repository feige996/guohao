<script setup lang="ts">
import { ref } from 'vue'

const isOnline = ref(false)
const queueCount = ref(3)

const toggleOnlineStatus = () => {
  isOnline.value = !isOnline.value
  showToast(isOnline.value ? '已开启在线坐诊' : '已关闭在线坐诊')
}

const enterWorkbench = () => {
  if (!isOnline.value) {
    showToast('请先开启在线坐诊')
    return
  }
  showToast('正在进入坐诊工作台...')
  // 这里可以添加跳转到工作台页面的逻辑
}

const showToast = (message: string) => {
  // 实际项目中应该使用全局的Toast组件或工具
  console.log(message)
}
</script>

<template>
  <div class="w-full p-5 rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] bg-white mb-5">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 text-[#8E4337]">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
        <span class="text-[#333333] text-lg font-medium leading-7">在线坐诊</span>
      </div>
      
      <!-- 在线状态开关 -->
      <label class="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          class="sr-only peer" 
          :checked="isOnline" 
          @change="toggleOnlineStatus"
        >
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8E4337]"></div>
      </label>
    </div>
    
    <div class="mb-4">
      <div class="text-[#EF4444] text-base font-bold leading-5 mb-1">当前排队人数: {{ queueCount }}人</div>
      <div class="text-[#6B7280] text-sm leading-5">开启后可接收新的在线问诊</div>
    </div>
    
    <button 
      class="w-full py-3 rounded-lg text-sm font-medium leading-5 transition-colors active:scale-98 flex items-center justify-center gap-2"
      :class="isOnline 
        ? 'bg-[#8E4337] text-white hover:bg-[#6E2F25]' 
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      "
      @click="enterWorkbench"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4" :fill="isOnline ? 'white' : '#9CA3AF'">
        <path d="M9 5v2m0 4v2m0 4v2M9 3h.01M12 3h.01M15 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      进入坐诊工作台
    </button>
  </div>
</template>