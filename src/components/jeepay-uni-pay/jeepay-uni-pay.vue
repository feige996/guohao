<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type {
  FindOrderParams,
  FindOrderResponse,
  OrderInfo,
  PaymentParams,
  PaymentResponse,
  PaymentState,
  ValidationRule,
} from './types'

import { ref } from 'vue'
import {
  aliLiteFunc,
  alitH5,
  appToAliH5,
  appToAliLite,
  openH5Pay,
  openWxLitePay,
  wechatH5Func,
  wxLitePay,
} from './pay'
import paymentConfig from './paymentConfig'

// 定义props
interface Props {
  autoFindOrderState?: boolean // 是否自动查询订单状态
  countdown?: number // 倒计时秒数
  autoPay?: boolean // 是否自动支付
}

const props = withDefaults(defineProps<Props>(), {
  autoFindOrderState: false,
  countdown: 3,
  autoPay: true,
})

// 定义emits
const emit = defineEmits<{
  paySuccess: [data: PaymentResponse]
  payFail: [error: any]
  orderStateChange: [state: PaymentState]
}>()

// 弹窗ref
interface UniPopupInstance extends ComponentPublicInstance {
  open: () => void
  close: () => void
}

const refPopup = ref<UniPopupInstance>()

// 查询订单信息
const findOrderInfo = ref<FindOrderParams>({})

// 订单信息
const orderInfo = ref<OrderInfo>({
  amount: '',
  orderStateText: '',
})

// 当前支付函数
let payFunc: (data: any) => void | Promise<any> = () => {}

/**
 * 调用支付接口 - 下单并发起支付
 * @param par 支付参数
 */
async function submitOrderToPayment(par: PaymentParams): Promise<PaymentResponse | void> {
  const params = supplementaryParams(JSON.parse(JSON.stringify(par)))
  uni.showLoading({ title: '请稍等...' })

  try {
    // 参数校验
    await validate(params)

    // 请求支付接口
    const { data } = await paymentConfig.paymentReqFunc(params)
    const payInfo = data

    // 检查返回结果
    if (payInfo.code !== 0 || payInfo.data.errCode) {
      return errTips(payInfo.data || payInfo.msg)
    }

    // 保存订单信息用于查询
    if (payInfo.code === 0) {
      findOrderInfo.value.mchOrderNo = payInfo.data.mchOrderNo
      findOrderInfo.value.payOrderId = payInfo.data.payOrderId
    }

    // 自动发起支付
    if (props.autoPay) {
      return await pay(payInfo)
    }

    return payInfo
  }
  catch (err) {
    errTips(err)
  }
}

/**
 * 对必要数据进行校验
 * @param val 支付参数
 */
function validate(val: PaymentParams): Promise<boolean> {
  const rule: ValidationRule[] = [
    { key: 'amount', erMsg: '请输入支付金额' },
    { key: 'mchOrderNo', erMsg: '请传入商户订单号' },
    { key: 'payType', erMsg: '请传入支付方式' },
    { key: 'subject', erMsg: '请传入商品标题' },
    { key: 'body', erMsg: '请传入商品描述' },
  ]

  return new Promise((resolve, reject) => {
    for (let i = 0; i < rule.length; i++) {
      const item = rule[i]
      if (!val[item.key]) {
        return reject(item.erMsg)
      }
    }

    // #ifdef MP-WEIXIN
    if ((!val.channelExtra || !val.channelExtra.openid) && val.payType === 'wxLite') {
      return reject(new Error('请传入openid'))
    }
    // #endif

    // #ifdef H5
    if (val.payType === 'wxH5' && (!val.channelExtra || !val.channelExtra.openid)) {
      return reject(new Error('请传入openid'))
    }
    // #endif

    resolve(true)
  })
}

/**
 * 错误提示
 * @param msg 错误信息
 */
function errTips(msg: any): Promise<never> {
  const erMsg = typeof msg === 'string' ? msg : JSON.stringify(msg)
  uni.hideLoading()
  uni.showToast({ title: erMsg, icon: 'none', duration: 5000 })
  emit('payFail', msg)
  return Promise.reject(erMsg)
}

/**
 * 发起支付
 * @param data 支付响应数据
 */
async function pay(data: PaymentResponse): Promise<PaymentResponse> {
  const payInfo = isJson(data.data.payData)
    ? JSON.parse(data.data.payData as string)
    : data.data.payData

  try {
    await payFunc(payInfo)
    emit('paySuccess', data)

    // 自动查询订单状态
    if (props.autoFindOrderState) {
      setTimeout(() => {
        findOrder()
      }, props.countdown * 1000)
    }
  }
  catch (error) {
    emit('payFail', error)
    throw error
  }
  finally {
    uni.hideLoading()
  }

  return data
}

/**
 * 根据不同支付方式选择支付函数并对参数进行补充
 * @param params 原始参数
 */
