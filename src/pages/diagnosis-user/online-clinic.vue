<script setup lang="ts">
import type { ClinicDoctor, PatientStatus } from '@/data'
import {

  clinicDoctors,
  clinicTabOptions,
  DoctorStatus,
  mockPatientStatus,

} from '@/data'
import SearchBar from './components/SearchBar.vue'

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '在线坐诊',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

// 搜索关键词
const searchKeyword = ref('')

// 当前选中的tab
const activeTab = ref('consulting') // consulting: 正在问诊, available: 可以预约, myAppointments: 我的预约

// tab选项
const tabOptions = clinicTabOptions

// 模拟患者状态
const patientStatus = ref<PatientStatus>(mockPatientStatus)

// 在线诊室医生数据
const doctors = ref<ClinicDoctor[]>(clinicDoctors)

// 根据tab过滤的医生列表
const tabFilteredDoctors = computed(() => {
  if (activeTab.value === 'consulting') {
    // 正在问诊的医生
    return doctors.value.filter((doctor: ClinicDoctor) => doctor.status === DoctorStatus.CONSULTING)
  }
  else if (activeTab.value === 'available') {
    // 可以预约的医生
    return doctors.value.filter((doctor: ClinicDoctor) => doctor.status === DoctorStatus.AVAILABLE)
  }
  else if (activeTab.value === 'myAppointments') {
    // 我的预约（已取号或已预约的医生）
    return doctors.value.filter((doctor: ClinicDoctor) =>
      patientStatus.value.queuedDoctors.includes(doctor.id)
      || patientStatus.value.appointedDoctors.includes(doctor.id),
    )
  }
  return doctors.value
})

// 筛选后的医生列表（结合tab和搜索）
const filteredDoctors = computed(() => {
  let doctorList = tabFilteredDoctors.value

  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    doctorList = doctorList.filter((doctor: ClinicDoctor) =>
      doctor.name.toLowerCase().includes(keyword)
      || doctor.department.toLowerCase().includes(keyword)
      || doctor.specialty?.some((spec: string) => spec.toLowerCase().includes(keyword)),
    )
  }

  return doctorList
})

// 返回
function handleBack() {
  uni.navigateBack()
}

// 搜索
function handleSearch() {
  // 搜索逻辑已通过computed实现
  console.log('搜索关键词:', searchKeyword.value)
}

// 切换tab
function handleTabChange(tabKey: string) {
  activeTab.value = tabKey
  // 清空搜索关键词
  searchKeyword.value = ''
}

// 获取按钮文本
function getButtonText(doctor: ClinicDoctor) {
  const isQueued = patientStatus.value.queuedDoctors.includes(doctor.id)
  const isAppointed = patientStatus.value.appointedDoctors.includes(doctor.id)
  const hasSlots = doctor.usedSlots < doctor.totalSlots

  if (doctor.status === DoctorStatus.CONSULTING) {
    // 医生已开诊
    if (isQueued) {
      return '查看排队'
    }
    else if (hasSlots) {
      return '立即取号'
    }
    else {
      return '已排满'
    }
  }
  else { // available
    // 医生未开诊
    if (isAppointed) {
      return '等待开诊'
    }
    else if (hasSlots) {
      return '立即预约'
    }
    else {
      return '已排满'
    }
  }
}

// 获取按钮状态
function getButtonDisabled(doctor: ClinicDoctor) {
  const isQueued = patientStatus.value.queuedDoctors.includes(doctor.id)
  const isAppointed = patientStatus.value.appointedDoctors.includes(doctor.id)
  const hasSlots = doctor.usedSlots < doctor.totalSlots

  if (doctor.status === DoctorStatus.CONSULTING) {
    return !isQueued && !hasSlots // 未取号且无号源时禁用
  }
  else { // available
    return isAppointed || !hasSlots // 已预约或无号源时禁用
  }
}

// 获取医生状态文本
function getStatusText(doctor: ClinicDoctor) {
  // 如果在"我的预约"tab中，显示特殊状态
  if (activeTab.value === 'myAppointments') {
    const isQueued = patientStatus.value.queuedDoctors.includes(doctor.id)
    const isAppointed = patientStatus.value.appointedDoctors.includes(doctor.id)

    if (isQueued && doctor.status === DoctorStatus.CONSULTING) {
      return `已取号 · 排队第${doctor.waitingCount}位 · 预计等待${(doctor.waitingCount || 0) * 15}分钟`
    }
    else if (isAppointed && doctor.status === DoctorStatus.AVAILABLE) {
      return `已预约 · ${doctor.scheduledTime} · 等待开诊`
    }
  }

  // 默认状态显示
  if (doctor.status === DoctorStatus.CONSULTING) {
    return `${doctor.currentNumber}号问诊中，${doctor.waitingCount}人候诊`
  }
  else {
    const remaining = doctor.totalSlots - doctor.usedSlots
    return `${doctor.scheduledTime} · 剩余${remaining}个号`
  }
}

