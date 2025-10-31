<script lang="ts" setup>
defineProps<{
  tabList: { name: string }[]
}>()
const emit = defineEmits<{
  (e: 'change', index: number): void
}>()

const activeTabIndex = ref(0)

function handleClick(index: number) {
  activeTabIndex.value = index
  emit('change', index)
}
</script>

<template>
  <div class="mt-[32rpx] flex flex-row items-center rounded-[16rpx] bg-white p-[8rpx]">
    <div
      v-for="(tab, index) in tabList"
      :key="index"
      class="h-[72rpx] flex flex-1 cursor-pointer items-center justify-center rounded-[12rpx] transition-all duration-300"
      :class="activeTabIndex === index ? 'bg-[#97493d] text-white' : 'text-[#666666]'"
      @click="handleClick(index)"
    >
      <span class="font-medium text-[28rpx]">{{ tab.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
