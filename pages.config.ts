import { isH5 } from '@uni-helper/uni-env'
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  pages: [
    {
      path: 'pages/shop/cart',
      style: {},
    },
    {
      path: 'pages/normal/index/appointmentConsult',
      style: {
        navigationBarTitleText: '我的预约',
      },
    },
    {
      path: 'pages/normal/index/healthConsult',
      style: {
        navigationBarTitleText: '健康问答',
      },
    },
    {
      path: 'pages/normal/me/components/ServiceCard/ConsultationRecord',
      style: {},
    },
    {
      path: 'pages/normal/me/components/ServiceCard/AddressManagement',
      style: {},
    },
  ],
  globalStyle: {
    navigationStyle: 'custom',
    backgroundColor: '#f6e2d3',
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
  // TUIKit 分包配置
  subPackages: [
    {
      root: 'TUIKit',
      pages: [
        {
          path: 'components/TUIConversation/index',
          style: {},
        },
        {
          path: 'components/TUIChat/index',
          style: {},
        },
        // 集成 chat 组件，必须配置该路径: 视频播放
        {
          path: 'components/TUIChat/video-play',
          style: {},
        },
        {
          path: 'components/TUIChat/web-view',
          style: {},
        },
        {
          path: 'components/TUIContact/index',
          style: {},
        },
        {
          path: 'components/TUIGroup/index',
          style: {},
        },
        {
          path: 'components/TUISearch/index',
          style: {},
        },
      ],
    },
  ],
  // 预加载规则
  preloadRule: {
  // 可以配置多个触发页面
    'pages/normal/index/index': {
      network: 'all',
      packages: ['TUIKit'],
    },
    // 可以配置多个触发页面
    'pages/doctor/index/index': {
      network: 'all',
      packages: ['TUIKit'],
    },
  },
  // tabbar 的配置统一在 “./src/tabbar/config.ts” 文件中
  // 无tabbar模式下，h5 设置为 {} 为了防止浏览器报错导致白屏
  tabBar: tabBar || (isH5 ? {} : undefined) as any,
})
