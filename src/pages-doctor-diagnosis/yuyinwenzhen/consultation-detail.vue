<script setup lang="ts">
import { ref } from 'vue'
const toastMessage = ref('')
const isToastVisible = ref(false)
const isImageViewerActive = ref(false)
const currentImage = ref('')
const expandedSections = ref({
  fourDiagnosis: true,
})

// Toast 提示
function showToast(message: string, duration = 2000): void {
  toastMessage.value = message
  isToastVisible.value = true

  setTimeout(() => {
    isToastVisible.value = false
  }, duration)
}

// 返回上一页
function goBack(): void {
  uni.navigateBack()
}

// 切换章节展开/折叠
function toggleSection(sectionId: string): void {
  expandedSections.value[sectionId] = !expandedSections.value[sectionId]
}

// 查看图片
function viewImage(imageSrc: string): void {
  currentImage.value = imageSrc
  isImageViewerActive.value = true
}

// 关闭图片查看器
function closeImageViewer(): void {
  isImageViewerActive.value = false
}

// 查看完整病历
function viewMedicalRecord(): void {
  showToast('正在打开完整病历...')
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages-doctor-diagnosis/yuyinwenzhen/medical-record'
    })
  }, 500)
}

// 查看处方详情
function viewPrescriptionDetail(): void {
  showToast('正在打开处方详情...')
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages-doctor-diagnosis/yuyinwenzhen/prescription-detail'
    })
  }, 500)
}

// 更多操作
function showMoreOptions(): void {
  showToast('更多操作功能开发中')
}
</script>

