<script setup lang="ts">
import { ref } from 'vue'

// 响应式状态管理
const expandedSections = ref<Record<string, boolean>>({
  medicalHistory: true,
  record003: false,
  record002: false,
  record001: false,
})

// 切换章节展开/折叠
function toggleSection(sectionId: string) {
  expandedSections.value[sectionId] = !expandedSections.value[sectionId]
}

// 切换问诊记录展开/折叠
function toggleRecord(recordId: string) {
  expandedSections.value[recordId] = !expandedSections.value[recordId]
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 刷新数据
function refreshData() {
  uni.showToast({ title: '正在刷新数据...', icon: 'none' })
  setTimeout(() => {
    uni.showToast({ title: '数据已更新 ✓', icon: 'success' })
  }, 1000)
}

// 查看处方详情
function viewPrescription(prescriptionId: string) {
  uni.showToast({ title: '正在打开处方详情...', icon: 'none' })
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages-doctor-diagnosis/yuyinwenzhen/prescription-detail'
    })
  }, 500)
}

// 拨打电话
function callPatient() {
  uni.showToast({ title: '正在拨打电话...', icon: 'none' })
  setTimeout(() => {
    uni.showToast({ title: '拨号功能开发中', icon: 'none' })
    // TODO: 实际应用中调用拨号功能
  }, 500)
}
</script>

