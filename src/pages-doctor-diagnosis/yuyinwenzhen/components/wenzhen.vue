<script setup lang="ts">
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
    symptoms: props.record.symptoms,
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
        <div class="absolute h-6 w-6 flex items-center justify-center border-2 border-white rounded-full bg-[#8E4337] shadow-md -bottom-1 -right-1">
          <wd-icon v-if="record.type === 'text'" name="camera" size="16px" color="white" />
          <wd-icon v-else-if="record.type === 'video'" name="video" size="16px" color="white" />
          <wd-icon v-else name="phone" size="16px" color="white" />
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
          <div class="h-8 w-8 flex items-center justify-center" :class="record.prescribed ? 'bg-[#10B981]' : 'bg-[#EF4444]'">
            <wd-icon name="check" size="16px" color="white" />
          </div>
          <div>
            <div class="text-xs text-[#6B7280] font-medium">
              开方状态
            </div>
            <div :class="record.prescribed ? 'text-[#10B981]' : 'text-[#EF4444]'" class="text-sm font-bold">
              {{ record.prescribed ? '已开方' : '未开方' }}
            </div>
          </div>
        </div>
        <!-- 进行中的未开方记录显示去开方按钮 -->
        <template v-if="record.status === 'ongoing' && !record.prescribed">
          <button
            class="box-border flex items-center justify-center gap-1 truncate rounded-lg bg-[#8E4337] px-3 py-1.5 text-xs text-white font-semibold shadow-[0px_2px_4px_rgba(142,67,55,0.3)] transition-all active:scale-95 hover:bg-[#6E2F25]"
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
      <wd-button
        block
        type="primary"
        class="box-border w-full flex items-center justify-center gap-1 truncate border-2 border-[#3B82F6] rounded-sm bg-[#3B82F6] py-2.5 text-sm text-white font-semibold transition-all active:scale-95 hover:bg-[#2563EB]"
        aria-label="查看详情"
        @click="handleViewDetail"
      >
        <wd-icon name="view" size="16px" class="align-middle" />
        <span class="align-middle">查看详情</span>
      </wd-button>
      <template v-if="record.status === 'ongoing'">
        <wd-button
          block
          class="box-border w-full flex items-center justify-center gap-1 truncate border-2 rounded-sm py-2.5 text-sm text-white font-semibold transition-all active:scale-95 border-[#EF4444]! bg-[#EF4444]! hover:bg-[#DC2626]!"
          aria-label="结束问诊"
          @click="handleEndConsultation"
        >
          <wd-icon name="close" size="16px" />
          结束问诊
        </wd-button>
      </template>
      <template v-else-if="!record.prescribed">
        <wd-button
          block
          class="box-border w-full flex items-center justify-center gap-1 truncate rounded-sm py-2.5 text-sm text-white font-semibold shadow-lg transition-all active:scale-95 bg-[#F59E0B]! shadow-[0px_4px_8px_rgba(245,158,11,0.3)]! hover:bg-[#D97706]!"
          aria-label="去开方"
          @click="handleCreatePrescription"
        >
          <wd-icon name="backtop-rectangle" size="16px" />
          去开方
        </wd-button>
      </template>
      <template v-else>
        <wd-button
          block
          type="success"
          class="box-border w-full flex items-center justify-center gap-1 truncate border-2 border-[#10B981] rounded-sm bg-[#10B981] py-2.5 text-sm text-white font-semibold transition-all active:scale-95 hover:bg-[#059669]"
          aria-label="查看问诊记录"
          @click="handleOpenChat"
        >
          <wd-icon name="chat" size="16px" class="align-middle" />
          <span class="align-middle">问诊记录</span>
        </wd-button>
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
