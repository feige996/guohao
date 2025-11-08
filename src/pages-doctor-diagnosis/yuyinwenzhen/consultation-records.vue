<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { showToast } from '@/utils'

// 问诊记录类型定义
interface ConsultationRecord {
  id: string
  patientName: string
  age: string
  avatar: string
  type: 'text' | 'video' | 'voice'
  typeText: string
  timestamp: string
  status: 'ongoing' | 'completed' | 'pending'
  statusText: string
  statusClass: string
  prescribed: boolean
  symptoms?: string
}

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
const router = useRouter()
const currentTab = ref('all')
const searchVisible = ref(false)
const searchKeyword = ref('')
const showClearBtn = ref(false)
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

// 过滤记录
function filterRecords() {
  let result = consultationRecords

  // 根据标签过滤
  if (currentTab.value === 'ongoing') {
    result = result.filter(record => record.status === 'ongoing')
  }
  else if (currentTab.value === 'completed') {
    result = result.filter(record => record.status === 'completed')
  }
  else if (currentTab.value === 'unprescribed') {
    result = result.filter(record => !record.prescribed)
  }

  // 根据搜索关键词过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(record =>
      record.patientName.toLowerCase().includes(keyword),
    )
  }

  filteredRecords.value = result
}

// 处理搜索
function handleSearch() {
  showClearBtn.value = searchKeyword.value.length > 0
  filterRecords()
}

// 清除搜索
function clearSearch() {
  searchKeyword.value = ''
  showClearBtn.value = false
  filterRecords()
}

// 切换搜索栏显示
function toggleSearchBar() {
  searchVisible.value = !searchVisible.value
  if (!searchVisible.value) {
    clearSearch()
  }
}

// 隐藏搜索栏
function hideSearchBar() {
  searchVisible.value = false
  clearSearch()
}

// 返回上一页
function goBack() {
  router.back()
}

// 查看问诊详情
function viewConsultationDetail(id: string) {
  router.push(`/consultation-detail?id=${id}`)
}

// 打开IM聊天
function openIMChat(name: string, age: string, gender: string, avatar: string, symptoms?: string) {
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
  openConfirmModal('确定要结束当前问诊吗？结束后将无法继续与患者沟通。', () => {
    // 实际项目中应调用API
    uni.showToast({ title: '问诊已结束', icon: 'none' })
    // 更新记录状态
    const record = consultationRecords.find(r => r.id === id)
    if (record) {
      record.status = 'completed'
      record.statusText = '已完成'
      record.statusClass = 'bg-[#D1FAE5] text-[#10B981]'
      filterRecords()
    }
  })
}

// 生成处方
function createPrescription(id: string) {
  router.push(`/prescription-create?id=${id}`)
}
</script>

