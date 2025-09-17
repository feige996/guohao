/** 医疗服务卡片配置接口 */
export interface MedicalServiceCardConfig {
  /** 卡片唯一标识 */
  id: string
  /** 主标题 */
  title: string
  /** 副标题1 */
  subtitle1: string
  /** 副标题2 */
  subtitle2: string
  /** 按钮文本 */
  buttonText: string
  /** 按钮背景色 */
  buttonColor: string
  /** 背景图片路径 */
  backgroundImage: string
  /** 点击事件处理函数名 */
  action?: string
}

/** 医疗服务卡片组Props接口 */
export interface MedicalServiceCardsProps {
  /** 卡片配置数组 */
  cards: MedicalServiceCardConfig[]
  /** 自定义样式类名 */
  className?: string
}

/** 医疗服务卡片组事件接口 */
export interface MedicalServiceCardsEmits {
  /** 卡片点击事件 */
  (event: 'cardClick', card: MedicalServiceCardConfig): void
}

/** 预定义的医疗服务卡片配置 */
export const MEDICAL_SERVICE_CARDS_CONFIG: MedicalServiceCardConfig[] = [
  {
    id: 'medicine-service',
    title: '购药服务',
    subtitle1: '在线开方',
    subtitle2: '便捷购药',
    buttonText: '去选药',
    buttonColor: '#c37971',
    backgroundImage: '/static/images/healthcare/medicine-service-bg.png',
    action: 'goToMedicineService'
  },
  {
    id: 'smart-diagnosis',
    title: '智慧自诊',
    subtitle1: '快速自测',
    subtitle2: '获取初步建议',
    buttonText: '开始自测',
    buttonColor: '#70b9c1',
    backgroundImage: '/static/images/healthcare/smart-diagnosis-bg.png',
    action: 'goToSmartDiagnosis'
  }
]
