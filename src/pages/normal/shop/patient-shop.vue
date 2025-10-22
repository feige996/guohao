<script lang="ts" setup>
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '中医商城',
  },
})

// 快速入口数据
const quickEntries = ref([
  {
    id: 1,
    name: '养生保健',
    icon: 'https://picsum.photos/100/100?random=icon1',
  },
  {
    id: 2,
    name: '中药材',
    icon: 'https://picsum.photos/100/100?random=icon2',
  },
  {
    id: 3,
    name: '理疗器械',
    icon: 'https://picsum.photos/100/100?random=icon3',
  },
  {
    id: 4,
    name: '中医书籍',
    icon: 'https://picsum.photos/100/100?random=icon4',
  },
  {
    id: 5,
    name: '体质调理',
    icon: 'https://picsum.photos/100/100?random=icon5',
  },
  {
    id: 6,
    name: '节气养生',
    icon: 'https://picsum.photos/100/100?random=icon6',
  },
  {
    id: 7,
    name: '礼品套装',
    icon: 'https://picsum.photos/100/100?random=icon7',
  },
  {
    id: 8,
    name: '更多分类',
    icon: 'https://picsum.photos/100/100?random=icon8',
  },
])

// 推荐商品数据
const recommendedProducts = ref([
  {
    id: 101,
    name: '中医养生茶礼盒',
    price: 268,
    originalPrice: 368,
    image: 'https://picsum.photos/400/400?random=101',
    sales: 1200,
    tag: '热销',
  },
  {
    id: 102,
    name: '艾草精油艾灸套装',
    price: 198,
    originalPrice: 258,
    image: 'https://picsum.photos/400/400?random=102',
    sales: 800,
    tag: '新品',
  },
  {
    id: 103,
    name: '纯中药泡脚包',
    price: 88,
    originalPrice: 128,
    image: 'https://picsum.photos/400/400?random=103',
    sales: 2000,
    tag: '特惠',
  },
  {
    id: 104,
    name: '中医理疗按摩器',
    price: 599,
    originalPrice: 799,
    image: 'https://picsum.photos/400/400?random=104',
    sales: 350,
    tag: '推荐',
  },
])

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 处理搜索
function handleSearch() {
  console.log('搜索商品')
  // 这里可以跳转到搜索页面
}

// 处理快速入口点击
function handleEntryClick(entry: any) {
  console.log('点击快速入口:', entry)
  // 跳转到对应的分类页面
  navigateToShopList(entry.id, entry.name)
}

// 处理商品点击
function handleProductClick(product: any) {
  console.log('点击推荐商品:', product)
  // 跳转到商品详情页
  uni.navigateTo({
    url: `/pages/shop/shop-detail?id=${product.id}`
  })
}

// 查看全部商品
function handleViewAll() {
  navigateToShopList()
}

