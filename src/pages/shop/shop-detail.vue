<script lang="ts" setup>
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'
import ProductBuyModal from './components/ProductBuyModal.vue'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '商品详情',
  },
})

// 页面参数
const productId = ref<number | null>(null)

// 模拟商品数据库
const mockProducts = {
  1: {
    id: 1,
    name: '特效根治痛风散',
    subtitle: '甘草味、纯中草药精制而成',
    description: '根治痛风，疗效显著，没有副作用',
    price: 68,
    originalPrice: 98,
    sales: 2368,
    images: [
      'https://picsum.photos/600/600?random=101',
      'https://picsum.photos/600/600?random=102',
      'https://picsum.photos/600/600?random=103',
    ],
    activeImageIndex: 0,
    attributes: [
      { name: '品牌', value: '国浩中医' },
      { name: '产地', value: '中国 云南' },
      { name: '保质期', value: '24个月' },
      { name: '规格', value: '10袋/盒' },
    ],
    details: '特效根治痛风散是由多种名贵中药材精制而成，采用传统工艺与现代科技相结合的方法，具有清热解毒、活血化瘀、通络止痛的功效。适用于各类痛风患者，特别是急性发作期的患者，能迅速缓解疼痛，改善症状。长期服用可预防复发，恢复关节功能。',
    service: '正品保障、7天无理由退换、专业医师指导',
    stock: 100,
    selectedSku: '标准装',
    skus: ['标准装', '优惠装', '家庭装'],
    activityInfo: {
      type: '限时活动',
      price: 68,
      originalPrice: 98,
    },
  },
  2: {
    id: 2,
    name: '养生舒润礼盒装',
    subtitle: '精选天然草本精华，全面调理身体',
    description: '改善睡眠质量，增强免疫力',
    price: 299,
    originalPrice: 399,
    sales: 1200,
    images: [
      'https://picsum.photos/600/600?random=201',
      'https://picsum.photos/600/600?random=202',
      'https://picsum.photos/600/600?random=203',
    ],
    activeImageIndex: 0,
    attributes: [
      { name: '品牌', value: '国浩中医' },
      { name: '产地', value: '中国 浙江' },
      { name: '保质期', value: '18个月' },
      { name: '规格', value: '6瓶/盒' },
    ],
    details: '养生舒润礼盒装采用纯天然草本精华，结合现代萃取技术，保留了草本植物的有效成分。长期服用能够改善睡眠质量，调节内分泌，增强免疫力，让身体保持健康状态。特别适合工作压力大、作息不规律的人群。',
    service: '正品保障、7天无理由退换、免费健康咨询',
    stock: 80,
    selectedSku: '标准装',
    skus: ['标准装', '家庭装', '豪华装'],
    activityInfo: {
      type: '新品特惠',
      price: 299,
      originalPrice: 399,
    },
  },
  3: {
    id: 3,
    name: '中医精华护肤霜',
    subtitle: '传统中医配方，温和滋养肌肤',
    description: '深层滋养，改善肌肤问题',
    price: 199,
    originalPrice: 259,
    sales: 850,
    images: [
      'https://picsum.photos/600/600?random=301',
      'https://picsum.photos/600/600?random=302',
      'https://picsum.photos/600/600?random=303',
    ],
    activeImageIndex: 0,
    attributes: [
      { name: '品牌', value: '国浩中医' },
      { name: '产地', value: '中国 上海' },
      { name: '保质期', value: '12个月' },
      { name: '规格', value: '50g/瓶' },
    ],
    details: '中医精华护肤霜采用传统中医配方，融合现代科技，精选多种珍贵草本精华，能够深层滋养肌肤，改善干燥、暗沉等肌肤问题，让肌肤重现光彩。温和不刺激，适合各种肤质使用。',
    service: '正品保障、过敏无忧、专业护肤指导',
    stock: 120,
    selectedSku: '标准装',
    skus: ['标准装', '旅行装'],
    activityInfo: {
      type: '限时折扣',
      price: 199,
      originalPrice: 259,
    },
  },
}

// 商品详情数据
const productDetail = ref(mockProducts[1]) // 默认显示第一个商品

