<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'
import ConstitutionCard from './components/ConstitutionCard.vue'
import DateCard from './components/DateCard.vue'
import ExclusiveBenefitsSection from './components/ExclusiveBenefitsSection.vue'

// 搜索栏事件处理
function handleSearch() {
  console.log('点击完成时， 触发 confirm 事件')
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
  // 跳转到健康问答页面
  uni.navigateTo({
    url: '/pages/normal/index/healthConsult',
  })
}

// 功能卡片事件处理
function handleFunctionCardClick(item: FunctionCardItem) {
  console.log('点击功能卡片:', item)
  // 根据卡片 ID 处理不同的业务逻辑
  switch (item.id) {
    case 'appointment':
      console.log('跳转到预约问诊')
      uni.navigateTo({
        url: '/pages/normal/index/appointmentConsult',
      })
      break
    case 'message':
      console.log('跳转到我的消息')
      uni.navigateTo({
        url: '/pages/normal/index/message',
      })
      break
    case 'collection':
      console.log('跳转到养生收藏')
      uni.navigateTo({
        url: '/pages/normal/healthcare/favorites',
      })
      break
    case 'product':
      console.log('跳转到关注商品')
      uni.navigateTo({
        url: '/pages/normal/index/favoriteProducts',
      })
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
  <view class="px-3 pb-6" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索区域 -->
    <SearchBar placeholder="搜索疾病、症状、科室等" />
    <!-- 专业咨询卡片 -->
    <ConsultationSection />

    <!-- 日期和体质区域 -->
    <view class="mt-3 flex gap-4">
      <DateCard />
      <ConstitutionCard />
    </view>
    <!-- 专属权益区域 -->
    <ExclusiveBenefitsSection class="mt-[14px]" />
  </view>
</template>
