<template>
  <view
    class="relative h-[264rpx] w-[344rpx] flex flex-shrink-0 flex-col cursor-pointer items-start justify-center rounded-[16rpx] bg-gradient-to-br transition-all duration-300"
    :class="[
      {
        'opacity-50 cursor-not-allowed': config.enabled === false,
        'hover:scale-105': config.enabled !== false,
      },
      className,
    ]"
    :style="{
      '--tw-gradient-from': config.gradientColors.from,
      '--tw-gradient-to': config.gradientColors.to,
      'background-image': `linear-gradient(to bottom right, ${config.gradientColors.from}, ${config.gradientColors.to})`,
    }"
    @click="handleClick"
  >
    <!-- 背景图片 -->
    <image
      class="relative ml-auto mr-[4rpx] mt-0 h-[138rpx] w-[224rpx]"
      :src="config.images.background"
      mode="aspectFill"
      :alt="`${config.title}背景图`"
    />

    <!-- 内容区域 -->
    <view class="relative ml-[16rpx] mt-[-138rpx] h-[248rpx] w-[328rpx] flex flex-col items-start">
      <!-- 装饰图片 -->
      <image
        class="relative z-0 ml-auto mr-0 mt-0 h-[138rpx] w-[188rpx]"
        :src="config.images.decoration"
        mode="aspectFill"
        :alt="`${config.title}装饰图`"
      />

      <!-- 头像图片 -->
      <image
        class="relative z-1 ml-auto mr-[20rpx] mt-[-126rpx] h-[148rpx] w-[148rpx]"
        :src="config.images.avatar"
        mode="aspectFill"
        :alt="`${config.title}头像`"
      />

      <!-- 主标题 -->
      <text
        class="relative z-3 mb-[-7rpx] ml-[8rpx] mt-[-132rpx] h-[38rpx] w-[108rpx] whitespace-pre text-[26rpx] font-medium leading-[38rpx]"
        :style="{ color: config.titleColor }"
      >
        {{ config.title }}
      </text>

      <!-- 副标题1 -->
      <text
        class="relative z-4 ml-[8rpx] mt-[16rpx] whitespace-pre text-[20rpx] font-medium leading-[24rpx]"
        :style="{ color: config.subtitleColor }"
      >
        {{ config.subtitle1 }}
      </text>

      <!-- 副标题2 -->
      <text
        class="relative z-5 ml-[8rpx] mt-[4rpx] h-[24rpx] w-[108rpx] whitespace-pre text-[20rpx] font-medium leading-[24rpx]"
        :style="{ color: config.subtitleColor }"
      >
        {{ config.subtitle2 }}
      </text>

      <!-- 底部功能区 -->
      <view class="absolute bottom-0 left-0 right-[16rpx] top-auto z-2 h-[112rpx] w-auto flex flex-row items-start rounded-[16rpx] bg-white/50 backdrop-blur-[10rpx]">
        <!-- 功能图标区 -->
        <view class="relative z-0 ml-[22rpx] mt-[28rpx] h-[56rpx] w-[20rpx] flex flex-col items-start">
          <image
            class="relative ml-0 mt-0 h-[16rpx] w-[20rpx]"
            :src="config.images.icon1"
            mode="aspectFill"
            :alt="`${config.features.feature1}图标`"
          />
          <image
            class="absolute bottom-0 left-0 top-auto h-[16rpx] w-[20rpx]"
            :src="config.images.icon2"
            mode="aspectFill"
            :alt="`${config.features.feature2}图标`"
          />
        </view>

        <!-- 功能描述区 -->
        <view class="relative z-2 ml-[6rpx] mt-[24rpx] h-[64rpx] w-[154rpx] flex flex-col items-start">
          <text class="relative ml-0 mt-0 whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]">
            {{ config.features.feature1 }}
          </text>
          <text class="absolute bottom-0 left-0 top-auto w-[132rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]">
            {{ config.features.feature2 }}
          </text>
        </view>

        <!-- 箭头图标 -->
        <image
          class="absolute bottom-[31.25%] left-[82.0513%] right-[5.1282%] top-[33.0357%] z-1 h-[35.7143%] w-[12.8205%]"
          :src="config.images.arrow"
          mode="aspectFill"
          alt="箭头图标"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { HealthcareCardEmits, HealthcareCardProps } from './types'

// 定义 Props
const props = withDefaults(defineProps<HealthcareCardProps>(), {
  className: '',
})

// 定义事件
const emit = defineEmits<HealthcareCardEmits>()

// 处理点击事件
function handleClick() {
  if (props.config.enabled === false) {
    return
  }
  emit('click', props.config)
}
</script>
