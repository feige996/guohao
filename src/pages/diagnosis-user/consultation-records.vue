<script setup lang="ts">
import type { Appointment } from '@/types2'
import { consultationRecords as mockConsultationRecords, mockDoctors } from '@/data'
import { AppointmentStatus, AssignMode, ConsultMode, ConsultType } from '@/types2'
import EmptyState from './components/EmptyState.vue'

definePage({
  style: {
    navigationBarTitleText: '问诊记录',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    navigationStyle: 'default',
  },
})

const activeTab = ref('all')

// 标签配置（根据状态码全局定义表的前端简化状态映射）
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending_payment', label: '待支付' },
  { key: 'pending_service', label: '待服务' },
  { key: 'in_service', label: '服务中' },
  { key: 'completed', label: '已完成' },
]

// 切换标签
function handleTabChange({ value }: { value: string }) {
  activeTab.value = value
}
const consultationRecords = ref<Appointment[]>(mockConsultationRecords)

// 辅助函数：将 AppointmentStatus 映射为简化的状态（根据状态码全局定义表）
function getSimpleStatus(status: AppointmentStatus): 'pending_payment' | 'pending_service' | 'in_service' | 'completed' {
  // Tab 1: 待支付 (1xx)
  if (status === AppointmentStatus.PENDING_PAYMENT
    || status === AppointmentStatus.PAYING
    || status === AppointmentStatus.PAYMENT_FAILED) {
    return 'pending_payment'
  }

  // Tab 2: 待服务 (2xx, 3xx部分, 400)
  if (status === AppointmentStatus.DISPATCHING
    || status === AppointmentStatus.WAITING_ACCEPT
    || status === AppointmentStatus.TAKING_NUMBER
    || status === AppointmentStatus.APPOINTMENT_PENDING
    || status === AppointmentStatus.QUEUING
    || status === AppointmentStatus.CALLING
    || status === AppointmentStatus.RECALL_QUEUING
    || status === AppointmentStatus.WAITING_CONSULT) {
    return 'pending_service'
  }

  // Tab 3: 服务中 (401, 402)
  if (status === AppointmentStatus.CONSULTING
    || status === AppointmentStatus.SERVICE_TIMEOUT) {
    return 'in_service'
  }

  // Tab 4: 已完成 (9xx, 202, 304, 5xx)
  return 'completed'
}

onLoad((options: any) => {
  if (options.tab) {
    activeTab.value = options.tab
  }
})

const statusPriority: Record<string, number> = {
  pending_payment: 1,
  pending_service: 2,
  in_service: 3,
  completed: 4,
}

const filteredRecords = computed(() => {
  if (activeTab.value === 'all') {
    return [...consultationRecords.value].sort((a, b) => {
      const priorityA = statusPriority[getSimpleStatus(a.status)] || 999
      const priorityB = statusPriority[getSimpleStatus(b.status)] || 999
      return priorityA - priorityB
    })
  }

  // 根据简化状态筛选
  return consultationRecords.value.filter((r: Appointment) =>
    getSimpleStatus(r.status) === activeTab.value,
  )
})

function viewConsultationDetail(id: number) {
  uni.navigateTo({
    url: `/pages/diagnosis-user/consultation-record-detail?id=${id}`,
  })
}

// 获取医生信息
function getDoctorInfo(record: Appointment) {
  if (!record.doctorId) {
    return {
      name: '待分配医生',
      title: '主任医师',
      avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
    }
  }
  const doctor = mockDoctors[record.doctorId.toString()]
  return doctor || {
    name: '医生',
    title: '主任医师',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
  }
}

function continueConsultation(record: Appointment) {
  const doctor = getDoctorInfo(record)
  uni.navigateTo({
    url: `/pages/im-chat?id=${record.id}&name=${doctor.name}&avatar=${doctor.avatar}&symptom=${record.symptoms || ''}`,
  })
}

