# Jeepay Uni-Pay 支付组件

## 概述
这是一个基于 Vue 3 + TypeScript 的 uni-app 支付组件，支持微信、支付宝等多种支付方式。

## 文件说明

### 核心文件
- `jeepay-uni-pay.vue` - 主组件（Vue 3 Composition API + TypeScript）
- `pay.ts` - 支付工具函数（TypeScript）
- `types.ts` - TypeScript 类型定义
- `paymentConfig.ts` - 支付配置文件

### 已删除文件
- ~~`pay.js`~~ - 已转换为 `pay.ts`

## 功能特性

### 支持的支付方式

#### 微信支付
- `wxLite` - 微信小程序原生支付
- `openWxLitePay` - 跳转微信小程序支付
- `wxH5` - 微信H5支付（JSAPI）
- `wxH5ToWxLite` - H5跳转微信小程序支付
- `wxLiteToH5` - 微信小程序跳转H5支付
- `appToWxLite` - APP跳转微信小程序

#### 支付宝支付
- `aliLite` - 支付宝小程序原生支付
- `aliH5` - 支付宝H5支付
- `appToAliH5` - APP跳转支付宝H5
- `appToAliLite` - APP跳转支付宝小程序

## 使用方法

### 基础用法

```vue
<template>
  <jeepay-uni-pay
    ref="payRef"
    :auto-find-order-state="true"
    :countdown="3"
    :auto-pay="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PaymentParams } from '@/components/jeepay-uni-pay/types'

const payRef = ref()

// 发起支付
async function handlePay() {
  const params: PaymentParams = {
    amount: 100, // 支付金额（分）
    mchOrderNo: 'ORDER123456', // 商户订单号
    payType: 'wxLite', // 支付方式
    subject: '商品标题',
    body: '商品描述',
    channelExtra: {
      openid: 'USER_OPENID' // 微信openid（微信支付必需）
    }
  }
  
  try {
    const result = await payRef.value.submitOrderToPayment(params)
    console.log('支付成功:', result)
  } catch (error) {
    console.error('支付失败:', error)
  }
}

// 查询订单
async function queryOrder() {
  try {
    const result = await payRef.value.findOrder({
      mchOrderNo: 'ORDER123456'
    })
    console.log('订单信息:', result)
  } catch (error) {
    console.error('查询失败:', error)
  }
}
</script>
```

### Props 配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| autoFindOrderState | Boolean | false | 是否自动查询订单状态 |
| countdown | Number | 3 | 支付后自动查询延迟（秒） |
| autoPay | Boolean | true | 是否自动发起支付 |

### Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| paySuccess | PaymentResponse | 支付成功 |
| payFail | error | 支付失败 |
| orderStateChange | PaymentState | 订单状态变化 |

### Exposed 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| submitOrderToPayment | PaymentParams | Promise<PaymentResponse> | 提交订单并发起支付 |
| findOrder | FindOrderParams | Promise<FindOrderResponse> | 查询订单状态 |
| close | - | void | 关闭支付结果弹窗 |

## 配置说明

### 支付接口配置

修改 `paymentConfig.ts` 文件，配置实际的支付接口：

```typescript
const paymentConfig = {
  // 支付请求接口
  paymentReqFunc: async (params: PaymentParams) => {
    return uni.request({
      url: 'YOUR_PAYMENT_API', // 替换为实际支付接口
      method: 'POST',
      data: params,
    })
  },
  
  // 订单查询接口
  findOrderReqFunc: async (params: FindOrderParams) => {
    return uni.request({
      url: 'YOUR_QUERY_API', // 替换为实际查询接口
      method: 'POST',
      data: params,
    })
  },
}
```

## 类型定义

所有类型定义位于 `types.ts` 文件中，包括：

- `PayType` - 支付方式类型
- `PaymentState` - 支付状态枚举
- `PayOrderInfo` - 支付订单信息
- `PaymentParams` - 支付参数
- `PaymentResponse` - 支付响应
- `FindOrderParams` - 订单查询参数
- `FindOrderResponse` - 订单查询响应
- `WxLitePayData` - 微信小程序支付数据
- `WxH5PayData` - 微信H5支付数据
- `AliLitePayData` - 支付宝小程序支付数据
- 等等...

## 支付状态

```typescript
enum PaymentState {
  Created = 0,      // 订单生成
  Paying = 1,       // 支付中
  Success = 2,      // 支付成功
  Failed = 3,       // 支付失败
  Cancelled = 4,    // 已撤销
  Refunded = 5,     // 已退款
  Closed = 6,       // 订单关闭
}
```

## 注意事项

1. **微信支付**：需要在微信支付参数中传入 `openid`
2. **支付宝支付**：支付宝小程序支付需要传入订单字符串
3. **H5支付**：需要在微信或支付宝环境中使用
4. **APP支付**：需要安装微信或支付宝客户端

## 待办事项

- [ ] 完善支付接口配置
- [ ] 添加更多支付方式
- [ ] 添加单元测试
- [ ] 优化错误处理
- [ ] 添加支付重试机制

## 更新日志

### v2.0.0 (2025-06-02)
- ✅ 从 JavaScript 转换为 TypeScript
- ✅ 从 Vue 2 Options API 转换为 Vue 3 Composition API
- ✅ 添加完整的类型定义
- ✅ 优化代码结构
- ✅ 改进错误处理
- ✅ 添加详细注释

## License

MIT

