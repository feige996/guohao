<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'
import ConstitutionCard from './components/ConstitutionCard.vue'
import DateCard from './components/DateCard.vue'
import ExclusiveBenefitsSection from './components/ExclusiveBenefitsSection.vue'
</script>

<template>
  <view class="px-3 pb-6" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索区域 -->
    <SearchBar placeholder="搜索疾病、症状、科室等" />

    <!-- 专业咨询卡片 -->
    <ConsultationSection />

    <!-- 日期和体质区域 -->
    <view class="mt-3 flex gap-3 rounded-lg bg-white p-4">
      <DateCard />
      <ConstitutionCard />
    </view>

    <!-- 专属权益区域 -->
    <ExclusiveBenefitsSection class="mt-[14px]" />
  </view>
</template>
