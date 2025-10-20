import type {
  Preset,
} from 'unocss'
// https://www.npmjs.com/package/@uni-helper/unocss-preset-uni
import { presetUni } from '@uni-helper/unocss-preset-uni'

// @see https://unocss.dev/presets/legacy-compat
import { presetLegacyCompat } from '@unocss/preset-legacy-compat'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // 支持css class属性化
    presetAttributify(),
    // TODO: check 是否会有别的影响
    // 处理低端安卓机的样式问题
    // 将颜色函数 (rgb()和hsl()) 从空格分隔转换为逗号分隔，更好的兼容性app端，example：
    // `rgb(255 0 0)` -> `rgb(255, 0, 0)`
    // `rgba(255 0 0 / 0.5)` -> `rgba(255, 0, 0, 0.5)`
    presetLegacyCompat({
      commaStyleColorFunction: true,
    }) as Preset,
  ],
  transformers: [
    // 启用指令功能：主要用于支持 @apply、@screen 和 theme() 等 CSS 指令
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
  ],
  shortcuts: [
    {
      'center': 'flex justify-center items-center',
      // 文本截断快捷类
      'line-clamp-1': 'overflow-hidden text-ellipsis whitespace-nowrap',
      'line-clamp-2': 'overflow-hidden text-ellipsis line-clamp-2',
    },
  ],
  // 动态图标需要在这里配置，或者写在vue页面中注释掉
  safelist: ['i-carbon-code'],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
    // 文本截断规则
    [/^line-clamp-(\d+)$/, ([, num]) => ({
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': num,
      'text-overflow': 'ellipsis',
    })],
    // 支持rpx单位的自定义规则
    [/^text-\[(\d+)rpx\]$/, ([, d]) => ({ 'font-size': `${d}rpx` })],
    [/^leading-\[([^\]]+)\]$/, ([, d]) => ({ 'line-height': d })],
  ],
  theme: {
    colors: {
      /** 主题色，用法如: text-primary */
      primary: 'var(--wot-color-theme,#0957DE)',
    },
    background: {
      /** 渐变背景色 */
      primary: 'linear-gradient(180deg, #f6e2d3 0%, #f9f0e6 100%)',
      secondary: 'linear-gradient(180deg, #c35959ff 0%, #df273fff 100%)',
    },
    fontSize: {
      /** 提供更小号的字体，用法如：text-2xs */
      '2xs': ['20rpx', '28rpx'],
      '3xs': ['18rpx', '26rpx'],
    },
  },
})
