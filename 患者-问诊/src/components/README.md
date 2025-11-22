# 组件库使用说明

本目录包含项目中可复用的通用组件，用于减少代码重复，提高开发效率。

## 📦 组件列表

### 1. PageHeader.vue - 页面头部导航组件

**功能**: 统一的页面头部，包含返回按钮、标题和右侧操作按钮

**Props**:
- `title` (string, 必填): 页面标题
- `showBack` (boolean, 默认: true): 是否显示返回按钮
- `showRight` (boolean, 默认: false): 是否显示右侧按钮
- `rightIcon` ('favorite' | 'more' | 'custom', 默认: 'more'): 右侧图标类型
- `isFavorited` (boolean, 默认: false): 收藏状态（仅当 rightIcon='favorite' 时有效）
- `backgroundColor` (string, 默认: '#FFFFFF'): 背景颜色

**Events**:
- `back`: 点击返回按钮时触发
- `rightClick`: 点击右侧按钮时触发

**使用示例**:
```vue
<PageHeader 
  title="我的处方" 
  @back="handleBack" 
/>

<PageHeader 
  title="医生详情" 
  show-right
  right-icon="favorite"
  :is-favorited="isFavorited"
  @back="handleBack"
  @right-click="toggleFavorite"
/>
```

---

### 2. ConfirmModal.vue - 确认弹窗组件

**功能**: 统一的确认对话框，支持自定义标题、内容和按钮文本

**Props**:
- `visible` (boolean, 必填): 是否显示弹窗
- `title` (string, 必填): 弹窗标题
- `content` (string, 必填): 弹窗内容
- `confirmText` (string, 默认: '确定'): 确认按钮文本
- `cancelText` (string, 默认: '取消'): 取消按钮文本
- `showCancel` (boolean, 默认: true): 是否显示取消按钮
- `confirmColor` (string, 默认: '#8e4337'): 确认按钮颜色

**Events**:
- `confirm`: 点击确认按钮时触发
- `cancel`: 点击取消按钮时触发
- `update:visible`: 弹窗关闭时触发（支持 v-model）

**使用示例**:
```vue
<ConfirmModal
  v-model:visible="showModal"
  title="确认支付"
  content="确认使用微信支付 ¥99.00 吗？"
  @confirm="handlePayment"
  @cancel="handleCancel"
/>
```

---

### 3. DoctorCard.vue - 医生卡片组件

**功能**: 展示医生信息的卡片，支持多种显示模式

**Props**:
- `doctor` (Doctor, 必填): 医生信息对象
- `showOnlineStatus` (boolean, 默认: false): 是否显示在线状态
- `showSpecialty` (boolean, 默认: false): 是否显示擅长领域
- `showStats` (boolean, 默认: false): 是否显示统计信息
- `clickable` (boolean, 默认: true): 是否可点击
- `size` ('small' | 'medium' | 'large', 默认: 'medium'): 卡片尺寸

**Events**:
- `click`: 点击卡片时触发，传递医生信息

**使用示例**:
```vue
<DoctorCard
  :doctor="doctorInfo"
  show-online-status
  show-specialty
  @click="handleDoctorClick"
/>
```

---

### 4. StatusBadge.vue - 状态标签组件

**功能**: 显示各种状态的标签，支持自动配色

**Props**:
- `status` (string, 必填): 状态值（waiting, ongoing, completed, unpaid, paid, expired 等）
- `text` (string, 必填): 显示文本
- `type` ('consultation' | 'prescription' | 'payment' | 'custom', 默认: 'custom'): 状态类型
- `size` ('small' | 'medium' | 'large', 默认: 'medium'): 标签尺寸
- `showIcon` (boolean, 默认: true): 是否显示图标

**使用示例**:
```vue
<StatusBadge 
  status="ongoing" 
  text="进行中" 
  type="consultation"
  size="medium"
/>

<StatusBadge 
  status="unpaid" 
  text="待支付" 
  type="prescription"
/>
```

---

### 5. PaymentMethodSelector.vue - 支付方式选择组件

**功能**: 支付方式选择器，支持微信支付、支付宝等

**Props**:
- `methods` (PaymentMethod[], 必填): 支付方式列表
- `modelValue` (string, 必填): 当前选中的支付方式ID
- `showDescription` (boolean, 默认: true): 是否显示描述

