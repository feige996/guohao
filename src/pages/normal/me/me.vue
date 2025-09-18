<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { currRoute } from '@/utils'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '个人中心',
  },
})

const userStore = useUserStore()
// 使用storeToRefs解构userInfo
const { userInfo, displayName, userAvatar, isLoggedIn } = storeToRefs(userStore)

// 菜单项配置
const menuItems = [
  {
    id: 'profile',
    title: '个人资料',
    icon: '/static/images/me/profile-icon.png',
    arrow: true,
  },
  {
    id: 'health-record',
    title: '健康档案',
    icon: '/static/images/me/health-record-icon.png',
    arrow: true,
  },
  {
    id: 'consultation-history',
    title: '问诊记录',
    icon: '/static/images/me/consultation-icon.png',
    arrow: true,
  },
  {
    id: 'prescription',
    title: '我的处方',
    icon: '/static/images/me/prescription-icon.png',
    arrow: true,
  },
  {
    id: 'collection',
    title: '养生收藏',
    icon: '/static/images/me/collection-icon.png',
    arrow: true,
  },
  {
    id: 'settings',
    title: '设置',
    icon: '/static/images/me/settings-icon.png',
    arrow: true,
  },
]

// 服务项配置
const serviceItems = [
  {
    id: 'vip',
    title: '会员中心',
    subtitle: '享受专属权益',
    icon: '/static/images/me/vip-icon.png',
    bgColor: 'from-[#ffd700] to-[#ffb347]',
  },
  {
    id: 'customer-service',
    title: '在线客服',
    subtitle: '7×24小时服务',
    icon: '/static/images/me/service-icon.png',
    bgColor: 'from-[#87ceeb] to-[#4682b4]',
  },
]

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

// 菜单项点击处理
function handleMenuClick(item: any) {
  console.log('点击菜单项:', item)
  switch (item.id) {
    case 'profile':
      uni.navigateTo({ url: '/pages/profile/profile' })
      break
    case 'health-record':
      uni.navigateTo({ url: '/pages/health-record/health-record' })
      break
    case 'consultation-history':
      uni.navigateTo({ url: '/pages/consultation-history/consultation-history' })
      break
    case 'prescription':
      uni.navigateTo({ url: '/pages/prescription/prescription' })
      break
    case 'collection':
      uni.navigateTo({ url: '/pages/collection/collection' })
      break
    case 'settings':
      uni.navigateTo({ url: '/pages/settings/settings' })
      break
    default:
      uni.showToast({
        title: '功能开发中',
        icon: 'none',
      })
  }
}

