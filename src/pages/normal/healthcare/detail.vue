<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from 'alova/client'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '文章详情',
    disableScroll: true,
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

// 用户store
const userStore = useUserStore()

// 文章详情数据
const articleDetail = ref<HealthArticleDetail | null>(null)
const isLiked = ref(false)
const isFavorited = ref(false)

// 获取文章详情
const {
  loading: detailLoading,
  send: fetchArticleDetail,
} = useRequest(
  (id: number) => Apis.app_HealthArticle.apiApp_healtharticleDetailGet({
    params: {
      Id: id,
    },
    meta: {
      allowAnonymous: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('文章详情数据:', response)
  articleDetail.value = response.result || response.data || response

  // 增加浏览量
  if (articleDetail.value) {
    articleDetail.value.viewCount = (articleDetail.value.viewCount || 0) + 1
  }

  // 如果用户已登录，获取用户的点赞和收藏状态
  if (userStore.isLoggedIn) {
    fetchUserInteractionStatus()
  }
})

// 获取用户的点赞和收藏状态
// 注意：由于后端API设计，我们需要通过本地存储或其他方式来记录用户状态
// 这里先使用简单的本地存储方案
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

// 在onLoad中获取参数
onLoad((options: any) => {
  console.log('页面参数:', options)
  articleId.value = Number(options.id) || 0
  console.log('文章ID:', articleId.value)

  if (articleId.value && articleId.value > 0) {
    console.log('开始获取文章详情，ID:', articleId.value)
    fetchArticleDetail(articleId.value)
  }
  else {
    console.error('无效的文章ID:', options.id)
    uni.showToast({
      title: '文章ID不存在',
      icon: 'none',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
})

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

// 点赞API请求
const {
  loading: likeLoading,
  send: performLike,
} = useRequest(
  () => Apis.app_HealthArticle.apiApp_healtharticleLikeArticleidUseridPost({
    pathParams: {
      articleId: articleId.value,
      userId: userStore.userInfo?.id || 0,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('点赞操作成功:', response)
  // 切换点赞状态
  isLiked.value = !isLiked.value
  if (articleDetail.value) {
    if (isLiked.value) {
      articleDetail.value.likeCount = (articleDetail.value.likeCount || 0) + 1
    }
    else {
      articleDetail.value.likeCount = Math.max((articleDetail.value.likeCount || 0) - 1, 0)
    }
  }

  // 保存状态到本地存储
  if (userStore.userInfo?.id) {
    const likeKey = `article_like_${articleId.value}_${userStore.userInfo.id}`
    uni.setStorageSync(likeKey, isLiked.value.toString())
  }

  uni.showToast({
    title: isLiked.value ? '点赞成功' : '取消点赞',
    icon: 'success',
  })
}).onError((error: any) => {
  console.error('点赞操作失败:', error)
  uni.showToast({
    title: '操作失败，请重试',
    icon: 'none',
  })
})

// 点赞功能
function handleLike() {
  if (!articleDetail.value || likeLoading.value)
    return

  // 检查登录状态
  if (!checkLoginStatus())
    return

  // 调用点赞API
  performLike()
}

// 收藏API请求
const {
  loading: favoriteLoading,
  send: performFavorite,
} = useRequest(
  () => Apis.app_HealthArticle.apiApp_healtharticleFavoriteArticleidUseridPost({
    pathParams: {
      articleId: articleId.value,
      userId: userStore.userInfo?.id || 0,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('收藏操作成功:', response)
  // 切换收藏状态
  isFavorited.value = !isFavorited.value
  if (articleDetail.value) {
    if (isFavorited.value) {
      articleDetail.value.favoriteCount = (articleDetail.value.favoriteCount || 0) + 1
    }
    else {
      articleDetail.value.favoriteCount = Math.max((articleDetail.value.favoriteCount || 0) - 1, 0)
    }
  }

  // 保存状态到本地存储
  if (userStore.userInfo?.id) {
    const favoriteKey = `article_favorite_${articleId.value}_${userStore.userInfo.id}`
    uni.setStorageSync(favoriteKey, isFavorited.value.toString())
  }

  uni.showToast({
    title: isFavorited.value ? '收藏成功' : '取消收藏',
    icon: 'success',
  })
}).onError((error: any) => {
  console.error('收藏操作失败:', error)
  uni.showToast({
    title: '操作失败，请重试',
    icon: 'none',
  })
})

// 收藏功能
function handleFavorite() {
  if (!articleDetail.value || favoriteLoading.value)
    return

  // 检查登录状态
  if (!checkLoginStatus())
    return

  // 调用收藏API
  performFavorite()
}

// 分享功能
function handleShare() {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 0,
    href: '',
    title: articleDetail.value?.title || '',
    summary: articleDetail.value?.summary || '',
    imageUrl: articleDetail.value?.coverImageUrl || '',
    success: (res) => {
      console.log('分享成功:', res)
      uni.showToast({
        title: '分享成功',
        icon: 'success',
      })
    },
    fail: (err) => {
      console.log('分享失败:', err)
      uni.showToast({
        title: '分享失败',
        icon: 'none',
      })
    },
  })
}

// 格式化发布时间
function formatPublishTime(time?: string) {
  if (!time)
    return ''

  const date = new Date(time)
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
    return date.toLocaleDateString('zh-CN')
  }
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen bg-gray-50" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <view class="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="flex items-center justify-between px-4 py-3">
        <view class="flex items-center" @click="goBack">
          <text class="text-2xl">←</text>
          <text class="ml-2 text-base">返回</text>
        </view>
        <text class="text-lg font-medium">文章详情</text>
        <view class="w-16" />
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="pt-16">
      <!-- 加载状态 -->
      <view v-if="detailLoading" class="flex flex-col items-center justify-center py-20">
        <text class="text-base text-gray-400">加载中...</text>
      </view>

      <!-- 文章内容 -->
      <view v-else-if="articleDetail" class="pb-20">
        <!-- 文章头部 -->
        <view class="bg-white p-6">
          <!-- 标题 -->
          <text class="text-xl font-bold leading-relaxed">{{ articleDetail.title }}</text>

          <!-- 文章信息 -->
          <view class="mt-4 flex items-center justify-between text-sm text-gray-500">
            <view class="flex items-center">
              <text>{{ formatPublishTime(articleDetail.publishTime) }}</text>
              <text class="mx-2">·</text>
              <text>阅读 {{ articleDetail.viewCount || 0 }}</text>
            </view>
            <view v-if="articleDetail.readTime" class="text-gray-400">
              <text>约{{ articleDetail.readTime }}分钟</text>
            </view>
          </view>

          <!-- 标签 -->
          <view v-if="articleDetail.tags && articleDetail.tags.length > 0" class="mt-4 flex flex-wrap">
            <view
              v-for="tag in articleDetail.tags"
              :key="tag"
              class="mb-2 mr-2 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-600"
            >
              #{{ tag }}
            </view>
          </view>
        </view>

        <!-- 封面图片 -->
        <view v-if="articleDetail.coverImageUrl" class="bg-white px-6 pb-6">
          <image
            :src="articleDetail.coverImageUrl"
            mode="widthFix"
            class="w-full rounded-lg"
          />
        </view>

        <!-- 文章内容 -->
        <view class="mt-2 bg-white p-6">
          <!-- 摘要 -->
          <view v-if="articleDetail.summary" class="mb-6 rounded-lg bg-gray-50 p-4">
            <text class="text-sm text-gray-600 font-medium">摘要</text>
            <text class="mt-2 block text-sm text-gray-700 leading-relaxed">{{ articleDetail.summary }}</text>
          </view>

          <!-- 正文内容 -->
          <view class="prose prose-sm max-w-none">
            <rich-text
              :nodes="articleDetail.content"
              class="text-base text-gray-800 leading-relaxed"
            />
          </view>
        </view>

        <!-- 互动统计 -->
        <view class="mt-2 bg-white p-6">
          <view class="flex items-center justify-around text-center">
            <view class="flex flex-col items-center">
              <text class="text-lg font-medium">{{ articleDetail.viewCount || 0 }}</text>
              <text class="text-sm text-gray-500">浏览</text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-lg font-medium">{{ articleDetail.likeCount || 0 }}</text>
              <text class="text-sm text-gray-500">点赞</text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-lg font-medium">{{ articleDetail.favoriteCount || 0 }}</text>
              <text class="text-sm text-gray-500">收藏</text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-lg font-medium">{{ articleDetail.commentCount || 0 }}</text>
              <text class="text-sm text-gray-500">评论</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 错误状态 -->
      <view v-else class="flex flex-col items-center justify-center py-20">
        <text class="text-base text-gray-400">文章不存在或已删除</text>
        <view class="mt-4 rounded-lg bg-orange-500 px-6 py-2" @click="goBack">
          <text class="text-white">返回</text>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view v-if="articleDetail" class="safe-area-inset-bottom fixed bottom-0 left-0 right-0 h-[100rpx] border-t border-gray-200 bg-[#FD6302] px-4 py-3">
      <view class="flex items-center justify-between">
        <view class="flex items-center space-x-6">
          <!-- 点赞 -->
          <view
            class="flex items-center"
            :class="[likeLoading ? 'opacity-50' : '']"
            @click="handleLike"
          >
            <text class="mr-1 text-xl" :class="[isLiked ? 'text-red-500' : 'text-white']">
              {{ likeLoading ? '⏳' : (isLiked ? '❤️' : '🤍') }}
            </text>
            <text class="text-sm" :class="[isLiked ? 'text-red-500' : 'text-white']">
              {{ articleDetail.likeCount || 0 }}
            </text>
          </view>

          <!-- 收藏 -->
          <view
            class="flex items-center"
            :class="[favoriteLoading ? 'opacity-50' : '']"
            @click="handleFavorite"
          >
            <text class="mr-1 text-xl" :class="[isFavorited ? 'text-yellow-500' : 'text-white']">
              {{ favoriteLoading ? '⏳' : (isFavorited ? '⭐' : '☆') }}
            </text>
            <text class="text-sm" :class="[isFavorited ? 'text-yellow-500' : 'text-white']">
              {{ articleDetail.favoriteCount || 0 }}
            </text>
          </view>

          <!-- 分享 -->
          <!-- <view class="flex items-center" @click="handleShare">
            <text class="mr-1 text-xl text-gray-400">📤</text>
            <text class="text-sm text-gray-600">分享</text>
          </view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.prose {
  :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8rpx;
    margin: 1rem 0;
  }

  :deep(blockquote) {
    border-left: 4px solid #f59e0b;
    padding-left: 1rem;
    margin: 1rem 0;
    background-color: #fef3c7;
    padding: 1rem;
    border-radius: 8rpx;
  }
}

.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
