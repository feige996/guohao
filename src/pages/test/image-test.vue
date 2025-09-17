<template>
  <view class="min-h-screen bg-gray-100 p-[24rpx]">
    <view class="mb-[32rpx]">
      <text class="text-[32rpx] font-bold text-gray-800">图片路径测试</text>
    </view>

    <!-- 直接图片测试 -->
    <view class="mb-[48rpx]">
      <text class="text-[28rpx] font-medium text-gray-700 mb-[24rpx] block">直接图片路径测试</text>
      
      <view class="mb-[24rpx]">
        <text class="text-[24rpx] text-gray-600 mb-[12rpx] block">绝对路径测试：</text>
        <image 
          src="/static/images/healthcare/guide-bg.png"
          class="w-[200rpx] h-[100rpx] border border-gray-300"
          mode="aspectFit"
          @error="handleImageError"
          @load="handleImageLoad"
        />
      </view>

      <view class="mb-[24rpx]">
        <text class="text-[24rpx] text-gray-600 mb-[12rpx] block">别名路径测试：</text>
        <image 
          src="@img/healthcare/guide-bg.png"
          class="w-[200rpx] h-[100rpx] border border-gray-300"
          mode="aspectFit"
          @error="handleImageError"
          @load="handleImageLoad"
        />
      </view>

      <view class="mb-[24rpx]">
        <text class="text-[24rpx] text-gray-600 mb-[12rpx] block">相对路径测试：</text>
        <image 
          src="../../static/images/healthcare/guide-bg.png"
          class="w-[200rpx] h-[100rpx] border border-gray-300"
          mode="aspectFit"
          @error="handleImageError"
          @load="handleImageLoad"
        />
      </view>
    </view>

    <!-- 动态路径测试 -->
    <view class="mb-[48rpx]">
      <text class="text-[28rpx] font-medium text-gray-700 mb-[24rpx] block">动态路径测试</text>
      
      <view class="mb-[24rpx]">
        <text class="text-[24rpx] text-gray-600 mb-[12rpx] block">通过变量绑定：</text>
        <image 
          :src="imagePath"
          class="w-[200rpx] h-[100rpx] border border-gray-300"
          mode="aspectFit"
          @error="handleImageError"
          @load="handleImageLoad"
        />
      </view>
    </view>

    <!-- 日志 -->
    <view class="mt-[48rpx] p-[24rpx] bg-white rounded-[16rpx]">
      <text class="text-[24rpx] font-medium text-gray-700 mb-[16rpx] block">加载日志</text>
      <view v-if="logs.length === 0" class="text-gray-500">
        暂无日志
      </view>
      <view v-else>
        <view
          v-for="(log, index) in logs"
          :key="index"
          class="mb-[8rpx] p-[12rpx] rounded-[8rpx]"
          :class="log.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'"
        >
          <text class="text-[20rpx]">
            {{ log.time }} - {{ log.message }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '图片路径测试',
  },
})

// 日志
interface Log {
  time: string
  message: string
  type: 'success' | 'error'
}

const logs = ref<Log[]>([])
const imagePath = ref('/static/images/healthcare/guide-bg.png')

// 添加日志
function addLog(message: string, type: 'success' | 'error') {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  logs.value.unshift({
    time: timeString,
    message,
    type
  })

  // 只保留最近20条记录
  if (logs.value.length > 20) {
    logs.value = logs.value.slice(0, 20)
  }
}

// 处理图片加载错误
function handleImageError(event: any) {
  console.error('图片加载失败:', event)
  addLog(`图片加载失败: ${event.target?.src || '未知路径'}`, 'error')
}

// 处理图片加载成功
function handleImageLoad(event: any) {
  console.log('图片加载成功:', event)
  addLog(`图片加载成功: ${event.target?.src || '未知路径'}`, 'success')
}
</script>
