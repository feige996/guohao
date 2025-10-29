<script lang="ts" setup>
import FunctionCard from './components/FunctionCard.vue'
import SummaryCard from './components/SummaryCard.vue'
import WaitingPatients from './components/WaitingPatients.vue'
</script>

<template>
  <view class="">
    <!-- 问诊数据区域 -->
    <SummaryCard />

    <!-- 功能按钮区域 -->
    <view class="mt-4">
      <FunctionCard />
    </view>

    <view class="my-4 text-base font-medium">
      待诊患者
    </view>

    <!-- 待诊患者组件 -->
    <WaitingPatients />
  </view>
</template>
