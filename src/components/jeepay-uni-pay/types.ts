/**
 * 支付相关类型定义
 */

// 支付方式类型
export type PayType =
  | 'wxLite' // 微信小程序支付
  | 'openWxLitePay' // 跳转微信小程序支付
  | 'aliLite' // 支付宝小程序支付
  | 'wxH5' // 微信H5支付
  | 'wxH5ToWxLite' // H5跳转微信小程序支付
  | 'aliH5' // 支付宝H5支付
  | 'wxLiteToH5' // 微信小程序跳转H5支付
  | 'appToAliH5' // APP跳转支付宝H5
  | 'appToWxLite' // APP跳转微信小程序
  | 'appToAliLite' // APP跳转支付宝小程序

// 支付状态
export enum PaymentState {
  Created = 0, // 订单生成
  Paying = 1, // 支付中
  Success = 2, // 支付成功
  Failed = 3, // 支付失败
  Cancelled = 4, // 已撤销
  Refunded = 5, // 已退款
  Closed = 6, // 订单关闭
}

// 支付订单信息
export interface PayOrderInfo {
  amount: number // 支付金额（分）
  mchOrderNo: string // 商户订单号
  payType: PayType // 支付方式
  subject: string // 商品标题
  body: string // 商品描述
  wayCode?: string // 支付方式代码
  channelExtra?: Record<string, any> // 渠道额外参数
  reqTime?: number // 请求时间戳
  returnUrl?: string // 返回URL
}

// 支付参数
export interface PaymentParams {
  amount: number // 支付金额（分）
  mchOrderNo: string // 商户订单号
  payType: PayType // 支付方式
  subject: string // 商品标题
  body: string // 商品描述
  wayCode?: string // 支付方式代码
  channelExtra?: {
    openid?: string // 微信openid
    entryLiteType?: 'wxapp' | 'wxh5' | 'aliapp' // 小程序入口类型
    [key: string]: any
  }
  returnUrl?: string // 返回URL
  reqTime?: number // 请求时间戳
}

// 支付响应数据
export interface PaymentResponse {
  code: number
  msg?: string
  data: {
    mchOrderNo: string // 商户订单号
    payOrderId: string // 支付订单ID
    payData: string | Record<string, any> // 支付数据
    errCode?: string // 错误代码
    errMsg?: string // 错误信息
  }
}

// 订单查询参数
export interface FindOrderParams {
  mchOrderNo?: string // 商户订单号
  payOrderId?: string // 支付订单ID
  reqTime?: number // 请求时间戳
}

// 订单查询响应
export interface FindOrderResponse {
  code: number
  msg?: string
  data: {
    amount: number // 支付金额（分）
    state: PaymentState // 订单状态
    mchOrderNo: string // 商户订单号
    payOrderId: string // 支付订单ID
    errCode?: string
    errMsg?: string
  }
}

// 订单信息
export interface OrderInfo {
  amount: string // 显示金额（元）
  orderStateText: string // 订单状态文本
}

// 微信小程序支付数据
export interface WxLitePayData {
  timeStamp: string
  nonceStr: string
  package: string
  signType: string
  paySign: string
}

// 微信H5支付数据
export interface WxH5PayData {
  appId: string
  timeStamp: string
  nonceStr: string
  package: string
  signType: string
  paySign: string
  returnUrl?: string
}

// 跳转小程序支付数据
export interface OpenWxLitePayData {
  appid: string // 小程序appid
  path: string // 小程序路径
  qrUrl: string // 二维码URL
  env: 'release' | 'trial' | 'develop' // 小程序版本
}

// 支付宝小程序支付数据
export interface AliLitePayData {
  appId: string
  path: string
  qrUrl: string
}

// 校验规则
export interface ValidationRule {
  key: keyof PaymentParams
  erMsg: string
}

// 支付配置
export interface PaymentConfig {
  paymentReqFunc: (params: PaymentParams) => Promise<{ data: PaymentResponse }>
  findOrderReqFunc: (params: FindOrderParams) => Promise<{ data: FindOrderResponse }>
}

