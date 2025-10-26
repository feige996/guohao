<template>
  <view class="min-h-screen bg-gray-100 p-[24rpx]">
    <view class="mb-[32rpx]">
      <text class="text-gray-800 font-bold text-[32rpx]">HealthcareCard 测试页面</text>
    </view>

    <!-- 单个卡片测试 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] block text-gray-700 font-medium text-[28rpx]">单个卡片测试</text>
      <view class="flex flex-row flex-wrap gap-[14rpx]">
        <HealthcareCard
          :config="HEALTHCARE_CARD_CONFIGS.GUIDE"
          @click="handleCardClick"
        />
        <HealthcareCard
          :config="HEALTHCARE_CARD_CONFIGS.CONSULT"
          @click="handleCardClick"
        />
      </view>
    </view>

    <!-- 卡片组测试 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] block text-gray-700 font-medium text-[28rpx]">卡片组测试</text>
      <HealthcareCardGroup
        :configs="healthcareCards"
        @click="handleCardClick"
      />
    </view>

    <!-- 图片路径测试 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] block text-gray-700 font-medium text-[28rpx]">图片路径测试</text>
      <view class="grid grid-cols-3 gap-[16rpx]">
        <view v-for="(imagePath, index) in testImages" :key="index" class="text-center">
          <image
            :src="imagePath"
            class="mx-auto mb-[8rpx] h-[100rpx] w-[100rpx]"
            mode="aspectFit"
            @error="handleImageError"
            @load="handleImageLoad"
          />
          <text class="block text-gray-600 text-[20rpx]">{{ imagePath.split('/').pop() }}</text>
        </view>
      </view>
    </view>

    <!-- 点击日志 -->
    <view class="mt-[48rpx] rounded-[16rpx] bg-white p-[24rpx]">
      <text class="mb-[16rpx] block text-gray-700 font-medium text-[24rpx]">点击日志</text>
      <view v-if="clickLogs.length === 0" class="text-gray-500">
        暂无点击记录
      </view>
      <view v-else>
        <view
          v-for="(log, index) in clickLogs"
          :key="index"
          class="mb-[8rpx] rounded-[8rpx] bg-gray-50 p-[12rpx]"
        >
          <text class="text-gray-600 text-[20rpx]">
            {{ log.time }} - 点击了 "{{ log.title }}" ({{ log.id }})
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { HealthcareCardConfig } from '@/components/HealthcareCard'
import { ref } from 'vue'
import HealthcareCard, { HEALTHCARE_CARD_CONFIGS, HealthcareCardGroup } from '@/components/HealthcareCard'

definePage({
  style: {
    navigationBarTitleText: 'HealthcareCard 测试',
  },
})

// 点击日志
interface ClickLog {
  id: string
  title: string
  time: string
}

const clickLogs = ref<ClickLog[]>([])

// 卡片配置
const healthcareCards = [
  HEALTHCARE_CARD_CONFIGS.GUIDE,
  HEALTHCARE_CARD_CONFIGS.CONSULT,
]

// 测试图片路径
const testImages = [
  '/static/images/healthcare/guide-bg.png',
  '/static/images/healthcare/guide-decoration.png',
  '/static/images/healthcare/guide-avatar.png',
  '/static/images/healthcare/consult-bg.png',
  '/static/images/healthcare/consult-decoration.png',
  '/static/images/healthcare/consult-avatar.png',
]

// 处理卡片点击
function handleCardClick(config: HealthcareCardConfig) {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

  clickLogs.value.unshift({
    id: config.id,
    title: config.title,
    time: timeString,
  })

  // 只保留最近10条记录
  if (clickLogs.value.length > 10) {
    clickLogs.value = clickLogs.value.slice(0, 10)
  }

  console.log('卡片点击:', config)
}

// 处理图片加载错误
function handleImageError(event: any) {
  console.error('图片加载失败:', event)
}

// 处理图片加载成功
function handleImageLoad(event: any) {
  console.log('图片加载成功:', event)
}
</script>
