<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'

// 定义props
const props = defineProps<{
  visible: boolean
  title?: string
  dataList?: string[]
  type?: 'inspection' | 'auscultation' | 'pulse' | 'syndromeType' | 'inquiryTemplate' | 'syndromeAnalysisTemplate' | 'careAdvice'
}>()

// 定义emits
const emit = defineEmits<{
  'update:visible': [value: boolean]
  'select': [value: string]
}>()

// 不同类型的默认数据列表
const dataLists = {
  inspection: [
    '面色红润',
    '面色苍白',
    '面色萎黄',
    '面色晦暗',
    '面色潮红',
    '精神良好',
    '精神欠佳',
    '精神萎靡',
    '舌质淡红',
    '舌质红',
    '舌苔白',
    '舌苔黄',
  ],
  auscultation: [
    '语音清晰',
    '语音嘶哑',
    '呼吸平稳',
    '呼吸急促',
    '咳嗽',
    '咳嗽有痰',
    '无异常气味',
    '口臭',
  ],
  pulse: [
    '脉弦',
    '脉滑',
    '脉细数',
    '脉沉',
    '脉浮',
    '脉有力',
    '脉弱',
    '血压正常',
    '血压偏高',
    '血压偏低',
    '体温正常',
    '体温偏高',
  ],
  syndromeType: [
    '气虚证',
    '血虚证',
    '阴虚证',
    '阳虚证',
    '气滞证',
    '血瘀证',
    '痰湿证',
    '湿热证',
    '寒证',
    '热证',
    '虚证',
    '实证',
    '肝郁气滞',
    '肝火上炎',
    '肝阳上亢',
    '肝血不足',
  ],
  inquiryTemplate: [
    '头痛以额部为主，胀痛为主，劳累后加重',
    '腹痛隐隐，喜温喜按，食后加重',
    '胸闷气短，活动后加重',
    '失眠多梦，入睡困难，易醒',
    '食欲不振，纳差，腹胀',
    '大便溏薄，日行2-3次',
    '大便秘结，3-4日一行',
    '小便频数，夜尿增多',
  ],
  syndromeAnalysisTemplate: [
    {
      title: '气血亏虚证',
      content: '患者长期工作压力大，思虑过度，耗伤气血，气血不足，脑失所养，故见头痛头晕、乏力；舌淡苔薄白，脉细弱。治以益气养血，安神定志。',
    },
    {
      title: '气虚证',
      content: '患者素体虚弱，或久病耗气，中气不足，升降失常，故见乏力、气短、纳差；舌淡苔白，脉弱。治以补气健脾，升清降浊。',
    },
    {
      title: '血虚证',
      content: '患者失血过多，或化源不足，血虚不能濡养，故见面色苍白、头晕心悸；舌淡脉细。治以养血安神，调补肝脾。',
    },
    {
      title: '阴虚证',
      content: '患者久病伤阴，或情志不遂，阴液亏耗，虚火内生，故见五心烦热、盗汗、口干；舌红少苔，脉细数。治以滋阴降火，宁心安神。',
    },
    {
      title: '阳虚证',
      content: '患者年老体衰，或久病伤阳，阳气不足，失于温煦，故见畏寒肢冷、神疲乏力；舌淡胖，脉沉弱。治以温补阳气，散寒除湿。',
    },
    {
      title: '气滞证',
      content: '患者情志不舒，肝气郁结，气机不畅，故见胸胁胀痛、情绪抑郁；舌苔薄白，脉弦。治以疏肝理气，解郁安神。',
    },
    {
      title: '血瘀证',
      content: '患者外伤或久病入络，瘀血内阻，经络不通，故见局部刺痛、舌紫暗有瘀斑；脉涩。治以活血化瘀，通络止痛。',
    },
    {
      title: '痰湿证',
      content: '患者饮食不节，脾胃失运，痰湿内生，阻滞气机，故见胸闷、咳嗽痰多、肢体困重；舌苔白腻，脉滑。治以健脾化痰，理气除湿。',
    },
  ],
  careAdvice: [
    '注意休息，避免劳累',
    '保证充足睡眠，早睡早起',
    '规律作息，不要熬夜',
    '适当午休，劳逸结合',
    '清淡饮食，忌辛辣油腻',
    '忌生冷食物，宜温热饮食',
    '多吃新鲜蔬菜水果',
    '少食多餐，不要暴饮暴食',
  ],
}

