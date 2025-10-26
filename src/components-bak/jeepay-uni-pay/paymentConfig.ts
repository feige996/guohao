/**
 * 支付配置文件
 * 需要根据实际项目配置支付接口
 */

import type { FindOrderParams, FindOrderResponse, PaymentParams, PaymentResponse } from './types'

const paymentConfig = {
  /**
   * 支付请求函数
   * @param params 支付参数
   * @returns 支付响应
   */
  paymentReqFunc: async (params: PaymentParams): Promise<{ data: PaymentResponse }> => {
    // TODO: 替换为实际的支付接口
    // 示例使用 uni.request
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api/payment/create', // 替换为实际支付接口
        method: 'POST',
        data: params,
        success: (res) => {
          resolve({ data: res.data as PaymentResponse })
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  },

  /**
   * 查询订单函数
   * @param params 查询参数
   * @returns 订单信息
   */
  findOrderReqFunc: async (params: FindOrderParams): Promise<{ data: FindOrderResponse }> => {
    // TODO: 替换为实际的订单查询接口
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api/payment/query', // 替换为实际查询接口
        method: 'POST',
        data: params,
        success: (res) => {
          resolve({ data: res.data as FindOrderResponse })
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  },
}

export default paymentConfig