// 获取状态文本（根据状态码定义）
function getStatusText(record: Appointment): string {
  const statusTextMap: Record<number, string> = {
    // 1xx: 支付相关
    100: '等待支付',
    101: '支付处理中',
    102: '支付失败',
    // 2xx: 派单模式
    200: '正在派单',
    201: '等待医生接单',
    202: '派单失败',
    // 3xx: 坐诊模式
    300: '正在取号',
    301: '预约成功',
    302: '排队中',
    303: '医生呼叫中',
    304: '叫号失败',
    305: '重新排队中',
    // 4xx: 问诊服务
    400: '待接诊',
    401: '问诊进行中',
    402: '服务即将结束',
    // 5xx: 退款流程
    500: '退款申请中',
    501: '退款审核中',
    502: '退款处理中',
    503: '退款失败',
    // 9xx: 终止状态
    900: '已完成',
    901: '已退款',
    902: '已取消',
  }

  return statusTextMap[record.status] || '未知状态'
}

// 获取派单模式文本
function getDispatchModeText(record: Appointment): string {
  if (record.consultMode === ConsultMode.DISPATCH) {
    if (record.assignMode === AssignMode.SMART)
      return '智能派单'
    if (record.assignMode === AssignMode.ASSIGN)
      return '指定医生'
  }
  if (record.consultMode === ConsultMode.CLINIC)
    return '在线坐诊'
  return ''
}

// 获取问诊类型文本
function getConsultationTypeText(record: Appointment): string {
  if (record.consultMode === ConsultMode.CLINIC) {
    if (record.consultType === ConsultType.VIDEO)
      return '视频问诊'
    if (record.consultType === ConsultType.VOICE)
      return '语音问诊'
  }
  return '图文问诊'
}

// 获取主操作按钮文本（根据文档：列表页只显示核心操作）
function getPrimaryButtonText(record: Appointment): string {
  const status = record.status

  // 1xx: 支付相关
  if (status === AppointmentStatus.PENDING_PAYMENT)
    return '去支付'
  if (status === AppointmentStatus.PAYMENT_FAILED)
    return '重新支付'

  // 303: 叫号中 - 最紧急的操作
  if (status === AppointmentStatus.CALLING)
    return '立即进入'

  // 302: 排队中
  if (status === AppointmentStatus.QUEUING)
    return '查看排队'

  // 305: 过号重排
  if (status === AppointmentStatus.RECALL_QUEUING)
    return '查看排队'

  // 201: 待接单
  if (status === AppointmentStatus.WAITING_ACCEPT)
    return '查看医生'

  // 301: 预约待生效
  if (status === AppointmentStatus.APPOINTMENT_PENDING)
    return '设置提醒'

  // 401: 进行中 - 继续问诊（进入IM）
  if (status === AppointmentStatus.CONSULTING)
    return '继续问诊'

  // 900: 已完成 - 查看记录（进入IM只读）
  if (status === AppointmentStatus.COMPLETED)
    return '查看记录'

  // 901, 902: 已退款/已取消
  if (status === AppointmentStatus.REFUNDED || status === AppointmentStatus.CANCELLED) {
    return '重新下单'
  }

  // 202: 派单失败
  if (status === AppointmentStatus.DISPATCH_FAILED)
    return '重新下单'

  // 503: 退款失败
  if (status === AppointmentStatus.REFUND_FAILED)
    return '联系客服'

  return ''
}

// 判断是否显示主操作按钮
function shouldShowPrimaryButton(record: Appointment): boolean {
  const status = record.status

  // 这些状态不显示主操作按钮（只显示查看详情）
  const noActionStatuses = [
    AppointmentStatus.PAYING, // 101: 支付中
    AppointmentStatus.DISPATCHING, // 200: 派单中
    AppointmentStatus.TAKING_NUMBER, // 300: 取号中
    AppointmentStatus.WAITING_CONSULT, // 400: 待接诊
    AppointmentStatus.SERVICE_TIMEOUT, // 402: 服务超时
    AppointmentStatus.REFUND_APPLYING, // 500: 退款申请中
    AppointmentStatus.REFUND_REVIEWING, // 501: 退款审核中
    AppointmentStatus.REFUND_PROCESSING, // 502: 退款处理中
    AppointmentStatus.CALL_FAILED, // 304: 叫号失败
  ]

  return !noActionStatuses.includes(status)
}

