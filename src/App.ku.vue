<script setup lang="ts">
import { ref } from 'vue'
import FgTabbar from '@/tabbar/index.vue'
import { safeAreaInsets } from '@/utils/systemInfo'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const isCurrentPageTabbar = ref(true)
onShow(() => {
  // console.log('App.ku.vue onShow', currRoute())
  const { path } = currRoute()
  isCurrentPageTabbar.value = isPageTabbar(path)
  // console.log('isCurrentPageTabbar', isCurrentPageTabbar.value)
})
</script>

<template>
  <view class="page-container" :style="{ paddingTop: isCurrentPageTabbar ? `${safeAreaInsets.top}px` : '0px' }">
    <KuRootView />

    <FgTabbar v-if="isCurrentPageTabbar" />
    <wd-toast />
    <wd-message-box />
  </view>
</template>

<style scoped lang="scss">
.page-container {
  height: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #f6e2d3, #f5f7f4 30%, #f5f7f4);
}
</style>
