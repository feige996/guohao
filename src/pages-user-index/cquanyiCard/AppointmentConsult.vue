<script setup lang="ts">
import { reactive, ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'
import YuyueCard from './compoents/yuyueCard.vue'

// 预约状态接口
interface AppointmentItem {
  id: string | number
  doctorName: string
  doctorAvatar: string
  status: 'confirmed' | 'completed'
  consultationType: 'video' | 'voice'
  appointmentDate: string
  appointmentTime: string
}

// 状态管理
const searchKeyword = ref('')
const activeTab = ref('全部')
const tabs = ['全部', '已确认', '待确认', '待付款']
const appointments = ref<AppointmentItem[]>([])

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '问诊提醒',
    navigationBarBackgroundColor: '#fff',
  },
})

// 模拟预约数据
const mockAppointments: AppointmentItem[] = [
  {
    id: 1,
    doctorName: '张帅',
    doctorAvatar: '/src/static/images/doctor1.png',
    status: 'confirmed',
    consultationType: 'video',
    appointmentDate: '2025-6-2',
    appointmentTime: '10:30',
  },
  {
    id: 2,
    doctorName: '李浩',
    doctorAvatar: '/src/static/images/doctor2.png',
    status: 'completed',
    consultationType: 'voice',
    appointmentDate: '2025-5-2',
    appointmentTime: '14:30',
  },
  {
    id: 3,
    doctorName: '王医生',
    doctorAvatar: '/src/static/default-avatar.png',
    status: 'confirmed',
    consultationType: 'video',
    appointmentDate: '2025-6-15',
    appointmentTime: '09:00',
  },
  {
    id: 4,
    doctorName: '陈医生',
    doctorAvatar: '/src/static/default-avatar.png',
    status: 'completed',
    consultationType: 'voice',
    appointmentDate: '2025-4-20',
    appointmentTime: '16:00',
  },
]

// 初始化数据
appointments.value = mockAppointments

// 过滤后的预约列表
const filteredAppointments = ref<AppointmentItem[]>(appointments.value)

// 处理搜索
function handleSearch(event: any) {
  searchKeyword.value = event.target?.value || ''
  filterAppointments()
}

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
  filterAppointments()
}

// 切换标签
function switchTab(tab: string) {
  activeTab.value = tab
  filterAppointments()
}

// 过滤预约列表
function filterAppointments() {
  let filtered = appointments.value

  // 标签过滤
  if (activeTab.value === '已确认') {
    filtered = filtered.filter(item => item.status === 'confirmed')
  }
  else if (activeTab.value === '待确认') {
    // 这里可以根据实际状态进行过滤
    filtered = []
  }
  else if (activeTab.value === '待付款') {
    // 这里可以根据实际状态进行过滤
    filtered = []
  }

  // 搜索过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.doctorName.toLowerCase().includes(keyword)
      || item.appointmentDate.includes(keyword)
      || (item.consultationType === 'video' ? '视频问诊' : '语音问诊').includes(keyword),
    )
  }

  filteredAppointments.value = filtered
}

// 关闭页面
function closePage() {
  uni.navigateBack()
}

// 处理预约操作
function handleAppointmentAction(appointmentId: string | number, action: 'cancel' | 'reschedule' | 'enter') {
  switch (action) {
    case 'cancel':
      uni.showModal({
        title: '取消预约',
        content: '确定要取消这个预约吗？',
        success: (res) => {
          if (res.confirm) {
            // 在实际项目中，这里应该调用API取消预约
            uni.showToast({ title: '预约已取消', icon: 'success' })
            // 更新本地数据
            const index = appointments.value.findIndex(item => item.id === appointmentId)
            if (index !== -1) {
              appointments.value.splice(index, 1)
              filterAppointments()
            }
          }
        },
      })
      break
    case 'reschedule':
      uni.showToast({ title: '改签功能开发中', icon: 'none' })
      break
    case 'enter':
      // 跳转到诊室页面
      uni.navigateTo({
        url: `/pages-user-diagnosis/online-consultation/consultation?doctorId=${appointmentId}`,
      })
      break
  }
}

// 初始过滤
filterAppointments()
</script>

<template>
  <view class="appointment-consult-page" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部导航栏
    <view class="sticky top-0 z-10 bg-white shadow-sm">
      <view class="flex items-center h-[100rpx] px-[24rpx] relative">
        返回按钮
        <view class="flex items-center justify-center w-[80rpx] h-[80rpx] absolute left-[24rpx]" @click="closePage">
          <text class="text-[32rpx] font-bold">&lt;</text>
        </view>
         居中标题
        <text class="text-[36rpx] font-medium text-[#333333] absolute left-1/2 transform -translate-x-1/2">我的预约</text>
      </view>
    </view> -->

    <!-- 搜索栏 -->
    <view class="sticky top-0 z-10 bg-white px-[24rpx] py-[24rpx] shadow-sm">
      <view class="relative">
        <uni-icons class="absolute left-[20rpx] top-1/2 transform text-[#999] -translate-y-1/2" type="search" size="28rpx" />
        <input
          v-model="searchKeyword"
          class="h-[72rpx] rounded-[36rpx] bg-[#f5f5f5] pl-[72rpx] pr-[72rpx] outline-none text-[28rpx]"
          placeholder="搜索预约信息"
          @input="handleSearch"
        >
        <uni-icons
          v-if="searchKeyword"
          class="absolute right-[20rpx] top-1/2 transform text-[#999] -translate-y-1/2"
          type="clear"
          size="28rpx"
          @click="clearSearch"
        />
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="sticky top-[100rpx] z-5 border-b border-[#f0f0f0] bg-white">
      <view class="flex">
        <view
          v-for="tab in tabs"
          :key="tab"
          class="flex-1 py-[28rpx] text-center transition-all duration-200 text-[28rpx]"
          :class="{
            'text-[#ff6b35] font-medium': activeTab === tab,
            'text-[#666666]': activeTab !== tab,
          }"
          @click="switchTab(tab)"
        >
          <text>{{ tab }}</text>
          <view
            v-if="activeTab === tab"
            class="mx-auto mt-[8rpx] h-[4rpx] w-[40rpx] rounded-full bg-[#ff6b35]"
          />
        </view>
      </view>
    </view>

    <!-- 预约列表 -->
    <view class="bg-[#f5f5f7] p-[24rpx]">
      <!-- 预约卡片列表 -->
      <template v-if="filteredAppointments.length > 0">
        <YuyueCard
          v-for="appointment in filteredAppointments"
          :key="appointment.id"
          :status="appointment.status"
          :doctor-name="appointment.doctorName"
          :doctor-avatar="appointment.doctorAvatar"
          :consultation-type="appointment.consultationType"
          :appointment-date="appointment.appointmentDate"
          :appointment-time="appointment.appointmentTime"
          @cancel="() => handleAppointmentAction(appointment.id, 'cancel')"
          @reschedule="() => handleAppointmentAction(appointment.id, 'reschedule')"
          @enter-consultation-room="() => handleAppointmentAction(appointment.id, 'enter')"
        />
      </template>

      <!-- 空状态 -->
      <view v-else class="flex flex-col items-center justify-center py-[100rpx]">
        <uni-icons type="calendar" size="80rpx" color="#ccc" />
        <text class="mt-[24rpx] text-[#999999] text-[28rpx]">暂无预约记录</text>
      </view>
    </view>
  </view>
</template>
