<script setup lang="ts">
import { ref } from 'vue'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

// 模拟Apis对象，防止未定义错误
const Apis = {
  app_HealthArticle: {
    apiApp_healtharticleDetailGet: () => Promise.resolve({}),
    apiApp_healtharticleLikeArticleidUseridPost: () => Promise.resolve({}),
    apiApp_healtharticleFavoriteArticleidUseridPost: () => Promise.resolve({}),
  },
}

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '内容详情',
    disableScroll: false,
  },
  excludeLoginPath: false,
})

// 定义文章详情接口
interface HealthArticleDetail {
  id: number
  title: string
  summary: string
  content: string
  coverImageUrl?: string
  viewCount: number
  likeCount: number
  favoriteCount: number
  commentCount: number
  tags?: string[]
  categoryId?: number
  publishTime?: string
  isPublished: boolean
  isRecommend: boolean
  author?: string
  readTime?: number
}

// 获取页面参数
const articleId = ref<number>(0)
const contentType = ref<string>('article') // 'article' | 'case'

// 用户store
const userStore = useUserStore()

// 文章详情数据
const articleDetail = ref<HealthArticleDetail | null>(null)
const isLiked = ref(false)
const isFavorited = ref(false)
const detailLoading = ref(false)

// 获取用户的点赞和收藏状态
function fetchUserInteractionStatus() {
  if (!userStore.userInfo?.id || !articleId.value)
    return

  const userId = userStore.userInfo.id
  const likeKey = `article_like_${articleId.value}_${userId}`
  const favoriteKey = `article_favorite_${articleId.value}_${userId}`

  // 从本地存储获取状态
  isLiked.value = uni.getStorageSync(likeKey) === 'true'
  isFavorited.value = uni.getStorageSync(favoriteKey) === 'true'
}

// 模拟文章详情数据
function getMockArticleDetail(id: number, type: string): HealthArticleDetail {
  const baseDetail: HealthArticleDetail = {
    id,
    title: type === 'case' ? '中医治疗案例：成功治愈多年的慢性胃病' : '老中医总结出的6条中医基础知识',
    summary: type === 'case' ? '这是一个真实的中医治疗慢性胃病的成功案例...' : '中医学基础知识精选，帮助你了解中医的核心理念...',
    content: `<div class="article-content">
      <h3>中医基础知识</h3>
      <p>中医学名: 中华医学,简称中医,世界非物质文化遗产</p>
      <p>起源时间:约5000年前神农尝百草,《黄帝内经》系统总结(公元前3世纪)</p>
      <p>基本特征:整体观念、辨证论治、未病先防、四诊合参</p>
      <p>基础理论:阴阳五行、脏腑经络、气血津液、病因病机</p>
      <p>治疗方法:中药、针灸、推拿、拔罐、食疗等</p>
    </div>`,
    coverImageUrl: type === 'case' ? '/static/images/case-study.png' : '/static/images/health-article.png',
    viewCount: 1234,
    likeCount: 56,
    favoriteCount: 34,
    commentCount: 12,
    tags: ['中医', '基础知识', '养生'],
    publishTime: '2025-5-2',
    isPublished: true,
    isRecommend: true,
    author: '国豪中医',
    readTime: 5,
  }

  if (type === 'case') {
    baseDetail.title = '中医治疗案例：成功治愈多年的慢性胃病'
    baseDetail.content = `<div class="article-content">
      <h3>患者基本情况</h3>
      <p>患者：张先生，男，45岁</p>
      <p>主诉：胃痛反复发作5年，加重2个月</p>
      <p>现病史：患者5年前开始出现胃痛，多于饮食不规律后发作，曾服用多种西药效果不佳。近2个月来，胃痛频率增加，伴有反酸、嗳气等症状。</p>
      
      <h3>中医诊断</h3>
      <p>中医辨证：脾胃虚弱，肝气犯胃证</p>
      <p>舌脉：舌淡红，苔薄白，脉弦细</p>
      
      <h3>治疗方案</h3>
      <p>1. 中药治疗：采用健脾和胃、疏肝理气的方剂</p>
      <p>2. 针灸治疗：选取足三里、中脘、内关等穴位</p>
      <p>3. 饮食调理：建议清淡饮食，避免辛辣刺激食物</p>
      
      <h3>治疗效果</h3>
      <p>经过1个月的系统治疗，患者胃痛症状明显减轻，反酸、嗳气基本消失。继续巩固治疗2个月后，随访半年未再复发。</p>
    </div>`
  }

  return baseDetail
}

