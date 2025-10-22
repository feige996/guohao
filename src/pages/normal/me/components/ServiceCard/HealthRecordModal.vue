<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签页
const activeTab = ref('record')
// 编辑页面显示状态
const editVisible = ref(false)

// 模拟健康档案数据
const healthData = {
  name: '张帅',
  gender: '男',
  age: 32,
  createTime: '2024年1月12日',
  contactPhone: '13888888888',
  lastVisitTime: '2025年8月6日',
  // 健康信息
  healthInfo: {
    bloodType: 'A型',
    allergy: '青霉素',
    height: '175cm',
    weight: '70kg',
  },
  // 健康摘要
  healthSummary: {
    diagnosis: ['2型糖尿病', '高血压'],
    firstVisit: '2025年6月30日（图文问诊）',
    medication: '降糖药',
    tcmDiagnosis: '消渴病',
  },
  // 健康发现
  healthDiscovery: {
    onsetTime: '发现血糖升高1年，伴口干、乏力半年',
    medicalHistory: '详细描述疾病发生、发展及诊疗过程',
    diagnosis: '气虚证、阴虚质',
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
  <view class="page w-full h-full bg-white">
      <!-- 头部导航栏 -->
      <view class="px-4 pt-6 pb-4 flex items-center">
        <view class="mr-4" @click="handleBack">
          <text class="text-lg">←</text>
        </view>
        <view class="flex-1 text-center text-xl font-semibold">
          健康档案
        </view>
        <view class="w-6"></view>
      </view>

      <!-- 用户基本信息 -->
      <view class="mb-6 flex items-center">
        <view class="mr-4 h-16 w-16 flex items-center justify-center rounded-full bg-gray-200">
          <text class="text-xl text-gray-500 font-bold">张</text>
        </view>
        <view>
          <view class="font-medium">
            {{ healthData.name }}
          </view>
          <view class="text-sm text-gray-500">
            男 | {{ healthData.age }}岁
          </view>
          <view class="text-sm text-gray-500">
            创建时间：{{ healthData.createTime }}
          </view>
        </view>
      </view>

      <!-- 标签页切换 -->
      <view class="mb-4 flex border-b">
        <view
          class="flex-1 py-3 text-center font-medium"
          :class="{ 'text-blue-500 border-b-2 border-blue-500': activeTab === 'record' }"
          @click="switchTab('record')"
        >
          健康档案
        </view>
        <view
          class="flex-1 py-3 text-center font-medium"
          :class="{ 'text-blue-500 border-b-2 border-blue-500': activeTab === 'consult' }"
          @click="switchTab('consult')"
        >
          问诊记录
        </view>
      </view>

      <!-- 标签页内容 -->
      <view v-if="activeTab === 'record'" class="space-y-6">
        <!-- 基础信息 -->
        <view>
          <view class="mb-2 font-medium">
            基础信息
          </view>
          <view class="text-sm space-y-2">
            <view class="flex justify-between">
              <span class="text-gray-500">性别：</span><span>{{ healthData.gender }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">血型：</span><span>{{ healthData.healthInfo.bloodType }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">身高：</span><span>{{ healthData.healthInfo.height }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">体重：</span><span>{{ healthData.healthInfo.weight }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">联系方式：</span><span>{{ healthData.contactPhone }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">就诊时间：</span><span>{{ healthData.lastVisitTime }}</span>
            </view>
          </view>
        </view>

        <!-- 健康摘要 -->
        <view>
          <view class="mb-2 font-medium">
            健康摘要
          </view>
          <view class="text-sm space-y-2">
            <view class="flex justify-between">
              <span class="text-gray-500">慢病史：</span><span>{{ healthData.healthSummary.diagnosis.join('、') }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">初次记录：</span><span>{{ healthData.healthSummary.firstVisit }}</span>
            </view>
            <view class="flex justify-between">
              <span class="text-gray-500">服用药物：</span><span>{{ healthData.healthSummary.medication }}</span>
            </view>
          </view>
        </view>

        <!-- 健康发现 -->
        <view>
          <view class="mb-2 font-medium">
            健康发现
          </view>
          <view class="text-sm space-y-2">
            <view><span class="text-gray-500">主诉：</span>{{ healthData.healthDiscovery.onsetTime }}</view>
            <view><span class="text-gray-500">现病史：</span>{{ healthData.healthDiscovery.medicalHistory }}</view>
            <view><span class="text-gray-500">中医体质辨识：</span>{{ healthData.healthDiscovery.diagnosis }}</view>
          </view>
        </view>
      </view>

      <!-- 问诊记录内容 -->
      <view v-if="activeTab === 'consult'" class="py-8 text-center text-gray-500">
        暂无问诊记录
      </view>

      <!-- 底部按钮 -->
      <view class="mt-6 flex justify-between">
        <button class="px-6 rounded-lg bg-gray-100 py-3 text-sm text-gray-800" @click="handleEdit">
          手动编辑
        </button>
        <button class="px-6 rounded-lg bg-blue-500 py-3 text-sm text-white" @click="handleShare">
          分享给医师
        </button>
      </view>

    </view>
</template>

<style scoped>
.page {
  padding-bottom: 10px;
}
</style>
