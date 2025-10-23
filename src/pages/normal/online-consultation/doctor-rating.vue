<script setup lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '医师评价',
  },
})

// 评分类型
type RatingType = 'medicalSkill' | 'service' | 'recommendation'

// 响应式数据
const doctorInfo = reactive({
  id: '',
  name: '医生',
  title: '',
  specialty: '',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=center',
})

// 评分数据
const ratings = reactive({
  medicalSkill: 5, // 医术评分
  service: 5, // 服务评分
  recommendation: 5, // 推荐度评分
})

// 评论文本
const comment = ref('')
// 最大评论长度
const maxCommentLength = 200
// 是否已提交
let hasSubmitted = false

// 初始化页面数据
onLoad((options: { doctorId?: string, doctorName?: string, doctorTitle?: string, doctorSpecialty?: string, doctorAvatar?: string }) => {
  // 从参数中获取医生信息
  if (options.doctorId)
    doctorInfo.id = options.doctorId
  if (options.doctorName)
    doctorInfo.name = options.doctorName
  if (options.doctorTitle)
    doctorInfo.title = options.doctorTitle
  if (options.doctorSpecialty)
    doctorInfo.specialty = options.doctorSpecialty
  if (options.doctorAvatar)
    doctorInfo.avatar = options.doctorAvatar
})

onReady(() => {
  // 页面加载完成后的操作
})

// 设置评分
function setRating(type: RatingType, value: number) {
  ratings[type] = value
}

// 格式化评分星星显示
function formatStars(type: RatingType) {
  const stars = []
  const rating = ratings[type]

  for (let i = 1; i <= 5; i++) {
    stars.push({
      filled: i <= rating,
      index: i,
    })
  }

  return stars
}

// 处理星星点击
function handleStarClick(type: RatingType, index: number) {
  setRating(type, index)
}

// 提交评价
function submitRating() {
  if (hasSubmitted)
    return

  // 简单的表单验证
  if (!comment.value.trim()) {
    uni.showToast({
      title: '请输入评价内容',
      icon: 'none',
    })
    return
  }

  // 模拟提交评价
  hasSubmitted = true

  // 准备提交的数据
  const submitData = {
    doctorId: doctorInfo.id,
    ratings,
    comment: comment.value.trim(),
    timestamp: new Date().getTime(),
  }

  console.log('提交评价数据:', submitData)

  // 显示提交成功提示
  uni.showToast({
    title: '评价提交成功',
    icon: 'success',
    duration: 1500,
    success: () => {
      // 延迟跳转到问诊预约页面
      setTimeout(() => {
        // 直接跳转到问诊预约页面，而不是返回上一页
        uni.redirectTo({
          url: '/pages/normal/online-consultation/appointment'
        })
      }, 1500)
    },
  })
}

// 返回上一页
function handleBack() {
  // 如果已经提交，可以直接返回
  if (hasSubmitted) {
    // 直接跳转到问诊预约页面
    uni.redirectTo({
      url: '/pages/normal/online-consultation/appointment'
    })
    return
  }

  // 如果未提交，提示用户
  uni.showModal({
    title: '提示',
    content: '确定要取消评价吗？',
    success: (res) => {
      if (res.confirm) {
        // 直接跳转到问诊预约页面
        uni.redirectTo({
          url: '/pages/normal/online-consultation/appointment'
        })
      }
    },
  })
}
</script>

<template>
  <view class="min-h-screen bg-[#f8f8f8]">
    <!-- 顶部导航栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee] bg-white px-4 py-3">
      <view class="flex items-center">
        <text class="mr-2 text-[#333] text-[36rpx]" @click="handleBack">←</text>
        <text class="text-[#333] font-medium text-[32rpx]">医师评价</text>
      </view>
    </view>

    <!-- 医生信息卡片 -->
    <view class="mb-3 bg-white p-5">
      <view class="flex items-center">
        <image :src="doctorInfo.avatar" class="mr-4 h-20 w-20 rounded-full" mode="aspectFill" />
        <view class="flex-1">
          <view class="flex items-center">
            <text class="text-[#333] font-medium text-[32rpx]">{{ doctorInfo.name }}</text>
            <text class="ml-2 text-[#666] text-[26rpx]">{{ doctorInfo.title }}</text>
          </view>
          <text v-if="doctorInfo.specialty" class="text-[#666] text-[24rpx]">{{ doctorInfo.specialty }}</text>
        </view>
      </view>
    </view>

    <!-- 评分区域 -->
    <view class="mb-3 bg-white p-5">
      <text class="mb-4 block text-[#333] font-medium text-[30rpx]">我的评价</text>

      <!-- 医术评分 -->
      <view class="mb-6">
        <view class="mb-2 flex items-center justify-between">
          <text class="text-[#666] text-[28rpx]">医术:</text>
          <view class="flex">
            <text
              v-for="star in formatStars('medicalSkill')"
              :key="star.index"
              class="mx-1 text-[40rpx]"
              :class="star.filled ? 'text-[#ffb800]' : 'text-[#dcdcdc]'"
              @click="handleStarClick('medicalSkill', star.index)"
            >
              ★
            </text>
          </view>
        </view>
      </view>

      <!-- 服务评分 -->
      <view class="mb-6">
        <view class="mb-2 flex items-center justify-between">
          <text class="text-[#666] text-[28rpx]">服务:</text>
          <view class="flex">
            <text
              v-for="star in formatStars('service')"
              :key="star.index"
              class="mx-1 text-[40rpx]"
              :class="star.filled ? 'text-[#ffb800]' : 'text-[#dcdcdc]'"
              @click="handleStarClick('service', star.index)"
            >
              ★
            </text>
          </view>
        </view>
      </view>

      <!-- 推荐度评分 -->
      <view>
        <view class="mb-2 flex items-center justify-between">
          <text class="text-[#666] text-[28rpx]">推荐度:</text>
          <view class="flex">
            <text
              v-for="star in formatStars('recommendation')"
              :key="star.index"
              class="mx-1 text-[40rpx]"
              :class="star.filled ? 'text-[#ffb800]' : 'text-[#dcdcdc]'"
              @click="handleStarClick('recommendation', star.index)"
            >
              ★
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 评价内容 -->
    <view class="mb-3 bg-white p-5">
      <text class="mb-4 block text-[#333] font-medium text-[30rpx]">评语</text>
      <textarea
        v-model="comment"
        class="h-40 w-full rounded-md bg-[#f5f5f5] px-4 py-3 text-[#333] text-[28rpx] placeholder:text-[#999]"
        placeholder="请输入您的评价内容"
        :maxlength="maxCommentLength"
      />
      <view class="mt-2 flex justify-end">
        <text class="text-[#999] text-[24rpx]">{{ comment.length }}/{{ maxCommentLength }}</text>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="p-5">
      <button
        class="w-full rounded-full bg-[#e26464] py-3 text-white font-medium text-[32rpx]"
        :disabled="hasSubmitted"
        @click="submitRating"
      >
        {{ hasSubmitted ? '提交中...' : '提交' }}
      </button>
    </view>
  </view>
</template>
