<template>
  <view class="test-container">
    <view class="test-section">
      <text class="test-title">MedicalServiceCards 组件测试</text>
      
      <!-- 默认配置测试 -->
      <view class="test-item">
        <text class="test-label">默认配置:</text>
        <MedicalServiceCards 
          :cards="defaultCards" 
          @card-click="handleCardClick" 
        />
      </view>

      <!-- 自定义配置测试 -->
      <view class="test-item">
        <text class="test-label">自定义配置:</text>
        <MedicalServiceCards 
          :cards="customCards" 
          class-name="custom-test-style"
          @card-click="handleCardClick" 
        />
      </view>

      <!-- 单卡片测试 -->
      <view class="test-item">
        <text class="test-label">单卡片:</text>
        <MedicalServiceCards 
          :cards="singleCard" 
          @card-click="handleCardClick" 
        />
      </view>
    </view>

    <!-- 点击日志 -->
    <view class="log-section">
      <text class="log-title">点击日志:</text>
      <view class="log-content">
        <text 
          v-for="(log, index) in clickLogs" 
          :key="index" 
          class="log-item"
        >
          {{ log }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MedicalServiceCards, MEDICAL_SERVICE_CARDS_CONFIG } from './index'
import type { MedicalServiceCardConfig } from './types'

// 默认配置
const defaultCards = ref(MEDICAL_SERVICE_CARDS_CONFIG)

// 自定义配置
const customCards = ref<MedicalServiceCardConfig[]>([
  {
    id: 'test-service-1',
    title: '测试服务1',
    subtitle1: '测试副标题1',
    subtitle2: '测试副标题2',
    buttonText: '测试按钮',
    buttonColor: '#ff6b6b',
    backgroundImage: '/static/images/healthcare/medicine-service-bg.png',
    action: 'testAction1'
  },
  {
    id: 'test-service-2',
    title: '测试服务2',
    subtitle1: '测试副标题1',
    subtitle2: '测试副标题2',
    buttonText: '测试按钮',
    buttonColor: '#4ecdc4',
    backgroundImage: '/static/images/healthcare/smart-diagnosis-bg.png',
    action: 'testAction2'
  }
])

// 单卡片配置
const singleCard = ref<MedicalServiceCardConfig[]>([
  {
    id: 'single-test',
    title: '单卡片测试',
    subtitle1: '单卡片',
    subtitle2: '测试用例',
    buttonText: '单卡片',
    buttonColor: '#9c88ff',
    backgroundImage: '/static/images/healthcare/medicine-service-bg.png',
    action: 'singleTest'
  }
])

// 点击日志
const clickLogs = ref<string[]>([])

// 处理卡片点击事件
const handleCardClick = (card: MedicalServiceCardConfig) => {
  const logMessage = `[${new Date().toLocaleTimeString()}] 点击了: ${card.title} (${card.id})`
  clickLogs.value.unshift(logMessage)
  
  // 限制日志数量
  if (clickLogs.value.length > 10) {
    clickLogs.value = clickLogs.value.slice(0, 10)
  }
  
  console.log('测试点击事件:', card)
}
</script>

<style scoped>
.test-container {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.test-section {
  margin-bottom: 48rpx;
}

.test-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 32rpx;
  text-align: center;
}

.test-item {
  margin-bottom: 32rpx;
  padding: 24rpx;
  background-color: white;
  border-radius: 16rpx;
}

.test-label {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #666;
  margin-bottom: 16rpx;
}

.custom-test-style {
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.log-section {
  background-color: white;
  border-radius: 16rpx;
  padding: 24rpx;
}

.log-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.log-content {
  max-height: 400rpx;
  overflow-y: auto;
}

.log-item {
  display: block;
  font-size: 24rpx;
  color: #666;
  padding: 8rpx 0;
  border-bottom: 1rpx solid #eee;
}

.log-item:last-child {
  border-bottom: none;
}
</style>
