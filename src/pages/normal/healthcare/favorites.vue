<script lang="ts" setup>
import type { App_HealthArticle } from '@/api/guohao-api/globals.d'
import { useRequest } from 'alova/client'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的收藏',
    disableScroll: true,
  },
  excludeLoginPath: true, // 需要登录才能访问
})

// 用户store
const userStore = useUserStore()

// 文章数据
const articles = ref<App_HealthArticle[]>([])
const favoriteArticles = ref<App_HealthArticle[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const isLoading = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 检查登录状态
function checkLoginStatus(): boolean {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录后查看收藏',
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

// 获取所有文章列表
const {
  loading: articlesLoading,
  send: fetchAllArticles,
} = useRequest(
  (page = 1, size = 20, keyword?: string) => Apis.app_HealthArticle.apiApp_healtharticlePagePost({
    data: {
      page,
      pageSize: size,
      keyword,
      isPublished: true,
      field: 'publishTime',
      order: 'desc',
    },
    meta: {
      allowAnonymous: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('文章数据原始响应:', response)

  const data = response.data?.items || response.data || response
  console.log('处理后的文章数据:', data)

  if (data?.records) {
    articles.value = [...articles.value, ...data.records]
    total.value = data.total || 0
  }
  else if (Array.isArray(data)) {
    articles.value = [...articles.value, ...data]
    total.value = data.length
  }
  else {
    console.warn('未识别的文章数据格式:', data)
  }

  // 过滤出收藏的文章
  filterFavoriteArticles()
})

// 过滤收藏的文章
function filterFavoriteArticles() {
  if (!userStore.userInfo?.id)
    return

  const userId = userStore.userInfo.id
  const favoriteIds: number[] = []

  // 从本地存储获取所有收藏的文章ID
  articles.value.forEach((article) => {
    if (article.id) {
      const favoriteKey = `article_favorite_${article.id}_${userId}`
      const isFavorited = uni.getStorageSync(favoriteKey) === 'true'
      if (isFavorited) {
        favoriteIds.push(article.id)
      }
    }
  })

  // 过滤出收藏的文章
  favoriteArticles.value = articles.value.filter(article =>
    article.id && favoriteIds.includes(article.id),
  )

  console.log('收藏的文章:', favoriteArticles.value)
}

// 当前正在操作的文章ID
const currentUnfavoriteArticleId = ref<number | null>(null)

// 取消收藏
const {
  loading: unfavoriteLoading,
  send: performUnfavorite,
} = useRequest(
  (articleId: number) => {
    currentUnfavoriteArticleId.value = articleId
    return Apis.app_HealthArticle.apiApp_healtharticleFavoriteArticleidUseridPost({
      pathParams: {
        articleId,
        userId: userStore.userInfo?.id || 0,
      },
    })
  },
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('取消收藏成功:', response)

  const articleId = currentUnfavoriteArticleId.value
  if (!articleId)
    return

  // 从本地存储移除收藏状态
  if (userStore.userInfo?.id) {
    const favoriteKey = `article_favorite_${articleId}_${userStore.userInfo.id}`
    uni.removeStorageSync(favoriteKey)
  }

  // 从收藏列表中移除
  favoriteArticles.value = favoriteArticles.value.filter(article => article.id !== articleId)

  uni.showToast({
    title: '已取消收藏',
    icon: 'success',
  })

  // 清空当前操作的文章ID
  currentUnfavoriteArticleId.value = null
}).onError((error: any) => {
  console.error('取消收藏失败:', error)
  uni.showToast({
    title: '操作失败，请重试',
    icon: 'none',
  })

  // 清空当前操作的文章ID
  currentUnfavoriteArticleId.value = null
})

// 处理取消收藏
function handleUnfavorite(article: App_HealthArticle, event: Event) {
  event.stopPropagation() // 阻止事件冒泡

  if (!article.id || unfavoriteLoading.value)
    return

  uni.showModal({
    title: '确认取消收藏',
    content: '确定要取消收藏这篇文章吗？',
    success: (res) => {
      if (res.confirm && article.id) {
        performUnfavorite(article.id)
      }
    },
  })
}

// 当前显示的文章列表
const currentCards = computed(() => {
  let cards = favoriteArticles.value

  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    cards = cards.filter(article =>
      article.title?.toLowerCase().includes(keyword)
      || article.summary?.toLowerCase().includes(keyword),
    )
  }

  return cards.map(article => ({
    id: article.id,
    title: article.title,
    desc: article.summary,
    userAvatar: article.coverImageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    label: article.tags || ['健康养生'],
    favoriteCount: article.favoriteCount || 0,
    likeCount: article.likeCount || 0,
    viewCount: article.viewCount || 0,
    publishTime: article.publishTime,
  }))
})

// 搜索处理
function handleSearch() {
  console.log('执行搜索:', searchKeyword.value)
  // 搜索是基于已加载的收藏文章进行过滤，不需要重新请求
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
}

// 卡片点击事件
function handleCardClick(card: any) {
  console.log('点击卡片:', card)
  uni.navigateTo({
    url: `/pages/normal/healthcare/detail?id=${card.id}`,
  })
}

// 加载更多文章
function loadMoreArticles() {
  if (articlesLoading.value)
    return

  currentPage.value++
  fetchAllArticles(currentPage.value, pageSize.value, searchKeyword.value || undefined)
}

// 刷新收藏列表
function refreshFavorites() {
  if (!checkLoginStatus())
    return

  // 重置数据
  articles.value = []
  favoriteArticles.value = []
  currentPage.value = 1

  // 重新加载
  fetchAllArticles(1, pageSize.value)
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 跳转到文章列表页
function goToArticleList() {
  uni.switchTab({ url: '/pages/normal/healthcare/healthcare' })
}

// 页面初始化
onMounted(() => {
  if (!checkLoginStatus())
    return

  // 开始加载文章数据
  isLoading.value = true
  fetchAllArticles(1, pageSize.value)
})

// 页面显示时刷新收藏状态
onShow(() => {
  if (userStore.isLoggedIn && articles.value.length > 0) {
    filterFavoriteArticles()
  }
})
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 自定义导航栏 -->
      <view class="flex items-center justify-between bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
        <view class="flex cursor-pointer items-center" @click="goBack">
          <text class="text-2xl text-gray-700">←</text>
          <text class="ml-2 text-base text-gray-700">返回</text>
        </view>
        <text class="text-lg text-gray-800 font-medium">我的收藏</text>
        <view class="flex items-center" @click="refreshFavorites">
          <wd-icon name="refresh" size="20px" color="#6b7280" />
        </view>
      </view>

      <!-- 搜索栏 -->
      <SearchBar
        v-model="searchKeyword"
        placeholder="搜索收藏的文章"
        @search="handleSearch"
        @click="handleSearchBarClick"
      />

      <!-- 可滚动的卡片列表区域 -->
      <view class="content-scroll">
        <scroll-view scroll-y class="scroll-area" enable-back-to-top @scrolltolower="loadMoreArticles">
          <!-- 加载状态 -->
          <view v-if="articlesLoading && currentCards.length === 0" class="flex flex-col items-center justify-center py-20">
            <text class="text-base text-gray-400">加载中...</text>
          </view>

          <!-- 空状态提示 -->
          <view v-else-if="currentCards.length === 0" class="flex flex-col items-center justify-center py-20">
            <text class="text-base text-gray-400">暂无收藏的文章</text>
            <view class="mt-4 rounded-lg bg-orange-500 px-6 py-2" @click="goToArticleList">
              <text class="text-white">去看看文章</text>
            </view>
          </view>

          <!-- 文章列表 -->
          <view v-else class="mb-[32rpx]">
            <block v-for="(item, index) in currentCards" :key="index">
              <view class="mx-[28rpx] mb-[24rpx] rounded-[24rpx] bg-white p-[32rpx] shadow-[0_4rpx_20rpx_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] active:shadow-[0_2rpx_10rpx_rgba(0,0,0,0.12)]" @click="handleCardClick(item)">
                <!-- 上部分：标题、描述和图片 -->
                <view class="mb-[16rpx] flex">
                  <view class="flex-1 pr-[16rpx]">
                    <!-- 标题 -->
                    <view class="mb-[8rpx] line-clamp-1 text-justify font-bold text-[32rpx]">
                      <text>{{ item.title }}</text>
                    </view>
                    <!-- 描述 -->
                    <view class="min-h-[90rpx]">
                      <text class="line-clamp-2 text-justify text-[#999999] text-[28rpx] leading-[1.5]">
                        {{ item.desc }}
                      </text>
                    </view>
                  </view>
                  <!-- 图片 -->
                  <view class="relative h-[160rpx] w-[240rpx] flex-shrink-0 overflow-hidden rounded-[16rpx] bg-cover bg-center bg-no-repeat" :style="`background-image:url(${item.userAvatar})`">
                    <view class="h-full w-full rounded-[16rpx] from-[rgba(140,35,3,0.1)] to-[rgba(184,68,31,0.1)] bg-gradient-to-br" />
                  </view>
                </view>

                <!-- 下部分：统计信息和取消收藏按钮 -->
                <view class="flex items-center justify-between border-t border-gray-100 pt-[16rpx]">
                  <!-- 统计信息（靠左） -->
                  <view class="flex items-center space-x-[16rpx]">
                    <!-- 浏览量 -->
                    <view class="flex items-center text-[#999999]">
                      <wd-icon name="view" size="32rpx" />
                      <text class="ml-[4rpx] text-[24rpx]">{{ item.viewCount }}</text>
                    </view>
                    <!-- 点赞数 -->
                    <view class="flex items-center text-[#999999]">
                      <wd-icon name="pointing-hand" size="32rpx" />
                      <text class="ml-[4rpx] text-[24rpx]">{{ item.likeCount }}</text>
                    </view>
                  </view>

                  <!-- 取消收藏按钮（靠右） -->
                  <view
                    class="flex items-center rounded-full bg-red-50 px-3 py-1 text-red-500 transition-all duration-200 active:bg-red-100 hover:bg-red-100"
                    :class="[unfavoriteLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer']"
                    @click="(e: Event) => handleUnfavorite(favoriteArticles.find(a => a.id === item.id)!, e)"
                  >
                    <wd-icon :name="unfavoriteLoading ? 'loading' : 'star-on'" size="28rpx" color="#ef4444" />
                    <text class="ml-1 text-sm">{{ unfavoriteLoading ? '处理中...' : '取消收藏' }}</text>
                  </view>
                </view>
              </view>
            </block>

            <!-- 加载更多提示 -->
            <view v-if="articlesLoading && currentCards.length > 0" class="flex justify-center py-4">
              <text class="text-sm text-gray-400">加载中...</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(to bottom, #f6e2d3, transparent);
}

.content-scroll {
  margin-top: 120px; /* 根据头部高度调整 */
  height: calc(100vh - 120px);
}

.scroll-area {
  height: 100%;
}

// 隐藏滚动条
.uni-scroll-view {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 和 Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari 和 Opera */
  }
}
</style>
