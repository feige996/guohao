<script lang="ts" setup>
const current = ref(0)

const swiperList = [
  '/static/swiper/Swiper01.png',
  '/static/swiper/Swiper02.png',
]

function handleClick(e: any) {
  console.log(e)
}
function onChange(e: any) {
  console.log(e)
}
</script>

<template>
  <wd-swiper v-model:current="current" height="280rpx" :list="swiperList" autoplay @click="handleClick" @change="onChange" />
</template>

<style lang="scss" scoped>
//
</style>
