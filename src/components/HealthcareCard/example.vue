<template>
  <view class="min-h-screen bg-gray-100 p-[24rpx]">
    <view class="mb-[32rpx]">
      <text class="mb-[16rpx] text-[32rpx] text-gray-800 font-bold">HealthcareCard 组件示例</text>
    </view>

    <!-- 预设配置示例 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">预设配置</text>
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

    <!-- 自定义配置示例 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">自定义配置</text>
      <view class="flex flex-row flex-wrap gap-[14rpx]">
        <HealthcareCard
          :config="customConfig"
          @click="handleCardClick"
        />
      </view>
    </view>

    <!-- 禁用状态示例 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">禁用状态</text>
      <view class="flex flex-row flex-wrap gap-[14rpx]">
        <HealthcareCard
          :config="disabledConfig"
          @click="handleCardClick"
        />
      </view>
    </view>

    <!-- 点击日志 -->
    <view class="mt-[48rpx] rounded-[16rpx] bg-white p-[24rpx]">
      <text class="mb-[16rpx] text-[24rpx] text-gray-700 font-medium">点击日志</text>
      <view v-if="clickLogs.length === 0" class="text-gray-500">
        暂无点击记录
      </view>
      <view v-else>
        <view
          v-for="(log, index) in clickLogs"
          :key="index"
          class="mb-[8rpx] rounded-[8rpx] bg-gray-50 p-[12rpx]"
        >
          <text class="text-[20rpx] text-gray-600">
            {{ log.time }} - 点击了 "{{ log.title }}" ({{ log.id }})
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { HealthcareCardConfig } from './index'
import { ref } from 'vue'
import HealthcareCard, { HEALTHCARE_CARD_CONFIGS } from './index'

// 点击日志
interface ClickLog {
  id: string
  title: string
  time: string
}

const clickLogs = ref<ClickLog[]>([])

// 自定义配置示例
const customConfig: HealthcareCardConfig = {
  id: 'emergency',
  title: '急诊服务',
  subtitle1: '24小时急诊',
  subtitle2: '快速响应',
  gradientColors: {
    from: '#ffebee',
    to: '#ffcdd2',
  },
  titleColor: '#c62828',
  subtitleColor: '#e57373',
  images: {
    background: '/static/images/healthcare/guide-bg.png', // 复用现有图片
    decoration: '/static/images/healthcare/guide-decoration.png',
    avatar: '/static/images/healthcare/guide-avatar.png',
    icon1: '/static/images/healthcare/guide-icon1.png',
    icon2: '/static/images/healthcare/guide-icon2.png',
    arrow: '/static/images/healthcare/guide-arrow.png',
  },
  features: {
    feature1: '紧急救治',
    feature2: '专业团队',
  },
  enabled: true,
}

// 禁用状态配置
const disabledConfig: HealthcareCardConfig = {
  ...HEALTHCARE_CARD_CONFIGS.CONSULT,
  id: 'disabled-consult',
  title: '维护中',
  subtitle1: '系统升级',
  subtitle2: '暂停服务',
  enabled: false,
}

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
</script>
