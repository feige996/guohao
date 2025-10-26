/** 医疗服务卡片配置接口 */
export interface HealthcareCardConfig {
  /** 卡片唯一标识 */
  id: string
  /** 主标题 */
  title: string
  /** 副标题1 */
  subtitle1: string
  /** 副标题2 */
  subtitle2: string
  /** 背景渐变色 */
  gradientColors: {
    from: string
    to: string
  }
  /** 主标题颜色 */
  titleColor: string
  /** 副标题颜色 */
  subtitleColor: string
  /** 图片资源 */
  images: {
    /** 背景图片 */
    background: string
    /** 装饰图片 */
    decoration: string
    /** 头像图片 */
    avatar: string
    /** 功能图标1 */
    icon1: string
    /** 功能图标2 */
    icon2: string
    /** 箭头图标 */
    arrow: string
  }
  /** 底部功能区配置 */
  features: {
    /** 功能描述1 */
    feature1: string
    /** 功能描述2 */
    feature2: string
  }
  /** 是否启用 */
  enabled?: boolean
}

/** 组件 Props 接口 */
export interface HealthcareCardProps {
  /** 卡片配置 */
  config: HealthcareCardConfig
  /** 自定义样式类名 */
  className?: string
}

/** 组件事件接口 */
export interface HealthcareCardEmits {
  /** 卡片点击事件 */
  (event: 'click', config: HealthcareCardConfig): void
}

/** 预定义的卡片配置 */
export const HEALTHCARE_CARD_CONFIGS = {
  /** 导诊顾问卡片配置 */
  GUIDE: {
    id: 'guide',
    title: '导诊顾问',
    subtitle1: '不清楚挂什么科？',
    subtitle2: '问我！',
    gradientColors: {
      from: '#fff7eb',
      to: '#ffead2'
    },
    titleColor: '#5a462b',
    subtitleColor: '#baa482',
    images: {
      background: '/static/images/healthcare/guide-bg.png',
      decoration: '/static/images/healthcare/guide-decoration.png',
      avatar: '/static/images/healthcare/guide-avatar.png',
      icon1: '/static/images/healthcare/guide-icon1.png',
      icon2: '/static/images/healthcare/guide-icon2.png',
      arrow: '/static/images/healthcare/guide-arrow.png'
    },
    features: {
      feature1: '专业指导',
      feature2: '快速问答'
    },
    enabled: true
  } as HealthcareCardConfig,

  /** 在线问诊卡片配置 */
  CONSULT: {
    id: 'consult',
    title: '在线问诊',
    subtitle1: '中医专家',
    subtitle2: '在线咨询',
    gradientColors: {
      from: '#f0fbfc',
      to: '#def0f3'
    },
    titleColor: '#456860',
    subtitleColor: '#85b7b0',
    images: {
      background: '/static/images/healthcare/consult-bg.png',
      decoration: '/static/images/healthcare/consult-decoration.png',
      avatar: '/static/images/healthcare/consult-avatar.png',
      icon1: '/static/images/healthcare/consult-icon1.png',
      icon2: '/static/images/healthcare/consult-icon2.png',
      arrow: '/static/images/healthcare/consult-arrow.png'
    },
    features: {
      feature1: '与专家实时沟通',
      feature2: '服务严格质控'
    },
    enabled: true
  } as HealthcareCardConfig
}
