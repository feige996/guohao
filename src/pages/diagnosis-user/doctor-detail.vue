<script setup lang="ts">
import type { Doctor } from '@/data'
import { mockDoctors } from '@/data'

definePage({
  style: {
    'navigationStyle': 'default',
    'navigationBarTitleText': '医生详情',
    'navigationBarBackgroundColor': '#FFFFFF',
    'app-plus': {
      titleNView: {
        titleText: '医生详情',
        buttons: [
          {
            type: 'favorite',
            color: '#8e4337',
          },
        ],
      },
    },
  },
})

// 医生ID（从路由参数获取）
const doctorId = ref('1')

// 是否已收藏
const isFavorited = ref(false)

// 医生详情数据
const doctor = ref<Doctor | null>(null)

// 根据路由参数获取医生信息
onLoad((options: any) => {
  if (options.id) {
    doctorId.value = options.id
  }

  // 检查是否已收藏该医生
  checkFavoriteStatus()

  // 从 data 目录获取医生信息
  const foundDoctor = mockDoctors[doctorId.value]
  if (foundDoctor) {
    doctor.value = foundDoctor
  }
  else {
    // 如果没找到，使用第一个医生
    doctor.value = mockDoctors['1'] || Object.values(mockDoctors)[0]
  }

  // #ifdef APP-PLUS
  // 初始化按钮颜色
  updateFavoriteButtonColor()
  // #endif
})

// 处理导航栏按钮点击事件
onNavigationBarButtonTap((e: any) => {
  // #ifdef APP-PLUS
  if (e.type === 'favorite') {
    toggleFavorite()
  }
  // #endif
})

// 更新收藏按钮颜色
function updateFavoriteButtonColor() {
  // #ifdef APP-PLUS
  // 获取当前页面的webview实例
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const webView = currentPage.$getAppWebview()

  if (webView && webView.setTitleNViewButtonStyle) {
    // 设置按钮颜色：收藏状态为红色，未收藏状态为原始颜色
    // setTitleNViewButtonStyle需要两个参数：按钮索引和样式对象
    webView.setTitleNViewButtonStyle(0, {
      color: isFavorited.value ? '#FF4444' : '#8e4337', // 根据收藏状态设置颜色
    })
  }
  // #endif
}

// 预约问诊
function handleConsultation() {
  if (!doctor.value)
    return
  uni.navigateTo({
    url: `/pages/diagnosis-user/consultation-order?mode=assign&doctorId=${doctor.value.id}`,
  })
}

// 返回
function handleBack() {
  uni.navigateBack()
}

// 检查收藏状态
function checkFavoriteStatus() {
  try {
    const favorites = uni.getStorageSync('favoriteDoctors') || []
    isFavorited.value = favorites.includes(doctorId.value)
  }
  catch (e) {
    console.error('检查收藏状态失败:', e)
  }
}

