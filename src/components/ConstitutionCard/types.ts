/**
 * 体质状态卡片组件相关类型定义
 */

/** 体质卡片属性接口 */
export interface ConstitutionCardProps {
  /** 体质类型 */
  constitutionType?: string
  /** 养生建议标题 */
  adviceTitle?: string
  /** 养生建议内容 */
  adviceContent?: string
  /** 体质徽章背景图片路径 */
  badgeImageUrl?: string
}

/** 体质卡片事件接口 */
export interface ConstitutionCardEmits {
  /** 点击整个卡片时触发 */
  click: []
  /** 点击体质状态时触发 */
  constitutionClick: []
  /** 点击养生建议时触发 */
  adviceClick: []
}

/** 体质类型枚举 */
export enum ConstitutionType {
  /** 平和体质 */
  BALANCED = '平和体质',
  /** 气虚体质 */
  QI_DEFICIENCY = '气虚体质',
  /** 阳虚体质 */
  YANG_DEFICIENCY = '阳虚体质',
  /** 阴虚体质 */
  YIN_DEFICIENCY = '阴虚体质',
  /** 痰湿体质 */
  PHLEGM_DAMPNESS = '痰湿体质',
  /** 湿热体质 */
  DAMP_HEAT = '湿热体质',
  /** 血瘀体质 */
  BLOOD_STASIS = '血瘀体质',
  /** 气郁体质 */
  QI_STAGNATION = '气郁体质',
  /** 特禀体质 */
  SPECIAL_CONSTITUTION = '特禀体质',
}
