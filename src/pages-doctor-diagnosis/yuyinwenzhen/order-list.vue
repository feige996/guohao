<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

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

// 状态管理
const currentTab = ref<string>('all')
const pendingCount = ref<number>(2)
const todayCount = ref<number>(0)
const orders = ref<Order[]>([
  {
    id: 'DS202510311520257361741750846613',
    orderNumber: 'DS202510311520257361741750846613',
    status: 'waiting',
    isUrgent: true,
    isOverdue: true,
    patientInfo: {
      id: 'GH973212',
      name: 'GH973212',
      avatar: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_640.jpg',
      gender: 'female',
    },
    consultationType: '体质调理',
    symptoms: '最近感觉身体不适，有轻微头痛和乏力的症状，持续了大约三天左右，想咨询一下医生的建议。',
    amount: '¥0.01',
    dispatchTime: '10-31\n15:20',
    remainingTime: '已超时\n4189分',
    remainingMinutes: 4189,
  },
  {
    id: 'DS202510311520047361740918743373',
    orderNumber: 'DS202510311520047361740918743373',
    status: 'waiting',
    isUrgent: false,
    isOverdue: true,
    patientInfo: {
      id: 'GH973212',
      name: 'GH973212',
      avatar: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_640.jpg',
      gender: 'female',
    },
    consultationType: '体质调理',
    symptoms: '最近感觉身体不适，有轻微头痛和乏力的症状，持续了大约三天左右，想咨询一下医生的建议。',
    amount: '¥0.01',
    dispatchTime: '10-31\n15:20',
    remainingTime: '已超时\n4190分',
    remainingMinutes: 4190,
  },
])

// Toast状态
const toastVisible = ref<boolean>(false)
const toastMessage = ref<string>('')

// 模态框状态
const modalVisible = ref<boolean>(false)
const currentOrderId = ref<string>('')

// 按钮加载状态
const loadingOrderIds = ref<Set<string>>(new Set())

// 计算属性 - 过滤后的订单列表
const filteredOrders = computed(() => {
  if (currentTab.value === 'all') {
    return orders.value
  }
  else if (currentTab.value === 'waiting') {
    return orders.value.filter(order => order.status === 'waiting')
  }
  else if (currentTab.value === 'viewed') {
    return orders.value.filter(order => order.status === 'rejected')
  }
  return orders.value
})

// 计算属性 - 各标签页数量
const badgeCounts = computed(() => {
  return {
    all: orders.value.length,
    waiting: orders.value.filter(order => order.status === 'waiting').length,
    viewed: orders.value.filter(order => order.status === 'rejected').length,
  }
})

// 显示Toast
function showToast(message: string, duration: number = 2000): void {
  toastMessage.value = message
  toastVisible.value = true

  setTimeout(() => {
    toastVisible.value = false
  }, duration)
}

// 返回上一页
function goBack(): void {
  // 在uni-app中使用uni.navigateBack()
  console.log('返回上一页')
}

// 切换标签页
function switchTab(tab: string): void {
  currentTab.value = tab
  const tabNames = {
    all: '全部待接单',
    waiting: '待响应',
    viewed: '已拒绝',
  }
  showToast(`切换到${tabNames[tab as keyof typeof tabNames]}`)
}

// 打开确认弹窗
function openModal(orderId: string): void {
  currentOrderId.value = orderId
  modalVisible.value = true
}

// 关闭弹窗
function closeModal(): void {
  modalVisible.value = false
}

// 确认拒绝订单
function confirmRejectOrder(): void {
  closeModal()
  showToast('已标记为暂不接单')

  setTimeout(() => {
    // 找到订单索引并移除
    const index = orders.value.findIndex(order => order.id === currentOrderId.value)
    if (index !== -1) {
      orders.value.splice(index, 1)
      updateOrderCount()
    }
  }, 500)
}

// 拒绝接单（显示确认弹窗）
function rejectOrder(orderId: string): void {
  openModal(orderId)
}

// 接受订单
function acceptOrder(orderId: string): void {
  // 设置加载状态
  loadingOrderIds.value.add(orderId)
  showToast('正在接单...')

  setTimeout(() => {
    // 移除加载状态
    loadingOrderIds.value.delete(orderId)
    showToast('接单成功 ✓')

    setTimeout(() => {
      // 找到订单索引并移除
      const index = orders.value.findIndex(order => order.id === orderId)
      if (index !== -1) {
        orders.value.splice(index, 1)
        updateOrderCount()
      }

      // 更新今日已接数量
      todayCount.value += 1

      // 跳转到问诊记录页面
      setTimeout(() => {
        // 在uni-app中使用uni.navigateTo()
        uni.navigateTo({
          url: '/pages-doctor-diagnosis/yuyinwenzhen/consultation-records'
        })
      }, 800)
    }, 500)
  }, 1500)
}

