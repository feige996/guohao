<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义收藏项目接口
interface FavoriteItem {
  id: string | number
  title: string
  type: 'article' | 'video' | 'case'
  description: string
  imageUrl: string
  duration?: string
  collectTime: string
}

// 用户store
const userStore = useUserStore()

// 状态管理
const currentTab = ref('所有收藏') // '所有收藏' | '文章类' | '视频类'
const favoritesList = ref<FavoriteItem[]>([])
const isManaging = ref(false)
const selectedItems = ref<Set<string | number>>(new Set())
const searchKeyword = ref('')
const isLoading = ref(true)

// 模拟收藏数据
const mockFavorites: FavoriteItem[] = [
  {
    id: 1,
    title: '春季养肝调理方案',
    type: 'article',
    description: '春季养肝调理的实用方法和注意事项',
    imageUrl: '/static/images/lunar/liver.png',
    collectTime: '2025-3-12',
  },
  {
    id: 2,
    title: '中医治疗高血压专题',
    type: 'case',
    description: '高血压中医调理案例分析与治疗方案',
    imageUrl: '/static/images/tcm-lecture3.png',
    collectTime: '2025-3-12',
  },
  {
    id: 3,
    title: '调理脾胃经典方法',
    type: 'video',
    description: '中医调理脾胃的实用方法',
    imageUrl: '/static/images/tcm-lecture2.png',
    duration: '02:25',
    collectTime: '2025-3-16',
  },
  {
    id: 4,
    title: '中医养生食谱大全',
    type: 'article',
    description: '春夏秋冬四季养生食谱推荐',
    imageUrl: '/static/images/health-article.png',
    collectTime: '2025-3-10',
  },
  {
    id: 5,
    title: '艾灸疗法入门教程',
    type: 'video',
    description: '零基础学习艾灸的实用技巧',
    imageUrl: '/static/images/tcm-lecture1.png',
    duration: '05:40',
    collectTime: '2025-3-08',
  },
  {
    id: 6,
    title: '中医推拿治疗颈椎病',
    type: 'case',
    description: '一个月治愈颈椎病的真实案例',
    imageUrl: '/static/images/case-study.png',
    collectTime: '2025-3-05',
  },
  {
    id: 7,
    title: '中医体质辨识与调理',
    type: 'article',
    description: '九种体质的特征与调理方法',
    imageUrl: '/static/images/healthcare-card-bg.png',
    collectTime: '2025-3-01',
  },
  {
    id: 8,
    title: '中医穴位按摩保健',
    type: 'video',
    description: '常用保健穴位按摩手法教学',
    imageUrl: '/static/images/tcm-lecture4.png',
    duration: '03:15',
    collectTime: '2025-2-28',
  },
]

// 过滤后的收藏列表
const filteredFavorites = computed(() => {
  let items = favoritesList.value

  // 根据标签过滤
  if (currentTab.value === '文章类') {
    items = items.filter(item => item.type === 'article' || item.type === 'case')
  }
  else if (currentTab.value === '视频类') {
    items = items.filter(item => item.type === 'video')
  }

  // 搜索过滤
  if (searchKeyword.value) {
    items = items.filter(item =>
      item.title.includes(searchKeyword.value)
      || item.description.includes(searchKeyword.value),
    )
  }

  return items
})

// 选中数量
const selectedCount = computed(() => selectedItems.value.size)