// 根据type选择数据列表
const displayDataList = ref<any[]>(props.dataList || dataLists[props.type || 'inspection'])

// 当前选中项数组
const selectedItems = ref<string[]>([])

// 处理选择项点击
function handleItemClick(item: string | { title: string, content: string }) {
  // 对于辨证分析模板，直接选中并确认
  if (props.type === 'syndromeAnalysisTemplate') {
    const template = item as { title: string, content: string }
    // 先复制内容，确保在关闭弹窗前数据已准备好
    const templateContent = template.content

    // 先关闭弹窗
    emit('update:visible', false)

    // 使用setTimeout确保弹窗已关闭后再发出select事件
    setTimeout(() => {
      emit('select', templateContent)
      // 重置选中项
      selectedItems.value = []
    }, 100)
    return
  }

  // 其他类型的多选处理
  const itemStr = typeof item === 'string' ? item : item.title
  // 检查是否已选中
  const index = selectedItems.value.indexOf(itemStr)
  if (index > -1) {
    // 如果已选中，则移除
    selectedItems.value.splice(index, 1)
  }
  else {
    // 如果未选中，则添加
    selectedItems.value.push(itemStr)
  }
}

// 处理确认选择
function handleConfirm() {
  // 根据类型决定连接符
  const separator = props.type === 'syndromeType' ? '、' : ', '
  const result = selectedItems.value.join(separator)

  // 先复制结果，确保在关闭弹窗前数据已准备好
  const selectedResult = result

  // 先关闭弹窗，再发出select事件，避免iOS平台上的时序问题
  emit('update:visible', false)

  // 使用setTimeout确保弹窗已关闭后再发出select事件
  setTimeout(() => {
    emit('select', selectedResult)
    // 重置选中项
    selectedItems.value = []
  }, 100)
}

// 处理关闭弹窗
function handleClose() {
  // 先关闭弹窗
  emit('update:visible', false)

  // 使用setTimeout确保弹窗已关闭后再重置选中项
  setTimeout(() => {
    // 重置选中项
    selectedItems.value = []
  }, 100)
}

