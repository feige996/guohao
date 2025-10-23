<script setup lang="ts">
import { ref } from 'vue'

// 性别选择
const selectedGender = ref<'男' | '女' | '儿童'>('男')

// 常见疾病数据
const commonDiseases = [
  '咳嗽',
  '便秘',
  '腿疼',
  '阳痿',
  '感冒',
  '失眠',
  '口腔溃疡',
  '胃痛',
  '胃胀',
]

// 身体部位数据
const bodyParts = [
  { icon: '🦵', name: '全身', symptoms: ['感冒', '失眠', '肥胖', '异常出汗'] },
  { icon: '👤', name: '头面颈口', symptoms: ['失眠', '头痛', '口腔溃疡', '牙痛'] },
  { icon: '👂', name: '耳鼻喉', symptoms: ['耳鸣', '听力下降', '鼻塞', '咽痛'] },
  { icon: '❤️', name: '心胸', symptoms: ['心悸', '胸闷', '气短', '胸痛'] },
  { icon: '🤰', name: '腹部', symptoms: ['腹痛', '腹泻', '便秘', '胃胀'] },
  { icon: '🍑', name: '腰背', symptoms: ['腰痛', '背痛', '坐骨神经痛', '腰肌劳损'] },
  { icon: '🦵', name: '四肢关节', symptoms: ['关节痛', '肌肉酸痛', '麻木', '无力'] },
  { icon: '🩹', name: '皮肤', symptoms: ['皮疹', '瘙痒', '红肿', '干燥'] },
]

// 当前选中的身体部位
const selectedPart = ref<any>(null)
// 是否显示症状选项
const showSymptoms = ref(false)

// 切换性别
function handleGenderChange(gender: '男' | '女' | '儿童') {
  selectedGender.value = gender
}

// 显示症状选项
function showPartSymptoms(part: any) {
  selectedPart.value = part
  showSymptoms.value = true
}

// 关闭症状选项
function closeSymptoms() {
  showSymptoms.value = false
  selectedPart.value = null
}

// 跳转到自测页面
function navigateToDiagnosis(symptom: string) {
  uni.navigateTo({
    url: `/pages/normal/smart-self-diagnosis/diagnosis-test?symptom=${encodeURIComponent(symptom)}`,
  })
  closeSymptoms()
}
</script>

<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <view class="header flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <view class="flex items-center">
        <view class="mr-3" @click="() => uni.navigateBack()">
          <text class="text-lg font-medium">←</text>
        </view>
        <view class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-lg text-white">
          智
        </view>
        <text class="text-lg font-bold">智慧自诊</text>
      </view>
      <uni-icons type="person" size="24" color="#333" />
    </view>

    <!-- 性别选择 -->
    <view class="gender-selector flex justify-center gap-4 bg-white p-5">
      <view
        class="rounded-full px-6 py-2 text-sm transition-all"
        :class="selectedGender === '男' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'"
        @click="handleGenderChange('男')"
      >
        男
      </view>
      <view
        class="rounded-full px-6 py-2 text-sm transition-all"
        :class="selectedGender === '女' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'"
        @click="handleGenderChange('女')"
      >
        女
      </view>
      <view
        class="rounded-full px-6 py-2 text-sm transition-all"
        :class="selectedGender === '儿童' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'"
        @click="handleGenderChange('儿童')"
      >
        儿童
      </view>
    </view>

    <!-- 常见疾病 -->
    <view class="mt-3 bg-white">
      <view class="border-b border-gray-100 px-4 py-3">
        <text class="text-base font-medium">常见疾病</text>
      </view>
      <view class="grid grid-cols-4 gap-4 px-4 py-3">
        <view
          v-for="(disease, index) in commonDiseases"
          :key="index"
          class="cursor-pointer text-center"
          @click="navigateToDiagnosis(disease)"
        >
          <view class="mx-auto mb-2 h-16 w-16 flex items-center justify-center rounded-full bg-red-50">
            <text class="text-xl text-red-500">{{ ['🤧', '😣', '🦵', '😟', '🤒', '😴', '😣', '🤢', '🙄'][index % 9] }}</text>
          </view>
          <text class="text-sm text-gray-700">{{ disease }}</text>
        </view>
      </view>
    </view>

    <!-- 按部位查找 -->
    <view class="mt-3 bg-white">
      <view class="border-b border-gray-100 px-4 py-3">
        <text class="text-base font-medium">按部位查找</text>
      </view>
      <view class="divide-y divide-gray-100">
        <view
          v-for="(part, index) in bodyParts"
          :key="index"
          class="flex cursor-pointer items-center justify-between px-4 py-4"
          @click="showPartSymptoms(part)"
        >
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-red-50">
              <text class="text-xl">{{ part.icon }}</text>
            </view>
            <text class="text-gray-700">{{ part.name }}</text>
          </view>
          <view class="flex items-center">
            <text class="mr-2 text-sm text-gray-500">更多选项</text>
            <uni-icons type="right" size="16" color="#ccc" />
          </view>
        </view>
      </view>
    </view>

    <!-- 症状选项弹窗 -->
    <view v-if="showSymptoms" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <view class="bg-white rounded-lg w-full max-w-sm overflow-hidden">
        <view class="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <text class="text-base font-medium">{{ selectedPart?.name }}相关症状</text>
          <uni-icons type="close" size="20" color="#ccc" @click="closeSymptoms" />
        </view>
        <view class="p-4">
          <view class="grid grid-cols-2 gap-3">
            <view
              v-for="(symptom, index) in selectedPart?.symptoms"
              :key="index"
              class="cursor-pointer rounded-lg border border-gray-200 px-3 py-3 text-center text-sm text-gray-700 transition-all hover:bg-red-50 hover:border-red-200"
              @click="navigateToDiagnosis(symptom)"
            >
              {{ symptom }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
