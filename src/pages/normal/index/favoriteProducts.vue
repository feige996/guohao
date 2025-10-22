<script setup lang="ts">
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '关注商品',
    navigationStyle: 'custom',
  },
})

// 标签页状态
const activeTab = ref('products') // products | shops
const isManaging = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 模拟商品数据
const products = ref([
  {
    id: '1',
    name: '特效根治痛风散',
    price: 68,
    image: '/static/images/products/product1.jpg',
    status: '下单后3日内发货',
    selected: false,
  },
  {
    id: '2',
    name: '冬病夏治三伏贴',
    price: 135,
    image: '/static/images/products/product2.jpg',
    status: '下单后3日内发货',
    selected: false,
  },
  {
    id: '3',
    name: '中医养生茶',
    price: 89,
    image: '/static/images/products/product3.jpg',
    status: '下单后2日内发货',
    selected: false,
  },
])

// 搜索过滤后的商品
const filteredProducts = computed(() => {
  if (!searchKeyword.value)
    return products.value
  return products.value.filter(product =>
    product.name.includes(searchKeyword.value),
  )
})

// 切换标签页
function switchTab(tab: string) {
  activeTab.value = tab
  searchKeyword.value = ''
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 切换管理模式
function toggleManageMode() {
  isManaging.value = !isManaging.value
  // 退出管理模式时清空选中状态
  if (!isManaging.value) {
    products.value.forEach((product) => {
      product.selected = false
    })
  }
}

// 切换商品选中状态
function toggleProductSelection(index: number) {
  products.value[index].selected = !products.value[index].selected
}

// 全选/取消全选
function toggleSelectAll() {
  const allSelected = products.value.every(product => product.selected)
  products.value.forEach((product) => {
    product.selected = !allSelected
  })
}

// 删除选中的商品
function deleteSelectedProducts() {
  products.value = products.value.filter(product => !product.selected)
  if (products.value.length === 0) {
    isManaging.value = false
  }
}

// 跳转到商品详情
function goToProductDetail(productId: number) {
  if (!isManaging.value) {
    uni.navigateTo({
      url: `/pages/shop/shop-detail?id=${productId}`,
      fail: (err) => {
        console.error('导航到商品详情失败:', err)
        uni.showToast({
          title: '跳转失败，请重试',
          icon: 'none',
        })
      },
    })
  }
}

// 处理搜索
function handleSearch() {
  console.log('搜索关键词:', searchKeyword.value)
}

// 清空搜索
function clearSearch() {
  searchKeyword.value = ''
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }">
    <!-- 自定义导航栏 -->
    <view class="sticky top-0 z-10 bg-white">
      <view class="h-[100rpx] flex items-center border-b border-[#f0f0f0] px-[30rpx]">
        <!-- 返回按钮 -->
        <view class="h-full w-[60rpx] flex items-center justify-center">
          <text class="text-[#333333] text-[40rpx]" @click="handleBack">←</text>
        </view>
        <!-- 标题 -->
        <view class="flex-1 text-center">
          <text class="text-[#333333] font-medium text-[36rpx]">关注商品</text>
        </view>
        <!-- 占位元素，保持标题居中 -->
        <view class="w-[60rpx]" />
      </view>
    </view>

    <!-- 搜索栏 -->
    <view class="p-[24rpx]">
      <view class="flex items-center border border-[#e0e0e0] rounded-[10rpx] bg-white px-[30rpx] py-[20rpx] shadow-sm">
        <uni-icons type="search" size="24" color="#999999" class="mr-[16rpx]" />
        <input
          v-model="searchKeyword"
          placeholder="搜索商品名称"
          placeholder-class="text-[#999999]"
          class="flex-1 bg-transparent text-[#333333] text-[30rpx]"
          @confirm="handleSearch"
        >
        <uni-icons
          v-if="searchKeyword"
          type="closeempty"
          size="24"
          color="#999999"
          class="ml-[16rpx]"
          @click="clearSearch"
        />
      </view>
    </view>

    <!-- 标签页和管理按钮 -->
    <view class="flex border-b border-[#f0f0f0] bg-white">
      <view
        class="relative flex-1 py-[28rpx] text-center"
        :class="activeTab === 'products' ? 'text-[#e6553a]' : 'text-[#666666]'"
        @click="switchTab('products')"
      >
        <text class="text-[32rpx]">关注商品</text>
        <view
          v-if="activeTab === 'products'"
          class="absolute bottom-0 left-1/2 h-[6rpx] w-[40rpx] transform rounded-[3rpx] bg-[#e6553a] -translate-x-1/2"
        />
      </view>
      <view
        class="relative flex-1 py-[28rpx] text-center"
        :class="activeTab === 'shops' ? 'text-[#e6553a]' : 'text-[#666666]'"
        @click="switchTab('shops')"
      >
        <text class="text-[32rpx]">关注店铺</text>
        <view
          v-if="activeTab === 'shops'"
          class="absolute bottom-0 left-1/2 h-[6rpx] w-[40rpx] transform rounded-[3rpx] bg-[#e6553a] -translate-x-1/2"
        />
      </view>
      <view
        class="flex items-center justify-center px-[30rpx]"
        @click="toggleManageMode"
      >
        <text class="text-[#666666] text-[28rpx]">
          {{ isManaging ? '完成' : '管理' }}
        </text>
      </view>
    </view>

    <!-- 管理操作栏 -->
    <view v-if="isManaging" class="flex items-center border-b border-[#f0f0f0] bg-white p-[24rpx]">
      <view class="mr-[40rpx] flex items-center">
        <uni-icons
          :type="products.every(p => p.selected) ? 'checkbox-filled' : 'checkbox'"
          :color="products.every(p => p.selected) ? '#e6553a' : '#999999'"
          size="28"
          @click="toggleSelectAll"
        />
        <text class="ml-[16rpx] text-[#666666] text-[30rpx]">全选</text>
      </view>
      <view class="text-[#e6553a] text-[30rpx]" @click="deleteSelectedProducts">
        删除
      </view>
    </view>

    <!-- 商品列表 -->
    <view v-if="activeTab === 'products'" class="py-[20rpx]">
      <view v-if="filteredProducts.length > 0">
        <view
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="mx-[24rpx] mb-[20rpx] flex items-center rounded-[16rpx] bg-white p-[30rpx]"
          @click="goToProductDetail(product.id)"
        >
          <!-- 选中框 -->
          <view v-if="isManaging" class="mr-[24rpx]">
            <uni-icons
              :type="product.selected ? 'checkbox-filled' : 'checkbox'"
              :color="product.selected ? '#e6553a' : '#999999'"
              size="28"
              @click.stop="toggleProductSelection(index)"
            />
          </view>

          <!-- 商品图片 -->
          <view class="relative h-[180rpx] w-[180rpx] overflow-hidden rounded-[10rpx] bg-[#f5f5f5]">
            <image
              :src="product.image"
              mode="aspectFill"
              class="h-full w-full"
              @error="$event.target.src = '/static/images/default-product.png'"
            />
          </view>

          <!-- 商品信息 -->
          <view class="ml-[24rpx] flex-1">
            <view class="mb-[16rpx] line-clamp-2 text-[#333333] font-medium text-[32rpx]">
              {{ product.name }}
            </view>
            <view class="mb-[16rpx] flex items-baseline">
              <text class="text-[#e6553a] font-bold text-[36rpx]">¥{{ product.price }}</text>
            </view>
            <view class="text-[#999999] text-[26rpx]">
              {{ product.status }}
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="flex flex-col items-center justify-center py-[120rpx]">
        <uni-icons type="star" size="80" color="#cccccc" />
        <text class="mt-[30rpx] text-[#999999] text-[32rpx]">暂无关注商品</text>
      </view>
    </view>

    <!-- 店铺列表 -->
    <view v-else class="py-[20rpx]">
      <!-- 空状态 -->
      <view class="flex flex-col items-center justify-center py-[120rpx]">
        <uni-icons type="shop" size="80" color="#cccccc" />
        <text class="mt-[30rpx] text-[#999999] text-[32rpx]">暂无关注店铺</text>
      </view>
    </view>
  </view>
</template>
