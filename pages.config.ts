import { isH5 } from '@uni-helper/uni-env'
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
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
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        {
          path: 'components/TUIChat/index',
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        // 集成 chat 组件，必须配置该路径: 视频播放
        {
          path: 'components/TUIChat/video-play',
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        {
          path: 'components/TUIChat/web-view',
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        {
          path: 'components/TUIContact/index',
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        {
          path: 'components/TUIGroup/index',
          style: {
            navigationBarTitleText: '腾讯云 IM',
          },
        },
        {
          path: 'components/TUISearch/index',
          style: {
            navigationBarTitleText: '聊天记录',
          },
        },
      ],
    },
  ],
  // 预加载规则
  preloadRule: {
    'pages/index/index': {
      network: 'all',
      packages: ['TUIKit'],
    },
  },
  // tabbar 的配置统一在 “./src/tabbar/config.ts” 文件中
  // 无tabbar模式下，h5 设置为 {} 为了防止浏览器报错导致白屏
  tabBar: tabBar || (isH5 ? {} : undefined) as any,
})
