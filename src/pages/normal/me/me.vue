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
    <div class="div">
      <div class="div_1">
        <img
          class="path"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650225780/d9c0/474b/3677/2829810b1541382316783a58674a9deb.png"
        >
        <div class="seal_group">
          <span class="text"> 张帅 </span><span class="text_1"> ID：335336322 </span>
        </div>
      </div>
      <div class="vip">
        <div class="vip_1">
          <span class="text_2"> 健康VIP </span><span class="text_3"> 开通VIP 享更高级权益 </span><span class="text_4"> 升级VIP </span>
        </div>
        <div class="div_2">
          <div class="div_3">
            <img
              class="div_4"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226633/0ad9/94f5/516d/9dca6d56eb93b5495d8c57770ea9fc5a.png"
            >
            <div class="frame_14">
              <span class="text_5"> 关注医生 </span>
              <div class="seal_group_1">
                <span class="text_6"> 已关注医生信息 </span><img
                  class="path_1"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227621/e560/6106/f1c2/7218a547c5a5ac8fb8fbc2dcea1478d8.png"
                >
              </div>
            </div>
          </div>
          <div class="div_5">
            <img
              class="frame_15"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227605/4538/58f9/66c2/4bca6a9bdd69e5a5b6d297cf379d4589.png"
            >
            <div class="frame_16">
              <span class="text_7"> 健康档案 </span>
              <div class="seal_group_2">
                <span class="text_8"> 已记录健康信息 </span><img
                  class="path_2"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226585/82ce/f66d/4193/361511e332f42b7439c5d744b1d28fb2.png"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="div_6">
        <span class="text_9"> 我的服务 </span>
        <div class="group">
          <div class="div_1_1">
            <img
              class="icon1"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226508/77bc/5dd6/9844/c4a72f29c70308915a12d88e1bf7f368.png"
            ><span class="text_10"> 问诊记录 </span>
          </div>
          <div class="div_2_1">
            <img
              class="icon2"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650223673/8c52/9644/88b4/95fa6e626f409bfcabe3ab2b20269ed2.png"
            ><span class="text_11"> 商品订单 </span>
          </div>
          <div class="div_3_1">
            <img
              class="icon3"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650228089/e392/c333/b6d3/06fc2f16d63579eacfc1f05951fca735.png"
            ><span class="text_12"> 健康档案 </span>
          </div>
          <div class="div_4_1">
            <img
              class="icon4"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650224797/4274/2528/339b/600c29854c72cbe3017db993e255c8cd.png"
            ><span class="text_13"> 地址管理 </span>
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

