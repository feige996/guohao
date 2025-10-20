<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('方剂购买')

// 搜索关键词
const searchKeyword = ref('')

// 已选方剂列表
const selectedPrescriptions = ref([
  { name: '四君子汤', count: 3, price: 30, unit: '元' },
  { name: '四物汤', count: 3, price: 38, unit: '元' },
])

// 计算总计信息
const totalCount = selectedPrescriptions.value.reduce((sum, item) => sum + item.count, 0)
const totalPrice = selectedPrescriptions.value.reduce((sum, item) => sum + item.price, 0)

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理搜索
function handleSearch() {
  if (searchKeyword.value.trim()) {
    uni.showToast({
      title: `搜索: ${searchKeyword.value}`,
      icon: 'none',
    })
  }
}

// 清空搜索框
function clearSearch() {
  searchKeyword.value = ''
}

// 保存草稿
function handleSaveDraft() {
  uni.showToast({
    title: '草稿已保存',
    icon: 'success',
  })
}

// 暂时先不开了
function handleCancelOrder() {
  uni.showModal({
    title: '确认取消',
    content: '确定要取消当前订单吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateBack()
      }
    },
  })
}

// 前往付款
function handlePayment() {
  uni.showToast({
    title: '跳转到支付页面',
    icon: 'none',
  })
}
</script>

<template>
  <view class="page min-h-screen bg-[#F5F5F5]">
    <!-- 导航栏 -->
    <view class="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <view class="flex items-center">
        <text class="text-[16px] font-medium" @click="handleBack">返回</text>
      </view>
      <view class="text-[18px] font-medium">
        {{ pageTitle }}
      </view>
      <view class="w-[60px]" />
    </view>

    <!-- 搜索框 -->
    <view class="bg-white px-4 py-3">
      <view class="flex items-center rounded-full bg-[#F5F5F5] px-4 py-2">
        <text class="mr-2 text-[#999]">🔍</text>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索病症、金方名称"
          placeholder-class="text-[#999]"
          class="flex-1 bg-transparent outline-none"
          @confirm="handleSearch"
        >
        <text v-if="searchKeyword" class="text-[#999]" @click="clearSearch">✕</text>
      </view>
    </view>

    <!-- 已选方剂区域 -->
    <view class="mt-2 bg-white">
      <!-- 标题 -->
      <view class="border-b border-[#EEEEEE] px-4 py-3">
        <text class="text-[16px] font-medium">已选金方</text>
        <view class="mt-1 h-[2px] w-[40px] bg-[#FF6B6B]" />
      </view>

      <!-- 方剂列表 -->
      <view class="divide-y divide-[#F0F0F0]">
        <view
          v-for="(item, index) in selectedPrescriptions"
          :key="index"
          class="flex items-center justify-between px-4 py-4"
        >
          <view class="flex-1">
            <text class="text-[16px]">{{ item.name }}</text>
          </view>
          <view class="flex items-center space-x-8">
            <text class="text-[14px] text-[#666]">{{ item.count }}服</text>
            <text class="text-[16px] font-medium">{{ item.price }}{{ item.unit }}</text>
          </view>
        </view>
      </view>

      <!-- 总计 -->
      <view class="flex items-center justify-end border-t border-[#EEEEEE] px-4 py-4">
        <text class="mr-4 text-[14px]">共计：</text>
        <text class="mr-4 text-[14px] text-[#666]">{{ totalCount }}服</text>
        <text class="text-[18px] text-[#FF6B6B] font-medium">{{ totalPrice }}元</text>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg">
      <view class="flex justify-center space-x-3">
        <button
          class="min-w-[100px] border border-[#999] rounded-[8px] py-3 px-4 text-[14px] text-[#666]"
          @click="handleSaveDraft"
        >
          保存草稿
        </button>
        <button
          class="min-w-[100px] border border-[#FF6B6B] rounded-[8px] py-3 px-4 text-[14px] text-[#FF6B6B]"
          @click="handleCancelOrder"
        >
          暂时先不开了
        </button>
        <button
          class="min-w-[100px] rounded-[8px] bg-[#4CAF50] py-3 px-4 text-[14px] text-white"
          @click="handlePayment"
        >
          前往付款
        </button>
      </view>
    </view>
  </view>
</template>
