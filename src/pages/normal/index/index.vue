<script lang="ts" setup>
import type { FunctionCardItem } from '@/components/FunctionCards'
import ConstitutionCard from '@/components/ConstitutionCard'
import ConsultationSection from '@/components/ConsultationSection'
import FunctionCards from '@/components/FunctionCards'
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

// 功能卡片事件处理
function handleFunctionCardClick(item: FunctionCardItem) {
  console.log('点击功能卡片:', item)
  // 根据卡片 ID 处理不同的业务逻辑
  switch (item.id) {
    case 'appointment':
      console.log('跳转到预约问诊')
      break
    case 'message':
      console.log('跳转到我的消息')
      break
    case 'collection':
      console.log('跳转到养生收藏')
      break
    case 'product':
      console.log('跳转到关注商品')
      break
    default:
      console.log('未知功能:', item.id)
  }
}

function handleAllFunctionClick() {
  console.log('点击全部功能')
  // 在这里添加全部功能页面的逻辑
}

// 功能卡片数据
const functionCards: FunctionCardItem[] = [
  {
    id: 'appointment',
    title: '预约问诊',
    backgroundImage: '/static/images/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'message',
    title: '我的消息',
    backgroundImage: '/static/images/homepage/message-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'collection',
    title: '养生收藏',
    backgroundImage: '/static/images/homepage/collection-icon.png',
    enabled: true,
    className: 'ml-[1rpx]',
    textStyle: {
      marginLeft: '23rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'product',
    title: '关注商品',
    backgroundImage: '/static/images/homepage/product-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
    },
  },
]
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

      <!-- 功能卡片组件 -->
      <FunctionCards
        :cards="functionCards"
        @card-click="handleFunctionCardClick"
        @all-function-click="handleAllFunctionClick"
      />
    </div>
  </div>
</template>
