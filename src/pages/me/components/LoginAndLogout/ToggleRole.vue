<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()

function handleToggleRole() {
  userStore.toggleUserDefaultRole()
  // 还需要设置当前 tabbar 切换的对应的路由
  uni.switchTab({
    url: '/pages/me/index',
  })
}
</script>

<template>
  <view class="text-center">
    <view class="mx-auto mt-2 inline-flex items-center gap-3">
      <view>当前角色：{{ userStore.userDefaultRole }}</view>
      <wd-button type="primary" @click="handleToggleRole">
        切换角色
      </wd-button>
    </view>
  </view>
</template>
