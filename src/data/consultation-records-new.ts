/**
 * 问诊记录数据（对应后端 app_AppointmentV2）
 * 覆盖所有状态码、两种模式、三种问诊方式的演示数据
 */

import type { Appointment } from '@/types2'
import { AppointmentStatus, AssignMode, ConsultMode, ConsultType } from '@/types2'

/**
 * 问诊订单演示数据
 *
 * 状态分类：
 * - 1xx: 支付相关状态
 * - 2xx: 派单模式专属状态
 * - 3xx: 坐诊模式专属状态
 * - 4xx: 问诊服务状态（通用）
 * - 5xx: 退款相关状态
 * - 9xx: 终止状态
 *
 * 问诊模式：
 * - 派单模式（DISPATCH）：智能匹配、指定医生
 * - 坐诊模式（CLINIC）：在线坐诊
 *
 * 问诊类型：
 * - 图文问诊（TEXT）
 * - 视频问诊（VIDEO）
 * - 语音问诊（VOICE）
 */
export const consultationRecords: Appointment[] = [

  // ==================== 1xx: 支付相关状态 ====================

  // 100 - 待支付 - 派单模式 - 图文问诊
  {
    id: 101,
    appointmentNo: 'APT202411170101',
    patientId: 10001,
    consultMode: ConsultMode.DISPATCH,
    consultType: ConsultType.TEXT,
    originalConsultType: ConsultType.TEXT,
    isUpgraded: false,
    upgradeCount: 0,
    assignMode: AssignMode.SMART,
    status: AppointmentStatus.PENDING_PAYMENT,
    symptoms: '最近总是失眠多梦，睡眠质量很差',
    categoryTag: ['失眠多梦'],
    amount: 99,
    discountAmount: 0,
    actualAmount: 99,
    upgradeAmount: 0,
    totalPaidAmount: 0,
    paymentCompleteStatus: 0,
    needPrescription: false,
    refundStatus: 0,
    createTime: '2024-11-17 14:30',
  },

  // 102 - 支付失败 - 坐诊模式 - 视频问诊
  {
    id: 102,
    appointmentNo: 'APT202411170102',
    patientId: 10001,
    doctorId: 5,
    consultMode: ConsultMode.CLINIC,
    consultType: ConsultType.VIDEO,
    originalConsultType: ConsultType.VIDEO,
    isUpgraded: false,
    upgradeCount: 0,
    clinicRoomId: 1001,
    status: AppointmentStatus.PAYMENT_FAILED,
    symptoms: '腰椎间盘突出，需要复查',
    categoryTag: ['腰痛腿痛'],
    amount: 189,
    discountAmount: 0,
    actualAmount: 189,
    upgradeAmount: 0,
    totalPaidAmount: 0,
    paymentCompleteStatus: 0,
    needPrescription: false,
    refundStatus: 0,
    createTime: '2024-11-17 13:45',
  },
]

// 导出别名，保持向后兼容
export const appointmentRecords = consultationRecords
