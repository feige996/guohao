<script setup lang="ts">
// 导入问诊记录类型和组件
import type { ConsultationRecord } from './components/wenzhen.vue'
import { onMounted, reactive, ref } from 'vue'
// import { showToast } from '@/utils'

import Wenzhen from './components/wenzhen.vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '问诊记录',
    navigationBarBackgroundColor: '#fff'
  }
})

// 模态框配置
interface ModalConfig {
  show: boolean
  title: string
  message: string
  icon: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
}

// 状态管理
const currentTab = ref('all')
const filteredRecords = ref<ConsultationRecord[]>([])

// 模态框状态
const modalConfig = reactive<ModalConfig>({
  show: false,
  title: '结束问诊',
  message: '',
  icon: 'warning',
  confirmText: '确认结束',
  cancelText: '取消',
  onConfirm: () => {},
})

// 模拟数据 - 实际项目中应从API获取
const consultationRecords: ConsultationRecord[] = [
  {
    id: '1',
    patientName: '王女士',
    age: '28岁',
    avatar: 'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg',
    type: 'text',
    typeText: '图文问诊',
    timestamp: '10-26 14:30',
    status: 'completed',
    statusText: '已完成',
    statusClass: 'bg-[#D1FAE5] text-[#10B981]',
    prescribed: true,
    symptoms: '头痛、失眠、疲劳',
  },
  {
    id: '2',
    patientName: '李先生',
    age: '35岁',
    avatar: 'https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg',
    type: 'video',
    typeText: '视频问诊',
    timestamp: '10-24 09:00',
    status: 'ongoing',
    statusText: '进行中',
    statusClass: 'bg-[#FFF7ED] text-[#EA580C]',
    prescribed: false,
  },
  {
    id: '3',
    patientName: '张先生',
    age: '45岁',
    avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png',
    type: 'voice',
    typeText: '语音问诊',
    timestamp: '10-20 16:45',
    status: 'completed',
    statusText: '已完成',
    statusClass: 'bg-[#D1FAE5] text-[#10B981]',
    prescribed: false,
  },
]

// 生命周期
onMounted(() => {
  filteredRecords.value = [...consultationRecords]
})

// 切换标签页
function switchTab(tab: string) {
  currentTab.value = tab
  filterRecords()
}

