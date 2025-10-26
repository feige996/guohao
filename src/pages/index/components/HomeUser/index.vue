<script lang="ts" setup>
import type { FunctionCardItem } from '@/components/FunctionCards'
import { ref } from 'vue'
import ConsultationSection from '@/components/ConsultationSection'
import FunctionCards from '@/components/FunctionCards'
import SearchBar from '@/components/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'
import DateStatus from './components/DateStatus.vue'
import VIPmember from './components/VIPmember.vue'

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '普通用户首页',
  },
})

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
        url: '/pages/normal/index/favoriteProducts'
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
  <view class="min-h-screen bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部渐变背景 -->
    <view class="absolute left-0 top-0 h-[600rpx] w-full from-[#f6e2d3] to-transparent bg-gradient-to-b -z-10" />

    <!-- 顶部区域 -->
    <view class="pb-[20rpx]">
      <!-- VIP会员组件 - 与其他卡片左侧对齐 -->
      <div class="mt-[24rpx] flex justify-center px-[24rpx]">
        <div class="w-[702rpx]">
          <VIPmember />
        </div>
      </div>

      <!-- 搜索栏 - 与其他卡片左侧对齐 -->
      <div class="mt-[12px] flex justify-center px-[24rpx]">
        <div class="w-[702rpx]">
          <SearchBar
            margin-left="0rpx"
            @search="handleSearch"
            @click="handleSearchBarClick"
          />
        </div>
      </div>

      <!-- 日期和体质状态 - 与其他卡片左侧对齐 -->
      <div class="flex justify-center px-[24rpx]">
        <div class="w-[702rpx]">
          <DateStatus />
        </div>
      </div>

      <!-- 专业咨询区域 - 居中显示 -->
      <div class="flex justify-center px-[24rpx] py-[30rpx]">
        <ConsultationSection
          @consult-click="handleConsultClick"
          @upgrade-click="handleUpgradeClick"
          @health-manager-click="handleHealthManagerClick"
        />
      </div>
    </view>

    <!-- 专属权益区域 - 与专业咨询区域白色底版对齐 -->
    <div class="flex justify-center px-[24rpx] py-[50rpx]">
      <div class="w-[702rpx] rounded-[16rpx] bg-white p-[24rpx]">
        <!-- 标题栏 -->
        <div class="relative ml-[24rpx] mt-[32rpx] h-[44rpx] flex flex-row items-start">
          <span class="relative ml-0 mt-0 h-[44rpx] whitespace-pre text-[#333333] font-medium text-[32rpx] leading-[40rpx]"> 您的专属权益 </span>
          <span class="relative ml-auto mt-[6rpx] h-[32rpx] w-[48rpx] whitespace-pre text-center text-[#999999] font-light text-[24rpx] leading-[32rpx]"> 设置 </span>
          <img
            class="relative ml-[8rpx] mt-[10rpx] h-[24rpx] w-[24rpx]"
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


  </view>
</template>
