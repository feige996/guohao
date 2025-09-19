<template>
  <view class="min-h-screen bg-gray-100 p-[24rpx]">
    <view class="mb-[32rpx]">
      <text class="mb-[16rpx] text-[32rpx] text-gray-800 font-bold">ConstitutionCard 测试页面</text>
      <text class="text-[24rpx] text-gray-600">测试随机获取健康小妙招功能</text>
    </view>

    <!-- 测试卡片 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">体质卡片</text>
      <ConstitutionCard
        constitution-type="平和体质"
        advice-title="默认标题"
        advice-content="默认内容"
        @click="handleCardClick"
        @constitution-click="handleConstitutionClick"
        @advice-click="handleAdviceClick"
      />
    </view>

    <!-- 操作按钮 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">操作</text>
      <view class="flex flex-col gap-[16rpx]">
        <button 
          class="bg-blue-500 text-white px-[32rpx] py-[16rpx] rounded-[8rpx]"
          @click="handleRefreshClick"
        >
          手动刷新健康小妙招
        </button>
      </view>
    </view>

    <!-- 事件日志 -->
    <view class="mb-[48rpx]">
      <text class="mb-[24rpx] text-[28rpx] text-gray-700 font-medium">事件日志</text>
      <view class="bg-white rounded-[8rpx] p-[16rpx] min-h-[200rpx]">
        <view v-if="eventLogs.length === 0" class="text-gray-500 text-center">
          暂无事件记录
        </view>
        <view v-else>
          <view 
            v-for="(log, index) in eventLogs" 
            :key="index"
            class="mb-[8rpx] p-[8rpx] bg-gray-50 rounded-[4rpx] text-[20rpx]"
          >
            <text class="text-blue-600 font-medium">{{ log.time }}</text>
            <text class="ml-[16rpx] text-gray-800">{{ log.event }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConstitutionCard from './ConstitutionCard.vue'

// 事件日志
const eventLogs = ref<Array<{ time: string; event: string }>>([])

// 添加事件日志
function addEventLog(event: string) {
  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  eventLogs.value.unshift({
    time: timeString,
    event
  })
  
  // 只保留最近10条记录
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 事件处理函数
function handleCardClick() {
  addEventLog('点击了整个卡片')
}

function handleConstitutionClick() {
  addEventLog('点击了体质状态区域')
}

function handleAdviceClick() {
  addEventLog('点击了养生建议区域（会自动刷新健康小妙招）')
}

function handleRefreshClick() {
  addEventLog('手动触发刷新（需要直接调用组件方法）')
  // 注意：这里只是演示，实际需要通过ref获取组件实例来调用方法
}
</script>

<style scoped>
/* 测试页面样式 */
</style>
