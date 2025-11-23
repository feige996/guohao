<script setup lang="ts">
import { onlineDoctors, quickActions, recommendDoctors } from '@/data'

definePage({
  type: 'home',
})

// 搜索关键词
const searchKeyword = ref('')

// 主要功能卡片
const mainFeatures = [
  {
    id: 1,
    title: '在线问诊',
    subtitle: '中医专家',
    desc: '在线咨询',
    features: ['与专家实时沟通', '服务严格质控'],
    isFullWidth: true,
  },
  {
    id: 2,
    title: '在线问诊',
    subtitle: '特聘专家一对一服务',
    badge: '新用户首诊优惠',
    isFullWidth: false,
  },
  {
    id: 3,
    title: '导诊顾问',
    subtitle: '不清楚挂什么科？',
    desc: '专业指导 快速问答',
    isFullWidth: false,
  },
]

// 正在问诊医生数量
const consultingCount = computed(() => {
  return onlineDoctors.filter(doctor => doctor.status === 'consulting').length
})

// 可预约医生数量
const availableCount = computed(() => {
  return onlineDoctors.filter(doctor => doctor.status === 'available').length
})

// 搜索功能
function handleSearch() {
  if (searchKeyword.value.trim()) {
    uni.showToast({
      title: `搜索: ${searchKeyword.value}`,
      icon: 'none',
    })
  }
}

// 点击主要功能
function handleMainFeature(feature: any) {
  if (feature?.id === 1 || feature?.id === 2) {
    // 在线问诊，默认智能推荐
    uni.navigateTo({
      url: '/pages/diagnosis-user/consultation-order?mode=smart',
    })
    return
  }
  else if (feature?.id === 3) {
    // 导诊顾问，跳转到IM聊天页面
    const advisorInfo = {
      id: 'advisor-001',
      name: '导诊顾问',
      age: '',
      gender: '',
      avatar: 'https://cdn.pixabay.com/photo/2016/11/08/05/20/boy-1807518_640.jpg',
      symptom: '您好，请问有什么可以帮您的？',
    }
    uni.navigateTo({
      url: `/pages/diagnosis-user/im-chat?id=${advisorInfo.id}&name=${advisorInfo.name}&age=${advisorInfo.age}&gender=${advisorInfo.gender}&avatar=${advisorInfo.avatar}&symptom=${advisorInfo.symptom}`,
    })
    return
  }

  uni.showToast({
    title: feature.title,
    icon: 'none',
  })
}

// 快捷功能点击
function handleQuickAction(action: any) {
  // 问诊记录跳转到问诊记录页面
  if (action.id === 1) {
    uni.navigateTo({
      url: '/pages/diagnosis-user/consultation-records',
    })
    return
  }

  // 我的处方跳转到处方记录页面
  if (action.id === 2) {
    uni.navigateTo({
      url: '/pages/diagnosis-user/prescription-records',
    })
    return
  }

  // 健康档案跳转到患者档案页面
  if (action.id === 3) {
    uni.navigateTo({
      url: '/pages/diagnosis-user/patient-profile',
    })
    return
  }

  // 购药服务跳转到购药服务页面
  if (action.id === 4) {
    uni.navigateTo({
      url: '/pages/diagnosis-user/pharmacy',
    })
    return
  }

  uni.showToast({
    title: action.title,
    icon: 'none',
  })
}

// 点击医生卡片
function handleDoctorClick(doctor: any) {
  // 跳转到医生详情页
  uni.navigateTo({
    url: `/pages/diagnosis-user/doctor-detail?id=${doctor.id}`,
  })
}

// 点击在线诊室医生
function handleDoctorTap(doctor: any) {
  // 跳转到在线诊室列表
  uni.navigateTo({
    url: '/pages/diagnosis-user/online-clinic',
  })
}

// 查看全部专家
function handleViewAllDoctors() {
  uni.navigateTo({
    url: '/pages/diagnosis-user/all-doctors',
  })
}

// 查看全部专家坐诊
function handleViewAll() {
  uni.navigateTo({
    url: '/pages/diagnosis-user/online-clinic',
  })
}

// 获取状态文本
function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    consulting: '正在问诊',
    available: '可以预约',
  }
  return statusMap[status] || status
}
</script>

