import type {
  ConsultationMethodOption,
  ConsultationType,
  DispatchOption,
  PatientStatus,
  PaymentMethodOption,
  TabOption,
} from '@/types2'
import { ConsultationMethod, Department, DispatchMode, PaymentMethod } from '@/types2'

// 健康问题数据（对应后端 AppDepartmentEnum）
export const healthConcerns: ConsultationType[] = [
  { id: 'constitution', label: '体质调理', category: '中医调理', departmentEnum: Department.GENERAL },
  { id: 'gynecology', label: '妇科调养', category: '妇科', departmentEnum: Department.GYNECOLOGY },
  { id: 'sleep', label: '失眠多梦', category: '神志病', departmentEnum: Department.PSYCHOLOGY },
  { id: 'headache', label: '头痛头晕', category: '神志病', departmentEnum: Department.INTERNAL },
  { id: 'cough', label: '咳嗽咳痰', category: '肺系病', departmentEnum: Department.INTERNAL },
  { id: 'asthma', label: '哮喘气短', category: '肺系病', departmentEnum: Department.INTERNAL },
  { id: 'cold', label: '感冒发热', category: '外感病', departmentEnum: Department.INTERNAL },
  { id: 'rhinitis', label: '鼻炎鼻塞', category: '五官病', departmentEnum: Department.ENT },
  { id: 'pharyngitis', label: '咽喉肿痛', category: '五官病', departmentEnum: Department.ENT },
  { id: 'stomachache', label: '胃痛胃胀', category: '脾胃病', departmentEnum: Department.DIGESTIVE },
  { id: 'diarrhea', label: '腹泻便溶', category: '脾胃病', departmentEnum: Department.DIGESTIVE },
  { id: 'constipation', label: '便秘', category: '脾胃病', departmentEnum: Department.DIGESTIVE },
  { id: 'palpitation', label: '心悸胸闷', category: '心系病', departmentEnum: Department.CARDIOVASCULAR },
  { id: 'hypertension', label: '高血压', category: '心系病', departmentEnum: Department.CARDIOVASCULAR },
  { id: 'backpain', label: '腰痛腿痛', category: '筋骨病', departmentEnum: Department.BONE },
  { id: 'neckpain', label: '颈肩疼痛', category: '筋骨病', departmentEnum: Department.BONE },
  { id: 'arthritis', label: '关节疼痛', category: '筋骨病', departmentEnum: Department.BONE },
  { id: 'eczema', label: '湿疹皮炎', category: '皮肤病', departmentEnum: Department.DERMATOLOGY },
  { id: 'acne', label: '痤疮粉刺', category: '皮肤病', departmentEnum: Department.DERMATOLOGY },
  { id: 'menstrual', label: '月经不调', category: '妇科', departmentEnum: Department.GYNECOLOGY },
  { id: 'leukorrhea', label: '带下异常', category: '妇科', departmentEnum: Department.GYNECOLOGY },
  { id: 'infertility', label: '不孕不育', category: '妇科', departmentEnum: Department.GYNECOLOGY },
  { id: 'impotence', label: '阳痿早泄', category: '男科', departmentEnum: Department.ANDROLOGY },
  { id: 'prostatitis', label: '前列腺炎', category: '男科', departmentEnum: Department.ANDROLOGY },
  { id: 'kidney', label: '肾虚腰酸', category: '肾系病', departmentEnum: Department.INTERNAL },
  { id: 'urinary', label: '尿频尿急', category: '肾系病', departmentEnum: Department.INTERNAL },
  { id: 'diabetes', label: '糖尿病调理', category: '内分泌', departmentEnum: Department.DIABETES },
  { id: 'obesity', label: '肥胖减重', category: '内分泌', departmentEnum: Department.INTERNAL },
  { id: 'fatigue', label: '乏力疲劳', category: '虚劳病', departmentEnum: Department.GENERAL },
  { id: 'sweating', label: '自汗盗汗', category: '虚劳病', departmentEnum: Department.INTERNAL },
  { id: 'anxiety', label: '焦虑抑郁', category: '神志病', departmentEnum: Department.PSYCHOLOGY },
  { id: 'other', label: '其他症状', category: '其他', departmentEnum: Department.GENERAL },
]

// 问诊方式选项
export const consultationMethods: ConsultationMethodOption[] = [
  {
    id: ConsultationMethod.TEXT_IMAGE,
    title: '图文问诊',
    description: '通过文字、图片与医生交流',
    icon: '💬',
    price: 99,
    badge: '推荐',
    duration: 72,
    durationUnit: 'hours',
  },
  {
    id: ConsultationMethod.VOICE,
    title: '语音问诊',
    description: '通过语音通话与医生交流',
    icon: '🎙️',
    price: 149,
    badge: '实时',
    duration: 30,
    durationUnit: 'minutes',
  },
  {
    id: ConsultationMethod.VIDEO,
    title: '视频问诊',
    description: '与医生面对面实时视频通话',
    icon: '📹',
    price: 199,
    badge: '实时',
    duration: 30,
    durationUnit: 'minutes',
  },
]

// 派单方式选项
export const dispatchOptions: DispatchOption[] = [
  {
    id: DispatchMode.SMART,
    title: '智能推荐（推荐）',
    description: '系统匹配 3-5 位专业医生，2 小时内响应',
    badge: '推荐',
  },
  {
    id: DispatchMode.ASSIGN,
    title: '指定医生',
    description: '选择您信任的医生，6~24 小时响应',
    badge: '',
  },
  {
    id: DispatchMode.CLINIC,
    title: '在线坐诊',
    description: '直接预约在线专家医生，即时问诊',
    badge: '热门',
  },
]

// 支付方式选项
export const paymentMethods: PaymentMethodOption[] = [
  {
    id: PaymentMethod.WECHAT,
    title: '微信支付',
    subtitle: '安全快捷',
    bgColor: '#F7F7F7',
    iconType: 'wechat',
  },
  {
    id: PaymentMethod.ALIPAY,
    title: '支付宝支付',
    subtitle: '便捷支付',
    bgColor: '#F7F7F7',
    iconType: 'alipay',
  },
]

// Tab选项（在线坐诊页面）
export const clinicTabOptions: TabOption[] = [
  { key: 'consulting', label: '正在问诊' },
  { key: 'available', label: '可以预约' },
  { key: 'myAppointments', label: '我的预约' },
]

// 模拟患者状态
export const mockPatientStatus: PatientStatus = {
  queuedDoctors: [2], // 已取号的医生ID
  appointedDoctors: [4], // 已预约的医生ID
}
