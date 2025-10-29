<script lang="ts" setup>
defineProps({
  constitution: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <view class="constitution-tag h-[20px] flex items-center px-4">
    <text class="text-[10px] text-white font-500">
      {{ constitution }}
    </text>
  </view>
</template>

<style lang="scss" scoped>
.constitution-tag {
  $radius: 16px;
  border-radius: $radius $radius $radius 0;
  background: linear-gradient(92deg, #fe4a21 -5%, #fe8454 93%);
}
</style>
