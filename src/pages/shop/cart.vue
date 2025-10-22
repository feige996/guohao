<script setup lang="ts">
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 购物车商品类型定义
interface CartItem {
  id: number
  name: string
  subtitle: string
  price: number
  image: string
  quantity: number
  selected: boolean
  sku?: string
}

// 购物车商品列表
const cartItems = ref<CartItem[]>([])

// 计算总金额
const totalPrice = computed(() => {
  return cartItems.value
    .filter(item => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0)
})

// 计算选中的商品数量
const selectedCount = computed(() => {
  return cartItems.value
    .filter(item => item.selected)
    .reduce((total, item) => total + item.quantity, 0)
})

// 是否全选
const isAllSelected = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every(item => item.selected),
  set: (value) => {
    cartItems.value.forEach((item) => {
      item.selected = value
    })
  },
})

// 切换商品选中状态
function toggleItemSelection(index: number) {
  cartItems.value[index].selected = !cartItems.value[index].selected
  saveCartData()
}

// 增加商品数量
function increaseQuantity(index: number) {
  cartItems.value[index].quantity++
  saveCartData()
}

// 减少商品数量
function decreaseQuantity(index: number) {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
    saveCartData()
  }
}

// 删除商品
function removeItem(index: number) {
  uni.showModal({
    title: '确认删除',
    content: '确定要从购物车中移除该商品吗？',
    success: (res) => {
      if (res.confirm) {
        cartItems.value.splice(index, 1)
        saveCartData()
        uni.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500,
        })
      }
    },
  })
}

// 保存购物车数据到本地
function saveCartData() {
  try {
    uni.setStorageSync('cartItems', JSON.stringify(cartItems.value))
  }
  catch (error) {
    console.error('保存购物车数据失败:', error)
  }
}

// 从本地加载购物车数据
function loadCartData() {
  try {
    const data = uni.getStorageSync('cartItems')
    if (data) {
      cartItems.value = JSON.parse(data)
    }
  }
  catch (error) {
    console.error('加载购物车数据失败:', error)
    cartItems.value = []
  }
}

// 去结算
function handleCheckout() {
  if (selectedCount.value === 0) {
    uni.showToast({
      title: '请选择要结算的商品',
      icon: 'none',
      duration: 1500,
    })
    return
  }

  // 这里可以跳转到订单确认页面
  uni.showToast({
    title: '即将跳转到订单确认页面',
    icon: 'none',
    duration: 2000,
  })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 生命周期 - 页面显示时加载数据
onShow(() => {
  loadCartData()
})

// 初始化时加载数据
loadCartData()
</script>

<template>
  <div class="page min-h-screen bg-[#f8f8f8]">
    <!-- 顶部导航栏 -->
    <div class="sticky top-0 z-10 flex items-center bg-white px-[30rpx] py-[20rpx]" :style="{ paddingTop: `${safeAreaInsets?.top || 0 + 20}rpx` }">
      <view class="absolute left-[30rpx] flex items-center justify-center text-[32rpx]" @click="handleBack">
        &lt;
      </view>
      <h1 class="mx-auto font-bold text-[36rpx]">
        购物车
      </h1>
      <div class="h-[80rpx] w-[80rpx]" />
    </div>

    <!-- 购物车商品列表 -->
    <div class="mt-[20rpx] bg-white">
      <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center py-[100rpx]">
        <div class="mb-[30rpx] text-[80rpx]">
          🛒
        </div>
        <p class="text-[#999] text-[32rpx]">
          购物车空空如也
        </p>
        <button class="mt-[40rpx] rounded-[40rpx] bg-[#ff4d4f] px-[60rpx] py-[20rpx] text-white text-[32rpx]" @click="handleBack">
          去逛逛
        </button>
      </div>

      <div v-else class="divide-y divide-[#f0f0f0]">
        <div v-for="(item, index) in cartItems" :key="`${item.id}-${item.sku || ''}`" class="flex items-center gap-[20rpx] p-[30rpx]">
          <!-- 选择框 -->
          <div class="flex-shrink-0">
            <radio :checked="item.selected" class="text-[#ff4d4f]" color="#ff4d4f" @change="toggleItemSelection(index)" />
          </div>

          <!-- 商品图片 -->
          <image :src="item.image" class="h-[160rpx] w-[160rpx] rounded-[10rpx] object-cover" mode="aspectFill" />

          <!-- 商品信息 -->
          <div class="min-w-0 flex-1">
            <div class="line-clamp-2 font-medium leading-tight text-[32rpx]">
              {{ item.name }}
            </div>
            <div class="mt-[10rpx] text-[#999] text-[28rpx]">
              {{ item.subtitle }}
            </div>
            <div v-if="item.sku" class="mt-[10rpx] text-[#666] text-[26rpx]">
              规格：{{ item.sku }}
            </div>

            <div class="mt-[20rpx] flex items-center justify-between">
              <span class="text-[#ff4d4f] font-bold text-[36rpx]">¥{{ item.price }}</span>

              <!-- 数量控制 -->
              <div class="flex items-center gap-[20rpx]">
                <button
                  class="h-[60rpx] w-[60rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[32rpx]"
                  :disabled="item.quantity <= 1"
                  :class="{ 'text-[#ccc]': item.quantity <= 1 }"
                  @click="decreaseQuantity(index)"
                >
                  -
                </button>
                <span class="text-[30rpx]">{{ item.quantity }}</span>
                <button
                  class="h-[60rpx] w-[60rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[32rpx]"
                  @click="increaseQuantity(index)"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- 删除按钮 -->
          <button class="flex-shrink-0 text-[#999] text-[28rpx]" @click="removeItem(index)">
            删除
          </button>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div v-if="cartItems.length > 0" class="fixed bottom-0 left-0 right-0 flex items-center bg-white px-[30rpx] py-[20rpx]" :style="{ paddingBottom: `${safeAreaInsets?.bottom || 0 + 20}rpx` }">
      <!-- 全选 -->
      <div class="flex items-center gap-[10rpx]">
        <radio :checked="isAllSelected" class="text-[#ff4d4f]" color="#ff4d4f" @change="isAllSelected = !isAllSelected" />
        <span class="text-[32rpx]">全选</span>
      </div>

      <!-- 合计 -->
      <div class="ml-auto mr-[20rpx]">
        <div class="text-[#666] text-[28rpx]">
          合计：
        </div>
        <div class="text-[#ff4d4f] font-bold text-[36rpx]">
          ¥{{ totalPrice.toFixed(2) }}
        </div>
      </div>

      <!-- 结算按钮 -->
      <button
        class="rounded-[40rpx] bg-[#ff4d4f] px-[40rpx] py-[20rpx] text-white font-medium text-[28rpx]"
        :class="{ 'bg-[#ccc]': selectedCount === 0 }"
        :disabled="selectedCount === 0"
        @click="handleCheckout"
      >
        去结算({{ selectedCount }})
      </button>
    </div>
  </div>
</template>
