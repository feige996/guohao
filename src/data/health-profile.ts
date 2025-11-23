/**
 * 患者档案演示数据
 * 对应后端 app_User 实体
 */

import type { PatientProfile } from '@/types2'

// 模拟患者档案数据
export const mockPatientProfile: PatientProfile = {
  // 基本信息
  id: 10001,
  username: 'patient001',
  nickName: '张三',
  avatar: 'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg',
  sex: 1, // 1-男性
  age: 32,
  birthday: '1992-05-15',
  introduction: '注重健康，热爱运动',

  // 联系方式
  mobile: '13812345678',
  mobileConfirmed: 1, // 已验证
  email: 'zhangsan@example.com',
  emailConfirmed: 1, // 已验证

  // 地址信息
  country: '中国',
  province: '广东省',
  city: '广州市',
  address: '天河区珠江新城花城大道123号',

  // 身份信息
  nation: '汉族',
  cardType: 1, // 身份证
  idCardNum: '440105199205151234',

  // 紧急联系人
  emergencyContact: '李四',
  emergencyPhone: '13987654321',
  emergencyAddress: '广东省广州市越秀区中山路456号',

  // 健康信息
  healthCondition: '整体健康状况良好，偶有失眠',
  chiefComplaint: '最近感觉容易疲劳，睡眠质量不佳',
  presentIllness: '近一个月出现轻度失眠症状',
  allergyHistory: '对花粉过敏，春季易发；无药物过敏史',
  medicalHistory: '2020年阑尾炎手术，恢复良好；无其他重大疾病史',
  westernDiagnosis: '神经衰弱，轻度失眠',
  chineseDiagnosis: '心脾两虚，气血不足',
  constitutionType: '气虚质',
  familyMedicalHistory: '父亲有高血压病史，母亲有2型糖尿病',

  // 地域信息（健康档案）
  birthPlace: '广东省',
  livingProvince: '广东省',
  livingCity: '广州市',

  // 身体指标
  height: 175,
  weight: 70,
  bloodType: 'A',

  // 生活习惯
  dietHabits: '偏好清淡饮食，少油少盐，每日三餐规律，偶尔吃甜食',
  exerciseHabits: '每周3-4次有氧运动，包括慢跑、游泳，每次30-45分钟',
  sleepCondition: '通常23:00入睡，6:30起床，睡眠时间7-8小时，但入睡困难',
  isSmoker: false,
  isDrinker: false,

  // 健康目标
  healthGoals: '改善睡眠质量，提高免疫力，保持健康体重，预防家族遗传疾病',
}

// 兼容旧代码的导出
export const mockHealthProfile = mockPatientProfile
