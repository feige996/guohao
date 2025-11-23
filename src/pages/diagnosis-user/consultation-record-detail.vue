<script setup lang="ts">
import type { Appointment } from '@/types2'
import { consultationRecords as mockConsultationRecords, mockDoctors } from '@/data'

import { AppointmentStatus, AssignMode, ConsultMode, ConsultType } from '@/types2'

definePage({
  style: {
    navigationBarTitleText: '问诊详情',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

// 记录ID
const recordId = ref<number>(0)
const record = ref<Appointment | null>(null)

// 排队弹窗状态
const showQueueModal = ref(false)

// 页面加载时获取记录详情
onLoad((options: any) => {
  if (options.id) {
    recordId.value = Number.parseInt(options.id)
    loadRecordDetail()
  }
})

// 加载记录详情
function loadRecordDetail() {
  const foundRecord = mockConsultationRecords.find(r => r.id === recordId.value)
  if (foundRecord) {
    record.value = foundRecord
  }
  else {
    uni.showToast({
      title: '记录不存在',
      icon: 'none',
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 取消问诊
function handleCancelConsultation() {
  uni.showModal({
    title: '确认取消',
    content: '确定要取消此次问诊吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '取消中...' })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({ title: '已取消问诊', icon: 'success' })
          setTimeout(() => uni.navigateBack(), 1500)
        }, 1000)
      }
    },
  })
}

// 获取医生信息
function getDoctorInfo() {
  if (!record.value || !record.value.doctorId) {
    return {
      name: '待分配医生',
      title: '主任医师',
      avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
      hospital: '系统匹配中',
      department: '',
    }
  }
  const doctor = mockDoctors[record.value.doctorId.toString()]
  return doctor || {
    name: '医生',
    title: '主任医师',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png',
    hospital: '医院',
    department: '科室',
  }
}

// 继续咨询
function continueConsultation() {
  if (!record.value)
    return
  const doctor = getDoctorInfo()
  uni.navigateTo({
    url: `/pages/im-chat?id=${record.value.id}&name=${doctor.name}&avatar=${doctor.avatar}&symptom=${record.value.symptoms || ''}`,
  })
}

// 查看排队状态
function viewQueueStatus() {
  if (!record.value)
    return
  showQueueModal.value = true
}

// 关闭排队弹窗
function closeQueueModal() {
  showQueueModal.value = false
}

// 获取排队状态文本
function getQueueStatusText() {
  if (!record.value || !record.value.queueNumber)
    return '等待中'
  const queueNumber = record.value.queueNumber
  if (queueNumber === 1) {
    return '即将开始'
  }
  else if (queueNumber <= 3) {
    return '请准备'
  }
  else {
    return '排队中'
  }
}

// 获取预计等待时间
function getEstimatedWaitTime() {
  if (!record.value || !record.value.queueNumber)
    return '计算中...'
  const queueNumber = record.value.queueNumber
  if (queueNumber === 1) {
    return '即将开始'
  }
  // 假设每个患者平均15分钟
  const minutes = (queueNumber - 1) * 15
  if (minutes < 60) {
    return `约 ${minutes} 分钟`
  }
  else {
    const hours = Math.floor(minutes / 60)
    const remainMinutes = minutes % 60
    return remainMinutes > 0 ? `约 ${hours} 小时 ${remainMinutes} 分钟` : `约 ${hours} 小时`
  }
}

// 支付处方
function handlePayment() {
  uni.showToast({ title: '跳转支付页面', icon: 'none' })
}

// 评价医生
function rateDoctor() {
  uni.showToast({ title: '评价功能', icon: 'none' })
}

// 查看记录（IM只读模式）
function viewRecord() {
  if (!record.value)
    return
  const doctor = getDoctorInfo()
  uni.navigateTo({
    url: `/pages/im-chat?id=${record.value.id}&name=${doctor.name}&avatar=${doctor.avatar}&symptom=${record.value.symptoms || ''}&viewOnly=true`,
  })
}

// 申请退款
function applyRefund() {
  uni.showModal({
    title: '申请退款',
    content: '确定要申请退款吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '退款申请已提交', icon: 'success' })
      }
    },
  })
}

// 上传图片
function uploadImage() {
  uni.chooseImage({
    count: 9,
    success: () => {
      uni.showToast({ title: '图片上传成功', icon: 'success' })
    },
  })
}

// 联系客服
function contactService() {
  uni.showToast({ title: '联系客服', icon: 'none' })
}

// 重新下单
function reorder() {
  uni.showToast({ title: '跳转下单页面', icon: 'none' })
}

// 获取派单模式文本
function getDispatchModeText() {
  if (!record.value)
    return ''
  if (record.value.consultMode === ConsultMode.DISPATCH) {
    if (record.value.assignMode === AssignMode.SMART)
      return '智能派单'
    if (record.value.assignMode === AssignMode.ASSIGN)
      return '指定医生'
  }
  if (record.value.consultMode === ConsultMode.CLINIC)
    return '在线坐诊'
  return ''
}

// 获取问诊方式文本
function getConsultationTypeText() {
  if (!record.value)
    return ''
  if (record.value.consultMode === ConsultMode.CLINIC) {
    if (record.value.consultType === ConsultType.VIDEO)
      return '视频问诊'
    if (record.value.consultType === ConsultType.VOICE)
      return '语音问诊'
  }
  return '图文问诊'
}

// 获取状态文本
function getStatusText() {
  if (!record.value)
    return ''
  const statusTextMap: Record<number, string> = {
    100: '等待支付',
    101: '支付处理中',
    102: '支付失败',
    200: '正在派单',
    201: '等待医生接单',
    202: '派单失败',
    300: '正在取号',
    301: '预约成功',
    302: '排队中',
    303: '医生呼叫中',
    304: '叫号失败',
    305: '重新排队中',
    400: '待接诊',
    401: '问诊进行中',
    402: '服务即将结束',
    500: '退款申请中',
    501: '退款审核中',
    502: '退款处理中',
    503: '退款失败',
    900: '已完成',
    901: '已退款',
    902: '已取消',
  }
  return statusTextMap[record.value.status] || '未知状态'
}

// 判断是否为智能派单且待分配
function isSmartWaiting() {
  if (!record.value)
    return false
  return record.value.consultMode === ConsultMode.DISPATCH
    && record.value.assignMode === AssignMode.SMART
    && !record.value.doctorId
}

function handleShowToast(text: string) {
  uni.showToast({ title: text, icon: 'none' })
}
</script>

<template>
  <view class="h-screen w-full flex flex-col bg-gray-50">
    <!-- 顶部导航 -->
    <view class="flex flex-shrink-0 items-center justify-between bg-white px-32rpx pb-20rpx pt-24rpx shadow-sm">
      <button class="h-68rpx w-68rpx flex items-center justify-center border-none bg-gray-100" @tap="goBack">
        <text class="text-32rpx text-gray-700 font-bold">←</text>
      </button>
      <text class="flex-1 text-center text-34rpx text-gray-900 font-bold">问诊详情</text>
      <view class="w-68rpx" />
    </view>

    <scroll-view v-if="record" class="flex-1" scroll-y>
      <view class="flex flex-col gap-16rpx p-24rpx">
        <!-- 状态卡片 -->
        <view
          class="overflow-hidden border-l-8rpx rounded-16rpx bg-white"
          :class="record.status === AppointmentStatus.CONSULTING || record.status === AppointmentStatus.QUEUING || record.status === AppointmentStatus.CALLING ? 'border-primary' : 'border-gray-200'"
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
                {{ getDispatchModeText() }}
              </view>
              <!-- 问诊类型标签 -->
              <view class="rounded-8rpx bg-gray-200 px-12rpx py-4rpx text-20rpx text-gray-700 font-medium">
                {{ getConsultationTypeText() }}
              </view>
              <!-- 排队号 -->
              <view v-if="record.queueNumber" class="rounded-8rpx bg-orange-500 px-12rpx py-4rpx text-20rpx text-white font-bold">
                {{ record.queueNumber }}号
              </view>
            </view>
            <!-- 状态标签 -->
            <view
              class="rounded-8rpx px-16rpx py-6rpx text-22rpx font-bold"
              :class="record.status === AppointmentStatus.WAITING_ACCEPT || record.status === AppointmentStatus.DISPATCHING ? 'bg-yellow-100 text-yellow-700'
                : record.status === AppointmentStatus.CONSULTING || record.status === AppointmentStatus.QUEUING || record.status === AppointmentStatus.CALLING ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'"
            >
              {{ getStatusText() }}
            </view>
          </view>
        </view>

        <!-- 医生信息卡片 -->
        <view v-if="!isSmartWaiting()" class="rounded-16rpx bg-white p-24rpx">
          <view class="mb-20rpx text-28rpx text-gray-900 font-bold">
            医生信息
          </view>
          <view class="flex items-center gap-20rpx">
            <image :src="getDoctorInfo().avatar" class="h-96rpx w-96rpx border-4rpx border-gray-100 rounded-full" mode="aspectFill" />
            <view class="flex flex-1 flex-col gap-8rpx">
              <text class="text-32rpx text-gray-900 font-bold">{{ getDoctorInfo().name }}</text>
              <text class="text-24rpx text-gray-600">{{ getDoctorInfo().title }}</text>
              <text class="text-22rpx text-gray-500">{{ getDoctorInfo().hospital }} · {{ getDoctorInfo().department }}</text>
            </view>
          </view>
        </view>

        <!-- 订单信息卡片 -->
        <view class="rounded-16rpx bg-white p-24rpx">
          <view class="mb-20rpx text-28rpx text-gray-900 font-bold">
            订单信息
          </view>
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center justify-between border-b border-gray-100 py-12rpx">
              <text class="text-24rpx text-gray-500">订单编号</text>
              <text class="text-24rpx text-gray-800 font-mono">{{ record.appointmentNo }}</text>
            </view>
            <view class="flex items-center justify-between border-b border-gray-100 py-12rpx">
              <text class="text-24rpx text-gray-500">创建时间</text>
              <text class="text-24rpx text-gray-800">{{ record.createTime || '刚刚' }}</text>
            </view>
            <view class="flex items-center justify-between border-b border-gray-100 py-12rpx">
              <text class="text-24rpx text-gray-500">问诊费用</text>
              <text class="text-28rpx text-primary font-bold">¥{{ record.actualAmount }}</text>
            </view>
            <view v-if="record.symptoms" class="flex flex-col gap-8rpx py-12rpx">
              <text class="text-24rpx text-gray-500">症状描述</text>
              <view class="rounded-12rpx bg-gray-50 px-20rpx py-16rpx">
                <text class="text-24rpx text-gray-700 leading-relaxed">{{ record.symptoms }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 处方状态卡片 -->
        <view v-if="record.prescriptionId || (record.status === AppointmentStatus.CONSULTING)" class="rounded-16rpx bg-white p-24rpx">
          <view class="mb-20rpx text-28rpx text-gray-900 font-bold">
            处方状态
          </view>
          <view
            class="rounded-12rpx px-20rpx py-16rpx"
            :class="record.prescriptionId && record.paymentCompleteStatus === 2 ? 'bg-green-50 border border-green-200'
              : record.prescriptionId ? 'bg-orange-50 border border-orange-200'
                : 'bg-gray-50 border border-gray-200'"
          >
            <text
              class="text-24rpx font-medium"
              :class="record.prescriptionId && record.paymentCompleteStatus === 2 ? 'text-green-700'
                : record.prescriptionId ? 'text-orange-700'
                  : 'text-gray-600'"
            >
              {{ record.prescriptionId ? (record.paymentCompleteStatus === 2 ? '✓ 已支付' : '⚠ 已开方待支付') : '⏱ 等待医生开方' }}
            </text>
          </view>
        </view>
      </view>

      <!-- 底部操作区（根据文档：详情页显示所有可能操作） -->
      <view class="flex flex-col gap-16rpx p-24rpx">
        <!-- 核心操作区 -->
        <view class="mb-8rpx text-24rpx text-gray-700 font-bold">
          核心操作
        </view>

        <!-- 100/102: 支付相关 -->
        <wd-button
          v-if="record.status === AppointmentStatus.PENDING_PAYMENT"
          type="primary"
          block
          custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
          @click="handlePayment"
        >
          去支付
        </wd-button>

        <wd-button
          v-if="record.status === AppointmentStatus.PAYMENT_FAILED"
          type="primary"
          block
          custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
          @click="handlePayment"
        >
          重新支付
        </wd-button>

        <!-- 303: 叫号中 - 立即进入 -->
        <wd-button
          v-if="record.status === AppointmentStatus.CALLING"
          type="error"
          block
          @click="continueConsultation"
        >
          立即进入
        </wd-button>

        <!-- 401: 进行中 - 继续问诊（进入IM） -->
        <wd-button
          v-if="record.status === AppointmentStatus.CONSULTING"
          type="primary"
          block
          custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
          @click="continueConsultation"
        >
          继续问诊（进入IM）
        </wd-button>

        <!-- 900: 已完成 - 查看记录（进入IM只读） -->
        <wd-button
          v-if="record.status === AppointmentStatus.COMPLETED"
          type="primary"
          block
          custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
          @click="viewRecord"
        >
          查看记录（IM只读）
        </wd-button>

        <!-- 辅助功能区 -->
        <view class="mt-16rpx">
          <view class="mb-8rpx text-24rpx text-gray-700 font-bold">
            辅助功能
          </view>
          <view class="flex flex-wrap gap-12rpx">
            <!-- 401: 上传图片 -->
            <wd-button
              v-if="record.status === AppointmentStatus.CONSULTING"
              custom-class="flex-1"
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
              @click="uploadImage"
            >
              上传图片
            </wd-button>

            <!-- 900: 评价医生 -->
            <wd-button
              v-if="record.status === AppointmentStatus.COMPLETED && !record.rating"
              custom-class="flex-1"
              custom-style="background: #fef3c7; color: #92400e; border: 1px solid #fde68a;"
              @click="rateDoctor"
            >
              ⭐ 评价医生
            </wd-button>

            <!-- 900/901/902: 再次咨询/重新下单 -->
            <wd-button
              v-if="record.status === AppointmentStatus.COMPLETED
                || record.status === AppointmentStatus.REFUNDED
                || record.status === AppointmentStatus.CANCELLED"
              custom-class="flex-1"
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
              @click="reorder"
            >
              再次咨询
            </wd-button>

            <!-- 302/305: 查看排队 -->
            <wd-button
              v-if="record.status === AppointmentStatus.QUEUING || record.status === AppointmentStatus.RECALL_QUEUING"
              custom-class="flex-1"
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
              @click="viewQueueStatus"
            >
              查看排队进度
            </wd-button>

            <!-- 200/201/302/305/400: 申请退款 -->
            <wd-button
              v-if="record.status === AppointmentStatus.DISPATCHING
                || record.status === AppointmentStatus.WAITING_ACCEPT
                || record.status === AppointmentStatus.QUEUING
                || record.status === AppointmentStatus.RECALL_QUEUING
                || record.status === AppointmentStatus.WAITING_CONSULT"
              custom-class="flex-1"
              custom-style="background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;"
              @click="applyRefund"
            >
              申请退款
            </wd-button>

            <!-- 100/102: 取消订单 -->
            <wd-button
              v-if="record.status === AppointmentStatus.PENDING_PAYMENT
                || record.status === AppointmentStatus.PAYMENT_FAILED"
              custom-class="flex-1"
              custom-style="background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb;"
              @click="handleCancelConsultation"
            >
              取消订单
            </wd-button>

            <!-- 503: 联系客服 -->
            <wd-button
              v-if="record.status === AppointmentStatus.REFUND_FAILED"
              custom-class="flex-1"
              type="error"
              @click="contactService"
            >
              联系客服
            </wd-button>
          </view>
        </view>

        <!-- 信息查看区 -->
        <view class="mt-16rpx">
          <view class="mb-8rpx text-24rpx text-gray-700 font-bold">
            信息查看
          </view>
          <view class="flex flex-col gap-8rpx">
            <view v-if="record.doctorId" class="flex items-center justify-between rounded-12rpx bg-gray-50 px-16rpx py-12rpx active:bg-gray-100" @tap="handleShowToast('查看医生详细信息')">
              <text class="text-24rpx text-gray-700">查看医生详细信息</text>
              <text class="text-24rpx text-gray-400">></text>
            </view>
            <view class="flex items-center justify-between rounded-12rpx bg-gray-50 px-16rpx py-12rpx active:bg-gray-100" @tap="handleShowToast('查看订单详情')">
              <text class="text-24rpx text-gray-700">查看订单详细信息</text>
              <text class="text-24rpx text-gray-400">></text>
            </view>
            <view v-if="record.prescriptionId" class="flex items-center justify-between rounded-12rpx bg-gray-50 px-16rpx py-12rpx active:bg-gray-100" @tap="handleShowToast('查看处方详情')">
              <text class="text-24rpx text-gray-700">查看处方详情</text>
              <text class="text-24rpx text-gray-400">></text>
            </view>
            <view v-if="record.status === AppointmentStatus.COMPLETED" class="flex items-center justify-between rounded-12rpx bg-gray-50 px-16rpx py-12rpx active:bg-gray-100" @tap="handleShowToast('查看完整病历')">
              <text class="text-24rpx text-gray-700">查看完整病历</text>
              <text class="text-24rpx text-gray-400">></text>
            </view>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>

    <!-- 排队状态弹窗 -->
    <view v-if="showQueueModal && record" class="fixed inset-0 z-200 flex items-center justify-center bg-black/50 p-32rpx" @tap="closeQueueModal">
      <view class="max-w-600rpx w-full flex flex-col overflow-hidden rounded-24rpx bg-white" @tap.stop>
        <view class="flex items-center justify-between border-b border-gray-200 px-32rpx py-24rpx">
          <text class="text-32rpx text-gray-800 font-bold">排队状态</text>
          <button class="h-56rpx w-56rpx flex items-center justify-center rounded-full border-none bg-gray-100 transition-all active:bg-gray-200" @tap="closeQueueModal">
            <text class="text-32rpx text-gray-600 font-bold">✕</text>
          </button>
        </view>

        <view class="flex flex-col gap-32rpx p-32rpx">
          <!-- 排队号码 -->
          <view class="flex flex-col items-center gap-16rpx">
            <text class="text-24rpx text-gray-500">当前排队号</text>
            <view class="flex items-baseline gap-8rpx">
              <text class="text-96rpx text-primary font-bold">{{ record.queueNumber || 0 }}</text>
              <text class="text-36rpx text-gray-500">号</text>
            </view>
            <view class="rounded-full px-24rpx py-12rpx text-24rpx font-semibold" :class="record.queueNumber === 1 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'">
              {{ getQueueStatusText() }}
            </view>
          </view>

          <!-- 医生信息 -->
          <view class="flex items-center gap-20rpx rounded-16rpx bg-gray-50 p-20rpx">
            <image :src="getDoctorInfo().avatar" class="h-80rpx w-80rpx rounded-full" mode="aspectFill" />
            <view class="flex flex-1 flex-col gap-8rpx">
              <text class="text-28rpx text-gray-800 font-bold">{{ getDoctorInfo().name }}</text>
              <text class="text-24rpx text-gray-600">{{ getDoctorInfo().title }}</text>
            </view>
          </view>

          <!-- 等待信息 -->
          <view class="flex flex-col gap-16rpx">
            <view class="flex items-center gap-16rpx rounded-12rpx bg-blue-50 p-20rpx">
              <text class="text-32rpx">⏰</text>
              <view class="flex flex-1 flex-col gap-4rpx">
                <text class="text-22rpx text-gray-500">预计等待</text>
                <text class="text-26rpx text-blue-600 font-bold">{{ getEstimatedWaitTime() }}</text>
              </view>
            </view>
            <view class="flex items-center gap-16rpx rounded-12rpx bg-green-50 p-20rpx">
              <text class="text-32rpx">📋</text>
              <view class="flex flex-1 flex-col gap-4rpx">
                <text class="text-22rpx text-gray-500">问诊方式</text>
                <text class="text-26rpx text-green-600 font-bold">{{ getConsultationTypeText() }}</text>
              </view>
            </view>
          </view>

          <!-- 温馨提示 -->
          <view class="flex flex-col gap-12rpx border border-yellow-200 rounded-12rpx bg-yellow-50 p-20rpx">
            <text class="text-24rpx text-yellow-700 font-semibold">💡 温馨提示</text>
            <text class="text-22rpx text-gray-600 leading-relaxed">请保持手机畅通，轮到您时系统会自动通知</text>
            <text v-if="record.queueNumber && record.queueNumber <= 3" class="text-22rpx text-red-600 font-semibold">
              您的号码即将叫号，请做好准备！
            </text>
          </view>
        </view>

        <view class="px-32rpx pb-32rpx">
          <wd-button
            type="primary"
            block
            custom-style="background: linear-gradient(135deg, #8e4337 0%, #6d3329 100%); border: none;"
            @click="closeQueueModal"
          >
            知道了
          </wd-button>
        </view>
      </view>
    </view>
  </view>
</template>
