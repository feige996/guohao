<script setup lang="ts">
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '关注商品',
    navigationStyle: 'default',
  },
})

// 标签页状态
const activeTab = ref('products') // products | shops
const isManaging = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 从shop-detail.vue获取的模拟商品数据
const products = ref([
  {
    id: '1',
    name: '特效根治痛风散',
    price: 68,
    image: '/static/images/products/product1.jpg',
    status: '下单后3日内发货',
    selected: false,
    activityInfo: {
      type: '限时活动',
    },
  },
  {
    id: '2',
    name: '冬病夏治三伏贴',
    price: 135,
    image: '/static/images/products/product2.jpg',
    status: '下单后3日内发货',
    selected: false,
    activityInfo: {
      type: '新品特惠',
    },
  },
  {
    id: '3',
    name: '中医养生茶',
    price: 89,
    image: '/static/images/products/product3.jpg',
    status: '下单后2日内发货',
    selected: false,
    activityInfo: {
      type: '限时折扣',
    },
  },
  {
    id: '4',
    name: '艾灸养生套装',
    price: 268,
    image: '/static/images/products/product1.jpg',
    status: '下单后3日内发货',
    selected: false,
    activityInfo: {
      type: '组合优惠',
    },
  },
  {
    id: '5',
    name: '中医经络按摩仪',
    price: 399,
    image: '/static/images/products/product2.jpg',
    status: '下单后4日内发货',
    selected: false,
    activityInfo: {
      type: '会员专享',
    },
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
  // 显示删除成功提示
  uni.showToast({
    title: '删除成功',
    icon: 'success',
    duration: 1500,
  })
}

// 跳转到商品详情
function goToProductDetail(productId: string) {
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
  <view class="min-h-screen">
    <!-- 搜索栏和标签页连在一起 -->
    <view class="">
      <!-- 搜索栏 -->
      <view class="p-4">
        <SearchBar
          class="bg-[#f5f7f4]"
          placeholder="搜索商品名称"
          @search="searchKeyword = $event"
        />
      </view>

      <!-- 标签页和管理按钮 -->
      <view class="flex border-t border-[#f0f0f0] bg-white">
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
        <!-- 管理按钮 - 使用wot-ui幽灵按钮 -->
        <view class="flex items-center justify-center px-[30rpx]">
          <wd-button
            plain
            size="small"
            class="text-[#e6553a] text-[30rpx]"
            @click="toggleManageMode"
          >
            {{ isManaging ? '完成' : '管理' }}
          </wd-button>
        </view>
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
      <view class="text-[#e6553a] font-medium text-[30rpx]" @click="deleteSelectedProducts">
        删除
      </view>
    </view>

    <!-- 商品列表 -->
    <view v-if="activeTab === 'products'" class="py-[20rpx]">
      <view v-if="filteredProducts.length > 0">
        <view
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="mx-[24rpx] mb-[24rpx] overflow-hidden rounded-[16rpx] bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          :class="{ 'border-2 border-[#e6553a]': isManaging && product.selected }"
          @click="isManaging ? toggleProductSelection(index) : goToProductDetail(product.id)"
        >
          <!-- 商品图片和活动标签 -->
          <view class="relative">
            <!-- 选中框 -->
            <view v-if="isManaging" class="absolute right-[20rpx] top-[20rpx] z-20 rounded-full bg-white/90 p-[8rpx] shadow-sm">
              <uni-icons
                :type="product.selected ? 'checkbox-filled' : 'checkbox'"
                :color="product.selected ? '#e6553a' : '#999999'"
                size="28"
                @click.stop="toggleProductSelection(index)"
              />
            </view>

            <!-- 活动标签 -->
            <view v-if="product.activityInfo?.type" class="absolute left-0 top-0 z-10 rounded-br-[20rpx] bg-[#ff4d4f] px-[20rpx] py-[8rpx] text-white font-medium text-[24rpx]">
              {{ product.activityInfo.type }}
            </view>

            <!-- 商品图片 -->
            <image
              :src="product.image"
              mode="aspectFill"
              class="h-[320rpx] w-full object-cover"
              @error="$event.target.src = '/static/images/default-product.png'"
            />
          </view>

          <!-- 商品信息 -->
          <view class="p-[24rpx]">
            <view class="mb-[16rpx] line-clamp-2 text-[#333333] font-medium text-[32rpx]">
              {{ product.name }}
            </view>

            <view class="flex items-center justify-between">
              <view class="flex items-baseline">
                <text class="text-[#e6553a] font-bold text-[36rpx]">¥{{ product.price }}</text>
              </view>

              <view class="text-[#999999] text-[26rpx]">
                {{ product.status }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="flex flex-col items-center justify-center py-[160rpx]">
        <uni-icons type="star" size="100" color="#cccccc" />
        <text class="mt-[40rpx] text-[#999999] text-[32rpx]">暂无关注商品</text>
      </view>
    </view>

    <!-- 店铺列表 -->
    <view v-else class="py-[20rpx]">
      <!-- 空状态 -->
      <view class="flex flex-col items-center justify-center py-[160rpx]">
        <uni-icons type="shop" size="100" color="#cccccc" />
        <text class="mt-[40rpx] text-[#999999] text-[32rpx]">暂无关注店铺</text>
      </view>
    </view>
  </view>
</template>
