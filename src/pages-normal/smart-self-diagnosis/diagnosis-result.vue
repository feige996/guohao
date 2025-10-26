<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 诊断结果数据
const symptom = ref('')
const score = ref(0)
const diagnosisResult = ref({
  title: '',
  analysis: '',
  suggestions: [] as string[],
  referenceCase: {
    title: '',
    doctor: '',
    mainSymptoms: '',
    diagnosisMethod: '',
    treatmentMethod: '',
    result: '',
  },
  naturalTherapy: {
    title: '',
    description: '',
  },
})

// 生命周期
onLoad((options: any) => {
  // 设置默认值，确保页面能正常显示
  symptom.value = options.symptom ? String(options.symptom) : '失眠'
  score.value = options.score ? Number(options.score) : 3

  // 生成诊断结果
  generateDiagnosisResult()
})

// 生成诊断结果
function generateDiagnosisResult() {
  // 确保有默认的诊断结果
  if (symptom.value === '失眠' || score.value >= 3) {
    diagnosisResult.value = {
      title: '不寐心火旺盛',
      analysis: '本病多因脏腑气血失和，阴阳失调，心失所养，心神不安而致。本证多因心火炽盛，扰动心神而致不寐。中医治疗应以清心泻火，宁心安神为主。',
      suggestions: ['朱砂安神丸', '枣仁安神液', '安神补脑液'],
      referenceCase: {
        title: '失眠：心肾不交证',
        doctor: '董玉明 副主任医师 (中医心血管科)',
        mainSymptoms: '失眠、伴头晕耳鸣，加重1个月，西药治疗，未见明显缓解。',
        diagnosisMethod: '舌质淡红，脉细数',
        treatmentMethod: '滋养肾阴，交通心肾',
        result: '治疗方法：夜交藤、生龙骨、茯神、远志、珍珠母、莲心、菖蒲、合欢皮、陈皮、生地黄、丹皮、酸枣仁。\n病情变化：失眠明显好转，手足心灼热改善。',
      },
      naturalTherapy: {
        title: '穴位按摩',
        description: '按压心经循行：沿着双侧上臂内侧中线，由上向下按压，重点再按压神门穴（位于腕部内侧，尺侧腕屈肌腱的桡侧凹陷处）和内关穴（位于前臂内侧，腕横纹上2寸）。\n\n每晚睡前按摩5-10分钟，以有酸胀感为宜。',
      },
    }
  }
  else {
    diagnosisResult.value = {
      title: '气血不足证',
      analysis: '本病多因禀赋不足，或后天失养，或久病耗伤气血，导致气血亏虚，脏腑失养，心神不安而致。治疗应以补气养血，安神定志为主。',
      suggestions: ['归脾丸', '人参养荣丸', '复方阿胶浆'],
      referenceCase: {
        title: '失眠：气血不足证',
        doctor: '李医生 主治医师 (中医内科)',
        mainSymptoms: '失眠、多梦、心悸、乏力，面色苍白，舌淡苔薄，脉细弱。',
        diagnosisMethod: '舌淡苔薄，脉细弱',
        treatmentMethod: '补气养血，安神定志',
        result: '治疗方法：黄芪、白术、当归、熟地、白芍、远志、酸枣仁、龙眼肉、炙甘草。\n病情变化：服药2周后，睡眠质量明显改善，精神状态好转。',
      },
      naturalTherapy: {
        title: '饮食调理',
        description: '可食用一些具有补气养血作用的食物，如红枣、桂圆、莲子、黑芝麻、核桃等。\n\n推荐食疗方：桂圆莲子粥（桂圆肉15克，莲子15克，大米50克，煮粥食用）。\n每晚睡前1小时服用，有养血安神的作用。',
      },
    }
  }
}

// 重新自测
function restartTest() {
  uni.navigateTo({
    url: '/pages/normal/smart-self-diagnosis/index',
  })
}

// 返回首页
function backToHome() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>

<template>
  <view class="page min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <view class="header flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <uni-icons type="back" size="24" color="#333" @click="() => uni.navigateBack()" />
      <text class="text-lg font-bold">诊断结果</text>
      <view class="w-8" />
    </view>

    <!-- 诊断结果内容 -->
    <scroll-view class="w-full" scroll-y>
      <!-- 诊断标题 -->
      <view class="bg-white p-4">
        <text class="text-lg text-red-500 font-bold">诊断：{{ diagnosisResult.title }}</text>
      </view>

      <!-- 分析 -->
      <view class="mt-3 bg-white p-4">
        <text class="mb-2 block text-base font-medium">分析</text>
        <text class="text-gray-700 leading-6">{{ diagnosisResult.analysis }}</text>
      </view>

      <!-- 诊疗建议 -->
      <view class="mt-3 bg-white p-4">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-base font-medium">诊疗建议</text>
          <text class="cursor-pointer text-sm text-red-500">附近药店</text>
        </view>
        <view class="rounded-lg bg-red-50 p-3">
          <text v-for="(suggestion, index) in diagnosisResult.suggestions" :key="index" class="mb-1 block text-gray-700">
            {{ suggestion }}
          </text>
        </view>
      </view>

      <!-- 参考病例 -->
      <view class="mt-3 bg-white p-4">
        <text class="mb-3 block text-base font-medium">参考病例</text>
        <view class="border border-gray-100 rounded-lg p-3">
          <text class="mb-2 block text-red-500 font-medium">{{ diagnosisResult.referenceCase.title }}</text>
          <text class="mb-2 block text-sm text-gray-500">
            {{ diagnosisResult.referenceCase.doctor }}
          </text>
          <view class="space-y-2">
            <view>
              <text class="text-sm text-gray-600">主诉：</text>
              <text class="text-sm text-gray-700">{{ diagnosisResult.referenceCase.mainSymptoms }}</text>
            </view>
            <view>
              <text class="text-sm text-gray-600">辨证方法：</text>
              <text class="text-sm text-gray-700">{{ diagnosisResult.referenceCase.diagnosisMethod }}</text>
            </view>
            <view>
              <text class="text-sm text-gray-600">治疗方法：</text>
              <text class="text-sm text-gray-700">{{ diagnosisResult.referenceCase.treatmentMethod }}</text>
            </view>
            <view>
              <text class="text-sm text-gray-600">病情变化：</text>
              <text class="whitespace-pre-line text-sm text-gray-700">{{ diagnosisResult.referenceCase.result }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 自然疗法 -->
      <view class="mb-24 mt-3 bg-white p-4">
        <text class="mb-3 block text-base font-medium">自然疗法</text>
        <view class="space-y-3">
          <text class="text-red-500 font-medium">{{ diagnosisResult.naturalTherapy.title }}</text>
          <text class="whitespace-pre-line text-gray-700 leading-6">
            {{ diagnosisResult.naturalTherapy.description }}
          </text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
      <button
        class="w-full rounded-full bg-red-500 py-3 text-white font-medium"
        @click="restartTest"
      >
        重新自测
      </button>
    </view>
  </view>
</template>
