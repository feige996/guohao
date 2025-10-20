<script lang="ts" setup>
import VipCard from './Item.vue'
/**
 * 处理关注医生卡片点击事件
 */
function handleDoctorClick() {
  // 这里可以添加关注医生页面的跳转逻辑
  console.log('点击了关注医生卡片')
}

/**
 * 处理健康档案卡片点击事件
 */
function handleHealthRecordClick() {
  // 这里可以添加健康档案页面的跳转逻辑
  console.log('点击了健康档案卡片')
}
</script>

<template>
  <view>
    <view class="card-container flex items-center px-3">
      <view class="text-white font-medium text-[32rpx] leading-[48rpx]">
        健康VIP
      </view>
      <view class="text-white/50 font-medium text-[26rpx] leading-[32rpx]">
        开通VIP 享更高级权益
      </view>
      <view class="ml-auto rounded-[28rpx] from-[#fefbfb] to-[#f7f9ef] bg-gradient-to-b pb-[12rpx] pl-[24rpx] pr-[24rpx] pt-[12rpx] text-center text-highlight font-medium text-[24rpx] leading-[32rpx]">
        升级VIP
      </view>
    </view>

    <!-- VIP底部背景 -->
    <view class="relative left--3 box-border h-[180rpx] w-screen flex gap-2 rounded-[16rpx] from-[rgba(253,238,227,0.94)] to-[rgba(245,246,243,0.94)] bg-gradient-to-b p-3 backdrop-blur-[10rpx]">
      <!-- 左边卡片 - 使用VIPCard组件 -->
      <VipCard
        title="关注医生"
        description="已关注医生信息"
        icon-url="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650226633/0ad9/94f5/516d/9dca6d56eb93b5495d8c57770ea9fc5a.png"
        @click="handleDoctorClick"
      />

      <!-- 右边卡片 - 使用VIPCard组件 -->
      <VipCard
        title="健康档案"
        description="已记录健康信息"
        icon-url="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227605/4538/58f9/66c2/4bca6a9bdd69e5a5b6d297cf379d4589.png"
        @click="handleHealthRecordClick"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card-container {
  height: 60px;
  border-radius: 16px 16px 0 0;
  background-image: linear-gradient(to bottom, #97493d, #c7ac80);
}
</style>