// 切换收藏状态
function toggleFavorite() {
  try {
    const favorites = uni.getStorageSync('favoriteDoctors') || []
    const doctorIdStr = doctorId.value.toString()

    if (isFavorited.value) {
      // 取消收藏
      const index = favorites.indexOf(doctorIdStr)
      if (index > -1) {
        favorites.splice(index, 1)
      }
      uni.showToast({
        title: '已取消收藏',
        icon: 'success',
        duration: 1500,
      })
    }
    else {
      // 添加收藏
      if (!favorites.includes(doctorIdStr)) {
        favorites.push(doctorIdStr)
      }
      uni.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 1500,
      })
    }

    // 保存到本地存储
    uni.setStorageSync('favoriteDoctors', favorites)
    isFavorited.value = !isFavorited.value

    // 更新导航栏按钮颜色
    updateFavoriteButtonColor()
  }
  catch (e) {
    console.error('收藏操作失败:', e)
    uni.showToast({
      title: '操作失败',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="relative h-screen w-full flex flex-col overflow-hidden bg-gray-50">
    <!-- 滚动内容 -->
    <scroll-view scroll-y class="min-h-0 flex-1">
      <!-- 医生基本信息卡片 -->
      <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
        <view class="mb-32rpx flex gap-24rpx">
          <image :src="doctor?.avatar" class="h-160rpx w-160rpx flex-shrink-0 border-2rpx border-primary/10 rounded-20rpx" mode="aspectFill" />
          <view class="flex flex-1 flex-col gap-12rpx">
            <view class="flex items-center gap-16rpx">
              <text class="text-36rpx text-gray-800 font-bold">{{ doctor?.name }}</text>
              <view v-if="doctor?.isOnline" class="flex items-center gap-8rpx rounded-full bg-green-500/12 px-12rpx py-4rpx">
                <view class="h-12rpx w-12rpx rounded-full bg-green-500" />
                <text class="text-20rpx text-green-500 font-semibold">在线</text>
              </view>
            </view>
            <text class="text-26rpx text-gray-500 font-medium">{{ doctor?.title }} · {{ doctor?.department }}</text>
            <text class="text-24rpx text-gray-400">{{ doctor?.hospital }}</text>
            <text class="text-24rpx text-primary font-medium">从业 {{ doctor?.years }} 年</text>
          </view>
        </view>

        <!-- 数据统计 -->
        <view class="flex items-center justify-around border-t border-gray-100 pt-24rpx">
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx text-primary font-bold">{{ doctor?.rating }}%</text>
            <text class="text-22rpx text-gray-400">好评率</text>
          </view>
          <view class="h-60rpx w-1rpx bg-gray-200" />
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx text-primary font-bold">{{ ((doctor?.consultations || 0) / 10000).toFixed(1) }}万+</text>
            <text class="text-22rpx text-gray-400">问诊量</text>
          </view>
          <view class="h-60rpx w-1rpx bg-gray-200" />
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx text-primary font-bold">{{ doctor?.responseRate }}%</text>
            <text class="text-22rpx text-gray-400">响应率</text>
          </view>
        </view>
      </view>

      <!-- 擅长领域 -->
      <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
        <view class="mb-24rpx flex items-center gap-16rpx">
          <wd-icon name="info" />
          <text class="text-30rpx text-gray-800 font-bold">擅长领域</text>
        </view>
        <view class="flex flex-wrap gap-16rpx">
          <view v-for="(item, index) in doctor?.goodAt" :key="index" class="border border-primary/20 rounded-full bg-primary/8 px-20rpx py-12rpx text-24rpx text-primary font-medium">
            {{ item }}
          </view>
        </view>
      </view>

      <!-- 专业介绍 -->
      <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
        <view class="mb-24rpx flex items-center gap-16rpx">
          <wd-icon name="file-powerpoint" size="20px" text-primary />
          <text class="text-30rpx text-gray-800 font-bold">专业介绍</text>
        </view>
        <text class="block text-26rpx text-gray-600 leading-relaxed">{{ doctor?.introduction }}</text>
      </view>

      <!-- 教育背景 -->
      <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
        <view class="mb-24rpx flex items-center gap-16rpx">
          <wd-icon name="layers" size="20px" text-primary />
          <text class="text-30rpx text-gray-800 font-bold">教育背景</text>
        </view>
        <text class="block text-26rpx text-gray-600 leading-relaxed">{{ doctor?.education }}</text>
      </view>

      <!-- 资质证书 -->
      <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
        <view class="mb-24rpx flex items-center gap-16rpx">
          <wd-icon name="note" size="20px" text-primary />
          <text class="text-30rpx text-gray-800 font-bold">资质证书</text>
        </view>
        <view class="flex flex-col gap-16rpx">
          <view v-for="(cert, index) in doctor?.certificates" :key="index" class="flex items-center gap-16rpx">
            <view class="h-12rpx w-12rpx flex-shrink-0 rounded-full bg-primary" />
            <text class="text-26rpx text-gray-600">{{ cert }}</text>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="z-100 flex flex-shrink-0 items-center justify-between gap-24rpx border-t border-gray-200/80 bg-white px-24rpx py-20rpx shadow-lg">
      <view class="flex flex-col gap-4rpx">
        <text class="text-22rpx text-gray-400">问诊费</text>
        <text class="text-36rpx text-primary font-bold">¥ {{ doctor?.consultationFee }}</text>
      </view>
      <view>
        <wd-button
          type="primary"
          @tap="handleConsultation"
        >
          预约问诊
        </wd-button>
      </view>
    </view>
  </view>
</template>
