<script lang="ts" setup>
import { ref } from 'vue'

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '我的收益',
  },
})

// 模拟收入数据
const incomeData = ref({
  totalIncome: 13200.00,
  currentMonth: {
    month: '2025年5月',
    totalOrders: 40,
    totalIncome: 3200,
    textConsult: {
      count: 30,
      income: 2400
    },
    voiceConsult: {
      count: 10,
      income: 800
    }
  },
  monthlyData: [
    {
      month: '2025年4月',
      income: 2800
    },
    {
      month: '2025年3月',
      income: 2500
    },
    {
      month: '2025年2月',
      income: 2200
    },
    {
      month: '2025年1月',
      income: 2500
    }
  ]
})

// 处理查看历史月份详情
function handleViewMonthDetail(monthData: { month: string, income: number }) {
  console.log('查看月份详情:', monthData.month)
  // 这里可以添加查看月份详情的逻辑
  // 可以弹出详情页面或导航到专门的详情页
  uni.showToast({
    title: `查看${monthData.month}详情`,
    icon: 'none',
    duration: 2000
  })
}

// 格式化金额
function formatAmount(amount: number): string {
  return amount.toFixed(2)
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 返回栏 -->
    <view class="h-12 flex items-center justify-center border-b border-gray-200 bg-white">
      <view class="absolute left-4">
        <view class="text-base text-gray-700" style="padding: 8px 0;" @click="navigateBack">
          &lt;
        </view>
      </view>
      <text class="text-lg font-medium">我的收益</text>
    </view>

    <!-- 总收入卡片 -->
    <view class="mt-3 mx-4 rounded-lg bg-yellow-500 p-4 shadow-md">
      <text class="text-white text-sm">2025年总收入（税前）</text>
      <text class="mt-2 block text-3xl font-semibold text-white">¥{{ formatAmount(incomeData.totalIncome) }}</text>
    </view>

    <!-- 当前月份收入卡片 -->
    <view class="mt-3 bg-white px-4 py-4">
      <text class="text-base font-medium">{{ incomeData.currentMonth.month }}收入</text>
      
      <view class="mt-4">
        <view class="flex items-center justify-between pb-3 border-b border-gray-100">
          <text class="text-base">总订单: {{ incomeData.currentMonth.totalOrders }}</text>
          <text class="text-base font-medium">总收入: {{ incomeData.currentMonth.totalIncome }}</text>
        </view>
        
        <view class="mt-3 flex items-center justify-between pb-3 border-b border-gray-100">
          <text class="text-base">图文问诊: {{ incomeData.currentMonth.textConsult.count }}</text>
          <text class="text-base">收入: {{ incomeData.currentMonth.textConsult.income }}</text>
        </view>
        
        <view class="mt-3 flex items-center justify-between">
          <text class="text-base">语音问诊: {{ incomeData.currentMonth.voiceConsult.count }}</text>
          <text class="text-base">收入: {{ incomeData.currentMonth.voiceConsult.income }}</text>
        </view>
      </view>
    </view>

    <!-- 历史月份收入列表 -->
    <view class="mt-3 bg-white">
      <view
        v-for="(item, index) in incomeData.monthlyData"
        :key="index"
        class="flex items-center justify-between px-4 py-4 border-b border-gray-100 last:border-b-0"
        @click="handleViewMonthDetail(item)"
      >
        <text class="text-base">{{ item.month }}</text>
        <view class="flex items-center">
          <text class="mr-2 text-base text-blue-500">查看</text>
          <text class="text-gray-400">›</text>
        </view>
      </view>
    </view>

    <!-- 总收入汇总 -->
    <view class="mt-3 mb-20 bg-white px-4 py-4">
      <view class="flex items-center justify-between">
        <text class="text-base font-medium">总收入:</text>
        <text class="text-lg font-semibold text-green-500">¥{{ formatAmount(incomeData.totalIncome) }}</text>
      </view>
    </view>
  </view>
</template>