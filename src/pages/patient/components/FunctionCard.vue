<template>
  <view class="grid grid-cols-2 gap-3">
    <view
      class="relative overflow-hidden rounded-lg from-orange-100 to-red-100 bg-gradient-to-br p-4"
      @click="handleCardClick('patients')"
    >
      <view class="absolute right-1 top-1">
        <text class="rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">NEW</text>
      </view>
      <text class="text-lg text-gray-800 font-bold">我的患者</text>
      <text class="mt-1 text-sm text-gray-600">已接诊366名患者</text>
      <view class="mt-3 flex items-center justify-between">
        <text class="text-xs text-gray-500">查看全部</text>
        <text class="text-gray-700">›</text>
      </view>
    </view>
  </view>
</template>