// 从本地存储加载收藏数据
function loadFavorites() {
  isLoading.value = true
  try {
    if (userStore.userInfo?.id) {
      // 实际项目中应该从本地存储获取
      // 这里使用模拟数据
      favoritesList.value = mockFavorites

      // 模拟加载延迟
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
    else {
      // 未登录时使用模拟数据
      favoritesList.value = mockFavorites
      isLoading.value = false
    }
  }
  catch (error) {
    console.error('加载收藏数据失败:', error)
    favoritesList.value = mockFavorites
    isLoading.value = false
  }
}

// 切换管理模式
function toggleManageMode() {
  isManaging.value = !isManaging.value
  selectedItems.value.clear()
}

// 切换项目选中状态
function toggleItemSelection(id: string | number) {
  if (selectedItems.value.has(id)) {
    selectedItems.value.delete(id)
  }
  else {
    selectedItems.value.add(id)
  }
}

// 删除选中的收藏
function deleteSelected() {
  if (selectedItems.value.size === 0) {
    uni.showToast({
      title: '请先选择要删除的收藏',
      icon: 'none',
    })
    return
  }

  uni.showModal({
    title: '确认删除',
    content: `确定要删除选中的 ${selectedCount.value} 个收藏吗？`,
    success: (res) => {
      if (res.confirm) {
        // 过滤掉选中的项目
        favoritesList.value = favoritesList.value.filter(
          item => !selectedItems.value.has(item.id),
        )
        selectedItems.value.clear()

        uni.showToast({
          title: '删除成功',
          icon: 'success',
        })

        // 如果删除后列表为空，退出管理模式
        if (favoritesList.value.length === 0) {
          isManaging.value = false
        }
      }
    },
  })
}

// 清空所有收藏
function clearAllFavorites() {
  if (favoritesList.value.length === 0)
    return

  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有收藏吗？此操作不可恢复。',
    success: (res) => {
      if (res.confirm) {
        favoritesList.value = []
        selectedItems.value.clear()
        isManaging.value = false

        uni.showToast({
          title: '清空成功',
          icon: 'success',
        })
      }
    },
  })
}

// 处理搜索
function handleSearch(event: any) {
  searchKeyword.value = event.target?.value || ''
}

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
}

// 点击收藏项
function handleItemClick(item: FavoriteItem) {
  if (isManaging.value) {
    toggleItemSelection(item.id)
    return
  }

  // 根据类型跳转到不同页面
  if (item.type === 'video') {
    // 跳转到视频详情页
    uni.navigateTo({
      url: `/pages/normal/healthcare/tcm-lecture-detail?id=${item.id}`,
    })
  }
  else {
    // 跳转到文章详情页
    uni.navigateTo({
      url: `/pages/normal/healthcare/article-detail?id=${item.id}&type=${item.type}`,
    })
  }
}

// 关闭页面
function closePage() {
  uni.navigateBack()
}

// 组件挂载时加载数据
onMounted(() => {
  loadFavorites()
})
</script>

