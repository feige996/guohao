<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const consultationId = route.query.id as string

// 表单数据
const formData = reactive({
  chiefComplaint: '', // 主诉
  inspection: '',     // 望诊
  auscultation: '',   // 闻诊
  inquiry: '',        // 问诊
  pulse: '',          // 切诊
  diagnosis: '',      // 诊断结果
  syndromeType: '',   // 辨证分型
  syndromeAnalysis: '', // 辨证分析
  careAdvice: ''      // 调护建议
})

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
  
  uni.showToast({
    title: '问诊已结束', 
    icon: 'none',
    success: () => {
      // 延迟返回，让用户看到提示
      setTimeout(() => {
        router.back()
      }, 1500)
    }
  })
}

// 选择常用模板
function selectCommonTemplate() {
  // 实际项目中应打开模板选择器
  uni.showToast({ title: '选择常用模板', icon: 'none' })
}

// 选择辨证分析模板
function selectSyndromeTemplate() {
  // 实际项目中应打开辨证分析模板选择器
  uni.showToast({ title: '选择辨证分析模板', icon: 'none' })
}

// 选择调护建议
function selectCareAdvice() {
  // 实际项目中应打开调护建议选择器
  uni.showToast({ title: '选择调护建议', icon: 'none' })
}

// 选择望诊信息
function selectInspection() {
  // 实际项目中应打开望诊选择器
  uni.showToast({ title: '选择望诊信息', icon: 'none' })
}

// 选择闻诊信息
function selectAuscultation() {
  // 实际项目中应打开闻诊选择器
  uni.showToast({ title: '选择闻诊信息', icon: 'none' })
}

// 选择切诊信息
function selectPulse() {
  // 实际项目中应打开切诊选择器
  uni.showToast({ title: '选择切诊信息', icon: 'none' })
}

// 选择辨证分型
function selectSyndromeType() {
  // 实际项目中应打开辨证分型选择器
  uni.showToast({ title: '选择辨证分型', icon: 'none' })
}

// 生命周期
onMounted(() => {
  fetchConsultationInfo()
})
</script>

<template>
  <div class="relative mx-auto max-w-[375px] min-h-screen w-full bg-[#F9FAFB] pb-5">
    <!-- 顶部导航 -->
    <header class="fixed left-0 right-0 top-0 z-50 mx-auto h-[56px] max-w-[375px] w-full flex items-center justify-between bg-white px-4 shadow-sm">
      <button
        class="text-[#333333] transition-colors hover:text-[#6B7280]"
        aria-label="返回上一页"
        @click="router.back()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-lg text-[#333333] font-bold leading-7">
        结束问诊
      </h1>
      <div class="w-6"></div> <!-- 占位，保持标题居中 -->
    </header>

    <!-- 表单内容 -->
    <main class="mt-[56px] p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-56px)]">
      <!-- 主诉 -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-[#333333]">
          主诉<span class="text-[#EF4444]">*</span>
        </label>
        <textarea
          v-model="formData.chiefComplaint"
          placeholder="请输入主诉..."
          class="w-full min-h-[80px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
        ></textarea>
      </div>

      <!-- 四诊信息 -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-[#333333]">四诊信息</h3>
        
        <!-- 望诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">望诊</label>
          <div class="flex items-center justify-between w-full px-4 py-3 border border-[#E5E7EB] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">面色、舌质、精神状态等...</span>
            <button 
              class="text-sm text-[#8E4337] font-medium" 
              @click="selectInspection"
            >
              选择
            </button>
          </div>
        </div>

        <!-- 闻诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">闻诊</label>
          <div class="flex items-center justify-between w-full px-4 py-3 border border-[#E5E7EB] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">语声、呼吸、咳嗽等...</span>
            <button 
              class="text-sm text-[#8E4337] font-medium" 
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
            class="w-full min-h-[60px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
          ></textarea>
        </div>

        <!-- 常用模板按钮 -->
        <button 
          class="w-full flex items-center justify-center py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#8E4337] font-medium hover:bg-[#F5EBE9] transition-colors"
          @click="selectCommonTemplate"
        >
          选择常用模板
        </button>

        <!-- 切诊 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">切诊</label>
          <div class="flex items-center justify-between w-full px-4 py-3 border border-[#E5E7EB] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">脉象、血压、体温等...</span>
            <button 
              class="text-sm text-[#8E4337] font-medium" 
              @click="selectPulse"
            >
              选择
            </button>
          </div>
        </div>
      </div>

      <!-- 诊断与调护 -->
      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-[#333333]">诊断与调护</h3>
        
        <!-- 诊断结果 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">诊断结果<span class="text-[#EF4444]">*</span></label>
          <textarea
            v-model="formData.diagnosis"
            placeholder="请输入诊断结果..."
            class="w-full min-h-[80px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
          ></textarea>
        </div>

        <!-- 辨证分型 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">辨证分型</label>
          <div class="flex items-center justify-between w-full px-4 py-3 border border-[#E5E7EB] rounded-lg">
            <span v-if="formData.syndromeType" class="text-sm text-[#1F2937]">{{ formData.syndromeType }}</span>
            <span v-else class="text-sm text-[#9CA3AF]">请输入或选择辨证分型...</span>
            <button 
              class="text-sm text-[#8E4337] font-medium" 
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
            class="w-full min-h-[100px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
          ></textarea>
          <button 
            class="w-full flex items-center justify-center py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#8E4337] font-medium hover:bg-[#F5EBE9] transition-colors"
            @click="selectSyndromeTemplate"
          >
            选择辨证分析模板
          </button>
        </div>

        <!-- 调护建议 -->
        <div class="space-y-1">
          <label class="text-xs text-[#6B7280]">调护建议</label>
          <textarea
            v-model="formData.careAdvice"
            placeholder="请输入或选择调护建议..."
            class="w-full min-h-[80px] px-4 py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
          ></textarea>
          <button 
            class="w-full flex items-center justify-center py-3 border border-[#E5E7EB] rounded-lg text-sm text-[#8E4337] font-medium hover:bg-[#F5EBE9] transition-colors"
            @click="selectCareAdvice"
          >
            选择调护建议
          </button>
        </div>
      </div>

      <!-- 底部按钮区域 -->
      <div class="fixed left-0 right-0 bottom-0 max-w-[375px] w-full mx-auto p-4 bg-white border-t border-[#E5E7EB]">
        <div class="grid grid-cols-2 gap-3">
          <button 
            class="py-3 border-2 border-[#E5E7EB] rounded-lg text-[#6B7280] text-sm font-medium hover:bg-[#F9FAFB] transition-colors"
            @click="router.back()"
          >
            取消
          </button>
          <button 
            class="py-3 bg-[#8E4337] rounded-lg text-white text-sm font-medium hover:bg-[#6E2F25] transition-colors"
            @click="submitEndConsultation"
          >
            确认结束
          </button>
        </div>
      </div>
    </main>
  </div>
</template>