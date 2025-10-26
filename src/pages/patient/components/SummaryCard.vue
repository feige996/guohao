<script lang="ts" setup>
// 患者数据统计

const dataList = [
  {
    icon: '/static/images/common/people.png',
    title: '患者数',
    value: 36,
  },
  {
    icon: '/static/images/common/doctor.png',
    title: '复诊数',
    value: 18,
  },
  {
    icon: '/static/images/common/clock.png',
    title: '预约数',
    value: 6,
  },
]
</script>

<template>
  <view class="linear-bg p-4">
    <view class="text-lg text-#8C2303 font-500">
      患者数据
    </view>
    <view class="grid grid-cols-3 mt-4 gap-2">
      <view v-for="item in dataList" :key="item.title" class="flex flex-col items-center justify-center gap-2">
        <image :src="item.icon" class="h-38px w-48px" />
        <text class="text-sm text-#333333 font-500">{{ item.title }}</text>
        <text class="text-lg text-#AFAFAF font-700">{{ item.value }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.linear-bg {
  background-image: linear-gradient(180deg, #fcf1e8 0%, #ffffff 100%);
  border-radius: 8px;
}
</style>
