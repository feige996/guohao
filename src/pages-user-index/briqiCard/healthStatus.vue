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
    icon: 'leaf',
  },
  {
    title: '清热解毒茶',
    description: '摘要：养生茶饮商品',
    icon: 'water',
  },
])

// 处理体质自测点击
function handleSelfTestClick() {
  console.log('点击体质自测')
  // 这里可以添加体质自测的逻辑，比如跳转到自测页面
  uni.showToast({
    title: '体质自测功能开发中',
    icon: 'none',
  })
}

// 处理更多内容点击
function handleMoreContentClick() {
  console.log('点击更多内容')
  // 这里可以添加查看更多养生建议的逻辑
  uni.showToast({
    title: '更多养生建议开发中',
    icon: 'none',
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
    <!-- 顶部导航栏
     <view class="sticky top-0 z-10 bg-white shadow-sm">
      <view class="flex items-center h-[100rpx] px-[24rpx] relative">
         返回按钮 - 使用view标签彻底避免按钮默认样式
        <view class="flex items-center justify-center w-[80rpx] h-[80rpx] absolute left-[24rpx]" @click="handleBackClick">
          只显示箭头图标
          <text class="text-[32rpx] font-bold">&lt;</text>
        </view>
       居中标题
        <text class="text-[36rpx] font-medium text-[#333333] absolute left-1/2 transform -translate-x-1/2">健康状态</text>
      </view>
    </view> -->

    <!-- 内容区域 -->
    <view class="pb-[20rpx]">
      <!-- 健康指数卡片 -->
      <view class="flex justify-center px-[24rpx] py-[24rpx]">
        <view class="w-[702rpx] rounded-[16rpx] bg-white p-[32rpx] shadow-sm">
          <!-- 标题栏 -->
          <view class="mb-[24rpx] flex items-center justify-between">
            <text class="text-[#333333] font-medium text-[32rpx]">健康指数</text>
            <text class="text-[#666666] text-[28rpx]" @click="handleMoreContentClick">健康趋势</text>
          </view>

          <!-- 健康分数 -->
          <view class="mb-[32rpx] flex items-baseline">
            <text class="text-[#333333] font-bold text-[80rpx]">{{ healthScore }}</text>
            <text class="ml-[12rpx] text-[#333333] font-medium text-[32rpx]">分</text>
          </view>

          <!-- 健康趋势图表占位 -->
          <view class="h-[120rpx] flex items-end justify-between">
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] rounded-t-[4rpx] bg-[#e6f3ff]" :style="{ height: '80rpx' }" />
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] rounded-t-[4rpx] bg-[#e6f3ff]" :style="{ height: '100rpx' }" />
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] rounded-t-[4rpx] bg-[#e6f3ff]" :style="{ height: '70rpx' }" />
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] rounded-t-[4rpx] bg-[#409eff]" :style="{ height: '110rpx' }" />
            </view>
            <view class="w-[60rpx] flex flex-col items-center">
              <view class="w-[40rpx] rounded-t-[4rpx] bg-[#409eff]" :style="{ height: '120rpx' }" />
            </view>
          </view>
        </view>
      </view>

      <!-- 体质状态卡片 -->
      <view class="flex justify-center px-[24rpx] py-[12rpx]">
        <view class="w-[702rpx] rounded-[16rpx] bg-white p-[32rpx] shadow-sm">
          <text class="mb-[24rpx] block text-[#333333] font-medium text-[32rpx]">体质状态</text>

          <!-- 体质状态标签 -->
          <view class="mb-[24rpx] inline-block rounded-[12rpx] bg-[#f0f9ff] px-[24rpx] py-[12rpx]">
            <text class="text-[#409eff] font-medium text-[28rpx]">{{ bodyStatus }}</text>
          </view>

          <!-- 体质描述 -->
          <view class="mb-[24rpx] text-[#666666] text-[28rpx] leading-[44rpx]">
            {{ bodyStatusDesc }}
          </view>

          <!-- 养生建议标题 -->
          <view class="mb-[24rpx] flex items-center justify-between">
            <text class="text-[#333333] font-medium text-[32rpx]">养生小建议</text>
            <text class="text-[#409eff] text-[28rpx]" @click="handleMoreContentClick">更多内容</text>
          </view>

          <!-- 养生建议列表 -->
          <view class="grid grid-cols-2 mb-[24rpx] gap-[24rpx]">
            <view
              v-for="(suggestion, index) in healthSuggestions"
              :key="index"
              class="rounded-[12rpx] bg-[#f5f7f4] p-[24rpx]"
            >
              <text class="mb-[8rpx] block text-[#333333] font-medium text-[28rpx]">{{ suggestion.title }}</text>
              <text class="text-[#666666] text-[24rpx]">{{ suggestion.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 体质自测按钮 -->
      <view class="flex justify-center px-[24rpx] py-[32rpx]">
        <view class="relative h-[400rpx] w-[400rpx]">
          <!-- 圆形背景 -->
          <view class="absolute inset-0 flex items-center justify-center border-4 border-[#409eff] rounded-full border-dashed">
            <view class="text-center">
              <text class="mb-[16rpx] block text-[#333333] font-medium text-[36rpx]">体质自测</text>
              <!-- 播放按钮 -->
              <view class="mx-auto h-[100rpx] w-[100rpx] flex items-center justify-center rounded-full bg-[#ff7e00]" @click="handleSelfTestClick">
                <uni-icons name="play" size="40rpx" color="#ffffff" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
