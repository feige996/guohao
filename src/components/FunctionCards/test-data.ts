/**
 * FunctionCards 组件测试数据
 */

import type { AllFunctionCard, FunctionCardItem } from './types'

/** 测试用的功能卡片数据 */
export const TEST_FUNCTION_CARDS: FunctionCardItem[] = [
  {
    id: 'appointment',
    title: '预约问诊',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'message',
    title: '我的消息',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'collection',
    title: '养生收藏',
    backgroundImage: '@img/homepage/collection-icon.png',
    enabled: true,
    className: 'ml-[1rpx]',
    textStyle: {
      marginLeft: '23rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'product',
    title: '关注商品',
    backgroundImage: '@img/homepage/product-icon.png',
    enabled: false, // 测试禁用状态
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
    },
  },
]

/** 自定义功能卡片数据 */
export const CUSTOM_FUNCTION_CARDS: FunctionCardItem[] = [
  {
    id: 'consult',
    title: '在线咨询',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'health',
    title: '健康档案',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'expert',
    title: '专家预约',
    backgroundImage: '@img/homepage/collection-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '18rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'medicine',
    title: '用药指导',
    backgroundImage: '@img/homepage/product-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'report',
    title: '体检报告',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
  {
    id: 'nutrition',
    title: '营养建议',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '20rpx',
      marginTop: '60rpx',
      width: '120rpx',
    },
  },
]

/** 自定义全部功能配置 */
export const CUSTOM_ALL_FUNCTION: AllFunctionCard = {
  title: '更多服务',
  subtitle1: '专业团队',
  subtitle2: '贴心服务',
  backgroundImage1: '@img/homepage/all-function-bg1.png',
  backgroundImage2: '@img/homepage/all-function-bg2.png',
  decorationIcon: '@img/homepage/settings-icon.png',
}

/** 简化版功能卡片（只有两个） */
export const SIMPLE_FUNCTION_CARDS: FunctionCardItem[] = [
  {
    id: 'service1',
    title: '核心服务',
    backgroundImage: '@img/homepage/appointment-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
  {
    id: 'service2',
    title: '增值服务',
    backgroundImage: '@img/homepage/message-icon.png',
    enabled: true,
    textStyle: {
      marginLeft: '24rpx',
      marginTop: '64rpx',
      width: '108rpx',
    },
  },
]
