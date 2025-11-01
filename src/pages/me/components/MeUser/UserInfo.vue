<script lang="ts" setup>
import type { AppUserInfo } from '@/api/guohao-api/globals'

defineProps<{
  userInfo?: AppUserInfo
}>()
</script>

<template>
  <!-- 头像区域 -->
  <view class="ml-5 flex flex-row items-center gap-2">
    <img
      class="h-15 w-15 flex-shrink-0 self-stretch rounded"
      :src="userInfo?.avatar || '/static/default-avatar.png'"
    >
    <view class="">
      <view class="text-[#333333] font-medium text-[36rpx] leading-[52rpx]">
        {{ userInfo?.nickName || '未登录' }}
      </view>
      <view class="text-[#999999] font-normal text-[26rpx] leading-[36rpx]">
        ID：{{ userInfo?.id || '-' }}
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
