// ==================== 枚举定义（对应后端） ====================

// 医生状态枚举
export enum DoctorStatus {
  CONSULTING = 'consulting', // 正在问诊
  AVAILABLE = 'available'    // 可以预约
}

// 问诊类型枚举（对应后端 ConsultTypeEnum）
export enum ConsultType {
  TEXT = 1,    // 图文问诊
  VIDEO = 2,   // 视频问诊
  VOICE = 3    // 语音问诊
}

// 问诊模式枚举（对应后端 ConsultModeEnum）
export enum ConsultMode {
  DISPATCH = 1, // 派单模式
  CLINIC = 2    // 坐诊模式
}

// 派单方式枚举（对应后端 AssignModeEnum）
export enum AssignMode {
  SMART = 1,   // 智能匹配
  ASSIGN = 2   // 指定医生
}

// 问诊订单状态枚举（对应后端 AppointmentStatusV2Enum）
// 状态码规范：1xx-支付 2xx-派单 3xx-坐诊 4xx-问诊 5xx-退款 9xx-终止
export enum AppointmentStatus {
  // 1xx: 支付相关状态
  PENDING_PAYMENT = 100,        // 待支付
  PAYING = 101,                 // 支付中
  PAYMENT_FAILED = 102,         // 支付失败
  
  // 2xx: 派单模式专属状态
  DISPATCHING = 200,            // 派单中
  WAITING_ACCEPT = 201,         // 待接单
  DISPATCH_FAILED = 202,        // 派单失败
  
  // 3xx: 坐诊模式专属状态
  TAKING_NUMBER = 300,          // 取号中
  APPOINTMENT_PENDING = 301,    // 预约待生效
  QUEUING = 302,                // 排队中
  CALLING = 303,                // 叫号中
  CALL_FAILED = 304,            // 叫号失败
  RECALL_QUEUING = 305,         // 过号重排
  
  // 4xx: 问诊服务状态（通用）
  WAITING_CONSULT = 400,        // 待接诊
  CONSULTING = 401,             // 进行中
  SERVICE_TIMEOUT = 402,        // 服务超时
  
  // 5xx: 退款相关状态
  REFUND_APPLYING = 500,        // 退款申请中
  REFUND_REVIEWING = 501,       // 退款审核中
  REFUND_PROCESSING = 502,      // 退款处理中
  REFUND_FAILED = 503,          // 退款失败
  
  // 9xx: 终止状态
  COMPLETED = 900,              // 已完成
  REFUNDED = 901,               // 已退款
  CANCELLED = 902               // 已取消
}

// 支付方式枚举
export enum PaymentMethod {
  WECHAT = 'wechat', // 微信支付
  ALIPAY = 'alipay'  // 支付宝支付
}

// 操作类型枚举
export enum ActionType {
  QUEUE = 'queue',           // 取号
  APPOINTMENT = 'appointment' // 预约
}

// 科室专科枚举（对应后端 AppDepartmentEnum 部分常用科室）
export enum Department {
  BONE = 1,           // 中医骨科
  INTERNAL = 2,       // 中医内科
  GYNECOLOGY = 4,     // 中医妇科
  PEDIATRICS = 7,     // 中医儿科
  ANDROLOGY = 8,      // 中医男科
  PAIN = 9,           // 疼痛科
  SURGERY = 10,       // 中医外科
  DERMATOLOGY = 11,   // 皮肤外科
  ENT = 12,           // 耳鼻喉科
  ACUPUNCTURE = 17,   // 中医针灸
  PSYCHOLOGY = 19,    // 精神心理
  GENERAL = 23,       // 中医全科
  CARDIOVASCULAR = 61,// 心血管
  DIGESTIVE = 63,     // 消化道
  DIABETES = 64       // 糖尿病
}

// 前端展示用的问诊方式枚举（兼容旧代码）
export enum ConsultationMethod {
  TEXT_IMAGE = 'text-image', // 图文问诊
  VOICE = 'voice',           // 语音问诊
  VIDEO = 'video'            // 视频问诊
}

// 前端展示用的派单方式枚举（兼容旧代码）
export enum DispatchMode {
  SMART = 'smart',   // 智能推荐
  ASSIGN = 'assign', // 指定医生
  CLINIC = 'clinic'  // 在线坐诊
}

// ==================== 接口定义 ====================

