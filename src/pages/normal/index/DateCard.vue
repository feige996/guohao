<script setup>
defineProps(['style'])
</script>

<template>
  <div class="relative h-[280rpx] w-[282rpx] flex flex-col items-start">
    <img
      class="relative ml-[1rpx] mt-0 h-[280rpx] w-[280rpx]"
      src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62601423099/86c0/5bde/f2aa/79510a8c2affe159918d9ee5caaf16e1.png"
    >
    <div class="relative ml-0 h-[280rpx] w-[280rpx] flex flex-col items-start -mt-[280rpx]">
      <div class="mask-image relative ml-0 mt-0 h-[280rpx] w-[280rpx] flex flex-col items-start overflow-hidden rounded-[20rpx]">
        <img
          class="absolute left-[82rpx] top-1/2 h-[198rpx] w-[198rpx] -mt-[20rpx]"
          src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62609437513/ad3f/4de1/f026/4cdf2770de50ddb8816207913f9f9e1c.png"
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
        <span class="relative z-0 ml-[26rpx] mt-[15rpx] h-[88rpx] whitespace-pre text-center text-[60rpx] text-[#286bab] font-bold leading-[88rpx] -mb-[19rpx]"> 09 / 06 </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask-image {
  -webkit-mask-image: url('https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62601423099/86c0/5bde/f2aa/79510a8c2affe159918d9ee5caaf16e1.png');
  -webkit-mask-size: contain;
  mask-image: url('https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62601423099/86c0/5bde/f2aa/79510a8c2affe159918d9ee5caaf16e1.png');
  mask-size: contain;
}
</style>
