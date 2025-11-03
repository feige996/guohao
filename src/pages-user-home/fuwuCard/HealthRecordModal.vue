<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签页
const activeTab = ref('record')
// 编辑页面显示状态
const editVisible = ref(false)

// 模拟健康档案数据 - 根据设计图更新数据
const healthData = {
  name: '张帅',
  gender: '男',
  age: 32,
  createTime: '2024年12月12日',
  contactPhone: '13888888888',
  firstVisitTime: '2025年1月6日',
  // 健康信息
  healthInfo: {
    height: '175cm',
    weight: '70kg',
  },
  // 健康摘要
  healthSummary: {
    diagnosis: ['2型糖尿病'],
    tcmDiagnosis: '消渴病',
    firstVisit: '2025年6月30日（图文问诊）',
    medication: '降糖汤',
  },
  // 健康发现
  healthDiscovery: {
    onsetTime: '发现血糖升高1年，伴口干、乏力半年。',
    medicalHistory: '详细描述疾病发生、发展、及诊疗过程',
    diagnosis: '气虚质、阴虚质',
  },
}

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 切换标签页
function switchTab(tab: string) {
  activeTab.value = tab
}

// 跳转到问诊记录页面
function switchToConsultation() {
  uni.navigateTo({ url: '/pages-user-home/fuwuCard/ConsultationRecord' })
}

// 处理编辑
function handleEdit() {
  editVisible.value = true
}

// 处理分享
function handleShare() {
  uni.showToast({
    title: '分享给医师',
    icon: 'none',
  })
}
</script>

<template>
  <view class="min-h-screen w-full bg-gray-50">
    <!-- 头部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between px-4 py-6 bg-white shadow-sm">
      <view class="w-8 h-8 flex items-center justify-center rounded-full" @click="handleBack">
        <text class="text-lg font-medium">←</text>
      </view>
      <view class="flex-1 text-center text-lg font-semibold text-gray-900">
        健康档案
      </view>
      <view class="w-8" />
    </view>

    <!-- 用户基本信息卡片 -->
    <view class="mx-4 mt-4 mb-6 flex items-center rounded-lg bg-white p-4 shadow-sm">
      <view class="mr-4 h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
        <text class="text-2xl text-blue-600 font-bold">张</text>
      </view>
      <view class="flex-1">
        <view class="mb-1 flex items-center gap-2">
          <text class="text-base font-semibold text-gray-900">{{ healthData.name }}</text>
          <text class="text-sm text-gray-600">{{ healthData.gender }}</text>
          <text class="text-sm text-gray-600">{{ healthData.age }}岁</text>
        </view>
        <view class="text-xs text-gray-500">建档时间：{{ healthData.createTime }}</view>
        <view class="text-xs text-gray-500">初诊时间：{{ healthData.firstVisitTime }}</view>
      </view>
    </view>

    <!-- 标签页切换 -->
    <view class="mx-4 mb-4 flex rounded-t-lg bg-white">
      <view
        class="flex-1 py-3 text-center text-base font-medium transition-all"
        :class="activeTab === 'record' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'"
        @click="switchTab('record')"
      >
        健康档案
      </view>
      <view
        class="flex-1 py-3 text-center text-base font-medium transition-all"
        :class="activeTab === 'consult' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'"
        @click="switchToConsultation"
      >
        问诊记录
      </view>
    </view>

    <!-- 标签页内容 -->
    <view v-if="activeTab === 'record'" class="mx-4 rounded-b-lg bg-white px-4 py-5">
      <!-- 基础信息 -->
      <view class="mb-6">
        <view class="mb-3 text-base font-medium text-red-600">基础信息</view>
        <view class="space-y-3 border-l-2 border-gray-100 pl-3">
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">姓名：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.name }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">性别：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.gender }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">年龄：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.age }}岁</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">身高：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthInfo.height }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">体重：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthInfo.weight }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">联系方式：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.contactPhone }}（仅平台联系）</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">初诊时间：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.firstVisitTime }}</view>
          </view>
        </view>
      </view>

      <!-- 健康摘要 -->
      <view class="mb-6">
        <view class="mb-3 text-base font-medium text-red-600">健康摘要</view>
        <view class="space-y-3 border-l-2 border-gray-100 pl-3">
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">慢病史：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthSummary.diagnosis.join('、') }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">中医诊断：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthSummary.tcmDiagnosis }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">初次记录：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthSummary.firstVisit }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">服用方药：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthSummary.medication }}</view>
          </view>
        </view>
      </view>

      <!-- 健康发现 -->
      <view class="mb-6">
        <view class="mb-3 text-base font-medium text-red-600">健康分析</view>
        <view class="space-y-3 border-l-2 border-gray-100 pl-3">
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">主诉：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthDiscovery.onsetTime }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">现病史：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthDiscovery.medicalHistory }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">既往史/过敏史：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthDiscovery.medicalHistory }}</view>
          </view>
          <view class="flex items-start gap-4">
            <view class="w-16 text-sm text-gray-500">中医体质辨识：</view>
            <view class="flex-1 text-sm text-gray-800">{{ healthData.healthDiscovery.diagnosis }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 问诊记录内容 -->
    <view v-if="activeTab === 'consult'" class="mx-4 min-h-[300px] rounded-b-lg bg-white py-12 text-center text-gray-400">
      暂无问诊记录
    </view>

    <!-- 底部按钮 -->
    <view class="mt-6 flex justify-center gap-4 px-4 pb-8">
      <button class="w-28 rounded-full bg-gray-100 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-200" @click="handleEdit">
        手动编辑
      </button>
      <button class="w-28 rounded-full bg-blue-500 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600" @click="handleShare">
        分享给医师
      </button>
    </view>
  </view>
</template>