// 判断是否为智能派单且待分配
function isSmartWaiting(record: Appointment): boolean {
  return record.consultMode === ConsultMode.DISPATCH
    && record.assignMode === AssignMode.SMART
    && !record.doctorId
}

// 判断主按钮是否为紧急操作（需要闪烁提示）
function isPrimaryButtonUrgent(record: Appointment): boolean {
  return record.status === AppointmentStatus.CALLING // 303: 叫号中
}

// 处理主操作按钮点击
function handlePrimaryButtonClick(record: Appointment) {
  const status = record.status

  // 支付相关
  if (status === AppointmentStatus.PENDING_PAYMENT || status === AppointmentStatus.PAYMENT_FAILED) {
    uni.showToast({ title: '跳转支付页面', icon: 'none' })
    return
  }

  // 叫号中 - 立即进入
  if (status === AppointmentStatus.CALLING) {
    continueConsultation(record)
    return
  }

  // 排队中/过号重排 - 查看排队（跳转到详情页）
  if (status === AppointmentStatus.QUEUING || status === AppointmentStatus.RECALL_QUEUING) {
    viewConsultationDetail(record.id)
    return
  }

  // 待接单 - 查看医生（跳转到详情页）
  if (status === AppointmentStatus.WAITING_ACCEPT) {
    viewConsultationDetail(record.id)
    return
  }

  // 预约待生效 - 设置提醒
  if (status === AppointmentStatus.APPOINTMENT_PENDING) {
    uni.showToast({ title: '提醒设置成功', icon: 'success' })
    return
  }

  // 进行中 - 继续问诊（进入IM）
  if (status === AppointmentStatus.CONSULTING) {
    continueConsultation(record)
    return
  }

  // 已完成 - 查看记录（进入IM只读）
  if (status === AppointmentStatus.COMPLETED) {
    const doctor = getDoctorInfo(record)
    uni.navigateTo({
      url: `/pages/im-chat?id=${record.id}&name=${doctor.name}&avatar=${doctor.avatar}&symptom=${record.symptoms || ''}&viewOnly=true`,
    })
    return
  }

  // 已退款/已取消/派单失败 - 重新下单
  if (status === AppointmentStatus.REFUNDED
    || status === AppointmentStatus.CANCELLED
    || status === AppointmentStatus.DISPATCH_FAILED) {
    uni.showToast({ title: '跳转下单页面', icon: 'none' })
    return
  }

  // 退款失败 - 联系客服
  if (status === AppointmentStatus.REFUND_FAILED) {
    uni.showToast({ title: '联系客服', icon: 'none' })
    return
  }
}
</script>

