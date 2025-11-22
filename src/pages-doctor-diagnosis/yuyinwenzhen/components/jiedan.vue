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
          <wd-icon name="error-circle-filled" size="10.5px" color="#EF4444" />
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
        <div class="absolute h-5 w-5 flex items-center justify-center border-2 border-white rounded-full -bottom-1 -right-1" :class="order.patientInfo.gender === 'male' ? 'bg-[#3B82F6]' : 'bg-[#EC4899]'">
          <wd-icon name="user" size="16px" color="#ffffff" />
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
        <wd-icon name="list" size="16px" />
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
    <div class="grid grid-cols-2 gap-4">
      <wd-button
        plain hairline type="default"
        class="border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]"
        @click="rejectOrder(order.id)"
      >
        <wd-icon name="close" size="12px" color="#6B7280" />
        暂不接单
      </wd-button>
      <wd-button
        hairline
        class="border-[#8E4337] bg-[#8E4337] text-white"
        :disabled="loadingOrderIds.has(order.id)"
        @click="acceptOrder(order.id)"
      >
        <wd-icon name="check" size="12px" color="#ffffff" />
        立即接单
      </wd-button>
      <!-- <div
        class="flex items-center justify-center gap-1 rounded-xl bg-[#8E4337] py-3 text-sm text-white font-semibold shadow-md transition-all active:scale-95 hover:bg-[#6E2F25]"
        :class="{ 'relative text-transparent cursor-not-allowed': loadingOrderIds.has(order.id) }"
        :disabled="loadingOrderIds.has(order.id)"
        aria-label="立即接单"
        style="word-break: keep-all;"
        @click="acceptOrder(order.id)"
      >
        <template v-if="!loadingOrderIds.has(order.id)">
          <wd-icon name="check" size="16px" />
          立即接单
        </template>
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
        </div>
      </div> -->
    </div>
  </article>
</template>