// 评论数据
const comments = ref([
  {
    id: 1,
    userName: '张先生',
    avatar: 'https://picsum.photos/100/100?random=user1',
    content: '效果非常好，服用一个疗程后，我的痛风症状明显减轻，现在已经可以正常走路了。',
    rating: 5,
    createTime: '2024-01-15',
  },
  {
    id: 2,
    userName: '李女士',
    avatar: 'https://picsum.photos/100/100?random=user2',
    content: '给父亲买的，他说服用后效果不错，疼痛减轻了很多，会继续购买。',
    rating: 4,
    createTime: '2024-01-10',
  },
])

// 计算属性
const selectedImage = computed(() => {
  return productDetail.value.images[productDetail.value.activeImageIndex]
})

const discount = computed(() => {
  return Math.round((productDetail.value.price / productDetail.value.originalPrice) * 100)
})

// 处理图片切换
function handleImageChange(index: number) {
  productDetail.value.activeImageIndex = index
}

// 处理SKU选择
function handleSkuSelect(sku: string) {
  productDetail.value.selectedSku = sku
}

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 加入购物车
function handleAddToCart() {
  try {
    // 从本地存储获取购物车数据
    const cartData = uni.getStorageSync('cartItems')
    const cartItems = cartData ? JSON.parse(cartData) : []

    // 检查商品是否已在购物车中
    const existingIndex = cartItems.findIndex(
      (item: any) => item.id === productDetail.value.id && item.sku === productDetail.value.selectedSku,
    )

    if (existingIndex > -1) {
      // 如果商品已存在，增加数量
      cartItems[existingIndex].quantity += 1
    }
    else {
      // 如果商品不存在，添加新商品
      cartItems.push({
        id: productDetail.value.id,
        name: productDetail.value.name,
        subtitle: productDetail.value.subtitle,
        price: productDetail.value.price,
        image: productDetail.value.images[0],
        sku: productDetail.value.selectedSku,
        quantity: 1,
        selected: true,
      })
    }

    // 保存到本地存储
    uni.setStorageSync('cartItems', JSON.stringify(cartItems))

    uni.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500,
    })
  }
  catch (error) {
    console.error('添加购物车失败:', error)
    uni.showToast({
      title: '添加失败，请重试',
      icon: 'none',
      duration: 1500,
    })
  }
}

// 是否显示购买弹窗
const showBuyModal = ref(false)

// 立即购买
function handleBuyNow() {
  showBuyModal.value = true
}

// 处理购买确认
function handleBuyConfirm(orderInfo: { quantity: number, sku: string }) {
  console.log('购买确认:', orderInfo)
  uni.showToast({
    title: '购买成功！即将跳转到订单确认页面',
    icon: 'success',
    duration: 2000,
  })
  // 这里可以跳转到订单确认页面
  // uni.navigateTo({ url: '/pages/order/confirm?id=' + productId.value })
}

// 跳转到商品首页
function handleGoHome() {
  console.log('尝试跳转到商品首页:', '/pages/shop/shop')
  uni.switchTab({
    url: '/pages/shop/shop',
    success: () => {
      console.log('导航到商城成功')
    },
    fail: (err) => {
      console.error('导航到商城失败:', err)
      uni.showToast({
        title: `跳转失败: ${JSON.stringify(err)}`,
        icon: 'none',
        duration: 3000,
      })
    },
  })
}

// 联系客服
function handleCustomerService() {
  console.log('跳转到在线客服页面')
  uni.navigateTo({
    url: '/pages/shop/customer-service',
    fail: (err) => {
      console.error('导航到客服页面失败:', err)
      uni.showToast({
        title: '跳转失败，请重试',
        icon: 'none',
      })
    },
  })
}

// 跳转到购物车
function handleGoCart() {
  try {
    console.log('尝试跳转到购物车页面:', '/pages/shop/cart')
    uni.navigateTo({
      url: '/pages/shop/cart',
      success: () => {
        console.log('导航成功')
      },
      fail: (err) => {
        console.error('导航失败:', err)
        uni.showToast({
          title: `导航失败: ${JSON.stringify(err)}`,
          icon: 'none',
          duration: 3000,
        })
      },
      complete: () => {
        console.log('导航操作完成')
      },
    })
  }
  catch (error) {
    console.error('跳转到购物车时发生错误:', error)
    uni.showToast({
      title: '跳转失败，请重试',
      icon: 'none',
    })
  }
}