**Events**:
- `update:modelValue`: 选择支付方式时触发（支持 v-model）

**使用示例**:
```vue
<PaymentMethodSelector
  v-model="selectedPayment"
  :methods="paymentMethods"
/>
```

---

### 6. AddressSelector.vue - 收货地址选择组件

**功能**: 收货地址选择器，支持地址管理

**Props**:
- `addresses` (Address[], 必填): 地址列表
- `modelValue` (number, 必填): 当前选中的地址索引
- `showManage` (boolean, 默认: true): 是否显示管理按钮

**Events**:
- `update:modelValue`: 选择地址时触发（支持 v-model）
- `manage`: 点击管理按钮时触发

**使用示例**:
```vue
<AddressSelector
  v-model="selectedAddressIndex"
  :addresses="addressList"
  @manage="manageAddresses"
/>
```

---

### 7. SearchBar.vue - 搜索栏组件

**功能**: 统一的搜索输入框

**Props**:
- `modelValue` (string, 必填): 搜索关键词
- `placeholder` (string, 默认: '搜索'): 占位符文本
- `showButton` (boolean, 默认: true): 是否显示搜索按钮
- `buttonText` (string, 默认: '搜索'): 按钮文本
- `backgroundColor` (string, 默认: '#FFFFFF'): 背景颜色

**Events**:
- `update:modelValue`: 输入时触发（支持 v-model）
- `search`: 点击搜索按钮时触发
- `confirm`: 键盘确认时触发

**使用示例**:
```vue
<SearchBar
  v-model="searchKeyword"
  placeholder="搜索医生姓名、科室"
  @search="handleSearch"
/>
```

---

### 8. TabBar.vue - 标签页组件

**功能**: 标签页切换组件

**Props**:
- `tabs` (Tab[], 必填): 标签列表
- `modelValue` (string, 必填): 当前选中的标签key
- `showCount` (boolean, 默认: false): 是否显示数量
- `backgroundColor` (string, 默认: '#FFFFFF'): 背景颜色

**Events**:
- `update:modelValue`: 切换标签时触发（支持 v-model）
- `change`: 切换标签时触发，传递标签key

**使用示例**:
```vue
<TabBar
  v-model="activeTab"
  :tabs="tabs"
  @change="handleTabChange"
/>

<!-- tabs 数据结构 -->
const tabs = [
  { key: 'all', label: '全部', count: 10 },
  { key: 'unpaid', label: '待支付', count: 3 }
]
```

---

### 9. EmptyState.vue - 空状态组件

**功能**: 无数据时的占位显示

**Props**:
- `icon` (string, 默认: '📭'): 显示的图标
- `text` (string, 默认: '暂无数据'): 提示文本
- `description` (string, 默认: ''): 描述文本
- `showAction` (boolean, 默认: false): 是否显示操作按钮
- `actionText` (string, 默认: '刷新'): 按钮文本

**Events**:
- `action`: 点击操作按钮时触发

**使用示例**:
```vue
<EmptyState 
  v-if="list.length === 0"
  text="暂无问诊记录" 
  icon="📋"
  show-action
  action-text="刷新"
  @action="refreshData"
/>
```

---

## 🎯 使用建议

1. **优先使用组件**: 在开发新页面时，优先考虑使用现有组件，避免重复造轮子
2. **保持一致性**: 使用组件可以确保整个应用的UI风格统一
3. **扩展组件**: 如果现有组件不满足需求，可以通过插槽（slot）扩展功能
4. **提取新组件**: 发现重复代码时，及时提取为新组件

## 📝 组件开发规范

1. 使用 TypeScript 定义 Props 和 Events
2. 提供合理的默认值
3. 支持 v-model 双向绑定（适用时）
4. 添加适当的过渡动画
5. 保持组件的单一职责
6. 编写清晰的注释和文档

## 🔄 后续优化

以下组件可以在后续开发中考虑封装：

- **LoadingOverlay.vue**: 统一的加载遮罩
- **PrescriptionCard.vue**: 处方卡片
- **StepIndicator.vue**: 步骤指示器
- **Toast.vue**: 自定义提示组件
- **ActionSheet.vue**: 底部操作菜单

---

**最后更新**: 2024年
**维护者**: 开发团队
