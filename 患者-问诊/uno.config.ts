import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    // Tailwind CSS / Windi CSS 预设（提供 Tailwind 兼容的工具类）
    presetWind(),
    // Uni-app 预设（提供 rpx 单位支持等）
    presetUni(),
    // 图标预设
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // 自定义主题（可选）
  theme: {
    colors: {
      primary: '#8e4337',
      secondary: '#f5f5f5',
    },
  },
})
