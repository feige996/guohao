<script setup lang="ts">
// 预约付费页面
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '预约付费',
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

// 服务类型数据
const servicesData = [
  { id: 'video', title: '视频挂号', description: '灵活视频时间', price: 20, duration: '灵活视频时间' },
  { id: 'text', title: '图文问诊', description: '图文多轮沟通', price: 20, duration: '图文多轮沟通' },
  { id: 'phone', title: '电话问诊', description: '13分钟电话交流', price: 20, duration: '10分钟通话' }
]

// 服务信息
const serviceInfo = ref(servicesData[0])

// 支付方式
const paymentMethods = [
  { id: 'other', name: '找人代付' },
  { id: 'wechat', name: '微信支付', selected: true }
]

// 生命周期
onLoad((options: { id?: string; serviceId?: string }) => {
  console.log('预约付费页面加载，参数:', options)
  
  // 根据传入的医生ID获取对应的医生信息
  if (options.id) {
    const doctor = doctorsData.find(d => d.id === options.id)
    if (doctor) {
      doctorInfo.value = doctor
    } else {
      console.log('未找到对应ID的医生，使用默认医生信息')
    }
  }
  
  // 根据传入的服务ID获取对应的服务信息
  if (options.serviceId) {
    const service = servicesData.find(s => s.id === options.serviceId)
    if (service) {
      serviceInfo.value = service
    } else {
      console.log('未找到对应ID的服务，使用默认服务信息')
    }
  }
})

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 处理支付方式选择
function handlePaymentMethodSelect(methodId: string) {
  paymentMethods.forEach(method => {
    method.selected = method.id === methodId
  })
}

// 处理确认支付
function handleConfirmPayment() {
  // 模拟支付成功
  setTimeout(() => {
    // 显示支付成功弹窗
    uni.showModal({
      title: '支付成功',
      content: '您的预约已确认，即将前往候诊室',
      showCancel: false,
      success: () => {
        // 跳转到候诊室页面，传递医生信息和服务类型
          // 确保传递正确的服务类型为'视频问诊'，而不是'视频挂号'
          uni.navigateTo({
            url: `/pages/normal/online-consultation/waiting-room?doctorId=${doctorInfo.value.id}&serviceId=${serviceInfo.value.id}&serviceType=${encodeURIComponent('视频问诊')}`
          })
      }
    })
  }, 1000)
}
</script>

<template>
  <view class="bg-[#f5f5f5] min-h-screen">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 border-b border-[#eee]">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">预约付费</text>
      </view>
    </view>

    <!-- 服务类型卡片 -->
    <view class="mb-3 bg-white p-4">
      <view class="flex items-center justify-between">
        <view class="flex items-center">
          <image src="https://images.unsplash.com/photo-1616486338234-df25107c1536?w=200&h=200&fit=crop&crop=center" class="mr-3 h-16 w-16 rounded-md" />
          <view>
            <text class="block text-[#333] font-medium text-[28rpx]">{{ serviceInfo.title }}</text>
            <text class="text-[#666] text-[24rpx]">{{ serviceInfo.description }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 服务承诺 -->
    <view class="mb-3 px-4 py-2">
      <view class="flex items-center bg-[#fff8f2] rounded-[8rpx] px-3 py-2">
        <text class="mr-2 text-[28rpx]">✓</text>
        <text class="text-[#ff6b35] text-[24rpx]">国浩承诺：医生本人服务 · 未接诊可退</text>
      </view>
    </view>

    <!-- 医生信息卡片 -->
    <view class="mb-3 bg-white p-4">
      <view class="flex items-start">
        <!-- 医生头像 -->
        <image :src="doctorInfo.avatar" class="mr-3 h-20 w-20 flex-shrink-0 rounded-full" />
        
        <!-- 医生基本信息 -->
        <view class="flex-1">
          <view class="mb-1 flex items-center">
            <text class="mr-2 text-[#333] font-medium text-[28rpx]">{{ doctorInfo.name }}</text>
            <text class="text-[#666] text-[24rpx]">{{ doctorInfo.department }}</text>
          </view>
          <text class="block text-[#666] text-[24rpx]">{{ doctorInfo.title }}</text>
        </view>
      </view>
    </view>

    <!-- 问诊详情 -->
    <view class="mb-3 bg-white p-4">
      <text class="mb-3 block text-[#333] font-medium text-[28rpx]">{{ serviceInfo.title }}详情</text>
      <view class="space-y-3">
        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">问诊价格</text>
          <text class="text-[#ff6b35] font-medium text-[28rpx]">{{ serviceInfo.price }}元</text>
        </view>
        <view class="flex justify-between">
          <text class="text-[#666] text-[24rpx]">服务时长</text>
          <text class="text-[#666] text-[24rpx]">{{ serviceInfo.duration }}</text>
        </view>
      </view>
    </view>

    <!-- 支付方式 -->
    <view class="mb-20 bg-white p-4">
      <text class="mb-3 block text-[#333] font-medium text-[28rpx]">支付方式</text>
      <view class="space-y-4">
        <view v-for="method in paymentMethods" :key="method.id" 
              class="flex items-center justify-between rounded-[8rpx] border border-[#eee] p-3" 
              @click="handlePaymentMethodSelect(method.id)">
          <text class="text-[#666] text-[24rpx]">{{ method.name }}</text>
          <view class="h-5 w-5 rounded-full border border-[#ddd] flex items-center justify-center">
            <view v-if="method.selected" class="h-3 w-3 rounded-full bg-[#ff6b35]"></view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部支付栏 -->
    <view class="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white px-4 py-3 border-t border-[#eee]">
      <view class="flex items-center">
        <text class="mr-1 text-[#666] text-[24rpx]">实付</text>
        <text class="text-[#ff6b35] font-medium text-[32rpx]">{{ serviceInfo.price }}元</text>
      </view>
      <view class="rounded-[8rpx] bg-[#ff6b35] px-8 py-3 text-white font-medium text-[28rpx]" @click="handleConfirmPayment">
        确认支付
      </view>
    </view>
  </view>
</template>