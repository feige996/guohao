<script lang="ts" setup>
import { definePage } from '@uni-helper/vite-plugin-uni-pages'
import { computed, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationBarTitleText: '我的预约',
  },
})

// 定义预约类型接口
interface Appointment {
  id: string
  doctorName: string
  consultationType: string
  appointmentTime: string
  status: '已确认' | '待确认' | '待付款' | '已完成'
  statusColor: string
  statusBgColor?: string
}

// 标签页数据
const tabs = ref(['全部', '已确认', '待确认', '待付款'])
const activeTab = ref('全部')

// 预约列表数据
const appointments = ref<Appointment[]>([
  {
    id: '1',
    doctorName: '张帅',
    consultationType: '视频问诊',
    appointmentTime: '2025-6-2 10:30',
    status: '已确认',
    statusColor: '#4CAF50',
    statusBgColor: '#4CAF5020',
  },
  {
    id: '2',
    doctorName: '李浩',
    consultationType: '语音问诊',
    appointmentTime: '2025-5-2 14:30',
    status: '已完成',
    statusColor: '#2196F3',
    statusBgColor: '#2196F320',
  },
  {
    id: '3',
    doctorName: '王医生',
    consultationType: '视频问诊',
    appointmentTime: '2025-6-5 09:00',
    status: '待确认',
    statusColor: '#FF9800',
    statusBgColor: '#FF980020',
  },
  {
    id: '4',
    doctorName: '赵医生',
    consultationType: '图文问诊',
    appointmentTime: '2025-6-3 16:00',
    status: '待付款',
    statusColor: '#F44336',
    statusBgColor: '#F4433620',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 过滤后的预约列表
const filteredAppointments = computed(() => {
  let result = appointments.value

  // 按标签筛选
  if (activeTab.value !== '全部') {
    result = result.filter(item => item.status === activeTab.value)
  }

  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(item =>
      item.doctorName.toLowerCase().includes(keyword)
      || item.consultationType.toLowerCase().includes(keyword)
      || item.appointmentTime.toLowerCase().includes(keyword),
    )
  }

  return result
})

// 切换标签
function switchTab(tab: string) {
  activeTab.value = tab
}

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 取消预约
function cancelAppointment(id: string) {
  uni.showModal({
    title: '取消预约',
    content: '确定要取消该预约吗？',
    success: (res) => {
      if (res.confirm) {
        // 这里应该调用API取消预约
        uni.showToast({ title: '预约已取消', icon: 'success' })
      }
    },
  })
}

// 改签预约
function rescheduleAppointment(id: string) {
  // 这里应该跳转到改签页面
  uni.showToast({ title: '跳转到改签页面', icon: 'none' })
}

// 进入诊室
function enterConsultationRoom(id: string) {
  // 跳转到候诊室页面，移除.vue扩展名
  uni.navigateTo({
    url: `/pages/normal/online-consultation/waiting-room?id=${id}`,
    success: () => {
      console.log('跳转到候诊室成功')
    },
    fail: (err) => {
      console.error('跳转到候诊室失败:', err)
    }
  })
}
</script>

<template>
  <view class="h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px`, paddingBottom: `${safeAreaInsets?.bottom}px` }">
    <!-- 顶部导航栏 -->
    <view class="h-[92rpx] flex items-center justify-between border-b border-[#f0f0f0] bg-white px-[32rpx]">
      <view class="h-[44rpx] w-[44rpx] flex touch-none items-center justify-center bg-transparent p-0" style="background: transparent; border: none; outline: none; tap-highlight-color: transparent; -webkit-tap-highlight-color: transparent;" @click="goBack">
        <text class="text-[#333333] font-medium text-[36rpx]">‹</text>
      </view>
      <text class="text-[#333333] font-medium text-[32rpx]">我的预约</text>
      <view class="h-[44rpx] w-[44rpx]" />
    </view>

    <!-- 搜索框 -->
    <view class="bg-white p-[24rpx]">
      <view class="relative">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索预约信息"
          placeholder-style="color:#999999; font-size:28rpx"
          class="h-[80rpx] w-full rounded-[40rpx] bg-[#f5f5f5] px-[80rpx] py-0 text-[28rpx]"
        >
        <image src="/static/images/search-icon.png" class="absolute left-[32rpx] top-1/2 h-[32rpx] w-[32rpx] -translate-y-1/2" mode="aspectFit" />
        <image
          v-if="searchKeyword"
          src="/static/images/clear-icon.png"
          class="absolute right-[32rpx] top-1/2 h-[32rpx] w-[32rpx] -translate-y-1/2"
          mode="aspectFit"
          @click="clearSearch"
        />
      </view>
    </view>

    <!-- 标签页 -->
    <view class="flex border-b border-[#f0f0f0] bg-white">
      <view
        v-for="tab in tabs"
        :key="tab"
        class="flex flex-1 items-center justify-center py-[28rpx] text-[28rpx]"
        :class="activeTab === tab ? 'text-[#3b82f6] font-medium' : 'text-[#666666]'"
        @click="switchTab(tab)"
      >
        {{ tab }}
        <view
          v-if="activeTab === tab"
          class="mt-[8rpx] h-[4rpx] w-[40rpx] rounded-full bg-[#3b82f6]"
        />
      </view>
    </view>

    <!-- 预约列表 -->
    <scroll-view class="flex-1" scroll-y>
      <view v-if="filteredAppointments.length > 0" class="bg-white divide-y divide-[#f0f0f0]">
        <view v-for="appointment in filteredAppointments" :key="appointment.id" class="p-[32rpx]">
          <!-- 医生信息和状态 -->
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <image src="/static/images/doctor-avatar.png" class="h-[64rpx] w-[64rpx] rounded-full" mode="aspectFit" />
              <view class="ml-[20rpx]">
                <text class="text-[#333333] font-medium text-[28rpx]">预约医师：{{ appointment.doctorName }}</text>
                <text class="mt-[8rpx] block text-[#666666] text-[26rpx]">问诊方式：{{ appointment.consultationType }}</text>
                <text class="mt-[4rpx] block text-[#666666] text-[26rpx]">预约时间：{{ appointment.appointmentTime }}</text>
              </view>
            </view>
            <view class="rounded-[16rpx] px-[20rpx] py-[8rpx]" :style="{ backgroundColor: appointment.statusBgColor, color: appointment.statusColor }">
              <text class="text-[24rpx]">{{ appointment.status }}</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="mt-[32rpx] flex justify-end gap-[20rpx]">
            <button
              class="h-[72rpx] w-[160rpx] rounded-[36rpx] text-[26rpx]"
              style="color: white; background-color: #f44336; border: none;"
              @click="cancelAppointment(appointment.id)"
            >
              取消
            </button>
            <button
              class="h-[72rpx] w-[160rpx] rounded-[36rpx] text-[26rpx]"
              style="color: white; background-color: #ff9800; border: none;"
              @click="rescheduleAppointment(appointment.id)"
            >
              改签
            </button>
            <button
              class="h-[72rpx] w-[160rpx] rounded-[36rpx] text-[26rpx]"
              style="color: white; background-color: #4caf50; border: none;"
              :disabled="appointment.status !== '已确认'"
              @click="enterConsultationRoom(appointment.id)"
            >
              进入诊室
            </button>
          </view>
        </view>
      </view>
      <view v-else class="h-[400rpx] flex items-center justify-center">
        <text class="text-[#999999] text-[28rpx]">暂无预约记录</text>
      </view>
    </scroll-view>
  </view>
</template>
