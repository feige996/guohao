<script setup lang="ts">
interface Tab {
  key: string
  label: string
  count?: number
}

interface Props {
  tabs: Tab[]
  modelValue: string
  showCount?: boolean
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  showCount: false,
  backgroundColor: '#FFFFFF',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [key: string]
}>()

function handleTabClick(tabKey: string) {
  emit('update:modelValue', tabKey)
  emit('change', tabKey)
}
</script>

<template>
  <view class="flex-shrink-0 px-24rpx" :style="{ backgroundColor }">
    <view class="scrollbar-hide flex gap-16rpx overflow-x-auto">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="relative flex-shrink-0 cursor-pointer rounded-full px-24rpx py-12rpx text-26rpx font-medium transition-all active:scale-95"
        :class="modelValue === tab.key ? 'bg-red-50 text-primary font-semibold' : 'text-gray-500 bg-gray-50'"
        @tap="handleTabClick(tab.key)"
      >
        <text>{{ tab.label }}</text>
        <text v-if="showCount && tab.count !== undefined" class="ml-8rpx">
          ({{ tab.count }})
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
