<script lang="ts" setup>
import type { HealthcareCardConfig } from '@/components/HealthcareCard'
import { HEALTHCARE_CARD_CONFIGS, HealthcareCardGroup } from '@/components/HealthcareCard'
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

    <view class="w-full flex justify-center pt-3">
      <view class="relative h-140rpx w-680rpx flex flex-row items-start justify-center gap-16rpx rounded-16rpx bg-white pb-16rpx pl-14rpx pr-14rpx pt-16rpx">
        <view class="relative isolate h-136rpx w-328rpx flex flex-shrink-0 flex-col items-start bg-cover bg-center bg-no-repeat" style="background-image: url(/static/images/healthcare/medicine-service-bg.png)">
          <text class="relative z-1 mb--7rpx ml-24rpx mt-28rpx h-38rpx w-108rpx whitespace-pre text-26rpx text-[#2b496b] font-medium leading-38rpx"> 购药服务 </text>
          <view class="relative z-0 ml-24rpx mt-4rpx h-64rpx w-288rpx flex flex-row items-start">
            <view class="relative isolate ml-0 mt-12rpx h-52rpx w-120rpx flex flex-col items-start">
              <text class="relative z-1 ml-0 mt-0 h-24rpx w-102rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx"> 在线开方 </text>
              <text class="relative z-0 ml-0 mt-4rpx w-120rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx"> 便捷购药 </text>
            </view>
            <view class="relative ml-24rpx mt-0 h-56rpx w-144rpx flex flex-col items-start whitespace-pre text-24rpx text-white font-medium leading-36rpx">
              <view class="relative ml-0 mt-0 h-56rpx w-144rpx flex flex-col items-start rounded-28rpx bg-[#c37971]">
                <text class="relative mb--6rpx ml-36rpx mt-16rpx h-36rpx"> 去选药 </text>
              </view>
            </view>
          </view>
        </view>
        <view class="relative isolate h-136rpx w-328rpx flex flex-shrink-0 flex-col items-start bg-cover bg-center bg-no-repeat" style="background-image: url(/static/images/healthcare/smart-diagnosis-bg.png)">
          <text class="relative z-1 mb--7rpx ml-24rpx mt-28rpx h-38rpx w-108rpx whitespace-pre text-26rpx text-[#2b496b] font-medium leading-38rpx"> 智慧自诊 </text>
          <view class="relative z-0 ml-24rpx mt-4rpx h-64rpx w-288rpx flex flex-row items-start">
            <view class="relative isolate ml-0 mt-12rpx h-52rpx w-120rpx flex flex-col items-start">
              <text class="relative z-1 ml-0 mt-0 h-24rpx w-102rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx"> 快速自测 </text>
              <text class="absolute bottom-0 left-0 top-auto z-0 w-120rpx whitespace-pre text-20rpx text-[#89a2be] font-medium leading-24rpx"> 获取初步建议 </text>
            </view>
            <view class="relative ml-24rpx mt-0 h-56rpx w-144rpx flex flex-col items-start">
              <view class="absolute bottom-0 left-auto right-0 top-auto h-56rpx w-144rpx flex flex-col items-start rounded-28rpx bg-[#70b9c1]">
                <text class="absolute bottom-16rpx left-auto right-24rpx top-auto mb--6rpx mt--6rpx h-36rpx whitespace-pre text-24rpx text-white font-medium leading-36rpx"> 开始自测 </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
