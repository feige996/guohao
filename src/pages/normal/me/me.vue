<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { currRoute } from '@/utils'
import { safeAreaInsets } from '@/utils/systemInfo'
import MenuCard from './components/MenuCard/index.vue'
import ServiceCard from './components/ServiceCard/index.vue'
import VipCard from './components/VipCard/index.vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人中心',
  },
})

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo, displayName, userAvatar, isLoggedIn } = storeToRefs(userStore)

// 登录功能
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
</script>

<template>
  <view class="px-3" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 主容器 -->
    <view class="pt-10">
      <!-- 头像区域 -->
      <view class="ml-5 flex flex-row items-center gap-2">
        <img
          class="h-15 w-15 flex-shrink-0 self-stretch"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650225780/d9c0/474b/3677/2829810b1541382316783a58674a9deb.png"
        >
        <view class="">
          <view class="text-[#333333] font-medium text-[36rpx] leading-[52rpx]">
            张帅
          </view>
          <view class="text-[#999999] font-normal text-[26rpx] leading-[36rpx]">
            ID：335336322
          </view>
        </view>
      </view>

      <!-- VIP卡片区域 -->
      <VipCard />
    </view>

    <!-- 我的服务卡片 -->
    <ServiceCard />

    <!-- 功能菜单 -->
    <MenuCard />

    <!-- 退出登录按钮 -->
    <view v-if="isLoggedIn" class="mx-[24rpx] mb-[32rpx] mt-[32rpx]">
      <button
        class="h-[88rpx] w-full border border-[#ff4757] rounded-[16rpx] bg-white text-[#ff4757] font-medium text-[28rpx]"
        @click="logout"
      >
        退出登录
      </button>
    </view>

    <!-- 底部安全区域 -->
    <view class="h-[32rpx]" />
  </view>
</template>
