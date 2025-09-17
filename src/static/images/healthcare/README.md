# Healthcare 页面图片资源

本目录包含 healthcare.vue 页面使用的所有图片资源。

## 图片列表

### 导诊顾问卡片
- `guide-bg.png` - 导诊顾问卡片背景图
- `guide-decoration.png` - 导诊顾问卡片装饰图
- `guide-avatar.png` - 导诊顾问头像图标
- `guide-icon1.png` - 导诊顾问功能图标1（专业指导）
- `guide-icon2.png` - 导诊顾问功能图标2（快速问答）
- `guide-arrow.png` - 导诊顾问箭头图标

### 在线问诊卡片
- `consult-bg.png` - 在线问诊卡片背景图
- `consult-decoration.png` - 在线问诊卡片装饰图
- `consult-avatar.png` - 在线问诊医生头像图标
- `consult-icon1.png` - 在线问诊功能图标1（与专家实时沟通）
- `consult-icon2.png` - 在线问诊功能图标2（服务严格质控）
- `consult-arrow.png` - 在线问诊箭头图标

## 原始来源

所有图片均从以下CDN地址下载：
`https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/`

## 使用方式

在 Vue 文件中使用 `@img` 别名引用：
```vue
<image src="@img/healthcare/guide-bg.png" mode="aspectFill" />
```

## 注意事项

1. 所有图片均为 PNG 格式
2. 图片已优化，适合在移动端使用
3. 使用 `@img` 别名可以确保在不同平台（H5、小程序、App）中正确加载