// 服务项点击处理
function handleServiceClick(item: any) {
  console.log('点击服务项:', item)
  switch (item.id) {
    case 'vip':
      uni.navigateTo({ url: '/pages/vip/vip' })
      break
    case 'customer-service':
      uni.navigateTo({ url: '/pages/customer-service/customer-service' })
      break
    default:
      uni.showToast({
        title: '功能开发中',
        icon: 'none',
      })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 主容器 -->
    <div class="relative h-[1624rpx] w-[750rpx] flex flex-col items-start overflow-hidden bg-[#f5f7f4]">
      <!-- 头像区域 -->
      <div class="relative z-2 ml-[40rpx] mt-[200rpx] h-[120rpx] flex flex-row items-center justify-center gap-[20rpx]">
        <img
          class="h-[120rpx] w-[120rpx] flex-shrink-0 self-stretch"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650225780/d9c0/474b/3677/2829810b1541382316783a58674a9deb.png"
        >
        <div class="relative h-[96rpx] w-[192rpx] flex flex-shrink-0 flex-col items-start justify-center gap-[8rpx]">
          <span class="flex-shrink-0 whitespace-pre text-[36rpx] text-[#333333] font-medium leading-[52rpx]"> 张帅 </span>
          <span class="flex-shrink-0 whitespace-pre text-[26rpx] text-[#999999] font-normal leading-[36rpx]"> ID：335336322 </span>
        </div>
      </div>

      <!-- VIP卡片区域 -->
      <div class="relative z-1 ml-0 mr-0 mt-[24rpx] h-[276rpx] w-auto flex flex-col items-start self-stretch">
        <!-- VIP顶部 -->
        <div class="relative ml-[24rpx] mr-[24rpx] mt-0 h-[164rpx] w-auto flex flex-row items-start self-stretch rounded-[16rpx] from-[#97493d] to-[#c7ac80] bg-gradient-to-b">
          <span class="relative z-1 mb-[-8rpx] ml-[24rpx] mt-[32rpx] h-[48rpx] whitespace-pre text-[32rpx] text-white font-medium leading-[48rpx]"> 健康VIP </span>
          <span class="relative z-0 ml-[24rpx] mt-[32rpx] w-[258rpx] whitespace-pre text-[26rpx] text-white/50 font-medium leading-[32rpx]"> 开通VIP 享更高级权益 </span>
          <span class="relative z-2 ml-[122rpx] mt-[24rpx] w-[136rpx] flex flex-col items-start justify-center whitespace-pre rounded-[28rpx] from-[#fefbfb] to-[#f7f9ef] bg-gradient-to-b pb-[12rpx] pl-[24rpx] pr-[24rpx] pt-[12rpx] text-center text-[24rpx] text-black font-medium leading-[32rpx]"> 升级VIP </span>
        </div>

        <!-- VIP底部背景 -->
        <div class="absolute bottom-0 left-0 right-0 top-auto h-[180rpx] w-auto flex flex-row items-start rounded-[16rpx] from-[rgba(253,238,227,0.94)] to-[rgba(245,246,243,0.94)] bg-gradient-to-b backdrop-blur-[10rpx]">
          <!-- 左边卡片 -->
          <div class="relative z-1 mb-[16rpx] ml-[24rpx] mt-auto h-[140rpx] w-[344rpx] flex flex-row items-start rounded-[16rpx] from-[#fdf2ea] to-[#f7f6f7] bg-gradient-to-b shadow-[0rpx_0rpx_12rpx_0rpx_rgba(0,0,0,0.05)]">
            <img
              class="relative z-1 mb-[41rpx] ml-[27rpx] mt-[39rpx] h-auto w-[70rpx] self-stretch"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226633/0ad9/94f5/516d/9dca6d56eb93b5495d8c57770ea9fc5a.png"
            >
            <div class="relative z-0 ml-[19rpx] mt-[32rpx] w-[196rpx] flex flex-col items-start justify-center gap-[8rpx]">
              <span class="flex-shrink-0 whitespace-pre text-[28rpx] text-[#070707] font-medium leading-[32rpx]"> 关注医生 </span>
              <div class="relative h-[36rpx] w-[196rpx] flex flex-shrink-0 flex-row items-center justify-center gap-[30rpx] whitespace-pre text-[22rpx] text-[#999999] font-medium leading-[36rpx]">
                <span class="w-[156rpx] flex-shrink-0"> 已关注医生信息 </span>
                <img
                  class="mb-0 ml-0 mr-[-2rpx] mt-0 h-[20rpx] w-[12rpx] flex-shrink-0"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227621/e560/6106/f1c2/7218a547c5a5ac8fb8fbc2dcea1478d8.png"
                >
              </div>
            </div>
          </div>

          <!-- 右边卡片 -->
          <div class="absolute bottom-[16rpx] left-auto right-[24rpx] top-auto z-0 h-[140rpx] w-[344rpx] flex flex-row items-start rounded-[16rpx] from-[#fdf2ea] to-[#f7f6f7] bg-gradient-to-b shadow-[0rpx_0rpx_12rpx_0rpx_rgba(0,0,0,0.05)]">
            <img
              class="relative z-1 mb-auto ml-[30rpx] mt-auto h-[56rpx] w-[64rpx]"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227605/4538/58f9/66c2/4bca6a9bdd69e5a5b6d297cf379d4589.png"
            >
            <div class="relative z-0 ml-[22rpx] mt-[32rpx] w-[196rpx] flex flex-col items-start justify-center gap-[8rpx]">
              <span class="flex-shrink-0 whitespace-pre text-[28rpx] text-[#070707] font-medium leading-[32rpx]"> 健康档案 </span>
              <div class="relative h-[36rpx] w-[196rpx] flex flex-shrink-0 flex-row items-center justify-center gap-[10rpx] whitespace-pre text-[22rpx] text-[#999999] font-medium leading-[36rpx]">
                <span class="w-[176rpx] flex-shrink-0"> 已记录健康信息 </span>
                <img
                  class="mb-0 ml-0 mr-[-2rpx] mt-0 h-[20rpx] w-[12rpx] flex-shrink-0"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226585/82ce/f66d/4193/361511e332f42b7439c5d744b1d28fb2.png"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的服务卡片 -->
      <div class="relative z-0 ml-[24rpx] mt-[16rpx] h-[260rpx] w-[702rpx] flex flex-col items-start justify-center gap-[32rpx] rounded-[8rpx] bg-white pb-[32rpx] pl-[32rpx] pr-[32rpx] pt-[32rpx]">
        <span class="flex-shrink-0 whitespace-pre text-[32rpx] text-[#0e0e0e] font-medium leading-[40rpx]"> 我的服务 </span>
        <div class="relative h-[124rpx] w-[638rpx] flex flex-shrink-0 flex-row items-start justify-start gap-[86rpx]">
          <div class="relative h-[124rpx] w-[96rpx] flex flex-shrink-0 flex-col items-center justify-center gap-[16rpx] whitespace-pre text-center text-[24rpx] text-[#0e0e0e] font-medium leading-[28rpx]">
            <img
              class="relative h-[80rpx] w-[80rpx] flex-shrink-0"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226508/77bc/5dd6/9844/c4a72f29c70308915a12d88e1bf7f368.png"
            >
            <span class="w-[96rpx] flex-shrink-0"> 问诊记录 </span>
          </div>
          <div class="relative h-[124rpx] w-[96rpx] flex flex-shrink-0 flex-col items-center justify-center gap-[16rpx] whitespace-pre text-[24rpx] text-[#0e0e0e] font-medium leading-[28rpx]">
            <img
              class="relative h-[80rpx] w-[80rpx] flex-shrink-0"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650223673/8c52/9644/88b4/95fa6e626f409bfcabe3ab2b20269ed2.png"
            >
            <span class="flex-shrink-0"> 商品订单 </span>
          </div>
          <div class="relative h-[124rpx] w-[96rpx] flex flex-shrink-0 flex-col items-center justify-center gap-[16rpx] whitespace-pre text-[24rpx] text-[#0e0e0e] font-medium leading-[28rpx]">
            <img
              class="relative h-[80rpx] w-[80rpx] flex-shrink-0"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650228089/e392/c333/b6d3/06fc2f16d63579eacfc1f05951fca735.png"
            >
            <span class="w-[96rpx] flex-shrink-0"> 健康档案 </span>
          </div>
          <div class="relative h-[124rpx] w-[96rpx] flex flex-shrink-0 flex-col items-center justify-center gap-[16rpx] whitespace-pre text-[24rpx] text-[#0e0e0e] font-medium leading-[28rpx]">
            <img
              class="relative h-[80rpx] w-[80rpx] flex-shrink-0"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650224797/4274/2528/339b/600c29854c72cbe3017db993e255c8cd.png"
            >
            <span class="w-[96rpx] flex-shrink-0"> 地址管理 </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="mx-[24rpx] mt-[32rpx] overflow-hidden rounded-[16rpx] bg-white shadow-sm">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="flex items-center border-b border-[#f5f5f5] px-[32rpx] py-[32rpx] last:border-b-0"
        @click="handleMenuClick(item)"
      >
        <image :src="item.icon" class="h-[48rpx] w-[48rpx]" />
        <text class="ml-[24rpx] flex-1 text-[28rpx] text-[#333333]">{{ item.title }}</text>
        <image
          v-if="item.arrow"
          src="/static/images/homepage/settings-arrow.png"
          class="h-[24rpx] w-[24rpx]"
        />
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div v-if="isLoggedIn" class="mx-[24rpx] mb-[32rpx] mt-[32rpx]">
      <button
        class="h-[88rpx] w-full border border-[#ff4757] rounded-[16rpx] bg-white text-[28rpx] text-[#ff4757] font-medium"
        @click="logout"
      >
        退出登录
      </button>
    </div>

    <!-- 底部安全区域 -->
    <div class="h-[32rpx]" />
  </div>
</template>
