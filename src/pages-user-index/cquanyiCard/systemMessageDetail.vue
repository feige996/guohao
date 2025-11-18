<script lang="ts" setup>
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationBarTitleText: '我的消息',
    navigationBarTextStyle: 'black',
  },
})

// 标签页类型
type TabType = 'all' | 'read' | 'unread' | 'delete'

// 当前选中的标签
const activeTab = ref<TabType>('unread')

// 消息数据
interface MessageItem {
  id: string
  title: string
  content: string
  time: string
  isRead: boolean
  type: string
  actionUrl?: string
}

// 模拟消息数据
const messages = ref<MessageItem[]>([
  {
    id: '1',
    title: '缴费提醒',
    content: '您有一笔预约诊金未支付，金额未30元，点击"立即缴费"，选择支付方式（微信或支付宝），完成30元支付。',
    time: '2024-03-21 10:05',
    isRead: false,
    type: 'payment',
    actionUrl: '/pages/normal/payment/pay',
  },
])

// 过滤后的消息
const filteredMessages = computed(() => {
  switch (activeTab.value) {
    case 'all':
      return messages.value
    case 'read':
      return messages.value.filter(msg => msg.isRead)
    case 'unread':
      return messages.value.filter(msg => !msg.isRead)
    case 'delete':
      // 这里只是演示，实际应该从已删除列表中获取
      return []
    default:
      return messages.value
  }
})

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 切换标签
function switchTab(tab: TabType) {
  activeTab.value = tab
}

// 标记为已读
function markAsRead(messageId: string) {
  const message = messages.value.find(msg => msg.id === messageId)
  if (message) {
    message.isRead = true
    uni.showToast({
      title: '已标记为已读',
      icon: 'none',
    })
  }
}

// 删除消息
function deleteMessage(messageId: string) {
  uni.showModal({
    title: '删除确认',
    content: '确定要删除这条消息吗？',
    success: (res) => {
      if (res.confirm) {
        const index = messages.value.findIndex(msg => msg.id === messageId)
        if (index !== -1) {
          messages.value.splice(index, 1)
          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })
        }
      }
    },
  })
}

// 处理缴费按钮点击
function handlePay(messageId: string) {
  const message = messages.value.find(msg => msg.id === messageId)
  if (message) {
    // 标记为已读
    message.isRead = true

    // 跳转到支付页面或显示支付弹窗
    uni.showToast({
      title: '跳转到支付页面',
      icon: 'none',
    })

    // 实际应用中应该跳转到支付页面
    // if (message.actionUrl) {
    //   uni.navigateTo({
    //     url: message.actionUrl
    //   })
    // }
  }
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部导航栏 -->
    <view class="h-[92rpx] flex items-center justify-between border-b border-[#f0f0f0] bg-white px-[32rpx]">
      <view class="h-[44rpx] w-[44rpx] flex items-center justify-center" @click="goBack">
        <text class="text-[#333333] font-medium text-[36rpx]">‹</text>
      </view>
      <text class="text-[#333333] font-medium text-[32rpx]">我的消息</text>
      <view class="h-[44rpx] w-[44rpx]" />
    </view>

    <!-- 标签栏 -->
    <view class="bg-white">
      <view class="flex border-b border-[#f0f0f0]">
        <view
          v-for="tab in [{ key: 'all' as TabType, label: '全部' }, { key: 'read' as TabType, label: '已读' }, { key: 'unread' as TabType, label: '未读' }, { key: 'delete' as TabType, label: '删除' }]"
          :key="tab.key"
          class="h-[88rpx] flex flex-1 items-center justify-center"
          :class="activeTab === tab.key ? 'border-b-2 border-[#4caf50] text-[#4caf50] font-medium' : 'text-[#666666]'"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </view>
      </view>
    </view>

    <!-- 消息列表 -->
    <view class="mt-[20rpx]">
      <!-- 消息卡片 -->
      <view v-for="message in filteredMessages" :key="message.id" class="mb-[20rpx] overflow-hidden rounded-[16rpx] bg-white">
        <!-- 消息头部 -->
        <view class="flex items-center justify-between border-b border-[#f5f5f5] px-[32rpx] py-[28rpx]">
          <text class="font-medium text-[30rpx]">{{ message.title }}</text>
          <text class="text-[#999999] text-[24rpx]">{{ message.time }}</text>
        </view>

        <!-- 消息内容 -->
        <view class="px-[32rpx] py-[32rpx] text-[#333333] leading-8 text-[28rpx]">
          {{ message.content }}
        </view>

        <!-- 操作按钮区域 -->
        <view class="flex items-center justify-center border-t border-[#f5f5f5] py-[32rpx]">
          <button
            class="h-[80rpx] rounded-[40rpx] bg-[#4caf50] text-white font-medium text-[30rpx]"
            style="width: 40%;"
            @click="handlePay(message.id)"
          >
            立即缴费
          </button>
        </view>

        <!-- 温馨提示 -->
        <view class="bg-[#f5f5f5] px-[32rpx] py-[24rpx] text-[#999999] text-[26rpx]">
          <view class="font-medium">
            温馨提示：
          </view>
          <view class="mt-[16rpx] leading-7">
            若仍无法支付，建议检查账户余额或联系客服，进一步核实订单状态。
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="filteredMessages.length === 0" class="flex flex-col items-center justify-center rounded-[16rpx] bg-white px-[32rpx] py-[120rpx]">
        <text class="text-[#999999] text-[28rpx]">暂无消息</text>
      </view>
    </view>

    <!-- 消息操作菜单 (模拟长按显示) -->
    <view v-if="false" class="fixed bottom-0 left-0 right-0 h-[120rpx] flex items-center justify-around border-t border-[#e0e0e0] bg-white">
      <view class="flex flex-col items-center justify-center">
        <text class="mb-[8rpx] text-[40rpx]">✓</text>
        <text class="text-[#666666] text-[26rpx]">标记已读</text>
      </view>
      <view class="flex flex-col items-center justify-center">
        <text class="mb-[8rpx] text-[40rpx]">🗑️</text>
        <text class="text-[#666666] text-[26rpx]">删除</text>
      </view>
      <view class="flex flex-col items-center justify-center">
        <text class="mb-[8rpx] text-[40rpx]">✕</text>
        <text class="text-[#666666] text-[26rpx]">取消</text>
      </view>
    </view>
  </view>
</template>
