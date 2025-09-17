export { default as DoctorCard } from './DoctorCard.vue'
export { default as DoctorCardList } from './DoctorCardList.vue'
export * from './types'

// 示例数据
export const DOCTOR_CARD_CONFIGS = [
  {
    id: 'doctor1',
    name: '陈广志',
    title: '主任医师',
    department: '内分泌科',
    hospital: '佛山中医院主治医师',
    consultationCount: 56800,
    rating: 100,
    specialty: '长期从事内分泌、代谢性疾病的诊断和中西医结合治疗，在糖尿病等疾病...',
    avatar: '/static/images/healthcare/doctor-avatar.png'
  },
  {
    id: 'doctor2',
    name: '李明华',
    title: '副主任医师',
    department: '心血管科',
    hospital: '广州市人民医院',
    consultationCount: 42300,
    rating: 98,
    specialty: '专注于心血管疾病的诊断和治疗，擅长冠心病、高血压等疾病的综合治疗...',
    avatar: '/static/images/healthcare/doctor-avatar.png'
  },
  {
    id: 'doctor3',
    name: '王小红',
    title: '主治医师',
    department: '妇产科',
    hospital: '深圳市妇幼保健院',
    consultationCount: 38900,
    rating: 99,
    specialty: '从事妇产科临床工作多年，擅长妇科常见病、多发病的诊治，产前检查...',
    avatar: '/static/images/healthcare/doctor-avatar.png'
  }
]
