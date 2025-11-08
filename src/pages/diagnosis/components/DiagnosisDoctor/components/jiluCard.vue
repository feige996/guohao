<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

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

const props = defineProps<{
  activeTab: 'ongoing' | 'all'
}>()

const emit = defineEmits<{
  switchTab: [tab: 'ongoing' | 'all']
}>()

// 模拟会话数据
const sessions = ref<ConsultationSession[]>([
  {
    id: '1',
    patientName: '李先生',
    age: 35,
    avatar: '',
    chiefComplaint: '头痛、咳嗽、咽痛3天',
    consultationType: '图文问诊',
    consultationTime: '今天 09:30',
    status: '进行中'
  },
  {
    id: '2',
    patientName: '王女士',
    age: 28,
    avatar: '',
    chiefComplaint: '失眠多梦，心悸',
    consultationType: '语音问诊',
    consultationTime: '今天 10:15',
    status: '进行中'
  },
  {
    id: '3',
    patientName: '张先生',
    age: 42,
    avatar: '',
    chiefComplaint: '腰痛，下肢麻木',
    consultationType: '图文问诊',
    consultationTime: '昨天 16:45',
    status: '已结束'
  }
])

// 根据Tab过滤会话
const filteredSessions = ref<ConsultationSession[]>([])

const updateFilteredSessions = () => {
  if (props.activeTab === 'ongoing') {
    filteredSessions.value = sessions.value.filter(session => session.status === '进行中')
  } else {
    filteredSessions.value = sessions.value
  }
}

// 监听Tab变化
watch(() => props.activeTab, () => {
  updateFilteredSessions()
}, { immediate: true })

const handleSwitchTab = (tab: 'ongoing' | 'all') => {
  emit('switchTab', tab)
}

const enterConsultation = (sessionId: string) => {
  showToast('正在进入问诊会话...')
  // 这里可以添加跳转到问诊详情页面的逻辑
  console.log(`进入会话ID: ${sessionId}`)
}

const showToast = (message: string) => {
  // 实际项目中应该使用全局的Toast组件或工具
  console.log(message)
}
</script>

<template>
  <div class="w-full p-5 rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] bg-white">
    <div class="flex justify-between items-center mb-5">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 text-[#8E4337]">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
        <span class="text-[#333333] text-lg font-medium leading-7">问诊会话记录</span>
      </div>
      
      <!-- Tab切换 -->
      <div class="flex rounded-full bg-gray-100 p-1">
        <button
          class="px-3 py-1 text-sm font-medium rounded-full transition-colors"
          :class="activeTab === 'ongoing' 
            ? 'bg-[#8E4337] text-white' 
            : 'text-gray-600 hover:bg-gray-200'
          "
          @click="handleSwitchTab('ongoing')"
        >
          进行中
        </button>
        <button
          class="px-3 py-1 text-sm font-medium rounded-full transition-colors"
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
        v-for="session in filteredSessions" 
        :key="session.id"
        class="p-4 bg-[#F9FAFB] rounded-[16px] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
        @click="enterConsultation(session.id)"
      >
        <div class="flex items-start gap-3">
          <!-- 患者头像 -->
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#F5EBE9] flex items-center justify-center overflow-hidden">
              <img v-if="session.avatar" :src="session.avatar" alt="患者头像" class="w-full h-full object-cover">
              <span v-else class="text-[#8E4337] font-medium">{{ session.patientName.charAt(0) }}</span>
            </div>
            <!-- 咨询类型图标 -->
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg v-if="session.consultationType === '图文问诊'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3 h-3 text-[#8E4337]">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3 h-3 text-[#8E4337]">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <!-- 患者信息 -->
          <div class="flex-1">
            <div class="flex justify-between items-start mb-1">
              <div class="flex items-center gap-2">
                <span class="text-[#1F2937] font-medium leading-5">{{ session.patientName }}</span>
                <span class="text-[#6B7280] text-sm leading-5">· {{ session.age }}岁</span>
              </div>
              <span class="px-2 py-0.5 bg-[#8E4337]/10 text-[#8E4337] text-xs font-semibold rounded-full">
                {{ session.status }}
              </span>
            </div>
            <div class="text-[#4B5563] text-sm leading-5 mb-1 line-clamp-1">
              主诉: {{ session.chiefComplaint }}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#6B7280] text-xs leading-4">
                {{ session.consultationType }} · {{ session.consultationTime }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 text-gray-400">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredSessions.length === 0" class="py-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-12 h-12 mx-auto text-gray-300 mb-3">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
        </svg>
        <p class="text-[#6B7280] text-sm leading-5">暂无{{ activeTab === 'ongoing' ? '进行中' : '' }}问诊会话</p>
      </div>
    </div>
  </div>
</template>