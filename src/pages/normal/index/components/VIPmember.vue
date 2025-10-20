<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  userName?: string
  vipLevel?: string
}

const props = withDefaults(defineProps<Props>(), {
  userName: '张帅',
  vipLevel: 'VIP会员',
})

// 获取当前时间
const currentTime = computed(() => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

// 处理添加按钮点击
function handleAddClick() {
  console.log('点击添加按钮')
}
</script>

<template>
  <div class="relative h-[80px] w-[343px] flex flex-row items-center justify-between rounded-[8px] from-[#f6d9b0] to-[#ebc486] bg-gradient-to-r p-[12px]">
    <!-- 左侧用户信息 -->
    <div class="flex flex-row items-center">
      <!-- 用户头像 -->
      <div class="h-[56px] w-[56px] overflow-hidden border-[2px] border-white rounded-full">
        <img src="/static/images/homepage/avatar-placeholder.png" class="h-full w-full object-cover" alt="用户头像">
      </div>

      <!-- 用户信息 -->
      <div class="ml-[12px] flex flex-col">
        <div class="flex items-center">
          <span class="text-[16px] text-white font-medium">{{ userName }}</span>
          <span v-if="vipLevel" class="ml-[8px] rounded-full bg-[#e09228] px-[10px] py-[2px] text-[12px] text-white">
            {{ vipLevel }}
          </span>
        </div>
      </div>
    </div>

    <!-- 右侧添加按钮 -->
    <div class="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white/30" @click="handleAddClick">
      <div class="h-[3px] w-[20px] rounded-full bg-white" />
      <div class="absolute h-[20px] w-[3px] rounded-full bg-white" />
    </div>
  </div>
</template>