// 医生基础信息接口（对应后端 app_DoctorAuditing）
export interface Doctor {
  id: number;
  userId: number;                    // 用户ID
  name: string;                      // 医生姓名（来自 app_User.NickName）
  avatar: string;                    // 头像
  title: string;                     // 职称 Job_title
  department: string;                // 部门
  hospital: string;                  // 医院名称
  fields?: Department[];             // 擅长领域（枚举数组）
  specialty?: string[];              // 擅长领域（字符串数组,用于展示）
  goodAt?: string[];                 // 擅长领域（兼容旧字段）
  introduction?: string;             // 个人简介
  workingYears?: number;             // 从业年限
  years?: number;                    // 从业年限（兼容旧字段）
  education?: string;                // 教育背景
  certificates?: string[];           // 资质证书
  isOnline?: boolean;                // 是否在线
  responseRate?: number;             // 响应率（百分比）

  // 问诊费用
  textConsultationFee?: number;      // 图文问诊费用
  textConsultationEnabled?: boolean; // 是否开启图文问诊
  videoConsultationFee?: number;     // 视频问诊费用
  videoConsultationEnabled?: boolean;// 是否开启视频问诊
  audioConsultationFee?: number;     // 语音问诊费用
  audioConsultationEnabled?: boolean;// 是否开启语音问诊
  
  // 统计数据
  avgRatingScore?: number;           // 评价平均分
  totalReviews?: number;             // 评价总数
  consultationCount?: number;        // 接诊人次
  satisfactionRate?: number;         // 满意度（百分比）
  responseSpeed?: string;            // 接诊速度
  
  // 兼容旧字段
  rating?: number;                   // 评分（兼容）
  consultations?: number;            // 问诊次数（兼容）
  consultationFee?: number;          // 问诊费用（兼容）
  responseTime?: string;             // 响应时间（兼容）
  consultationMethods?: ConsultationMethod[]; // 医生支持的问诊方式（兼容）
}

// 在线坐诊医生接口（扩展医生信息）
export interface ClinicDoctor extends Doctor {
  status: DoctorStatus;              // 医生状态
  totalSlots: number;                // 总号源数
  usedSlots: number;                 // 已用号源数
  currentNumber?: number;            // 当前叫号
  waitingCount?: number;             // 等待人数
  scheduledTime?: string;            // 坐诊时间
  price: number;                     // 问诊价格
  clinicRoomId?: number;             // 诊室ID
}

// 健康问题/问诊类型接口
export interface ConsultationType {
  id: string;
  label: string;
  category: string;                  // 分类（中医调理、妇科等）
  departmentEnum?: Department;       // 对应的科室枚举
}

// 问诊方式选项接口
export interface ConsultationMethodOption {
  id: ConsultationMethod;
  title: string;
  description: string;
  icon: string;
  price: number;
  badge?: string;
  duration: number;
  durationUnit: 'hours' | 'minutes';
}

// 派单选项接口
export interface DispatchOption {
  id: DispatchMode;
  title: string;
  description: string;
  badge?: string;
}

// 支付方式选项接口
export interface PaymentMethodOption {
  id: PaymentMethod;
  title: string;
  subtitle: string;
  bgColor: string;
  iconType: string;
}

// Tab选项接口
export interface TabOption {
  key: string;
  label: string;
}

// 患者状态接口
export interface PatientStatus {
  queuedDoctors: number[];    // 已取号的医生ID
  appointedDoctors: number[]; // 已预约的医生ID
}

// 问诊订单接口（对应后端 app_AppointmentV2）
export interface Appointment {
  id: number;
  appointmentNo: string;             // 订单号
  patientId: number;                 // 患者ID
  doctorId?: number;                 // 医生ID
  consultMode: ConsultMode;          // 问诊模式
  consultType: ConsultType;          // 问诊类型
  originalConsultType: ConsultType;  // 原始问诊类型
  isUpgraded: boolean;               // 是否已升级
  upgradeCount: number;              // 升级次数
  
  // 派单模式字段
  assignMode?: AssignMode;           // 派单方式
  specifiedDoctorId?: number;        // 指定医生ID
  assignExpireTime?: string;         // 派单超时时间
  acceptTime?: string;               // 医生接单时间
  
  // 坐诊模式字段
  clinicRoomId?: number;             // 诊室ID
  queueNumber?: number;              // 排队号码
  queueTime?: string;                // 取号时间
  callCount?: number;                // 叫号次数
  lastCallTime?: string;             // 最后叫号时间
  patientResponseTime?: string;      // 患者响应时间（接听叫号的时间）
  
