<script lang="ts" setup>
import SearchBar from '@/components/SearchBar'
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

const current = ref<number>(0)

// 修改tabs数据，对应图片中的四个tab
const tabWithBadge = ref(0)
const tabsWithBadge = ref([
  {
    title: '气节养生',
  },
  {
    title: '中医新知',
  },
  {
    title: '案例分享',
  },
  {
    title: '视频课堂',
  },
])

// 卡片数据，根据不同tab显示不同内容
const cardData = ref({
  0: [ // 气节养生
    {
      id: 1,
      title: '雨水',
      subtitle: '春捂下厚上且薄',
      description: '调畅情志以养肝',
      image: '/static/healthcare/rainwater.png',
      tag: '雨水',
    },
    {
      id: 2,
      title: '清明',
      subtitle: '广步于庭莫久卧',
      description: '时令青蒿服之宜',
      image: '/static/healthcare/qingming.png',
      tag: '清明',
    },
    {
      id: 3,
      title: '立夏',
      subtitle: '转眼运目好入眠',
      description: '晨起清爽多接触',
      image: '/static/healthcare/lixia.png',
      tag: '立夏',
    },
  ],
  1: [ // 中医新知
    {
      id: 4,
      title: '中医理论',
      subtitle: '阴阳五行学说',
      description: '了解中医基础理论',
      image: '/static/healthcare/theory.png',
      tag: '理论',
    },
    {
      id: 5,
      title: '经络穴位',
      subtitle: '人体经络分布',
      description: '掌握重要穴位功效',
      image: '/static/healthcare/meridian.png',
      tag: '经络',
    },
  ],
  2: [ // 案例分享
    {
      id: 6,
      title: '失眠调理',
      subtitle: '中医治疗失眠案例',
      description: '通过中药调理改善睡眠',
      image: '/static/healthcare/insomnia.png',
      tag: '案例',
    },
  ],
  3: [ // 视频课堂
    {
      id: 7,
      title: '养生功法',
      subtitle: '八段锦教学视频',
      description: '跟随视频学习养生功法',
      image: '/static/healthcare/video.png',
      tag: '视频',
    },
  ],
})

// 当前显示的卡片列表
const currentCards = computed(() => {
  return cardData.value[tabWithBadge.value] || []
})

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索')
  // 在这里添加搜索逻辑
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
}

// 卡片点击事件
function handleCardClick(card: any) {
  console.log('点击卡片:', card)
  // 这里可以添加跳转到详情页的逻辑
}
</script>

<template root="uniKuRoot">
  <view class="page-container" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 搜索栏 -->
      <SearchBar
        @search="handleSearch"
        @click="handleSearchBarClick"
      />

      <!-- 轮播图 -->
      <view class="px-[28rpx] pt-4">
        <wd-swiper v-model:current="current" height="280rpx" :list="swiperList" autoplay @click="handleClick" @change="onChange" />
      </view>

      <!-- Tabs -->
      <view class="px-[28rpx] pb-4 pt-4">
        <wd-tabs
          v-model="tabWithBadge"
          auto-line-width
          animated
          slidable="always"
          color="#8C2303"
          inactive-color="#9FA9B5"
          line-color="#8C2303"
          @change="handleChange"
        >
          <wd-tab v-for="(item, index) in tabsWithBadge" :key="index" :title="item.title" />
        </wd-tabs>
      </view>
    </view>

    <!-- 可滚动的卡片列表区域 -->
    <view class="content-scroll">
      <scroll-view scroll-y class="scroll-area" enable-back-to-top>
        <view class="px-[28rpx] pb-4 space-y-3">
          <view
            v-for="card in currentCards"
            :key="card.id"
            class="healthcare-card flex items-center justify-between rounded-3xl bg-white p-5 shadow-lg"
            @click="handleCardClick(card)"
          >
            <!-- 左侧内容 -->
            <view class="flex-1 pr-4">
              <view class="mb-2 text-3xl text-gray-800 font-bold">
                {{ card.title }}
              </view>
              <view class="mb-1 text-base text-gray-600 leading-relaxed">
                {{ card.subtitle }}
              </view>
              <view class="text-sm text-gray-500 leading-relaxed">
                {{ card.description }}
              </view>
            </view>

            <!-- 右侧图片和标签 -->
            <view class="relative">
              <view class="card-image-container h-24 w-24 flex items-center justify-center rounded-full">
                <!-- 这里可以放置实际的图片，现在用文字代替 -->
                <text class="text-xl text-gray-700 font-bold">{{ card.tag }}</text>
              </view>
              <!-- 右上角的标签 -->
              <view class="card-tag absolute rounded-full px-2 py-1 text-xs text-white font-medium -right-2 -top-1">
                {{ card.tag }}
              </view>
            </view>
          </view>

          <!-- 空状态提示 -->
          <view v-if="currentCards.length === 0" class="flex flex-col items-center justify-center py-20">
            <text class="text-base text-gray-400">暂无内容</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 页面容器样式
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f6e2d3, transparent);
  overflow: hidden; // 防止整页滚动
}

// 固定头部区域
.header-fixed {
  flex-shrink: 0;
  background: linear-gradient(to bottom, #f6e2d3, transparent);
  z-index: 10;
}

// 内容滚动区域
.content-scroll {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.scroll-area {
  height: 100%;
  width: 100%;
}

// 自定义样式
.healthcare-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
  }
}

.card-image-container {
  background: linear-gradient(135deg, #e3f2fd 0%, #e8f5e8 100%);
  position: relative;
  overflow: hidden;
}

.card-tag {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

// Tab样式优化
:deep(.wd-tabs) {
  .wd-tab {
    font-weight: 500;
  }

  .wd-tab--active {
    color: #8c2303;
    font-weight: 600;
  }

  // 底部指示线样式
  .wd-tabs__line {
    background-color: #8c2303 !important;
    height: 3px !important;
    border-radius: 2px !important;
  }

  // Tab容器样式
  .wd-tabs__nav {
    background-color: transparent;
  }
}
</style>
