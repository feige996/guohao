<script setup lang="ts">
import SearchBar from '@/components/SearchBar/index.vue'
import FunctionCard from './components/FunctionCard.vue'
import PatientSection from './components/PatientSection.vue'
import SummaryCard from './components/SummaryCard.vue'

// 定义响应式变量用于存储搜索输入框的值
const searchQuery = ref('')
</script>

<template>
  <view class="page-patient px-3 pt-4">
    <!-- 搜索组件 -->
    <SearchBar placeholder="搜索患者名称/疾病" @search="searchQuery = $event" />
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
