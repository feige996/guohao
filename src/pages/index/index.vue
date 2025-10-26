<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import HomeDoctor from './components/HomeDoctor/index.vue'
import HomeUser from './components/HomeUser/index.vue'

const userStore = useUserStore()

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
})
</script>

<template>
  <view class="page-home">
    <HomeDoctor v-if="userStore.isDoctor" />
    <HomeUser v-else />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
