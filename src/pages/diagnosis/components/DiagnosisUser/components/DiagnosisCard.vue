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
    style="height: 172px;"
    @click="handleClick"
  >
    <view class="p-4">
      <view class="mb-3 flex items-start justify-between">
        <view>
          <text
            class="block text-lg font-bold"
            :class="id === 'guide' ? 'text-[#85B7B0]' : 'text-[#BAA482]'"
            style="font-size: 12px;"
          >
            {{ title }}
          </text>
          <text v-for="(subtitle, index) in subtitleList" :key="index" class="block whitespace-nowrap text-sm" :class="id === 'guide' ? 'text-[#85B7B0]' : 'text-[#BAA482]'" style="font-size: 12px;">
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

      <view class="features-container">
        <view v-for="(func, index) in functions" :key="index" class="mb-1.5 flex items-center">
          <text :class="id === 'guide' ? 'text-[#85B7B0]' : 'text-[#BAA482]'" class="mr-1.5 text-xs">✓</text>
          <text class="text-sm text-[#909090]" style="font-size: 12px;">{{ func }}</text>
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
