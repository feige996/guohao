<script lang="ts" setup>
import LoginAndLogout from '../LoginAndLogout/index.vue'
import MenuCard from './components/MenuCard/index.vue'
import ServiceCard from './components/ServiceCard/index.vue'
import VipCard from './components/VipCard/index.vue'
</script>

<template>
  <view class="">
    <!-- 主容器 -->
    <view class="">
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
      <VipCard class="mt-3" />
    </view>

    <!-- 我的服务卡片 -->
    <ServiceCard />

    <!-- 功能菜单 -->
    <MenuCard class="mt-3" />

    <!-- 登录登出按钮 -->
    <LoginAndLogout />

    <!-- 底部安全区域 -->
    <view class="h-[32rpx]" />
  </view>
</template>
