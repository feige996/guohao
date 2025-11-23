<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'wot-design-uni'

const toast = useToast()
const isOnline = ref(false)
const queueCount = ref(3)

function handleOnlineStatusChange({ value: newValue}: { value: boolean }): void {
  toast.show(newValue ? '已开启在线坐诊，将自动进入坐诊配置页' : '已关闭在线坐诊')
  console.log('handleOnlineStatusChange 调用:', newValue)
  if (newValue) {
    setTimeout(() => {
      // 使用uni-app的页面跳转方式
      uni.navigateTo({
        url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-setup',
      })
    }, 2500)
  }
}

function enterWorkbench(): void {
  if (!isOnline.value) {
    toast.show('请先开启在线坐诊')
    return
  }
  // 使用uni-app的页面跳转方式
  uni.navigateTo({
    url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-workbench',
  })
}
</script>

<template>
  <div class="w-full rounded-[20px] bg-white p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <wd-icon name="user-circle" size="22px" />
        <span class="text-lg text-[#333333] font-medium leading-7">在线坐诊</span>
      </div>

      <!-- 在线状态开关 -->
      <wd-switch v-model="isOnline" @change="handleOnlineStatusChange" />
    </div>

    <div class="mb-4">
      <div class="mb-1 text-base text-[#EF4444] font-bold leading-5">
        当前排队人数: {{ queueCount }}人
      </div>
      <div class="text-sm text-[#6B7280] leading-5">
        开启后可接收新的在线问诊
      </div>
    </div>

    <wd-button
      icon="add1"
      block
      :disabled="!isOnline"
      @click="enterWorkbench"
    >
      进入坐诊工作台
    </wd-button>
    <wd-toast />
  </div>
</template>
