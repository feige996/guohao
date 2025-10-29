<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '',
  },
})
</script>

<template>
  <div class="flex justify-center px-[24rpx] py-[50rpx]">
    <div class="w-[702rpx] rounded-[16rpx] bg-white p-[24rpx]">
      <!-- 标题栏 -->
      <div class="relative ml-[24rpx] mt-[32rpx] h-[44rpx] flex flex-row items-start">
        <span class="relative ml-0 mt-0 h-[44rpx] whitespace-pre text-[#333333] font-medium text-[32rpx] leading-[40rpx]"> 您的专属权益 </span>
        <span class="relative ml-auto mt-[6rpx] h-[32rpx] w-[48rpx] whitespace-pre text-center text-[#999999] font-light text-[24rpx] leading-[32rpx]"> 设置 </span>
        <img
          class="relative ml-[8rpx] mt-[10rpx] h-[24rpx] w-[24rpx]"
          src="/static/home-user/settings-arrow.png"
        >
      </div>

      <!-- 功能卡片组件 -->
      <FunctionCards
        :cards="functionCards"
        @card-click="handleFunctionCardClick"
        @all-function-click="handleAllFunctionClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