<template>
  <view class="min-h-screen w-full bg-gray-100">
    <wd-sticky :offset-top="0">
      <view class="bg-white" style="width: 100vw;">
        <wd-tabs v-model="activeTab" @change="handleTabChange">
          <wd-tab
            v-for="tab in tabs"
            :key="tab.key"
            :title="tab.label"
            :name="tab.key"
          />
        </wd-tabs>
      </view>
    </wd-sticky>

    <view class="p-24rpx">
      <EmptyState v-if="filteredRecords.length === 0" text="暂无问诊记录" icon="📋" />

      <view v-else class="flex flex-col gap-16rpx">
        <view
          v-for="record in filteredRecords"
          :key="record.id"
          class="overflow-hidden rounded-16rpx bg-white transition-all active:opacity-90"
          :class="getSimpleStatus(record.status) === 'in_service' ? 'border-l-8rpx border-primary' : 'border-l-8rpx border-gray-200'"
          @tap="viewConsultationDetail(record.id)"
        >
          <!-- 顶部状态栏 -->
          <view class="flex items-center justify-between bg-gray-50 px-24rpx py-16rpx">
            <view class="flex items-center gap-12rpx">
              <!-- 问诊模式标签 -->
              <view
                class="rounded-8rpx px-12rpx py-4rpx text-20rpx font-medium"
                :class="record.consultMode === ConsultMode.DISPATCH && record.assignMode === AssignMode.SMART ? 'bg-purple-500 text-white'
                  : record.consultMode === ConsultMode.DISPATCH && record.assignMode === AssignMode.ASSIGN ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'"
              >
                {{ getDispatchModeText(record) }}
              </view>
              <!-- 问诊类型标签 -->
              <view class="rounded-8rpx bg-gray-200 px-12rpx py-4rpx text-20rpx text-gray-700 font-medium">
                {{ getConsultationTypeText(record) }}
              </view>
              <!-- 排队号 -->
              <view v-if="record.queueNumber" class="rounded-8rpx bg-orange-500 px-12rpx py-4rpx text-20rpx text-white font-bold">
                {{ record.queueNumber }}号
              </view>
            </view>
            <!-- 状态标签 -->
            <view
              class="rounded-8rpx px-16rpx py-6rpx text-22rpx font-bold"
              :class="getSimpleStatus(record.status) === 'pending_payment' ? 'bg-orange-100 text-orange-700'
                : getSimpleStatus(record.status) === 'pending_service' ? 'bg-yellow-100 text-yellow-700'
                  : getSimpleStatus(record.status) === 'in_service' ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'"
            >
              {{ getStatusText(record) }}
            </view>
          </view>

          <!-- 主要内容区 -->
          <view class="px-24rpx py-20rpx">
            <!-- 医生信息 -->
            <view class="mb-20rpx flex items-center gap-20rpx">
              <image
                :src="getDoctorInfo(record).avatar"
                class="h-96rpx w-96rpx border-4rpx border-gray-100 rounded-full"
                mode="aspectFill"
              />
              <view class="flex-1">
                <text class="mb-4rpx block text-32rpx text-gray-900 font-bold">
                  {{ isSmartWaiting(record) ? '系统智能匹配中...' : getDoctorInfo(record).name }}
                </text>
                <text v-if="!isSmartWaiting(record)" class="block text-24rpx text-gray-500">
                  {{ getDoctorInfo(record).title }}
                </text>
              </view>
            </view>

            <!-- 症状描述 -->
            <view v-if="record.symptoms" class="mb-20rpx rounded-12rpx bg-gray-50 px-20rpx py-16rpx">
              <text class="line-clamp-2 text-24rpx text-gray-600 leading-relaxed">
                {{ record.symptoms }}
              </text>
            </view>

            <!-- 底部信息栏 -->
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-8rpx text-22rpx text-gray-400">
                <text>🕐</text>
                <text>{{ record.createTime || '刚刚' }}</text>
              </view>
              <view class="flex items-center gap-8rpx text-22rpx text-gray-400">
                <text>💰</text>
                <text class="text-primary font-bold">¥{{ record.actualAmount }}</text>
              </view>
            </view>
          </view>

          <!-- 操作按钮区 -->
          <view class="flex gap-12rpx px-24rpx pb-20rpx" @tap.stop>
            <!-- 主操作按钮 -->
            <wd-button
              v-if="shouldShowPrimaryButton(record)"
              type="primary"
              :block="!shouldShowPrimaryButton(record)"
              custom-class="flex-1"
              :custom-style="isPrimaryButtonUrgent(record)
                ? 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border: none; animation: pulse 1.5s infinite;'
                : 'background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;'"
              @click="handlePrimaryButtonClick(record)"
            >
              {{ getPrimaryButtonText(record) }}
            </wd-button>

            <!-- 查看详情按钮（所有状态都有） -->
            <wd-button
              :block="!shouldShowPrimaryButton(record)"
              :custom-class="shouldShowPrimaryButton(record) ? 'w-200rpx' : 'flex-1'"
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
              @click="viewConsultationDetail(record.id)"
            >
              查看详情
            </wd-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
