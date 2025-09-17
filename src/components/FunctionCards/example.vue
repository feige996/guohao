<template>
  <div class="p-4 space-y-6">
    <h2 class="text-xl font-bold">FunctionCards 组件示例</h2>
    
    <!-- 使用默认数据 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">使用默认数据</h3>
      <div class="bg-white rounded-lg p-4">
        <FunctionCards
          :cards="DEFAULT_FUNCTION_CARDS"
          @card-click="handleCardClick"
          @all-function-click="handleAllFunctionClick"
        />
      </div>
    </div>
    
    <!-- 自定义卡片数组 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">自定义卡片数组</h3>
      <div class="bg-white rounded-lg p-4">
        <FunctionCards
          :cards="customCards"
          @card-click="handleCustomCardClick"
          @all-function-click="handleAllFunctionClick"
        />
      </div>
    </div>
    
    <!-- 隐藏全部功能 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">隐藏全部功能</h3>
      <div class="bg-white rounded-lg p-4">
        <FunctionCards
          :cards="simpleCards"
          :show-all-function="false"
          @card-click="handleCardClick"
        />
      </div>
    </div>
    
    <!-- 每行3个卡片 -->
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">每行3个卡片</h3>
      <div class="bg-white rounded-lg p-4">
        <FunctionCards
          :cards="moreCards"
          :cards-per-row="3"
          :show-all-function="false"
          @card-click="handleCardClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FunctionCards, { 
  DEFAULT_FUNCTION_CARDS,
  type FunctionCardItem,
  type AllFunctionCard 
} from './index'

// 自定义卡片数组
const customCards: FunctionCardItem[] = [
  {
    id: 'consult',
    title: '在线咨询',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'health',
    title: '健康档案',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: false, // 禁用状态
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'expert',
    title: '专家预约',
    backgroundImage: '@img/homepage/collection-icon.png',
    enabled: true,
    className: 'ml-[2rpx]',
    textStyle: {
      marginLeft: '18rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
]

// 简单卡片（只有两个）
const simpleCards: FunctionCardItem[] = [
  {
    id: 'service1',
    title: '服务一',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
  },
  {
    id: 'service2',
    title: '服务二',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
  },
]

// 更多卡片（6个，用于演示每行3个）
const moreCards: FunctionCardItem[] = [
  {
    id: 'card1',
    title: '功能1',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
  },
  {
    id: 'card2',
    title: '功能2',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
  },
  {
    id: 'card3',
    title: '功能3',
    backgroundImage: '@img/homepage/collection-icon.png',
    enabled: true,
  },
  {
    id: 'card4',
    title: '功能4',
    backgroundImage: '@img/homepage/product-icon.png',
    enabled: true,
  },
  {
    id: 'card5',
    title: '功能5',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: false,
  },
  {
    id: 'card6',
    title: '功能6',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
  },
]

// 事件处理函数
function handleCardClick(item: FunctionCardItem) {
  console.log('点击默认卡片:', item)
  uni.showToast({
    title: `点击了${item.title}`,
    icon: 'none'
  })
}

function handleCustomCardClick(item: FunctionCardItem) {
  console.log('点击自定义卡片:', item)
  
  if (!item.enabled) {
    uni.showToast({
      title: '该功能暂未开放',
      icon: 'none'
    })
    return
  }
  
  switch (item.id) {
    case 'consult':
      uni.showToast({
        title: '跳转到在线咨询',
        icon: 'none'
      })
      break
    case 'health':
      uni.showToast({
        title: '跳转到健康档案',
        icon: 'none'
      })
      break
    case 'expert':
      uni.showToast({
        title: '跳转到专家预约',
        icon: 'none'
      })
      break
    default:
      uni.showToast({
        title: `未知功能: ${item.id}`,
        icon: 'none'
      })
  }
}

function handleAllFunctionClick() {
  console.log('点击全部功能')
  uni.showToast({
    title: '跳转到全部功能页面',
    icon: 'none'
  })
}
</script>

<style scoped>
/* 示例页面样式 */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
