<script setup lang="ts">
import { computed, ref } from 'vue'
// 监听商品变化
import { watch } from 'vue'

import { safeAreaInsets } from '@/utils/systemInfo'

// Props定义
interface Props {
  visible: boolean
  product: {
    id: number
    name: string
    subtitle: string
    price: number
    originalPrice: number
    images: string[]
    selectedSku: string
    skus: string[]
    stock: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

// Emits定义
const emit = defineEmits<{
  close: []
  confirm: [{ quantity: number, sku: string }]
}>()

// 购买数量
const quantity = ref(1)

// 当前选择的规格
const selectedSku = ref(props.product?.selectedSku || '')

// 计算折扣
const discount = computed(() => {
  if (!props.product)
    return 0
  return Math.round((props.product.price / props.product.originalPrice) * 100)
})

// 增加数量
function handleIncrease() {
  if (props.product && quantity.value < props.product.stock) {
    quantity.value++
  }
}

// 减少数量
function handleDecrease() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 选择规格
function handleSkuSelect(sku: string) {
  selectedSku.value = sku
}

// 关闭弹窗
function handleClose() {
  emit('close')
}

// 确认购买
function handleConfirm() {
  emit('confirm', { quantity: quantity.value, sku: selectedSku.value })
  // 关闭弹窗
  emit('close')
}

// 当商品变化时，重置选择
function resetSelection() {
  if (props.product) {
    selectedSku.value = props.product.selectedSku
    quantity.value = 1
  }
}
watch(() => props.product, resetSelection, { deep: true })
</script>

<template>
  <transition name="modal">
    <div v-if="visible" class="fixed inset-0 z-50 flex flex-col">
      <!-- 遮罩层 -->
      <div class="fixed inset-0" @click="handleClose" />

      <!-- 弹窗内容 -->
      <div class="mt-auto rounded-t-[40rpx] bg-white pb-[100rpx]" :style="{ paddingBottom: `${safeAreaInsets?.bottom || 0 + 100}rpx` }">
        <!-- 商品信息 -->
        <div class="flex gap-[20rpx] border-b border-[#f0f0f0] p-[30rpx]">
          <image
            :src="product?.images[0] || ''"
            class="h-[240rpx] w-[240rpx] rounded-[10rpx] object-cover"
            mode="aspectFill"
          />
          <div class="flex flex-1 flex-col justify-between">
            <div class="flex flex-col gap-[10rpx]">
              <div class="text-[#333] font-bold text-[36rpx]">
                {{ product?.name || '' }}
              </div>
              <div class="text-[#666] text-[28rpx]">
                {{ product?.subtitle || '' }}
              </div>
            </div>
            <div class="flex items-end gap-[10rpx]">
              <span class="text-[#ff4d4f] font-bold text-[48rpx]">¥{{ product?.price || 0 }}</span>
              <span class="text-[#999] line-through text-[28rpx]">¥{{ product?.originalPrice || 0 }}</span>
              <div class="rounded-[10rpx] bg-[#fff2f0] px-[15rpx] py-[5rpx] text-[#ff4d4f] text-[24rpx]">
                {{ discount }}折
              </div>
            </div>
          </div>
        </div>

        <!-- 规格选择 -->
        <div class="border-b border-[#f0f0f0] p-[30rpx]">
          <div class="mb-[20rpx] text-[#333] font-medium text-[30rpx]">
            选择规格
          </div>
          <div class="flex flex-wrap gap-[20rpx]">
            <button
              v-for="sku in product?.skus || []"
              :key="sku"
              class="border-2 rounded-[10rpx] px-[30rpx] py-[20rpx] transition-all text-[28rpx]"
              :class="{
                'border-[#97493d] bg-[#f6e2d3] text-[#97493d]': selectedSku === sku,
                'border-[#e8e8e8] text-[#666]': selectedSku !== sku,
              }"
              @click="handleSkuSelect(sku)"
            >
              {{ sku }}
            </button>
          </div>
        </div>

        <!-- 购买数量 -->
        <div class="flex items-center justify-between border-b border-[#f0f0f0] p-[30rpx]">
          <span class="text-[#333] font-medium text-[30rpx]">
            购买数量
          </span>
          <div class="flex items-center gap-[30rpx]">
            <button
              class="h-[60rpx] w-[60rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[32rpx]"
              :disabled="quantity <= 1"
              :class="{ 'text-[#ccc]': quantity <= 1 }"
              @click="handleDecrease"
            >
              -
            </button>
            <span class="text-[30rpx]">{{ quantity }}</span>
            <button
              class="h-[60rpx] w-[60rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[32rpx]"
              :disabled="product && quantity >= product.stock"
              :class="{ 'text-[#ccc]': product && quantity >= product.stock }"
              @click="handleIncrease"
            >
              +
            </button>
          </div>
        </div>

        <!-- 底部确认按钮 -->
        <div class="fixed bottom-0 left-0 right-0 flex items-center bg-white px-[30rpx] py-[20rpx]" :style="{ paddingBottom: `${safeAreaInsets?.bottom || 0 + 20}rpx` }">
          <button
            class="h-[90rpx] flex-1 rounded-[45rpx] bg-[#ff4d4f] text-center text-white font-medium text-[32rpx]"
            @click="handleConfirm"
          >
            确定
          </button>
        </div>

        <!-- 关闭按钮 -->
        <div class="absolute right-[30rpx] top-[30rpx] h-[60rpx] w-[60rpx] flex items-center justify-center rounded-full bg-black/10 text-[36rpx]">
          ✕
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: translateY(100%);
}

.modal-leave-to .bg-white {
  transform: translateY(100%);
}
</style>
