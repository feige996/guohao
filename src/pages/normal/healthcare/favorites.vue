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
  <view class="page-container" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-section">
      <!-- 自定义导航栏 -->
      <view class="nav-bar">
        <view class="nav-left" @click="goBack">
          <view class="back-btn">
            <wd-icon name="arrow-left" size="20px" color="#333" />
          </view>
        </view>
        <view class="nav-center">
          <text class="nav-title">我的收藏</text>
          <text class="nav-subtitle">{{ currentCards.length }} 篇文章</text>
        </view>
        <view class="nav-right" @click="refreshFavorites">
          <view class="refresh-btn" :class="{ loading: articlesLoading }">
            <wd-icon name="refresh" size="18px" color="#666" />
          </view>
        </view>
      </view>

      <!-- 搜索栏 -->
      <!-- <view class="search-section">
        <SearchBar
          v-model="searchKeyword"
          placeholder="搜索收藏的文章..."
          @search="handleSearch"
          @click="handleSearchBarClick"
        />
      </view> -->
    </view>

    <!-- 主内容区域 -->
    <view class="main-content">
      <scroll-view scroll-y class="scroll-container" enable-back-to-top @scrolltolower="loadMoreArticles">
        <!-- 加载状态 -->
        <view v-if="articlesLoading && currentCards.length === 0" class="loading-state">
          <view class="loading-animation">
            <wd-icon name="loading" size="32px" color="#ff6b35" />
          </view>
          <text class="loading-text">正在加载收藏文章...</text>
        </view>

        <!-- 空状态提示 -->
        <view v-else-if="currentCards.length === 0" class="empty-state">
          <view class="empty-icon">
            <wd-icon name="star" size="64px" color="#ddd" />
          </view>
          <text class="empty-title">暂无收藏的文章</text>
          <text class="empty-desc">快去收藏一些感兴趣的文章吧</text>
          <view class="empty-action" @click="goToArticleList">
            <text class="action-text">去看看文章</text>
          </view>
        </view>

        <!-- 文章列表 -->
        <view v-else class="article-list">
          <view v-for="(item, index) in currentCards" :key="index" class="article-card" @click="handleCardClick(item)">
            <!-- 文章封面 -->
            <view class="card-cover">
              <image :src="item.userAvatar" class="cover-image" mode="aspectFill" />
              <view class="cover-gradient" />
            </view>

            <!-- 文章内容 -->
            <view class="card-content">
              <!-- 标题 -->
              <view class="article-title">
                <text>{{ item.title }}</text>
              </view>

              <!-- 描述 -->
              <view class="article-desc">
                <text>{{ item.desc }}</text>
              </view>

              <!-- 底部信息 -->
              <view class="card-footer">
                <!-- 统计信息 -->
                <view class="stats-info">
                  <view class="stat-item">
                    <wd-icon name="view" size="14px" color="#999" />
                    <text class="stat-text">{{ item.viewCount }}</text>
                  </view>
                  <view class="stat-item">
                    <wd-icon name="like" size="14px" color="#999" />
                    <text class="stat-text">{{ item.likeCount }}</text>
                  </view>
                </view>

                <!-- 取消收藏按钮 -->
                <view
                  class="unfavorite-btn"
                  :class="{ loading: unfavoriteLoading }"
                  @click="(e: Event) => handleUnfavorite(favoriteArticles.find(a => a.id === item.id)!, e)"
                >
                  <wd-icon :name="unfavoriteLoading ? 'loading' : 'star-on'" size="16px" color="#ff6b35" />
                  <text class="btn-text">{{ unfavoriteLoading ? '处理中' : '取消收藏' }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 加载更多提示 -->
          <view v-if="articlesLoading && currentCards.length > 0" class="load-more">
            <wd-icon name="loading" size="20px" color="#ff6b35" />
            <text class="load-text">加载中...</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 页面容器
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 154, 0, 0.05) 100%);
    pointer-events: none;
  }
}

// 头部区域
.header-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

// 导航栏
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;

  .nav-left,
  .nav-right {
    width: 120rpx;
    display: flex;
    justify-content: center;
  }

  .back-btn,
  .refresh-btn {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background: rgba(255, 107, 53, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
      background: rgba(255, 107, 53, 0.2);
    }
  }

  .refresh-btn.loading {
    animation: rotate 1s linear infinite;
  }

  .nav-center {
    flex: 1;
    text-align: center;

    .nav-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
      display: block;
    }

    .nav-subtitle {
      font-size: 24rpx;
      color: #999;
      margin-top: 4rpx;
      display: block;
    }
  }
}

// 搜索区域
.search-section {
  padding: 0 40rpx 32rpx;
}

// 主内容区域
.main-content {
  // margin-top: 200rpx;
  padding-bottom: 40rpx;
}

.scroll-container {
  height: calc(100vh - 200rpx);
}

// 加载状态
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;

  .loading-animation {
    margin-bottom: 32rpx;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .loading-text {
    font-size: 28rpx;
    color: #666;
  }
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;

  .empty-icon {
    margin-bottom: 40rpx;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }

  .empty-desc {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 48rpx;
  }

  .empty-action {
    background: linear-gradient(135deg, #ff6b35 0%, #ff9a00 100%);
    padding: 24rpx 48rpx;
    border-radius: 50rpx;
    box-shadow: 0 8rpx 30rpx rgba(255, 107, 53, 0.3);

    .action-text {
      color: white;
      font-size: 28rpx;
      font-weight: 500;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

// 文章列表
.article-list {
  padding: 0 32rpx;
}

// 文章卡片
.article-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 40rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
  box-shadow: 0 16rpx 64rpx rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:active {
    transform: translateY(-4rpx);
    box-shadow: 0 24rpx 80rpx rgba(0, 0, 0, 0.15);
  }
}

// 封面区域
.card-cover {
  position: relative;
  height: 400rpx;
  overflow: hidden;

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  }
}

// 内容区域
.card-content {
  padding: 40rpx;
}

// 文章标题
.article-title {
  margin-bottom: 24rpx;

  text {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

// 文章描述
.article-desc {
  margin-bottom: 32rpx;

  text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}

// 卡片底部
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 32rpx;
  border-top: 2rpx solid rgba(0, 0, 0, 0.05);
}

// 统计信息
.stats-info {
  display: flex;
  align-items: center;
  gap: 32rpx;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8rpx;

    .stat-text {
      font-size: 24rpx;
      color: #999;
    }
  }
}

// 取消收藏按钮
.unfavorite-btn {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx 32rpx;
  background: rgba(255, 107, 53, 0.1);
  border-radius: 40rpx;
  transition: all 0.3s ease;

  .btn-text {
    font-size: 24rpx;
    color: #ff6b35;
    font-weight: 500;
  }

  &:active {
    transform: scale(0.95);
    background: rgba(255, 107, 53, 0.2);
  }

  &.loading {
    opacity: 0.6;
    pointer-events: none;
  }
}

// 加载更多
.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 40rpx;

  .load-text {
    font-size: 28rpx;
    color: #666;
  }
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

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
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
</style>
