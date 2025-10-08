export default {
    paymentReqFunc: (params) => {
        return uni.request({
            url: 'https://fc-mp-160d3b4f-98de-4043-9eb6-77fe673d5f62.next.bspapp.com/payment', //仅为示例，并非真实接口地址。
            method: 'GET',
            data: params,
        })
    },
    findOrderReqFunc: (params) => {
        return uni.request({
            url: 'https://fc-mp-160d3b4f-98de-4043-9eb6-77fe673d5f62.next.bspapp.com/findPayOrder', //仅为示例，并非真实接口地址。
            method: 'GET',
            data: params,
        })
    }
}