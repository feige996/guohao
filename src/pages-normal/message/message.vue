<script lang="ts" setup>
import type { App_Message } from '@/api/guohao-api/globals.d'
import { useRequest } from 'alova/client'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的消息',
    disableScroll: true,
  },
  excludeLoginPath: true, // 需要登录才能访问
})

// 用户store
const userStore = useUserStore()

// 消息数据
const messages = ref<App_Message[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const isLoading = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 当前选中的消息类型 (0: 全部消息, 1: 未读消息, 2: 已读消息)
const currentMessageType = ref(0)

// 消息类型标签
const messageTypeTabs = [
  { id: 0, name: '全部消息' },
  { id: 1, name: '未读消息' },
  { id: 2, name: '已读消息' },
]

// 检查登录状态
function checkLoginStatus(): boolean {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录后查看消息',
      confirmText: '去登录',
      cancelText: '返回',
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: LOGIN_PAGE,
          })
        }
        else {
          uni.navigateBack()
        }
      },
    })
    return false
  }
  return true
}

// 获取消息列表
const {
  loading: messagesLoading,
  send: fetchMessages,
} = useRequest(
  (page = 1, size = 20, keyword?: string, isRead?: boolean) => Apis.app_Message.apiApp_messagePagePost({
    data: {
      page,
      pageSize: size,
      keyword,
      isRead,
      userId: userStore.userInfo?.id,
      field: 'createTime',
      order: 'desc',
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('消息数据原始响应:', response)

  const data = response.data?.items || response.data || response
  console.log('处理后的消息数据:', data)

  if (currentPage.value === 1) {
    messages.value = []
  }

  if (data?.records) {
    messages.value = [...messages.value, ...data.records]
    total.value = data.total || 0
  }
  else if (Array.isArray(data)) {
    messages.value = [...messages.value, ...data]
    total.value = data.length
  }
  else {
    console.warn('未识别的消息数据格式:', data)
  }
})

// 当前正在操作的消息ID
const currentMarkReadMessageId = ref<number | null>(null)

// 标记消息为已读
const {
  loading: markReadLoading,
  send: performMarkAsRead,
} = useRequest(
  (messageId: number) => {
    currentMarkReadMessageId.value = messageId
    return Apis.app_Message.apiApp_messageMarkasreadMessageidPost({
      pathParams: {
        messageId,
      },
    })
  },
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('标记已读成功:', response)

  const messageId = currentMarkReadMessageId.value
  if (!messageId)
    return

  // 更新本地消息状态
  const messageIndex = messages.value.findIndex(msg => msg.id === messageId)
  if (messageIndex !== -1) {
    messages.value[messageIndex].isRead = true
  }

  uni.showToast({
    title: '已标记为已读',
    icon: 'success',
  })

  // 清空当前操作的消息ID
  currentMarkReadMessageId.value = null
}).onError((error: any) => {
  console.error('标记已读失败:', error)
  uni.showToast({
    title: '操作失败，请重试',
    icon: 'none',
  })

  // 清空当前操作的消息ID
  currentMarkReadMessageId.value = null
})

// 处理标记已读
function handleMarkAsRead(message: App_Message, event: Event) {
  event.stopPropagation() // 阻止事件冒泡

  if (!message.id || markReadLoading.value || message.isRead)
    return

  performMarkAsRead(message.id)
}

// 当前显示的消息列表
const currentMessages = computed(() => {
  let filteredMessages = messages.value

  // 根据消息类型过滤
  if (currentMessageType.value === 1) {
    // 未读消息
    filteredMessages = filteredMessages.filter(msg => !msg.isRead)
  }
  else if (currentMessageType.value === 2) {
    // 已读消息
    filteredMessages = filteredMessages.filter(msg => msg.isRead)
  }

  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    filteredMessages = filteredMessages.filter(msg =>
      msg.title?.toLowerCase().includes(keyword)
      || msg.content?.toLowerCase().includes(keyword),
    )
  }

  return filteredMessages.map(msg => ({
    id: msg.id,
    title: msg.title,
    content: msg.content,
    isRead: msg.isRead,
    messageType: msg.messageType,
    createTime: msg.createTime,
    icon: msg.messageType === 1 ? 'chat' : 'notification', // 1: 服务提醒, 2: 系统提醒
    typeLabel: msg.messageType === 1 ? '服务提醒' : '系统提醒',
  }))
})

