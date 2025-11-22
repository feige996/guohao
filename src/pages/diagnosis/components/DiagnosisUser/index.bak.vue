<script lang="ts" setup>
import SearchBar from '@/components/SearchBar/index.vue'
import DiagnosisCard from './components/DiagnosisCard.vue'
import DoctorListSection from './components/DoctorListSection.vue'
import ServiceCard from './components/ServiceCard.vue'

// 定义数据接口，提升类型安全性和代码可读性
interface DiagnosisCardData {
  id: string
  title: string
  icon?: string
  subtitleList: string[]
  functions: string[]
}

interface ServiceCardData {
  id: string
  title: string
  icon?: string
  subtitleList: string[]
  buttonText: string
}

// 诊断卡片数据
const diagnosisCardList: DiagnosisCardData[] = [{
  id: 'guide',
  title: '在线问诊',
  icon: '/static/images/diagnosis/guide.png',
  subtitleList: ['中医专家', '在线咨询'],
  functions: ['与专家实时沟通', '服务严格质控'],
}, {
  id: 'consult',
  title: '导诊顾问',
  icon: '/static/images/diagnosis/consult.png',
  subtitleList: ['不清楚挂什么科？', '问我！'],
  functions: ['专业指导', '快速问答'],
}]

// 服务卡片数据
const serviceCardList: ServiceCardData[] = [{
  id: 'smartDiagnosis',
  title: '智慧自诊',
  icon: '/static/images/diagnosis/guide.png',
  subtitleList: ['快速自测', '获取初步建议'],
  buttonText: '开始自测',
}, {
  id: 'medicine',
  title: '购药服务',
  icon: '/static/images/diagnosis/medicine.png',
  subtitleList: ['在线开放', '便捷购药'],
  buttonText: '去选药',
}]

// 处理诊断卡片点击
function handleDiagnosisCardClick(data: DiagnosisCardData) {
  console.log('点击了诊断卡片:', data.id, data.title)
  // 在线问诊卡片点击跳转到在线问诊组件
  if (data.id === 'guide') {
    uni.navigateTo({
      url: '/pages-user-diagnosis/online-consultation/index',
    })
  }
  else if (data.id === 'consult') {
    console.log('跳转到导诊顾问页面')
    // 导诊顾问卡片点击跳转到导诊顾问页面
    uni.navigateTo({
      url: '/pages-user-diagnosis/consultation-guide/index',
    })
  }
}

// 处理服务卡片点击
function handleServiceCardClick(data: ServiceCardData) {
  console.log('点击了服务卡片:', data.id, data.title)
  // 智慧自诊卡片点击跳转到智慧自诊页面
  if (data.id === 'smartDiagnosis') {
    uni.navigateTo({
      url: '/pages-user-diagnosis/smart-self-diagnosis/index',
    })
  }
  // 购药服务卡片点击跳转到购药服务页面
  else if (data.id === 'medicine') {
    uni.navigateTo({
      url: '/pages-user-diagnosis/medication-purchase-service/index',
    })
  }
}
</script>

<template>
  <view class="">
    <!-- 搜索栏 -->
    <SearchBar placeholder="搜索疾病、症状、科室等" />

    <!-- 在线问诊 + 导诊顾问 卡片 -->
    <view class="w-full flex items-center pt-4">
      <!-- 优雅的父子组件传参: 使用 v-bind="item" 一次性传递所有属性 -->
      <DiagnosisCard
        v-for="item in diagnosisCardList"
        :key="item.id"
        v-bind="item"
        @click="handleDiagnosisCardClick(item)"
      />
    </view>

    <!-- 智慧自诊 + 购药服务 卡片 -->
    <view class="w-full flex items-center pt-3">
      <!-- 优雅的父子组件传参: 使用 v-bind="item" 一次性传递所有属性 -->
      <ServiceCard
        v-for="item in serviceCardList"
        :key="item.id"
        v-bind="item"
        @click="handleServiceCardClick(item)"
      />
    </view>

    <view class="my-4 text-base font-medium">
      推荐专家
    </view>

    <DoctorListSection />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
