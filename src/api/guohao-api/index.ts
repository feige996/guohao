import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { createApis, mountApis, withConfigType } from './createApis'

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:5005',
  ...AdapterUniapp(),
  statesHook: VueHook,
  beforeRequest: (method) => {
    // 设置默认 Content-Type
    method.config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      ...method.config.headers,
    }
  },
  responded: (response) => {
    const {
      statusCode,
      data: rawData,
    } = response as UniNamespace.RequestSuccessCallbackResult

    // 处理 HTTP 状态码错误
    if (statusCode !== 200) {
      const errorMessage = `HTTP请求错误[${statusCode}]`
      console.error('errorMessage===>', errorMessage)
      uni.showToast({
        title: errorMessage,
        icon: 'error',
      })
      throw new Error(errorMessage)
    }

    // 返回数据
    return rawData
  },
})

export const $$userConfigMap = withConfigType({})

const Apis = createApis(alovaInstance, $$userConfigMap)

mountApis(Apis)

export default Apis