function supplementaryParams(params: PaymentParams): PaymentParams {
  params.reqTime = new Date().getTime()

  // #ifdef MP-WEIXIN
  switch (params.payType) {
    case 'openWxLitePay':
      params.wayCode = 'QR_CASHIER'
      params.channelExtra = { entryLiteType: 'wxapp' }
      payFunc = openWxLitePay
      break
    default:
      payFunc = wxLitePay
      params.wayCode = 'WX_LITE'
  }
  // #endif

  // #ifdef MP-ALIPAY
  switch (params.payType) {
    case 'aliLite':
      params.wayCode = 'ALI_LITE'
      params.channelExtra = JSON.stringify(params.channelExtra || {}) as any
      payFunc = aliLiteFunc
      break
  }
  // #endif

  // #ifdef H5
  switch (params.payType) {
    case 'wxH5':
      payFunc = wechatH5Func
      params.wayCode = 'WX_JSAPI'
      break
    case 'wxH5ToWxLite':
      payFunc = openH5Pay
      params.wayCode = 'QR_CASHIER'
      params.channelExtra = { entryLiteType: 'wxh5' }
      break
    case 'aliH5':
      payFunc = alitH5
      params.wayCode = 'QR_CASHIER'
      break
    case 'wxLiteToH5':
      payFunc = openH5Pay
      params.wayCode = 'QR_CASHIER'
      break
  }
  // #endif

  // #ifdef APP-PLUS
  switch (params.payType) {
    case 'appToAliH5':
      payFunc = appToAliH5
      params.wayCode = 'QR_CASHIER'
      break
    case 'appToWxLite':
      payFunc = openH5Pay
      params.wayCode = 'QR_CASHIER'
      params.channelExtra = { entryLiteType: 'wxh5' }
      break
    case 'appToAliLite':
      payFunc = appToAliLite
      params.wayCode = 'QR_CASHIER'
      params.channelExtra = { entryLiteType: 'aliapp' }
      break
  }
  // #endif

  return params
}

/**
 * 判断字符串是否为JSON
 * @param str 待判断字符串
 */
function isJson(str: any): boolean {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      return typeof obj === 'object' && obj !== null
    }
    catch (e) {
      return false
    }
  }
  return false
}

/**
 * 关闭弹窗
 */
function close() {
  refPopup.value?.close()
}

/**
 * 查询订单函数
 * @param params 查询参数
 */
async function findOrder(params?: FindOrderParams): Promise<FindOrderResponse | void> {
  uni.showLoading({ title: '查询中 请稍等...' })

  if (params?.mchOrderNo) {
    findOrderInfo.value = {
      ...params,
      reqTime: new Date().getTime(),
    }
  }
  else {
    findOrderInfo.value = {
      ...findOrderInfo.value,
      reqTime: new Date().getTime(),
    }
  }

  try {
    const { data } = await paymentConfig.findOrderReqFunc(findOrderInfo.value)
    const findOrderData = data

    if (findOrderData.code === 0) {
      orderInfo.value.amount = (findOrderData.data.amount / 100).toFixed(2)
      orderInfo.value.orderStateText = getStateText(findOrderData.data.state)

      emit('orderStateChange', findOrderData.data.state)

      if (props.autoFindOrderState) {
        refPopup.value?.open()
      }

      uni.hideLoading()
      return findOrderData
    }
    else {
      if (findOrderData.code !== 0 || findOrderData.data.errCode) {
        return errTips(findOrderData.data)
      }
      return Promise.reject(findOrderData)
    }
  }
  catch (error) {
    errTips(error)
  }
}

/**
 * 获取支付状态文本
 * @param state 支付状态
 */
function getStateText(state: PaymentState): string {
  const stateMap: Record<PaymentState, string> = {
    0: '订单生成',
    1: '支付中',
    2: '支付成功',
    3: '支付失败',
    4: '已撤销',
    5: '已退款',
    6: '订单关闭',
  }
  return stateMap[state] || '未知状态'
}

// 暴露方法给父组件使用
defineExpose({
  submitOrderToPayment,
  findOrder,
  close,
  // 暴露各个支付方法
  appToAliH5,
  wxLitePay,
  openWxLitePay,
  wechatH5Func,
  openH5Pay,
  appToAliLite,
  aliLiteFunc,
  alitH5,
})
</script>

<template>
  <uni-popup ref="refPopup" :is-mask-click="false" type="center">
    <view class="pay-wrapper">
      <view class="pay-title">
        支付结果
      </view>
      <view class="content">
        <view class="payment">
          <view class="amount">
            <text class="unit">￥</text>{{ orderInfo.amount }}
          </view>
          <view class="subtitle">
            支付金额
          </view>
        </view>
        <view class="order-state">
          订单状态：{{ orderInfo.orderStateText }}
        </view>
      </view>
      <view class="but-wrap">
        <view class="but-item" :hover-stay-time="150" hover-class="touch-but" @tap="close">
          取消
        </view>
        <view class="but-item refresh" :hover-stay-time="150" hover-class="touch-but" @tap="findOrder">
          刷新
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss" scoped>
.pay-wrapper {
  display: flex;
  flex-direction: column;
  width: 690rpx;
  height: 500rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;

  .pay-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    font-size: 33rpx;
    font-weight: 700;
    border-bottom: 1rpx solid #ededed;
  }

  .content {
    flex: 1;

    .payment {
      display: flex;
      flex-direction: column;
      align-items: center;

      .amount {
        margin-bottom: 15rpx;
        font-size: 60rpx;
        font-weight: 600;
        color: #217dfe;

        .unit {
          font-size: 28rpx;
        }
      }

      .subtitle {
        margin-bottom: 20rpx;
        font-size: 28rpx;
        color: #999;
      }
    }

    .order-state {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;
      font-size: 30rpx;
      color: #333;
    }
  }

  .but-wrap {
    display: flex;
    flex-direction: row;
    border-top: 1rpx solid #ededed;

    .but-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 110rpx;
      font-size: 30rpx;
      background-color: #fff;
    }

    .refresh {
      background-color: #217dfe;
      color: #fff;
    }
  }
}

.touch-but {
  opacity: 0.5;
}
</style>
