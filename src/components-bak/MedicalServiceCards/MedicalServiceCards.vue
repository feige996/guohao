<template>
  <view 
    class="relative h-140rpx w-680rpx flex flex-row items-start justify-center gap-16rpx rounded-16rpx bg-white pb-16rpx pl-14rpx pr-14rpx pt-16rpx"
    :class="className"
  >
    <view 
      v-for="card in cards" 
      :key="card.id"
      class="relative isolate h-136rpx w-328rpx flex flex-shrink-0 flex-col items-start bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${card.backgroundImage})` }"
      @click="handleCardClick(card)"
    >
      <!-- 标题 -->
      <text class="relative z-1 mb--7rpx ml-24rpx mt-28rpx h-38rpx w-108rpx whitespace-pre text-26rpx text-[#2b496b] font-medium leading-38rpx">
        {{ card.title }}
      </text>
      
      <!-- 内容区域 -->
      <view class="relative z-0 ml-24rpx mt-4rpx h-64rpx w-288rpx flex flex-row items-start">
        <!-- 副标题区域 -->
        <view class="relative isolate ml-0 mt-12rpx h-52rpx w-120rpx flex flex-col items-start">
          <text class="relative z-1 ml-0 mt-0 h-24rpx w-102rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx">
            {{ card.subtitle1 }}
          </text>
          <text 
            class="ml-0 mt-4rpx w-120rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx"
            :class="card.id === 'smart-diagnosis' ? 'absolute bottom-0 left-0 top-auto z-0' : 'relative z-0'"
          >
            {{ card.subtitle2 }}
          </text>
        </view>
        
        <!-- 按钮区域 -->
        <view class="relative ml-24rpx mt-0 h-56rpx w-144rpx flex flex-col items-start">
          <view 
            class="h-56rpx w-144rpx flex flex-col items-start rounded-28rpx"
            :class="card.id === 'smart-diagnosis' ? 'absolute bottom-0 left-auto right-0 top-auto' : 'relative ml-0 mt-0'"
            :style="{ backgroundColor: card.buttonColor }"
          >
            <text 
              class="h-36rpx whitespace-pre text-24rpx text-white font-medium leading-36rpx"
              :class="card.id === 'smart-diagnosis' 
                ? 'absolute bottom-16rpx left-auto right-24rpx top-auto mb--6rpx mt--6rpx' 
                : 'relative mb--6rpx ml-36rpx mt-16rpx'"
            >
              {{ card.buttonText }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { MedicalServiceCardsProps, MedicalServiceCardsEmits, MedicalServiceCardConfig } from './types'

// 定义Props
const props = withDefaults(defineProps<MedicalServiceCardsProps>(), {
  className: ''
})

// 定义事件
const emit = defineEmits<MedicalServiceCardsEmits>()

// 处理卡片点击事件
const handleCardClick = (card: MedicalServiceCardConfig) => {
  emit('cardClick', card)
}
</script>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>
