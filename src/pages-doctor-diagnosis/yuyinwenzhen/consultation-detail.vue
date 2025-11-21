<script setup lang="ts">
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '问诊详情',
    navigationBarBackgroundColor: '#fff',
  },
})
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
      url: '/pages-doctor-diagnosis/yuyinwenzhen/medical-record',
    })
  }, 500)
}

// 查看处方详情
function viewPrescriptionDetail(): void {
  showToast('正在打开处方详情...')
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages-doctor-diagnosis/yuyinwenzhen/prescription-detail',
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
            class="flex items-center gap-1 bg-[#F5EBE9] px-3 py-1.5 text-xs text-[#8E4337] font-medium transition-colors hover:bg-[#E5D5D0]"
            aria-label="查看病历"
            @click="viewMedicalRecord()"
          >
            <wd-icon name="note" size="16px" />
            病历
          </button>
        </div>
      </section>

      <!-- 问诊信息 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <wd-icon name="time-filled" size="16px" color="#8E4337" />
          <span class="text-lg text-[#333333] font-bold leading-7">问诊信息</span>
        </div>

        <div class="space-y-3">
          <!-- 问诊类型 -->
          <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
            <span class="text-sm text-[#6B7280]">问诊类型</span>
            <div class="flex items-center gap-2">
              <wd-icon name="books" size="16px" color="#8E4337" />
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
          <wd-icon name="file-paste" size="16px" color="#8E4337" />
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
            <wd-icon name="view" size="16px" color="#8E4337" />
            <span class="text-lg text-[#333333] font-bold leading-7">四诊信息</span>
          </div>
          <button
            class="m-0 ml-auto appearance-none border-0 bg-transparent text-[#8E4337] outline-none transition-transform hover:text-[#6E2F25] focus:ring-0"
            aria-label="展开/折叠"
            @click="toggleSection('fourDiagnosis')"
          >
            <wd-icon name="arrow-down" size="16px" color="#8E4337" />
          </button>
        </div>

        <div class="collapsible-content" :class="{ expanded: expandedSections.fourDiagnosis }">
          <div class="space-y-3">
            <!-- 望诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <wd-icon name="view" size="16px" color="#8E4337" />
                <span class="text-sm text-[#374151] font-semibold">望诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                面色略苍白,精神欠佳,舌质淡红,苔薄白。
              </div>
            </div>

            <!-- 闻诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <wd-icon name="user-talk" size="16px" color="#8E4337" />
                <span class="text-sm text-[#374151] font-semibold">闻诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                语声低微,气短乏力,呼吸平稳。
              </div>
            </div>

            <!-- 问诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <wd-icon name="chat1" size="16px" color="#8E4337" />
                <span class="text-sm text-[#374151] font-semibold">问诊</span>
              </div>
              <div class="text-sm text-[#6B7280] leading-relaxed">
                头痛以额部为主,胀痛为主,劳累后加重。伴头晕、乏力、纳差。睡眠差,入睡困难。大小便正常。
              </div>
            </div>

            <!-- 切诊 -->
            <div class="rounded-xl bg-[#F9FAFB] p-3">
              <div class="mb-2 flex items-center gap-2">
                <wd-icon name="tips" size="16px" color="#8E4337" />
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
          <wd-icon name="check-outline" size="22px" color="#8E4337" />
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
            <wd-icon name="list" size="20px" color="#8E4337" />
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
            <wd-icon name="view" size="16px" />
            查看处方详情
          </button>
        </div>
      </section>

      <!-- 健康指导 -->
      <section class="w-full rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <wd-icon name="help-circle-filled" size="20px" color="#8E4337" />
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
        <wd-icon name="note" size="20px" />
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
