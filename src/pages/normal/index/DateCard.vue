<script setup>
defineProps(['style'])
</script>

<template>
  <div class="relative h-[280rpx] w-[282rpx] flex flex-col items-start">
    <img
      class="relative ml-[1rpx] mt-0 h-[280rpx] w-[280rpx]"
      src="/static/images/homepage/date-card-bg.png"
    >
    <div class="relative ml-0 h-[280rpx] w-[280rpx] flex flex-col items-start -mt-[280rpx]">
      <div class="mask-image relative ml-0 mt-0 h-[280rpx] w-[280rpx] flex flex-col items-start overflow-hidden rounded-[20rpx]">
        <img
          class="absolute left-[82rpx] top-1/2 h-[198rpx] w-[198rpx] -mt-[20rpx]"
          src="/static/images/homepage/date-card-content.png"
        >
      </div>
      <div class="relative ml-[16rpx] h-[84rpx] w-[244rpx] flex flex-row items-start -mt-[264rpx]">
        <div class="relative ml-0 mt-0 h-[80rpx] w-[112rpx] flex flex-col items-start">
          <span class="relative ml-0 mt-0 whitespace-pre text-center text-[28rpx] text-[#999999] font-medium leading-[40rpx]"> 七月十五 </span>
          <span class="relative ml-0 mt-0 whitespace-pre text-center text-[28rpx] text-[#999999] font-medium leading-[40rpx]"> 乙己蛇年 </span>
        </div>
        <div class="relative ml-[84rpx] mt-0 h-[84rpx] w-[48rpx] flex flex-col items-start rounded-[16rpx] bg-[rgba(40,107,171,0.48)] text-center text-[24rpx] text-white font-medium leading-[33.6rpx]">
          <span class="relative ml-[12rpx] mt-[8rpx]"> 雨<br>水 </span>
        </div>
      </div>
      <div class="relative isolate ml-[16rpx] mt-[36rpx] h-[128rpx] w-[248rpx] flex flex-col items-start rounded-[10rpx] bg-white">
        <span class="relative z-1 ml-[14rpx] mt-[9rpx] h-[30rpx] w-[72rpx] whitespace-pre text-center text-[25rpx] text-[#286bab] font-bold leading-[30rpx]"> 2025 </span>
        <span class="relative z-0 ml-[20rpx] mt-[2rpx] h-[88rpx] whitespace-pre text-center text-[50rpx] text-[#286bab] font-bold leading-[88rpx] -mb-[19rpx]"> 09 / 06 </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask-image {
  -webkit-mask-image: url('/static/images/homepage/date-card-bg.png');
  -webkit-mask-size: contain;
  mask-image: url('/static/images/homepage/date-card-bg.png');
  mask-size: contain;
}
</style>
