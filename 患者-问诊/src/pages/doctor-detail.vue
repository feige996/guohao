<script setup lang="ts">
import { mockDoctors, type Doctor } from '@/data';
import PageHeader from '@/components/PageHeader.vue';

definePage({
  style: {
    navigationBarTitleText: "医生详情",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

// 医生ID（从路由参数获取）
const doctorId = ref("1");

// 是否已收藏
const isFavorited = ref(false);

// 医生详情数据
const doctor = ref<Doctor | null>(null);

// 根据路由参数获取医生信息
onLoad((options: any) => {
  if (options.id) {
    doctorId.value = options.id;
  }

  // 检查是否已收藏该医生
  checkFavoriteStatus();

  // 从 data 目录获取医生信息
  const foundDoctor = mockDoctors[doctorId.value];
  if (foundDoctor) {
    doctor.value = foundDoctor;
  } else {
    // 如果没找到，使用第一个医生
    doctor.value = mockDoctors["1"] || Object.values(mockDoctors)[0];
  }
});

// 预约问诊
function handleConsultation() {
  if (!doctor.value) return;
  uni.navigateTo({
    url: `/pages/consultation-order?mode=assign&doctorId=${doctor.value.id}`,
  });
}

// 返回
function handleBack() {
  uni.navigateBack();
}

// 检查收藏状态
function checkFavoriteStatus() {
  try {
    const favorites = uni.getStorageSync('favoriteDoctors') || [];
    isFavorited.value = favorites.includes(doctorId.value);
  } catch (e) {
    console.error('检查收藏状态失败:', e);
  }
}

// 切换收藏状态
function toggleFavorite() {
  try {
    const favorites = uni.getStorageSync('favoriteDoctors') || [];
    const doctorIdStr = doctorId.value.toString();

    if (isFavorited.value) {
      // 取消收藏
      const index = favorites.indexOf(doctorIdStr);
      if (index > -1) {
        favorites.splice(index, 1);
      }
      uni.showToast({
        title: "已取消收藏",
        icon: "success",
        duration: 1500,
      });
    } else {
      // 添加收藏
      if (!favorites.includes(doctorIdStr)) {
        favorites.push(doctorIdStr);
      }
      uni.showToast({
        title: "已收藏",
        icon: "success",
        duration: 1500,
      });
    }

    // 保存到本地存储
    uni.setStorageSync('favoriteDoctors', favorites);
    isFavorited.value = !isFavorited.value;
  } catch (e) {
    console.error('收藏操作失败:', e);
    uni.showToast({
      title: "操作失败",
      icon: "none",
    });
  }
}
</script>

<template>
  <view class="relative w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
    <!-- 顶部导航 -->
    <PageHeader 
      title="医生详情" 
      show-right
      right-icon="favorite"
      :is-favorited="isFavorited"
      @back="handleBack"
      @right-click="toggleFavorite"
    />

    <!-- 滚动内容 -->
    <scroll-view scroll-y class="flex-1 min-h-0">
      <!-- 医生基本信息卡片 -->
      <view class="bg-white m-24rpx rounded-24rpx p-32rpx shadow-lg border border-gray-200/80">
        <view class="flex gap-24rpx mb-32rpx">
          <image :src="doctor?.avatar" class="w-160rpx h-160rpx rounded-20rpx flex-shrink-0 border-2rpx border-primary/10" mode="aspectFill" />
          <view class="flex-1 flex flex-col gap-12rpx">
            <view class="flex items-center gap-16rpx">
              <text class="text-36rpx font-bold text-gray-800">{{ doctor?.name }}</text>
              <view v-if="doctor?.isOnline" class="flex items-center gap-8rpx px-12rpx py-4rpx bg-green-500/12 rounded-full">
                <view class="w-12rpx h-12rpx rounded-full bg-green-500" />
                <text class="text-20rpx text-green-500 font-semibold">在线</text>
              </view>
            </view>
            <text class="text-26rpx text-gray-500 font-medium">{{ doctor?.title }} · {{ doctor?.department }}</text>
            <text class="text-24rpx text-gray-400">{{ doctor?.hospital }}</text>
            <text class="text-24rpx text-primary font-medium">从业 {{ doctor?.years }} 年</text>
          </view>
        </view>

        <!-- 数据统计 -->
        <view class="flex items-center justify-around pt-24rpx border-t border-gray-100">
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx font-bold text-primary">{{ doctor?.rating }}%</text>
            <text class="text-22rpx text-gray-400">好评率</text>
          </view>
          <view class="w-1rpx h-60rpx bg-gray-200" />
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx font-bold text-primary">{{ ((doctor?.consultations || 0) / 10000).toFixed(1) }}万+</text>
            <text class="text-22rpx text-gray-400">问诊量</text>
          </view>
          <view class="w-1rpx h-60rpx bg-gray-200" />
          <view class="flex flex-col items-center gap-8rpx">
            <text class="text-32rpx font-bold text-primary">{{ doctor?.responseRate }}%</text>
            <text class="text-22rpx text-gray-400">响应率</text>
          </view>
        </view>
      </view>

      <!-- 擅长领域 -->
      <view class="bg-white m-24rpx rounded-24rpx p-32rpx shadow-lg border border-gray-200/80">
        <view class="flex items-center gap-16rpx mb-24rpx">
          <svg viewBox="0 0 18 18" fill="currentColor" class="w-32rpx h-32rpx text-primary">
            <path d="M9 0C4.029 0 0 4.029 0 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 16.5c-4.136 0-7.5-3.364-7.5-7.5S4.864 1.5 9 1.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z"/>
            <path d="M9 4.5c-.414 0-.75.336-.75.75v3.75c0 .414.336.75.75.75s.75-.336.75-.75V5.25c0-.414-.336-.75-.75-.75zm0 7.5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"/>
          </svg>
          <text class="text-30rpx font-bold text-gray-800">擅长领域</text>
        </view>
        <view class="flex flex-wrap gap-16rpx">
          <view v-for="(item, index) in doctor?.goodAt" :key="index" class="px-20rpx py-12rpx rounded-full bg-primary/8 text-primary text-24rpx font-medium border border-primary/20">
            {{ item }}
          </view>
        </view>
      </view>

      <!-- 专业介绍 -->
      <view class="bg-white m-24rpx rounded-24rpx p-32rpx shadow-lg border border-gray-200/80">
        <view class="flex items-center gap-16rpx mb-24rpx">
          <svg viewBox="0 0 18 18" fill="currentColor" class="w-32rpx h-32rpx text-primary">
            <path d="M9 0C4.029 0 0 4.029 0 9s4.029 9 9 9 9-4.029 9-9-4.029-9-9-9zm0 16.5c-4.136 0-7.5-3.364-7.5-7.5S4.864 1.5 9 1.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z"/>
          </svg>
          <text class="text-30rpx font-bold text-gray-800">专业介绍</text>
        </view>
        <text class="block text-26rpx text-gray-600 leading-relaxed">{{ doctor?.introduction }}</text>
      </view>

      <!-- 教育背景 -->
      <view class="bg-white m-24rpx rounded-24rpx p-32rpx shadow-lg border border-gray-200/80">
        <view class="flex items-center gap-16rpx mb-24rpx">
          <svg viewBox="0 0 18 18" fill="currentColor" class="w-32rpx h-32rpx text-primary">
            <path d="M9 0L0 4.5l2.25 1.125v4.875c0 1.657 2.686 3 6 3s6-1.343 6-3V5.625L16.5 4.5v6h1.5V4.5L9 0z"/>
          </svg>
          <text class="text-30rpx font-bold text-gray-800">教育背景</text>
        </view>
        <text class="block text-26rpx text-gray-600 leading-relaxed">{{ doctor?.education }}</text>
      </view>

      <!-- 资质证书 -->
      <view class="bg-white m-24rpx rounded-24rpx p-32rpx shadow-lg border border-gray-200/80">
        <view class="flex items-center gap-16rpx mb-24rpx">
          <svg viewBox="0 0 18 18" fill="currentColor" class="w-32rpx h-32rpx text-primary">
            <path d="M13.5 0h-9c-.825 0-1.5.675-1.5 1.5v15c0 .825.675 1.5 1.5 1.5h9c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zM9 3c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm3 10.5H6v-.75c0-1 2-1.5 3-1.5s3 .5 3 1.5v.75z"/>
          </svg>
          <text class="text-30rpx font-bold text-gray-800">资质证书</text>
        </view>
        <view class="flex flex-col gap-16rpx">
          <view v-for="(cert, index) in doctor?.certificates" :key="index" class="flex items-center gap-16rpx">
            <view class="w-12rpx h-12rpx rounded-full bg-primary flex-shrink-0" />
            <text class="text-26rpx text-gray-600">{{ cert }}</text>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="flex-shrink-0 z-100 bg-white px-24rpx py-20rpx shadow-lg border-t border-gray-200/80 flex items-center justify-between gap-24rpx">
      <view class="flex flex-col gap-4rpx">
        <text class="text-22rpx text-gray-400">问诊费</text>
        <text class="text-36rpx font-bold text-primary">¥ {{ doctor?.consultationFee }}</text>
      </view>
      <view>
      <button
        class="h-88rpx px-56rpx bg-gradient-to-br from-primary to-primary-dark text-white rounded-44rpx text-30rpx font-semibold border-none shadow-lg transition-all active:scale-95 active:shadow-md"
        aria-label="预约问诊"
        @tap="handleConsultation"
      >
        预约问诊
      </button>
      </view>
    </view>
  </view>
</template>
