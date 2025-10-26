<script setup lang="ts">
const dataList = [
  {
    count: 36,
    label: '开方数',
    icon: '/static/images/home-doctor/icon-box.png',
  },
  {
    count: 18,
    label: '患者数',
    icon: '/static/images/home-doctor/icon-people.png',
  },
  {
    count: 6,
    label: '接诊数',
    icon: '/static/images/home-doctor/icon-clock.png',
  },
]
</script>

<template>
  <view class="mt-3">
    <view class="grid grid-cols-3 gap-2">
      <view v-for="item in dataList" :key="item.label" class="border-box relative h-15 flex flex-col justify-between overflow-hidden rounded-lg bg-white px-3 py-2">
        <view class="flex items-center gap-2">
          <text class="statistic-dot" />
          <text class="statistic-name">{{ item.label }}</text>
        </view>
        <view class="statistic-count">
          {{ item.count }}
        </view>
        <view class="absolute bottom--1 right--1">
          <image :src="item.icon" class="h-42px w-42px" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.statistic-dot {
  width: 14px;
  height: 14px;
  background: #eeeeee;
  border-radius: 50%;
}
.statistic-name {
  font-size: 12px;
  font-weight: 500;
  color: #333333;
}
.statistic-count {
  font-size: 16px;
  font-weight: 600;
  color: #484848;
}
</style>
