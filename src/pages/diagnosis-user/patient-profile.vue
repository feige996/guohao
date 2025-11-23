<script setup lang="ts">
import type { PatientProfile } from '@/types2'
import { mockPatientProfile } from '@/data'

definePage({
  style: {
    navigationBarTitleText: '患者档案',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

// 患者档案数据
const profileData = ref<PatientProfile>({ ...mockPatientProfile })

// 表单数据
const formData = ref<PatientProfile>({ ...profileData.value })

// 性别选项
const sexOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]

// 血型选项
const bloodTypeOptions = [
  { value: 'A', label: 'A型' },
  { value: 'B', label: 'B型' },
  { value: 'AB', label: 'AB型' },
  { value: 'O', label: 'O型' },
]

// 体质类型选项
const constitutionOptions = [
  '平和质',
  '气虚质',
  '阳虚质',
  '阴虚质',
  '痰湿质',
  '湿热质',
  '血瘀质',
  '气郁质',
  '特禀质',
]

// 页面加载
onLoad(() => {
  const savedData = uni.getStorageSync('patientProfile')
  if (savedData) {
    profileData.value = { ...profileData.value, ...savedData }
    formData.value = { ...profileData.value }
  }
})

// 保存档案
function saveProfile() {
  // 基本验证
  if (!formData.value.nickName?.trim()) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return
  }

  if (!formData.value.mobile?.trim()) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }

  // 保存到本地
  uni.setStorageSync('patientProfile', formData.value)
  profileData.value = { ...formData.value }

  uni.showToast({ title: '保存成功', icon: 'success' })
}

// 选择头像
function chooseAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
    },
  })
}

// 选择生日
function selectBirthday() {
  uni.showModal({
    title: '选择生日',
    content: '请使用日期选择器',
    showCancel: false,
  })
}

// 重置表单
function resetForm() {
  uni.showModal({
    title: '确认重置',
    content: '确定要重置所有信息吗？',
    success: (res) => {
      if (res.confirm) {
        formData.value = { ...profileData.value }
        uni.showToast({ title: '已重置', icon: 'none' })
      }
    },
  })
}

// 返回
function goBack() {
  uni.navigateBack()
}

// 计算BMI
const bmi = computed(() => {
  if (formData.value.height && formData.value.weight) {
    const h = formData.value.height / 100
    const w = formData.value.weight
    return (w / (h * h)).toFixed(1)
  }
  return '--'
})

// BMI状态
const bmiStatus = computed(() => {
  const value = Number.parseFloat(bmi.value)
  if (Number.isNaN(value))
    return { text: '--', color: 'text-gray-500' }
  if (value < 18.5)
    return { text: '偏瘦', color: 'text-blue-600' }
  if (value < 24)
    return { text: '正常', color: 'text-green-600' }
  if (value < 28)
    return { text: '偏胖', color: 'text-orange-600' }
  return { text: '肥胖', color: 'text-red-600' }
})
</script>

