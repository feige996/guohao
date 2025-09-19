<script lang="ts" setup>
import type { ConstitutionCardEmits, ConstitutionCardProps } from './types'

withDefaults(defineProps<ConstitutionCardProps>(), {
  constitutionType: '平和体质',
  adviceTitle: '气节养生建议：神仙粥',
  adviceContent: '糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。',
  badgeImageUrl: '@img/homepage/constitution-badge.png',
})

// 定义事件
const emit = defineEmits<ConstitutionCardEmits>()

function handleCardClick() {
  emit('click')
}

function handleConstitutionClick() {
  emit('constitutionClick')
}

function handleAdviceClick() {
  emit('adviceClick')
}
</script>

<template>
  <div
    class="relative z-0 h-[280rpx] w-[334rpx] flex flex-col cursor-pointer items-start"
    @click="handleCardClick"
  >
    <div class="relative ml-0 mt-0 h-[280rpx] w-[334rpx] flex flex-col items-start rounded-[16rpx] from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br">
      <!-- 体质状态区域 -->
      <div
        class="relative ml-[16rpx] mt-[16rpx] h-[40rpx] w-[288rpx] flex flex-row cursor-pointer items-start"
        @click.stop="handleConstitutionClick"
      >
        <span class="relative ml-0 mt-[8rpx] whitespace-pre text-[#ba7210] font-bold text-[24rpx] leading-[100%]">
          体质状态：
        </span>
        <div class="relative ml-[24rpx] mt-0 h-[40rpx] w-[144rpx] flex flex-col items-start whitespace-pre text-center text-white font-medium text-[20rpx] leading-[24rpx]">
          <div
            class="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[40rpx] w-[144rpx] flex flex-col items-start bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${badgeImageUrl})` }"
          >
            <span class="relative ml-[24rpx] mt-[8rpx]">
              {{ constitutionType }}
            </span>
          </div>
        </div>
      </div>

      <!-- 养生建议区域 -->
      <div class="relative ml-[16rpx] mt-[16rpx] h-[192rpx] w-[302rpx] flex flex-col items-start">
        <div
          class="relative ml-0 mt-0 h-[192rpx] w-[302rpx] flex flex-col cursor-pointer items-start rounded-[8rpx] bg-white/50"
          @click.stop="handleAdviceClick"
        >
          <span class="relative ml-[18rpx] mt-[10rpx] whitespace-pre text-[#333333] font-medium text-[24rpx] leading-[100%]">
            {{ adviceTitle }}
          </span>
          <span class="relative ml-[16rpx] mt-[22rpx] w-[270rpx] text-justify text-[#ababab] font-medium text-[24rpx] leading-[40rpx]">
            {{ adviceContent }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>
