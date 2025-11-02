<script setup lang="ts" charset="UTF-8">
import { onMounted, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 健康数据
const healthScore = ref(78)
const bodyStatus = ref('湿热体质')
const bodyStatusDesc = ref('湿热体质：平素面垢油光，易生痤疮、粉刺，舌质偏红，苔黄腻，容易口苦口干，身重困倦，对潮湿环境或气温偏高等较敏感。')
const healthSuggestions = ref([
  {
    title: '春夏湿热调理',
    description: '摘要：春季养肝调理',
    icon: 'leaf'
  },
  {
    title: '清热解毒茶',
    description: '摘要：养生茶饮商品',
    icon: 'water'
  }
])

// 处理体质自测点击
function handleSelfTestClick() {
  console.log('点击体质自测')
  // 这里可以添加体质自测的逻辑，比如跳转到自测页面
  uni.showToast({
    title: '体质自测功能开发中',
    icon: 'none'
  })
}

// 处理更多内容点击
function handleMoreContentClick() {
  console.log('点击更多内容')
  // 这里可以添加查看更多养生建议的逻辑
  uni.showToast({
    title: '更多养生建议开发中',
    icon: 'none'
  })
}

// 处理返回按钮点击
function handleBackClick() {
  uni.navigateBack()
}

// 页面加载时执行
onMounted(() => {
  // 可以在这里加载健康数据
  console.log('健康状态页面加载')
})
</script>

<template charset="UTF-8">
  <view class="min-h-screen bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 bg-white shadow-sm">
      <view class="flex items-center h-[100rpx] px-[24rpx] relative">
        <!-- 返回按钮 - 使用view标签彻底避免按钮默认样式 -->
        <view class="flex items-center justify-center w-[80rpx] h-[80rpx] absolute left-[24rpx]" @click="handleBackClick">
          <!-- 只显示箭头图标 -->
          <text class="text-[32rpx] font-bold">&lt;</text>
        </view>
        <!-- 居中标题 -->
        <text class="text-[36rpx] font-medium text-[#333333] absolute left-1/2 transform -translate-x-1/2">健康状态</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pb-[20rpx]">
      <!-- 健康指数卡片 -->
      <view class="flex justify-center px-[24rpx] py-[24rpx]">
        <view class="w-[702rpx] bg-white rounded-[16rpx] p-[32rpx] shadow-sm">
          <!-- 标题栏 -->
          <view class="flex items-center justify-between mb-[24rpx]">
            <text class="text-[32rpx] font-medium text-[#333333]">健康指数</text>
            <text class="text-[28rpx] text-[#666666]" @click="handleMoreContentClick">健康趋势</text>
          </view>
          
          <!-- 健康分数 -->
          <view class="flex items-baseline mb-[32rpx]">
            <text class="text-[80rpx] font-bold text-[#333333]">{{ healthScore }}</text>
            <text class="text-[32rpx] font-medium text-[#333333] ml-[12rpx]">分</text>
          </view>
          
          <!-- 健康趋势图表占位 -->
          <view class="h-[120rpx] flex items-end justify-between">
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] bg-[#e6f3ff] rounded-t-[4rpx]" :style="{ height: '80rpx' }"></view>
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] bg-[#e6f3ff] rounded-t-[4rpx]" :style="{ height: '100rpx' }"></view>
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] bg-[#e6f3ff] rounded-t-[4rpx]" :style="{ height: '70rpx' }"></view>
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] bg-[#409eff] rounded-t-[4rpx]" :style="{ height: '110rpx' }"></view>
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] bg-[#409eff] rounded-t-[4rpx]" :style="{ height: '120rpx' }"></view>
            </view>
          </view>
        </view>
      </view>

      <!-- 体质状态卡片 -->
      <view class="flex justify-center px-[24rpx] py-[12rpx]">
        <view class="w-[702rpx] bg-white rounded-[16rpx] p-[32rpx] shadow-sm">
          <text class="text-[32rpx] font-medium text-[#333333] mb-[24rpx] block">体质状态</text>
          
          <!-- 体质状态标签 -->
          <view class="bg-[#f0f9ff] rounded-[12rpx] inline-block px-[24rpx] py-[12rpx] mb-[24rpx]">
            <text class="text-[28rpx] font-medium text-[#409eff]">{{ bodyStatus }}</text>
          </view>
          
          <!-- 体质描述 -->
          <view class="text-[28rpx] text-[#666666] leading-[44rpx] mb-[24rpx]">
            {{ bodyStatusDesc }}
          </view>
          
          <!-- 养生建议标题 -->
          <view class="flex items-center justify-between mb-[24rpx]">
            <text class="text-[32rpx] font-medium text-[#333333]">养生小建议</text>
            <text class="text-[28rpx] text-[#409eff]" @click="handleMoreContentClick">更多内容</text>
          </view>
          
          <!-- 养生建议列表 -->
          <view class="grid grid-cols-2 gap-[24rpx] mb-[24rpx]">
            <view 
              v-for="(suggestion, index) in healthSuggestions" 
              :key="index"
              class="bg-[#f5f7f4] rounded-[12rpx] p-[24rpx]"
            >
              <text class="text-[28rpx] font-medium text-[#333333] mb-[8rpx] block">{{ suggestion.title }}</text>
              <text class="text-[24rpx] text-[#666666]">{{ suggestion.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 体质自测按钮 -->
      <view class="flex justify-center px-[24rpx] py-[32rpx]">
        <view class="w-[400rpx] h-[400rpx] relative">
          <!-- 圆形背景 -->
          <view class="absolute inset-0 rounded-full border-4 border-[#409eff] border-dashed flex items-center justify-center">
            <view class="text-center">
              <text class="text-[36rpx] font-medium text-[#333333] block mb-[16rpx]">体质自测</text>
              <!-- 播放按钮 -->
              <view class="w-[100rpx] h-[100rpx] bg-[#ff7e00] rounded-full mx-auto flex items-center justify-center" @click="handleSelfTestClick">
                <uni-icons name="play" size="40rpx" color="#ffffff" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>