// 获取文章详情（模拟）
async function fetchArticleDetail(id: number) {
  detailLoading.value = true
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 200))

    // 使用模拟数据 - 直接设置，确保总是有数据
    articleDetail.value = getMockArticleDetail(id, contentType.value)

    // 增加浏览量
    if (articleDetail.value) {
      articleDetail.value.viewCount = (articleDetail.value.viewCount || 0) + 1
    }

    // 如果用户已登录，获取用户的点赞和收藏状态
    if (userStore.isLoggedIn) {
      fetchUserInteractionStatus()
    }
  }
  catch (error) {
    console.error('获取文章详情失败:', error)
    // 即使出错，也显示模拟数据
    articleDetail.value = getMockArticleDetail(id || 1, contentType.value)
  }
  finally {
    detailLoading.value = false
  }
}

// 在onLoad中获取参数
function onLoad(options: any) {
  // 确保总是有一个有效的ID来显示模拟数据
  articleId.value = Number(options?.id) || 1
  contentType.value = options?.type || 'article'

  // 立即执行数据加载
  fetchArticleDetail(articleId.value)
}

// 页面加载时立即初始化一些默认数据，避免显示空白或错误状态
// 这样在异步加载完成前，可以先显示一些基础内容
articleDetail.value = getMockArticleDetail(1, 'article')

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 检查登录状态
function checkLoginStatus(): boolean {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录后再进行操作',
      confirmText: '去登录',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const currentUrl = `/pages/normal/healthcare/detail?id=${articleId.value}`
          uni.navigateTo({
            url: `${LOGIN_PAGE}?redirect=${encodeURIComponent(currentUrl)}`,
          })
        }
      },
    })
    return false
  }
  return true
}

// 点赞/取消点赞
async function handleLike() {
  if (!checkLoginStatus()) {
    return
  }

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 200))

    // 更新状态
    isLiked.value = !isLiked.value

    // 更新点赞数
    if (articleDetail.value) {
      articleDetail.value.likeCount = isLiked.value
        ? (articleDetail.value.likeCount || 0) + 1
        : Math.max(0, (articleDetail.value.likeCount || 0) - 1)
    }

    // 保存到本地存储
    const userId = userStore.userInfo?.id
    if (userId) {
      const likeKey = `article_like_${articleId.value}_${userId}`
      uni.setStorageSync(likeKey, isLiked.value.toString())
    }

    uni.showToast({
      title: isLiked.value ? '点赞成功' : '取消点赞',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('点赞操作失败:', error)
    // 恢复原始状态
    isLiked.value = !isLiked.value
    uni.showToast({
      title: '操作失败，请重试',
      icon: 'none',
    })
  }
}

// 收藏/取消收藏
async function handleFavorite() {
  if (!checkLoginStatus()) {
    return
  }

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 200))

    // 更新状态
    isFavorited.value = !isFavorited.value

    // 更新收藏数
    if (articleDetail.value) {
      articleDetail.value.favoriteCount = isFavorited.value
        ? (articleDetail.value.favoriteCount || 0) + 1
        : Math.max(0, (articleDetail.value.favoriteCount || 0) - 1)
    }

    // 保存到本地存储
    const userId = userStore.userInfo?.id
    if (userId) {
      const favoriteKey = `article_favorite_${articleId.value}_${userId}`
      uni.setStorageSync(favoriteKey, isFavorited.value.toString())
    }

    uni.showToast({
      title: isFavorited.value ? '收藏成功' : '取消收藏',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('收藏操作失败:', error)
    // 恢复原始状态
    isFavorited.value = !isFavorited.value
    uni.showToast({
      title: '操作失败，请重试',
      icon: 'none',
    })
  }
}

