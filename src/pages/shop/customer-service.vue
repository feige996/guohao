<script setup lang="ts">
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 消息类型定义
interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: number
}

// 商品信息接口
interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

// 状态管理
const messages = ref<Message[]>([
  {
    id: 1,
    content: '你好，请问有什么可以帮助您的？',
    isUser: false,
    timestamp: Date.now() - 60000,
  },
])

const inputMessage = ref('')
const showProductCard = ref(false)

// 示例商品信息
const product = ref<Product>({
  id: 1,
  name: '特效根治痛风散',
  price: 68.00,
  quantity: 1,
})

// 计算属性
const messagesContainer = computed(() => {
  // 用于滚动到底部的引用
  return {
    scrollTop: 99999,
  }
})

// 发送消息
function sendMessage() {
  if (!inputMessage.value.trim())
    return

  const newMessage: Message = {
    id: Date.now(),
    content: inputMessage.value.trim(),
    isUser: true,
    timestamp: Date.now(),
  }

  messages.value.push(newMessage)
  inputMessage.value = ''

  // 模拟客服回复
  setTimeout(() => {
    const reply = generateReply(newMessage.content)
    const replyMessage: Message = {
      id: Date.now() + 1,
      content: reply,
      isUser: false,
      timestamp: Date.now(),
    }
    messages.value.push(replyMessage)
  }, 1000)
}

// 根据用户消息生成回复
function generateReply(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('价格') || lowerMessage.includes('多少钱')) {
    return `这个商品的价格是¥${product.value.price}，现在有优惠活动，您可以放心购买。`
  }
  else if (lowerMessage.includes('怎么买') || lowerMessage.includes('如何购买')) {
    return '您可以直接点击商品下方的"立即购买"按钮，或者先加入购物车再结算。一个疗程建议购买6包哦，亲。'
  }
  else if (lowerMessage.includes('效果') || lowerMessage.includes('有效')) {
    return '特效根治痛风散是纯中草药制作，对缓解痛风症状有很好的效果，大多数用户反馈使用后疼痛明显减轻。'
  }
  else if (lowerMessage.includes('冲泡') || lowerMessage.includes('服用')) {
    return '是的，我们的商品是可以冲服的。将一包药粉倒入杯中，加入适量温水搅拌均匀后即可服用，建议每日三次。'
  }
  else {
    return '感谢您的咨询！如果您有任何关于产品的问题，欢迎随时向我提问。'
  }
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 显示商品卡片
function toggleProductCard() {
  showProductCard.value = !showProductCard.value
}

// 增加商品数量
function increaseQuantity() {
  product.value.quantity++
}

// 减少商品数量
function decreaseQuantity() {
  if (product.value.quantity > 1) {
    product.value.quantity--
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f5f5]" :style="{ paddingTop: `${safeAreaInsets?.top}px`, paddingBottom: `${safeAreaInsets?.bottom}px` }">
    <!-- 顶部导航栏 -->
    <div class="sticky top-0 z-10 h-[96rpx] flex items-center bg-white px-[32rpx] shadow-sm">
      <div class="mr-[20rpx] h-[64rpx] w-[64rpx] flex items-center justify-center border-0 outline-none" @click="handleBack">
        <text class="text-[#333] font-bold text-[40rpx]">&lt;</text>
      </div>
      <h1 class="flex-1 text-center font-medium text-[36rpx]">
        在线客服
      </h1>
      <div class="h-[64rpx] w-[64rpx]" />
    </div>

    <!-- 消息列表区域 -->
    <div class="flex-1 overflow-y-auto p-[20rpx]" :scroll-top="messagesContainer.scrollTop">
      <div v-for="message in messages" :key="message.id" class="mb-[30rpx]">
        <!-- 用户消息 -->
        <div v-if="message.isUser" class="flex justify-end">
          <div class="max-w-[60%] rounded-[15rpx] rounded-br-none bg-[#97493d] p-[20rpx] text-white text-[28rpx]">
            {{ message.content }}
          </div>
          <image src="https://picsum.photos/100/100?random=user" class="ml-[10rpx] h-[50rpx] w-[50rpx] rounded-full object-cover" mode="aspectFill" />
        </div>

        <!-- 客服消息 -->
        <div v-else class="flex justify-start">
          <image src="https://picsum.photos/100/100?random=service" class="mr-[10rpx] h-[50rpx] w-[50rpx] rounded-full object-cover" mode="aspectFill" />
          <div class="max-w-[60%] rounded-[15rpx] rounded-bl-none bg-white p-[20rpx] text-[#333] text-[28rpx]">
            {{ message.content }}
          </div>
        </div>
      </div>

      <!-- 商品卡片 -->
      <div v-if="showProductCard" class="mx-auto mb-[20rpx] max-w-[500rpx] rounded-[15rpx] bg-white p-[20rpx] shadow-md">
        <div class="flex items-center gap-[20rpx]">
          <image src="https://picsum.photos/400/400?random=101" class="h-[120rpx] w-[120rpx] rounded-[10rpx] object-cover" mode="aspectFill" />
          <div class="min-w-0 flex-1">
            <div class="line-clamp-2 text-[#333] font-medium text-[28rpx]">
              {{ product.name }}
            </div>
            <div class="mt-[10rpx] text-[#ff4d4f] font-bold text-[32rpx]">
              ¥{{ product.price }}
            </div>
            <div class="mt-[10rpx] flex items-center gap-[15rpx]">
              <button class="h-[40rpx] w-[40rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[28rpx]" @click="decreaseQuantity">
                -
              </button>
              <span class="text-[28rpx]">{{ product.quantity }}</span>
              <button class="h-[40rpx] w-[40rpx] flex items-center justify-center border border-[#e8e8e8] rounded-full text-[28rpx]" @click="increaseQuantity">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="sticky bottom-0 z-10 border-t border-[#e8e8e8] bg-white p-[20rpx]">
      <div class="flex items-center gap-[20rpx]">
        <button class="h-[60rpx] w-[60rpx] flex items-center justify-center text-[#666] text-[36rpx]" @click="toggleProductCard">
          🛍️
        </button>
        <input
          v-model="inputMessage"
          type="text"
          class="h-[70rpx] flex-1 rounded-[35rpx] bg-[#f5f5f5] px-[30rpx] py-[15rpx] outline-none text-[28rpx]"
          placeholder="请输入您的问题..."
          @keyup.enter="sendMessage"
        >
        <button
          class="rounded-full bg-[#97493d] px-[30rpx] py-[15rpx] text-white font-medium text-[28rpx]"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>