<template>
  <view class="min-h-screen w-full overflow-x-hidden bg-[#f5f0ed]">
    <!-- 主要功能卡片 -->
    <view class="flex flex-col gap-16rpx pb-20rpx">
      <!-- 在线问诊 - 全宽 -->
      <view
        class="relative h-370rpx min-h-370rpx overflow-hidden border border-[#f5ebe9] rounded-b-20rpx bg-[#fff5f3] transition-all active:shadow-lg"
        @tap="handleMainFeature(mainFeatures[0])"
      >
        <!-- 背景图 -->
        <image
          src="@/static/patient_top.png"
          mode="aspectFill"
          class="absolute inset-0 z-0 h-full w-full"
        />

        <!-- 内容 -->
        <view class="absolute left-48rpx top-48rpx z-10 max-w-[65%] flex flex-col gap-16rpx">
          <view class="h-20rpx" />
          <text class="mt-4rpx text-52rpx text-[#3d2925] font-extrabold leading-tight tracking-wide">在线问诊</text>
          <text class="text-24rpx text-[#6b4a43] font-normal leading-relaxed tracking-tight opacity-92">与专家实时图文语音沟通</text>
          <text class="text-24rpx text-[#6b4a43] font-normal leading-relaxed tracking-tight opacity-92 -mt-8rpx">全程管理,1对1定期回访</text>
        </view>
      </view>

      <!-- 在线问诊 & 导诊顾问 - 并排 -->
      <view class="flex gap-16rpx px-24rpx">
        <!-- 在线问诊卡片（背景图） -->
        <view class="relative flex-1 overflow-hidden rounded-18rpx shadow-md transition-all active:scale-97">
          <image src="~@/static/OnlineConsultation.png" mode="widthFix" class="block h-auto w-full" />
          <!-- 立即问诊按钮 -->
          <view class="absolute bottom-40rpx left-1/2 z-10 min-w-160rpx flex items-center justify-center gap-6rpx border border-cyan-600/20 rounded-36rpx from-white to-[#f0fdff] bg-gradient-to-br px-24rpx py-14rpx shadow-md transition-all -translate-x-1/2 active:scale-95" @tap.stop="handleMainFeature(mainFeatures[1])">
            <svg class="h-32rpx w-32rpx flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <text class="whitespace-nowrap text-24rpx text-cyan-600 font-semibold tracking-tight">立即问诊</text>
          </view>
        </view>

        <!-- 导诊顾问卡片（背景图） -->
        <view class="relative flex-1 overflow-hidden rounded-18rpx shadow-md transition-all active:scale-97">
          <image src="~@/static/Guidance.png" mode="widthFix" class="block h-auto w-full" />
          <!-- 立即咨询按钮 -->
          <view class="absolute bottom-40rpx left-1/2 z-10 min-w-160rpx flex items-center justify-center gap-6rpx border border-amber-600/20 rounded-36rpx from-white to-[#fef7ed] bg-gradient-to-br px-24rpx py-14rpx shadow-md transition-all -translate-x-1/2 active:scale-95" @tap.stop="handleMainFeature(mainFeatures[2])">
            <svg class="h-32rpx w-32rpx flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <text class="whitespace-nowrap text-24rpx text-amber-600 font-semibold tracking-tight">立即咨询</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷功能 -->
    <view class="px-24rpx pb-20rpx">
      <view class="w-full flex items-center justify-around border border-[#8e4337]/12 rounded-20rpx from-[#fdf7f5] to-[#f7ebe7] bg-gradient-to-b px-20rpx py-28rpx shadow-lg">
        <view
          v-for="action in quickActions"
          :key="action.id"
          class="flex flex-1 flex-col items-center gap-12rpx transition-all active:scale-95"
          @tap="handleQuickAction(action)"
        >
          <view class="h-80rpx w-80rpx flex items-center justify-center border border-[#8e4337]/20 rounded-12rpx from-[#8e4337]/14 to-[#b85c4f]/8 bg-gradient-to-br shadow-md">
            <svg
              v-if="action.icon === 'records'"
              class="h-44rpx w-44rpx"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8e4337"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6.5" y="3.5" width="11" height="17" rx="2" />
              <path d="M9 8h6" />
              <path d="M9 12h6" />
              <path d="M9 16h4" />
            </svg>
            <svg
              v-else-if="action.icon === 'prescription'"
              class="h-44rpx w-44rpx"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8e4337"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8h12l-1 6a5 5 0 0 1-10 0L6 8z" />
              <path d="M8 5h8" />
              <path d="M10 19h4" />
              <path d="M12 10v3" />
              <path d="M10.5 11.5h3" />
            </svg>
            <svg
              v-else-if="action.icon === 'health'"
              class="h-44rpx w-44rpx"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8e4337"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 17l4-5 3 4 5-7" />
              <path d="M5 5v12h14" />
            </svg>
            <svg
              v-else
              class="h-44rpx w-44rpx"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#8e4337"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 9h10l1 10H6l1-10z" />
              <path d="M9 9V7a3 3 0 0 1 6 0v2" />
              <path d="M12 12v4" />
              <path d="M10 14h4" />
            </svg>
          </view>
          <text class="text-center text-24rpx text-[#6b4a43] font-medium">{{ action.title }}</text>
        </view>
      </view>
    </view>

    <!-- 在线诊室 -->
    <view class="relative mx-24rpx mb-20rpx overflow-hidden border border-[#f5ebe9] rounded-20rpx from-[#fffbf8] to-[#fff5f0] bg-gradient-to-br px-28rpx py-28rpx shadow-lg">
      <!-- 装饰背景 -->
      <view class="pointer-events-none absolute h-200rpx w-200rpx rounded-full opacity-5 -right-[10%] -top-1/2" style="background: radial-gradient(circle, rgba(142, 67, 55, 1) 0%, transparent 70%);" />
      <view class="pointer-events-none absolute h-160rpx w-160rpx rounded-full opacity-4 -bottom-[30%] -left-[5%]" style="background: radial-gradient(circle, rgba(184, 92, 79, 1) 0%, transparent 70%);" />

      <view class="relative z-1 mb-24rpx flex items-start justify-between">
        <view class="flex flex-1 items-start gap-16rpx">
          <image
            src="~@/static/9513b018041bd.jpeg"
            class="h-88rpx w-88rpx flex-shrink-0 border-2 border-[#f5ebe9] rounded-12rpx object-cover"
            mode="aspectFill"
          />
          <view class="flex flex-1 flex-col gap-8rpx">
            <text class="text-32rpx text-gray-800 font-bold leading-tight">国浩特邀专家坐诊</text>
            <text class="block text-24rpx text-gray-500 leading-relaxed">{{ consultingCount }}位正在开诊，{{ availableCount }}位可预约</text>
          </view>
        </view>
        <view class="flex flex-shrink-0 items-center self-center justify-center border border-[#8e4337]/16 rounded-36rpx from-[#f7ebe7] to-[#fdf7f5] bg-gradient-to-br px-30rpx py-14rpx shadow-md transition-all active:scale-97" @tap="handleViewAll">
          <text class="text-26rpx text-[#8e4337] font-semibold leading-none tracking-tight">查看</text>
        </view>
      </view>

      <scroll-view scroll-x class="relative z-1 w-full whitespace-nowrap" :show-scrollbar="false">
        <view class="w-max flex gap-16rpx px-4rpx">
          <view
            v-for="(doctor, index) in onlineDoctors"
            :key="index"
            class="h-180rpx w-320rpx flex-shrink-0 overflow-hidden border border-[#f5ebe9] rounded-18rpx from-white to-[#fffcfa] bg-gradient-to-br shadow-sm transition-all active:scale-96"
            @tap="handleDoctorTap(doctor)"
          >
            <view class="h-full flex items-center gap-24rpx px-24rpx py-24rpx">
              <view class="flex flex-shrink-0 flex-col items-center gap-10rpx">
                <view class="h-100rpx w-100rpx flex items-center justify-center overflow-hidden border-2 border-[#f5ebe9] rounded-16rpx from-[#fff5f0] to-[#ffe9e0] bg-gradient-to-br">
                  <image
                    :src="doctor.avatar"
                    class="h-full w-full object-cover"
                    mode="aspectFill"
                  />
                </view>
                <view class="flex items-center justify-center border border-white rounded-10rpx px-10rpx py-4rpx shadow-sm" :class="doctor.status === 'consulting' ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-green-500 to-green-600'">
                  <text class="whitespace-nowrap text-20rpx text-white font-semibold leading-none">{{ getStatusText(doctor.status) }}</text>
                </view>
              </view>
              <view class="min-w-0 flex flex-1 flex-col gap-8rpx">
                <text class="overflow-hidden text-ellipsis whitespace-nowrap text-24rpx text-gray-800 font-bold leading-tight">{{ doctor.name }}</text>
                <text class="overflow-hidden text-ellipsis whitespace-nowrap text-22rpx text-gray-500 leading-snug">{{ doctor.title }}</text>
                <text class="overflow-hidden text-ellipsis whitespace-nowrap text-20rpx text-gray-400 leading-tight">{{ doctor.department }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 搜索栏 -->
    <view class="bg-[#f5f0ed] px-20rpx pb-20rpx pt-10rpx">
      <view class="relative h-72rpx w-full flex items-center">
        <view class="absolute left-24rpx z-10 flex items-center justify-center">
          <text class="text-32rpx opacity-50">🔍</text>
        </view>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索疾病、症状、科室等"
          class="h-72rpx w-full flex-1 rounded-36rpx border-none bg-white pl-72rpx pr-140rpx text-26rpx text-gray-800 outline-none"
          @confirm="handleSearch"
        >
        <view class="absolute right-6rpx h-60rpx flex items-center justify-center border border-[#8e4337]/12 rounded-30rpx from-[#f5ebe9] to-[#fdf7f5] bg-gradient-to-br px-28rpx transition-all active:scale-97" @tap="handleSearch">
          <text class="text-26rpx text-[#8e4337] font-medium">搜索</text>
        </view>
      </view>
    </view>

    <!-- 推荐专家 -->
    <view class="px-24rpx pb-100rpx pt-20rpx">
      <!-- 标题栏 -->
      <view class="mb-20rpx flex items-center justify-between">
        <view class="flex items-center gap-12rpx">
          <text class="text-36rpx text-gray-900 font-bold">推荐专家</text>
          <view class="rounded-8rpx bg-primary/10 px-12rpx py-4rpx">
            <text class="text-20rpx text-primary font-bold">HOT</text>
          </view>
        </view>
        <view class="flex items-center gap-6rpx rounded-12rpx bg-gray-100 px-16rpx py-8rpx transition-all active:opacity-70" @tap="handleViewAllDoctors">
          <text class="text-24rpx text-gray-700 font-medium">全部</text>
          <text class="text-24rpx text-gray-700">›</text>
        </view>
      </view>

      <!-- 专家列表 -->
      <view class="flex flex-col gap-16rpx">
        <view
          v-for="doctor in recommendDoctors"
          :key="doctor.id"
          class="overflow-hidden border-l-8rpx border-primary rounded-16rpx bg-white transition-all active:opacity-90"
          @tap="handleDoctorClick(doctor)"
        >
          <!-- 顶部信息栏 -->
          <view class="flex items-center justify-between bg-gray-50 px-24rpx py-16rpx">
            <view class="flex items-center gap-12rpx">
              <view class="rounded-8rpx bg-primary px-12rpx py-4rpx text-20rpx text-white font-medium">
                {{ doctor.department }}
              </view>
              <view class="rounded-8rpx bg-gray-200 px-12rpx py-4rpx text-20rpx text-gray-700 font-medium">
                {{ doctor.hospital }}
              </view>
            </view>
            <view class="flex items-center gap-4rpx">
              <text class="text-24rpx">⭐</text>
              <text class="text-22rpx text-gray-700 font-bold">5.0</text>
            </view>
          </view>

          <!-- 主要内容区 -->
          <view class="px-24rpx py-20rpx">
            <!-- 医生信息 -->
            <view class="mb-20rpx flex items-center gap-20rpx">
              <image
                :src="doctor.avatar"
                class="h-96rpx w-96rpx border-4rpx border-gray-100 rounded-full"
                mode="aspectFill"
              />
              <view class="flex flex-1 flex-col gap-8rpx">
                <view class="flex items-center gap-12rpx">
                  <text class="text-32rpx text-gray-900 font-bold">{{ doctor.name }}</text>
                  <view class="rounded-8rpx bg-blue-50 px-12rpx py-4rpx">
                    <text class="text-20rpx text-blue-600 font-medium">{{ doctor.title }}</text>
                  </view>
                </view>
                <view class="flex items-center gap-8rpx text-22rpx text-gray-500">
                  <text>👨‍⚕️</text>
                  <text>从业 10+ 年</text>
                </view>
              </view>
            </view>

            <!-- 专长标签 -->
            <view class="mb-16rpx flex flex-wrap gap-12rpx">
              <view
                v-for="(item, index) in doctor.specialty"
                :key="index"
                class="border border-gray-200 rounded-12rpx bg-gray-50 px-16rpx py-8rpx"
              >
                <text class="text-22rpx text-gray-600">{{ item }}</text>
              </view>
            </view>

            <!-- 医生简介 -->
            <view class="mb-16rpx border border-blue-100 rounded-12rpx bg-blue-50 px-20rpx py-16rpx">
              <text class="line-clamp-2 text-24rpx text-gray-600 leading-relaxed">
                {{ doctor.introduction || '擅长运用中医辨证论治，结合现代医学诊疗技术，为患者提供个性化的诊疗方案。' }}
              </text>
            </view>

            <!-- 底部操作栏 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-8rpx text-22rpx text-gray-400">
                <text>💬</text>
                <text>已服务 {{ doctor.consultations }}+ 人</text>
              </view>
              <wd-button
                type="primary"
                size="small"
                custom-class="consult-btn"
                @click.stop="handleDoctorClick(doctor)"
              >
                立即咨询
              </wd-button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部安全区 -->
    <view class="h-40rpx" />
  </view>
</template>

<style lang="scss" scoped>
:deep(.consult-btn) {
  padding: 12rpx 36rpx !important;
  border-radius: 12rpx !important;
  font-size: 24rpx !important;
  font-weight: 500 !important;
  height: 62rpx !important;
  // height: auto !important;
  min-height: auto !important;
  background-color: #8e4337 !important;
  border-color: #8e4337 !important;

  &:active {
    opacity: 0.8;
  }
}
</style>
