<template>
  <view class="example-container">
    <view class="example-section">
      <text class="example-title">默认配置示例</text>
      <MedicalServiceCards 
        :cards="defaultCards" 
        @card-click="handleCardClick" 
      />
    </view>

    <view class="example-section">
      <text class="example-title">自定义配置示例</text>
      <MedicalServiceCards 
        :cards="customCards" 
        class-name="custom-style"
        @card-click="handleCardClick" 
      />
    </view>

    <view class="example-section">
      <text class="example-title">单卡片示例</text>
      <MedicalServiceCards 
        :cards="singleCard" 
        @card-click="handleCardClick" 
      />
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
    id: 'health-check',
    title: '健康体检',
    subtitle1: '全面检查',
    subtitle2: '专业报告',
    buttonText: '立即预约',
    buttonColor: '#9c88ff',
    backgroundImage: '/static/images/healthcare/health-check-bg.png',
    action: 'goToHealthCheck'
  },
  {
    id: 'nutrition-guide',
    title: '营养指导',
    subtitle1: '个性化方案',
    subtitle2: '科学搭配',
    buttonText: '获取方案',
    buttonColor: '#ff9f43',
    backgroundImage: '/static/images/healthcare/nutrition-bg.png',
    action: 'goToNutrition'
  }
])

// 单卡片配置
const singleCard = ref<MedicalServiceCardConfig[]>([
  {
    id: 'emergency',
    title: '急诊服务',
    subtitle1: '24小时',
    subtitle2: '紧急救助',
    buttonText: '紧急呼叫',
    buttonColor: '#ff6b6b',
    backgroundImage: '/static/images/healthcare/emergency-bg.png',
    action: 'callEmergency'
  }
])

// 处理卡片点击事件
const handleCardClick = (card: MedicalServiceCardConfig) => {
  console.log('点击了卡片:', card.title)
  
  // 模拟不同的业务逻辑
  switch (card.action) {
    case 'goToMedicineService':
      console.log('跳转到购药服务页面')
      // uni.navigateTo({ url: '/pages/medicine/index' })
      break
    case 'goToSmartDiagnosis':
      console.log('跳转到智慧自诊页面')
      // uni.navigateTo({ url: '/pages/diagnosis/index' })
      break
    case 'goToHealthCheck':
      console.log('跳转到健康体检页面')
      // uni.navigateTo({ url: '/pages/health-check/index' })
      break
    case 'goToNutrition':
      console.log('跳转到营养指导页面')
      // uni.navigateTo({ url: '/pages/nutrition/index' })
      break
    case 'callEmergency':
      console.log('拨打急救电话')
      // uni.makePhoneCall({ phoneNumber: '120' })
      break
    default:
      console.log('未知操作:', card.action)
  }
  
  // 显示提示
  uni.showToast({
    title: `点击了${card.title}`,
    icon: 'none'
  })
}
</script>

<style scoped>
.example-container {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.example-section {
  margin-bottom: 48rpx;
}

.example-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
}

.custom-style {
  /* 自定义样式示例 */
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}
</style>
