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
      title: '雨水节气养生指南',
      desc: '春捂下厚上且薄，调畅情志以养肝。雨水时节，天气变化无常，要注意保暖，同时调节情绪，保持心情舒畅。',
      userAvatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
      label: ['雨水', '春季养生', '情志调理'],
      collectionCount: 128,
      likeCount: 256,
    },
    {
      id: 2,
      title: '清明时节养生要点',
      desc: '广步于庭莫久卧，时令青蒿服之宜。清明时节，阳气生发，适合户外运动，可适当食用时令蔬菜。',
      userAvatar: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=center',
      label: ['清明', '户外运动', '时令食材'],
      collectionCount: 89,
      likeCount: 167,
    },
    {
      id: 3,
      title: '立夏养生保健法',
      desc: '转眼运目好入眠，晨起清爽多接触。立夏后天气渐热，要注意养心安神，保证充足睡眠。',
      userAvatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
      label: ['立夏', '养心安神', '睡眠调理'],
      collectionCount: 203,
      likeCount: 445,
    },
  ],
  1: [ // 中医新知
    {
      id: 4,
      title: '中医阴阳五行理论详解',
      desc: '深入了解中医基础理论，阴阳五行学说在现代养生中的应用，帮助您更好地理解中医养生原理。',
      userAvatar: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
      label: ['中医理论', '阴阳五行', '基础知识'],
      collectionCount: 156,
      likeCount: 289,
    },
    {
      id: 5,
      title: '人体经络穴位图解',
      desc: '详细介绍人体十二经络分布，常用穴位的位置和功效，学会简单的穴位按摩保健方法。',
      userAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
      label: ['经络穴位', '按摩保健', '图解教学'],
      collectionCount: 234,
      likeCount: 378,
    },
    {
      id: 6,
      title: '现代中医诊断技术',
      desc: '了解现代中医结合科技的诊断方法，包括舌诊、脉诊的现代化应用，提高诊断准确性。',
      userAvatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center',
      label: ['现代中医', '诊断技术', '科技应用'],
      collectionCount: 67,
      likeCount: 134,
    },
  ],
  2: [ // 案例分享
    {
      id: 7,
      title: '中医调理失眠成功案例',
      desc: '分享一位长期失眠患者通过中药调理、穴位按摩、生活调节等综合方法，成功改善睡眠质量的真实案例。',
      userAvatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
      label: ['失眠调理', '成功案例', '综合治疗'],
      collectionCount: 189,
      likeCount: 356,
    },
    {
      id: 8,
      title: '脾胃虚弱的中医调理',
      desc: '通过食疗、中药、穴位按摩等方法，帮助脾胃虚弱患者恢复消化功能，提高生活质量的案例分享。',
      userAvatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
      label: ['脾胃调理', '食疗', '消化健康'],
      collectionCount: 145,
      likeCount: 267,
    },
  ],
  3: [ // 视频课堂
    {
      id: 9,
      title: '八段锦养生功法教学',
      desc: '跟随专业老师学习传统八段锦功法，通过视频详细讲解每个动作要领，适合初学者练习。',
      userAvatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
      label: ['八段锦', '养生功法', '视频教学'],
      collectionCount: 312,
      likeCount: 567,
    },
    {
      id: 10,
      title: '太极拳入门教程',
      desc: '从基础站桩开始，逐步学习太极拳的基本动作，通过视频演示帮助您掌握太极拳的精髓。',
      userAvatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
      label: ['太极拳', '入门教程', '基础动作'],
      collectionCount: 278,
      likeCount: 489,
    },
  ],
})

// 选中的卡片ID集合
const selectedCards = ref<Set<number>>(new Set())

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
  // 例如：uni.navigateTo({ url: `/pages/detail/detail?id=${card.id}` })
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
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
      <view class="px-[28rpx] pb-2 pt-4">
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
        <view class="mb-[32rpx]">
          <block v-for="(item, index) in currentCards" :key="index">
            <view class="mx-[28rpx] mb-[24rpx] rounded-[24rpx] bg-white p-[32rpx] shadow-[0_4rpx_20rpx_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] active:shadow-[0_2rpx_10rpx_rgba(0,0,0,0.12)]" @click="handleCardClick(item)">
              <view class="flex">
                <view class="m-[8rpx] w-full pt-[4rpx]">
                  <view class="line-clamp-1 text-justify text-[32rpx] font-bold">
                    <text class="">{{ item.title }}</text>
                  </view>
                  <view class="min-h-[90rpx] pt-[4rpx]">
                    <text class="line-clamp-2 text-justify text-[28rpx] text-[#999999] leading-[1.5]">
                      {{ item.desc }}
                    </text>
                  </view>
                  <view class="mt-[8rpx] flex items-center justify-between">
                    <view class="flex flex-1 flex-wrap items-center">
                      <view class="mb-[6rpx] mr-[8rpx] inline-block rounded-[12rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br px-[10rpx] py-[4rpx] text-[20rpx] text-white leading-[1.2]">
                        <text class="mr-[2rpx] opacity-80">#</text>{{ item.label[0] }}
                      </view>
                    </view>
                    <view class="flex items-center pt-[5rpx] text-center text-[#999999]">
                      <text class="pr-[5rpx] text-[28rpx] leading-none">🔥</text>
                      <text class="pr-[8rpx] text-[28rpx]">{{ item.collectionCount }}</text>
                      <text class="pr-[5rpx] text-[28rpx] leading-none">❤️</text>
                      <text class="text-[28rpx]">{{ item.likeCount }}</text>
                    </view>
                  </view>
                </view>
                <view class="relative m-[8rpx] h-[160rpx] w-[240rpx] overflow-hidden rounded-[16rpx] bg-cover bg-center bg-no-repeat" :style="`background-image:url(${item.userAvatar})`">
                  <view class="h-full w-full rounded-[16rpx] from-[rgba(140,35,3,0.1)] to-[rgba(184,68,31,0.1)] bg-gradient-to-br" />
                </view>
              </view>
            </view>
          </block>

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
// Tab样式优化
:deep(.wd-tabs) {
  .wd-tabs__nav-item.is-active {
    font-size: 30rpx;
  }

  // 底部指示线样式
  .wd-tabs__line {
    background-color: #8c2303 !important;
    height: 3px !important;
    border-radius: 2px !important;
  }
}
</style>
