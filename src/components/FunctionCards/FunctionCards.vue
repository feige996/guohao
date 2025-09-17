<script lang="ts" setup>
import type {
  FunctionCardItem,
  FunctionCardsProps,
} from './types'
import { computed } from 'vue'

const props = withDefaults(defineProps<FunctionCardsProps>(), {
  cards: () => [],
  allFunctionCard: () => ({
    title: '全部功能',
    subtitle1: '7x24小时',
    subtitle2: '一对一服务',
    backgroundImage1: '/static/images/homepage/all-function-bg1.png',
    backgroundImage2: '/static/images/homepage/all-function-bg2.png',
    decorationIcon: '/static/images/homepage/settings-icon.png',
  }),
  showAllFunction: true,
  cardsPerRow: 2,
})

const emit = defineEmits<{
  cardClick: [item: FunctionCardItem]
  allFunctionClick: []
}>()

// 将卡片按行分组
const groupedCards = computed(() => {
  const groups: FunctionCardItem[][] = []
  for (let i = 0; i < props.cards.length; i += props.cardsPerRow) {
    groups.push(props.cards.slice(i, i + props.cardsPerRow))
  }
  return groups
})

// 事件处理
function handleCardClick(item: FunctionCardItem) {
  if (item.enabled !== false) {
    emit('cardClick', item)
  }
}

function handleAllFunctionClick() {
  emit('allFunctionClick')
}
</script>

<template>
  <div class="function-cards-container">
    <!-- 功能卡片行 -->
    <div
      v-for="(group, groupIndex) in groupedCards"
      :key="groupIndex"
      class="relative ml-[16rpx] h-[156rpx] w-[670rpx] flex flex-row items-start"
      :class="{
        'mt-[32rpx]': groupIndex === 0,
        'mt-[16rpx]': groupIndex > 0,
      }"
    >
      <div
        v-for="(card, cardIndex) in group"
        :key="card.id"
        class="relative h-[156rpx] w-[328rpx] flex flex-col cursor-pointer items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]"
        :class="[
          {
            'ml-0': cardIndex === 0,
            'ml-[14rpx]': cardIndex === 1,
            'opacity-50 cursor-not-allowed': card.enabled === false,
          },
          card.className,
        ]"
        @click="handleCardClick(card)"
      >
        <div
          class="relative mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start overflow-hidden"
          :class="card.className"
        >
          <!-- 背景图片 -->
          <image
            class="absolute inset-0 h-full w-full"
            :src="card.backgroundImage"
            mode="aspectFill"
          />
          <!-- 文本内容 -->
          <span
            class="relative mb-[-7rpx] h-[38rpx]"
            :style="{
              marginLeft: card.textStyle?.marginLeft || '24rpx',
              marginTop: card.textStyle?.marginTop || '64rpx',
              width: card.textStyle?.width || 'auto',
            }"
          >
            {{ card.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- 全部功能卡片 -->
    <div
      v-if="showAllFunction"
      class="relative ml-[16rpx] mt-[12rpx] h-[156rpx] w-[328rpx] flex flex-row cursor-pointer items-start"
      @click="handleAllFunctionClick"
    >
      <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start">
        <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-row items-start rounded-[8rpx] from-[#f1f6ff] to-[#e3eafe] bg-gradient-to-br">
          <div class="relative ml-[24rpx] mt-[32rpx] h-[92rpx] w-[104rpx] flex flex-col items-start">
            <span class="relative mb-[-7rpx] ml-0 mt-0 h-[38rpx] whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
              {{ allFunctionCard.title }}
            </span>
            <span class="relative ml-0 mt-[16rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]">
              {{ allFunctionCard.subtitle1 }}
            </span>
            <span class="relative ml-0 mt-[4rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]">
              {{ allFunctionCard.subtitle2 }}
            </span>
          </div>
          <img
            class="relative ml-[-28rpx] mt-0 h-[156rpx] w-[226rpx]"
            :src="allFunctionCard.backgroundImage1"
            alt="背景装饰1"
          >
          <img
            class="relative ml-[-184rpx] mt-0 h-[156rpx] w-[186rpx]"
            :src="allFunctionCard.backgroundImage2"
            alt="背景装饰2"
          >
        </div>
      </div>
      <img
        class="relative ml-[-132rpx] mt-[22rpx] h-[112rpx] w-[112rpx]"
        :src="allFunctionCard.decorationIcon"
        alt="装饰图标"
      >
    </div>
  </div>
</template>

<style scoped>
.function-cards-container {
  /* 如果需要额外的样式，可以在这里添加 */
}
</style>