<template>
  <div class="relative mx-auto max-w-[375px] min-h-screen w-full pb-[80px]">
    <!-- Toast 通知 -->
    <div class="toast" :class="{ show: isToastVisible }">
      {{ toastMessage }}
    </div>

    <!-- 图片查看器 -->
    <div class="image-viewer" :class="{ active: isImageViewerActive }" @click="closeImageViewer">
      <img :src="currentImage" alt="查看图片">
    </div>

    <!-- 顶部导航 -->
    <!-- <header class="fixed left-0 right-0 top-0 z-50 mx-auto h-[56px] max-w-[375px] w-full flex items-center justify-between bg-white px-4 shadow-sm">
      <button class="text-[#333333] transition-colors hover:text-[#6B7280]" aria-label="返回上一页" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-lg text-[#1F2937] font-bold">
        问诊详情
      </h1>
      <button class="text-[#8E4337] transition-colors hover:text-[#6E2F25]" aria-label="更多操作" @click="showMoreOptions()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </header> -->

    <!-- 主内容区 -->
    <main class="px-4 pt-[24px] space-y-4">
      <!-- 患者基本信息 -->
      <section class="w-full border border-[#F3F4F6] rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#F5EBE9]">
              <img src="https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg" alt="王女士" class="h-full w-full object-cover">
            </div>
            <!-- 性别标识 -->
            <div class="absolute h-5 w-5 flex items-center justify-center border-2 border-white rounded-full bg-[#EC4899] -bottom-1 -right-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="h-3 w-3">
                <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5c0 1.41.84 2.617 2.042 3.165L5.5 9.537a.75.75 0 0 0 .75.75h.214l-.549 3.285a.75.75 0 0 0 1.48.247l.65-3.907h.91l.65 3.907a.75.75 0 0 0 1.48-.247l-.55-3.285h.215a.75.75 0 0 0 .75-.75l-1.042-1.872A3.5 3.5 0 0 0 11.5 4.5 3.5 3.5 0 0 0 8 1Z" />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <div class="mb-1 flex items-center gap-2">
              <span class="text-lg text-[#1F2937] font-bold">王女士</span>
              <span class="text-sm text-[#6B7280]">28岁</span>
            </div>
            <div class="text-xs text-[#6B7280]">
              患者编号：GH973212
            </div>
          </div>
          <button
            class="flex items-center gap-1 rounded-lg bg-[#F5EBE9] px-3 py-1.5 text-xs text-[#8E4337] font-medium transition-colors hover:bg-[#E5D5D0]"
            aria-label="查看病历"
            @click="viewMedicalRecord()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5">
              <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
            </svg>
            病历
          </button>
        </div>
      </section>

      <!-- 问诊信息 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">问诊信息</span>
        </div>

        <div class="space-y-3">
          <!-- 问诊类型 -->
          <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
            <span class="text-sm text-[#6B7280]">问诊类型</span>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                <path d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" />
              </svg>
              <span class="text-sm text-[#1F2937] font-medium">图文问诊</span>
            </div>
          </div>

          <!-- 问诊状态 -->
          <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
            <span class="text-sm text-[#6B7280]">问诊状态</span>
            <span class="rounded-full bg-[#D1FAE5] px-2.5 py-1 text-xs text-[#10B981] font-bold">已完成</span>
          </div>

          <!-- 问诊时间 -->
          <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
            <span class="text-sm text-[#6B7280]">问诊时间</span>
            <span class="text-sm text-[#1F2937] font-medium">2025-10-26 14:30</span>
          </div>

          <!-- 问诊费用 -->
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-[#6B7280]">问诊费用</span>
            <span class="text-base text-[#8E4337] font-bold">¥50</span>
          </div>
        </div>
      </section>

      <!-- 主诉与现病史 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">主诉与现病史</span>
        </div>

        <div class="space-y-4">
          <!-- 主诉 -->
          <div>
            <div class="mb-2 text-sm text-[#374151] font-semibold">
              主诉
            </div>
            <div class="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-3">
              <div class="text-sm text-[#1F2937] leading-relaxed">
                头痛头晕伴乏力3天，加重1天。
              </div>
            </div>
          </div>

          <!-- 现病史 -->
          <div>
            <div class="mb-2 text-sm text-[#374151] font-semibold">
              现病史
            </div>
            <div class="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-3">
              <div class="text-sm text-[#1F2937] leading-relaxed">
                患者3天前无明显诱因出现头痛头晕,伴乏力,未予重视。1天前症状加重,伴恶心,无呕吐,无发热,遂来我处就诊。自述近期工作压力较大,睡眠欠佳。
              </div>
            </div>
          </div>

          <!-- 症状图片 -->
          <div>
            <div class="mb-2 text-sm text-[#374151] font-semibold">
              症状图片
            </div>
            <div class="grid grid-cols-3 gap-2">
              <div class="image-preview aspect-square overflow-hidden border border-[#E5E7EB] rounded-lg" @click="viewImage('https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815640_640.jpg')">
                <img src="https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815640_640.jpg" alt="症状图片1" class="h-full w-full object-cover">
              </div>
              <div class="image-preview aspect-square overflow-hidden border border-[#E5E7EB] rounded-lg" @click="viewImage('https://cdn.pixabay.com/photo/2019/11/19/22/51/health-4638495_640.jpg')">
                <img src="https://cdn.pixabay.com/photo/2019/11/19/22/51/health-4638495_640.jpg" alt="症状图片2" class="h-full w-full object-cover">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 四诊信息 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-lg text-[#333333] font-bold leading-7">四诊信息</span>
          </div>
          <button
            class="m-0 ml-auto appearance-none border-0 bg-transparent text-[#8E4337] outline-none transition-transform hover:text-[#6E2F25] focus:ring-0"
            aria-label="展开/折叠"
            @click="toggleSection('fourDiagnosis')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 transition-transform" :style="{ transform: expandedSections.fourDiagnosis ? 'rotate(0deg)' : 'rotate(-90deg)' }">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="collapsible-content" :class="{ expanded: expandedSections.fourDiagnosis }">
          <div class="space-y-3">
            <!-- 望诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-[#374151] font-semibold">望诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                面色略苍白,精神欠佳,舌质淡红,苔薄白。
              </div>
            </div>

            <!-- 闻诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
                <span class="text-sm text-[#374151] font-semibold">闻诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                语声低微,气短乏力,呼吸平稳。
              </div>
            </div>

            <!-- 问诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                  <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                  <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                </svg>
                <span class="text-sm text-[#374151] font-semibold">问诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                头痛以额部为主,胀痛为主,劳累后加重。伴头晕、乏力、纳差。睡眠差,入睡困难。大小便正常。
              </div>
            </div>

            <!-- 切诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                  <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" />
                </svg>
                <span class="text-sm text-[#374151] font-semibold">切诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                脉象细弱,血压 110/70 mmHg。
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 诊断结果 -->
      <section class="w-full border-2 border-[#8E4337] rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">诊断结果</span>
        </div>

        <div class="space-y-3">
          <!-- 西医诊断 -->
          <div class="rounded-xl bg-[#F5EBE9] p-4">
            <div class="mb-1 text-sm text-[#6B7280]">
              西医诊断
            </div>
            <div class="text-base text-[#8E4337] font-bold">
              紧张性头痛
            </div>
          </div>

          <!-- 中医诊断 -->
          <div class="rounded-xl bg-[#FFF7ED] p-4">
            <div class="mb-1 text-sm text-[#6B7280]">
              中医诊断
            </div>
            <div class="text-base text-[#EA580C] font-bold">
              头痛（气血亏虚证）
            </div>
          </div>

          <!-- 辨证分析 -->
          <div class="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-3">
            <div class="mb-2 text-sm text-[#374151] font-semibold">
              辨证分析
            </div>
            <div class="text-sm text-[#6B7280] leading-relaxed">
              患者长期工作压力大,思虑过度,耗伤气血,气血不足,脑失所养,故见头痛头晕、乏力;舌淡脉细为气血亏虚之象。治以益气养血,安神定志。
            </div>
          </div>
        </div>
      </section>

      <!-- 处方信息 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
              <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" />
            </svg>
            <span class="text-lg text-[#333333] font-bold leading-7">处方信息</span>
          </div>
          <span class="rounded-full bg-[#10B981] px-2.5 py-1 text-xs text-white font-bold">已开方</span>
        </div>

        <div class="space-y-3">
          <!-- 处方名称 -->
          <div class="rounded-xl from-[#F5EBE9] to-[#FCE7E3] bg-gradient-to-r p-4">
            <div class="mb-1 text-base text-[#8E4337] font-bold">
              归脾汤加减
            </div>
            <div class="text-xs text-[#6B7280]">
              益气补血,健脾养心
            </div>
          </div>

          <!-- 处方摘要 -->
          <div class="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div class="mb-1 text-xs text-[#6B7280]">
                  处方类型
                </div>
                <div class="text-[#1F2937] font-medium">
                  中药处方
                </div>
              </div>
              <div>
                <div class="mb-1 text-xs text-[#6B7280]">
                  处方剂数
                </div>
                <div class="text-[#1F2937] font-medium">
                  7剂
                </div>
              </div>
              <div>
                <div class="mb-1 text-xs text-[#6B7280]">
                  开方时间
                </div>
                <div class="text-[#1F2937] font-medium">
                  2025-10-26 14:45
                </div>
              </div>
              <div>
                <div class="mb-1 text-xs text-[#6B7280]">
                  开方医生
                </div>
                <div class="text-[#1F2937] font-medium">
                  李时珍
                </div>
              </div>
            </div>
          </div>

          <!-- 查看处方详情按钮 -->
          <button
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-[#8E4337] py-3 text-sm text-white font-medium transition-colors hover:bg-[#6E2F25]"
            aria-label="查看处方详情"
            @click="viewPrescriptionDetail()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            查看处方详情
          </button>
        </div>
      </section>

      <!-- 健康指导 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">健康指导</span>
        </div>

        <div class="space-y-2">
          <div class="flex items-start gap-2">
            <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4337]" />
            <div class="text-sm text-[#6B7280] leading-relaxed">
              注意休息,保证每天8小时睡眠,避免熬夜
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4337]" />
            <div class="text-sm text-[#6B7280] leading-relaxed">
              保持心情舒畅,避免情绪波动,学会释放压力
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4337]" />
            <div class="text-sm text-[#6B7280] leading-relaxed">
              饮食清淡,营养均衡,多食用富含铁质的食物
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4337]" />
            <div class="text-sm text-[#6B7280] leading-relaxed">
              适当运动,如散步、太极拳等,增强体质
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8E4337]" />
            <div class="text-sm text-[#6B7280] leading-relaxed">
              一周后复诊,观察疗效
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部操作栏 -->
    <footer class="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[375px] w-full border-t border-[#E5E7EB] bg-white px-4 py-3">
      <button
        class="w-full flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#8E4337] py-3 text-sm text-white font-medium transition-colors active:scale-98 hover:bg-[#6E2F25]"
        aria-label="查看完整病历"
        @click="viewMedicalRecord()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
          <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
        </svg>
        查看完整病历
      </button>
    </footer>
  </div>
</template>

<style scoped>
/* Toast 提示 */
.toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  max-width: 300px;
  text-align: center;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 折叠内容 */
.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.collapsible-content.expanded {
  max-height: 2000px;
}

/* 图片预览 */
.image-preview {
  cursor: pointer;
  transition: transform 0.2s;
}

.image-preview:hover {
  transform: scale(1.05);
}

/* 图片查看器 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.image-viewer.active {
  display: flex;
}

.image-viewer img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

/* 全局盒模型设置 */
* {
  box-sizing: border-box;
}
</style>
