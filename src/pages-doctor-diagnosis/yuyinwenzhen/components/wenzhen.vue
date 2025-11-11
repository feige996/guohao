<script setup lang="ts">
import { defineProps } from 'vue'

// 问诊记录类型定义
export interface ConsultationRecord {
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

// 定义组件属性
const props = defineProps<{
  record: ConsultationRecord
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'view-detail', id: string): void
  (e: 'end-consultation', id: string): void
  (e: 'create-prescription', id: string): void
  (e: 'open-chat', data: {
    name: string
    age: string
    gender: string
    avatar: string
    symptoms?: string
  }): void
}>()

// 查看详情
function handleViewDetail() {
  emit('view-detail', props.record.id)
}

// 结束问诊
function handleEndConsultation() {
  emit('end-consultation', props.record.id)
}

// 创建处方
function handleCreatePrescription() {
  emit('create-prescription', props.record.id)
}

// 打开聊天
function handleOpenChat() {
  emit('open-chat', {
    name: props.record.patientName,
    age: props.record.age,
    gender: '女', // 实际项目中应从数据中获取
    avatar: props.record.avatar,
    symptoms: props.record.symptoms
  })
}
</script>

<template>
  <article
    class="box-border w-full overflow-hidden break-words border rounded-[20px] bg-white p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-[#8E4337]/20 hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
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
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0 flex-1">
            <h3 class="mb-1 truncate text-base text-[#1F2937] font-bold">
              {{ record.patientName }} · {{ record.age }}
            </h3>
            <div class="flex items-center gap-2 whitespace-nowrap">
              <span class="truncate text-xs text-[#6B7280]">{{ record.typeText }}</span>
              <span class="h-1 w-1 flex-shrink-0 rounded-full bg-[#D1D5DB]" />
              <span class="truncate text-xs text-[#9CA3AF]">{{ record.timestamp }}</span>
            </div>
          </div>
          <span :class="`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${record.statusClass} flex-shrink-0`">
            <template v-if="record.status === 'ongoing'">
              <span class="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#EA580C]" />
            </template>
            {{ record.statusText }}
          </span>
        </div>
      </div>
    </div>

    <!-- 开方状态卡片 -->
    <div class="mb-4 box-border w-full overflow-hidden break-words border border-[#F3F4F6] rounded-xl bg-[#F9FAFB] p-3">
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
        <!-- 进行中的未开方记录显示去开方按钮 -->
        <template v-if="record.status === 'ongoing' && !record.prescribed">
          <button
            class="box-border flex items-center justify-center gap-1 truncate rounded-lg bg-[#8E4337] px-3 py-1.5 text-xs text-white font-semibold shadow-[#8E4337]/30 transition-all active:scale-95 hover:bg-[#6E2F25]"
            aria-label="去开方"
            @click="handleCreatePrescription"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
              <path fill-rule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 2ZM3.75 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75ZM2 12.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
            去开方
          </button>
        </template>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="grid grid-cols-2 w-full gap-2">
      <button
        class="box-border w-full flex items-center justify-center gap-1 truncate border-2 border-[#8E4337] rounded-xl py-2.5 text-sm text-[#8E4337] font-semibold transition-all active:scale-95 hover:bg-[#F5EBE9]"
        aria-label="查看详情"
        @click="handleViewDetail"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path fill-rule="evenodd" d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" />
        </svg>
        查看详情
      </button>
      <template v-if="record.status === 'ongoing'">
        <button
          class="box-border w-full flex items-center justify-center gap-1 truncate rounded-xl bg-[#8E4337] py-2.5 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:bg-[#6E2F25]"
          aria-label="结束问诊"
          @click="handleEndConsultation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
            <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06L9.06 10l4.72 4.72a.75.75 0 1 1-1.06 1.06L8 11.06l-4.72 4.72a.75.75 0 0 1-1.06-1.06L6.94 10 2.22 5.28a.75.75 0 0 1 1.06-1.06L8 8.94l4.72-4.72a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
          </svg>
          结束问诊
        </button>
      </template>
      <template v-else-if="!record.prescribed">
        <button
          class="box-border w-full flex items-center justify-center gap-1 truncate rounded-xl from-[#8E4337] to-[#6E2F25] bg-gradient-to-r py-2.5 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:from-[#6E2F25] hover:to-[#5A2520]"
          aria-label="去开方"
          @click="handleCreatePrescription"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
            <path fill-rule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 2ZM3.75 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75ZM2 12.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          去开方
        </button>
      </template>
      <template v-else>
        <button
          class="box-border w-full flex items-center justify-center gap-2 truncate rounded-xl from-[#8E4337] to-[#6E2F25] bg-gradient-to-r py-3 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:from-[#6E2F25] hover:to-[#5A2520]"
          aria-label="查看问诊记录"
          @click="handleOpenChat"
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