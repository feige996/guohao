<script lang="ts" setup>
import WaitingPatientItem from './WaitingPatientItem.vue'

// 待诊患者数据
const waitingPatients = [
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

function handleClickItem(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<template>
  <!-- 待诊患者组件 -->
  <view class="rounded-lg bg-white px-4 py-3">
    <view
      v-for="item in waitingPatients"
      :key="item.id"
    >
      <WaitingPatientItem :patient="item" />
    </view>
  </view>
</template>
