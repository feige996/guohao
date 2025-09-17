<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">
      背景图片测试
    </h2>

    <!-- 测试原始路径 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        原始路径测试
      </h3>
      <div
        class="h-[156rpx] w-[328rpx] border border-gray-300 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/static/images/homepage/appointment-icon.png')"
      >
        <span class="block p-4 text-white">直接路径</span>
      </div>
    </div>

    <!-- 测试别名路径 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        别名路径测试
      </h3>
      <div
        class="h-[156rpx] w-[328rpx] border border-gray-300 bg-cover bg-center bg-no-repeat"
        style="background-image: url('@img/homepage/appointment-icon.png')"
      >
        <span class="block p-4 text-white">别名路径</span>
      </div>
    </div>

    <!-- 测试动态路径 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        动态路径测试
      </h3>
      <div
        class="h-[156rpx] w-[328rpx] border border-gray-300 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: dynamicBgImage }"
      >
        <span class="block p-4 text-white">动态路径</span>
      </div>
    </div>

    <!-- 测试组件 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        FunctionCards 组件测试
      </h3>
      <div class="rounded-lg bg-white p-4">
        <FunctionCards
          :cards="testCards"
          @card-click="handleCardClick"
          @all-function-click="handleAllFunctionClick"
        />
      </div>
    </div>

    <!-- 测试 img 标签 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">
        img 标签测试
      </h3>
      <img
        src="@img/homepage/appointment-icon.png"
        alt="测试图片"
        class="h-[156rpx] w-[328rpx] border border-gray-300 object-cover"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionCardItem } from './index'
import { computed } from 'vue'
import FunctionCards from './index'

// 动态背景图片
const dynamicBgImage = computed(() => {
  return 'url(\'/static/images/homepage/appointment-icon.png\')'
})

// 测试卡片数据
const testCards: FunctionCardItem[] = [
  {
    id: 'test1',
    title: '测试卡片1',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
  },
  {
    id: 'test2',
    title: '测试卡片2',
    backgroundImage: '/static/images/homepage/message-icon.png',
    enabled: true,
  },
]

function handleCardClick(item: FunctionCardItem) {
  console.log('点击测试卡片:', item)
  uni.showToast({
    title: `点击了${item.title}`,
    icon: 'none',
  })
}

function handleAllFunctionClick() {
  console.log('点击全部功能')
  uni.showToast({
    title: '点击全部功能',
    icon: 'none',
  })
}
</script>

<style scoped>
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
