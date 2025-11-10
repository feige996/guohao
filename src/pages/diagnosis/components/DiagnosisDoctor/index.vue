<script setup lang="ts">
import { ref } from 'vue'
import JieZhenCard from './components/jiezhenCard.vue'
import JiLuCard from './components/jiluCard.vue'
import ZuoZhenCard from './components/zuozhenCard.vue'

const activeTab = ref<'ongoing' | 'all'>('ongoing')

function switchTab(tab: 'ongoing' | 'all') {
  activeTab.value = tab
}

function showToast(message: string) {
  // 实际项目中应该使用全局的Toast组件或工具
  console.log(message)
}
</script>

<template>
  <div class="min-h-screen px-5 py-4">
    <div class="mx-auto max-w-[400px] w-full flex flex-col items-center gap-4">
      <!-- 图文语音消息接诊卡片 -->
      <JieZhenCard />

      <!-- 在线坐诊卡片 -->
      <ZuoZhenCard />

      <!-- 问诊会话记录 -->
      <JiLuCard :active-tab="activeTab" @switch-tab="switchTab" />
    </div>
  </div>
</template>
