<script setup lang="ts">
// 定义组件属性
const props = defineProps<{
  id: string
  title: string
  icon?: string
  subtitleList: string[]
  buttonText: string
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
    :class="id === 'smartDiagnosis' ? 'from-[#DBEAFE] to-[#BFDBFE]' : 'from-[#FCE7F3] to-[#FBCFE8]'"
    @click="handleClick"
  >
    <view class="p-4">
      <view class="mb-2 flex items-start justify-between">
        <view>
          <text
            class="block text-lg font-bold"
            :class="id === 'smartDiagnosis' ? 'text-[#2563EB]' : 'text-[#BE123C]'"
          >
            {{ title }}
          </text>
          <text v-for="(subtitle, index) in subtitleList" :key="index" class="block text-sm text-gray-600">
            {{ subtitle }}
          </text>
        </view>
        <view
          class="h-14 w-14 flex items-center justify-center rounded-full"
          :class="id === 'smartDiagnosis' ? 'bg-[#93C5FD]' : 'bg-[#F9A8D4]'"
        >
          <image v-if="icon" :src="icon" class="h-8 w-8" mode="aspectFit" />
          <!-- 图标占位 -->
        </view>
      </view>

      <view class="mt-6 flex justify-end">
        <button
          class="rounded-full px-4 py-1.5 text-sm text-white font-medium" :class="[id === 'smartDiagnosis' ? 'bg-[#3B82F6]' : 'bg-[#EC4899]']"
        >
          {{ buttonText }}
        </button>
      </view>
    </view>
  </view>
</template>