// 未读消息数量
const unreadCount = computed(() => {
  return messages.value.filter(msg => !msg.isRead).length
})

// 搜索处理
function handleSearch() {
  console.log('执行搜索:', searchKeyword.value)
  // 搜索是基于已加载的消息进行过滤，不需要重新请求
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
}

// 切换消息类型
function switchMessageType(type: number) {
  currentMessageType.value = type
}

// 消息点击事件
function handleMessageClick(message: any) {
  console.log('点击消息:', message)

  // 如果是未读消息，先标记为已读
  if (!message.isRead && message.id) {
    performMarkAsRead(message.id)
  }

  // 这里可以添加跳转到消息详情页的逻辑
  // uni.navigateTo({
  //   url: `/pages/normal/message/detail?id=${message.id}`,
  // })
}

// 加载更多消息
function loadMoreMessages() {
  if (messagesLoading.value)
    return

  currentPage.value++
  const isRead = currentMessageType.value === 1 ? false : (currentMessageType.value === 2 ? true : undefined)
  fetchMessages(currentPage.value, pageSize.value, searchKeyword.value || undefined, isRead)
}

// 刷新消息列表
function refreshMessages() {
  if (!checkLoginStatus())
    return

  // 重置数据
  messages.value = []
  currentPage.value = 1

  // 重新加载
  const isRead = currentMessageType.value === 1 ? false : (currentMessageType.value === 2 ? true : undefined)
  fetchMessages(1, pageSize.value, searchKeyword.value || undefined, isRead)
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 格式化时间
function formatTime(timeStr?: string) {
  if (!timeStr)
    return ''

  const date = new Date(timeStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}分钟前`
  }
  else if (hours < 24) {
    return `${hours}小时前`
  }
  else if (days < 7) {
    return `${days}天前`
  }
  else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}

// 页面初始化
onMounted(() => {
  if (!checkLoginStatus())
    return

  // 开始加载消息数据
  isLoading.value = true
  fetchMessages(1, pageSize.value)
})
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#F2F2F5] to-[#FAFAFC] bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 自定义导航栏 -->
      <view class="nav-bar mb-4 flex items-center justify-between px-[28rpx] py-4">
        <view class="nav-left" @click="goBack">
          <view class="back-btn h-[80rpx] w-[80rpx] flex items-center justify-center rounded-[40rpx] bg-white shadow-sm">
            <wd-icon name="arrow-left" size="20px" color="#333" />
          </view>
        </view>
        <view class="nav-center flex-1 text-center">
          <text class="nav-title block text-[#333] font-semibold text-[36rpx]">我的消息</text>
          <text class="nav-subtitle mt-1 block text-[#999] text-[24rpx]">{{ unreadCount }} 条未读</text>
        </view>
        <view class="nav-right" @click="refreshMessages">
          <view class="refresh-btn h-[80rpx] w-[80rpx] flex items-center justify-center rounded-[40rpx] bg-white shadow-sm" :class="{ loading: messagesLoading }">
            <wd-icon name="refresh" size="18px" color="#666" />
          </view>
        </view>
      </view>

      <!-- 搜索栏 -->
      <!-- <view class="search-section px-[28rpx] pb-4">
        <SearchBar
          v-model="searchKeyword"
          placeholder="搜索通知提醒..."
          @search="handleSearch"
          @click="handleSearchBarClick"
        />
      </view> -->

      <!-- 消息类型标签 -->
      <view class="tabs-section px-[28rpx] pb-4">
        <view class="flex space-x-[16rpx]">
          <view
            v-for="tab in messageTypeTabs"
            :key="tab.id"
            class="flex-1 rounded-[50rpx] py-[16rpx] text-center transition-all duration-300"
            :class="currentMessageType === tab.id
              ? 'from-[#8c2303] to-[#b8441f] bg-gradient-to-br text-white font-medium shadow-md'
              : 'bg-white text-[#666] border border-gray-200'"
            @click="switchMessageType(tab.id)"
          >
            <text class="text-[28rpx]">{{ tab.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 可滚动的消息列表区域 -->
    <view class="content-scroll">
      <scroll-view scroll-y class="scroll-area" enable-back-to-top @scrolltolower="loadMoreMessages">
        <!-- 加载状态 -->
        <view v-if="messagesLoading && currentMessages.length === 0" class="flex flex-col items-center justify-center py-20">
          <text class="text-base text-gray-400">加载中...</text>
        </view>

        <!-- 空状态提示 -->
        <view v-else-if="currentMessages.length === 0" class="flex flex-col items-center justify-center py-20">
          <view class="empty-icon mb-8">
            <wd-icon name="message" size="64px" color="#ddd" />
          </view>
          <text class="mb-4 text-[#333] font-semibold text-[36rpx]">暂无消息</text>
          <text class="text-[#999] text-[28rpx]">您当前没有{{ messageTypeTabs.find(t => t.id === currentMessageType)?.name.replace('消息', '') }}消息</text>
        </view>

        <!-- 消息列表 -->
        <view v-else class="mb-[32rpx]">
          <block v-for="(item, index) in currentMessages" :key="index">
            <view
              class="relative mx-[28rpx] mb-[24rpx] rounded-[6rpx] bg-white p-[32rpx] transition-all duration-300 active:scale-[0.98]"
              :class="{ 'border-l-4 border-l-[#ff6b35]': !item.isRead }"
              @click="handleMessageClick(item)"
            >
              <!-- 未读标识红点 -->
              <view v-if="!item.isRead" class="absolute right-[16rpx] top-[16rpx] h-[16rpx] w-[16rpx] rounded-full bg-red-500" />

              <!-- 消息内容 -->
              <view class="flex">
                <!-- 图标 -->
                <view class="mr-[24rpx] h-[88rpx] w-[88rpx] flex flex-shrink-0 items-center justify-center rounded-[44rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br">
                  <wd-icon
                    :name="item.icon === 'chat' ? 'chat' : 'notification'"
                    size="24px"
                    color="white"
                  />
                </view>

                <!-- 消息主体 -->
                <view class="flex-1">
                  <!-- 消息头部：类型标签和时间 -->
                  <view class="mb-[12rpx] flex items-center justify-between">
                    <view class="inline-block rounded-[12rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br px-[12rpx] py-[4rpx] text-white text-[20rpx]">
                      {{ item.typeLabel }}
                    </view>
                    <text class="text-[#999] text-[24rpx]">{{ formatTime(item.createTime) }}</text>
                  </view>

                  <!-- 消息标题 -->
                  <view class="mb-[8rpx] font-bold text-[32rpx]" :class="item.isRead ? 'text-[#666]' : 'text-[#333]'">
                    <text>{{ item.title }}</text>
                  </view>

                  <!-- 消息内容 -->
                  <view class="mb-[16rpx]">
                    <text class="line-clamp-2 text-justify text-[28rpx] leading-[1.5]" :class="item.isRead ? 'text-[#999]' : 'text-[#666]'">
                      {{ item.content }}
                    </text>
                  </view>

                  <!-- 操作按钮 -->
                  <view v-if="!item.isRead" class="flex justify-end">
                    <view
                      class="rounded-[50rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br px-[24rpx] py-[8rpx] transition-all duration-300 active:scale-[0.95]"
                      :class="{ 'opacity-60': markReadLoading && currentMarkReadMessageId === item.id }"
                      @click="(e: Event) => handleMarkAsRead(item, e)"
                    >
                      <text class="text-white text-[24rpx]">
                        {{ markReadLoading && currentMarkReadMessageId === item.id ? '处理中...' : '标记已读' }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </block>

          <!-- 加载更多提示 -->
          <view v-if="messagesLoading && currentMessages.length > 0" class="flex items-center justify-center py-8">
            <wd-icon name="loading" size="20px" color="#8c2303" />
            <text class="ml-2 text-[#666] text-[28rpx]">加载中...</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 头部固定区域
.header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

// 可滚动内容区域
.content-scroll {
  margin-top: 30rpx;
  flex: 1;
  overflow: hidden;
}

.scroll-area {
  height: 100%;
}

// 刷新按钮旋转动画
.refresh-btn.loading {
  animation: rotate 1s linear infinite;
}

// 动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 隐藏滚动条
.uni-scroll-view {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

// 文本省略
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
