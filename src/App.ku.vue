<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore, useUserStore } from '@/store'
import FgTabbar from '@/tabbar/index.vue'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const themeStore = useThemeStore()
const userStore = useUserStore()

const isCurrentPageTabbar = ref(true)
onShow(() => {
  // console.log('App.ku.vue onShow', currRoute())
  const { path } = currRoute()
  isCurrentPageTabbar.value = isPageTabbar(path)
  // console.log('isCurrentPageTabbar', isCurrentPageTabbar.value)
})

const helloKuRoot = ref('Hello AppKuVue')

const exposeRef = ref('this is form app.Ku.vue')

defineExpose({
  exposeRef,
})
</script>

<template>
  <wd-config-provider :theme-vars="themeStore.themeVars" :theme="themeStore.theme">
    <!-- 这个先隐藏了，知道这样用就行 -->
    <view class="hidden text-center">
      {{ helloKuRoot }}，这里可以配置全局的东西
    </view>
    <wd-fab :draggable="true">
      <wd-button type="primary" @click="userStore.toggleUserDefaultRole">
        切换角色
      </wd-button>
    </wd-fab>

    <KuRootView />

    <FgTabbar v-if="isCurrentPageTabbar" />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
