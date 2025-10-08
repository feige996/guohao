/**
 * 支付相关工具函数
 * 支持多种支付方式：微信、支付宝、H5等
 */

import type { AliLitePayData, OpenWxLitePayData, WxH5PayData, WxLitePayData } from './types'

/**
 * APP跳转支付宝H5支付
 * @param url 支付宝H5支付URL
 */
export function appToAliH5(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const alipayUrl = `alipays://platformapi/startapp?saId=10000007&qrcode=${encodeURIComponent(url)}`
    // #ifdef APP-PLUS
    plus.runtime.openURL(alipayUrl, (res: any) => {
      resolve(res)
    })
    // #endif
    // #ifndef APP-PLUS
    reject(new Error('此功能仅支持APP环境'))
    // #endif
  })
}

/**
 * 微信小程序原生支付
 * @param data 微信支付数据
 */
export function wxLitePay(data: WxLitePayData): Promise<any> {
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      ...data,
      success(res) {
        console.log('微信支付成功:', res)
        resolve(res)
      },
      fail(err) {
        console.log('微信支付失败:', err)
        reject(err)
      },
    } as any)
  })
}

/**
 * 跳转另一个小程序支付
 * @param val 小程序支付参数
 */
export function openWxLitePay(val: OpenWxLitePayData): Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.openEmbeddedMiniProgram({
      appId: val.appid,
      path: `${val.path}?q=${encodeURIComponent(val.qrUrl)}`,
      envVersion: val.env,
      success(res) {
        console.log('跳转小程序成功:', res)
        resolve('跳转小程序成功')
      },
      fail(err) {
        console.error('跳转小程序失败:', err)
        reject(new Error('跳转小程序失败'))
      },
    })
    // #endif
    // #ifndef MP-WEIXIN
    reject(new Error('此功能仅支持微信小程序环境'))
    // #endif
  })
}

// 声明微信JSBridge类型
declare global {
  interface Window {
    WeixinJSBridge: any
  }
  const WeixinJSBridge: any
}

/**
 * 微信H5支付（JSAPI）
 * @param payOrderInfo 微信支付订单信息
 */
export function wechatH5Func(payOrderInfo: WxH5PayData): void {
  const onBridgeReady = () => {
    // #ifdef H5
    if (typeof WeixinJSBridge !== 'undefined') {
      WeixinJSBridge.invoke('getBrandWCPayRequest', payOrderInfo, (res: any) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 支付成功
          if (payOrderInfo.returnUrl) {
            location.href = payOrderInfo.returnUrl
          }
          else {
            WeixinJSBridge.call('closeWindow')
          }
        }
        else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          uni.showToast({
            title: '支付取消',
            icon: 'none',
          })
        }
        else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          uni.showToast({
            title: `支付失败:${JSON.stringify(res)}`,
            icon: 'none',
          })
        }
        else if (res.err_msg === 'total_fee') {
          uni.showToast({
            title: '缺少参数',
            icon: 'none',
          })
        }
      })
    }
    // #endif
  }

  // #ifdef H5
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    }
    else if ((document as any).attachEvent) {
      (document as any).attachEvent('WeixinJSBridgeReady', onBridgeReady);
      (document as any).attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  }
  else {
    onBridgeReady()
  }
  // #endif
}

/**
 * APP或H5打开H5支付页面
 * @param url 支付URL
 */
export function openH5Pay(url: string): void {
  console.log('打开H5支付:', url)
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifdef H5
  window.location.href = url
  // #endif
}

/**
 * APP跳转支付宝小程序
 * @param payData 支付宝小程序支付数据
 */
export function appToAliLite(payData: AliLitePayData): void {
  let alipayUrl = ''
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform

  if (platform === 'ios') {
    alipayUrl = `alipay://platformapi/startapp?appId=${payData.appId}&page=${payData.path}&query=qrCode=${payData.qrUrl}`
    plus.runtime.launchApplication(
      { action: alipayUrl },
      (res: any) => {
        console.log('启动支付宝小程序成功:', res)
      },
    )
    return
  }

  alipayUrl = `alipays://platformapi/startapp?appId=${payData.appId}&page=${payData.path}&query=qrCode=${payData.qrUrl}`
  plus.runtime.openURL(
    alipayUrl,
    (res: any) => {
      console.log('打开支付宝小程序成功:', res)
    },
  )
  // #endif
}

/**
 * 支付宝H5支付
 * @param url 支付宝H5支付URL
 */
export function alitH5(url: string): void {
  // #ifdef H5
  window.location.href = url
  // #endif
}

/**
 * 支付宝小程序原生支付
 * @param orderInfo 支付宝订单信息
 */
export function aliLiteFunc(orderInfo: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-ALIPAY
    uni.requestPayment({
      provider: 'alipay',
      orderInfo,
      success(res) {
        console.log('支付宝支付成功:', res)
        resolve(res)
      },
      fail(err) {
        console.log('支付宝支付失败:', err)
        reject(err)
      },
    } as any)
    // #endif
    // #ifndef MP-ALIPAY
    reject(new Error('此功能仅支持支付宝小程序环境'))
    // #endif
  })
}
