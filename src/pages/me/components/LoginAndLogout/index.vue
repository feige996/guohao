<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo, displayName, userAvatar, isLoggedIn } = storeToRefs(userStore)

// 退出登录
function logout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
      }
    },
  })
}

// 登录
function login() {
  console.log('登录')
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}
</script>

<template>
  <!-- 退出登录按钮 -->
  <view v-if="isLoggedIn" class="mx-[24rpx] mb-[32rpx] mt-[32rpx]">
    <wd-button
      block
      type="error"
      @click="logout"
    >
      退出登录
    </wd-button>
  </view>
  <view v-else class="mx-[24rpx] mb-[32rpx] mt-[32rpx]">
    <wd-button
      block
      type="primary"
      @click="login"
    >
      登录
    </wd-button>
  </view>
  <ToggleRole />
</template>

<style lang="scss" scoped>
//
</style>
