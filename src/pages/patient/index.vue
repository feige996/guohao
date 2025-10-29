<script setup lang="ts">
import SearchBar from '@/components/SearchBar/index.vue'
import FunctionCard from './components/FunctionCard.vue'
import PatientSection from './components/PatientSection.vue'
import SummaryCard from './components/SummaryCard.vue'
</script>

<template>
  <view class="page-patient px-3 pt-6">
    <!-- 搜索组件 -->
    <SearchBar />
    <!-- 患者数据统计 -->
    <SummaryCard class="mt-3" />

    <!-- 功能卡片 -->
    <FunctionCard class="mt-3" />

    <!-- 新增患者和患者反馈区域 -->
    <PatientSection class="mt-3" />

    <!-- 底部空间 -->
    <view class="h-20" />
  </view>
</template>