  // 订单状态
  status: AppointmentStatus;         // 订单状态
  
  // 问诊信息
  startTime?: string;                // 问诊开始时间
  endTime?: string;                  // 问诊结束时间
  actualDuration?: number;           // 实际时长（分钟）
  validUntil?: string;               // 问诊有效期
  symptoms?: string;                 // 症状描述
  medicalHistory?: string;           // 既往病史
  allergyHistory?: string;           // 过敏史
  categoryTag?: string[];            // 健康问题标签
  symptomImages?: string[];          // 症状图片
  diagnosis?: string;                // 诊断结果
  syndromeType?: string;             // 辨证分型
  syndromeAnalysis?: string;         // 辨证分析
  treatmentPlan?: string;            // 治疗建议
  careAdvice?: string;               // 调护建议
  notes?: string;                    // 注意事项
  
  // 金额
  amount: number;                    // 问诊价格
  discountAmount: number;            // 优惠金额
  actualAmount: number;              // 实付金额
  refundAmount?: number;             // 退款金额
  overtimeAmount?: number;           // 超时计费金额
  upgradeAmount: number;             // 升级补差价总额
  totalPaidAmount: number;           // 总支付金额
  
  // 支付信息
  firstPaymentMethod?: string;       // 首次支付方式
  firstPaymentTime?: string;         // 首次支付时间
  paymentCompleteStatus: number;     // 支付完成状态
  
  // 处方
  prescriptionId?: number;           // 处方ID
  needPrescription: boolean;         // 是否需要开处方
  
  // 评价
  rating?: number;                   // 患者评分
  comment?: string;                  // 患者评价内容
  commentTime?: string;              // 评价时间
  
  // 取消和退款
  cancelReason?: string;             // 取消原因
  cancelTime?: string;               // 取消时间
  refundStatus: number;              // 退款状态
  refundTime?: string;               // 退款时间
  
  // 其他
  remark?: string;                   // 备注
  createTime?: string;               // 创建时间
}

// 患者档案接口（对应后端 app_User 实体）
export interface PatientProfile {
  // 基本信息
  id?: number;                       // 用户ID
  username?: string;                 // 用户名
  nickName?: string;                 // 昵称
  avatar?: string;                   // 头像
  sex: number;                       // 性别：0-未知 1-男性 2-女性
  age?: number;                      // 年龄
  birthday?: string;                 // 出生日期
  introduction?: string;             // 个人简介
  
  // 联系方式
  mobile?: string;                   // 手机号码
  mobileConfirmed?: number;          // 手机号验证状态
  email?: string;                    // 邮箱地址
  emailConfirmed?: number;           // 邮箱验证状态
  
  // 地址信息
  country?: string;                  // 国家
  province?: string;                 // 省
  city?: string;                     // 城市
  address?: string;                  // 详细地址
  
  // 身份信息
  nation?: string;                   // 民族
  cardType?: number;                 // 证件类型
  idCardNum?: string;                // 身份证号
  
  // 紧急联系人
  emergencyContact?: string;         // 紧急联系人
  emergencyPhone?: string;           // 紧急联系人电话
  emergencyAddress?: string;         // 紧急联系人地址
  
  // 健康信息
  healthCondition?: string;          // 健康状况
  chiefComplaint?: string;           // 主诉
  presentIllness?: string;           // 现病史
  allergyHistory?: string;           // 过敏史
  medicalHistory?: string;           // 病史
  westernDiagnosis?: string;         // 西医诊断
  chineseDiagnosis?: string;         // 中医诊断
  constitutionType?: string;         // 体质类型
  familyMedicalHistory?: string;     // 家族病史
  
  // 地域信息（健康档案）
  birthPlace?: string;               // 籍贯（省份）
  livingProvince?: string;           // 长期生活省份
  livingCity?: string;               // 长期生活城市
  
  // 身体指标
  height?: number;                   // 身高（cm）
  weight?: number;                   // 体重（kg）
  bloodType?: string;                // 血型
  
  // 生活习惯
  dietHabits?: string;               // 饮食习惯
  exerciseHabits?: string;           // 运动习惯
  sleepCondition?: string;           // 睡眠情况
  isSmoker?: boolean;                // 是否吸烟
  isDrinker?: boolean;               // 是否喝酒
  
  // 健康目标
  healthGoals?: string;              // 健康目标
}

// 兼容旧代码的类型别名
export type HealthProfile = PatientProfile;
