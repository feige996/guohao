<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 获取路由参数
const symptom = ref('')
const currentQuestionIndex = ref(0)
const answers = ref<string[]>([])

// 模拟问题数据
const questions = [
  '您是否感到疲劳，精神不振？',
  '胸闷多痰，恶心欲吐？',
  '是否有失眠，难以入睡的情况？',
  '是否有口干舌燥的感觉？',
  '是否容易出汗？',
]

// 生命周期
onLoad((options: any) => {
  if (options.symptom) {
    symptom.value = String(options.symptom)
  }
})

// 处理用户选择
function handleAnswer(answer: string) {
  // 记录答案
  answers.value[currentQuestionIndex.value] = answer

  // 判断是否为最后一题
  if (currentQuestionIndex.value < questions.length - 1) {
    // 不是最后一题，进入下一题
    currentQuestionIndex.value++
  }
  else {
    // 是最后一题，跳转到结果页面
    navigateToResult()
  }
}

// 跳转到结果页面
function navigateToResult() {
  // 计算得分（示例逻辑：回答"是"的数量）
  const yesCount = answers.value.filter(a => a === '是').length

  uni.navigateTo({
    url: `/pages-user-diagnosis/consultation-guide/smart-self-diagnosis/diagnosis-result?symptom=${encodeURIComponent(symptom.value)}&score=${yesCount}`,
  })
}

// 重新自测
function restartTest() {
  currentQuestionIndex.value = 0
  answers.value = []
}
</script>

<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <view class="header flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <uni-icons type="back" size="24" color="#333" @click="() => uni.navigateBack()" />
      <text class="text-lg font-bold">智慧自诊</text>
      <view class="w-8" />
    </view>

    <!-- 进度指示器 -->
    <view class="bg-white px-4 py-6">
      <view class="flex items-center justify-between">
        <text class="text-sm text-gray-500">{{ currentQuestionIndex + 1 }}/{{ questions.length }}</text>
        <text class="text-sm text-gray-500">{{ symptom }}</text>
      </view>
      <view class="mt-3 h-1 w-full rounded-full bg-gray-100">
        <view
          class="h-full rounded-full bg-red-500 transition-all duration-300"
          :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
        />
      </view>
    </view>

    <!-- 问题区域 -->
    <view class="mt-3 min-h-60 flex flex-col items-center justify-center bg-white px-4 py-12">
      <text class="mb-12 text-center text-xl text-gray-800">
        {{ questions[currentQuestionIndex] }}
      </text>

      <!-- 选项按钮 -->
      <view class="flex gap-8">
        <view
          class="h-24 w-24 flex cursor-pointer items-center justify-center border-2 border-red-500 rounded-full transition-all"
          :class="answers[currentQuestionIndex] === '否' ? 'bg-red-500 text-white' : 'bg-white text-red-500'"
          @click="handleAnswer('否')"
        >
          <text class="text-lg font-medium">否</text>
        </view>
        <view
          class="h-24 w-24 flex cursor-pointer items-center justify-center border-2 border-red-500 rounded-full transition-all"
          :class="answers[currentQuestionIndex] === '是' ? 'bg-red-500 text-white' : 'bg-white text-red-500'"
          @click="handleAnswer('是')"
        >
          <text class="text-lg font-medium">是</text>
        </view>
      </view>
    </view>

    <!-- 底部重新自测按钮 -->
    <view class="flex justify-center px-4 py-6">
      <button
        class="bg-transparent text-base text-red-500"
        @click="restartTest"
      >
        重新自测
      </button>
    </view>
  </view>
</template>
