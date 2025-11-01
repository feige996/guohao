<script setup lang="ts">
interface DiagnosisCardProps {
  id: string
  title: string
  icon?: string
  subtitleList: string[]
  functions: string[]
}

interface DiagnosisCardEmits {
  click: [data: DiagnosisCardProps]
}

// 定义组件属性
const props = defineProps<DiagnosisCardProps>()

// 定义事件
const emit = defineEmits<DiagnosisCardEmits>()

// 处理卡片点击
function handleClick(): void {
  emit('click', props)
}
</script>

<template>
  <view
    class="mx-1 flex-1 overflow-hidden rounded-lg bg-gradient-to-br"
    :class="id === 'guide' ? 'from-[#E7F5FF] to-[#DBF0FF]' : 'from-[#FFFBEB] to-[#FEF3C7]'"
    style="height: 132px;"
    @click="handleClick"
  >
    <view class="p-4">
      <view class="flex items-start justify-between">
        <view class="space-y-1">
          <text
            class="block text-lg font-bold"
            :class="id === 'guide' ? 'text-[#456860]' : 'text-[#BAA482]'"
            style="font-size: 12px;line-height: 1.2;"
          >
            {{ title }}
          </text>
          <text v-for="(subtitle, index) in subtitleList" :key="index" class="block whitespace-nowrap text-sm" :class="id === 'guide' ? 'text-[#85B7B0]' : 'text-[#BAA482]'" style="font-size: 12px; line-height: 1.2;">
            {{ subtitle }}
          </text>
        </view>
        <view
          class="h-16 w-16 flex items-center justify-center rounded-full"
          :class="id === 'guide' ? 'bg-[#C3E6FF]' : 'bg-[#FDE68A]'"
        >
          <image v-if="icon" :src="icon" class="h-10 w-10" mode="aspectFit" />
          <!-- 图标占位 -->
        </view>
      </view>

      <view class="relative from-white to-white/20 bg-gradient-to-br px-2 py-2 -ml-2 -mr-2 -mt-2">
        <view class="features-container mt--1.5">
          <view v-for="(func, index) in functions" :key="index" class="mb-1 flex items-center">
            <text :class="id === 'guide' ? 'text-[#85B7B0]' : 'text-[#BAA482]'" class="mr-1.5 text-xs">✓</text>
            <text class="text-sm text-[#909090]" style="font-size: 12px; line-height: 1.2;">{{ func }}</text>
          </view>
        </view>
        <!-- 右侧按钮 -->
        <view
          class="absolute right-2 top-1/2 h-5 w-5 flex transform items-center justify-center rounded-full -translate-y-1/2"
          :class="id === 'guide' ? 'bg-[#85B7B0]' : 'bg-[#BAA482]'"
        >
          <text class="text-xs text-white">›</text>
        </view>
      </view>

      <!-- <view class="mt-3 flex justify-end">
        <view
          class="flex items-center rounded-full"
          :class="id === 'guide' ? 'bg-[#85B7B0]' : 'bg-[#BAA482]'"
          style="height: 28px;"
        >
          <text class="px-3 py-1.5 text-sm text-white font-medium">
            {{ id === 'guide' ? '导诊咨询' : '在线咨询' }}
          </text>
          <view class="ml-1 h-6 w-6 flex items-center justify-center rounded-full bg-white bg-opacity-30">
            <text class="text-xs text-white">›</text>
          </view>
        </view>
      </view> -->
    </view>
  </view>
</template>
