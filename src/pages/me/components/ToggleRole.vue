<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>

<template>
  <view>
    <view>当前角色：{{ userStore.userDefaultRole }}</view>
    <wd-button type="primary" @click="userStore.toggleUserDefaultRole">
      切换角色
    </wd-button>
  </view>
</template>