// 页面加载时获取商品ID并加载对应商品详情
onLoad((options: any) => {
  if (options.id) {
    productId.value = Number(options.id)
    console.log('加载商品ID:', productId.value)
    // 根据productId获取对应的商品详情
    if (mockProducts[productId.value]) {
      productDetail.value = { ...mockProducts[productId.value] }
    }
    else {
      console.warn('商品不存在，使用默认商品')
      productDetail.value = { ...mockProducts[1] } // 不存在时使用默认商品
    }
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <div class="relative sticky top-0 z-50 h-[96rpx] flex items-center justify-center bg-white px-[32rpx] shadow-sm">
      <view class="absolute left-[32rpx] h-[64rpx] w-[64rpx] flex items-center justify-center" @click="handleBack">
        <text class="font-bold text-[40rpx]">&lt;</text>
      </view>
      <text class="font-medium text-[36rpx]">商品详情</text>
    </div>

    <!-- 主内容区域 -->
    <scroll-view scroll-y class="flex-1">
      <!-- 顶部返回按钮 -->
      <!-- 返回按钮 -->
      <view class="mr-[20rpx]" @click="handleBack">
        <image src="/static/back_arrow.png" class="h-[28rpx] w-[28rpx]" mode="aspectFill" />
      </view>

      <!-- 商品图片轮播 -->
      <div class="relative h-[600rpx] bg-white">
        <swiper
          class="h-full"
          :current="productDetail.activeImageIndex"
          indicator-dots
          indicator-color="rgba(255, 255, 255, 0.5)"
          indicator-active-color="#ffffff"
          @change="handleImageChange($event.detail.current)"
        >
          <swiper-item v-for="(image, index) in productDetail.images" :key="index">
            <image :src="image" class="h-full w-full object-contain" mode="aspectFill" />
          </swiper-item>
        </swiper>

        <!-- 活动标签 -->
        <div class="absolute left-0 top-0 rounded-br-[20rpx] bg-[#ff4d4f] px-[20rpx] py-[8rpx] text-white text-[24rpx]">
          {{ productDetail.activityInfo.type }}
        </div>

        <!-- 活动价格标签 -->
        <div class="absolute bottom-[20rpx] left-[20rpx] rounded-[10rpx] bg-black/50 px-[20rpx] py-[10rpx] text-white text-[28rpx]">
          活动到手价 ¥{{ productDetail.activityInfo.price }}
        </div>
      </div>

      <!-- 商品信息区域 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[20rpx]">
        <!-- 商品标题 -->
        <div class="text-[#333] font-bold text-[36rpx]">
          {{ productDetail.name }}
        </div>

        <!-- 商品副标题 -->
        <div class="text-[#666] text-[28rpx]">
          {{ productDetail.subtitle }}
        </div>

        <!-- 商品描述 -->
        <div class="text-[#97493d] font-medium text-[28rpx]">
          {{ productDetail.description }}
        </div>

        <!-- 价格信息 -->
        <div class="mt-[10rpx] flex items-center justify-between">
          <div class="flex items-center gap-[10rpx]">
            <span class="text-[#ff4d4f] font-bold text-[48rpx]">¥{{ productDetail.price }}</span>
            <span class="text-[#999] line-through text-[28rpx]">¥{{ productDetail.originalPrice }}</span>
            <div class="rounded-[10rpx] bg-[#fff2f0] px-[15rpx] py-[5rpx] text-[#ff4d4f] text-[24rpx]">
              {{ discount }}折
            </div>
          </div>
          <div class="text-[#999] text-[28rpx]">
            已售{{ productDetail.sales }}件
          </div>
        </div>
      </div>

      <!-- 商品规格选择 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[30rpx]">
        <div class="flex items-center justify-between">
          <span class="text-[#333] text-[30rpx]">选择规格</span>
          <span class="text-[#999] text-[28rpx]">{{ productDetail.selectedSku }}</span>
        </div>

        <div class="flex flex-wrap gap-[20rpx]">
          <button
            v-for="sku in productDetail.skus"
            :key="sku"
            class="border-2 rounded-[10rpx] px-[30rpx] py-[20rpx] transition-all text-[28rpx]"
            :class="{
              'border-[#97493d] bg-[#f6e2d3] text-[#97493d]': productDetail.selectedSku === sku,
              'border-[#e8e8e8] text-[#666]': productDetail.selectedSku !== sku,
            }"
            @click="handleSkuSelect(sku)"
          >
            {{ sku }}
          </button>
        </div>
      </div>

      <!-- 商品属性 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[30rpx]">
        <div class="text-[#333] font-medium text-[30rpx]">
          商品属性
        </div>
        <div class="divide-y divide-[#f0f0f0]">
          <div
            v-for="(attr, index) in productDetail.attributes"
            :key="index"
            class="flex items-center justify-between py-[20rpx]"
          >
            <span class="text-[#999] text-[28rpx]">{{ attr.name }}</span>
            <span class="text-[#333] text-[28rpx]">{{ attr.value }}</span>
          </div>
        </div>
      </div>

      <!-- 商品详情 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[30rpx]">
        <div class="text-[#333] font-medium text-[30rpx]">
          商品详情
        </div>
        <div class="text-[#666] leading-8 text-[28rpx]">
          {{ productDetail.details }}
        </div>
      </div>

      <!-- 用户评价 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[30rpx]">
        <div class="text-[#333] font-medium text-[30rpx]">
          用户评价
        </div>
        <div class="flex flex-col gap-[30rpx]">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="flex flex-col gap-[15rpx]"
          >
            <div class="flex items-center gap-[15rpx]">
              <image :src="comment.avatar" class="h-[70rpx] w-[70rpx] rounded-full object-cover" mode="aspectFill" />
              <div class="flex flex-col gap-[5rpx]">
                <div class="text-[#333] font-medium text-[28rpx]">
                  {{ comment.userName }}
                </div>
                <div class="text-[#999] text-[24rpx]">
                  {{ comment.createTime }}
                </div>
              </div>
            </div>
            <div class="pl-[85rpx] text-[#666] text-[28rpx]">
              {{ comment.content }}
            </div>
          </div>
        </div>
        <button class="mx-auto mt-[10rpx] text-[#97493d] text-[28rpx]">
          查看全部评价 >
        </button>
      </div>

      <!-- 服务保障 -->
      <div class="my-[20rpx] flex flex-col gap-[20rpx] bg-white px-[30rpx] py-[30rpx]">
        <div class="text-[#333] font-medium text-[30rpx]">
          服务保障
        </div>
        <div class="text-[#666] text-[28rpx]">
          {{ productDetail.service }}
        </div>
      </div>

      <!-- 底部占位 -->
      <div class="h-[150rpx]" />
    </scroll-view>

    <!-- 底部操作栏 -->
    <div class="fixed bottom-0 left-0 right-0 h-[100rpx] flex items-center justify-between border-t border-[#f0f0f0] bg-white px-[20rpx] py-[10rpx]" :style="{ paddingBottom: `${safeAreaInsets?.bottom || 0}px` }">
      <div class="flex items-center gap-[15rpx]">
        <button class="flex flex-col items-center justify-center gap-[0rpx]" @click="handleGoHome">
          <image src="/static/app/home.png" class="h-[32rpx] w-[32rpx]" mode="aspectFill" />
          <span class="text-[#666] text-[20rpx]">首页</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-[0rpx]" @click="handleCustomerService">
          <image src="/static/app/customer_service.png" class="h-[32rpx] w-[32rpx]" mode="aspectFill" />
          <span class="text-[#666] text-[20rpx]">客服</span>
        </button>
        <button class="flex flex-col items-center justify-center gap-[0rpx]" @click="handleGoCart">
          <image src="/static/app/cart.png" class="h-[32rpx] w-[32rpx]" mode="aspectFill" />
          <span class="text-[#666] text-[20rpx]">购物车</span>
        </button>
      </div>

      <div class="flex items-center gap-[15rpx]">
        <button
          class="h-[70rpx] w-[160rpx] rounded-[35rpx] bg-[#ff9500] text-white font-medium text-[26rpx]"
          @click="handleAddToCart"
        >
          加入购物车
        </button>
        <button
          class="h-[70rpx] w-[160rpx] rounded-[35rpx] bg-[#ff4d4f] text-white font-medium text-[26rpx]"
          @click="handleBuyNow"
        >
          立即购买
        </button>
      </div>
    </div>

    <!-- 商品购买弹窗 -->
    <ProductBuyModal
      :visible="showBuyModal"
      :product="productDetail"
      @close="showBuyModal = false"
      @confirm="handleBuyConfirm"
    />
  </div>
</template>
