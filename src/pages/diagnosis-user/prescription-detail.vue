<script setup lang="ts">
import { prescriptionRecords } from '@/data'
import type { PrescriptionRecord } from '@/data'

definePage({
  style: {
    navigationBarTitleText: "处方详情",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

const prescriptionId = ref<number>(0);
const prescription = ref<PrescriptionRecord | null>(null);

// 页面加载时获取处方详情
onLoad((options: any) => {
  if (options.id) {
    prescriptionId.value = parseInt(options.id);
    loadPrescriptionDetail();
  }
});

// 加载处方详情
function loadPrescriptionDetail() {
  const found = prescriptionRecords.find(p => p.id === prescriptionId.value);
  if (found) {
    prescription.value = found;
  } else {
    uni.showToast({
      title: '处方不存在',
      icon: 'none'
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  }
}

// 返回上一页
function goBack() {
  uni.navigateBack();
}

// 支付处方
function handlePayment() {
  if (!prescription.value) return;
  uni.navigateTo({
    url: `/pages/payment-order?recordId=${prescription.value.id}&fee=${prescription.value.totalAmount}`,
  });
}

// 查看物流
function viewLogistics() {
  if (!prescription.value?.shippingInfo) return;
  uni.showToast({ title: '查看物流信息', icon: 'none' });
}

// 联系客服
function contactService() {
  uni.showToast({ title: '联系客服', icon: 'none' });
}

// 再次购买
function repurchase() {
  uni.showToast({ title: '再次购买', icon: 'none' });
}

// 获取状态文本
function getStatusText() {
  if (!prescription.value) return '';
  const statusMap: Record<string, string> = {
    'pending': '待支付',
    'paid': '已支付',
    'shipped': '配送中',
    'completed': '已完成'
  };
  return statusMap[prescription.value.status] || '未知';
}

// 获取状态颜色
function getStatusColor() {
  if (!prescription.value) return 'text-gray-500';
  const colorMap: Record<string, string> = {
    'pending': 'text-orange-600',
    'paid': 'text-blue-600',
    'shipped': 'text-purple-600',
    'completed': 'text-green-600'
  };
  return colorMap[prescription.value.status] || 'text-gray-500';
}

// 获取状态背景色
function getStatusBgColor() {
  if (!prescription.value) return 'bg-gray-100';
  const bgMap: Record<string, string> = {
    'pending': 'bg-orange-100',
    'paid': 'bg-blue-100',
    'shipped': 'bg-purple-100',
    'completed': 'bg-green-100'
  };
  return bgMap[prescription.value.status] || 'bg-gray-100';
}
</script>

<template>
  <view class="w-full min-h-screen bg-gray-50 flex flex-col">
    <!-- 顶部导航 -->
    <view class="flex-shrink-0 flex items-center justify-between px-32rpx pt-24rpx pb-20rpx bg-white shadow-sm">
      <button class="w-68rpx h-68rpx rounded-16rpx border-none bg-gray-100 flex items-center justify-center" @tap="goBack">
        <text class="text-32rpx text-gray-700 font-bold">←</text>
      </button>
      <text class="flex-1 text-center text-34rpx font-bold text-gray-900">处方详情</text>
      <view class="w-68rpx" />
    </view>

    <scroll-view v-if="prescription" class="flex-1" scroll-y>
      <view class="p-24rpx flex flex-col gap-16rpx">
        <!-- 状态卡片 -->
        <view class="bg-gradient-to-br from-primary/10 to-primary/5 rounded-24rpx p-32rpx">
          <view class="flex items-center justify-between mb-16rpx">
            <text class="text-28rpx font-bold text-gray-800">处方状态</text>
            <view class="px-20rpx py-8rpx rounded-full" :class="getStatusBgColor()">
              <text class="text-24rpx font-bold" :class="getStatusColor()">{{ getStatusText() }}</text>
            </view>
          </view>
          <view class="flex items-center gap-12rpx">
            <text class="text-24rpx text-gray-600">处方编号：</text>
            <text class="text-24rpx font-mono text-gray-800">{{ prescription.prescriptionNumber }}</text>
          </view>
          <view class="flex items-center gap-12rpx mt-8rpx">
            <text class="text-24rpx text-gray-600">开方时间：</text>
            <text class="text-24rpx text-gray-800">{{ prescription.date }}</text>
          </view>
        </view>

        <!-- 医生信息卡片 -->
        <view class="bg-white rounded-24rpx p-32rpx">
          <text class="block text-28rpx font-bold text-gray-900 mb-24rpx">医生信息</text>
          <view class="flex items-center gap-24rpx">
            <image 
              :src="prescription.doctor.avatar" 
              class="w-120rpx h-120rpx rounded-20rpx border-4rpx border-gray-100" 
              mode="aspectFill" 
            />
            <view class="flex-1 flex flex-col gap-12rpx">
              <text class="text-32rpx font-bold text-gray-900">{{ prescription.doctor.name }}</text>
              <text class="text-26rpx text-gray-600">{{ prescription.doctor.title }}</text>
              <text class="text-24rpx text-gray-500">{{ prescription.doctor.hospital }} · {{ prescription.doctor.department }}</text>
            </view>
          </view>
        </view>

        <!-- 诊断信息卡片 -->
        <view class="bg-white rounded-24rpx p-32rpx">
          <text class="block text-28rpx font-bold text-gray-900 mb-20rpx">诊断信息</text>
          <view class="px-24rpx py-20rpx bg-blue-50 rounded-16rpx border-l-8rpx border-blue-500">
            <text class="text-26rpx text-gray-800 leading-relaxed">{{ prescription.diagnosis }}</text>
          </view>
        </view>

        <!-- 药品明细卡片 -->
        <view class="bg-white rounded-24rpx p-32rpx">
          <text class="block text-28rpx font-bold text-gray-900 mb-24rpx">药品明细</text>
          <view class="flex flex-col gap-20rpx">
            <view 
              v-for="(medicine, index) in prescription.medicines" 
              :key="index"
              class="pb-20rpx border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <view class="flex items-start justify-between mb-12rpx">
                <view class="flex-1">
                  <text class="block text-28rpx font-bold text-gray-900 mb-8rpx">{{ index + 1 }}. {{ medicine.name }}</text>
                  <text class="block text-24rpx text-gray-600 mb-6rpx">规格：{{ medicine.specification }}</text>
                  <text class="block text-24rpx text-gray-600 mb-6rpx">数量：{{ medicine.quantity }}</text>
                  <view class="px-16rpx py-8rpx bg-green-50 rounded-12rpx inline-block mt-8rpx">
                    <text class="text-22rpx text-green-700">用法：{{ medicine.usage }}</text>
                  </view>
                </view>
                <text class="text-28rpx font-bold text-primary ml-16rpx">¥{{ medicine.price.toFixed(2) }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 费用明细卡片 -->
        <view class="bg-white rounded-24rpx p-32rpx">
          <text class="block text-28rpx font-bold text-gray-900 mb-24rpx">费用明细</text>
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">药品费用</text>
              <text class="text-26rpx text-gray-800">¥{{ prescription.totalAmount.toFixed(2) }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">运费</text>
              <text class="text-26rpx text-gray-800">¥0.00</text>
            </view>
            <view class="h-2rpx bg-gray-100 my-8rpx" />
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-30rpx font-bold text-gray-900">合计</text>
              <text class="text-36rpx font-bold text-primary">¥{{ prescription.totalAmount.toFixed(2) }}</text>
            </view>
          </view>
        </view>

        <!-- 物流信息卡片（仅已发货显示） -->
        <view v-if="prescription.shippingInfo" class="bg-white rounded-24rpx p-32rpx">
          <text class="block text-28rpx font-bold text-gray-900 mb-24rpx">物流信息</text>
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">快递公司</text>
              <text class="text-26rpx text-gray-800">{{ prescription.shippingInfo.company }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">快递单号</text>
              <text class="text-24rpx font-mono text-gray-800">{{ prescription.shippingInfo.trackingNumber }}</text>
            </view>
            <view class="flex items-center justify-between py-12rpx">
              <text class="text-26rpx text-gray-600">物流状态</text>
              <text class="text-26rpx font-bold text-green-600">{{ prescription.shippingInfo.status }}</text>
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
        <view class="bg-yellow-50 rounded-24rpx p-32rpx border border-yellow-200">
          <view class="flex items-start gap-16rpx">
            <text class="text-32rpx">💡</text>
            <view class="flex-1">
              <text class="block text-26rpx font-bold text-yellow-800 mb-12rpx">温馨提示</text>
              <text class="block text-24rpx text-yellow-700 leading-relaxed mb-8rpx">• 请按照医嘱服用药物，不可擅自增减剂量</text>
              <text class="block text-24rpx text-yellow-700 leading-relaxed mb-8rpx">• 服药期间如有不适，请及时联系医生</text>
              <text class="block text-24rpx text-yellow-700 leading-relaxed mb-8rpx">• 请将药品存放在阴凉干燥处，避免儿童接触</text>
              <text class="block text-24rpx text-yellow-700 leading-relaxed">• 如需咨询，可联系在线客服</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作区 -->
      <view class="p-24rpx flex flex-col gap-16rpx">
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
