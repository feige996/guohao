<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import SizhenTanChuang from './components/sizhentanchuang.vue'

const consultationId = uni.getStorageSync('currentConsultationId') || ''

// 页面配置
definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '结束问诊',
    navigationBarBackgroundColor: '#fff',
  },
})

// 表单数据
const formData = reactive({
  chiefComplaint: '', // 主诉
  inspection: '', // 望诊
  auscultation: '', // 闻诊
  inquiry: '', // 问诊
  pulse: '', // 切诊
  diagnosis: '', // 诊断结果
  syndromeType: '', // 辨证分型
  syndromeAnalysis: '', // 辨证分析
  careAdvice: '', // 调护建议
})

// 控制处方开具确认弹窗显示
const prescriptionModalVisible = ref(false)

// 控制望诊选择弹窗显示
const inspectionModalVisible = ref(false)

// 控制问诊模板弹窗显示
const inquiryTemplateModalVisible = ref(false)

// 控制辨证分型弹窗显示
const syndromeTypeModalVisible = ref(false)

// 控制辨证分析模板弹窗显示
const syndromeAnalysisTemplateModalVisible = ref(false)

// 控制调护建议弹窗显示
const careAdviceModalVisible = ref(false)

// 模拟获取问诊信息
function fetchConsultationInfo() {
  // 实际项目中应调用API获取数据
  console.log('获取问诊信息:', consultationId)
}

// 提交结束问诊
function submitEndConsultation() {
  // 验证必填项
  if (!formData.chiefComplaint) {
    uni.showToast({ title: '请输入主诉', icon: 'none' })
    return
  }

  if (!formData.diagnosis) {
    uni.showToast({ title: '请输入诊断结果', icon: 'none' })
    return
  }

  // 实际项目中应调用API提交数据
  console.log('提交结束问诊数据:', formData)

  // 显示处方开具确认弹窗
  prescriptionModalVisible.value = true
}

// 稍后开方
function postponePrescription() {
  prescriptionModalVisible.value = false
  uni.showToast({
    title: '问诊已结束',
    icon: 'none',
    success: () => {
      // 延迟返回，让用户看到提示
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    },
  })
}

// 立即开方
function createPrescription() {
  prescriptionModalVisible.value = false
  // 跳转到处方开具页面
  uni.navigateTo({
    url: `/pages-doctor-diagnosis/yuyinwenzhen/prescription-create?id=${consultationId}`,
  })
}

// 选择常用模板
function selectCommonTemplate() {
  inquiryTemplateModalVisible.value = true
}

// 选择辨证分析模板
function selectSyndromeTemplate() {
  syndromeAnalysisTemplateModalVisible.value = true
}

// 处理辨证分析模板选择结果
function handleSyndromeAnalysisTemplateSelect(value: string) {
  formData.syndromeAnalysis = value
}

// 选择调护建议
function selectCareAdvice() {
  careAdviceModalVisible.value = true
}

// 处理调护建议选择结果
function handleCareAdviceSelect(value: string) {
  formData.careAdvice = value
}

// 当前正在选择的数据类型
const currentSelectType = ref<'inspection' | 'auscultation' | 'pulse'>('inspection')

// 选择望诊信息
function selectInspection() {
  currentSelectType.value = 'inspection'
  inspectionModalVisible.value = true
}

// 选择闻诊信息
function selectAuscultation() {
  currentSelectType.value = 'auscultation'
  inspectionModalVisible.value = true
}

// 选择切诊信息
function selectPulse() {
  currentSelectType.value = 'pulse'
  inspectionModalVisible.value = true
}

// 处理选择结果
function handleInspectionSelect(value: string) {
  switch (currentSelectType.value) {
    case 'inspection':
      formData.inspection = value
      break
    case 'auscultation':
      formData.auscultation = value
      break
    case 'pulse':
      formData.pulse = value
      break
  }
}

// 处理问诊模板选择结果
function handleInquiryTemplateSelect(value: string) {
  formData.inquiry = value
}

// 处理取消操作
function handleCancel() {
  uni.navigateBack()
}

// 选择辨证分型
function selectSyndromeType() {
  syndromeTypeModalVisible.value = true
}

// 处理辨证分型选择结果
function handleSyndromeTypeSelect(value: string) {
  formData.syndromeType = value
}

