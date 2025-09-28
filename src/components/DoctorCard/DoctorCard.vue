<script setup lang="ts">
import type { DoctorCardConfig } from './types'

interface Props {
  config: DoctorCardConfig
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [config: DoctorCardConfig]
}>()

function handleClick() {
  emit('click', props.config)
}
</script>

<template>
  <view
    class="relative h-280rpx w-702rpx flex flex-row items-start rounded-16rpx bg-white"
    @click="handleClick"
  >
    <!-- 左侧内容区域 -->
    <view class="relative ml-32rpx mt-24rpx h-260rpx w-400rpx flex flex-col items-start">
      <!-- 医生姓名和职称 -->
      <view class="relative h-32rpx w-full flex flex-row items-center">
        <text class="flex-shrink-0 text-30rpx text-[#333333] font-500 leading-32rpx">
          {{ config.name }}
        </text>
        <text class="ml-16rpx flex-shrink-0 text-30rpx text-[#999999] font-400 leading-32rpx">
          {{ config.title }}
        </text>
      </view>

      <!-- 科室和医院标签 -->
      <view class="relative mt-20rpx w-400rpx flex flex-row items-start">
        <!-- 科室标签 -->
        <view class="relative flex flex-wrap items-start gap-8rpx">
          <view
            v-for="(dept, index) in (Array.isArray(config.department) ? config.department.slice(0, 4) : [config.department])"
            :key="index"
            class="h-36rpx min-w-88rpx flex flex-col items-start"
          >
            <wd-tag custom-class="space" type="warning" mark>
              {{ dept }}
            </wd-tag>
          </view>
        </view>

        <!-- 医院标签 -->
        <!-- <view class="relative ml-8rpx h-36rpx w-228rpx flex flex-col items-start">
          <view class="absolute left-0 top-0 h-full w-full flex flex-col items-start rounded-8rpx bg-[#efedfa]">
            <text class="absolute left-24rpx top-8rpx text-20rpx text-[#9f80ef] font-500 leading-20rpx">
              {{ config.hospital }}
            </text>
          </view>
        </view> -->
      </view>

      <!-- 接诊量和好评率 -->
      <view class="relative mt-10rpx h-34rpx w-326rpx flex flex-row items-start">
        <text class="absolute left-0 top-12rpx text-20rpx text-[#999999] font-500 leading-24rpx">
          好评：
        </text>
        <view class="absolute left-60rpx top-0 leading-32rpx">
          <text class="text-30rpx text-[#fd6302] font-700 leading-32rpx">{{ config.rating }}</text>
          <text class="text-20rpx text-[#fd6302] font-500 leading-32rpx">%</text>
        </view>
        <text class="absolute left-156rpx top-12rpx text-20rpx text-[#999999] font-500 leading-24rpx">
          接诊量：
        </text>
        <text class="absolute right-0 top-2rpx text-30rpx text-[#fd6302] font-700 leading-32rpx">
          {{ config.consultationCount }}
        </text>
      </view>

      <!-- 简介描述 -->
      <text class="left-0 mt-20rpx w-full line-clamp-2 overflow-hidden text-22rpx text-[#89a2be] font-500 leading-36rpx">
        {{ config.specialty }}
      </text>
    </view>

    <!-- 右侧头像容器 -->
    <view class="absolute right-0 top-1/2 h-220rpx w-220rpx p-2 -translate-y-1/2">
      <image
        class="h-full w-full rounded-8rpx"
        :src="config.avatar"
        mode="aspectFill"
      />
    </view>
  </view>
</template>
