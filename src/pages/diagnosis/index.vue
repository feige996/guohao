<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import DiagnosisDoctor from './components/DiagnosisDoctor/index.vue'
import DiagnosisUser from './components/DiagnosisUser/index.vue'

const userStore = useUserStore()

definePage({
  style: {
    navigationBarTitleText: '问诊',
  },
})
</script>

<template>
  <view class="page-diagnosis">
    <DiagnosisDoctor v-if="userStore.isDoctor" />
    <DiagnosisUser v-else />
  </view>
</template>

<style lang="scss" scoped>
//
</style>