<template>
  <view class="healthcare-favorites-page min-h-screen bg-gray-50" :style="{ paddingTop: `${safeAreaInsets.top}px` }">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 bg-white shadow-sm">
      <!-- 搜索栏 -->
      <view class="search-bar px-4 py-3">
        <view class="search-input flex items-center rounded-full bg-gray-100 px-3">
          <uni-icons type="search" size="18" color="#999" />
          <input
            v-model="searchKeyword"
            class="ml-2 box-border h-[80rpx] w-full flex-1 rounded-full bg-transparent text-sm outline-none"
            placeholder="搜索收藏内容"
            placeholder-class="text-gray-400"
            @input="handleSearch"
          >
          <uni-icons
            v-if="searchKeyword"
            type="clear"
            size="18"
            color="#999"
            class="cursor-pointer"
            @click="clearSearch"
          />
        </view>
      </view>

      <!-- 标签切换和管理按钮在同一行 -->
      <view class="flex items-center border-b px-4">
        <view class="flex flex-1">
          <view
            v-for="tab in ['所有收藏', '文章类', '视频类']"
            :key="tab"
            class="flex-1 py-3 text-center text-sm transition-all duration-300"
            :class="{
              'text-orange-600 border-b-2 border-orange-600 font-medium': currentTab === tab,
              'text-gray-600': currentTab !== tab,
            }"
            @click="currentTab = tab"
          >
            {{ tab }}
          </view>
        </view>

        <!-- 管理模式按钮 - 幽灵按钮样式(size="small"迷你按钮) -->
        <wd-button
          v-if="favoritesList.length > 0"
          plain
          size="small"
          class="ml-2"
          @click="toggleManageMode"
        >
          {{ isManaging ? '完成' : '管理' }}
        </wd-button>
      </view>
    </view>

    <!-- 收藏列表 -->
    <view class="favorites-list px-4 py-3">
      <!-- 加载状态 -->
      <view v-if="isLoading" class="h-32 flex flex-col items-center justify-center rounded-lg bg-white shadow-sm">
        <uni-icons type="refresh" size="24" color="#999" />
        <text class="mt-2 text-sm text-gray-500">加载中...</text>
      </view>

      <!-- 收藏列表 -->
      <view v-else-if="filteredFavorites.length > 0">
        <view
          v-for="item in filteredFavorites"
          :key="item.id"
          class="favorite-item mb-3 flex items-start rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md" :class="{ 'active:bg-gray-100 touch-active:bg-gray-50': isManaging, 'bg-red-50': isManaging && selectedItems.has(item.id) }"
          @click="handleItemClick(item)"
        >
          <!-- 管理模式下的选择框 -->
          <view v-if="isManaging" class="mr-3 h-24 w-12 flex flex-shrink-0 flex-col items-center justify-center relative">
            <view v-if="selectedItems.has(item.id)" class="absolute inset-0 flex items-center justify-center">
              <view class="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                <text class="text-white text-xs">✓</text>
              </view>
            </view>
          </view>

          <!-- 图标/图片 -->
          <view class="mr-3 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <image :src="item.imageUrl" class="h-24 w-24 object-cover" />
          </view>

          <!-- 内容信息 -->
          <view class="min-w-0 flex-1">
            <view class="flex items-center justify-between">
              <text class="truncate text-base font-medium">
                {{ item.title }}
              </text>
              <text v-if="item.duration && item.type === 'video'" class="ml-2 flex-shrink-0 text-xs text-gray-500">
                {{ item.duration }}
              </text>
            </view>
            <!-- 类型标签 -->
            <view class="mt-1 flex items-center">
              <text
                class="rounded-full px-2 py-0.5 text-xs font-medium"
                :class="{
                  'bg-blue-50 text-blue-600': item.type === 'article',
                  'bg-green-50 text-green-600': item.type === 'video',
                  'bg-purple-50 text-purple-600': item.type === 'case',
                }"
              >
                {{ item.type === 'article' ? '文章类' : item.type === 'video' ? '视频类' : '案例类' }}
              </text>
            </view>
            <text class="mt-1 block line-clamp-2 text-sm text-gray-600">
              {{ item.description }}
            </text>
            <text class="mt-1 block text-xs text-gray-400">
              收藏时间：{{ item.collectTime }}
            </text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="h-64 flex flex-col items-center justify-center rounded-lg bg-white shadow-sm">
        <uni-icons type="star" size="48" color="#ddd" />
        <text class="mt-4 text-sm text-gray-500">暂无收藏内容</text>
        <text class="mt-2 text-xs text-gray-400">您可以收藏感兴趣的文章和视频</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view
      v-if="isManaging && favoritesList.length > 0"
      class="bottom-bar fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      :style="{ paddingBottom: safeAreaInsets.bottom > 0 ? `${safeAreaInsets.bottom}px` : '16px' }"
    >
      <wd-button
        plain
        type="error"
        class="px-6"
        @click="clearAllFavorites"
      >
        清空收藏
      </wd-button>
      <wd-button
        plain
        :type="selectedCount > 0 ? 'primary' : 'default'"
        :disabled="selectedCount === 0"
        :class="[selectedCount === 0 ? 'opacity-50' : '']"
        class="px-8"
        @click="deleteSelected"
      >
        删除({{ selectedCount }})
      </wd-button>
    </view>
  </view>
</template>
