export function appToAliH5 (url) {
    return new Promise((resolve, reject) => {
        const alipayUrl = 'alipays://platformapi/startapp?saId=10000007' + '&qrcode=' + encodeURIComponent(url)
        plus.runtime.openURL(
            alipayUrl,
            function (res) {
                resolve(res)
            }
        )
    })
}
// 微信小程序原生支付
export function wxLitePay (data) {
    return uni.requestPayment({
        provider: 'wxpay',
        ...data,
        success: function (res) {
            console.log('success', res)

        },
        fail: function (err) {
            console.log('fail', err)
        }
    })
}
// 跳转另一个小程序支付
export function openWxLitePay (val) {

    return uni.openEmbeddedMiniProgram({
        appId: val.appid,
        path: val.path + '?q=' + encodeURIComponent(val.qrUrl),
        envVersion: val.env,
        success (res) {
            return Promise.resolve('跳转小程序成功', res)

        },
        fail (err) {
            console.log(err);
            return Promise.reject('跳转小程序失败', err)
        }
    })
}
export function wechatH5Func (payOrderInfo) {


    const onBridgeReady = function () {

        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke('getBrandWCPayRequest', payOrderInfo, function (res) {



            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                // //重定向

                if (payOrderInfo.returnUrl) {
                    location.href = payOrderInfo.returnUrl;
                } else {
                    // alert('支付成功！');
                    // if(payOrderInfo.fun) return payOrderInfo.fun()	
                    window.WeixinJSBridge.call('closeWindow')

                }

            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                // payCancel(orderRes.payOrderId)
                alert("支付取消");

            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
                alert('支付失败:' + JSON.stringify(res))
            }
            if (res.err_msg == "total_fee") {
                alert('缺少参数')
            }

        }
        );
    }


    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}
// app open H5Pay
export function openH5Pay (url) {
    console.log(url);
    // #ifdef APP-PLUS
    plus.runtime.openURL(url)
    // #endif
    // #ifdef H5
    window.location.href = url
    // #endif
}
export function appToAliLite (payData) {
    let payDataObj = payData
    let alipayUrl = ''
    if (uni.getSystemInfoSync().platform == "ios") {
        alipayUrl = "alipay://platformapi/startapp?appId=" + payDataObj.appId + "&page=" + payDataObj.path + "&query=qrCode=" + payDataObj.qrUrl
        plus.runtime.launchApplication(
            { action: alipayUrl },
            function (res) {

            }
        )
        return false
    }
    alipayUrl = "alipays://platformapi/startapp?appId=" + payDataObj.appId + "&page=" + payDataObj.path + "&query=qrCode=" + payDataObj.qrUrl
    plus.runtime.openURL(
        alipayUrl,
        function (res) {

        }
    )
}

export function alitH5 (url) {
    // #ifdef H5
    window.location.href = url
    // #endif
}
export function aliLiteFunc (orderInfo) {
    uni.requestPayment({
        provider: 'alipay',
        orderInfo: orderInfo,
        success: function (res) {
            console.log('success', res)

        },
        fail: function (err) {
            console.log('fail', err)
        }

    })
}