<template>
  <view class="relative mx-auto max-w-[375px] min-h-screen w-full overflow-x-hidden pb-[60px]">
    <!-- 顶部导航 -->
    <!-- <header class="fixed left-0 right-0 top-0 z-50 mx-auto h-[56px] max-w-[375px] w-full flex items-center justify-between bg-white px-4 shadow-sm">
      <button class="text-[#333333] transition-colors hover:text-[#6B7280]" aria-label="返回上一页" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-lg text-[#1F2937] font-bold">
        患者病历
      </h1>
      <button class="text-[#8E4337] transition-colors hover:text-[#6E2F25]" aria-label="刷新数据" @click="refreshData">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
        </svg>
      </button>
    </header> -->

    <!-- 主要内容区 -->
    <main class="px-4 pt-[24px] space-y-5">
      <!-- 基本信息 -->
      <section class="w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] sm:p-5">
        <div class="mb-5 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">基本信息</span>
        </div>

        <!-- 头像和姓名区域 -->
        <div class="mb-5 flex flex-col items-center">
          <div class="mb-3 h-24 w-24 overflow-hidden rounded-full ring-4 ring-[#F5EBE9]">
            <img src="https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_640.jpg" alt="吴姗姗" class="h-full w-full object-cover">
          </div>
          <div class="mb-1 flex items-center gap-2">
            <span class="text-2xl text-[#1F2937] font-bold">吴姗姗</span>
            <span class="rounded-full bg-[#FEF2F2] px-3 py-1 text-xs text-[#EF4444] font-semibold">女</span>
          </div>
          <div class="overflow-hidden text-sm text-[#6B7280]">
            患者编号：GH973212
          </div>
        </div>

        <!-- 信息网格 -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <!-- 年龄 -->
          <div class="rounded-xl bg-[#F9FAFB] p-3 text-center">
            <div class="mb-1 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
              </svg>
              <span class="text-xs text-[#6B7280]">年龄</span>
            </div>
            <div class="text-lg text-[#1F2937] font-bold">
              32岁
            </div>
          </div>

          <!-- 初诊日期 -->
          <div class="rounded-xl bg-[#F9FAFB] p-3 text-center sm:col-span-2">
            <div class="mb-1 flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
              </svg>
              <span class="text-xs text-[#6B7280]">初诊时间</span>
            </div>
            <div class="text-base text-[#1F2937] font-bold">
              2025年01月06日
            </div>
          </div>
        </div>
      </section>

      <!-- 健康摘要 -->
      <section class="w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] sm:p-5">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h6A1.5 1.5 0 0010 8.5v-4A1.5 1.5 0 008.5 3h-6zm11 2A1.5 1.5 0 0012 6.5v7a1.5 1.5 0 001.5 1.5h4a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0017.5 5h-4zm-10 7A1.5 1.5 0 002 13.5v2A1.5 1.5 0 003.5 17h6a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 009.5 12h-6z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">健康摘要</span>
        </div>

        <div class="space-y-3">
          <!-- 诊断 -->
          <div class="rounded-xl bg-[#F5EBE9] p-3">
            <div class="mb-2 flex items-center justify-between">
              <span class="text-sm text-[#6B7280]">西医诊断</span>
              <span class="truncate text-base text-[#8E4337] font-bold">2型糖尿病</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-[#6B7280]">中医诊断</span>
              <span class="truncate text-base text-[#8E4337] font-bold">消渴病</span>
            </div>
          </div>

          <!-- 主要用药 -->
          <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
            <span class="text-sm text-[#6B7280]">当前处方</span>
            <span class="text-sm text-[#1F2937] font-medium">自拟方加减</span>
          </div>

          <!-- 下次随访 -->
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-[#6B7280]">下次随访</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-[#8E4337] font-semibold">2025-06-30</span>
              <span class="rounded bg-[#F5EBE9] px-2 py-0.5 text-xs text-[#8E4337]">图文问诊</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 病史与体质 -->
      <section class="w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] sm:p-5">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
              <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
            </svg>
            <span class="text-lg text-[#333333] font-bold leading-7">病史与体质</span>
          </div>
          <button
            class="m-0 ml-auto appearance-none border-0 bg-transparent text-[#8E4337] outline-none transition-colors hover:text-[#6E2F25] focus:ring-0"
            aria-label="展开/折叠"
            @click="toggleSection('medicalHistory')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              class="h-5 w-5 transition-transform"
              :style="{ transform: expandedSections.medicalHistory ? 'rotate(0deg)' : 'rotate(-90deg)' }"
            >
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <div class="max-h-0 overflow-hidden transition-all duration-300 ease" :style="{ maxHeight: expandedSections.medicalHistory ? '2000px' : '0px' }">
          <div class="space-y-3">
            <!-- 主诉 -->
            <div>
              <div class="mb-1 text-sm text-[#374151] font-semibold">
                主诉
              </div>
              <div class="overflow-hidden text-sm text-[#6B7280] leading-relaxed">
                发现血糖升高1年，伴口干、乏力半年。
              </div>
            </div>

            <!-- 现病史 -->
            <div>
              <div class="mb-1 text-sm text-[#374151] font-semibold">
                现病史
              </div>
              <div class="overflow-hidden text-sm text-[#6B7280] leading-relaxed">
                患者1年前体检发现空腹血糖升高至8.2mol/L，未予重视。半年前出现口干、多饮、乏力症状，就诊于当地医院，诊断为"2型糖尿病"，予二甲双胍治疗，效果欠佳。近期症状加重，遂来我处就诊。
              </div>
            </div>

            <!-- 既往史/过敏史 -->
            <div>
              <div class="mb-1 text-sm text-[#374151] font-semibold">
                既往史/过敏史
              </div>
              <div class="overflow-hidden text-sm text-[#6B7280] leading-relaxed">
                既往体健，否认高血压、冠心病病史。否认食物、药物过敏史。
              </div>
            </div>

            <!-- 中医体质辨识 -->
            <div class="border border-[#FED7AA] rounded-lg bg-[#FFF7ED] p-3">
              <div class="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#EA580C" class="h-4 w-4">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-[#EA580C] font-semibold">中医体质辨识</span>
              </div>
              <div class="flex gap-2">
                <span class="border border-[#FED7AA] rounded-full bg-white px-3 py-1 text-xs text-[#EA580C] font-medium">气虚质</span>
                <span class="border border-[#FED7AA] rounded-full bg-white px-3 py-1 text-xs text-[#EA580C] font-medium">阴虚质</span>
              </div>
            </div>

            <!-- 生活习惯 -->
            <div>
              <div class="mb-1 text-sm text-[#374151] font-semibold">
                生活习惯
              </div>
              <div class="overflow-hidden text-sm text-[#6B7280] leading-relaxed">
                饮食：喜甜食、油腻食物<br>
                作息：经常熬夜，睡眠不足<br>
                运动：缺乏运动，久坐办公<br>
                情绪：工作压力较大，易焦虑
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 历次问诊记录 -->
      <section class="w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] sm:p-5">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">历次问诊记录</span>
          <span class="ml-auto rounded-full bg-[#F5EBE9] px-2.5 py-0.5 text-xs text-[#8E4337] font-semibold">3 次</span>
        </div>

        <!-- 时间线 -->
        <div class="space-y-4">
          <!-- 问诊记录 003 -->
          <div class="relative pl-6 before:absolute before:bottom-[-20px] before:left-7 before:top-[40px] before:w-0.5 before:bg-[#E5E7EB] before:content-['']">
            <div class="absolute left-0 top-1 h-4 w-4 border-2 border-white rounded-full bg-[#8E4337] shadow-sm" />

            <div class="cursor-pointer overflow-hidden rounded-xl bg-[#F9FAFB] p-3 transition-colors hover:bg-[#F3F4F6] sm:p-4" @click="toggleRecord('record003')">
              <div class="mb-2 flex items-center justify-between">
                <span class="truncate text-base text-[#1F2937] font-bold">问诊记录 003</span>
                <div class="flex items-center gap-2">
                  <span class="whitespace-nowrap rounded-full bg-[#D1FAE5] px-2 py-0.5 text-xs text-[#10B981] font-semibold">图文问诊</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6B7280"
                    class="h-4 w-4 transition-transform"
                    :style="{ transform: expandedSections.record003 ? 'rotate(180deg)' : 'rotate(0deg)' }"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="text-xs text-[#6B7280]">
                2025-06-10 10:30
              </div>
            </div>

            <div class="max-h-0 overflow-hidden transition-all duration-300 ease" :style="{ maxHeight: expandedSections.record003 ? '2000px' : '0px' }">
              <div class="mt-3 overflow-hidden border border-[#E5E7EB] rounded-xl bg-white p-3 space-y-3 sm:p-4">
                <!-- 四诊信息 -->
                <div>
                  <div class="mb-2 flex items-center gap-2 text-sm text-[#374151] font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-4 w-4">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                    四诊信息
                  </div>
                  <div class="text-sm space-y-2">
                    <div class="overflow-hidden">
                      <span class="text-[#6B7280]">问诊：</span><span class="text-[#1F2937]">服药前餐前血糖12.6mmol/L，现降至4.5mmol/L。口干明显减轻，体力较前好转，夜尿1次。睡眠可，大便调。</span>
                    </div>
                    <div><span class="text-[#6B7280]">望诊：</span><span class="text-[#1F2937]">舌质红，苔薄白。</span></div>
                    <div><span class="text-[#6B7280]">切诊：</span><span class="text-[#1F2937]">脉象未及（线上问诊），语音清晰。</span></div>
                  </div>
                </div>

                <!-- 辨证分析 -->
                <div class="rounded-lg bg-[#FFF7ED] p-3">
                  <div class="mb-1 text-sm text-[#EA580C] font-semibold">
                    辨证分析
                  </div>
                  <div class="text-sm text-[#6B7280] leading-relaxed">
                    药后血糖显著下降，气阴得补，内热得清，故见诸症改善。舌象提示热象渐退。
                  </div>
                </div>

                <!-- 方药 -->
                <div>
                  <div class="mb-2 text-sm text-[#374151] font-semibold">
                    方药
                  </div>
                  <div class="rounded-lg bg-[#F5EBE9] p-3">
                    <div class="mb-2 text-sm text-[#8E4337] font-semibold">
                      自拟方加减
                    </div>
                    <div class="text-xs text-[#6B7280] leading-relaxed">
                      生地黄15g、山药15g、黄芪20g、天花粉12g、葛根15g、麦冬12g、五味子6g、丹参15g、川芎10g、山茱萸10g
                    </div>
                    <div class="mt-2 flex items-center gap-2">
                      <button
                        class="flex items-center gap-1 rounded bg-white px-3 py-1.5 text-xs text-[#8E4337] font-medium transition-colors hover:bg-[#F9FAFB]"
                        aria-label="查看处方详情"
                        @click="viewPrescription('003')"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5">
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        查看处方详情
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 健康指导 -->
                <div>
                  <div class="mb-1 text-sm text-[#374151] font-semibold">
                    健康指导
                  </div>
                  <div class="text-sm text-[#6B7280] leading-relaxed">
                    建议继续当前治疗，饮食宜清淡，忌甜食，适当运动。
                  </div>
                </div>

                <!-- 随访计划 -->
                <div class="flex items-center gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#10B981" class="h-4 w-4">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-[#6B7280]">随访计划：</span>
                  <span class="text-[#10B981] font-medium">2025-06-30 复诊</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 问诊记录 002 -->
          <div class="relative pl-6 before:absolute before:bottom-[-20px] before:left-7 before:top-[40px] before:w-0.5 before:bg-[#E5E7EB] before:content-['']">
            <div class="absolute left-0 top-1 h-4 w-4 border-2 border-white rounded-full bg-[#D1D5DB] shadow-sm" />

            <div class="cursor-pointer overflow-hidden rounded-xl bg-[#F9FAFB] p-3 transition-colors hover:bg-[#F3F4F6] sm:p-4" @click="toggleRecord('record002')">
              <div class="mb-2 flex items-center justify-between">
                <span class="truncate text-base text-[#1F2937] font-bold">问诊记录 002</span>
                <div class="flex items-center gap-2">
                  <span class="whitespace-nowrap rounded-full bg-[#E0E7FF] px-2 py-0.5 text-xs text-[#6366F1] font-semibold">视频问诊</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6B7280"
                    class="h-4 w-4 transition-transform"
                    :style="{ transform: expandedSections.record002 ? 'rotate(180deg)' : 'rotate(0deg)' }"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="text-xs text-[#6B7280]">
                2025-03-15 14:20
              </div>
            </div>

            <div class="max-h-0 overflow-hidden transition-all duration-300 ease" :style="{ maxHeight: expandedSections.record002 ? '2000px' : '0px' }">
              <div class="mt-3 overflow-hidden border border-[#E5E7EB] rounded-xl bg-white p-3 space-y-3 sm:p-4">
                <div class="overflow-hidden text-sm text-[#6B7280]">
                  症状有所好转，血糖控制平稳，继续观察治疗效果。调整方剂用量。
                </div>
              </div>
            </div>
          </div>

          <!-- 问诊记录 001 -->
          <div class="relative pl-6">
            <div class="absolute left-0 top-1 h-4 w-4 border-2 border-white rounded-full bg-[#D1D5DB] shadow-sm" />

            <div class="cursor-pointer overflow-hidden rounded-xl bg-[#F9FAFB] p-3 transition-colors hover:bg-[#F3F4F6] sm:p-4" @click="toggleRecord('record001')">
              <div class="mb-2 flex items-center justify-between">
                <span class="truncate text-base text-[#1F2937] font-bold">问诊记录 001</span>
                <div class="flex items-center gap-2">
                  <span class="rounded-full bg-[#D1FAE5] px-2.5 py-0.5 text-xs text-[#10B981] font-semibold">图文问诊</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6B7280"
                    class="h-4 w-4 transition-transform"
                    :style="{ transform: expandedSections.record001 ? 'rotate(180deg)' : 'rotate(0deg)' }"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="text-xs text-[#6B7280]">
                2025-01-06 09:15
              </div>
            </div>

            <div class="max-h-0 overflow-hidden transition-all duration-300 ease" :style="{ maxHeight: expandedSections.record001 ? '2000px' : '0px' }">
              <div class="mt-3 overflow-hidden border border-[#E5E7EB] rounded-xl bg-white p-3 space-y-3 sm:p-4">
                <div class="text-sm text-[#6B7280]">
                  初诊，确诊为消渴病（2型糖尿病），辨证为气阴两虚兼有瘀血。予以益气养阴、清热生津之法治疗。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 处方记录 -->
      <section class="w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] sm:p-5">
        <div class="mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="h-[18px] w-[18px]">
            <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" />
          </svg>
          <span class="text-lg text-[#333333] font-bold leading-7">处方记录</span>
        </div>

        <div class="space-y-3">
          <!-- 当前处方 -->
          <div class="overflow-hidden border-2 border-[#8E4337] rounded-xl bg-[#F5EBE9] p-3 sm:p-4">
            <div class="mb-2 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-base text-[#1F2937] font-bold">当前处方</span>
                <span class="whitespace-nowrap rounded-full bg-[#10B981] px-1.5 py-0.5 text-xs text-white font-semibold">使用中</span>
              </div>
              <span class="text-xs text-[#6B7280]">2025-06-10</span>
            </div>
            <div class="mb-2 truncate text-sm text-[#8E4337] font-medium">
              自拟方加减
            </div>
            <div class="mb-3 truncate text-xs text-[#6B7280]">
              益气养阴、清热生津
            </div>
            <button
              class="w-full flex items-center justify-center gap-2 rounded-lg bg-[#8E4337] py-2.5 text-sm text-white font-medium transition-colors hover:bg-[#6E2F25]"
              aria-label="查看处方详情"
              @click="viewPrescription('current')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              查看处方详情
            </button>
          </div>

          <!-- 历史处方 -->
          <div class="space-y-2">
            <div class="text-sm text-[#6B7280] font-medium">
              历史处方
            </div>

            <div class="cursor-pointer rounded-lg bg-[#F9FAFB] p-3 transition-colors hover:bg-[#F3F4F6]" @click="viewPrescription('002')">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="mb-1 truncate text-sm text-[#1F2937] font-medium">
                    自拟方（调整版）
                  </div>
                  <div class="text-xs text-[#6B7280]">
                    2025-03-15
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#9CA3AF" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <div class="cursor-pointer rounded-lg bg-[#F9FAFB] p-3 transition-colors hover:bg-[#F3F4F6]" @click="viewPrescription('001')">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="mb-1 truncate text-sm text-[#1F2937] font-medium">
                    自拟方（初诊）
                  </div>
                  <div class="text-xs text-[#6B7280]">
                    2025-01-06
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#9CA3AF" class="h-5 w-5">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </view>
</template>

<style scoped>
/* 全局样式重置和修复 */
* {
  box-sizing: border-box;
}

/* 时间线样式 */
.timeline-item::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 40px;
  bottom: -20px;
  width: 2px;
  background: #e5e7eb;
}

.timeline-item:last-child::before {
  display: none;
}

/* 防止卡片内容溢出 */
.overflow-hidden {
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