// 监听props变化
watch(
  [() => props.dataList, () => props.type],
  () => {
    displayDataList.value = props.dataList || dataLists[props.type || 'inspection']
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="visible" class="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-100">
    <div class="w-[calc(100%-32px)] rounded-[16px] bg-white text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
      <!-- 弹窗标题 -->
      <view class="flex items-center border-b border-[#E5E7EB] px-5 py-4">
        <view class="flex-1 text-base text-[#1F2937] font-bold">
          {{ title || '选择望诊描述' }}
        </view>
        <view class="h-6 w-6 flex items-center justify-center text-[#6B7280]" @click="handleClose">
          <wd-icon name="close" />
        </view>
      </view>

      <!-- 提示文本 -->
      <view v-if="type === 'syndromeType'" class="px-5 pb-1 pt-3">
        <view class="text-xs text-[#6B7280]">
          点击可添加多个证型，用顿号分隔
        </view>
      </view>
      <view v-if="type === 'syndromeAnalysisTemplate'" class="px-5 pb-1 pt-3">
        <view class="text-xs text-[#6B7280]">
          选择后可根据实际情况修改
        </view>
      </view>
      <view v-if="type === 'careAdvice'" class="px-5 pb-1 pt-3">
        <view class="text-xs text-[#6B7280]">
          点击可添加多条建议，用分号分隔
        </view>
      </view>

      <!-- 选择列表 -->
      <div class="max-h-[400px] overflow-y-auto px-5 py-3">
        <!-- 辨证分析模板使用卡片布局 -->
        <div v-if="type === 'syndromeAnalysisTemplate'" class="space-y-3">
          <div
            v-for="(item, index) in displayDataList"
            :key="index"
            class="border-2 border-blue-300 rounded-lg p-4 text-left shadow-sm transition-all duration-200"
            :class="{
              'border-blue-500 bg-blue-50': selectedItems.includes(item.title),
              'hover:border-blue-500 hover:shadow-md': !selectedItems.includes(item.title),
            }"
            @click="handleItemClick(item)"
          >
            <h4 class="mb-2 text-base text-[#1677FF] font-bold">
              {{ item.title }}
            </h4>
            <p class="whitespace-pre-line text-sm text-[#333333] leading-relaxed">
              {{ item.content }}
            </p>
          </div>
        </div>

        <!-- 调护建议使用红色边框样式 -->
        <div v-else-if="type === 'careAdvice'" class="space-y-3">
          <div
            v-for="item in displayDataList"
            :key="item"
            class="border-2 border-[#E5E7EB] rounded-lg p-3 text-left transition-colors"
            :class="{
              'border-[#B91C1C] bg-[#FEE2E2]': selectedItems.includes(item),
              'hover:border-[#B91C1C]': !selectedItems.includes(item),
            }"
            @click="handleItemClick(item)"
          >
            <span
              class="text-sm" :class="{
                'text-[#B91C1C] font-medium': selectedItems.includes(item),
                'text-[#333333]': !selectedItems.includes(item),
              }"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <!-- 辨证分型使用网格布局 -->
        <div v-else-if="type === 'syndromeType'" class="grid grid-cols-2 gap-3">
          <div
            v-for="item in displayDataList"
            :key="item"
            class="flex items-center justify-center border-2 border-blue-300 rounded-lg px-4 py-3 text-center transition-colors"
            :class="{
              'border-[#1677FF] bg-[#E6F4FF] text-[#1677FF]': selectedItems.includes(item),
              'hover:border-[#1677FF]': !selectedItems.includes(item),
            }"
            @click="handleItemClick(item)"
          >
            <span>{{ item }}</span>
          </div>
        </div>

        <!-- 其他类型使用单列布局 -->
        <template v-else>
          <div
            v-for="item in displayDataList"
            :key="item"
            class="mb-3 flex items-center justify-between border-2 border-blue-300 rounded-lg px-4 py-3 text-left transition-colors"
            :class="{
              'border-[#1677FF] bg-[#E6F4FF] text-[#1677FF]': selectedItems.includes(item),
              'hover:border-[#1677FF]': !selectedItems.includes(item),
            }"
            @click="handleItemClick(item)"
          >
            <span>{{ item }}</span>
            <wd-icon v-if="selectedItems.includes(item)" name="check" size="16" />
          </div>
        </template>
      </div>

      <!-- 确认按钮 - 辨证分析模板不需要确认按钮 -->
      <div v-if="type !== 'syndromeAnalysisTemplate'" class="border-t border-[#E5E7EB] px-5 py-4">
        <wd-button
          class="w-full rounded-lg bg-[#1677FF] py-3 text-sm text-white font-medium transition-colors hover:bg-[#0958D9]"
          @click="handleConfirm"
        >
          确认 ({{ selectedItems.length }})
        </wd-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 弹窗过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active > div,
.fade-leave-active > div {
  transition: all 0.3s ease;
}

.fade-enter-from > div {
  transform: scale(0.9);
  opacity: 0;
}

.fade-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}

/* 滚动条样式 */
:deep(.overflow-y-auto::-webkit-scrollbar) {
  width: 4px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-track) {
  background: #f3f4f6;
  border-radius: 2px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb) {
  background: #d1d5db;
  border-radius: 2px;
}

:deep(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
  background: #9ca3af;
}
</style>
