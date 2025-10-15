<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面元数据
definePage({
  type: 'page',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '问诊预约',
  },
})

// 医生信息接口
interface DoctorInfo {
  id: string
  name: string
  avatar: string
  title: string
  specialty: string
  introduction: string
  consultationCount: number
  satisfactionRate: number
  responseSpeed: string
}

// 医生信息
const doctorInfo = ref<DoctorInfo>({
  id: '',
  name: '孙医生',
  avatar: '/static/images/avatar.jpg',
  title: '骨科专家',
  specialty: 'XX疗法传承人',
  introduction: '师从中医骨科泰斗xxx，从医20年、患者好评率99%、擅长针灸正骨。\n\n个人简介："耄耋祖训，专攻疑难骨科"',
  consultationCount: 121,
  satisfactionRate: 0,
  responseSpeed: '较快',
})

// 页面加载时获取医生ID
onLoad((options: any) => {
  if (options.id) {
    doctorInfo.value.id = options.id
    loadDoctorInfo(options.id)
  }
  if (options.name) {
    doctorInfo.value.name = decodeURIComponent(options.name)
  }
})

// 加载医生信息
async function loadDoctorInfo(doctorId: string) {
  try {
    // TODO: 调用API获取医生详细信息
    console.log('加载医生信息:', doctorId)
    // const response = await Apis.doctor.getDoctorDetail({ params: { id: doctorId } })
    // doctorInfo.value = response
  }
  catch (error) {
    console.error('加载医生信息失败:', error)
  }
}

// 去挂号
function handleRegister() {
  uni.showToast({
    title: '去挂号功能开发中',
    icon: 'none',
  })
}

// 去图文问诊
function handleTextConsultation() {
  uni.showToast({
    title: '去图文问诊功能开发中',
    icon: 'none',
  })
}

// 去电话问诊
function handlePhoneConsultation() {
  uni.showToast({
    title: '去电话问诊功能开发中',
    icon: 'none',
  })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="h-screen w-full flex flex-col bg-[#f5f5f5]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <wd-navbar title="问诊预约" left-text="返回" left-arrow @click-left="handleBack" />

    <!-- 主内容区域 -->
    <scroll-view class="flex-1" scroll-y>
      <view class="p-[24rpx]">
        <!-- 医生信息卡片 -->
        <view class="mb-[24rpx] rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mb-[24rpx] flex">
            <image class="mr-[24rpx] h-[96rpx] w-[96rpx] rounded-full bg-[#f0f0f0]" :src="doctorInfo.avatar" mode="aspectFill" />
            <view class="flex-1">
              <view class="flex flex-wrap items-center gap-[16rpx]">
                <text class="text-[#333] font-semibold text-[36rpx]">{{ doctorInfo.name }}</text>
                <text class="text-[#666] text-[28rpx]">{{ doctorInfo.title }}</text>
                <text class="text-[#666] text-[28rpx]">{{ doctorInfo.specialty }}</text>
              </view>
            </view>
          </view>

          <view class="mb-[32rpx] whitespace-pre-line text-[#666] text-[28rpx] leading-[44rpx]">
            {{ doctorInfo.introduction }}
          </view>

          <!-- 统计信息 -->
          <view class="flex items-center justify-around border-t border-[#f0f0f0] pt-[24rpx]">
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text class="text-[#999] text-[24rpx]">暂无</text>
              <text class="text-[#333] font-semibold text-[40rpx]">{{ doctorInfo.consultationCount }}</text>
              <text class="text-[#999] text-[24rpx]">接诊人次</text>
            </view>
            <view class="h-[80rpx] w-[1rpx] bg-[#f0f0f0]" />
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text class="text-[#999] text-[24rpx]">暂无</text>
              <text class="text-[#999] text-[32rpx]">—</text>
              <text class="text-[#999] text-[24rpx]">满意度</text>
            </view>
            <view class="h-[80rpx] w-[1rpx] bg-[#f0f0f0]" />
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text class="text-[#999] text-[24rpx]">{{ doctorInfo.responseSpeed }}</text>
              <text class="text-[#999] text-[32rpx]">—</text>
              <text class="text-[#999] text-[24rpx]">接诊速度</text>
            </view>
          </view>
        </view>

        <!-- 视频挂号 -->
        <view class="mb-[24rpx]">
          <view class="mb-[16rpx] text-[#333] font-semibold text-[32rpx]">
            视频挂号
          </view>
          <view class="relative flex items-center rounded-[24rpx] bg-white p-[32rpx]">
            <view class="flex flex-1 flex-col gap-[8rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">灵活视频时间</text>
              <text class="text-[#999] text-[24rpx]">您购买后医生将为您安排视频时间</text>
            </view>
            <view class="mx-[24rpx] flex items-center text-[#ff6b35] font-semibold text-[32rpx]">
              ¥20
            </view>
            <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handleRegister">
              <text class="text-white font-medium text-[28rpx]">去挂号</text>
            </view>
          </view>
        </view>

        <!-- 图文问诊 -->
        <view class="mb-[24rpx] flex items-center rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mr-[24rpx] h-[88rpx] w-[88rpx] flex items-center justify-center rounded-full bg-[#e3f2fd]">
            <text class="text-[48rpx]">💬</text>
          </view>
          <view class="flex-1">
            <view class="mb-[8rpx] flex items-center gap-[12rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">图文问诊</text>
              <text class="text-[#ff6b35] font-medium text-[28rpx]">¥20/次</text>
            </view>
            <text class="text-[#999] text-[24rpx]">图文多轮沟通</text>
          </view>
          <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handleTextConsultation">
            <text class="text-white font-medium text-[28rpx]">去问诊</text>
          </view>
        </view>

        <!-- 电话问诊 -->
        <view class="mb-[24rpx] flex items-center rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mr-[24rpx] h-[88rpx] w-[88rpx] flex items-center justify-center rounded-full bg-[#e8f5e9]">
            <text class="text-[48rpx]">📞</text>
          </view>
          <view class="flex-1">
            <view class="mb-[8rpx] flex items-center gap-[12rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">电话问诊</text>
              <text class="text-[#ff6b35] font-medium text-[28rpx]">¥20/10分钟</text>
              <view class="inline-flex items-center rounded-[8rpx] bg-[#bbdefb] px-[12rpx] py-[4rpx] text-[#1976d2] text-[20rpx]">
                首单少
              </view>
            </view>
            <text class="text-[#999] text-[24rpx]">1对1电话交流，今日剩3个号</text>
          </view>
          <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handlePhoneConsultation">
            <text class="text-white font-medium text-[28rpx]">去通话</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
// 所有样式已使用 UnoCSS 原子类实现
// 仅保留必要的全局样式覆盖
</style>
