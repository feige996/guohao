<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { prescriptionRecords as mockPrescriptionRecords } from '@/data'
import type { PrescriptionRecord } from '@/data'
import PageHeader from '@/components/PageHeader.vue'
import TabBar from '@/components/TabBar.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import EmptyState from '@/components/EmptyState.vue'

definePage({
  style: {
    navigationBarTitleText: "我的处方",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

// 当前选中的标签
const activeTab = ref("all");

// 标签配置
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'unpaid', label: '待支付' },
  { key: 'completed', label: '已完成' }
];

// 当前支付的记录ID
const recordId = ref('');

// 处方记录数据
const prescriptionRecords = ref<PrescriptionRecord[]>(mockPrescriptionRecords);

// 筛选后的记录
const filteredRecords = computed(() => {
  if (activeTab.value === "all") {
    return prescriptionRecords.value;
  } else if (activeTab.value === "completed") {
    return prescriptionRecords.value.filter((r) => r.status === "completed");
  } else if (activeTab.value === "unpaid") {
    return prescriptionRecords.value.filter((r) => !r.isPaid);
  }
  return prescriptionRecords.value;
});

// 切换标签
function switchTab(tab: string) {
  activeTab.value = tab;
}

// 查看处方详情
function viewPrescriptionDetail(id: number) {
  uni.navigateTo({
    url: `/pages/prescription-detail?id=${id}`,
  });
}

// 支付处方
function payPrescription(record: any) {
  recordId.value = record.id.toString()
  uni.navigateTo({
    url: `/pages/payment-order?recordId=${record.id}&fee=${record.totalAmount}`,
  });
}


// 返回
function handleBack() {
  uni.navigateBack();
}

// 切换标签
function handleTabChange(tab: string) {
  activeTab.value = tab;
}

// 获取状态文本
function getStatusText(record: any) {
  if (record.status === "expired") {
    return "已过期";
  } else if (record.isPaid) {
    return "已支付";
  } else if (record.status === "completed") {
    return "已完成";
  } else {
    return "待支付";
  }
}

// 获取状态样式
function getStatusClass(record: any) {
  if (record.status === "expired") {
    return "status-expired";
  } else if (record.isPaid) {
    return "status-paid";
  } else if (record.status === "completed") {
    return "status-completed";
  } else {
    return "status-unpaid";
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
  <view class="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
    <!-- 顶部导航 -->
    <PageHeader title="我的处方" @back="handleBack" />

    <!-- 标签页导航 -->
    <view class="flex-shrink-0 bg-white pt-24rpx pb-16rpx shadow-sm">
      <TabBar v-model="activeTab" :tabs="tabs" @change="handleTabChange" />
    </view>

    <!-- 记录列表 -->
    <scroll-view scroll-y class="flex-1 min-h-0">
      <EmptyState v-if="filteredRecords.length === 0" text="暂无处方记录" icon="📋" />

      <view v-else class="p-24rpx flex flex-col gap-24rpx">
        <view
          v-for="record in filteredRecords"
          :key="record.id"
          class="relative bg-white rounded-24rpx p-32rpx shadow-lg border border-gray-200/80 transition-all overflow-hidden active:scale-98"
        >
          <!-- 医生信息 -->
          <view class="flex gap-24rpx mb-24rpx">
            <view class="flex-shrink-0">
              <image
                :src="record.doctor.avatar"
                class="w-120rpx h-120rpx rounded-16rpx border-2rpx border-primary/10"
                mode="aspectFill"
              />
            </view>

            <view class="flex-1 flex flex-col gap-12rpx">
              <view class="flex items-start justify-between gap-16rpx">
                <view class="flex-1 flex flex-col gap-8rpx">
                  <text class="text-30rpx font-bold text-gray-800">{{ record.doctor.name }}</text>
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
          <view class="bg-gray-50 rounded-16rpx p-20rpx mb-24rpx border border-gray-200/80">
            <view class="flex justify-between items-center mb-12rpx">
              <text class="text-26rpx font-semibold text-gray-800">处方编号：{{ record.prescriptionNumber }}</text>
              <text class="text-22rpx text-gray-400">{{ record.date }}</text>
            </view>
            <text class="block text-26rpx text-gray-500 mb-16rpx">诊断：{{ record.diagnosis }}</text>

            <!-- 价格信息 -->
            <view class="flex justify-end pt-12rpx border-t border-gray-100">
              <text class="text-28rpx font-bold text-primary">¥ {{ record.totalAmount }}</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="flex gap-20rpx">
            <button
              class="flex-1 h-80rpx rounded-16rpx text-26rpx font-semibold flex items-center justify-center gap-12rpx transition-all border-none active:scale-95 border-2rpx border-primary bg-white text-primary active:bg-red-50"
              @tap="viewPrescriptionDetail(record.id)"
              aria-label="查看详情"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" class="w-28rpx h-28rpx">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path
                  fill-rule="evenodd"
                  d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              查看详情
            </button>

            <button
              v-if="!record.isPaid"
              class="flex-1 h-80rpx rounded-16rpx text-26rpx font-semibold flex items-center justify-center gap-12rpx transition-all border-none active:scale-95 bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg active:shadow-md"
              @tap="payPrescription(record)"
              aria-label="支付"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" class="w-28rpx h-28rpx">
                <path
                  d="M2.5 3.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5v-9ZM1 4v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1Zm14 3H0v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6ZM4 7.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Z"
                />
              </svg>
              支付
            </button>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
