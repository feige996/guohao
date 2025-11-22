import type { Doctor, ClinicDoctor } from '@/types';
import { DoctorStatus, Department } from '@/types';

// 基础医生数据（用于consultation-order等页面）
// 对应后端 app_DoctorAuditing 结构
export const mockDoctors: Record<string, Doctor> = {
  "1": {
    id: 1,
    userId: 1001,
    name: "陈广志",
    avatar: "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg",
    title: "主任医师",
    department: "内分泌科",
    hospital: "佛山中医院",
    fields: [Department.INTERNAL, Department.DIABETES],
    specialty: ["糖尿病", "甲状腺疾病", "骨质疏松", "肥胖症"],
    goodAt: ["糖尿病", "甲状腺疾病", "骨质疏松", "肥胖症"],
    introduction: "从事内分泌临床工作20余年,擅长中西医结合治疗糖尿病及其并发症",
    workingYears: 22,
    years: 22,
    education: "北京中医药大学博士,师从国医大师李某某教授,曾赴美国哈佛医学院进修内分泌专业",
    certificates: ["执业医师资格证", "主任医师职称证书", "内分泌专科医师证", "糖尿病专病认证"],
    isOnline: true,
    responseRate: 98,
    
    // 问诊费用
    textConsultationFee: 99,
    textConsultationEnabled: true,
    videoConsultationFee: 199,
    videoConsultationEnabled: true,
    audioConsultationFee: 149,
    audioConsultationEnabled: true,
    
    // 统计数据
    avgRatingScore: 4.9,
    totalReviews: 2856,
    consultationCount: 56800,
    satisfactionRate: 98,
    responseSpeed: "较快",
    
    // 兼容旧字段
    rating: 4.9,
    consultations: 56800,
    consultationFee: 99,
    responseTime: "通常在 6 小时内回复",
  },
  "2": {
    id: 2,
    userId: 1002,
    name: "李明华",
    avatar: "https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg",
    title: "主任医师",
    department: "心血管科",
    hospital: "广州中医院",
    fields: [Department.CARDIOVASCULAR, Department.INTERNAL],
    specialty: ["冠心病", "高血压", "心律失常", "心力衰竭"],
    goodAt: ["冠心病", "高血压", "心律失常", "心力衰竭"],
    introduction: "中医心血管专家,擅长中医药调理心血管疾病",
    workingYears: 18,
    years: 18,
    education: "广州中医药大学硕士,中国中医科学院心血管病研究所访问学者",
    certificates: ["执业医师资格证", "主任医师职称证书", "心血管内科专科医师证"],
    isOnline: false,
    responseRate: 97,
    
    textConsultationFee: 89,
    textConsultationEnabled: true,
    videoConsultationFee: 189,
    videoConsultationEnabled: true,
    audioConsultationFee: 139,
    audioConsultationEnabled: true,
    
    avgRatingScore: 4.8,
    totalReviews: 2123,
    consultationCount: 42300,
    satisfactionRate: 97,
    responseSpeed: "较快",
    
    rating: 4.8,
    consultations: 42300,
    consultationFee: 89,
    responseTime: "通常在 8 小时内回复",
  },
  "3": {
    id: 3,
    userId: 1003,
    name: "张仲景",
    avatar: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_640.jpg",
    title: "副主任医师",
    department: "中医内科",
    hospital: "北京中医院",
    fields: [Department.INTERNAL, Department.DIGESTIVE],
    specialty: ["失眠", "胃肠病", "感冒", "调理"],
    goodAt: ["失眠", "胃肠病", "感冒", "调理"],
    introduction: "中医内科专家，擅长脾胃病、失眠等常见病的中医调理",
    workingYears: 15,
    years: 15,
    education: "上海中医药大学硕士,师从著名脾胃病专家王某某教授",
    certificates: ["执业医师资格证", "副主任医师职称证书", "中医内科专科医师证"],
    isOnline: true,
    responseRate: 96,
    
    textConsultationFee: 79,
    textConsultationEnabled: true,
    videoConsultationFee: 169,
    videoConsultationEnabled: true,
    audioConsultationFee: 129,
    audioConsultationEnabled: false,
    
    avgRatingScore: 4.7,
    totalReviews: 1605,
    consultationCount: 32100,
    satisfactionRate: 96,
    responseSpeed: "较快",
    
    rating: 4.7,
    consultations: 32100,
    consultationFee: 79,
    responseTime: "通常在 4 小时内回复",
  },
  "4": {
    id: 4,
    userId: 1004,
    name: "华佗",
    avatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg",
    title: "主治医师",
    department: "针灸科",
    hospital: "上海中医院",
    fields: [Department.ACUPUNCTURE, Department.PAIN],
    specialty: ["颈椎病", "肩周炎", "腰椎间盘突出", "膝关节炎"],
    goodAt: ["颈椎病", "肩周炎", "腰椎间盘突出", "膝关节炎"],
    introduction: "针灸推拿专家，擅长运用针灸、推拿治疗各类痛症",
    workingYears: 12,
    years: 12,
    education: "南京中医药大学学士,曾赴韩国学习针灸技术",
    certificates: ["执业医师资格证", "主治医师职称证书", "针灸推拿专科医师证"],
    isOnline: false,
    responseRate: 95,
    
    textConsultationFee: 69,
    textConsultationEnabled: true,
    videoConsultationFee: 159,
    videoConsultationEnabled: true,
    audioConsultationFee: 119,
    audioConsultationEnabled: true,
    
    avgRatingScore: 4.6,
    totalReviews: 1280,
    consultationCount: 25600,
    satisfactionRate: 95,
    responseSpeed: "一般",
    
    rating: 4.6,
    consultations: 25600,
    consultationFee: 69,
    responseTime: "通常在 3 小时内回复",
  },
};

// 在线坐诊医生数据（用于online-clinic页面）
// 扩展自基础医生数据，增加坐诊相关字段
export const clinicDoctors: ClinicDoctor[] = [
  {
    ...mockDoctors["1"],
    status: DoctorStatus.CONSULTING,
    totalSlots: 20,
    usedSlots: 15,
    currentNumber: 8,
    waitingCount: 7,
    price: 99,
    clinicRoomId: 1001,
  },
  {
    ...mockDoctors["2"],
    status: DoctorStatus.CONSULTING,
    totalSlots: 15,
    usedSlots: 15, // 已排满
    currentNumber: 12,
    waitingCount: 3,
    price: 89,
    clinicRoomId: 1002,
  },
  {
    ...mockDoctors["3"],
    status: DoctorStatus.AVAILABLE,
    totalSlots: 12,
    usedSlots: 8,
    scheduledTime: "14:00-17:00",
    price: 79,
    clinicRoomId: 1003,
  },
  {
    ...mockDoctors["4"],
    status: DoctorStatus.AVAILABLE,
    totalSlots: 10,
    usedSlots: 10, // 已排满
    scheduledTime: "15:30-18:00",
    price: 69,
    clinicRoomId: 1004,
  }
];

// 导出单个医生数据的辅助函数
export const getDoctorById = (id: number): Doctor | undefined => {
  return mockDoctors[id.toString()];
};

// 导出在线坐诊医生的辅助函数
export const getClinicDoctorById = (id: number): ClinicDoctor | undefined => {
  return clinicDoctors.find(doctor => doctor.id === id);
};
