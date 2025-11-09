<script setup lang="ts">
import { ref } from 'vue'

const isOnline = ref(false)
const queueCount = ref(3)

// 简化的toast函数
function showToast(message: string): void {
  console.log('提示:', message)
  // 在实际环境中，可以使用uni.showToast
  // #ifdef APP-PLUS || MP-WEIXIN
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })
  // #endif
}

function toggleOnlineStatus(): void {
  // 确保状态切换
  console.log('切换前状态:', isOnline.value)
  isOnline.value = !isOnline.value
  console.log('切换后状态:', isOnline.value)

  showToast(isOnline.value ? '已开启在线坐诊' : '已关闭在线坐诊')

  // 当开启在线状态时，跳转到设置页面
  if (isOnline.value) {
    console.log('准备跳转到设置页面...')
    // 使用setTimeout确保状态更新后再跳转
    setTimeout(() => {
      // 使用uni-app的页面跳转方式
      uni.navigateTo({
        url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-setup',
      })
    }, 300)
  }
}

function enterWorkbench(): void {
  if (!isOnline.value) {
    showToast('请先开启在线坐诊')
    return
  }
  setTimeout(() => {
    // 使用uni-app的页面跳转方式
    uni.navigateTo({
      url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-workbench',
    })
  }, 300)
}
</script>

<template>
  <div class="mb-5 w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 text-[#8E4337]">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
        </svg>
        <span class="text-lg text-[#333333] font-medium leading-7">在线坐诊</span>
      </div>

      <!-- 在线状态开关 -->
      <div
        class="h-6 w-12 flex cursor-pointer items-center rounded-full p-1 transition-colors duration-300"
        :class="isOnline ? 'bg-[#8E4337]' : 'bg-gray-300'"
        @click="toggleOnlineStatus"
      >
        <div
          class="h-4 w-4 rounded-full bg-white transition-transform duration-300"
          :class="isOnline ? 'translate-x-6' : ''"
        />
      </div>
    </div>

    <div class="mb-4">
      <div class="mb-1 text-base text-[#EF4444] font-bold leading-5">
        当前排队人数: {{ queueCount }}人
      </div>
      <div class="text-sm text-[#6B7280] leading-5">
        开启后可接收新的在线问诊
      </div>
    </div>

    <button
      class="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium leading-5 transition-colors active:scale-98"
      :class="isOnline
        ? 'bg-[#8E4337] text-white hover:bg-[#6E2F25]'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      "
      @click="enterWorkbench"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" :fill="isOnline ? 'white' : '#9CA3AF'">
        <path d="M9 5v2m0 4v2m0 4v2M9 3h.01M12 3h.01M15 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      进入坐诊工作台
    </button>
  </div>
</template>
