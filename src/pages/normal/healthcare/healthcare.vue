<script lang="ts" setup>
import SearchBar from '@/components/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})

const current = ref<number>(0)

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
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索栏 -->
    <SearchBar
      @search="handleSearch"
      @click="handleSearchBarClick"
    />

    <!-- 轮播图 -->
    <view class="px-[24rpx] pt-4">
      <wd-swiper v-model:current="current" height="280rpx" :list="swiperList" autoplay @click="handleClick" @change="onChange" />
    </view>
  </view>
</template>
