<script setup lang="ts">
// 问诊预约页面
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '问诊预约',
  },
})

// 医生信息数据（占位用）
const doctorsData = [
  {
    id: '1',
    name: '孙医生',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=center',
    department: '骨科专家',
    title: 'XX疗法传承人',
    intro: '师从中医骨科泰斗xxx，从医20年，患者好评率99%，擅长针灸正骨。',
    personalStatement: '"秉承祖训，专攻疑难骨科"',
    recommendationCount: null,
    consultationCount: 121,
    satisfaction: null,
    speed: '较快'
  },
  {
    id: '2',
    name: '李医生',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
    department: '内科医师',
    title: '副主任医师',
    intro: '毕业于xxx医科大学，从事临床工作15年，擅长消化系统疾病诊治。',
    personalStatement: '"以患者为中心，用心治疗每一位病人"',
    recommendationCount: 56,
    consultationCount: 234,
    satisfaction: '98%',
    speed: '很快'
  },
  {
    id: '3',
    name: '韩医生',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=center',
    department: '中医师',
    title: '主治医师',
    intro: '从医20余年，擅长治疗各类慢性病，尤其在心血管疾病防治方面有深入研究。',
    personalStatement: '"中医调理，标本兼治"',
    recommendationCount: 89,
    consultationCount: 937,
    satisfaction: '99.5%',
    speed: '快'
  }
]

// 当前显示的医生信息
const doctorInfo = ref(doctorsData[0])

// 预约服务类型
const appointmentServices = [
  {
    id: 'video',
    title: '视频挂号',
    description: '灵活视频时间',
    price: '¥20',
    buttonText: '去挂号',
    color: 'bg-[#ff6b35]'
  },
  {
    id: 'text',
    title: '图文问诊',
    description: '图文咨询沟通',
    price: '¥20/次',
    buttonText: '去问诊',
    color: 'bg-[#ff6b35]',
    icon: '💬'
  },
  {
    id: 'phone',
    title: '电话问诊',
    description: '13分钟电话交流，今日限3个号',
    price: '¥20/10分钟',
    buttonText: '去通话',
    color: 'bg-[#5088ff]',
    icon: '📞',
    tag: '号源少'
  }
]

// 生命周期
onLoad((options: { id?: string }) => {
  console.log('问诊预约页面加载，参数:', options)
  // 根据传入的医生ID获取对应的医生信息
  if (options.id) {
    const doctor = doctorsData.find(d => d.id === options.id)
    if (doctor) {
      doctorInfo.value = doctor
    } else {
      console.log('未找到对应ID的医生，使用默认医生信息')
    }
  }
})

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 处理预约服务点击
function handleServiceClick(service: typeof appointmentServices[0]) {
  console.log('选择预约服务:', service)
  // 所有按钮都跳转到支付页面
  uni.navigateTo({
    url: `/pages/normal/online-consultation/payment?id=${doctorInfo.value.id}&serviceId=${service.id}`,
    success: () => {
      console.log('跳转到支付页面成功')
    },
    fail: (err) => {
      console.error('跳转到支付页面失败:', err)
    }
  })
}
</script>

<template>
  <view class="bg-[#f5f5f5] min-h-screen">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 border-b border-[#eee]">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">问诊预约</text>
      </view>
    </view>

    <!-- 医生信息卡片 -->
    <view class="mb-3 bg-white p-4">
      <view class="flex items-start">
        <!-- 医生头像 -->
        <image :src="doctorInfo.avatar" class="mr-3 h-24 w-24 flex-shrink-0 rounded-full" />
        
        <!-- 医生基本信息 -->
        <view class="flex-1">
          <view class="mb-1 flex items-center">
            <text class="mr-2 text-[#333] font-medium text-[28rpx]">{{ doctorInfo.name }}</text>
            <text class="text-[#666] text-[24rpx]">{{ doctorInfo.department }}</text>
          </view>
          <text class="mb-2 block text-[#666] text-[24rpx]">{{ doctorInfo.title }}</text>
          <text class="mb-2 block line-clamp-2 text-[#999] text-[24rpx]">{{ doctorInfo.intro }}</text>
          <text class="block text-[#999] text-[24rpx]">{{ doctorInfo.personalStatement }}</text>
        </view>
      </view>

      <!-- 统计信息 -->
      <view class="mt-4 grid grid-cols-4 gap-2 border-t border-[#eee] pt-3">
        <view class="text-center">
          <text class="block text-[#666] text-[24rpx]">
            {{ doctorInfo.recommendationCount || '暂无' }}
          </text>
          <text class="text-[#999] text-[20rpx]">患者推荐</text>
        </view>
        <view class="text-center">
          <text class="block text-[#666] text-[24rpx]">{{ doctorInfo.consultationCount }}</text>
          <text class="text-[#999] text-[20rpx]">接诊人次</text>
        </view>
        <view class="text-center">
          <text class="block text-[#666] text-[24rpx]">
            {{ doctorInfo.satisfaction || '暂无' }}
          </text>
          <text class="text-[#999] text-[20rpx]">满意度</text>
        </view>
        <view class="text-center">
          <text class="block text-[#666] text-[24rpx]">{{ doctorInfo.speed }}</text>
          <text class="text-[#999] text-[20rpx]">接诊速度</text>
        </view>
      </view>
    </view>

    <!-- 预约服务列表 -->
    <view class="space-y-3 bg-white px-4 py-3">
      <view v-for="service in appointmentServices" :key="service.id" class="mb-4">
        <text class="mb-2 block text-[#333] font-medium text-[28rpx]">{{ service.title }}</text>
        <view class="flex items-center justify-between rounded-[8rpx] border border-[#eee] px-4 py-3">
          <view class="flex items-center">
            <!-- 服务图标（如果有） -->
            <text v-if="service.icon" class="mr-3 text-[36rpx]">{{ service.icon }}</text>
            <text class="text-[#666] text-[24rpx]">{{ service.description }}</text>
          </view>
          <view class="flex items-center">
            <!-- 价格 -->
            <text class="mr-3 text-[24rpx]" :class="service.color === 'bg-[#5088ff]' ? 'text-[#5088ff]' : 'text-[#ff6b35]'">
              {{ service.price }}
            </text>
            <!-- 标签 -->
            <view v-if="service.tag" class="mr-3 rounded-[4rpx] bg-[#ffebe5] px-2 py-0.5 text-[#ff6b35] text-[18rpx]">
              {{ service.tag }}
            </view>
            <!-- 按钮 -->
            <view class="rounded-[4rpx] w-[120rpx] min-w-[120rpx] text-center px-0 py-1.5 text-white text-[24rpx]" :class="service.color" @click="handleServiceClick(service)">
              {{ service.buttonText }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>