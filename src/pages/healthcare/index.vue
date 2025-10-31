<script lang="ts" setup>
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import Tabs from '@/components/Tabs/index.vue'
import SwiperList from './components/SwiperList.vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
    disableScroll: true, // 禁用页面滚动
  },
})
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
// tab切换事件
function handleTabClick(index: number) {
  activeTabIndex.value = index
}
</script>

<template>
  <view class="px-3 pt-6">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 搜索栏 -->
      <SearchBar placeholder="搜索养生文章、中医知识等" />

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
  </view>
</template>

<style lang="scss" scoped>

</style>
