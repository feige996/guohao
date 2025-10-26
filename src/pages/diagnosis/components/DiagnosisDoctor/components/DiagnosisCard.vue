<script setup lang="ts">
// 问诊数据
const consultationData = {
  todayConsult: 36,
  remainingConsult: 18,
  todayPrescription: 6,
}
</script>

<template>
  <view class="mb-3 border border-blue-200 rounded-xl from-blue-50 to-cyan-50 bg-gradient-to-r p-4">
    <view class="mb-4 text-base font-medium">
      问诊数据
    </view>
    <view class="grid grid-cols-3 gap-3">
      <!-- 今日接诊 -->
      <view class="flex flex-col items-center">
        <view class="mb-2 h-12 w-12 flex items-center justify-center rounded-full bg-red-50">
          <text class="text-lg text-red-500">👤</text>
        </view>
        <text class="text-sm text-gray-500">今日接诊</text>
        <text class="text-lg text-gray-800 font-medium">{{ consultationData.todayConsult }}</text>
      </view>

      <!-- 剩余问诊 -->
      <view class="flex flex-col items-center">
        <view class="mb-2 h-12 w-12 flex items-center justify-center rounded-full bg-yellow-50">
          <text class="text-lg text-yellow-500">📞</text>
        </view>
        <text class="text-sm text-gray-500">剩余问诊</text>
        <text class="text-lg text-gray-800 font-medium">{{ consultationData.remainingConsult }}</text>
      </view>

      <!-- 今日开方 -->
      <view class="flex flex-col items-center">
        <view class="mb-2 h-12 w-12 flex items-center justify-center rounded-full bg-green-50">
          <text class="text-lg text-green-500">📋</text>
        </view>
        <text class="text-sm text-gray-500">今日开方</text>
        <text class="text-lg text-gray-800 font-medium">{{ consultationData.todayPrescription }}</text>
      </view>
    </view>
  </view>
</template>
