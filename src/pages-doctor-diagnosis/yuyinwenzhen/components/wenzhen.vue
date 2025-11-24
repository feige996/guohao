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
            <view class="mb-1 truncate text-base text-[#1F2937] font-bold">
              {{ record.patientName }} · {{ record.age }}
            </view>
            <div class="flex items-center gap-2 whitespace-nowrap">
              <span class="truncate text-xs text-[#6B7280]">{{ record.typeText }}</span>
              <span class="h-1 w-1 flex-shrink-0 rounded-full bg-[#D1D5DB]" />
              <span class="truncate text-xs text-[#9CA3AF]">{{ record.timestamp }}</span>
            </div>
          </div>
          <view :class="`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center ${record.statusClass} flex-shrink-0`">
            <block v-if="record.status === 'ongoing'">
              <view class="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#EA580C]" />
            </block>
            {{ record.statusText }}
          </view>
        </div>
      </div>
    </div>

    <!-- 开方状态卡片 -->
    <div class="mb-4 box-border w-full overflow-hidden break-words border border-[#F3F4F6] rounded-xl bg-[#F9FAFB] p-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 flex items-center justify-center rounded-lg" :class="record.prescribed ? 'bg-[#10B981]' : 'bg-[#EF4444]'">
            <wd-icon :name="record.prescribed ? 'check' : 'info-circle-filled'" size="16px" color="white" />
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
        <template v-if="!record.prescribed">
          <wd-button
            size="small"
            type="primary"
            icon="backtop-rectangle"
            @click="handleCreatePrescription"
          >
            去开方
          </wd-button>
        </template>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="grid grid-cols-2 w-full gap-2">
      <template v-if="record.status === 'ongoing'">
        <wd-button
          type="primary"
          icon="check"
          @click="handleOpenChat"
        >
          进入问诊
        </wd-button>
        <wd-button
          type="warning"
          icon="close"
          @click="handleEndConsultation"
        >
          结束问诊
        </wd-button>
      </template>
      <template v-else>
        <wd-button
          plain
          type="primary"
          icon="view"
          @click="handleViewDetail"
        >
          查看详情
        </wd-button>
        <wd-button
          type="primary"
          icon="chat"
          @click="handleOpenChat"
        >
          问诊记录
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
