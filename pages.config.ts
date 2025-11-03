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
          type: 'page'
        },
        {
          path: 'fuwuCard/ConsultationRecord',
          type: 'page'
        },
        {
          path: 'fuwuCard/HealthRecordEdit',
          type: 'page'
        },
        {
          path: 'fuwuCard/HealthRecordModal',
          type: 'page'
        },
        {
          path: 'shezhiCard/feedback',
          type: 'page'
        }
      ]
    }
  ],
  // tabbar 的配置统一在 "./src/tabbar/config.ts" 文件中
  // 无tabbar模式下，h5 设置为 {} 为了防止浏览器报错导致白屏
  tabBar: tabBar || (isH5 ? {} : undefined) as any
})
