# 首页图片资源说明

本目录包含了普通用户首页 (`src/pages/normal/index/index.vue`) 使用的所有图片资源。

## 图片列表

| 文件名 | 用途 | 尺寸 | 位置 |
|--------|------|------|------|
| `background.webp` | 页面主背景图 | 全屏 | 页面最底层 |
| `status-bar-bg.png` | 状态栏背景 | 375x40px | 页面顶部 |
| `network-icon.png` | 网络信号图标 | 小图标 | 状态栏右侧 |
| `wifi-icon.png` | WiFi信号图标 | 小图标 | 状态栏右侧 |
| `battery-icon.png` | 电池图标 | 小图标 | 状态栏右侧 |
| `arrow-icon.png` | 箭头图标 | 18x10px | 专业咨询卡片 |
| `upgrade-arrow.png` | 升级箭头图标 | 12x12px | 升级会员按钮 |
| `search-icon.png` | 搜索图标 | 16x16px | 搜索框内 |
| `decoration.png` | 装饰图片 | 137x131px | 页面右侧装饰 |
| `health-manager-icon.png` | 健康管家图标 | 20px宽 | 问医生区域 |
| `appointment-icon.png` | 预约问诊背景 | 164x78px | 专属权益区域 |
| `message-icon.png` | 我的消息背景 | 164x78px | 专属权益区域 |
| `collection-icon.png` | 养生收藏背景 | 164x78px | 专属权益区域 |
| `product-icon.png` | 关注商品背景 | 164x78px | 专属权益区域 |
| `all-function-bg1.png` | 全部功能背景1 | 113px宽 | 全部功能卡片 |
| `all-function-bg2.png` | 全部功能背景2 | 93px宽 | 全部功能卡片 |
| `settings-icon.png` | 设置图标 | 56x56px | 设置按钮 |
| `settings-arrow.png` | 设置箭头 | 12x12px | 设置文字旁 |
| `calendar-bg.png` | 日历背景 | 全宽 | 日历和体质区域背景 |
| `calendar-icon.png` | 日历图标 | 141x140px | 日历信息区域 |
| `constitution-badge.png` | 体质徽章 | 72x20px | 体质状态标签 |

## 原始URL映射

所有图片都是从以下CDN地址下载的：
- 原始域名: `seal-img.nos-jd.163yun.com`
- 路径格式: `/obj/w5rCgMKVw6DCmGzCmsK-/{id}/{hash1}/{hash2}/{hash3}/{filename}.{ext}`

## 使用说明

1. 这些图片已经在Vue页面中使用本地路径引用：`/static/images/homepage/{filename}`
2. 所有图片都已经过优化，适合移动端显示
3. 图片格式包括PNG和WebP，保证了良好的显示效果和加载性能
4. 如需替换图片，请保持相同的文件名和尺寸比例

## 注意事项

- 请勿删除或重命名这些图片文件，否则页面显示会出现问题
- 如需更新图片，请保持相同的文件名
- 建议保持图片的原始尺寸比例以确保最佳显示效果