// 导航到商品列表页
function navigateToShopList(categoryId?: number, categoryName?: string) {
  let url = '/pages/shop/shop'
  if (categoryId) {
    url += `?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName || '')}`
  }
  uni.navigateTo({
    url
  })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <div class="sticky top-0 z-50 h-[96rpx] flex items-center justify-between bg-[#97493d] px-[32rpx]">
      <div class="flex items-center">
        <button @click="handleBack" class="h-[64rpx] w-[64rpx] flex items-center justify-center">
          <image src="/static/app/back-white.png" class="h-[24rpx] w-[24rpx]" mode="aspectFill" />
        </button>
        <text class="text-[36rpx] font-medium text-white">中医商城</text>
      </div>
      <button class="h-[64rpx] w-[64rpx] flex items-center justify-center">
        <image src="/static/app/message-white.png" class="h-[32rpx] w-[32rpx]" mode="aspectFill" />
      </button>
    </div>

    <!-- 主内容区域 -->
    <scroll-view scroll-y class="flex-1">
      <!-- 搜索栏 -->
      <div class="px-[30rpx] py-[20rpx] bg-[#97493d]">
        <div 
          @click="handleSearch"
          class="h-[72rpx] flex items-center justify-center rounded-[36rpx] bg-white px-[30rpx] text-[28rpx] text-[#999]"
        >
          <image src="/static/app/search.png" class="mr-[15rpx] h-[30rpx] w-[30rpx]" mode="aspectFill" />
          <text>搜索中药材、养生产品、理疗器械...</text>
        </div>
      </div>

      <!-- 轮播图 -->
      <div class="relative mx-[30rpx] mt-[30rpx] h-[300rpx] overflow-hidden rounded-[20rpx]">
        <image 
          src="/static/swiper/Swiper01.png" 
          class="h-full w-full object-cover" 
          mode="aspectFill" 
        />
        <div class="absolute left-[30rpx] top-[40rpx] flex flex-col gap-[15rpx]">
          <div class="text-[48rpx] font-bold text-white">春季养生</div>
          <div class="text-[32rpx] text-white">特惠套装限时抢购</div>
          <button class="mt-[20rpx] rounded-[30rpx] bg-[#ff4d4f] px-[40rpx] py-[15rpx] text-[28rpx] font-medium text-white">
            立即查看
          </button>
        </div>
      </div>

      <!-- 快速入口 -->
      <div class="my-[30rpx] grid grid-cols-4 gap-[20rpx] px-[30rpx]">
        <div 
          v-for="entry in quickEntries" 
          :key="entry.id"
          @click="handleEntryClick(entry)"
          class="flex flex-col items-center justify-center gap-[15rpx] cursor-pointer"
        >
          <div class="h-[120rpx] w-[120rpx] overflow-hidden rounded-full bg-white shadow-sm">
            <image :src="entry.icon" class="h-full w-full object-cover" mode="aspectFill" />
          </div>
          <text class="text-[26rpx] text-[#333]">{{ entry.name }}</text>
        </div>
      </div>

      <!-- 推荐商品 -->
      <div class="my-[30rpx] bg-white px-[30rpx]">
        <div class="flex items-center justify-between border-b border-[#f0f0f0] py-[30rpx]">
          <text class="text-[32rpx] font-medium text-[#333]">推荐商品</text>
          <button @click="handleViewAll" class="flex items-center gap-[10rpx] text-[28rpx] text-[#999]">
            查看全部
            <image src="/static/app/arrow-right.png" class="h-[24rpx] w-[24rpx]" mode="aspectFill" />
          </button>
        </div>
        
        <div class="grid grid-cols-2 gap-[30rpx] py-[30rpx]">
          <div 
            v-for="product in recommendedProducts" 
            :key="product.id"
            @click="handleProductClick(product)"
            class="flex flex-col gap-[20rpx] overflow-hidden rounded-[15rpx] bg-white shadow-sm"
          >
            <!-- 商品图片 -->
            <div class="relative h-[280rpx] w-full">
              <image :src="product.image" class="h-full w-full object-cover" mode="aspectFill" />
              <div v-if="product.tag" class="absolute left-[15rpx] top-[15rpx] rounded-[10rpx] bg-[#ff4d4f] px-[15rpx] py-[5rpx] text-[24rpx] text-white">
                {{ product.tag }}
              </div>
            </div>
            
            <!-- 商品信息 -->
            <div class="px-[20rpx] pb-[20rpx]">
              <div class="line-clamp-2 text-[28rpx] text-[#333] font-medium">
                {{ product.name }}
              </div>
              <div class="mt-[10rpx] flex items-center gap-[10rpx]">
                <span class="text-[32rpx] font-bold text-[#ff4d4f]">¥{{ product.price }}</span>
                <span class="text-[24rpx] text-[#999] line-through">¥{{ product.originalPrice }}</span>
              </div>
              <div class="mt-[5rpx] text-[24rpx] text-[#999]">
                已售{{ product.sales }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热销榜单 -->
      <div class="my-[30rpx] bg-white px-[30rpx]">
        <div class="border-b border-[#f0f0f0] py-[30rpx]">
          <text class="text-[32rpx] font-medium text-[#333]">热销榜单</text>
        </div>
        
        <div class="py-[30rpx]">
          <div 
            v-for="(product, index) in recommendedProducts.slice(0, 4)" 
            :key="product.id"
            @click="handleProductClick(product)"
            class="mb-[30rpx] flex gap-[20rpx] cursor-pointer"
          >
            <!-- 排名标签 -->
            <div class="flex h-[200rpx] w-[40rpx] items-start justify-start">
              <div :class="{
                'h-[40rpx] w-[40rpx] rounded-full bg-[#ff4d4f] text-[26rpx] font-bold text-white': index < 3,
                'h-[40rpx] w-[40rpx] rounded-full bg-[#f0f0f0] text-[26rpx] font-bold text-[#999]': index >= 3
              }" class="flex items-center justify-center">
                {{ index + 1 }}
              </div>
            </div>
            
            <!-- 商品图片 -->
            <div class="h-[200rpx] w-[200rpx] overflow-hidden rounded-[10rpx]">
              <image :src="product.image" class="h-full w-full object-cover" mode="aspectFill" />
            </div>
            
            <!-- 商品信息 -->
            <div class="flex-1 flex flex-col justify-between py-[10rpx]">
              <div class="line-clamp-2 text-[28rpx] text-[#333] font-medium">
                {{ product.name }}
              </div>
              <div class="flex items-center gap-[10rpx]">
                <span class="text-[32rpx] font-bold text-[#ff4d4f]">¥{{ product.price }}</span>
                <span class="text-[24rpx] text-[#999] line-through">¥{{ product.originalPrice }}</span>
              </div>
              <div class="text-[24rpx] text-[#999]">
                月销{{ product.sales }}件
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部占位 -->
      <div class="h-[50rpx]"></div>
    </scroll-view>
  </div>
</template>