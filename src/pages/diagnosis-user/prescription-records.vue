<script setup lang="ts">
import type { PrescriptionRecord } from '@/data'
import { onMounted, onUnmounted } from 'vue'
import { prescriptionRecords as mockPrescriptionRecords } from '@/data'
import EmptyState from './components/EmptyState.vue'
import StatusBadge from './components/StatusBadge.vue'
import TabBar from './components/TabBar.vue'

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '我的处方',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

// 当前选中的标签
const activeTab = ref('all')

// 标签配置
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unpaid', label: '待支付' },
  { key: 'completed', label: '已完成' },
]

// 当前支付的记录ID
const recordId = ref('')

// 处方记录数据
const prescriptionRecords = ref<PrescriptionRecord[]>(mockPrescriptionRecords)

// 筛选后的记录
const filteredRecords = computed(() => {
  if (activeTab.value === 'all') {
    return prescriptionRecords.value
  }
  else if (activeTab.value === 'completed') {
    return prescriptionRecords.value.filter(r => r.status === 'completed')
  }
  else if (activeTab.value === 'unpaid') {
    return prescriptionRecords.value.filter(r => !r.isPaid)
  }
  return prescriptionRecords.value
})

// 切换标签
function switchTab(tab: string) {
  activeTab.value = tab
}

// 查看处方详情
function viewPrescriptionDetail(id: number) {
  uni.navigateTo({
    url: `/pages/diagnosis-user/prescription-detail?id=${id}`,
  })
}

// 支付处方
function payPrescription(record: any) {
  recordId.value = record.id.toString()
  uni.navigateTo({
    url: `/pages/payment-order?recordId=${record.id}&fee=${record.totalAmount}`,
  })
}

// 返回
function handleBack() {
  uni.navigateBack()
}

// 切换标签
function handleTabChange(tab: string) {
  activeTab.value = tab
}

// 获取状态文本
function getStatusText(record: any) {
  if (record.status === 'expired') {
    return '已过期'
  }
  else if (record.isPaid) {
    return '已支付'
  }
  else if (record.status === 'completed') {
    return '已完成'
  }
  else {
    return '待支付'
  }
}

// 获取状态样式
function getStatusClass(record: any) {
  if (record.status === 'expired') {
    return 'status-expired'
  }
  else if (record.isPaid) {
    return 'status-paid'
  }
  else if (record.status === 'completed') {
    return 'status-completed'
  }
  else {
    return 'status-unpaid'
  }
}

// 页面挂载时监听刷新事件
onMounted(() => {
  uni.$on('refreshPrescriptionRecords', refreshPrescriptionRecords)
})

// 页面卸载时移除监听
onUnmounted(() => {
  uni.$off('refreshPrescriptionRecords', refreshPrescriptionRecords)
})

// 刷新处方记录数据
function refreshPrescriptionRecords() {
  // 模拟刷新数据
  uni.showLoading({
    title: '刷新中...',
  })

  setTimeout(() => {
    uni.hideLoading()
    // 这里可以调用实际的API来刷新数据
    // 为了演示，我们将一个记录的状态改为已支付
    const unpaidRecord = prescriptionRecords.value.find(r => !r.isPaid)
    if (unpaidRecord) {
      unpaidRecord.isPaid = true
    }

    uni.showToast({
      title: '数据已刷新',
      icon: 'success',
      duration: 1500,
    })
  }, 1000)
}
</script>

<template>
  <view class="h-screen w-full flex flex-col overflow-hidden bg-gray-50">
    <!-- 标签页导航 -->
    <view class="flex-shrink-0 bg-white pb-16rpx pt-24rpx shadow-sm">
      <TabBar v-model="activeTab" :tabs="tabs" @change="handleTabChange" />
    </view>

    <!-- 记录列表 -->
    <scroll-view scroll-y class="min-h-0 flex-1">
      <EmptyState v-if="filteredRecords.length === 0" text="暂无处方记录" icon="📋" />

      <view v-else class="flex flex-col gap-24rpx p-24rpx">
        <view
          v-for="record in filteredRecords"
          :key="record.id"
          class="relative overflow-hidden border border-gray-200/80 rounded-24rpx bg-white p-32rpx shadow-lg transition-all active:scale-98"
        >
          <!-- 医生信息 -->
          <view class="mb-24rpx flex gap-24rpx">
            <view class="flex-shrink-0">
              <image
                :src="record.doctor.avatar"
                class="h-120rpx w-120rpx border-2rpx border-primary/10 rounded-16rpx"
                mode="aspectFill"
              />
            </view>

            <view class="flex flex-1 flex-col gap-12rpx">
              <view class="flex items-start justify-between gap-16rpx">
                <view class="flex flex-1 flex-col gap-8rpx">
                  <text class="text-30rpx text-gray-800 font-bold">{{ record.doctor.name }}</text>
                  <text class="text-24rpx text-gray-500 font-medium">{{ record.doctor.title }}</text>
                </view>
                <StatusBadge
                  :status="getStatusClass(record).replace('status-', '')"
                  :text="getStatusText(record)"
                  type="prescription"
                  size="medium"
                />
              </view>
              <text class="text-22rpx text-gray-400">{{ record.doctor.hospital }} · {{ record.doctor.department }}</text>
            </view>
          </view>

          <!-- 处方信息 -->
          <view class="mb-24rpx border border-gray-200/80 rounded-16rpx bg-gray-50 p-20rpx">
            <view class="mb-12rpx flex items-center justify-between">
              <text class="text-26rpx text-gray-800 font-semibold">处方编号：{{ record.prescriptionNumber }}</text>
              <text class="text-22rpx text-gray-400">{{ record.date }}</text>
            </view>
            <text class="mb-16rpx block text-26rpx text-gray-500">诊断：{{ record.diagnosis }}</text>

            <!-- 价格信息 -->
            <view class="flex justify-end border-t border-gray-100 pt-12rpx">
              <text class="text-28rpx text-primary font-bold">¥ {{ record.totalAmount }}</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="flex gap-20rpx">
            <wd-button
              type="primary"
              icon="view"
              plain block
              class="w-full"
              @tap="viewPrescriptionDetail(record.id)"
            >
              查看详情
            </wd-button>

            <wd-button
              v-if="!record.isPaid"
              icon="wallet"
              block
              class="w-full"
              @tap="payPrescription(record)"
            >
              支付
            </wd-button>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
