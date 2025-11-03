import { isH5 } from '@uni-helper/uni-env'
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'custom',
    backgroundColor: '#f6e2d3',
    navigationBarBackgroundColor: '#f6e2d3',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 预加载规则
  // TODO: 以后需要时候再放开，暂时先关闭，影响开发。
  // preloadRule: {
  // // 可以配置多个触发页面
  //   'pages/index/index': {
  //     network: 'all',
  //     packages: ['TUIKit'],
  //   },
  // },
  // 分包配置
  subPackages: [
    {
      root: 'pages-user-home',
      pages: [
        {
          path: 'fuwuCard/AddressManagement',
          type: 'page',
        },
        {
          path: 'fuwuCard/ConsultationRecord',
          type: 'page',
        },
        {
          path: 'fuwuCard/HealthRecordEdit',
          type: 'page',
        },
        {
          path: 'fuwuCard/HealthRecordModal',
          type: 'page',
        },
        {
          path: 'shezhiCard/feedback',
          type: 'page',
        },
      ],
    },
    {
      root: 'pages-user-diagnosis',
      pages: [
        // consultation-guide 页面
        {
          path: 'consultation-guide/index',
          type: 'page',
        },
        {
          path: 'consultation-guide/chat',
          type: 'page',
        },
        {
          path: 'consultation-guide/message-confirm',
          type: 'page',
        },
        {
          path: 'consultation-guide/message-form',
          type: 'page',
        },
        {
          path: 'consultation-guide/wechat-service',
          type: 'page',
        },
        // medication-purchase-service 页面
        {
          path: 'medication-purchase-service/index',
          type: 'page',
        },
        {
          path: 'medication-purchase-service/follow-up-prescription',
          type: 'page',
        },
        {
          path: 'medication-purchase-service/health-prescription',
          type: 'page',
        },
        {
          path: 'medication-purchase-service/prescription-detail',
          type: 'page',
        },
        {
          path: 'medication-purchase-service/prescription-order',
          type: 'page',
        },
        // online-consultation 页面
        {
          path: 'online-consultation/index',
          type: 'page',
        },
        {
          path: 'online-consultation/appointment',
          type: 'page',
        },
        {
          path: 'online-consultation/consultation',
          type: 'page',
        },
        {
          path: 'online-consultation/doctor-rating',
          type: 'page',
        },
        {
          path: 'online-consultation/payment',
          type: 'page',
        },
        {
          path: 'online-consultation/phone-consultation',
          type: 'page',
        },
        {
          path: 'online-consultation/video-consultation',
          type: 'page',
        },
        {
          path: 'online-consultation/waiting-room',
          type: 'page',
        },
        // smart-self-diagnosis 页面
        {
          path: 'smart-self-diagnosis/index',
          type: 'page',
        },
        {
          path: 'smart-self-diagnosis/diagnosis-result',
          type: 'page',
        },
        {
          path: 'smart-self-diagnosis/diagnosis-test',
          type: 'page',
        },
      ],
    },
  ],
  // tabbar 的配置统一在 "./src/tabbar/config.ts" 文件中
  // 无tabbar模式下，h5 设置为 {} 为了防止浏览器报错导致白屏
  tabBar: tabBar || (isH5 ? {} : undefined) as any,
})