// 更新订单数量
function updateOrderCount(): void {
  pendingCount.value = orders.value.length
}

// 页面加载时更新订单数量
onMounted(() => {
  updateOrderCount()
})
</script>

<template>
  <div class="min-h-screen w-full bg-[#F9FAFB] pb-5 box-border">
    <!-- Toast 通知 -->
    <div
      class="fixed left-1/2 top-20 z-1000 max-w-[300px] transform rounded-lg bg-[rgba(0,0,0,0.8)] px-6 py-3 text-center text-sm text-white transition-all duration-300 -translate-x-1/2" :class="[{
        'opacity-100 translate-y-0': toastVisible,
        'opacity-0 -translate-y-20': !toastVisible,
      }]"
    >
      {{ toastMessage }}
    </div>

    <!-- 确认弹窗 -->
    <div
      class="fixed inset-0 z-999 bg-[rgba(0,0,0,0.5)] transition-opacity duration-300" :class="[{
        'opacity-100 pointer-events-auto': modalVisible,
        'opacity-0 pointer-events-none': !modalVisible,
      }]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      @click="closeModal"
    >
      <div
        class="fixed left-1/2 top-1/2 z-1000 max-w-[320px] w-[calc(100%-48px)] rounded-[16px] bg-white p-6 transition-all duration-300" :class="[{
          'opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100': modalVisible,
          'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-90': !modalVisible,
        }]"
        @click.stop
      >
        <div class="mb-6">
          <h3 id="modalTitle" class="mb-3 text-center text-lg text-[#1F2937] font-bold">
            拒绝接单
          </h3>
          <p class="text-center text-sm text-[#6B7280] leading-relaxed">
            确定拒绝此单吗？拒绝后该订单将继续派给其他医生。
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button
            class="border-2 border-[#E5E7EB] rounded-lg py-3 text-sm text-[#6B7280] font-medium transition-all active:scale-98 hover:bg-[#F9FAFB]"
            aria-label="取消"
            @click="closeModal"
          >
            取消
          </button>
          <button
            class="rounded-lg bg-[#8E4337] py-3 text-sm text-white font-medium transition-all active:scale-98 hover:bg-[#6E2F25]"
            aria-label="确认拒绝"
            @click="confirmRejectOrder"
          >
            确认拒绝
          </button>
        </div>
      </div>
    </div>

    <!-- 顶部导航 -->
    <header class="fixed left-0 right-0 top-0 z-50 h-[56px] w-full flex items-center justify-between bg-white px-4 shadow-sm">
      <button class="text-[#333333] transition-colors hover:text-[#6B7280]" aria-label="返回上一页" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
          <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
        </svg>
      </button>
      <h1 class="text-lg text-[#1F2937] font-bold">
        医生待接单
      </h1>
      <div class="w-6" />
    </header>

    <!-- 统计卡片 -->
    <section class="mt-[56px] from-[#8E4337] via-[#9B4D41] to-[#B85C4F] bg-gradient-to-br px-5 py-6 shadow-lg">
      <div class="grid grid-cols-2 gap-4">
        <!-- 待接单统计 -->
        <div class="flex flex-col cursor-pointer items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
          <div class="mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-6 w-6">
              <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
            </svg>
          </div>
          <div class="stat-number mb-1 text-4xl text-white font-bold">
            {{ pendingCount }}
          </div>
          <div class="text-sm text-white/90 font-medium">
            待接单
          </div>
        </div>

        <!-- 今日已接统计 -->
        <div class="flex flex-col cursor-pointer items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15">
          <div class="mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-6 w-6">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="stat-number mb-1 text-4xl text-white font-bold">
            {{ todayCount }}
          </div>
          <div class="text-sm text-white/90 font-medium">
            今日已接
          </div>
        </div>
      </div>
    </section>

    <!-- 标签页 -->
    <nav class="sticky top-[56px] z-40 bg-white px-4 shadow-sm">
      <div class="flex items-center">
        <button
          class="flex flex-1 items-center justify-center gap-1 py-3 text-sm font-medium transition-colors"
          :class="currentTab === 'all' ? 'text-[#8E4337] border-b-2 border-[#8E4337]' : 'text-[#6B7280]'"
          aria-label="全部待接单"
          @click="switchTab('all')"
        >
          <span>全部</span>
          <span v-if="badgeCounts.all > 0" class="h-[18px] min-w-[18px] inline-flex items-center justify-center rounded-[9px] bg-[#EF4444] px-1.5 text-[11px] text-white font-bold">
            {{ badgeCounts.all }}
          </span>
        </button>
        <button
          class="flex flex-1 items-center justify-center gap-1 py-3 text-sm font-medium transition-colors"
          :class="currentTab === 'waiting' ? 'text-[#8E4337] border-b-2 border-[#8E4337]' : 'text-[#6B7280]'"
          aria-label="待响应"
          @click="switchTab('waiting')"
        >
          <span>待响应</span>
          <span v-if="badgeCounts.waiting > 0" class="h-[18px] min-w-[18px] inline-flex items-center justify-center rounded-[9px] bg-[#EF4444] px-1.5 text-[11px] text-white font-bold">
            {{ badgeCounts.waiting }}
          </span>
        </button>
        <button
          class="flex flex-1 items-center justify-center gap-1 py-3 text-sm font-medium transition-colors"
          :class="currentTab === 'viewed' ? 'text-[#8E4337] border-b-2 border-[#8E4337]' : 'text-[#6B7280]'"
          aria-label="已拒绝"
          @click="switchTab('viewed')"
        >
          <span>已拒绝</span>
          <span v-if="badgeCounts.viewed > 0" class="h-[18px] min-w-[18px] inline-flex items-center justify-center rounded-[9px] bg-[#9CA3AF] px-1.5 text-[11px] text-white font-bold">
            {{ badgeCounts.viewed }}
          </span>
        </button>
      </div>
    </nav>

    <!-- 订单列表 -->
      <main class="px-3 pt-4 space-y-4">
      <!-- 订单卡片 -->
      <article
        v-for="order in filteredOrders"
        :key="order.id"
        class="relative w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] transition-all active:scale-98 box-border"
        :class="order.isUrgent ? 'border-2 border-[#FEE2E2]' : 'border border-[#F3F4F6] hover:border-[#8E4337]/20'"
      >
        <!-- 紧急标识 -->
        <div v-if="order.isUrgent" class="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#EF4444] opacity-10 -mr-10 -mt-10" />

        <!-- 订单号和状态 -->
        <div class="mb-4 flex items-center justify-between gap-2">
          <span class="truncate max-w-[120px] text-[10px] text-[#9CA3AF]">{{ order.orderNumber }}</span>
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
            class="flex items-center justify-center gap-1 border-2 border-[#E5E7EB] rounded-xl py-3 text-sm text-[#6B7280] font-semibold transition-all active:scale-95 hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
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
            class="flex items-center justify-center gap-1 rounded-xl from-[#8E4337] to-[#6E2F25] bg-gradient-to-r py-3 text-sm text-white font-semibold shadow-[#8E4337]/30 shadow-lg transition-all active:scale-95 hover:from-[#6E2F25] hover:to-[#5A2520]"
            :class="{ 'relative text-transparent cursor-not-allowed': loadingOrderIds.has(order.id) }"
            :disabled="loadingOrderIds.has(order.id)"
            aria-label="立即接单"
            @click="acceptOrder(order.id)"
            style="word-break: keep-all;"
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

      <!-- 空状态 -->
      <div v-if="filteredOrders.length === 0" class="flex flex-col items-center justify-center py-16">
        <div class="mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-[#F3F4F6]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9CA3AF" class="h-10 w-10">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </div>
        <h3 class="mb-2 text-base text-[#1F2937] font-bold">
          暂无待接订单
        </h3>
        <p class="text-sm text-[#6B7280]">
          当前没有需要处理的派单
        </p>
      </div>

      <!-- 底部提示 -->
      <div v-else class="py-4 text-center">
        <span class="text-sm text-[#9CA3AF]">没有更多了</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 脉动动画 - 紧急订单 */
@keyframes pulse-urgent {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.urgent-badge {
  animation: pulse-urgent 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 统计数字动画 */
.stat-number {
  transition: transform 0.3s ease;
}

.stat-number:active {
  transform: scale(1.1);
}

/* 卡片悬停效果 */
.order-card {
  transition: all 0.3s ease;
}

.order-card:active {
  transform: scale(0.98);
}
</style>
