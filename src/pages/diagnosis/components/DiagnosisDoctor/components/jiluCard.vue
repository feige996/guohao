<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface ConsultationSession {
  id: string
  patientName: string
  age: number
  avatar: string
  chiefComplaint: string
  consultationType: '图文问诊' | '语音问诊'
  consultationTime: string
  status: '进行中' | '已结束'
}

// 模拟会话数据
const sessions = ref<ConsultationSession[]>([])

// 当前激活的Tab
const activeTab = ref<'ongoing' | 'all'>('ongoing')

// 路由实例
const router = useRouter()

// 初始化模拟数据
sessions.value = [
  {
    id: '1',
    patientName: '李先生',
    age: 35,
    avatar: '',
    chiefComplaint: '头痛、咳嗽、咽痛3天',
    consultationType: '图文问诊',
    consultationTime: '今天 09:30',
    status: '进行中',
  },
  {
    id: '2',
    patientName: '王女士',
    age: 28,
    avatar: '',
    chiefComplaint: '失眠多梦，心悸',
    consultationType: '语音问诊',
    consultationTime: '今天 10:15',
    status: '进行中',
  },
  {
    id: '3',
    patientName: '张先生',
    age: 42,
    avatar: '',
    chiefComplaint: '腰痛，下肢麻木',
    consultationType: '图文问诊',
    consultationTime: '昨天 16:45',
    status: '已结束',
  },
]

// 切换Tab
function handleSwitchTab(tab: 'ongoing' | 'all') {
  activeTab.value = tab
  if (tab === 'all') {
    try {
      // 跳转到全部问诊记录页面
      router.push('/pages-doctor-diagnosis/yuyinwenzhen/consultation-records')
    }
    catch (error) {
      console.error('路由跳转失败:', error)
      showToast('无法跳转到问诊记录页面')
    }
  }
}

function showToast(message: string) {
  // 实际项目中应该使用全局的Toast组件或工具
  console.log(message)
}

function enterConsultation(sessionId: string) {
  showToast('正在进入问诊会话...')
  // 这里可以添加跳转到问诊详情页面的逻辑
  console.log(`进入会话ID: ${sessionId}`)
}
</script>

<template>
  <div class="w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
    <div class="mb-5 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 text-[#8E4337]">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
        </svg>
        <span class="text-lg text-[#333333] font-medium leading-7">问诊会话记录</span>
      </div>

      <!-- Tab切换 -->
      <div class="flex rounded-full bg-gray-100 p-0.5">
        <button
          class="rounded-full px-3 py-0.5 text-sm font-medium transition-colors"
          :class="activeTab === 'ongoing'
            ? 'bg-[#8E4337] text-white'
            : 'text-gray-600 hover:bg-gray-200'
          "
          @click="handleSwitchTab('ongoing')"
        >
          进行中
        </button>
        <button
          class="rounded-full px-3 py-0.5 text-sm font-medium transition-colors"
          :class="activeTab === 'all'
            ? 'bg-[#8E4337] text-white'
            : 'text-gray-600 hover:bg-gray-200'
          "
          @click="handleSwitchTab('all')"
        >
          全部
        </button>
      </div>
    </div>

    <!-- 会话列表 -->
    <div class="space-y-4">
      <div
        v-for="session in activeTab === 'ongoing' ? sessions.filter(s => s.status === '进行中') : sessions"
        :key="session.id"
        class="cursor-pointer rounded-[16px] bg-[#F9FAFB] p-4 transition-colors hover:bg-[#F3F4F6]"
        @click="enterConsultation(session.id)"
      >
        <div class="flex items-start gap-3">
          <!-- 患者头像 -->
          <div class="relative">
            <div class="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full bg-[#F5EBE9]">
              <img v-if="session.avatar" :src="session.avatar" alt="患者头像" class="h-full w-full object-cover">
              <span v-else class="text-[#8E4337] font-medium">{{ session.patientName.charAt(0) }}</span>
            </div>
            <!-- 咨询类型图标 -->
            <div class="absolute h-5 w-5 flex items-center justify-center rounded-full bg-white shadow-sm -bottom-1 -right-1">
              <svg v-if="session.consultationType === '图文问诊'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-3 w-3 text-[#8E4337]">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-3 w-3 text-[#8E4337]">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <!-- 患者信息 -->
          <div class="flex-1">
            <div class="mb-1 flex items-start justify-between">
              <div class="flex items-center gap-2">
                <span class="text-[#1F2937] font-medium leading-5">{{ session.patientName }}</span>
                <span class="text-sm text-[#6B7280] leading-5">· {{ session.age }}岁</span>
              </div>
              <span class="rounded-full bg-[#8E4337]/10 px-2 py-0.5 text-xs text-[#8E4337] font-semibold">
                {{ session.status }}
              </span>
            </div>
            <div class="mb-1 line-clamp-1 text-sm text-[#4B5563] leading-5">
              主诉: {{ session.chiefComplaint }}
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-[#6B7280] leading-4">
                {{ session.consultationType }} · {{ session.consultationTime }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 text-gray-400">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="(activeTab === 'ongoing' ? sessions.filter(s => s.status === '进行中') : sessions).length === 0" class="py-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="mx-auto mb-3 h-12 w-12 text-gray-300">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
        </svg>
        <p class="text-sm text-[#6B7280] leading-5">
          暂无{{ activeTab === 'ongoing' ? '进行中' : '' }}问诊会话
        </p>
      </div>
    </div>
  </div>
</template>
