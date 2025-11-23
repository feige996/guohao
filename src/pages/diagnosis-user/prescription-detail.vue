<script setup lang="ts">
import type { PrescriptionRecord } from '@/data'
import { prescriptionRecords } from '@/data'

definePage({
  style: {
    navigationBarTitleText: '处方详情',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

const prescriptionId = ref<number>(0)
const prescription = ref<PrescriptionRecord | null>(null)

// 页面加载时获取处方详情
onLoad((options: any) => {
  if (options.id) {
    prescriptionId.value = Number.parseInt(options.id)
    loadPrescriptionDetail()
  }
})

// 加载处方详情
function loadPrescriptionDetail() {
  const found = prescriptionRecords.find(p => p.id === prescriptionId.value)
  if (found) {
    prescription.value = found
  }
  else {
    uni.showToast({
      title: '处方不存在',
      icon: 'none',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 支付处方
function handlePayment() {
  if (!prescription.value)
    return
  uni.navigateTo({
    url: `/pages/payment-order?recordId=${prescription.value.id}&fee=${prescription.value.totalAmount}`,
  })
}

// 查看物流
function viewLogistics() {
  if (!prescription.value?.shippingInfo)
    return
  uni.showToast({ title: '查看物流信息', icon: 'none' })
}

// 联系客服
function contactService() {
  uni.showToast({ title: '联系客服', icon: 'none' })
}

// 再次购买
function repurchase() {
  uni.showToast({ title: '再次购买', icon: 'none' })
}

// 获取状态文本
function getStatusText() {
  if (!prescription.value)
    return ''
  const statusMap: Record<string, string> = {
    pending: '待支付',
    paid: '已支付',
    shipped: '配送中',
    completed: '已完成',
  }
  return statusMap[prescription.value.status] || '未知'
}

// 获取状态颜色
function getStatusColor() {
  if (!prescription.value)
    return 'text-gray-500'
  const colorMap: Record<string, string> = {
    pending: 'text-orange-600',
    paid: 'text-blue-600',
    shipped: 'text-purple-600',
    completed: 'text-green-600',
  }
  return colorMap[prescription.value.status] || 'text-gray-500'
}

// 获取状态背景色
function getStatusBgColor() {
  if (!prescription.value)
    return 'bg-gray-100'
  const bgMap: Record<string, string> = {
    pending: 'bg-orange-100',
    paid: 'bg-blue-100',
    shipped: 'bg-purple-100',
    completed: 'bg-green-100',
  }
  return bgMap[prescription.value.status] || 'bg-gray-100'
}
</script>

<template>
  <view class="min-h-screen w-full flex flex-col bg-gray-50">
    <!-- 顶部导航 -->
    <view class="flex flex-shrink-0 items-center justify-between bg-white px-32rpx pb-20rpx pt-24rpx shadow-sm">
      <button class="h-68rpx w-68rpx flex items-center justify-center border-none bg-gray-100" @tap="goBack">
        <text class="text-32rpx text-gray-700 font-bold">←</text>
      </button>
      <text class="flex-1 text-center text-34rpx text-gray-900 font-bold">处方详情</text>
      <view class="w-68rpx" />
    </view>

    <scroll-view v-if="prescription" class="flex-1" scroll-y>
      <view class="flex flex-col gap-16rpx p-24rpx">
        <!-- 状态卡片 -->
        <view class="rounded-24rpx from-primary/10 to-primary/5 bg-gradient-to-br p-32rpx">
          <view class="mb-16rpx flex items-center justify-between">
            <text class="text-28rpx text-gray-800 font-bold">处方状态</text>
            <view class="rounded-full px-20rpx py-8rpx" :class="getStatusBgColor()">
              <text class="text-24rpx font-bold" :class="getStatusColor()">{{ getStatusText() }}</text>
            </view>
          </view>
          <view class="flex items-center gap-12rpx">
            <text class="text-24rpx text-gray-600">处方编号：</text>
            <text class="text-24rpx text-gray-800 font-mono">{{ prescription.prescriptionNumber }}</text>
          </view>
          <view class="mt-8rpx flex items-center gap-12rpx">
            <text class="text-24rpx text-gray-600">开方时间：</text>
            <text class="text-24rpx text-gray-800">{{ prescription.date }}</text>
          </view>
        </view>

        <!-- 医生信息卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx">
          <text class="mb-24rpx block text-28rpx text-gray-900 font-bold">医生信息</text>
          <view class="flex items-center gap-24rpx">
            <image
              :src="prescription.doctor.avatar"
              class="h-120rpx w-120rpx border-4rpx border-gray-100 rounded-20rpx"
              mode="aspectFill"
            />
            <view class="flex flex-1 flex-col gap-12rpx">
              <text class="text-32rpx text-gray-900 font-bold">{{ prescription.doctor.name }}</text>
              <text class="text-26rpx text-gray-600">{{ prescription.doctor.title }}</text>
              <text class="text-24rpx text-gray-500">{{ prescription.doctor.hospital }} · {{ prescription.doctor.department }}</text>
            </view>
          </view>
        </view>

        <!-- 诊断信息卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx">
          <text class="mb-20rpx block text-28rpx text-gray-900 font-bold">诊断信息</text>
          <view class="border-l-8rpx border-blue-500 rounded-16rpx bg-blue-50 px-24rpx py-20rpx">
            <text class="text-26rpx text-gray-800 leading-relaxed">{{ prescription.diagnosis }}</text>
          </view>
        </view>

        <!-- 药品明细卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx">
          <text class="mb-24rpx block text-28rpx text-gray-900 font-bold">药品明细</text>
          <view class="flex flex-col gap-20rpx">
            <view
              v-for="(medicine, index) in prescription.medicines"
              :key="index"
              class="border-b border-gray-100 pb-20rpx last:border-b-0 last:pb-0"
            >
              <view class="mb-12rpx flex items-start justify-between">
                <view class="flex-1">
                  <text class="mb-8rpx block text-28rpx text-gray-900 font-bold">{{ index + 1 }}. {{ medicine.name }}</text>
                  <text class="mb-6rpx block text-24rpx text-gray-600">规格：{{ medicine.specification }}</text>
                  <text class="mb-6rpx block text-24rpx text-gray-600">数量：{{ medicine.quantity }}</text>
                  <view class="mt-8rpx inline-block rounded-12rpx bg-green-50 px-16rpx py-8rpx">
                    <text class="text-22rpx text-green-700">用法：{{ medicine.usage }}</text>
                  </view>
                </view>
                <text class="ml-16rpx text-28rpx text-primary font-bold">¥{{ medicine.price.toFixed(2) }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 费用明细卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx">
          <text class="mb-24rpx block text-28rpx text-gray-900 font-bold">费用明细</text>
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">药品费用</text>
              <text class="text-26rpx text-gray-800">¥{{ prescription.totalAmount.toFixed(2) }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">运费</text>
              <text class="text-26rpx text-gray-800">¥0.00</text>
            </view>
            <view class="my-8rpx h-2rpx bg-gray-100" />
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-30rpx text-gray-900 font-bold">合计</text>
              <text class="text-36rpx text-primary font-bold">¥{{ prescription.totalAmount.toFixed(2) }}</text>
            </view>
          </view>
        </view>

        <!-- 物流信息卡片（仅已发货显示） -->
        <view v-if="prescription.shippingInfo" class="rounded-24rpx bg-white p-32rpx">
          <text class="mb-24rpx block text-28rpx text-gray-900 font-bold">物流信息</text>
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">快递公司</text>
              <text class="text-26rpx text-gray-800">{{ prescription.shippingInfo.company }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">快递单号</text>
              <text class="text-24rpx text-gray-800 font-mono">{{ prescription.shippingInfo.trackingNumber }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">物流状态</text>
              <text class="text-26rpx text-green-600 font-bold">{{ prescription.shippingInfo.status }}</text>
            </view>
            <wd-button
              block
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; margin-top: 16rpx;"
              @click="viewLogistics"
            >
              查看物流详情
            </wd-button>
          </view>
        </view>

        <!-- 温馨提示卡片 -->
        <view class="border border-yellow-200 rounded-24rpx bg-yellow-50 p-32rpx">
          <view class="flex items-start gap-16rpx">
            <text class="text-32rpx">💡</text>
            <view class="flex-1">
              <text class="mb-12rpx block text-26rpx text-yellow-800 font-bold">温馨提示</text>
              <text class="mb-8rpx block text-24rpx text-yellow-700 leading-relaxed">• 请按照医嘱服用药物，不可擅自增减剂量</text>
              <text class="mb-8rpx block text-24rpx text-yellow-700 leading-relaxed">• 服药期间如有不适，请及时联系医生</text>
              <text class="mb-8rpx block text-24rpx text-yellow-700 leading-relaxed">• 请将药品存放在阴凉干燥处，避免儿童接触</text>
              <text class="block text-24rpx text-yellow-700 leading-relaxed">• 如需咨询，可联系在线客服</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作区 -->
      <view class="flex flex-col gap-16rpx p-24rpx">
        <!-- 待支付状态 -->
        <wd-button
          v-if="prescription.status === 'pending'"
          type="primary"
          block
          custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none; height: 96rpx; font-size: 32rpx;"
          @click="handlePayment"
        >
          立即支付 ¥{{ prescription.totalAmount.toFixed(2) }}
        </wd-button>

        <!-- 已支付/配送中状态 -->
        <view v-if="prescription.status === 'paid' || prescription.status === 'shipped'" class="flex gap-16rpx">
          <wd-button
            custom-class="flex-1"
            custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; height: 88rpx;"
            @click="contactService"
          >
            联系客服
          </wd-button>
          <wd-button
            v-if="prescription.shippingInfo"
            custom-class="flex-1"
            type="primary"
            custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none; height: 88rpx;"
            @click="viewLogistics"
          >
            查看物流
          </wd-button>
        </view>

        <!-- 已完成状态 -->
        <view v-if="prescription.status === 'completed'" class="flex gap-16rpx">
          <wd-button
            custom-class="flex-1"
            custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; height: 88rpx;"
            @click="contactService"
          >
            联系客服
          </wd-button>
          <wd-button
            custom-class="flex-1"
            type="primary"
            custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none; height: 88rpx;"
            @click="repurchase"
          >
            再次购买
          </wd-button>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>

<style scoped>
.last\:border-b-0:last-child {
  border-bottom-width: 0;
}

.last\:pb-0:last-child {
  padding-bottom: 0;
}
</style>
