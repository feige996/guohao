<script lang="ts" setup>
import ConstitutionCard from '@/components/ConstitutionCard'
import ConsultationSection from '@/components/ConsultationSection'
import SearchBar from '@/components/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'
import DateCard from './DateCard.vue'

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '普通用户首页',
  },
})

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索')
  // 在这里添加搜索逻辑
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

// 专业咨询区域事件处理
function handleConsultClick() {
  console.log('点击问医生')
  // 在这里添加问医生的逻辑
}

function handleUpgradeClick() {
  console.log('点击升级会员')
  // 在这里添加升级会员的逻辑
}

function handleHealthManagerClick() {
  console.log('点击健康管家消息')
  // 在这里添加健康管家消息的逻辑
}

// 体质卡片事件处理
function handleConstitutionCardClick() {
  console.log('点击体质卡片')
  // 在这里添加体质卡片的逻辑
}

function handleConstitutionClick() {
  console.log('点击体质状态')
  // 在这里添加体质状态的逻辑
}

function handleAdviceClick() {
  console.log('点击养生建议')
  // 在这里添加养生建议的逻辑
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 主容器 -->
    <div class="relative h-[984rpx] w-[750rpx] flex flex-col items-start">
      <!-- 顶部渐变区域 -->
      <div class="relative isolate h-[848rpx] w-[750rpx] flex flex-col items-start from-[#f6e2d3] to-transparent bg-gradient-to-b">
        <!-- 搜索栏 -->
        <SearchBar
          @search="handleSearch"
          @click="handleSearchBarClick"
        />

        <!-- 专业咨询区域 -->
        <ConsultationSection
          @consult-click="handleConsultClick"
          @upgrade-click="handleUpgradeClick"
          @health-manager-click="handleHealthManagerClick"
        />
      </div>

      <!-- 体质卡片区域 -->
      <div class="relative isolate ml-[24rpx] h-[344rpx] w-[702rpx] flex flex-row items-start bg-white bg-cover bg-center bg-no-repeat -mt-[208rpx]">
        <DateCard class="relative z-1 ml-[32rpx] mt-[32rpx] h-[280rpx] w-[282rpx]" />
        <ConstitutionCard
          class="ml-[22rpx] mt-[32rpx]"
          @click="handleConstitutionCardClick"
          @constitution-click="handleConstitutionClick"
          @advice-click="handleAdviceClick"
        />
      </div>
    </div>

    <!-- 专属权益区域 -->
    <div class="relative isolate ml-[24rpx] mt-[28rpx] h-[640rpx] w-[702rpx] flex flex-col items-start rounded-[16rpx] bg-white">
      <!-- 标题栏 -->
      <div class="relative isolate z-3 ml-[24rpx] mt-[32rpx] h-[44rpx] w-[654rpx] flex flex-row items-start">
        <span class="relative z-2 ml-0 mt-0 h-[44rpx] w-[192rpx] whitespace-pre text-[32rpx] text-[#333333] font-medium leading-[40rpx]"> 您的专属权益 </span>
        <span class="relative z-0 ml-[382rpx] mt-[6rpx] h-[32rpx] w-[48rpx] whitespace-pre text-center text-[24rpx] text-[#999999] font-light leading-[32rpx]"> 设置 </span>
        <img
          class="relative z-1 ml-[8rpx] mt-[10rpx] h-[24rpx] w-[24rpx]"
          src="@img/homepage/settings-arrow.png"
        >
      </div>

      <!-- 第一行功能卡片 -->
      <div class="relative isolate z-2 ml-[16rpx] mt-[32rpx] h-[156rpx] w-[670rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/appointment-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 预约问诊 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[14rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/message-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 我的消息 </span>
          </div>
        </div>
      </div>

      <!-- 第二行功能卡片 -->
      <div class="relative isolate z-1 ml-[16rpx] mt-[16rpx] h-[156rpx] w-[670rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-[1rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/collection-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[23rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 养生收藏 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[14rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/product-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx]"> 关注商品 </span>
          </div>
        </div>
      </div>

      <!-- 全部功能卡片 -->
      <div class="relative isolate z-0 ml-[16rpx] mt-[12rpx] h-[156rpx] w-[328rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start">
          <div class="relative isolate ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-row items-start rounded-[8rpx] from-[#f1f6ff] to-[#e3eafe] bg-gradient-to-br">
            <div class="relative z-2 ml-[24rpx] mt-[32rpx] h-[92rpx] w-[104rpx] flex flex-col items-start">
              <span class="relative mb-[-7rpx] ml-0 mt-0 h-[38rpx] whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]"> 全部功能 </span>
              <span class="relative ml-0 mt-[16rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]"> 7x24小时 </span>
              <span class="relative ml-0 mt-[4rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]"> 一对一服务 </span>
            </div>
            <img
              class="relative z-0 ml-[-28rpx] mt-0 h-[156rpx] w-[226rpx]"
              src="@img/homepage/all-function-bg1.png"
            >
            <img
              class="relative z-1 ml-[-184rpx] mt-0 h-[156rpx] w-[186rpx]"
              src="@img/homepage/all-function-bg2.png"
            >
          </div>
        </div>
        <img
          class="relative z-0 ml-[-132rpx] mt-[22rpx] h-[112rpx] w-[112rpx]"
          src="@img/homepage/settings-icon.png"
        >
      </div>
    </div>
  </div>
</template>
