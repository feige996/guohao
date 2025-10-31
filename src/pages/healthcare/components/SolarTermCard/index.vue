<script setup lang="ts">
// 定义节气数据接口
interface SolarTerm {
  id: string
  name: string
  description: string
  imageUrl: string
  season: string
}

// 定义组件的 props
const props = defineProps<{
  term: SolarTerm
}>()

// 定义组件的 emit
const emit = defineEmits<{
  (e: 'click', term: SolarTerm): void
}>()

// 处理卡片点击
function handleClick() {
  emit('click', props.term)
}
</script>

<template>
  <view
    class="overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm transition-all duration-300 active:scale-[0.98] hover:shadow-md"
    :style="{ width: '351px', height: '106px' }"
    @click="handleClick"
  >
    <view class="h-full flex items-center px-4">
      <!-- 左侧文本区域 -->
      <view class="flex-1 pr-4">
        <view class="mb-2 text-lg text-[#333333] font-bold">
          {{ term.name || '节气名称' }}
        </view>
        <view class="whitespace-pre-line text-sm text-[#999999] leading-relaxed">
          {{ term.description || '节气描述' }}
        </view>
      </view>
      <!-- 右侧图片区域 -->
      <view class="flex-shrink-0">
        <image
          v-if="term.imageUrl"
          :src="term.imageUrl"
          class="h-24 w-24 object-contain"
          mode="aspectFit"
        />
      </view>
    </view>
  </view>
</template>
