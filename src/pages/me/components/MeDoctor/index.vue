<script lang="ts" setup>
import { ref } from 'vue'
import DoctorCard from '@/components/DoctorCard/index.vue'
import { useUserStore } from '@/store'
import LoginAndLogout from '../LoginAndLogout/index.vue'
import DoctorProfile from './components/DoctorProfile.vue'
import ServiceSetting from './components/ServiceSetting.vue'

const userStore = useUserStore()
// 模拟收入数据
const incomeData = ref({
  month: '50.00',
  today: '50.00',
})

// 模拟评价数据
const ratingData = ref({
  goodCount: 188,
  replyCount: 160,
})

// 点击收入区域
function handleIncomeClick() {
  console.log('点击了收入区域')
  // 跳转到收入明细页面
  uni.navigateTo({
    url: '/pages/doctor/me/income',
  })
}
</script>

<template>
  <view class="">
    <!-- 顶部医生信息卡片 -->
    <DoctorCard :doctor-info="userStore.userInfo" />
    <!-- 我的档案区域 -->
    <DoctorProfile />

    <!-- 统计卡片区域 -->
    <view class="mt-3 h-[124px] flex gap-4">
      <!-- 我的收入卡片 -->
      <view class="flex flex-1 flex-col justify-between gap-2px rounded-lg bg-white p-3">
        <view class="flex items-center gap-2">
          <image src="/static/images/me-doctor/pocket.png" class="h-7 w-7" />
          <text class="text-base text-#070707 font-medium">我的收入</text>
        </view>
        <view class="flex items-center">
          <text class="text-8px text-yellow-400 opacity-0">{{ 'sdfasdf ' }}</text>
        </view>
        <view class="flex items-center gap-1 text-xs">
          <view class="text-xs text-#484848 font-500">
            本月:
          </view>
          <view class="text-sm text-#FD6302">
            ¥<text class="text-lg font-500">{{ incomeData.month }}</text>
          </view>
        </view>
        <view class="flex items-center gap-1 text-xs">
          <view class="text-xs text-#484848 font-500">
            今日:
          </view>
          <view class="text-sm text-#FD6302">
            ¥<text class="text-lg font-500">{{ incomeData.today }}</text>
          </view>
        </view>
      </view>

      <!-- 患者评价卡片 -->
      <view class="flex flex-1 flex-col justify-between gap-1 rounded-lg bg-white p-3">
        <view class="flex items-center gap-2">
          <image src="/static/images/me-doctor/message.png" class="h-7 w-7" />
          <text class="text-base text-#070707 font-medium">患者评价</text>
        </view>
        <view class="flex items-center">
          <text class="text-xs text-yellow-400">⭐⭐⭐⭐⭐</text>
        </view>
        <view class="text-xs text-#484848 font-500">
          累计好评: {{ ratingData.goodCount }}条
        </view>
        <view class="text-xs text-#484848 font-500">
          累计回复: {{ ratingData.replyCount }}条
        </view>
      </view>
    </view>

    <!-- 服务设置区域 -->
    <ServiceSetting />

    <!-- 登录登出按钮 -->
    <LoginAndLogout />

    <!-- 底部安全区域 -->
    <view class="h-[32rpx]" />
  </view>
</template>
