<script lang="ts" setup>
import { definePage } from '@uni-helper/vite-plugin-uni-pages'
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationBarTitleText: '我的消息',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
})

// 搜索关键词
const searchKeyword = ref('')

// 消息类型定义
interface Message {
  id: string
  title: string
  content: string
  time: string
  read?: boolean
}

interface MessageCategory {
  id: string
  title: string
  icon: string
  badge?: number
  backgroundColor: string
  messages: Message[]
  hasNew: boolean
}

// 消息分类数据
const messageCategories = ref<MessageCategory[]>([
  {
    id: 'system',
    title: '系统消息',
    icon: '📢',
    badge: 3,
    backgroundColor: '#e3f2fd',
    hasNew: true,
    messages: [
      {
        id: 's1',
        title: '缴费提醒',
        content: '您有一笔诊金30元未支付。',
        time: '10:05',
        read: false
      },
      {
        id: 's2',
        title: '系统升级',
        content: '客户端升级到2.0.3。',
        time: '昨日',
        read: false
      }
    ]
  },
  {
    id: 'consult',
    title: '问诊提醒',
    icon: '📅',
    badge: 1,
    backgroundColor: '#e8f5e9',
    hasNew: true,
    messages: [
      {
        id: 'c1',
        title: '今日问诊',
        content: '16:30分图文问诊。',
        time: '今日',
        read: false
      }
    ]
  },
  {
    id: 'doctor',
    title: '医生来信',
    icon: '💬',
    backgroundColor: '#f3e5f5',
    hasNew: false,
    messages: []
  }
])

// 过滤后的消息分类
const filteredCategories = computed(() => {
  if (!searchKeyword.value.trim()) {
    return messageCategories.value
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return messageCategories.value.map(category => {
    const filteredMessages = category.messages.filter(msg => 
      msg.title.toLowerCase().includes(keyword) || 
      msg.content.toLowerCase().includes(keyword)
    )
    
    return {
      ...category,
      messages: filteredMessages,
      badge: filteredMessages.length > 0 ? filteredMessages.filter(m => !m.read).length : undefined
    }
  }).filter(category => 
    category.title.toLowerCase().includes(keyword) || 
    category.messages.length > 0
  )
})

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 处理消息点击
function handleMessageClick(categoryId: string, messageId?: string) {
  if (messageId) {
    // 标记消息为已读
    const category = messageCategories.value.find(c => c.id === categoryId)
    if (category) {
      const message = category.messages.find(m => m.id === messageId)
      if (message) {
        message.read = true
      }
      
      // 更新分类未读数
      const unreadCount = category.messages.filter(m => !m.read).length
      category.badge = unreadCount > 0 ? unreadCount : undefined
      category.hasNew = unreadCount > 0
    }
  }
  
  // 根据消息类型进行不同的跳转或操作
  switch (categoryId) {
    case 'system':
      // 跳转到系统消息详情页
      uni.navigateTo({
        url: '/pages/normal/index/systemMessageDetail'
      })
      break
    case 'consult':
      // 跳转到问诊提醒页面
      uni.navigateTo({
        url: '/pages/normal/index/appointmentConsult'
      })
      break
    case 'doctor':
      // 跳转到医生消息页面
      uni.showToast({ title: '查看医生消息', icon: 'none' })
      break
  }
}

// 处理分类点击
function handleCategoryClick(categoryId: string) {
  // 根据分类类型进行不同的操作
  switch (categoryId) {
    case 'system':
      // 跳转到系统消息详情页
      uni.navigateTo({
        url: '/pages/normal/index/systemMessageDetail'
      })
      break
    case 'consult': {
      // 标记该分类下所有消息为已读
      const category = messageCategories.value.find(c => c.id === categoryId)
      if (category && category.messages.length > 0) {
        category.messages.forEach(msg => {
          msg.read = true
        })
        category.badge = undefined
        category.hasNew = false
      }
      // 跳转到问诊提醒页面
      uni.navigateTo({
        url: '/pages/normal/index/appointmentConsult'
      })
      break
    }
    case 'doctor':
      // 跳转到医生消息页面
      uni.showToast({ title: '查看医生消息', icon: 'none' })
      break
  }
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部导航栏 -->
    <view class="h-[92rpx] flex items-center justify-between border-b border-[#f0f0f0] bg-white px-[32rpx]">
      <view class="h-[44rpx] w-[44rpx] flex items-center justify-center" @click="goBack">
        <text class="text-[#333333] text-[36rpx] font-medium">‹</text>
      </view>
      <text class="text-[#333333] font-medium text-[32rpx]">我的消息</text>
      <view class="h-[44rpx] w-[44rpx]"></view>
    </view>

    <!-- 搜索框 -->
    <view class="p-[24rpx] bg-white">
      <view class="relative">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索通知提醒"
          placeholder-style="color:#999999; font-size:28rpx"
          class="h-[80rpx] w-full rounded-[40rpx] bg-[#f5f5f5] px-[80rpx] py-0 text-[28rpx]"
        >
        <text class="absolute left-[32rpx] top-1/2 -translate-y-1/2 text-[32rpx] text-[#999999]">🔍</text>
        <text
          v-if="searchKeyword"
          class="absolute right-[32rpx] top-1/2 -translate-y-1/2 cursor-pointer text-[32rpx] text-[#999999]"
          @click="clearSearch"
        >✕</text>
      </view>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="flex-1" scroll-y>
      <view v-for="category in filteredCategories" :key="category.id" class="mb-[20rpx] overflow-hidden rounded-[16rpx] bg-white">
        <!-- 分类标题 -->
        <view 
          class="flex items-center justify-between p-[32rpx] cursor-pointer"
          @click="handleCategoryClick(category.id)"
        >
          <view class="flex items-center">
            <view class="flex h-[80rpx] w-[80rpx] items-center justify-center rounded-full text-[40rpx]" :style="{ backgroundColor: category.backgroundColor }">
              {{ category.icon }}
            </view>
            <text class="ml-[24rpx] text-[30rpx] font-medium">{{ category.title }}</text>
          </view>
          <view class="flex items-center">
            <view v-if="category.badge" class="flex h-[40rpx] min-w-[40rpx] items-center justify-center rounded-full bg-[#f44336] px-[16rpx] text-[24rpx] text-white">
              {{ category.badge }}
            </view>
            <text class="ml-[20rpx] text-[#999999]">›</text>
          </view>
        </view>

        <!-- 消息内容 -->
        <view v-if="category.messages.length > 0" class="divide-y divide-[#f5f5f5]">
          <view 
            v-for="message in category.messages" 
            :key="message.id" 
            class="p-[32rpx] cursor-pointer"
            @click="handleMessageClick(category.id, message.id)"
          >
            <view class="flex items-center justify-between">
              <text class="text-[28rpx] font-medium">{{ message.title }}</text>
              <text class="text-[24rpx] text-[#999999]">{{ message.time }}</text>
            </view>
            <view class="mt-[12rpx] flex items-center justify-between">
              <text class="text-[26rpx] text-[#666666]">{{ message.content }}</text>
              <view v-if="!message.read" class="h-[16rpx] w-[16rpx] rounded-full bg-[#f44336]"></view>
            </view>
          </view>
        </view>

        <!-- 无消息提示 -->
        <view v-else class="p-[60rpx] text-center">
          <text class="text-[28rpx] text-[#999999]">暂时未有新消息</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>