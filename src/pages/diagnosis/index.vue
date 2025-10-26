<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import DiagnosisDoctor from './components/DiagnosisDoctor/index.vue'
import DiagnosisUser from './components/DiagnosisUser/index.vue'

const userStore = useUserStore()

definePage({
  style: {
    navigationBarTitleText: '首页',
  },
})
</script>

<template>
  <view class="home">
    <DiagnosisDoctor v-if="userStore.isDoctor" />
    <DiagnosisUser v-else />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
