<script lang="ts" setup>
import { ref } from 'vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Tabs from '@/components/Tabs/index.vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商城',
  },
})

// 页面参数
const categoryId = ref<number | null>(null)
const categoryName = ref<string>('')

// 轮播图数据
const swiperList = ref([
  {
    id: 1,
    image: '/static/swiper/Swiper01.png',
    title: '商城轮播图1',
  },
  {
    id: 2,
    image: '/static/swiper/Swiper01.png',
    title: '商城轮播图2',
  },
  {
    id: 3,
    image: '/static/swiper/Swiper01.png',
    title: '商城轮播图3',
  },
])

// tabs数据
const tabList = ref([
  { id: 'all', name: '全部商品' },
  { id: 'selected', name: '国浩精选' },
  { id: 'follow', name: '我的关注' },
])

// 当前选中的tab
const activeTabIndex = ref(0)

// 不同分类的商品数据
const allProducts = {
  all: [
    {
      id: 1,
      name: '养生茶叶礼盒装',
      price: 299,
      originalPrice: 399,
      image: 'https://picsum.photos/400/400?random=1',
      sales: 1200,
      tags: ['热销', '精选'],
    },
    {
      id: 2,
      name: '中药材精华胶囊',
      price: 199,
      originalPrice: 259,
      image: 'https://picsum.photos/400/400?random=2',
      sales: 800,
      tags: ['新品'],
    },
    {
      id: 3,
      name: '养生保健品套装',
      price: 599,
      originalPrice: 799,
      image: 'https://picsum.photos/400/400?random=3',
      sales: 500,
      tags: ['限时特惠'],
    },
    {
      id: 4,
      name: '传统中医理疗器',
      price: 899,
      originalPrice: 1199,
      image: 'https://picsum.photos/400/400?random=4',
      sales: 300,
      tags: ['专业推荐'],
    },
    {
      id: 5,
      name: '养生花茶组合',
      price: 159,
      originalPrice: 199,
      image: 'https://picsum.photos/400/400?random=5',
      sales: 2000,
      tags: ['热销'],
    },
    {
      id: 6,
      name: '中医养生书籍',
      price: 89,
      originalPrice: 129,
      image: 'https://picsum.photos/400/400?random=6',
      sales: 600,
      tags: ['知识普及'],
    },
  ],
  selected: [
    {
      id: 101,
      name: '国浩精选燕窝礼盒',
      price: 1299,
      originalPrice: 1699,
      image: 'https://picsum.photos/400/400?random=101',
      sales: 580,
      tags: ['精选', '限量'],
    },
    {
      id: 102,
      name: '顶级人参切片',
      price: 899,
      originalPrice: 1199,
      image: 'https://picsum.photos/400/400?random=102',
      sales: 320,
      tags: ['精选', '野生'],
    },
    {
      id: 103,
      name: '珍品灵芝孢子粉',
      price: 699,
      originalPrice: 899,
      image: 'https://picsum.photos/400/400?random=103',
      sales: 450,
      tags: ['精选', '有机'],
    },
    {
      id: 104,
      name: '高端养生茶具套装',
      price: 1599,
      originalPrice: 2199,
      image: 'https://picsum.photos/400/400?random=104',
      sales: 180,
      tags: ['精选', '手工'],
    },
    {
      id: 105,
      name: '珍藏版冬虫夏草',
      price: 2999,
      originalPrice: 3999,
      image: 'https://picsum.photos/400/400?random=105',
      sales: 89,
      tags: ['精选', '珍品'],
    },
    {
      id: 106,
      name: '国浩特制养生膏',
      price: 599,
      originalPrice: 799,
      image: 'https://picsum.photos/400/400?random=106',
      sales: 260,
      tags: ['精选', '独家'],
    },
  ],
  follow: [
    {
      id: 201,
      name: '我关注的养生茶',
      price: 168,
      originalPrice: 228,
      image: 'https://picsum.photos/400/400?random=201',
      sales: 890,
      tags: ['关注', '收藏'],
    },
    {
      id: 202,
      name: '收藏的中药材',
      price: 299,
      originalPrice: 399,
      image: 'https://picsum.photos/400/400?random=202',
      sales: 560,
      tags: ['关注', '优质'],
    },
    {
      id: 203,
      name: '心愿单保健品',
      price: 459,
      originalPrice: 599,
      image: 'https://picsum.photos/400/400?random=203',
      sales: 340,
      tags: ['关注', '待购'],
    },
    {
      id: 204,
      name: '关注的理疗设备',
      price: 1299,
      originalPrice: 1699,
      image: 'https://picsum.photos/400/400?random=204',
      sales: 120,
      tags: ['关注', '高端'],
    },
    {
      id: 205,
      name: '收藏的艾灸套装',
      price: 399,
      originalPrice: 529,
      image: 'https://picsum.photos/400/400?random=205',
      sales: 280,
      tags: ['关注', '实用'],
    },
  ],
}