<template>
  <div class="relative mx-auto max-w-[375px] min-h-screen w-full bg-[#F9FAFB] pb-5">
    <!-- 顶部导航 -->
    <header class="fixed left-0 right-0 top-0 z-50 mx-auto h-[56px] max-w-[375px] w-full flex items-center justify-between bg-white px-4 shadow-sm">
      <button
        class="text-[#333333] transition-colors hover:text-[#6B7280]"
        aria-label="返回上一页"
        @click="goBack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-lg text-[#333333] font-bold leading-7">
        问诊记录
      </h1>
      <button
        class="text-[#8E4337] transition-colors hover:text-[#6E2F25]"
        aria-label="搜索问诊记录"
        @click="toggleSearchBar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- 搜索栏 -->
      <div
        class="absolute inset-0 flex items-center gap-3 bg-white px-4 transition-opacity duration-300"
        :class="{ 'opacity-100 pointer-events-auto': searchVisible, 'opacity-0 pointer-events-none': !searchVisible }"
      >
        <button
          class="text-[#6B7280] transition-colors hover:text-[#333333]"
          aria-label="取消搜索"
          @click="hideSearchBar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
            <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="relative flex-1">
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索患者姓名..."
            class="w-full border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] py-2 pl-10 pr-10 text-sm text-[#1F2937] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8E4337] placeholder-[#9CA3AF]"
            @input="handleSearch"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#9CA3AF" class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          <button
            v-if="showClearBtn"
            class="absolute right-3 top-1/2 text-[#9CA3AF] transition-colors -translate-y-1/2 hover:text-[#6B7280]"
            aria-label="清除搜索"
            @click="clearSearch"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 标签页导航 -->
    <div class="sticky top-[56px] z-40 mt-[56px] bg-white px-4 py-3 shadow-sm">
      <div class="scrollbar-hide flex gap-2 overflow-x-auto">
        <button
          class="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="{ 'text-[#8E4337] bg-[#F5EBE9] font-semibold': currentTab === 'all', 'text-[#6B7280] hover:bg-[#F9FAFB]': currentTab !== 'all' }"
          aria-label="全部"
          @click="switchTab('all')"
        >
          全部
        </button>
        <button
          class="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="{ 'text-[#8E4337] bg-[#F5EBE9] font-semibold': currentTab === 'ongoing', 'text-[#6B7280] hover:bg-[#F9FAFB]': currentTab !== 'ongoing' }"
          aria-label="进行中"
          @click="switchTab('ongoing')"
        >
          进行中
        </button>
        <button
          class="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="{ 'text-[#8E4337] bg-[#F5EBE9] font-semibold': currentTab === 'completed', 'text-[#6B7280] hover:bg-[#F9FAFB]': currentTab !== 'completed' }"
          aria-label="已完成"
          @click="switchTab('completed')"
        >
          已完成
        </button>
        <button
          class="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="{ 'text-[#8E4337] bg-[#F5EBE9] font-semibold': currentTab === 'unprescribed', 'text-[#6B7280] hover:bg-[#F9FAFB]': currentTab !== 'unprescribed' }"
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
        <article
          v-for="record in filteredRecords"
          :key="record.id"
          class="w-full border rounded-[20px] bg-white p-4 box-border shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-[#8E4337]/20 hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
          :class="{ 'border-2 border-[#FEE2E2]': record.status === 'ongoing', 'border-[#F3F4F6]': record.status !== 'ongoing' }"
        >
          <!-- 患者信息 -->
          <div class="mb-4 flex items-center gap-3">
            <div class="relative">
              <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#F5EBE9]">
                <img :src="record.avatar" :alt="record.patientName" class="h-full w-full object-cover">
              </div>
              <!-- 问诊类型图标 -->
              <div class="absolute h-6 w-6 flex items-center justify-center border-2 border-white rounded-full from-[#8E4337] to-[#6E2F25] bg-gradient-to-br shadow-md -bottom-1 -right-1">
                <svg v-if="record.type === 'text'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="h-3 w-3">
                  <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
                </svg>
                <svg v-else-if="record.type === 'video'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="h-3 w-3">
                  <path d="M5 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-7Z" />
                  <path d="M11.5 6.823v2.354c.274-.176.5-.46.5-.823v-.708a1 1 0 0 0-.5-.823Z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="h-3 w-3">
                  <path d="M1 2.5A2.5 2.5 0 0 1 3.5 0H10a2.5 2.5 0 0 1 2.5 2.5V13a2.5 2.5 0 0 1-2.5 2.5H3.5A2.5 2.5 0 0 1 1 13V2.5ZM3.5 1A1.5 1.5 0 0 0 2 2.5v10A1.5 1.5 0 0 0 3.5 14h6.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 10 1H3.5Zm5.364 6.15a.5.5 0 0 1 .5.5v.793l2.364 1.382a.5.5 0 0 1 0 .848l-2.364 1.382V12a.5.5 0 0 1-1 0V9.828l-2.364 1.382a.5.5 0 0 1-.5-.848l2.364-1.382V6.65a.5.5 0 0 1 .5-.5z" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1">
                  <h3 class="mb-1 text-base text-[#1F2937] font-bold truncate">
                    {{ record.patientName }} · {{ record.age }}
                  </h3>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-[#6B7280]">{{ record.typeText }}</span>
                    <span class="h-1 w-1 rounded-full bg-[#D1D5DB]" />
                    <span class="text-xs text-[#9CA3AF]">{{ record.timestamp }}</span>
                  </div>
                </div>
                <span :class="`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${record.statusClass}`">
                  <template v-if="record.status === 'ongoing'">
                    <span class="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#EA580C]" />
                  </template>
                  {{ record.statusText }}
                </span>
              </div>
            </div>
          </div>

          <!-- 开方状态卡片 -->
          <div class="mb-4 border border-[#F3F4F6] rounded-xl bg-[#F9FAFB] p-3 box-border">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-8 w-8" :class="record.prescribed ? 'bg-[#10B981]' : 'bg-[#6B7280]'">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="ml-2 mt-2 h-4 w-4">
                    <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-[#6B7280] font-medium">
                    开方状态
                  </div>
                  <div :class="record.prescribed ? 'text-[#10B981]' : 'text-[#6B7280]'" class="text-sm font-bold">
                    {{ record.prescribed ? '已开方' : '未开方' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="grid grid-cols-2 gap-2">
            <button
              class="flex items-center justify-center gap-1 border-2 border-[#8E4337] rounded-xl py-2.5 text-sm text-[#8E4337] font-semibold transition-all active:scale-95 hover:bg-[#F5EBE9] truncate"
              aria-label="查看详情"
              @click="viewConsultationDetail(record.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
              </svg>
              查看详情
            </button>
            <template v-if="record.status === 'ongoing'">
              <button
                class="flex items-center justify-center gap-1 rounded-xl bg-[#8E4337] py-2.5 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:bg-[#6E2F25] truncate"
                aria-label="结束问诊"
                @click="endConsultation(record.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                  <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06L9.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06L8 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 10 2.22 5.28a.75.75 0 0 1 1.06-1.06L8 8.94l4.72-4.72a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
                结束问诊
              </button>
            </template>
            <template v-else-if="!record.prescribed">
              <button
                class="flex items-center justify-center gap-1 rounded-xl from-[#8E4337] to-[#6E2F25] bg-gradient-to-r py-2.5 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:from-[#6E2F25] hover:to-[#5A2520] truncate"
                aria-label="生成处方"
                @click="createPrescription(record.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                  <path fill-rule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 2ZM3.75 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75ZM2 12.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
                生成处方
              </button>
            </template>
            <template v-else>
              <button
                class="flex items-center justify-center gap-2 rounded-xl from-[#8E4337] to-[#6E2F25] bg-gradient-to-r py-3 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:from-[#6E2F25] hover:to-[#5A2520]"
                aria-label="查看问诊记录"
                @click="openIMChat(record.patientName, record.age, '女', record.avatar, record.symptoms)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
                  <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
                </svg>
                问诊记录
              </button>
            </template>
          </div>
        </article>
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