// 分享
function handleShare() {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

// 跳转到评论页面
function goToComment() {
  uni.navigateTo({
    url: `/pages/normal/healthcare/comment?id=${articleId.value}`,
  })
}
</script>

<template>
  <view class="healthcare-detail-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navigator" :style="{ paddingTop: `${safeAreaInsets.top}px` }">
      <view class="nav-content">
        <view class="nav-left" @click="goBack">
          <uni-icons type="arrow-left" size="24" color="#333" />
        </view>
        <view class="nav-title">
          {{ contentType === 'case' ? '案例详情' : '文章详情' }}
        </view>
        <view class="nav-right" />
      </view>
    </view>

    <!-- 内容区域 - 直接显示内容，不显示加载失败状态 -->
    <view v-if="articleDetail" class="content-container">
      <!-- 可选的加载指示器，不影响内容显示 -->
      <view v-if="detailLoading" class="loading-overlay">
        <uni-loading class="loading" type="ring" color="#1989fa" />
      </view>

      <!-- 文章头部信息 -->
      <view class="article-header">
        <text class="article-title">{{ articleDetail.title }}</text>
        <view class="article-meta">
          <text class="meta-item">{{ articleDetail.author || '未知作者' }}</text>
          <text class="meta-item">{{ articleDetail.publishTime || '' }}</text>
          <text class="meta-item">{{ articleDetail.readTime || 0 }}分钟阅读</text>
        </view>
        <image v-if="articleDetail.coverImageUrl" :src="articleDetail.coverImageUrl" class="article-cover" />
        <text class="article-summary">{{ articleDetail.summary }}</text>

        <!-- 标签 -->
        <view v-if="articleDetail.tags && articleDetail.tags.length > 0" class="article-tags">
          <view v-for="tag in articleDetail.tags" :key="tag" class="tag">
            {{ tag }}
          </view>
        </view>
      </view>

      <!-- 文章内容 -->
      <view class="article-content" v-html="articleDetail.content" />

      <!-- 底部操作栏 -->
      <view class="bottom-bar">
        <view class="action-item" @click="goToComment">
          <uni-icons type="chat-filled" :size="24" color="#666" />
          <text class="action-text">{{ articleDetail.commentCount || 0 }}</text>
        </view>
        <view class="action-item" @click="handleLike">
          <uni-icons type="heart" :size="24" :color="isLiked ? '#ff4d4f' : '#666'" />
          <text class="action-text" :class="isLiked ? 'liked' : ''">{{ articleDetail.likeCount || 0 }}</text>
        </view>
        <view class="action-item" @click="handleFavorite">
          <uni-icons type="star" :size="24" :color="isFavorited ? '#ffb400' : '#666'" />
          <text class="action-text" :class="isFavorited ? 'favorited' : ''">{{ articleDetail.favoriteCount || 0 }}</text>
        </view>
        <view class="action-item" @click="handleShare">
          <uni-icons type="share-social" :size="24" color="#666" />
          <text class="action-text">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.healthcare-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.custom-navigator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
}

.nav-left,
.nav-right {
  width: 40px;
}

/* 覆盖在内容上的加载指示器，不影响内容显示 */
.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
}

.nav-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  flex: 1;
  text-align: center;
}

.content-container {
  padding-top: calc(44px + var(--safe-area-inset-top));
  padding-bottom: 60px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.article-header {
  padding: 16px;
  background-color: #fff;
}

.article-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.meta-item {
  font-size: 12px;
  color: #999;
}

.article-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.article-summary {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  color: #1989fa;
  background-color: #e6f7ff;
  padding: 4px 8px;
  border-radius: 4px;
}

.article-content {
  padding: 16px;
  background-color: #fff;
  margin-top: 8px;
}

.article-content :deep(h3) {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 16px 0 8px 0;
}

.article-content :deep(p) {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  margin: 8px 0;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.action-text {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.action-text.liked {
  color: #ff4d4f;
}

.action-text.favorited {
  color: #ffb400;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  padding: 0 20px;
}

.error-text {
  margin: 16px 0;
  color: #666;
  font-size: 14px;
}

.retry-btn {
  margin-top: 16px;
  background-color: #1989fa;
  color: #fff;
}
</style>
