<script lang="ts" setup>
// 患者数据统计

const dataList = [
  {
    bg: '/static/images/patient/card-bg.png',
    title: '我的患者',
    value: 366,
    desc() {
      return `已接诊${this.value}名患者`
    },
    jumpPath: '/pages/patient/patients/index',
    color: '#FFFFFF',
  },
  {
    bg: '/static/images/patient/card-bg2.png',
    title: '患者评价',
    value: 488,
    desc() {
      return `接收${this.value}条评价`
    },
    jumpPath: '/pages/patient/evaluations/index',
    color: '#C76C48',
  },
]

function handleCardClick(jumpPath: string) {
  uni.navigateTo({
    url: jumpPath,
  })
}
</script>

<template>
  <view class="rounded-lg bg-white p-10px">
    <view class="grid grid-cols-2 gap-3">
      <view
        v-for="item in dataList"
        :key="item.title"
        class="item-bg relative h-92px overflow-hidden rounded-lg"
        :style="{ backgroundImage: `url(${item.bg})` }"
        @click="handleCardClick(item.jumpPath)"
      >
        <image src="/static/images/common/new.png" class="absolute left-0 top-0 h-16px w-47px" />
        <view class="mt-6 px-3" :style="{ color: item.color }">
          <view class="flex items-center text-lg font-bold">
            <text>{{ item.title }}</text>
            <wd-icon name="arrow-right" size="22px" />
          </view>
          <view class="mt-1 text-sm font-500">
            {{ item.desc() }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.item-bg {
  background-size: cover;
}
</style>
