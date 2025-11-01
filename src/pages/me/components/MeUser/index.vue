<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
import LoginAndLogout from '../LoginAndLogout/index.vue'
import MenuCard from './components/MenuCard/index.vue'
import ServiceCard from './components/ServiceCard/index.vue'
import VipCard from './components/VipCard/index.vue'
import UserInfo from './UserInfo.vue'

const userStore = useUserStore()
</script>

<template>
  <view class="">
    <!-- 用户信息 -->
    <UserInfo :user-info="userStore.userInfo" />

    <!-- VIP卡片区域 -->
    <VipCard class="mt-3" />

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