<style>
 * {
  box-sizing: border-box;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.justify-start {
  display: flex;
  justify-content: flex-start;
}
.justify-center {
  display: flex;
  justify-content: center;
}
.justify-end {
  display: flex;
  justify-content: flex-end;
}
.justify-between {
  display: flex;
  justify-content: space-between;
}
.items-start {
  display: flex;
  align-items: flex-start;
}
.items-end {
  display: flex;
  align-items: flex-end;
}
.items-center {
  display: flex;
  align-items: center;
}
.no-shrink {
  flex-shrink: 0;
}
</style>

<style scoped>
/* 我的 */
.div {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  overflow: hidden;
  background-color: #f5f7f4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  isolation: isolate;
}

/* 头像 */
.div_1 {
  height: 120rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  position: relative;
  z-index: 2;
  margin-top: 200rpx;
  margin-left: 40rpx;
}

/* 路径 */
.path {
  width: 120rpx;
  flex-shrink: 0;
  align-self: stretch;
  height: 120rpx;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* Seal Group */
.seal_group {
  width: 192rpx;
  height: 96rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8rpx;
  flex-shrink: 0;
  position: relative;
}

/* 张帅 */
.text {
  flex-shrink: 0;
  font-size: 36rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 52rpx;
  color: #333333;
  white-space: pre;
}

/* ID：335336322 */
.text_1 {
  flex-shrink: 0;
  font-size: 26rpx;
  font-family: 'PingFang SC';
  font-weight: normal;
  line-height: 36rpx;
  color: #999999;
  white-space: pre;
}

/* 顶部VIP卡片 */
.vip {
  position: relative;
  width: auto;
  height: 276rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  margin-top: 24rpx;
  margin-left: 0;
  margin-right: 0;
  align-self: stretch;
}

/* 升级VIP */
.vip_1 {
  position: relative;
  width: auto;
  height: 164rpx;
  border-radius: 16rpx;
  background: linear-gradient(180deg, #97493d 0%, #c7ac80 193.47%);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  isolation: isolate;
  margin-top: 0;
  margin-left: 24rpx;
  margin-right: 24rpx;
  align-self: stretch;
}

/* 健康VIP */
.text_2 {
  font-size: 32rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 48rpx;
  color: #ffffff;
  white-space: pre;
  height: 48rpx;
  margin-top: 32rpx;
  margin-bottom: -8rpx;
  z-index: 1;
  position: relative;
  margin-left: 24rpx;
}

/* 开通VIP 享更高级权益 */
.text_3 {
  width: 258rpx;
  font-size: 26rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 32rpx;
  color: rgba(255, 255, 255, 0.5);
  white-space: pre;
  z-index: 0;
  position: relative;
  margin-left: 24rpx;
  margin-top: 32rpx;
}

/* 升级按钮 */
.text_4 {
  width: 136rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 12rpx;
  padding-right: 24rpx;
  padding-bottom: 12rpx;
  padding-left: 24rpx;
  border-radius: 28rpx;
  background: linear-gradient(180deg, #fefbfb 0%, #f7f9ef 100%);
  text-align: center;
  font-size: 24rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 32rpx;
  color: #000000;
  white-space: pre;
  z-index: 2;
  position: relative;
  margin-left: 122rpx;
  margin-top: 24rpx;
}

/* 下部背景 */
.div_2 {
  position: absolute;
  width: auto;
  height: 180rpx;
  top: auto;
  left: 0;
  border-radius: 16rpx;
  background: linear-gradient(180deg, rgba(253, 238, 227, 0.94) 85.24%, rgba(245, 246, 243, 0.94) 100%);
  backdrop-filter: blur(10rpx);
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  isolation: isolate;
}

/* 左边卡片 */
.div_3 {
  width: 344rpx;
  height: 140rpx;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  z-index: 1;
  margin-left: 24rpx;
  margin-top: auto;
  margin-bottom: 16rpx;
  border-radius: 16rpx;
  background: linear-gradient(180deg, #fdf2ea 0%, #f7f6f7 100%);
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);
  isolation: isolate;
}

/* 图标 */
.div_4 {
  width: 70rpx;
  height: auto;
  position: relative;
  z-index: 1;
  margin-left: 27rpx;
  margin-top: 39rpx;
  margin-bottom: 41rpx;
  align-self: stretch;
}

/* 容器 14 */
.frame_14 {
  width: 196rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8rpx;
  position: relative;
  z-index: 0;
  margin-left: 19rpx;
  margin-top: 32rpx;
}

/* 关注医生 */
.text_5 {
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 32rpx;
  color: #070707;
  white-space: pre;
}

/* Seal Group */
.seal_group_1 {
  width: 196rpx;
  height: 36rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30rpx;
  flex-shrink: 0;
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 36rpx;
  color: #999999;
  white-space: pre;
  position: relative;
}

/* 已关注医生信息 */
.text_6 {
  width: 156rpx;
  flex-shrink: 0;
}

/* 路径 */
.path_1 {
  width: 12rpx;
  height: 20rpx;
  flex-shrink: 0;
  margin-top: 0rpx;
  margin-right: -2rpx;
  margin-bottom: 0rpx;
  margin-left: 0;
}

/* 右边卡片 */
.div_5 {
  width: 344rpx;
  height: 140rpx;
  position: absolute;
  top: auto;
  left: auto;
  right: 24rpx;
  bottom: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  z-index: 0;
  border-radius: 16rpx;
  background: linear-gradient(180deg, #fdf2ea 0%, #f7f6f7 100%), linear-gradient(0, #d8d8d8, #d8d8d8);
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);
  isolation: isolate;
}

/* 容器 15 */
.frame_15 {
  width: 64rpx;
  height: 56rpx;
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  z-index: 1;
  margin-left: 30rpx;
}

/* 容器 16 */
.frame_16 {
  width: 196rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8rpx;
  position: relative;
  z-index: 0;
  margin-left: 22rpx;
  margin-top: 32rpx;
}

/* 健康档案 */
.text_7 {
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 32rpx;
  color: #070707;
  white-space: pre;
}

/* Seal Group */
.seal_group_2 {
  width: 196rpx;
  height: 36rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10rpx;
  flex-shrink: 0;
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 36rpx;
  color: #999999;
  white-space: pre;
  position: relative;
}

/* 已记录健康信息 */
.text_8 {
  width: 176rpx;
  flex-shrink: 0;
}

/* 路径 */
.path_2 {
  width: 12rpx;
  height: 20rpx;
  flex-shrink: 0;
  margin-top: 0rpx;
  margin-right: -2rpx;
  margin-bottom: 0rpx;
  margin-left: 0;
}

/* 我的服务卡片 */
.div_6 {
  width: 702rpx;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 32rpx;
  padding-right: 32rpx;
  padding-bottom: 32rpx;
  padding-left: 32rpx;
  gap: 32rpx;
  border-radius: 8rpx;
  background-color: #ffffff;
  position: relative;
  z-index: 0;
  margin-top: 16rpx;
  margin-left: 24rpx;
}

/* 我的服务 */
.text_9 {
  flex-shrink: 0;
  font-size: 32rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 40rpx;
  color: #0e0e0e;
  white-space: pre;
}

/* 按钮组 */
.group {
  width: 638rpx;
  height: 124rpx;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 86rpx;
  flex-shrink: 0;
  position: relative;
}

/* 第1列 */
.div_1_1 {
  width: 96rpx;
  height: 124rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  text-align: center;
  font-size: 24rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 28rpx;
  color: #0e0e0e;
  white-space: pre;
  position: relative;
}

/* icon1 */
.icon1 {
  width: 80rpx;
  height: 80rpx;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 问诊记录 */
.text_10 {
  width: 96rpx;
  flex-shrink: 0;
}

/* 第2列 */
.div_2_1 {
  width: 96rpx;
  height: 124rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  font-size: 24rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 28rpx;
  color: #0e0e0e;
  white-space: pre;
  position: relative;
}

/* icon2 */
.icon2 {
  width: 80rpx;
  height: 80rpx;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 商品订单 */
.text_11 {
  flex-shrink: 0;
}

/* 第3列 */
.div_3_1 {
  width: 96rpx;
  height: 124rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  font-size: 24rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 28rpx;
  color: #0e0e0e;
  white-space: pre;
  position: relative;
}

/* icon3 */
.icon3 {
  width: 80rpx;
  height: 80rpx;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 健康档案 */
.text_12 {
  width: 96rpx;
  flex-shrink: 0;
}

/* 第4列 */
.div_4_1 {
  width: 96rpx;
  height: 124rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  font-size: 24rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 28rpx;
  color: #0e0e0e;
  white-space: pre;
  position: relative;
}

/* icon4 */
.icon4 {
  width: 80rpx;
  height: 80rpx;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 地址管理 */
.text_13 {
  width: 96rpx;
  flex-shrink: 0;
}
</style>
