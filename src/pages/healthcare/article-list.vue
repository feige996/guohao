<script setup lang="ts">
import { computed, ref } from 'vue'
import useRequest from '@/hooks/useRequest'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '养生文章',
    backgroundColor: '#F8F9FA',
  },
})

// 定义文章数据接口
interface HealthArticle {
  id: number
  title: string
  summary: string
  coverImageUrl: string
  publishTime: string
  viewCount: number
  likeCount: number
  categoryName?: string
}

// 获取页面参数
const pageType = ref<string>('article') // 'article' | 'case'
const searchKeyword = ref('')
const currentTab = ref('全部')
const articleList = ref<HealthArticle[]>([])
const loading = ref(false)
const currentPage = ref(1)
const hasMore = ref(true)

// 分类标签
const tabs = ['全部', '热门', '最新', '分类']

// 模拟文章数据
const mockArticles: HealthArticle[] = [
  {
    id: 1,
    title: '老中医总结出的6条中医基础知识',
    summary: '中医学名: 中华医学,简称中医,世界非物质文化遗产...',
    coverImageUrl: '/static/images/health-article.png',
    publishTime: '2025-8-10',
    viewCount: 1234,
    likeCount: 56,
  },
  {
    id: 2,
    title: '中医基本常识，很有用，请好好收藏！',
    summary: '中医是中国传统医学，有着悠久的历史和丰富的理论体系...',
    coverImageUrl: '/static/images/case-study.png',
    publishTime: '2025-8-9',
    viewCount: 2345,
    likeCount: 78,
  },
  {
    id: 3,
    title: '中医养生之道：四季养生的基本原则',
    summary: '春生夏长秋收冬藏，顺应自然是养生的关键...',
    coverImageUrl: '/static/images/tcm-lecture.png',
    publishTime: '2025-8-8',
    viewCount: 3456,
    likeCount: 90,
  },
]

// 过滤后的文章列表
const filteredArticles = computed(() => {
  let filtered = [...articleList.value]

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(article =>
      article.title.includes(searchKeyword.value)
      || article.summary.includes(searchKeyword.value),
    )
  }

  // 标签过滤
  if (currentTab.value === '热门') {
    filtered = filtered.sort((a, b) => b.viewCount - a.viewCount)
  }
  else if (currentTab.value === '最新') {
    filtered = filtered.sort((a, b) =>
      new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime(),
    )
  }

  return filtered
})

