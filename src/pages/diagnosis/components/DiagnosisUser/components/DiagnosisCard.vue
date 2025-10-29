<script setup lang="ts">
// 定义组件属性
const props = defineProps<{
  id: string
  title: string
  icon?: string
  subtitleList: string[]
  functions: string[]
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'click', data: typeof props): void
}>()

// 处理卡片点击
function handleClick() {
  emit('click', props)
}
</script>

<template>
  <view
    class="mx-1 flex-1 overflow-hidden rounded-lg bg-gradient-to-br"
    :class="id === 'guide' ? 'from-[#E7F5FF] to-[#DBF0FF]' : 'from-[#FFFBEB] to-[#FEF3C7]'"
    @click="handleClick"
  >
    <view class="p-4">
      <view class="mb-2 flex items-start justify-between">
        <view>
          <text
            class="block text-lg font-bold"
            :class="id === 'guide' ? 'text-[#2563EB]' : 'text-[#D97706]'"
          >
            {{ title }}
          </text>
          <text v-for="(subtitle, index) in subtitleList" :key="index" class="block text-sm text-gray-600">
            {{ subtitle }}
          </text>
        </view>
        <view
          class="h-14 w-14 flex items-center justify-center rounded-full"
          :class="id === 'guide' ? 'bg-[#C3E6FF]' : 'bg-[#FDE68A]'"
        >
          <image v-if="icon" :src="icon" class="h-8 w-8" mode="aspectFit" />
          <!-- 图标占位 -->
        </view>
      </view>

      <view class="features-container">
        <view v-for="(func, index) in functions" :key="index" class="mb-1 flex items-center">
          <text :class="id === 'guide' ? 'text-[#4299E1]' : 'text-[#F59E0B]'" class="mr-1">✓</text>
          <text class="text-sm text-gray-700">{{ func }}</text>
        </view>
      </view>

      <view class="mt-2 flex justify-end">
        <view
          class="flex items-center"
          :class="id === 'guide' ? 'bg-[#4299E1]' : 'bg-[#F59E0B]'"
        >
          <text class="px-2 py-1 text-sm text-white font-medium">
            {{ id === 'guide' ? '导诊咨询' : '在线咨询' }}
          </text>
          <view class="ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-white bg-opacity-30">
            <text class="text-xs text-white">›</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
