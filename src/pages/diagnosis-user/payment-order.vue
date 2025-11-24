<script setup lang="ts">
import type { Address } from '@/data'
import { onLoad } from '@dcloudio/uni-app'
import { addresses } from '@/data'
import AddressSelector from './components/AddressSelector.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import PaymentMethodSelector from './components/PaymentMethodSelector.vue'

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '订单支付',
  },
})
// 页面参数
const recordId = ref('')
const fee = ref(0)

// 当前选中的支付方式
const selectedPaymentMethod = ref('wechat')

// 支付确认弹窗
const showPaymentModal = ref(false)

// 当前选中的收货地址
const selectedAddressIndex = ref(0)

// 收货地址数据
const addressList = ref<Address[]>(addresses)

// 支付方式选项（简化版）
const paymentMethodList = ref([
  {
    id: 'wechat',
    name: '微信支付',
    icon: '💚',
    description: '推荐使用',
  },
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💙',
    description: '安全快捷',
  },
])

// 页面加载
onLoad((options: any) => {
  recordId.value = options.recordId || ''
  fee.value = Number.parseInt(options.fee) || 0
})

// 选择支付方式
function selectPaymentMethod(methodId: string) {
  selectedPaymentMethod.value = methodId
}

// 选择收货地址
function selectAddress(index: number) {
  selectedAddressIndex.value = index
}

// 立即支付
function handlePayment() {
  showPaymentModal.value = true
}

// 确认支付
function confirmPayment() {
  startPayment()
}

// 开始支付
function startPayment() {
  uni.showLoading({
    title: '支付中...',
  })

  // TODO: 对接旧代码
  setTimeout(() => {
    uni.hideLoading()
    uni.showModal({
      title: '支付成功',
      content: '您的订单已支付成功，药品将尽快为您配送！',
      showCancel: false,
      confirmText: '确定',
      success: () => {
        // 支付成功后跳回处方记录页面并刷新
        uni.navigateBack({
          success: () => {
            // 通过事件总线或其他方式通知刷新
            uni.$emit('refreshPrescriptionRecords')
          },
        })
      },
    })
  }, 2000)
}

// 获取选中的支付方式名称
function getSelectedPaymentMethodName() {
  const method = paymentMethodList.value.find((m: any) => m.id === selectedPaymentMethod.value)
  return method?.name || '未知支付方式'
}

// 获取选中的收货地址
function getSelectedAddress() {
  return addressList.value[selectedAddressIndex.value]
}

// 返回
function handleBack() {
  uni.navigateBack()
}

// 管理收货地址
function manageAddresses() {
  uni.showToast({
    title: '跳转地址管理',
    icon: 'none',
  })
}
</script>

<template>
  <view class="min-h-screen w-full flex flex-col bg-gray-50">
    <!-- 订单信息 -->
    <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
      <view class="mb-24rpx flex items-center justify-between">
        <text class="text-32rpx text-gray-800 font-bold">订单信息</text>
      </view>
      <view class="flex flex-col gap-20rpx">
        <view class="flex items-center justify-between border-b border-gray-100 py-16rpx">
          <text class="text-28rpx text-gray-500 font-medium">订单号</text>
          <text class="text-28rpx text-gray-800 font-semibold">{{ recordId }}</text>
        </view>
        <view class="flex items-center justify-between border-b border-gray-100 py-16rpx">
          <text class="text-28rpx text-gray-500 font-medium">商品</text>
          <text class="text-28rpx text-gray-800 font-semibold">处方药品</text>
        </view>
        <view class="flex items-center justify-between py-16rpx">
          <text class="text-28rpx text-gray-500 font-medium">支付金额</text>
          <text class="text-32rpx text-primary font-bold">¥ {{ fee }}</text>
        </view>
      </view>
    </view>

    <!-- 收货地址 -->
    <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
      <AddressSelector
        v-model="selectedAddressIndex"
        :addresses="addressList"
        @manage="manageAddresses"
      />
    </view>

    <!-- 支付方式 -->
    <view class="m-24rpx border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg">
      <view class="mb-24rpx">
        <text class="text-32rpx text-gray-800 font-bold">支付方式</text>
      </view>
      <PaymentMethodSelector
        v-model="selectedPaymentMethod"
        :methods="paymentMethodList"
      />
    </view>

    <!-- 支付确认弹窗 -->
    <ConfirmModal
      v-model:visible="showPaymentModal"
      title="确认支付"
      :content="`支付金额：¥${fee.toFixed(2)}\n支付方式：${getSelectedPaymentMethodName()}`"
      confirm-text="确认支付"
      @confirm="confirmPayment"
    />

    <!-- 支付按钮 -->
    <view class="sticky bottom-0 left-0 right-0 mt-auto flex items-center gap-24rpx border-t border-gray-200/80 bg-white p-24rpx shadow-lg">
      <view class="flex flex-1 flex-col gap-4rpx">
        <text class="text-24rpx text-gray-500">需支付</text>
        <text class="text-36rpx text-primary font-bold">¥ {{ fee }}</text>
      </view>
      <button class="to-primary-dark h-96rpx flex-shrink-0 rounded-48rpx border-none from-primary bg-gradient-to-br px-48rpx text-32rpx text-white font-semibold shadow-lg transition-all active:scale-95 active:shadow-md" aria-label="立即支付" @tap="handlePayment">
        立即支付
      </button>
    </view>
  </view>
</template>
