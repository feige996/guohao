<script lang="ts" setup>
import type { App_HealthArticle } from '@/api/guohao-api/globals.d'
import { useRequest } from 'alova/client'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
    disableScroll: true, // 禁用页面滚动
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})

// 定义文章类型接口
// interface HealthArticle {
//   id: number
//   title: string
//   summary: string
//   content?: string
//   coverImageUrl?: string
//   viewCount: number
//   likeCount: number
//   favoriteCount: number
//   commentCount: number
//   tags?: string[]
//   categoryId?: number
//   publishTime?: string
//   isPublished: boolean
//   isRecommend: boolean
// }

// 定义分类接口
interface HealthCategory {
  id: number
  name: string
  description?: string
  parentId?: number
  orderNo: number
}

const current = ref<number>(0)

// 分类数据
const categories = ref<HealthCategory[]>([])
const tabWithBadge = ref(0)

// 动态tabs数据，从后端获取分类
const tabsWithBadge = ref<Array<{ title: string, categoryId: number | null }>>([])

// 初始化时显示加载状态的tabs
tabsWithBadge.value = [{ title: '加载中...', categoryId: null }]

// 文章数据
const articles = ref<App_HealthArticle[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取分类列表
useRequest(
  () => Apis.app_HealthArticleCategory.apiApp_healtharticlecategoryListGet({
    params: {
      Name: undefined,
      ParentId: undefined,
    },
    meta: {
      allowAnonymous: true,
    },
  }),
  {
    immediate: true,
  },
).onSuccess((response: any) => {
  categories.value = (response.data as HealthCategory[]) || []
  console.log('分类数据:', categories.value)

  // 动态生成tabs数据
  if (categories.value.length > 0) {
    // 添加"全部"tab作为第一个
    const allTab = { title: '全部', categoryId: null }

    // 将分类转换为tabs
    const categoryTabs = categories.value
      .sort((a, b) => a.orderNo - b.orderNo) // 按排序号排序
      .map(cat => ({
        title: cat.name,
        categoryId: cat.id,
      }))

    // 组合tabs数据
    tabsWithBadge.value = [allTab, ...categoryTabs]

    console.log('生成的tabs:', tabsWithBadge.value)
  }
  else {
    // 如果没有分类数据，只显示"全部"tab
    tabsWithBadge.value = [{ title: '全部', categoryId: null }]
  }

  // 分类数据加载完成后，加载第一个tab的文章数据
  nextTick(() => {
    loadArticles()
  })
})

// 获取文章列表
const {
  loading: articlesLoading,
  send: fetchArticles,
} = useRequest(
  (categoryId?: number, page = 1, size = 10, keyword?: string) => Apis.app_HealthArticle.apiApp_healtharticlePagePost({
    data: {
      page,
      pageSize: size,
      categoryId,
      keyword,
      isPublished: true, // 只获取已发布的文章
      field: 'publishTime',
      order: 'desc', // 按发布时间倒序
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

  // 尝试从response.data中获取数据
  const data = response.data.items || response
  console.log('处理后的文章数据:', data)

  if (data?.records) {
    // 分页数据格式
    articles.value = data || []
    total.value = data.total || 0
    console.log('设置文章列表:', articles.value)
  }
  else if (Array.isArray(data)) {
    // 直接返回数组格式
    articles.value = data
    total.value = data.length
    console.log('设置文章列表(数组):', articles.value)
  }
  else {
    console.warn('未识别的文章数据格式:', data)
    articles.value = []
    total.value = 0
  }
})

// 当前显示的文章列表
const currentCards = computed(() => {
  console.log('计算currentCards - articles.value:', articles.value)
  console.log('计算currentCards - articles.value.length:', articles.value.length)

  const cards = articles.value.map(article => ({
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

  console.log('计算currentCards - 结果:', cards)
  return cards
})

// 搜索关键词
const searchKeyword = ref('')

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索:', searchKeyword.value)
  // 重新加载当前分类的文章，带上搜索关键词
  loadArticles()
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

const swiperList = ref([
  '/static/swiper/Swiper01.png',
])
function handleClick(e: any) {
  console.log(e)
}
function onChange(e: any) {
  console.log(e)
}

function handleChange(e: any) {
  console.log('切换tab:', e)
  tabWithBadge.value = e.index
  // 切换tab时加载对应分类的文章
  loadArticles()
}

// 加载文章数据
function loadArticles() {
  const currentTab = tabsWithBadge.value[tabWithBadge.value]
  const categoryId = currentTab?.categoryId || undefined

  console.log('加载文章 - 当前Tab:', currentTab)
  console.log('加载文章 - 分类ID:', categoryId)
  console.log('加载文章 - 页码:', currentPage.value)
  console.log('加载文章 - 搜索词:', searchKeyword.value)

  fetchArticles(categoryId, currentPage.value, pageSize.value, searchKeyword.value || undefined)
}

// 卡片点击事件
function handleCardClick(card: any) {
  console.log('点击卡片:', card)
  // 跳转到文章详情页
  uni.navigateTo({
    url: `/pages/normal/healthcare/detail?id=${card.id}`,
  })
}

// 页面加载完成后，加载第一个tab的数据
onMounted(() => {
  // 等待分类数据加载完成后再加载文章
  nextTick(() => {
    setTimeout(() => {
      loadArticles()
    }, 500) // 给分类数据一些加载时间
  })
})
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 搜索栏 -->
      <SearchBar
        v-model="searchKeyword"
        placeholder="搜索养生文章、中医知识等"
        @search="handleSearch"
        @click="handleSearchBarClick"
      />

      <!-- 轮播图 -->
      <view class="px-[28rpx] pt-4">
        <wd-swiper v-model:current="current" height="280rpx" :list="swiperList" autoplay @click="handleClick" @change="onChange" />
      </view>

      <!-- Tabs -->
      <view class="px-[28rpx] pb-2 pt-4">
        <wd-tabs auto-line-width swipeable animated slidable="always" :slidable-num="5" :map-num="6" @change="handleChange">
          <block v-for="(item, categoryId) in tabsWithBadge" :key="categoryId">
            <wd-tab :title="item.title">
              <!-- <view class="content">
                <view class="h-[200rpx]" />
                内容{{ item }}
              </view> -->
            </wd-tab>
          </block>
        </wd-tabs>
      </view>

      <!-- 可滚动的卡片列表区域 -->
      <view class="content-scroll">
        <scroll-view scroll-y class="scroll-area" enable-back-to-top>
          <!-- 加载状态 -->
          <view v-if="articlesLoading" class="flex flex-col items-center justify-center py-20">
            <text class="text-base text-gray-400">加载中...</text>
          </view>

          <!-- 空状态提示 -->
          <view v-else-if="currentCards.length === 0" class="flex flex-col items-center justify-center py-20">
            <text class="text-base text-gray-400">暂无内容</text>
          </view>

          <!-- 文章列表 -->
          <view v-else class="mb-[32rpx]">
            <block v-for="(item, index) in currentCards" :key="index">
              <view class="mx-[28rpx] mb-[24rpx] rounded-[24rpx] bg-white p-[32rpx] shadow-[0_4rpx_20rpx_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] active:shadow-[0_2rpx_10rpx_rgba(0,0,0,0.12)]" @click="handleCardClick(item)">
                <view class="flex">
                  <view class="m-[8rpx] w-full pt-[4rpx]">
                    <view class="line-clamp-1 text-justify font-bold text-[32rpx]">
                      <text class="">{{ item.title }}</text>
                    </view>
                    <view class="min-h-[90rpx] pt-[4rpx]">
                      <text class="line-clamp-2 text-justify text-[#999999] text-[28rpx] leading-[1.5]">
                        {{ item.desc }}
                      </text>
                    </view>
                    <view class="mt-[8rpx] flex items-center justify-between">
                      <view class="flex flex-1 flex-wrap items-center">
                        <view class="mb-[6rpx] mr-[8rpx] inline-block rounded-[12rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br px-[10rpx] py-[4rpx] text-white text-[20rpx] leading-[1.2]">
                          <text class="mr-[2rpx] opacity-80">#</text>{{ item.label[0] }}
                        </view>
                      </view>
                      <view class="flex items-center pt-[5rpx] text-center text-[#999999]">
                        <!-- 浏览量 -->
                        <text class="pr-[5rpx] leading-none text-[28rpx]">🔥</text>
                        <text class="pr-[8rpx] text-[28rpx]">{{ item.viewCount }}</text>
                        <!-- 点赞数 -->
                        <text class="pr-[5rpx] leading-none text-[28rpx]">❤️</text>
                        <text class="text-[28rpx]">{{ item.likeCount }}</text>
                        <!-- 收藏数 -->
                        <text class="pr-[5rpx] leading-none text-[28rpx]">❤️</text>
                        <text class="text-[28rpx]">{{ item.favoriteCount }}</text>
                      </view>
                    </view>
                  </view>
                  <view class="relative m-[8rpx] h-[160rpx] w-[240rpx] overflow-hidden rounded-[16rpx] bg-cover bg-center bg-no-repeat" :style="`background-image:url(${item.userAvatar})`">
                    <view class="h-full w-full rounded-[16rpx] from-[rgba(140,35,3,0.1)] to-[rgba(184,68,31,0.1)] bg-gradient-to-br" />
                  </view>
                </view>
              </view>
            </block>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// Tab样式优化
:deep(.wd-tabs) {
  // .wd-tabs__nav-item.is-active {
  //   font-size: 30rpx;
  // }

  /* 添加圆角 */
  border-radius: 16rpx; /* 或者使用其他值，如 8rpx, 12rpx, 20rpx 等 */
  // overflow: hidden; /* 确保内容不会超出圆角边界 */

  // 底部指示线样式
  .wd-tabs__line {
    background-color: #8c2303 !important;
    height: 3px !important;
    border-radius: 2px !important;
  }

  .uni-scroll-view {
    /* 隐藏滚动条 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 和 Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari 和 Opera */
    }
  }
}
</style>
