<script setup lang="ts">
/**
 * ServiceCard 组件
 * 用于显示服务卡片，如问诊记录、商品订单、健康档案、地址管理等
 */

interface ServiceCardProps {
  // 卡片标题
  title: string
  // 图标URL
  iconUrl: string
  // 是否可点击
  clickable?: boolean
}

const props = withDefaults(defineProps<ServiceCardProps>(), {
  clickable: true,
})

// 定义事件
const emit = defineEmits<{
  click: []
}>()

/**
 * 处理卡片点击事件
 */
function handleCardClick() {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<template>
  <view
    class="flex flex-col items-center justify-center p-4 transition-all duration-200 hover:opacity-90"
    :class="{ 'cursor-pointer': clickable }"
    @click="handleCardClick"
  >
    <!-- 图标容器 -->
    <view class="mb-2 flex h-16 w-16 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
      <!-- 图标 -->
      <image
        class="h-10 w-10 object-contain"
        :src="iconUrl"
        mode="aspectFit"
      />
    </view>
    <!-- 标题 -->
    <view class="text-center text-sm font-medium text-gray-800">
      {{ title }}
    </view>
  </view>
</template>