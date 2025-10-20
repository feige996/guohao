<script lang="ts" setup>
// 菜单项配置
const list = [
  {
    id: 'profile',
    title: '个人资料',
    desc: '查看和编辑个人信息',
    icon: '/static/images/me/profile-icon.png',
    arrow: true,
  },
  {
    id: 'health-record',
    title: '健康档案',
    desc: '查看和编辑健康档案',
    icon: '/static/images/me/health-record-icon.png',
    arrow: true,
  },
  {
    id: 'consultation-history',
    title: '问诊记录',
    desc: '查看和编辑问诊记录',
    icon: '/static/images/me/consultation-icon.png',
    arrow: true,
  },
  {
    id: 'prescription',
    title: '我的处方',
    desc: '查看和编辑我的处方',
    icon: '/static/images/me/prescription-icon.png',
    arrow: true,
  },
  {
    id: 'collection',
    title: '养生收藏',
    desc: '查看和编辑养生收藏',
    icon: '/static/images/me/collection-icon.png',
    arrow: true,
  },
  {
    id: 'settings',
    title: '设置',
    desc: '查看和编辑设置',
    icon: '/static/images/me/settings-icon.png',
    arrow: true,
  },
]
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
</script>

<template>
  <view class="rounded-[8rpx] bg-white bg-white px-3 py-4">
    <view class="mb-2 flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]">
      账户与设置
    </view>
    <view
      v-for="item in list"
      :key="item.id"
      class="flex items-center gap-2 leading-10"
      @click="handleMenuClick(item)"
    >
      <view class="flex-1 text-[#333333] text-[28rpx]">
        {{ item.title }}
      </view>
      <text class="ml-auto text-xs text-[#ccc]">{{ item.desc }}</text>
      <image
        v-if="item.arrow"
        src="/static/images/homepage/settings-arrow.png"
        class="h-[24rpx] w-[24rpx]"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
