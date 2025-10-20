<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'
import FgTabbar from '@/tabbar/index.vue'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const userStore = useUserStore()

const isCurrentPageTabbar = ref(true)
onShow(() => {
  // console.log('App.ku.vue onShow', currRoute())
  const { path } = currRoute()
  isCurrentPageTabbar.value = isPageTabbar(path)
  // console.log('isCurrentPageTabbar', isCurrentPageTabbar.value)
})
</script>

<template>
  <view class="page-container">
    <wd-fab :draggable="true">
      <wd-button type="primary" @click="userStore.toggleUserDefaultRole">
        切换角色
      </wd-button>
    </wd-fab>

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
  background-image: linear-gradient(to bottom, #f6e2d3, transparent 60%, transparent);
}
</style>
