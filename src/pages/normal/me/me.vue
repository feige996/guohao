<script lang="ts" setup>
// import type { IUploadSuccessInfo } from '@/api/types/login'
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { currRoute } from '@/utils'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '普通用户我的',
  },
})

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo } = storeToRefs(userStore)

// 从 about.vue 迁移的功能
function gotoLogin() {
  if (userStore.isLoggedIn) {
    uni.showToast({
      title: '已登录，不能去登录页',
      icon: 'none',
    })
    return
  }
  const { path } = currRoute()
  uni.navigateTo({
    url: `${LOGIN_PAGE}?redirect=${encodeURIComponent(path)}`,
  })
}

function logout() {
  // 清空用户信息
  userStore.logout()
  // 执行退出登录逻辑
  uni.showToast({
    title: '退出登录成功',
    icon: 'success',
  })
}
</script>

<template>
  <view class="profile-container">
    <view class="mt-20 px-3">
      <view class="m-auto w-160px text-center">
        <button v-if="userStore.isLoggedIn" type="warn" class="w-full" @click="logout">
          退出登录
        </button>
        <button v-else type="primary" class="w-full" @click="gotoLogin">
          登录
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
