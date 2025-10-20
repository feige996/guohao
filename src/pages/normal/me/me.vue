<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { currRoute } from '@/utils'
import { safeAreaInsets } from '@/utils/systemInfo'
import loveSrc from './assets/love.png'
import peopleSrc from './assets/people.png'
import ServiceCard from './components/ServiceCard/index.vue'
import VipCard from './components/VipCard/index.vue'

/**
 * 处理关注医生卡片点击事件
 */
function handleDoctorClick() {
  // 这里可以添加关注医生页面的跳转逻辑
  console.log('点击了关注医生卡片')
}

/**
 * 处理健康档案卡片点击事件
 */
function handleHealthRecordClick() {
  // 这里可以添加健康档案页面的跳转逻辑
  console.log('点击了健康档案卡片')
}

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
    id: 'consultation-record',
    title: '问诊记录',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226508/77bc/5dd6/9844/c4a72f29c70308915a12d88e1bf7f368.png',
    bgColor: 'bg-[#fff0f0]',
  },
  {
    id: 'order',
    title: '商品订单',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650223673/8c52/9644/88b4/95fa6e626f409bfcabe3ab2b20269ed2.png',
    bgColor: 'bg-[#f8f4e6]',
  },
  {
    id: 'health-record',
    title: '健康档案',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650224797/4274/2528/339b/600c29854c72cbe3017db993e255c8cd.png',
    bgColor: 'bg-[#f0f7f0]',
  },
  {
    id: 'address',
    title: '地址管理',
    icon: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650228089/e392/c333/b6d3/06fc2f16d63579eacfc1f05951fca735.png',
    bgColor: 'bg-[#f0f5ff]',
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
      <view>
        <view class="card-container flex items-center px-3">
          <view class="text-white font-medium text-[32rpx] leading-[48rpx]">
            健康VIP
          </view>
          <view class="text-white/50 font-medium text-[26rpx] leading-[32rpx]">
            开通VIP 享更高级权益
          </view>
          <view class="ml-auto rounded-[28rpx] from-[#fefbfb] to-[#f7f9ef] bg-gradient-to-b pb-[12rpx] pl-[24rpx] pr-[24rpx] pt-[12rpx] text-center text-highlight font-medium text-[24rpx] leading-[32rpx]">
            升级VIP
          </view>
        </view>

        <!-- VIP底部背景 -->
        <view class="relative left--3 box-border h-[180rpx] w-screen flex gap-2 rounded-[16rpx] from-[rgba(253,238,227,0.94)] to-[rgba(245,246,243,0.94)] bg-gradient-to-b p-3 backdrop-blur-[10rpx]">
          <!-- 左边卡片 - 使用VIPCard组件 -->
          <VipCard
            title="关注医生"
            description="已关注医生信息"
            icon-url="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226633/0ad9/94f5/516d/9dca6d56eb93b5495d8c57770ea9fc5a.png"
            @click="handleDoctorClick"
          />

          <!-- 右边卡片 - 使用VIPCard组件 -->
          <VipCard
            title="健康档案"
            description="已记录健康信息"
            icon-url="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227605/4538/58f9/66c2/4bca6a9bdd69e5a5b6d297cf379d4589.png"
            @click="handleHealthRecordClick"
          />
        </view>
      </view>
    </view>

    <!-- 我的服务卡片 -->
    <view class="mx-[24rpx] mt-[16rpx] flex flex-col items-start justify-center gap-[32rpx] rounded-[8rpx] bg-white pb-[32rpx] pl-[32rpx] pr-[32rpx] pt-[32rpx]">
      <span class="flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]"> 我的服务 </span>
      <view class="grid grid-cols-4 w-full gap-[16rpx]">
        <ServiceCard
          v-for="(service, index) in serviceItems"
          :key="index"
          :title="service.title"
          :icon-url="service.icon"
          @click="handleServiceClick(service.title)"
        />
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="mx-[24rpx] mt-[32rpx] overflow-hidden rounded-[16rpx] bg-white shadow-sm">
      <view
        v-for="item in menuItems"
        :key="item.id"
        class="flex items-center border-b border-[#f5f5f5] px-[32rpx] py-[32rpx] last:border-b-0"
        @click="handleMenuClick(item)"
      >
        <image :src="item.icon" class="h-[48rpx] w-[48rpx]" />
        <text class="ml-[24rpx] flex-1 text-[#333333] text-[28rpx]">{{ item.title }}</text>
        <image
          v-if="item.arrow"
          src="/static/images/homepage/settings-arrow.png"
          class="h-[24rpx] w-[24rpx]"
        />
      </view>
    </view>

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

<style>
.card-container {
  height: 60px;
  border-radius: 16px 16px 0 0;
  background-image: linear-gradient(to bottom, #97493d, #c7ac80);
}
</style>
