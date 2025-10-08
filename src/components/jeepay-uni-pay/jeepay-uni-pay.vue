<template>
    <uni-popup ref="refPopup" :is-mask-click="false" type="center">
        <view class="pay-wrapper">
            <view class="pay-title">支付结果</view>
            <view class="content">
                <view class="payment">
                    <view class="amount"> <text class="unit">￥</text>{{ orderInfo.amount }}</view>
                    <view class="subtitle">支付金额</view>
                </view>
                <view class="order-state">订单状态：{{ orderInfo.orderStateText }}</view>
            </view>
            <view class="but-wrap">
                <view class="but-item" hover-stay-time="150" hover-class="touch-but" @tap="close">取消</view>
                <view class="but-item refresh" hover-stay-time="150" hover-class="touch-but" @tap="findOrder">刷新</view>
            </view>
        </view>
    </uni-popup>
</template>

<script>
import paymentConfig from './paymentConfig.js';
import { appToAliH5, wxLitePay, openWxLitePay, wechatH5Func, openH5Pay, appToAliLite, aliLiteFunc } from './pay.js';
let payFunc = () => {};
export default {
    props: {
        autoFindOrderState: {
            type: Boolean, //是否自动查询订单状态
            default: false,
        },
        countdown: {
            type: Number,
            default: 3,
        },
        autoPay: {
            type: Boolean, // 是否自动下单
            default: true,
        },
    },
    data() {
        return {
            findOrderInfo: {},
            orderInfo: {
                amount: '',
            },
        };
    },
    methods: {
        // 调用云函数 下单 发起支付
        submitOrderToPayment(par) {
            const params = this.supplementaryParams(JSON.parse(JSON.stringify(par)));
            uni.showLoading({ title: '请稍等...' });
            return this.validate(params)
                .then((res) => {
                    return paymentConfig.paymentReqFunc(params).then(({ data }) => {
                        const payInfo = data.data;
                        if (payInfo.code != 0 || payInfo.data.errCode) return this.errTips(payInfo.data || payInfo.msg);
                        if (payInfo.code == 0) {
                            this.findOrderInfo.mchOrderNo = payInfo.data.mchOrderNo;
                            this.findOrderInfo.payOrderId = payInfo.data.payOrderId;
                        }
                        if (this.autoPay) return this.pay(payInfo);
                        return Promise.resolve(payInfo);
                    });
                })
                .catch((err) => {
                    this.errTips(err);
                });
        },
        // 对必要数据进行校验
        validate(val) {
            const rule = [
                { key: 'amount', erMsg: '请输入支付金额' },
                { key: 'mchOrderNo', erMsg: '请传入商户订单号' },
                { key: 'payType', erMsg: '请传入支付方式' },
                { key: 'subject', erMsg: '请传入商品标题' },
                { key: 'body', erMsg: '请传入商品描述' },
            ];
            return new Promise((resolve, reject) => {
                for (let i = 0; i < rule.length; i++) {
                    const item = rule[i];
                    if (!val[item.key]) {
                        return reject(item.erMsg);
                    }
                }
                // #ifdef MP-WEIXIN
                if ((!val.channelExtra || !val.channelExtra.openid) && val.payType == 'wxLite') return reject('请传入openid');
                // #endif
                // #ifdef H5
                if (val.payType == 'wxH5' && (!val.channelExtra || !val.channelExtra.openid)) return reject('请传入openid');
                // #endif
                return resolve(true);
            });
        },
        // 错误提示
        errTips(msg) {
            const erMsg = typeof msg === 'string' ? msg : JSON.stringify(msg);
            uni.hideLoading();
            uni.showToast({ title: erMsg, icon: 'none', duration: 5000 });
            return Promise.reject(erMsg);
        },
        // 发起支付
        pay(data) {
            const payInfo = this.isJson(data.data.payData) ? JSON.parse(data.data.payData) : data.data.payData;
            payFunc(payInfo);
            if (this.autoFindOrderState) {
                setTimeout(() => {
                    this.findOrder();
                }, this.countdown * 1000);
            }
            uni.hideLoading();
            return Promise.resolve(data);
        },
        // 根据不同支付方式选择支付函数  并对参数进行补充  
        supplementaryParams(params) {
            params.reqTime = new Date().getTime();
            // #ifdef MP-WEIXIN
            switch (params.payType) {
                case 'openWxLitePay':
                    params.wayCode = 'QR_CASHIER';
                    params.channelExtra = { entryLiteType: 'wxapp' };
                    payFunc = openWxLitePay;
                    break;
                default:
                    payFunc = wxLitePay;
                    params.wayCode = 'WX_LITE';
            }
            // #endif
            // #ifdef MP-ALIPAY
            switch (params.payType) {
                case 'aliLite':
                    params.wayCode = 'ALI_LITE';
                    params.channelExtra = JSON.stringify(params.channelExtra);
                    payFunc = aliLiteFunc;
                    break;
            }
            // #endif
            // #ifdef H5
            switch (params.payType) {
                case 'wxH5':
                    payFunc = wechatH5Func;
                    params.wayCode = 'WX_JSAPI';
                    break;
                case 'wxH5ToWxLite':
                    payFunc = openH5Pay;
                    params.wayCode = 'QR_CASHIER';
                    params.channelExtra = { entryLiteType: 'wxh5' };
                    break;
                case 'aliH5':
                    payFunc = openH5Pay;
                    params.wayCode = 'QR_CASHIER';
                    break;
                case 'wxLiteToH5':
                    payFunc = openH5Pay;
                    params.wayCode = 'QR_CASHIER';
                    break;
            }
            // #endif
            // #ifdef APP-PLUS
            switch (params.payType) {
                case 'appToAliH5':
                    payFunc = appToAliH5;
                    params.wayCode = 'QR_CASHIER';
                    break;
                case 'appToWxLite':
                    payFunc = openH5Pay;
                    params.wayCode = 'QR_CASHIER';
                    params.channelExtra = { entryLiteType: 'wxh5' };
                    break;
                case 'appToAliLite':
                    payFunc = appToAliLite;
                    params.wayCode = 'QR_CASHIER';
                    params.channelExtra = { entryLiteType: 'aliapp' };
                    break;
            }
            // #endif
            return params;
        },
        // 判断字符串是否为JSON
        isJson(str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            }
        },
        // 关闭弹窗
        close() {
            this.$refs.refPopup.close();
        },
        // 查询订单函数
        findOrder(params = {}) {
            uni.showLoading({ title: '查询中 请稍等...' });
            if (params.mchOrderNo) {
                params.reqTime = new Date().getTime();
                this.findOrderInfo = params;
            } else {
                this.findOrderInfo.reqTime = new Date().getTime();
            }
            return paymentConfig.findOrderReqFunc(this.findOrderInfo).then(({ data }) => {
                const findOrderInfo = data.data;
                if (findOrderInfo.code == 0) {
                    this.orderInfo.amount = (findOrderInfo.data.amount / 100).toFixed(2);
                    this.orderInfo.orderStateText = this.getStateObj(findOrderInfo.data.state);
                    if (this.autoFindOrderState) {
                        this.$refs.refPopup.open();
                    }
                    uni.hideLoading();
                    return Promise.resolve(findOrderInfo);
                } else {
                    if (findOrderInfo.code != 0 || findOrderInfo.data.errCode) return this.errTips(findOrderInfo.data);
                    return Promise.reject(findOrderInfo);
                }
            });
        },
        // 支付状态对象
        getStateObj(state) {
            const stateObj = {
                0: '订单生成',
                1: '支付中',
                2: '支付成功',
                3: '支付失败',
                4: '已撤销',
                5: '已退款',
                6: '订单关闭',
            };
            return stateObj[state];
        },
        // 不同的支付放方式
        appToAliH5,
        wxLitePay,
        openWxLitePay,
        wechatH5Func,
        openH5Pay,
        appToAliLite,
        aliLiteFunc,
    },
};
</script>

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
            .order-state {
                display: flex;
                justify-content: center;
                text-align: center;
                width: 100%;
                font-size: 30rpx;
                color: #333;
            }
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
