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
  <div class="flex flex-row items-center rounded-[16rpx] bg-white p-[8rpx]">
    <div
      v-for="(tab, index) in tabList"
      :key="index"
      class="relative h-[72rpx] flex flex-1 cursor-pointer items-center justify-center transition-all duration-300"
      :class="activeTabIndex === index ? ' text-[#8C2303]' : 'text-[#9FA9B5]'"
      @click="handleClick(index)"
    >
      <span class="font-medium text-[28rpx]">{{ tab.name }}</span>
      <!-- 激活状态底部横线 -->
      <div
        v-if="activeTabIndex === index"
        class="absolute bottom-0 left-1/2 h-[6rpx] w-[100rpx] transform rounded rounded-full bg-[#8C2303] -translate-x-1/2"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
