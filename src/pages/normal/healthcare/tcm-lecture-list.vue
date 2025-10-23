<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面配置
definePage({
  style: {
    navigationBarTitleText: '视频课堂',
    backgroundColor: '#F8F9FA',
  },
})

// 定义视频课程数据接口
interface TcmLecture {
  id: number
  title: string
  coverImageUrl: string
  playCount: number
  duration?: string
  isFree: boolean
  instructor?: string
}

// 页面状态
const searchKeyword = ref('')
const currentTab = ref('全部')
const lectureList = ref<TcmLecture[]>([])
const loading = ref(false)
const currentPage = ref(1)
const hasMore = ref(true)

// 分类标签
const tabs = ['全部', '热门', '免费', '付费']

// 模拟视频课程数据
const mockLectures: TcmLecture[] = [
  {
    id: 1,
    title: '口臭、脚臭、腋下臭？可能是湿气惹的祸',
    coverImageUrl: '/static/images/tcm-lecture1.png',
    playCount: 7549,
    duration: '45分钟',
    isFree: true,
    instructor: '国豪中医',
  },
  {
    id: 2,
    title: '手脚冰凉不只是冬天！中医调理方法',
    coverImageUrl: '/static/images/tcm-lecture2.png',
    playCount: 5632,
    duration: '38分钟',
    isFree: true,
    instructor: '国豪中医',
  },
  {
    id: 3,
    title: '长寿与身体先知道这种"感觉"',
    coverImageUrl: '/static/images/tcm-lecture3.png',
    playCount: 3245,
    duration: '52分钟',
    isFree: true,
    instructor: '国豪中医',
  },
  {
    id: 4,
    title: '中医养生之道：四季养生的基本原则',
    coverImageUrl: '/static/images/tcm-lecture4.png',
    playCount: 8976,
    duration: '48分钟',
    isFree: false,
    instructor: '国豪中医',
  },
]

// 过滤后的课程列表
const filteredLectures = computed(() => {
  let filtered = [...lectureList.value]

  // 搜索过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(lecture =>
      lecture.title.includes(searchKeyword.value),
    )
  }

  // 标签过滤
  if (currentTab.value === '热门') {
    filtered = filtered.sort((a, b) => b.playCount - a.playCount)
  }
  else if (currentTab.value === '免费') {
    filtered = filtered.filter(lecture => lecture.isFree)
  }
  else if (currentTab.value === '付费') {
    filtered = filtered.filter(lecture => !lecture.isFree)
  }

  return filtered
})

// 获取课程列表
async function fetchLectures() {
  if (loading.value || !hasMore.value)
    return

  loading.value = true
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    // 使用模拟数据
    if (currentPage.value === 1) {
      lectureList.value = mockLectures
    }
    else {
      // 模拟加载更多
      lectureList.value.push(...mockLectures.map(lecture => ({
        ...lecture,
        id: lecture.id + (currentPage.value - 1) * 10,
      })))
    }

    // 模拟没有更多数据
    if (currentPage.value >= 3) {
      hasMore.value = false
    }

    currentPage.value++
  }
  catch (error) {
    console.error('获取课程列表失败:', error)
    uni.showToast({
      title: '获取课程失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

// 处理课程点击
function handleLectureClick(lecture: TcmLecture) {
  uni.navigateTo({
    url: `/pages/normal/healthcare/tcm-lecture-detail?id=${lecture.id}`,
  })
}

// 处理搜索
function handleSearch() {
  currentPage.value = 1
  hasMore.value = true
  fetchLectures()
}

// 清空搜索
function clearSearch() {
  searchKeyword.value = ''
  handleSearch()
}

// 处理标签切换
function handleTabChange(tab: string) {
  currentTab.value = tab
  // 切换标签时重新加载数据
  currentPage.value = 1
  hasMore.value = true
  fetchLectures()
}

// 加载更多
function loadMore() {
  if (!loading.value && hasMore.value) {
    fetchLectures()
  }
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 页面加载时获取数据
onLoad(() => {
  fetchLectures()
})
</script>

<template>
  <view class="tcm-lecture-list-page min-h-screen bg-gray-50">
    <!-- 返回栏 -->
    <view class="sticky top-0 z-20 flex items-center justify-center bg-white px-4 py-3 text-lg font-medium">
      <uni-icons class="absolute left-4 text-gray-600" type="back" size="20" @click="handleBack" />
      视频课堂
    </view>

    <!-- 搜索框 -->
    <view class="sticky top-[56px] z-10 border-b border-gray-100 bg-white px-4 py-3">
      <view class="relative">
        <input
          v-model="searchKeyword"
          class="w-full border border-gray-200 rounded-lg bg-gray-50 py-2.5 pl-10 pr-12 text-sm"
          placeholder="搜索养生关键词"
          @confirm="handleSearch"
        >
        <uni-icons class="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2" type="search" size="20" />
        <uni-icons
          v-if="searchKeyword"
          class="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2"
          type="closeempty"
          size="20"
          @click="clearSearch"
        />
      </view>

      <!-- 分类标签 -->
      <view class="mt-3 flex overflow-x-auto space-x-2">
        <view
          v-for="tab in tabs"
          :key="tab"
          class="flex-shrink-0 rounded-full px-4 py-1.5 text-sm"
          :class="{
            'bg-orange-100 text-orange-600': currentTab === tab,
            'bg-gray-100 text-gray-600': currentTab !== tab,
          }"
          @click="handleTabChange(tab)"
        >
          {{ tab }}
        </view>
      </view>
    </view>

    <!-- 课程列表 -->
    <view class="px-4 py-3">
      <view
        v-for="lecture in filteredLectures"
        :key="lecture.id"
        class="mb-4 overflow-hidden rounded-lg bg-white shadow-sm"
        @click="handleLectureClick(lecture)"
      >
        <!-- 课程封面 -->
        <view class="relative">
          <image :src="lecture.coverImageUrl" class="h-48 w-full object-cover" />
          <view class="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
            {{ lecture.duration || '0分钟' }}
          </view>
          <view v-if="lecture.isFree" class="absolute left-2 top-2 rounded bg-orange-500 px-1.5 py-0.5 text-xs text-white">
            免费
          </view>
          <!-- 播放图标 -->
          <view class="absolute inset-0 flex items-center justify-center">
            <view class="h-12 w-12 flex items-center justify-center rounded-full bg-black/40">
              <uni-icons type="play" size="24" color="white" />
            </view>
          </view>
        </view>

        <!-- 课程信息 -->
        <view class="p-3">
          <view class="mb-2 text-base font-medium leading-tight">
            {{ lecture.title }}
          </view>
          <view class="flex items-center justify-between text-sm text-gray-500">
            <view class="flex items-center">
              <uni-icons type="eye-filled" size="12" class="mr-1" />
              <text>{{ lecture.playCount }}人已观看</text>
            </view>
            <view>{{ lecture.instructor || '国豪中医' }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载更多 -->
    <view v-if="hasMore" class="py-4 text-center text-sm text-gray-500">
      <view v-if="loading">
        加载中...
      </view>
      <view v-else @click="loadMore">
        点击加载更多
      </view>
    </view>
    <view v-else class="py-4 text-center text-sm text-gray-400">
      没有更多内容了
    </view>
  </view>
</template>
