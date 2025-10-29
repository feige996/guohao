<script lang="ts" setup>
import WaitingPatientItem from './PatientItem.vue'

const tabs = [{
  name: '新增患者',
}, {
  name: '患者反馈',
}]
const activeTabIndex = ref(0)

// 待诊患者数据
const patientList = [
  {
    id: 1,
    name: '王军',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 2,
    name: '刘艳',
    gender: '女',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 3,
    name: '陈泰来',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
]
</script>

<template>
  <view class="rounded-lg bg-[#FFFFFF] p-3">
    <view class="mb-2 flex border-b border-[#E5E5E5] border-b-solid">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.name"
      >
        <view
          class="text-base text-[#9FA9B5] font-500"
          :class="{ '!text-[#333333]': activeTabIndex === index }"
          @click="activeTabIndex = index"
        >
          {{ tab.name }}
        </view>
        <view
          v-if=" index > 0"
          class="absolute bottom-0 left-1/2 h-[2px] w-[24px] transform bg-[#97493D] -translate-x-1/2"
        />
      </view>
    </view>

    <view
      v-for="item in patientList"
      :key="item.id"
      class="border-b border-[#F5F5F5] border-b-solid py-4 last:border-b-0 first:pt-0"
    >
      <WaitingPatientItem :patient="item" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