// 根据标签页过滤记录
function filterRecords() {
  let result = consultationRecords

  // 只根据标签页过滤
  if (currentTab.value === 'ongoing') {
    result = result.filter(record => record.status === 'ongoing')
  }
  else if (currentTab.value === 'completed') {
    result = result.filter(record => record.status === 'completed')
  }
  else if (currentTab.value === 'unprescribed') {
    result = result.filter(record => !record.prescribed)
  }

  filteredRecords.value = result
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 查看问诊详情
function viewConsultationDetail(id: string) {
  uni.navigateTo({
    url: `/pages-doctor-diagnosis/yuyinwenzhen/consultation-detail?id=${id}`
  })
}

// 打开IM聊天
function openIMChat(data: { name: string, age: string, gender: string, avatar: string, symptoms?: string }) {
  // 实际项目中应跳转到聊天页面
  uni.showToast({ title: '打开聊天窗口', icon: 'none' })
}

// 打开确认弹窗
function openConfirmModal(message: string, onConfirm: () => void) {
  modalConfig.show = true
  modalConfig.message = message
  modalConfig.onConfirm = onConfirm
}

// 关闭弹窗
function closeModal() {
  modalConfig.show = false
}

// 确认操作
function confirmAction() {
  modalConfig.onConfirm()
  closeModal()
}

// 结束问诊
function endConsultation(id: string) {
  // 存储当前问诊ID，供目标页面使用
  uni.setStorageSync('currentConsultationId', id)
  // 跳转到结束问诊页面，而不是显示简单的确认弹窗
  // 这样可以显示包含主诉、四诊信息、诊断结果等的完整表单
  uni.navigateTo({
    url: '/pages-doctor-diagnosis/yuyinwenzhen/end-consultation'
  })
}

// 生成处方
function createPrescription(id: string) {
  uni.navigateTo({
    url: `/pages-doctor-diagnosis/yuyinwenzhen/prescription-create?id=${id}`
  })
}
</script>

<template>
  <div class="relative mx-auto max-w-[375px] min-h-screen w-full">
    <!-- 标签页导航 -->
    <div class="sticky top-0 z-40 border-b border-[#F0F0F0] bg-white px-4 py-3">
      <div class="flex space-x-2">
        <button
          class="w-1/4 rounded-lg py-2 text-center text-sm font-medium transition-all duration-300"
          :class="currentTab === 'all'
            ? 'text-white bg-[#8E4337]'
            : 'text-[#6B7280] bg-[#F9FAFB]'"
          aria-label="全部"
          @click="switchTab('all')"
        >
          全部
        </button>

        <button
          class="w-1/4 rounded-lg py-2 text-center text-sm font-medium transition-all duration-300"
          :class="currentTab === 'ongoing'
            ? 'text-white bg-[#8E4337]'
            : 'text-[#6B7280] bg-[#F9FAFB]'"
          aria-label="进行中"
          @click="switchTab('ongoing')"
        >
          进行中
        </button>

        <button
          class="w-1/4 rounded-lg py-2 text-center text-sm font-medium transition-all duration-300"
          :class="currentTab === 'completed'
            ? 'text-white bg-[#8E4337]'
            : 'text-[#6B7280] bg-[#F9FAFB]'"
          aria-label="已完成"
          @click="switchTab('completed')"
        >
          已完成
        </button>

        <button
          class="w-1/4 rounded-lg py-2 text-center text-sm font-medium transition-all duration-300"
          :class="currentTab === 'unprescribed'
            ? 'text-white bg-[#8E4337]'
            : 'text-[#6B7280] bg-[#F9FAFB]'"
          aria-label="未开方"
          @click="switchTab('unprescribed')"
        >
          未开方
        </button>
      </div>
    </div>

    <!-- 问诊记录列表 -->
    <main class="px-4 pt-4 space-y-4">
      <template v-if="filteredRecords.length > 0">
        <wenzhen
          v-for="record in filteredRecords"
          :key="record.id"
          :record="record"
          @view-detail="viewConsultationDetail"
          @end-consultation="endConsultation"
          @create-prescription="createPrescription"
          @open-chat="openIMChat"
        />
      </template>
      <div v-else class="py-12 text-center">
        <div class="mx-auto mb-4 h-20 w-20 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E4337" class="h-full w-full">
            <path d="M19.995 3H4.005C2.897 3 2 3.898 2 5.007v13.985C2 20.102 2.897 21 4.005 21h15.99C21.102 21 22 20.102 22 18.992V5.007C22 3.898 21.102 3 19.995 3zM20 18.992c0 .548-.445.996-.996.996H4.005c-.551 0-.996-.448-.996-.996V5.007c0-.549.445-.996.996-.996h15.99c.551 0 .996.447.996.996v13.985zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
          </svg>
        </div>
        <p class="text-sm text-[#6B7280]">
          暂无问诊记录
        </p>
      </div>
    </main>

    <!-- 确认弹窗 -->
    <div
      class="fixed inset-0 z-999 bg-black/50 transition-opacity duration-300"
      :class="{ 'opacity-100 pointer-events-auto': modalConfig.show, 'opacity-0 pointer-events-none': !modalConfig.show }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        class="fixed left-1/2 top-1/2 z-1000 max-w-[320px] w-[calc(100%-48px)] transform rounded-[16px] bg-white p-6 transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
        :class="{ 'scale-100 opacity-100': modalConfig.show, 'scale-90 opacity-0': !modalConfig.show }"
      >
        <div class="mb-6">
          <div class="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-[#F5EBE9]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E4337" class="h-6 w-6">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
          </div>
          <h3 id="modalTitle" class="mb-2 text-center text-lg text-[#1F2937] font-bold">
            {{ modalConfig.title }}
          </h3>
          <p class="text-center text-sm text-[#6B7280] leading-relaxed">
            {{ modalConfig.message }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="cursor-pointer border-2 border-[#E5E7EB] rounded-lg py-3 text-sm text-[#6B7280] font-medium transition-colors active:scale-98 hover:bg-[#F9FAFB]"
            aria-label="取消"
            @click="closeModal"
          >
            {{ modalConfig.cancelText }}
          </button>
          <button
            class="cursor-pointer rounded-lg bg-[#8E4337] py-3 text-sm text-white font-medium transition-colors active:scale-98 hover:bg-[#6E2F25]"
            aria-label="确认"
            @click="confirmAction"
          >
            {{ modalConfig.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 滚动条隐藏 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* 动画效果 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 全局盒模型设置 */
* {
  box-sizing: border-box;
}
</style>
