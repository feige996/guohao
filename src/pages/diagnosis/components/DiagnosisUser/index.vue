<script lang="ts" setup>
import type { App_DoctorAuditing, SysDictData } from '@/api/guohao-api/globals.d'
import { useRequest } from 'alova/client'
import SearchBar from '@/components/SearchBar/index.vue'
import DiagnosisCard from './components/DiagnosisCard.vue'
import DoctorListSection from './components/DoctorListSection.vue'
import ServiceCard from './components/ServiceCard.vue'

const diagnosisCardList = [{
  id: 'guide',
  title: '导诊顾问',
  icon: '/static/images/diagnosis/guide.png',
  subtitleList: ['中医专家', '在线咨询'],
  functions: ['与专家实时沟通', '服务严格质控'],
}, {
  id: 'consult',
  title: '在线问诊',
  icon: '/static/images/diagnosis/consult.png',
  subtitleList: ['不清楚挂什么科？', '问我！'],
  functions: ['专业指导', '快速问答'],
}]
function handleDiagnosisCardClick(item) {
  console.log('点击了诊断卡片:', item.id, item.title)
}
const serviceCardList = [{
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
function handleServiceCardClick(item) {
  console.log('点击了服务卡片:', item.id, item.title)
}
</script>

<template>
  <view class="px-3 pt-6">
    <!-- 搜索栏 -->
    <SearchBar placeholder="搜索疾病、症状、科室等" />

    <!-- 在线问诊 + 导诊顾问 卡片 -->
    <view class="w-full flex items-center pt-4">
      <DiagnosisCard
        v-for="item in diagnosisCardList"
        :key="item.id"
        @click="handleDiagnosisCardClick(item)"
      />
    </view>

    <!-- 智慧自诊 + 购药服务 卡片 -->
    <view class="w-full flex items-center pt-3">
      <ServiceCard
        v-for="item in serviceCardList"
        :key="item.id"
        @click="handleServiceCardClick(item)"
      />
    </view>

    <view class="my-4 text-base font-medium">
      待诊患者
    </view>

    <DoctorListSection />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
