<script lang="ts" setup>
// 菜单项配置
const list = [
  { title: '意见反馈', desc: '欢迎提供改进意见', path: '/pages-user-home/shezhiCard/feedback' },
  {
    title: '在线客服',
    desc: '24小时在线',
    path: '/pages/xx',
  },
  {
    title: '系统设置',
    desc: '账号、退出、手机绑定',
    path: '/pages/xx',
  },
  {
    title: '关于系统',
    path: '/pages/xx',
  },
]
// 菜单项点击处理
function handleClick(item: { path: string }) {
  console.log('点击菜单项:', item)
  uni.navigateTo({ url: item.path })
}
</script>

<template>
  <view class="rounded-[8rpx] bg-white bg-white px-3 py-4">
    <view class="mb-2 flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]">
      账户与设置
    </view>
    <view
      v-for="(item, index) in list"
      :key="index"
      class="flex items-center gap-2 leading-10"
      @click="handleClick(item)"
    >
      <view class="flex-1 text-[#333333] text-[28rpx]">
        {{ item.title }}
      </view>
      <text class="ml-auto text-xs text-[#ccc]">{{ item.desc }}</text>
      <image
        src="/static/images/common/right.png"
        class="h-[24rpx] w-[24rpx]"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
