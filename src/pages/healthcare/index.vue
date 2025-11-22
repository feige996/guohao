<script lang="ts" setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Tabs from '@/components/Tabs/index.vue'
import SolarTermCard from './components/SolarTermCard/index.vue'
import SwiperList from './components/SwiperList.vue'

// 定义节气数据接口
interface SolarTerm {
  id: string
  name: string
  description: string
  imageUrl: string
  season: string
}

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
    disableScroll: true, // 禁用页面滚动
  },
})

const searchQuery = ref('')

const tabList = [
  {
    name: '气节养生',
    categoryId: 1,
  },
  {
    name: '中医新知',
    categoryId: 2,
  },
  {
    name: '案例分享',
    categoryId: 3,
  },
  {
    name: '视频课堂',
    categoryId: 4,
  },
]

const activeTabIndex = ref(0)

// 节气数据 - 从 solar-terms.vue 复制
const solarTerms = ref<SolarTerm[]>([
  {
    id: 'yushui',
    name: '雨水',
    description: '春捂下厚上且薄\n调畅情志以养肝',
    imageUrl: '/static/images/solar-terms/yushui.png',
    season: 'spring',
  },
  {
    id: 'qingming',
    name: '清明',
    description: '广步于庭度久卧\n时令青蒿藏之宜',
    imageUrl: '/static/images/solar-terms/qingming.png',
    season: 'spring',
  },
  {
    id: 'lixia',
    name: '立夏',
    description: '转眼返日好入眠\n晨起涌泉多擦擦',
    imageUrl: '/static/images/solar-terms/lixia.png',
    season: 'summer',
  },
  {
    id: 'qiufen',
    name: '秋分',
    description: '秋凉胃病渐增多\n南瓜煮粥保安康',
    imageUrl: '/static/images/solar-terms/qiufen.png',
    season: 'autumn',
  },
  {
    id: 'dahan',
    name: '大寒',
    description: '三九温补最当时\n羊肉萝卜不可少',
    imageUrl: '/static/images/solar-terms/dahan.png',
    season: 'winter',
  },
  {
    id: 'xiaohan',
    name: '小寒',
    description: '防寒保暖要做好\n适当进补养阳气',
    imageUrl: '/static/images/solar-terms/xiaohan.png',
    season: 'winter',
  },
])

// tab切换事件
function handleTabClick(index: number) {
  activeTabIndex.value = index
}

// 处理节气卡片点击
function handleTermClick(term: SolarTerm) {
  uni.navigateTo({
    url: `/pages/normal/healthcare/solar-term-detail?id=${term.id}`,
  })
}
</script>

<template>
  <view class="px-3 pt-4">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 搜索栏 -->
      <SearchBar placeholder="搜索养生文章、中医知识等" @search="searchQuery = $event" />

      <!-- 轮播图 -->
      <view class="mt-4">
        <SwiperList />
      </view>

      <!-- Tabs -->
      <view class="mt-4">
        <!-- Tabs切换区域 -->
        <Tabs
          :tab-list="tabList"
          @change="handleTabClick"
        />
      </view>
    </view>

    <!-- 节气卡片列表 -->
    <view class="mb-6 mt-4">
      <view class="flex flex-col items-center gap-4">
        <solar-term-card
          v-for="term in solarTerms"
          :key="term.id"
          :term="term"
          @click="handleTermClick"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
