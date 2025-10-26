<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import MeDoctor from './components/MeDoctor/index.vue'
import MeUser from './components/MeUser/index.vue'

const userStore = useUserStore()

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})
</script>

<template>
  <view class="page-me">
    <MeDoctor v-if="userStore.isDoctor" />
    <MeUser v-else />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
