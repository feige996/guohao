// 科室和全部医生数据

import type { Doctor } from '@/types2'
import { Department } from '@/types2'
import { mockDoctors } from './doctors'

export interface DepartmentOption {
  id: string
  label: string
  departmentEnum?: Department
}

// 科室列表
export const departments: DepartmentOption[] = [
  { id: '', label: '全部科室' },
  { id: '内分泌科', label: '内分泌科', departmentEnum: Department.DIABETES },
  { id: '心血管科', label: '心血管科', departmentEnum: Department.CARDIOVASCULAR },
  { id: '中医内科', label: '中医内科', departmentEnum: Department.INTERNAL },
  { id: '针灸科', label: '针灸科', departmentEnum: Department.ACUPUNCTURE },
  { id: '中医骨科', label: '中医骨科', departmentEnum: Department.BONE },
  { id: '中医妇科', label: '中医妇科', departmentEnum: Department.GYNECOLOGY },
  { id: '中医儿科', label: '中医儿科', departmentEnum: Department.PEDIATRICS },
  { id: '中医男科', label: '中医男科', departmentEnum: Department.ANDROLOGY },
  { id: '疼痛科', label: '疼痛科', departmentEnum: Department.PAIN },
  { id: '皮肤科', label: '皮肤科', departmentEnum: Department.DERMATOLOGY },
  { id: '耳鼻喉科', label: '耳鼻喉科', departmentEnum: Department.ENT },
]

// 所有专家数据（扩展自mockDoctors，添加更多医生）
export const allDoctors: Doctor[] = [
  mockDoctors['1'],
  mockDoctors['2'],
  mockDoctors['3'],
  mockDoctors['4'],
  // 添加更多医生
  {
    id: 5,
    userId: 1005,
    name: '孙思邈',
    avatar: 'https://cdn.pixabay.com/photo/2017/08/06/12/52/woman-2592247_640.jpg',
    title: '主任医师',
    department: '中医妇科',
    hospital: '杭州中医院',
    fields: [Department.GYNECOLOGY],
    specialty: ['月经不调', '不孕不育', '更年期综合征'],
    introduction: '从事中医妇科临床工作25年，擅长运用中医药治疗各类妇科疾病',
    workingYears: 25,
    textConsultationFee: 89,
    textConsultationEnabled: true,
    videoConsultationFee: 179,
    videoConsultationEnabled: true,
    audioConsultationFee: 139,
    audioConsultationEnabled: true,
    avgRatingScore: 4.8,
    totalReviews: 1856,
    consultationCount: 38900,
    satisfactionRate: 97,
    responseSpeed: '较快',
    rating: 4.8,
    consultations: 38900,
    consultationFee: 89,
    responseTime: '通常在 5 小时内回复',
  },
  {
    id: 6,
    userId: 1006,
    name: '扁鹊',
    avatar: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg',
    title: '副主任医师',
    department: '中医骨科',
    hospital: '成都中医院',
    fields: [Department.BONE, Department.PAIN],
    specialty: ['腰椎间盘突出', '颈椎病', '骨质增生'],
    introduction: '中医骨伤科专家，擅长运用中医正骨手法治疗各类骨伤疾病',
    workingYears: 16,
    textConsultationFee: 79,
    textConsultationEnabled: true,
    videoConsultationFee: 169,
    videoConsultationEnabled: true,
    audioConsultationFee: 129,
    audioConsultationEnabled: true,
    avgRatingScore: 4.7,
    totalReviews: 1423,
    consultationCount: 28600,
    satisfactionRate: 96,
    responseSpeed: '较快',
    rating: 4.7,
    consultations: 28600,
    consultationFee: 79,
    responseTime: '通常在 4 小时内回复',
  },
  {
    id: 7,
    userId: 1007,
    name: '李时珍',
    avatar: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_640.jpg',
    title: '主治医师',
    department: '中医儿科',
    hospital: '武汉中医院',
    fields: [Department.PEDIATRICS],
    specialty: ['小儿感冒', '小儿咳嗽', '小儿腹泻', '小儿厌食'],
    introduction: '中医儿科专家，擅长运用中医药治疗小儿常见病、多发病',
    workingYears: 10,
    textConsultationFee: 69,
    textConsultationEnabled: true,
    videoConsultationFee: 159,
    videoConsultationEnabled: true,
    audioConsultationFee: 119,
    audioConsultationEnabled: true,
    avgRatingScore: 4.6,
    totalReviews: 986,
    consultationCount: 19800,
    satisfactionRate: 95,
    responseSpeed: '一般',
    rating: 4.6,
    consultations: 19800,
    consultationFee: 69,
    responseTime: '通常在 6 小时内回复',
  },
  {
    id: 8,
    userId: 1008,
    name: '王叔和',
    avatar: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_640.jpg',
    title: '主任医师',
    department: '心血管科',
    hospital: '南京中医院',
    fields: [Department.CARDIOVASCULAR, Department.INTERNAL],
    specialty: ['高血压', '冠心病', '心律失常'],
    introduction: '心血管疾病专家，擅长中西医结合治疗心血管疾病',
    workingYears: 20,
    textConsultationFee: 99,
    textConsultationEnabled: true,
    videoConsultationFee: 199,
    videoConsultationEnabled: true,
    audioConsultationFee: 149,
    audioConsultationEnabled: true,
    avgRatingScore: 4.9,
    totalReviews: 2345,
    consultationCount: 48900,
    satisfactionRate: 98,
    responseSpeed: '较快',
    rating: 4.9,
    consultations: 48900,
    consultationFee: 99,
    responseTime: '通常在 4 小时内回复',
  },
]

// 根据科室筛选医生
export function getDoctorsByDepartment(departmentId: string): Doctor[] {
  if (!departmentId) {
    return allDoctors
  }
  return allDoctors.filter(doctor => doctor.department === departmentId)
}

// 根据ID从所有医生中获取医生
export function getAllDoctorById(id: number): Doctor | undefined {
  return allDoctors.find(doctor => doctor.id === id)
}
