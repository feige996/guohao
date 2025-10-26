/**
 * 功能卡片组件相关类型定义
 */

/** 功能卡片项接口 */
export interface FunctionCardItem {
  /** 唯一标识 */
  id: string
  /** 卡片标题 */
  title: string
  /** 背景图片路径 */
  backgroundImage: string
  /** 是否启用 */
  enabled?: boolean
  /** 自定义样式类名 */
  className?: string
  /** 文本位置调整 */
  textStyle?: {
    marginLeft?: string
    marginTop?: string
    width?: string
  }
}

/** 全部功能卡片配置 */
export interface AllFunctionCard {
  /** 主标题 */
  title: string
  /** 副标题1 */
  subtitle1: string
  /** 副标题2 */
  subtitle2: string
  /** 背景图片1 */
  backgroundImage1: string
  /** 背景图片2 */
  backgroundImage2: string
  /** 装饰图标 */
  decorationIcon: string
}

/** 组件属性接口 */
export interface FunctionCardsProps {
  /** 功能卡片数组 */
  cards: FunctionCardItem[]
  /** 全部功能卡片配置 */
  allFunctionCard?: AllFunctionCard
  /** 是否显示全部功能卡片 */
  showAllFunction?: boolean
  /** 每行显示的卡片数量 */
  cardsPerRow?: number
}

/** 组件事件接口 */
export interface FunctionCardsEmits {
  /** 点击功能卡片时触发 */
  cardClick: [item: FunctionCardItem]
  /** 点击全部功能卡片时触发 */
  allFunctionClick: []
}