// 获取状态颜色
function getStatusColor(doctor: ClinicDoctor) {
  if (doctor.status === DoctorStatus.CONSULTING) {
    return '#10b981' // 绿色表示正在问诊
  }
  else {
    return '#f59e0b' // 橙色表示可预约
  }
}

// 处理按钮点击
function handleButtonClick(doctor: ClinicDoctor) {
  const isQueued = patientStatus.value.queuedDoctors.includes(doctor.id)
  const isAppointed = patientStatus.value.appointedDoctors.includes(doctor.id)
  const hasSlots = doctor.usedSlots < doctor.totalSlots

  if (doctor.status === DoctorStatus.CONSULTING) {
    if (isQueued) {
      // 查看排队状态
      showQueueStatus(doctor)
    }
    else if (hasSlots) {
      // 立即取号
      handleTakeNumber(doctor)
    }
    else {
      // 已排满
      uni.showToast({
        title: '今日号源已满',
        icon: 'none',
      })
    }
  }
  else { // available
    if (isAppointed) {
      // 等待开诊
      uni.showToast({
        title: '请耐心等待医生开诊',
        icon: 'none',
      })
    }
    else if (hasSlots) {
      // 立即预约
      handleMakeAppointment(doctor)
    }
    else {
      // 已排满
      uni.showToast({
        title: '预约号源已满',
        icon: 'none',
      })
    }
  }
}

// 立即取号 - 医生已开诊，以指定医生方式跳转
function handleTakeNumber(doctor: ClinicDoctor) {
  // 跳转到问诊订单页面（指定医生模式，当前问诊）
  uni.navigateTo({
    url: `/pages/diagnosis-user/consultation-order?mode=clinic&doctorId=${doctor.id}&consultationType=text-image&action=queue&scheduledTime=${encodeURIComponent('当前问诊')}`,
  })
}

// 立即预约 - 医生未开诊，以指定医生方式跳转
function handleMakeAppointment(doctor: ClinicDoctor) {
  // 跳转到问诊订单页面（指定医生模式，预约时间）
  uni.navigateTo({
    url: `/pages/diagnosis-user/consultation-order?mode=clinic&doctorId=${doctor.id}&consultationType=text-image&action=appointment&scheduledTime=${encodeURIComponent(doctor.scheduledTime || '')}`,
  })
}

// 显示排队状态
function showQueueStatus(doctor: ClinicDoctor) {
  const queueInfo = `当前${doctor.currentNumber}号问诊中\n您的排队位置：第${doctor.waitingCount}位\n预计等待时间：${(doctor.waitingCount || 0) * 15}分钟`

  uni.showModal({
    title: '排队状态',
    content: queueInfo,
    showCancel: false,
    confirmText: '知道了',
  })
}

// 查看医生详情
function handleViewDoctorDetail(doctor: ClinicDoctor) {
  uni.navigateTo({
    url: `/pages/diagnosis-user/doctor-detail?doctorId=${doctor.id}`,
  })
}
</script>

