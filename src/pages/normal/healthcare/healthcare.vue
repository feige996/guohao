<script lang="ts" setup>
import type { HealthcareCardConfig } from '@/components/HealthcareCard'
import type { MedicalServiceCardConfig } from '@/components/MedicalServiceCards'
import { HEALTHCARE_CARD_CONFIGS, HealthcareCardGroup } from '@/components/HealthcareCard'
import { MEDICAL_SERVICE_CARDS_CONFIG, MedicalServiceCards } from '@/components/MedicalServiceCards'
import SearchBar from '@/components/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})

// 医疗服务卡片配置
const healthcareCards = [
  HEALTHCARE_CARD_CONFIGS.GUIDE,
  HEALTHCARE_CARD_CONFIGS.CONSULT,
]

// 医疗服务卡片配置
const medicalServiceCards = MEDICAL_SERVICE_CARDS_CONFIG

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索')
  // 在这里添加搜索逻辑
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

// 医疗服务卡片点击事件处理
function handleHealthcareCardClick(config: HealthcareCardConfig) {
  console.log('点击了医疗服务卡片:', config.id, config.title)

  switch (config.id) {
    case 'guide':
      // 处理导诊顾问点击逻辑
      console.log('跳转到导诊顾问页面')
      // uni.navigateTo({ url: '/pages/guide/index' })
      break
    case 'consult':
      // 处理在线问诊点击逻辑
      console.log('跳转到在线问诊页面')
      // uni.navigateTo({ url: '/pages/consult/index' })
      break
    default:
      console.log('未知的卡片类型:', config.id)
  }
}

// 医疗服务卡片点击事件处理
function handleMedicalServiceCardClick(card: MedicalServiceCardConfig) {
  console.log('点击了医疗服务卡片:', card.id, card.title)

  switch (card.action) {
    case 'goToMedicineService':
      console.log('跳转到购药服务页面')
      // uni.navigateTo({ url: '/pages/medicine/index' })
      break
    case 'goToSmartDiagnosis':
      console.log('跳转到智慧自诊页面')
      // uni.navigateTo({ url: '/pages/diagnosis/index' })
      break
    default:
      console.log('未知操作:', card.action)
  }

  // 显示提示
  uni.showToast({
    title: `点击了${card.title}`,
    icon: 'none',
  })
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索栏 -->
    <SearchBar
      @search="handleSearch"
      @click="handleSearchBarClick"
    />

    <!-- 导诊顾问,在线问诊卡片 -->
    <view class="w-full flex justify-center pt-6">
      <HealthcareCardGroup
        :configs="healthcareCards"
        @click="handleHealthcareCardClick"
      />
    </view>

    <!-- 购药服务和智慧自诊卡片 -->
    <view class="w-full flex justify-center pt-3">
      <MedicalServiceCards
        :cards="medicalServiceCards"
        @card-click="handleMedicalServiceCardClick"
      />
    </view>
  </view>
</template>
