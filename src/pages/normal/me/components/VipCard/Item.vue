<script setup lang="ts">
/**
 * VipCard 组件
 * 用于显示会员相关功能卡片，如健康档案、关注医生等
 */

interface VipCardProps {
  // 卡片标题
  title?: string
  // 卡片描述
  description?: string
  // 图标URL
  iconUrl?: string
  // 是否可点击
  clickable?: boolean
}

const props = withDefaults(defineProps<VipCardProps>(), {
  title: '健康档案',
  description: '已记录健康信息',
  // 默认使用提供的图标URL
  iconUrl: 'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62650227621/e560/6106/f1c2/7218a547c5a5ac8fb8fbc2dcea1478d8.png',
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
    class="flex-1 rounded-[16rpx] rounded-lg bg-white from-[#fdf2ea] to-[#f7f6f7] bg-gradient-to-b px-2 py-4 shadow-[0rpx_0rpx_12rpx_0rpx_rgba(0,0,0,0.05)] shadow-md transition-all duration-300 hover:shadow-lg"
    :class="{ 'cursor-pointer': clickable }"
  >
    <!-- 卡片内容容器 -->
    <view class="flex items-center justify-between" @click="handleCardClick">
      <!-- 图标和文字部分 -->
      <view class="flex items-center gap-2">
        <!-- 图标 -->
        <image
          class="h-10 w-10"
          :src="iconUrl"
          mode="aspectFit"
        />
        <view>
          <view class="text-gray-800 font-medium">
            {{ title }}
          </view>
          <view class="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <text>{{ description }}</text>
            <!-- 右箭头 -->
            <image
              src="/static/images/homepage/arrow-right.png"
              class="h-3 w-3"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