// 当前显示的商品列表
const productList = ref(allProducts.all)

// 页面加载
onLoad((options: any) => {
  if (options.categoryId) {
    categoryId.value = Number(options.categoryId)
    categoryName.value = options.categoryName || ''
    console.log('加载分类:', categoryId.value, categoryName.value)
    // 这里可以根据分类ID过滤商品
  }
})

// 搜索事件处理
function handleSearch(searchValue: string) {
  console.log('执行搜索:', searchValue)
  // 在这里添加搜索逻辑
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

// 轮播图点击事件
function handleSwiperClick(item: any) {
  console.log('点击轮播图:', item)
  // 在这里添加轮播图点击逻辑
}

// tab切换事件
function handleTabClick(index: number) {
  activeTabIndex.value = index
}

// 商品点击事件
function handleProductClick(product: any) {
  console.log('点击商品:', product)
  // 跳转到商品详情页
  uni.navigateTo({
    url: `/pages/shop/shop-detail?id=${product.id}`,
  })
}

// 处理返回
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <div class="px-3 pt-4">
    <!-- 搜索栏 -->
    <SearchBar placeholder="搜索商品、品牌、分类等" />

    <!-- 轮播图区域 -->
    <view class="mt-4">
      <swiper
        class="h-[300rpx] overflow-hidden rounded-[16rpx]"
        indicator-dots
        autoplay
        :interval="3000"
        :duration="500"
        indicator-color="rgba(255, 255, 255, 0.5)"
        indicator-active-color="#97493d"
      >
        <swiper-item
          v-for="item in swiperList"
          :key="item.id"
          @click="handleSwiperClick(item)"
        >
          <image
            :src="item.image"
            class="h-full w-full object-cover"
            mode="aspectFill"
          />
        </swiper-item>
      </swiper>
    </view>

    <!-- Tabs切换区域 -->
    <view class="mt-4">
      <Tabs
        :tab-list="tabList"
        @change="handleTabClick"
      />
    </view>

    <!-- 商品列表区域 -->
    <div class="mt-3 flex flex-col">
      <scroll-view
        scroll-y
        class="h-[1000rpx]"
        enable-back-to-top
      >
        <div class="product-grid pb-[40rpx]">
          <div
            v-for="product in productList"
            :key="product.id"
            class="product-item cursor-pointer overflow-hidden rounded-[16rpx] bg-white shadow-sm"
            @click="handleProductClick(product)"
          >
            <!-- 商品图片 -->
            <div class="relative h-[280rpx] w-full">
              <image
                :src="product.image"
                class="h-full w-full object-cover"
                mode="aspectFill"
              />
              <!-- 标签 -->
              <div class="absolute left-[16rpx] top-[16rpx] flex flex-wrap gap-[8rpx]">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="rounded-[8rpx] bg-[#97493d] px-[12rpx] py-[4rpx] text-white text-[20rpx]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 商品信息 -->
            <div class="p-[24rpx]">
              <!-- 商品名称 -->
              <div class="mb-[16rpx] line-clamp-2 text-[#333333] font-medium text-[28rpx]">
                {{ product.name }}
              </div>

              <!-- 价格信息 -->
              <div class="mb-[12rpx] flex items-center">
                <span class="text-[#97493d] font-bold text-[32rpx]">¥{{ product.price }}</span>
                <span class="ml-[12rpx] text-[#999999] line-through text-[24rpx]">¥{{ product.originalPrice }}</span>
              </div>

              <!-- 销量信息 -->
              <div class="text-[#999999] text-[24rpx]">
                已售{{ product.sales }}件
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 文本截断样式
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 商品网格布局 - 两列流式布局
.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.product-item {
  width: 48%;
  margin-bottom: 24rpx;
  box-sizing: border-box;
}

// 滚动视图样式
scroll-view {
  width: 100%;
}
</style>