<template>
  <view class="h-screen w-full flex flex-col from-[#fffcfa] to-[#fff9f3] bg-gradient-to-b">
    <!-- Tab切换栏 -->
    <view class="flex flex-shrink-0 border-b border-gray-200 bg-white px-24rpx">
      <view
        v-for="tab in tabOptions"
        :key="tab.key"
        class="relative flex flex-1 cursor-pointer items-center justify-center py-24rpx transition-all"
        @tap="handleTabChange(tab.key)"
      >
        <text class="text-28rpx font-medium transition-all" :class="activeTab === tab.key ? 'text-[#8e4337] font-semibold' : 'text-gray-500'">{{ tab.label }}</text>
        <view v-if="activeTab === tab.key" class="absolute bottom-0 left-1/2 h-4rpx w-60rpx rounded-2rpx from-[#8e4337] to-[#6e2f25] bg-gradient-to-r -translate-x-1/2" />
      </view>
    </view>

    <!-- 搜索栏 -->
    <SearchBar
      v-model="searchKeyword"
      placeholder="搜索医生姓名、科室或擅长"
      :show-button="false"
      background-color="#FFFFFF"
      @confirm="handleSearch"
    />

    <!-- 医生列表 -->
    <scroll-view scroll-y class="min-h-0 flex-1">
      <view class="flex flex-col gap-24rpx px-24rpx py-24rpx">
        <view
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="active:shadow-xs overflow-hidden border border-[#f5ebe9] rounded-18rpx from-white to-[#fffcfa] bg-gradient-to-br px-32rpx py-32rpx shadow-sm transition-all active:scale-98"
        >
          <!-- 医生基本信息 -->
          <view class="mb-24rpx flex gap-24rpx">
            <view class="relative flex-shrink-0">
              <image
                :src="doctor.avatar"
                class="h-100rpx w-100rpx border-2 border-[#8e4337]/10 rounded-16rpx"
                mode="aspectFill"
              />
              <view
                class="absolute left-1/2 flex items-center justify-center border border-white rounded-10rpx px-10rpx py-4rpx shadow-sm -bottom-4rpx -translate-x-1/2"
                :class="doctor.status === 'consulting' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-green-500 to-green-600'"
              >
                <text class="whitespace-nowrap text-20rpx text-white font-semibold leading-none">
                  {{ doctor.status === 'consulting' ? '问诊中' : '可预约' }}
                </text>
              </view>
            </view>
            <view class="flex flex-1 flex-col gap-8rpx">
              <view class="flex items-center justify-between gap-16rpx">
                <text class="flex-1 text-30rpx text-gray-800 font-bold">{{ doctor.name }}</text>
                <view class="flex flex-shrink-0 items-center gap-16rpx">
                  <view class="flex items-center gap-6rpx">
                    <svg viewBox="0 0 16 16" fill="currentColor" class="h-20rpx w-20rpx text-amber-500">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <text class="text-24rpx text-amber-500 font-semibold">{{ doctor.rating }}</text>
                  </view>
                  <view class="flex items-center gap-4rpx border border-[#8e4337]/16 rounded-16rpx from-[#f7ebe7] to-[#fdf7f5] bg-gradient-to-br px-12rpx py-6rpx transition-all active:scale-95 active:bg-[#8e4337]/10" @tap="handleViewDoctorDetail(doctor)">
                    <text class="text-22rpx text-[#8e4337] font-medium">详情</text>
                    <svg viewBox="0 0 16 16" fill="currentColor" class="h-16rpx w-16rpx text-[#8e4337]">
                      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0L11.78 7.72a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06z" />
                    </svg>
                  </view>
                </view>
              </view>
              <text class="text-24rpx text-gray-500 font-medium">{{ doctor.title }} · {{ doctor.department }}</text>
              <text class="text-22rpx text-gray-400">{{ doctor.hospital }}</text>
            </view>
          </view>

          <!-- 状态信息 -->
          <view class="mb-24rpx flex flex-col gap-12rpx border border-gray-200 rounded-16rpx from-gray-50 to-gray-100 bg-gradient-to-br px-20rpx py-20rpx">
            <view class="flex items-center gap-8rpx">
              <text class="min-w-80rpx text-24rpx text-gray-500 font-medium">状态：</text>
              <text
                class="flex-1 text-24rpx font-semibold"
                :style="{ color: getStatusColor(doctor) }"
              >
                {{ getStatusText(doctor) }}
              </text>
            </view>
            <view class="flex items-center gap-8rpx">
              <text class="min-w-80rpx text-24rpx text-gray-500 font-medium">费用：</text>
              <text class="text-26rpx text-orange-500 font-bold">¥{{ doctor.price }}</text>
            </view>
          </view>

          <!-- 操作按钮 -->
          <button
            class="h-80rpx w-full flex items-center justify-center rounded-36rpx border-none text-28rpx font-semibold transition-all"
            :class="getButtonDisabled(doctor)
              ? 'bg-gray-200 text-gray-400 shadow-none border border-gray-200 opacity-60'
              : 'bg-gradient-to-br from-[#f7ebe7] to-[#fdf7f5] border border-[#8e4337]/16 shadow-md text-[#8e4337] active:scale-97 active:shadow-sm'"
            @tap="handleButtonClick(doctor)"
          >
            {{ getButtonText(doctor) }}
          </button>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
