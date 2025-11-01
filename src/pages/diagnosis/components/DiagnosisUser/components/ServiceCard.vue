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
    <view class="p-3">
      <view class="mb-1 flex items-center justify-between">
        <view class="flex-1">
          <text
            class="block text-base font-bold"
            :class="id === 'smartDiagnosis' ? 'text-[#2B496B]' : 'text-[#5F2D31]'"
            style="font-size: 12px;"
          >
            {{ title }}
          </text>
          <text v-for="(subtitle, index) in subtitleList" :key="index" class="block whitespace-nowrap text-sm" :class="id === 'smartDiagnosis' ? 'text-[#89A2BE]' : 'text-[#DBA5A9]' " style="font-size: 12px;">
            {{ subtitle }}
          </text>
        </view>
        <view class="ml-2 h-12 w-15 flex items-center justify-center">
          <view
            class="ml-2 mr-4 h-20 w-25 flex items-center justify-center rounded-full"
            :class="id === 'smartDiagnosis' ? 'bg-[#93C5FD]' : 'bg-[#F9A8D4]'"
          >
            <!-- <image v-if="icon" :src="icon" class="h-6 w-6" mode="aspectFit" /> -->
            <!-- 图标占位 -->
            <!-- 椭圆形按钮 -->
            <view
              class="h-10 w-20 flex items-center justify-center rounded-full text-white font-medium"
              :class="id === 'smartDiagnosis' ? 'bg-[#70B9C1] border border-[#60A5FA]' : 'bg-[#C37971] border border-[#F472B6]'"
              style="font-size: 12px;"
            >
              {{ buttonText || '开始自测' }}
            </view>
          </view>
        </view>

      <!-- <view class="mt-2 flex justify-end">
        <button
          class="rounded-full px-3 py-1 text-xs text-white font-medium" :class="[id === 'smartDiagnosis' ? 'bg-[#3B82F6]' : 'bg-[#EC4899]']"
        >
          {{ buttonText }}
        </button>
      </view> -->
      </view>
    </view>
  </view>
</template>
