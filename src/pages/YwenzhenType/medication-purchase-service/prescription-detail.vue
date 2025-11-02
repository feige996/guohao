<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('养生方药')

// 搜索关键词
const searchKeyword = ref('')

// 购买数量
const purchaseCount = ref(3)

// 方剂详情数据
const prescriptionDetail = ref({
  name: '四君子汤',
  efficacy: '脾胃气虚证。面色萎黄，语声低微，气短乏力，食少便溏，舌淡苔白，脉虚弱。',
  ingredients: '人参去芦，白术、茯苓去皮（各9g），甘草炙（6g）。',
  preparation: '上为细末。每服两钱，水一盏，煎至七分，通口服，不拘时候；入盐少许，白汤点亦得。',
  price: '10元/服'
})

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理搜索
function handleSearch() {
  uni.showToast({
    title: `搜索: ${searchKeyword.value}`,
    icon: 'none'
  })
}

// 处理数量增减
function handleCountChange(type: 'increase' | 'decrease') {
  if (type === 'increase') {
    purchaseCount.value++
  } else if (type === 'decrease' && purchaseCount.value > 1) {
    purchaseCount.value--
  }
}

// 处理放入购物车
function handleAddToCart() {
  // 导航到方剂购买页面
  uni.navigateTo({
    url: '/pages/normal/medication-purchase-service/prescription-order'
  })
}

// 页面加载时获取参数
onLoad((options: any) => {
  const id = options.id
  const name = options.name
  // 这里可以根据id请求真实的方剂数据
  console.log('加载方剂详情:', id, name)
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#e5e5e5]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 搜索框 -->
    <div class="p-[12px] bg-white">
      <div class="flex items-center rounded-[8px] bg-[#f5f5f5] px-[12px]">
        <uni-icons type="search" size="20" color="#999999" />
        <input 
          type="text" 
          v-model="searchKeyword"
          placeholder="搜索病症、金方名称"
          class="ml-[8px] flex-1 bg-transparent py-[8px] text-[14px] text-[#333333] outline-none"
        />
        <div v-if="searchKeyword" class="text-[#999999]" @click="searchKeyword = ''">
          <uni-icons type="clear" size="16" />
        </div>
      </div>
    </div>

    <!-- 方剂详情内容 -->
    <div class="mt-[12px] bg-white p-[16px]">
      <!-- 方剂名称 -->
      <h2 class="text-[18px] font-medium text-[#333333] mb-[20px]">{{ prescriptionDetail.name }}</h2>
      
      <!-- 功效 -->
      <div class="mb-[16px]">
        <h3 class="text-[15px] font-medium text-[#333333] mb-[8px]">功效：</h3>
        <p class="text-[14px] text-[#666666] leading-[22px]">{{ prescriptionDetail.efficacy }}</p>
      </div>
      
      <!-- 药方 -->
      <div class="mb-[16px]">
        <h3 class="text-[15px] font-medium text-[#333333] mb-[8px]">药方：</h3>
        <p class="text-[14px] text-[#666666] leading-[22px]">{{ prescriptionDetail.ingredients }}</p>
      </div>
      
      <!-- 煎制 -->
      <div class="mb-[16px]">
        <h3 class="text-[15px] font-medium text-[#333333] mb-[8px]">煎制：</h3>
        <p class="text-[14px] text-[#666666] leading-[22px]">{{ prescriptionDetail.preparation }}</p>
      </div>
      
      <!-- 方剂价格 -->
      <div class="mb-[20px]">
        <h3 class="text-[15px] font-medium text-[#333333] mb-[8px]">方剂价格：</h3>
        <p class="text-[14px] text-[#ff4d4f] font-medium">{{ prescriptionDetail.price }}</p>
      </div>
    </div>

    <!-- 购买数量 -->
    <div class="mt-[12px] bg-white p-[16px]">
      <div class="flex items-center justify-between">
        <h3 class="text-[15px] font-medium text-[#333333]">购买数量：</h3>
        <div class="flex items-center">
          <button 
            class="w-[32px] h-[32px] border border-[#e5e5e5] rounded-l-md flex items-center justify-center"
            @click="handleCountChange('decrease')"
            :disabled="purchaseCount <= 1"
          >
            <uni-icons type="minus" size="16" :color="purchaseCount <= 1 ? '#cccccc' : '#333333'" />
          </button>
          <input 
            type="number" 
            v-model="purchaseCount"
            class="w-[60px] h-[32px] border-t border-b border-[#e5e5e5] text-center text-[14px] text-[#333333] outline-none"
          />
          <button 
            class="w-[32px] h-[32px] border border-[#e5e5e5] rounded-r-md flex items-center justify-center"
            @click="handleCountChange('increase')"
          >
            <uni-icons type="plus" size="16" color="#333333" />
          </button>
          <span class="ml-[8px] text-[14px] text-[#999999]">服</span>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 p-[16px] bg-white border-t border-[#e5e5e5]">
      <button 
        class="w-full py-[12px] bg-[#ffd791] rounded-[8px] text-[16px] font-medium text-[#a05000]"
        @click="handleAddToCart"
      >
        放入购物车
      </button>
    </div>
  </div>
</template>