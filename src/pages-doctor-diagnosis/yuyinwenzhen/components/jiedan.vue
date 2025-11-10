<script setup lang="ts">
// 订单接口定义
interface Order {
  id: string
  orderNumber: string
  status: string
  isUrgent: boolean
  isOverdue: boolean
  patientInfo: {
    id: string
    name: string
    avatar: string
    gender: 'male' | 'female'
  }
  consultationType: string
  symptoms: string
  amount: string
  dispatchTime: string
  remainingTime: string
  remainingMinutes: number
}

// Props定义
interface Props {
  order: Order
  loadingOrderIds: Set<string>
}

const props = defineProps<Props>()

// Emits定义
const emit = defineEmits<{
  reject: [orderId: string]
  accept: [orderId: string]
}>()

// 拒绝订单
function rejectOrder(orderId: string): void {
  emit('reject', orderId)
}

// 接受订单
function acceptOrder(orderId: string): void {
  emit('accept', orderId)
}
</script>

<template>
  <article
    class="relative box-border w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] transition-all active:scale-98"
    :class="order.isUrgent ? 'border-2 border-[#FEE2E2]' : 'border border-[#F3F4F6] hover:border-[#8E4337]/20'"
  >
    <!-- 紧急标识 -->
    <div v-if="order.isUrgent" class="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#EF4444] opacity-10 -mr-10 -mt-10" />

    <!-- 订单号和状态 -->
    <div class="mb-4 flex items-center justify-between gap-2">
      <span class="max-w-[120px] truncate text-[10px] text-[#9CA3AF]">{{ order.orderNumber }}</span>
      <div class="flex items-center gap-2">
        <span v-if="order.isOverdue" class="flex animate-pulse items-center gap-1 whitespace-nowrap rounded bg-[#FEE2E2] px-2 py-0.5 text-[10px] text-[#EF4444] font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
          </svg>
          超时
        </span>
        <span class="flex-shrink-0 whitespace-nowrap rounded-full bg-[#FFF7ED] px-2.5 py-1 text-xs text-[#EA580C] font-bold">待响应</span>
      </div>
    </div>

    <!-- 患者信息 -->
    <div class="mb-4 flex items-center gap-3">
      <div class="relative">
        <div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#F5EBE9]">
          <img :src="order.patientInfo.avatar" :alt="order.patientInfo.name" class="h-full w-full object-cover">
        </div>
        <!-- 性别标识 -->
        <div class="absolute h-5 w-5 flex items-center justify-center border-2 border-white rounded-full bg-[#EC4899] -bottom-1 -right-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" class="h-3 w-3">
            <path d="M8 1a3.5 3.5 0 0 0-3.5 3.5c0 1.41.84 2.617 2.042 3.165L5.5 9.537a.75.75 0 0 0 .75.75h.214l-.549 3.285a.75.75 0 0 0 1.48.247l.65-3.907h.91l.65 3.907a.75.75 0 0 0 1.48-.247l-.55-3.285h.215a.75.75 0 0 0 .75-.75l-1.042-1.872A3.5 3.5 0 0 0 11.5 4.5 3.5 3.5 0 0 0 8 1Z" />
          </svg>
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-2 flex items-center gap-2">
          <span class="text-lg text-[#1F2937] font-bold">{{ order.patientInfo.name }}</span>
        </div>
        <span class="rounded-lg from-[#F5EBE9] to-[#FCE7E3] bg-gradient-to-r px-2.5 py-1 text-xs text-[#8E4337] font-semibold shadow-sm">{{ order.consultationType }}</span>
      </div>
    </div>

    <!-- 主诉 -->
    <div class="mb-4 border border-[#F3F4F6] rounded-xl bg-[#F9FAFB] p-2.5">
      <div class="mb-2 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#6B7280" class="h-4 w-4">
          <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
          <path fill-rule="evenodd" d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs text-[#6B7280] font-semibold">主诉症状</span>
      </div>
      <div class="text-sm text-[#1F2937] leading-relaxed line-clamp-3">
        {{ order.symptoms }}
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="grid grid-cols-3 mb-4 gap-1.5">
      <div class="rounded-xl from-[#FFF7ED] to-[#FFEDD5] bg-gradient-to-br p-2.5 text-center">
        <div class="mb-1 text-xs text-[#EA580C] font-medium">
          金额
        </div>
        <div class="text-lg text-[#EA580C] font-bold">
          {{ order.amount }}
        </div>
      </div>
      <div class="rounded-xl bg-[#F9FAFB] p-2.5 text-center">
        <div class="mb-1 text-xs text-[#6B7280] font-medium">
          派单
        </div>
        <div class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#1F2937] font-bold">
          {{ order.dispatchTime }}
        </div>
      </div>
      <div class="rounded-xl from-[#FEE2E2] to-[#FECACA] bg-gradient-to-br p-2.5 text-center">
        <div class="mb-1 text-xs text-[#EF4444] font-medium">
          剩余
        </div>
        <div class="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#EF4444] font-bold">
          {{ order.remainingTime }}
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="grid grid-cols-2 gap-2">
      <button
        class="flex cursor-pointer items-center justify-center gap-1 border-2 border-[#D1D5DB] rounded-xl py-3 text-sm text-[#6B7280] font-semibold transition-all active:scale-95 hover:border-[#9CA3AF] hover:bg-[#F9FAFB]"
        :disabled="loadingOrderIds.has(order.id)"
        aria-label="暂不接单"
        @click="rejectOrder(order.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
        暂不接单
      </button>
      <button
        class="flex items-center justify-center gap-1 rounded-xl bg-[#8E4337] py-3 text-sm text-white font-semibold shadow-md transition-all active:scale-95 hover:bg-[#6E2F25]"
        :class="{ 'relative text-transparent cursor-not-allowed': loadingOrderIds.has(order.id) }"
        :disabled="loadingOrderIds.has(order.id)"
        aria-label="立即接单"
        style="word-break: keep-all;"
        @click="acceptOrder(order.id)"
      >
        <template v-if="!loadingOrderIds.has(order.id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
          </svg>
          立即接单
        </template>
        <!-- 加载动画 -->
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
        </div>
      </button>
    </div>
  </article>
</template>