// 获取文章列表
async function fetchArticles() {
  if (loading.value || !hasMore.value)
    return

  loading.value = true
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 这里应该是实际的API调用，现在使用模拟数据
    if (currentPage.value === 1) {
      articleList.value = mockArticles
    }
    else {
      // 模拟加载更多
      articleList.value.push(...mockArticles.map(article => ({
        ...article,
        id: article.id + (currentPage.value - 1) * 10,
      })))
    }

    // 模拟没有更多数据
    if (currentPage.value >= 3) {
      hasMore.value = false
    }

    currentPage.value++
  }
  catch (error) {
    console.error('获取文章列表失败:', error)
    uni.showToast({
      title: '获取文章失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 处理文章点击
function handleArticleClick(article: HealthArticle) {
  uni.navigateTo({
    url: `/pages/normal/healthcare/detail?id=${article.id}&type=${pageType.value}`,
  })
}

// 处理搜索
function handleSearch() {
  currentPage.value = 1
  hasMore.value = true
  fetchArticles()
}

// 清空搜索
function clearSearch() {
  searchKeyword.value = ''
  handleSearch()
}

// 处理标签切换
function handleTabChange(tab: string) {
  currentTab.value = tab
  // 如果是分类标签，可以进一步处理分类筛选逻辑
}

// 加载更多
function loadMore() {
  if (!loading.value && hasMore.value) {
    fetchArticles()
  }
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 页面加载时获取数据
onLoad((options: any) => {
  console.log('页面参数:', options)
  if (options.type) {
    pageType.value = options.type
  }
  fetchArticles()
})
</script>

<template>
  <view class="article-list-page min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <!-- 返回栏 -->
    <view class="sticky top-0 z-20 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <view class="h-12 flex items-center justify-between px-4">
        <view class="text-2xl text-gray-700" @click="handleBack">
          &lt;
        </view>
        <view class="text-lg text-gray-800 font-medium">
          养生文章
        </view>
        <view class="w-6" /> <!-- 占位元素，保持标题居中 -->
      </view>
    </view>
    <!-- 搜索框 -->
    <view class="sticky top-12 z-10 border-b border-gray-100 bg-white/80 backdrop-blur-sm px-4 py-3">
      <view class="relative mb-4 flex justify-center">
        <input
          v-model="searchKeyword"
          class="h-[32px] w-full rounded-full border-2 border-black bg-white py-2 pl-10 pr-12 text-sm transition-all duration-300 focus:border-primary focus:outline-none"
          placeholder="搜索养生关键词"
          @confirm="handleSearch"
        >
        <uni-icons class="absolute left-4 top-1/2 text-gray-400 -translate-y-1/2" type="search" size="18" />
        <uni-icons
          v-if="searchKeyword"
          class="absolute right-4 top-1/2 cursor-pointer text-gray-400 -translate-y-1/2 transition-transform duration-300 hover:scale-110"
          type="clear"
          size="18"
          @click="clearSearch"
        />
      </view>
      
      <!-- 矩形提示框 -->
      <view class="mb-3 rounded-md bg-[#FFF7E6] px-4 py-2 text-sm text-[#FF6A00]">
        提示：点击标签可快速筛选养生文章
      </view>

      <!-- 分类标签 -->
      <view class="mt-3 flex space-x-2">
        <view
          v-for="tab in tabs"
          :key="tab"
          class="whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors"
          :class="{
            'bg-orange-500 text-white': currentTab === tab,
            'bg-gray-100 text-gray-600': currentTab !== tab,
          }"
          @click="handleTabChange(tab)"
        >
          {{ tab }}
        </view>
      </view>
    </view>

    <!-- 文章列表 -->
    <view class="p-4">
      <view
        v-for="article in filteredArticles"
        :key="article.id"
        class="mb-4 overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm transition-all duration-300 active:scale-[0.98] hover:shadow-md"
        @click="handleArticleClick(article)"
      >
        <view class="p-4">
          <view class="mb-2 flex items-start">
            <view class="min-w-0 flex-1">
              <view class="line-clamp-2 text-base text-gray-800 font-bold">
                {{ article.title }}
              </view>
            </view>
            <image :src="article.coverImageUrl" class="ml-3 h-20 w-20 flex-shrink-0 rounded-lg object-cover" mode="aspectFill" />
          </view>

          <view class="mt-2 line-clamp-2 text-sm text-gray-500">
            {{ article.summary }}
          </view>

          <view class="mt-3 flex items-center justify-between text-xs text-gray-400">
            <view>{{ article.publishTime }}</view>
            <view class="flex items-center space-x-3">
              <view class="flex items-center">
                <uni-icons type="eye" size="12" class="mr-1" />
                <text>{{ article.viewCount }}</text>
              </view>
              <view class="flex items-center">
                <uni-icons type="heart" size="12" class="mr-1" />
                <text>{{ article.likeCount }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <view v-if="hasMore" class="py-4 text-center text-sm text-gray-500">
        <uni-load-more :status="loading ? 'loading' : 'more'" />
      </view>

      <!-- 没有更多数据 -->
      <view v-else-if="articleList.length > 0" class="py-4 text-center text-sm text-gray-500">
        没有更多数据了
      </view>

      <!-- 空状态 -->
      <view v-else class="py-12 text-center">
        <uni-icons type="circle" size="64" class="mb-4 text-gray-300" />
        <view class="text-gray-500">
          暂无文章
        </view>
      </view>
    </view>

    <!-- 触底加载 -->
    <scroll-view
      scroll-y
      class="min-h-screen"
      :show-scrollbar="false"
      @scrolltolower="loadMore"
    />
  </view>
</template>