<template>
  <view class="min-h-screen w-full flex flex-col bg-gray-50">
    <!-- 顶部导航 -->
    <view class="flex flex-shrink-0 items-center justify-between bg-white px-32rpx pb-20rpx pt-24rpx shadow-sm">
      <button class="h-68rpx w-68rpx flex items-center justify-center rounded-16rpx border-none bg-gray-100" @tap="goBack">
        <text class="text-32rpx text-gray-700 font-bold">←</text>
      </button>
      <text class="flex-1 text-center text-34rpx text-gray-900 font-bold">患者档案</text>
      <view class="w-68rpx" />
    </view>

    <scroll-view class="flex-1" scroll-y>
      <view class="flex flex-col gap-24rpx p-24rpx">
        <!-- 基本信息卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">基本信息</text>
          </view>

          <!-- 头像 -->
          <view class="mb-32rpx flex flex-col items-center">
            <view class="relative h-160rpx w-160rpx overflow-hidden border-4rpx border-gray-100 rounded-24rpx" @tap="chooseAvatar">
              <image :src="formData.avatar" class="h-full w-full" mode="aspectFill" />
              <view class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 active:opacity-100">
                <text class="text-28rpx text-white">更换头像</text>
              </view>
            </view>
          </view>

          <!-- 姓名/昵称 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">姓名 *</text>
            <input
              v-model="formData.nickName"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入姓名"
              :maxlength="20"
            >
          </view>

          <!-- 性别 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">性别 *</text>
            <view class="flex gap-24rpx">
              <view
                v-for="option in sexOptions"
                :key="option.value"
                class="h-88rpx flex flex-1 items-center justify-center gap-12rpx border-2rpx rounded-16rpx"
                :class="formData.sex === option.value ? 'border-primary bg-primary/5' : 'border-gray-200'"
                @tap="formData.sex = option.value"
              >
                <view class="h-24rpx w-24rpx border-2rpx rounded-full" :class="formData.sex === option.value ? 'border-primary bg-primary' : 'border-gray-300'" />
                <text class="text-28rpx font-medium" :class="formData.sex === option.value ? 'text-primary' : 'text-gray-700'">{{ option.label }}</text>
              </view>
            </view>
          </view>

          <!-- 年龄/生日 -->
          <view class="mb-24rpx flex gap-24rpx">
            <view class="flex-1">
              <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">年龄</text>
              <input
                v-model.number="formData.age"
                type="number"
                class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
                placeholder="年龄"
              >
            </view>
            <view class="flex-1">
              <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">生日</text>
              <view class="h-88rpx w-full flex items-center border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx" @tap="selectBirthday">
                <text class="flex-1 text-28rpx" :class="formData.birthday ? 'text-gray-800' : 'text-gray-400'">
                  {{ formData.birthday || '选择生日' }}
                </text>
                <text class="text-28rpx text-primary">📅</text>
              </view>
            </view>
          </view>

          <!-- 手机号 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">手机号 *</text>
            <input
              v-model="formData.mobile"
              type="tel"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入手机号"
              :maxlength="11"
            >
          </view>

          <!-- 身份证号 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">身份证号</text>
            <input
              v-model="formData.idCardNum"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入身份证号"
              :maxlength="18"
            >
          </view>

          <!-- 民族 -->
          <view class="mb-0">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">民族</text>
            <input
              v-model="formData.nation"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入民族"
            >
          </view>
        </view>

        <!-- 身体指标卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">身体指标</text>
          </view>

          <!-- 身高体重 -->
          <view class="mb-24rpx flex gap-24rpx">
            <view class="flex-1">
              <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">身高 (cm)</text>
              <input
                v-model.number="formData.height"
                type="digit"
                class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
                placeholder="身高"
              >
            </view>
            <view class="flex-1">
              <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">体重 (kg)</text>
              <input
                v-model.number="formData.weight"
                type="digit"
                class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
                placeholder="体重"
              >
            </view>
          </view>

          <!-- BMI指数 -->
          <view v-if="formData.height && formData.weight" class="mb-24rpx rounded-16rpx from-blue-50 to-purple-50 bg-gradient-to-r px-24rpx py-20rpx">
            <view class="flex items-center justify-between">
              <text class="text-26rpx text-gray-700">BMI指数</text>
              <view class="flex items-center gap-12rpx">
                <text class="text-36rpx text-primary font-bold">{{ bmi }}</text>
                <text class="text-24rpx font-semibold" :class="bmiStatus.color">{{ bmiStatus.text }}</text>
              </view>
            </view>
          </view>

          <!-- 血型 -->
          <view class="mb-0">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">血型</text>
            <view class="flex gap-16rpx">
              <view
                v-for="option in bloodTypeOptions"
                :key="option.value"
                class="h-80rpx flex flex-1 items-center justify-center border-2rpx rounded-16rpx"
                :class="formData.bloodType === option.value ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-gray-200 text-gray-600'"
                @tap="formData.bloodType = option.value"
              >
                <text class="text-28rpx">{{ option.label }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 健康信息卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">健康信息</text>
          </view>

          <!-- 体质类型 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">中医体质</text>
            <view class="flex flex-wrap gap-12rpx">
              <view
                v-for="type in constitutionOptions"
                :key="type"
                class="border-2rpx rounded-full px-24rpx py-12rpx text-26rpx"
                :class="formData.constitutionType === type ? 'border-primary bg-primary/5 text-primary font-semibold' : 'border-gray-200 text-gray-600'"
                @tap="formData.constitutionType = type"
              >
                {{ type }}
              </view>
            </view>
          </view>

          <!-- 主诉 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">主诉</text>
            <textarea
              v-model="formData.chiefComplaint"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述您的主要症状..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 现病史 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">现病史</text>
            <textarea
              v-model="formData.presentIllness"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述当前疾病情况..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 过敏史 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">过敏史</text>
            <textarea
              v-model="formData.allergyHistory"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述过敏情况..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 既往史 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">既往病史</text>
            <textarea
              v-model="formData.medicalHistory"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述既往病史..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 家族病史 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">家族病史</text>
            <textarea
              v-model="formData.familyMedicalHistory"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述家族病史..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 中医诊断 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">中医诊断</text>
            <textarea
              v-model="formData.chineseDiagnosis"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="中医诊断结果..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 西医诊断 -->
          <view class="mb-0">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">西医诊断</text>
            <textarea
              v-model="formData.westernDiagnosis"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="西医诊断结果..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>
        </view>

        <!-- 生活习惯卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">生活习惯</text>
          </view>

          <!-- 饮食习惯 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">饮食习惯</text>
            <textarea
              v-model="formData.dietHabits"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述您的饮食习惯..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 运动习惯 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">运动习惯</text>
            <textarea
              v-model="formData.exerciseHabits"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述您的运动习惯..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 睡眠情况 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">睡眠情况</text>
            <textarea
              v-model="formData.sleepCondition"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="描述您的睡眠情况..."
              :maxlength="500"
              :auto-height="true"
            />
          </view>

          <!-- 吸烟喝酒 -->
          <view class="mb-0">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">不良嗜好</text>
            <view class="flex gap-48rpx">
              <view class="flex items-center gap-16rpx">
                <view
                  class="h-44rpx w-44rpx flex items-center justify-center border-2rpx rounded-12rpx"
                  :class="formData.isSmoker ? 'border-primary bg-primary' : 'border-gray-300'"
                  @tap="formData.isSmoker = !formData.isSmoker"
                >
                  <text v-if="formData.isSmoker" class="text-24rpx text-white font-bold">✓</text>
                </view>
                <text class="text-28rpx text-gray-700">吸烟</text>
              </view>
              <view class="flex items-center gap-16rpx">
                <view
                  class="h-44rpx w-44rpx flex items-center justify-center border-2rpx rounded-12rpx"
                  :class="formData.isDrinker ? 'border-primary bg-primary' : 'border-gray-300'"
                  @tap="formData.isDrinker = !formData.isDrinker"
                >
                  <text v-if="formData.isDrinker" class="text-24rpx text-white font-bold">✓</text>
                </view>
                <text class="text-28rpx text-gray-700">喝酒</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 紧急联系人卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">紧急联系人</text>
          </view>

          <!-- 联系人姓名 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">联系人姓名</text>
            <input
              v-model="formData.emergencyContact"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入联系人姓名"
            >
          </view>

          <!-- 联系人电话 -->
          <view class="mb-24rpx">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">联系人电话</text>
            <input
              v-model="formData.emergencyPhone"
              type="tel"
              class="h-88rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx text-28rpx"
              placeholder="请输入联系人电话"
              :maxlength="11"
            >
          </view>

          <!-- 联系人地址 -->
          <view class="mb-0">
            <text class="mb-12rpx block text-28rpx text-gray-700 font-semibold">联系人地址</text>
            <textarea
              v-model="formData.emergencyAddress"
              class="min-h-120rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
              placeholder="请输入联系人地址..."
              :maxlength="200"
              :auto-height="true"
            />
          </view>
        </view>

        <!-- 健康目标卡片 -->
        <view class="rounded-24rpx bg-white p-32rpx shadow-sm">
          <view class="mb-24rpx flex items-center gap-12rpx">
            <view class="h-32rpx w-8rpx rounded-full bg-primary" />
            <text class="text-32rpx text-gray-900 font-bold">健康目标</text>
          </view>

          <textarea
            v-model="formData.healthGoals"
            class="min-h-160rpx w-full border-2rpx border-gray-200 rounded-16rpx bg-white px-24rpx py-16rpx text-28rpx"
            placeholder="描述您的健康目标..."
            :maxlength="500"
            :auto-height="true"
          />
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="flex gap-24rpx p-24rpx">
        <wd-button
          custom-class="flex-1"
          custom-style="height: 96rpx; font-size: 32rpx; background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
          @click="resetForm"
        >
          重置
        </wd-button>
        <wd-button
          custom-class="flex-1"
          type="primary"
          custom-style="height: 96rpx; font-size: 32rpx; background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
          @click="saveProfile"
        >
          保存档案
        </wd-button>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