// 生命周期
onMounted(() => {
  fetchConsultationInfo()
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- 表单内容 -->
    <main class="p-4 pb-32 space-y-5">
      <!-- 添加足够的底部内边距防止内容被遮挡 -->
      <!-- 主诉 -->
      <div>
        <label class="mb-2 block text-base text-[#333333] font-medium" for="chiefComplaint">
          主诉 <span class="text-[#EF4444]">*</span>
        </label>
        <textarea
          id="chiefComplaint"
          v-model="formData.chiefComplaint"
          rows="4"
          placeholder="请输入主诉..."
          class="mx-auto w-[calc(100%-4px)] resize-none rounded-lg px-4 py-3 text-base text-[#1F2937] focus:border-[#888888] focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] placeholder-[#9CA3AF]"
          style="border: 2px solid #E5E7EB; box-sizing: border-box;"
        />
      </div>

      <!-- 四诊信息 -->
      <div class="space-y-3">
        <view class="text-base text-[#333333] font-semibold">
          四诊信息
        </view>

        <!-- 望诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">望诊</label>
          <div class="w-full flex items-center rounded-lg px-4 py-3" style="border: 2px solid #E5E7EB; box-sizing: border-box;">
            <textarea
              v-model="formData.inspection"
              class="flex-1 resize-none border-0 bg-transparent p-0 text-sm text-[#1F2937] focus:outline-none placeholder-[#9CA3AF]"
              placeholder="面色、舌质、精神状态等..."
              rows="1"
              style="height: 24px;"
            />
            <button
              class="whitespace-nowrap text-sm text-[#1677FF] font-medium"
              style="margin-left: auto;"
              @click="selectInspection"
            >
              选择
            </button>
          </div>
        </div>

        <!-- 闻诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">闻诊</label>
          <div class="w-full flex items-center rounded-lg px-4 py-3" style="border: 2px solid #E5E7EB; box-sizing: border-box;">
            <textarea
              v-model="formData.auscultation"
              class="flex-1 resize-none border-0 bg-transparent p-0 text-sm text-[#1F2937] focus:outline-none placeholder-[#9CA3AF]"
              placeholder="语声、呼吸、咳嗽等..."
              rows="1"
              style="height: 24px;"
            />
            <button
              class="whitespace-nowrap text-sm text-[#1677FF] font-medium"
              style="margin-left: auto;"
              @click="selectAuscultation"
            >
              选择
            </button>
          </div>
        </div>

        <!-- 问诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">问诊</label>
          <textarea
            v-model="formData.inquiry"
            placeholder="症状详情、伴随症状、大小便、睡眠等..."
            class="mx-auto min-h-[60px] w-[calc(100%-4px)] resize-none rounded-lg px-4 py-3 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] placeholder-[#9CA3AF]"
            style="border: 2px solid #E5E7EB; box-sizing: border-box;"
          />
        </div>

        <!-- 常用模板按钮 -->
        <view class="mt-2">
          <wd-button
            type="primary"
            plain
            block
            @click="selectCommonTemplate"
          >
            选择常用模板
          </wd-button>
        </view>

        <!-- 切诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">切诊</label>
          <div class="w-full flex items-center rounded-lg px-4 py-3" style="border: 2px solid #E5E7EB; box-sizing: border-box;">
            <textarea
              v-model="formData.pulse"
              class="flex-1 resize-none border-0 bg-transparent p-0 text-sm text-[#1F2937] focus:outline-none placeholder-[#9CA3AF]"
              placeholder="脉象、血压、体温等..."
              rows="1"
              style="height: 24px;"
            />
            <button
              class="whitespace-nowrap text-sm text-[#1677FF] font-medium"
              style="margin-left: auto;"
              @click="selectPulse"
            >
              选择
            </button>
          </div>
        </div>
      </div>

      <!-- 诊断与调护 -->
      <div class="space-y-3">
        <h3 class="text-sm text-[#333333] font-semibold">
          诊断与调护
        </h3>

        <!-- 诊断结果 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">诊断结果<span class="text-[#EF4444]">*</span></label>
          <textarea
            v-model="formData.diagnosis"
            placeholder="请输入诊断结果..."
            class="mx-auto min-h-[80px] w-[calc(100%-4px)] resize-none rounded-lg px-4 py-3 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] placeholder-[#9CA3AF]"
            style="border: 2px solid #E5E7EB; box-sizing: border-box;"
          />
        </div>

        <!-- 辨证分型 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">辨证分型</label>
          <div class="w-full flex items-center rounded-lg px-4 py-3" style="border: 2px solid #E5E7EB; box-sizing: border-box;">
            <input
              v-model="formData.syndromeType"
              type="text"
              class="flex-1 text-sm outline-none"
              placeholder="请输入或选择辨证分型..."
              style="background: transparent;"
            >
            <button
              class="whitespace-nowrap text-sm text-[#1677FF] font-medium"
              style="margin-left: auto;"
              @click="selectSyndromeType"
            >
              选择
            </button>
          </div>
        </div>

        <!-- 辨证分析 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">辨证分析（病因、病机、治则）</label>
          <textarea
            v-model="formData.syndromeAnalysis"
            placeholder="例如：患者长期工作压力大思虑过度，耗伤心气血导致气血不足失养所致头痛。治以益气养血安神定志。"
            class="mx-auto min-h-[100px] w-[calc(100%-4px)] resize-none rounded-lg px-4 py-3 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] placeholder-[#9CA3AF]"
            style="border: 2px solid #E5E7EB; box-sizing: border-box;"
          />
          <view class="mt-2">
            <wd-button
              type="primary"
              plain
              block
              @click="selectSyndromeTemplate"
            >
              选择辨证分析模板
            </wd-button>
          </view>
        </div>

        <!-- 调护建议 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">调护建议</label>
          <textarea
            v-model="formData.careAdvice"
            placeholder="请输入或选择调护建议..."
            class="mx-auto min-h-[80px] w-[calc(100%-4px)] resize-none rounded-lg px-4 py-3 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] placeholder-[#9CA3AF]"
            style="border: 2px solid #E5E7EB; box-sizing: border-box;"
          />
          <view class="mt-2">
            <wd-button
              type="primary"
              plain
              block
              @click="selectCareAdvice"
            >
              选择调护建议
            </wd-button>
          </view>
        </div>
      </div>

      <!-- 望诊选择弹窗 -->
      <SizhenTanChuang
        v-model:visible="inspectionModalVisible"
        :title="
          currentSelectType === 'inspection'
            ? '选择望诊描述'
            : currentSelectType === 'auscultation'
              ? '选择闻诊描述'
              : '选择切诊描述'
        "
        :type="currentSelectType"
        @select="handleInspectionSelect"
      />

      <!-- 问诊模板选择弹窗 -->
      <SizhenTanChuang
        v-model:visible="inquiryTemplateModalVisible"
        title="选择问诊模板"
        type="inquiryTemplate"
        @select="handleInquiryTemplateSelect"
      />

      <!-- 辨证分型选择弹窗 -->
      <SizhenTanChuang
        v-model:visible="syndromeTypeModalVisible"
        title="选择辨证分型"
        type="syndromeType"
        @select="handleSyndromeTypeSelect"
      />

      <!-- 辨证分析模板选择弹窗 -->
      <SizhenTanChuang
        v-model:visible="syndromeAnalysisTemplateModalVisible"
        title="选择辨证分析模板"
        type="syndromeAnalysisTemplate"
        @select="handleSyndromeAnalysisTemplateSelect"
      />

      <!-- 调护建议选择弹窗 -->
      <SizhenTanChuang
        v-model:visible="careAdviceModalVisible"
        title="选择调护建议"
        type="careAdvice"
        @select="handleCareAdviceSelect"
      />
    </main>

    <!-- 底部按钮区域 -->
    <div class="fixed bottom-0 left-0 right-0 border-t border-[#E5E7EB] bg-white p-4">
      <div class="grid grid-cols-2 gap-3">
        <wd-button
          type="info"
          plain
          @click="handleCancel"
        >
          取消
        </wd-button>
        <wd-button
          type="primary"
          @click="submitEndConsultation"
        >
          确认结束
        </wd-button>
      </div>
    </div>

    <!-- 处方开具确认弹窗 -->
    <div v-if="prescriptionModalVisible" class="pointer-events-auto fixed inset-0 z-50 bg-black/50 opacity-100">
      <div class="fixed left-1/2 top-1/2 max-w-[320px] w-[calc(100%-48px)] transform rounded-[16px] bg-white p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 -translate-x-1/2 -translate-y-1/2">
        <div class="mb-6">
          <div class="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-[#F3F4F6]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6B7280" class="h-6 w-6">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg text-[#1F2937] font-bold">
            处方开具
          </h3>
          <p class="text-sm text-[#6B7280] leading-relaxed">
            是否需要为患者开具处方？
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="border-2 border-[#1677FF] py-3 text-sm text-[#1677FF] font-medium transition-colors active:scale-98 hover:bg-[#E6F4FF]"
            @click="postponePrescription"
          >
            稍后开方
          </button>
          <button
            class="rounded-lg bg-[#1677FF] py-3 text-sm text-white font-medium transition-colors active:scale-98 hover:bg-[#0958D9]"
            @click="createPrescription"
          >
            立即开方
          </button>
        </div>
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
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}

.fade-leave-to > div {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}
</style>
