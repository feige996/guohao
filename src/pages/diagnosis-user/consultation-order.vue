<script setup lang="ts">
import type { ConsultationMethodOption, ConsultationType, Doctor } from '@/data'
import {
  ConsultationMethod,
  consultationMethods,
  healthConcerns,
  mockDoctors,
  PaymentMethod,

} from '@/data'
import ConfirmModal from './components/ConfirmModal.vue'
import HealthConcernSelector from './components/HealthConcernSelector.vue'
import PaymentMethodSelector from './components/PaymentMethodSelector.vue'

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '请填写问诊信息',
  },
})
// 路由参数（从路由参数获取）
const dispatchMode = ref<string>('smart') // smart(智能推荐), assign(指定医生), clinic(坐诊模式)
const doctorId = ref<string>('')
const consultationType = ref<string>('') // text-image, video, voice
const scheduleDate = ref<string>('') // 预约日期（坐诊模式使用）
const scheduleTime = ref<string>('') // 预约时间段（坐诊模式使用）
const action = ref<string>('') // 操作类型：queue（取号）或 appointment（预约）

// 指定医生信息（从后端获取）
const assignedDoctor = ref<Doctor | null>(null)

const selectedDispatch = ref('smart')
const selectedConsultationMethod = ref<string>(ConsultationMethod.TEXT_IMAGE) // 选中的问诊方式
const selectedConsultationTypes = ref<string[]>(['constitution'])
const symptomDescription = ref(
  '最近感觉身体不适，有轻微头痛和乏力的症状，持续了大约三天左右，想咨询一下医生的建议。',
)
const existingHistory = ref('')
const allergyHistory = ref('')
const uploadedImages = ref<string[]>([])
const selectedPayment = ref(PaymentMethod.WECHAT)

const showTypeModal = ref(false)

const selectedTypeLabels = computed(() => {
  return healthConcerns
    .filter((type: ConsultationType) => selectedConsultationTypes.value.includes(type.id))
    .map((type: ConsultationType) => type.label)
    .join('、')
})

const fee = computed(() => {
  const selectedMethod = consultationMethods.find((m: ConsultationMethodOption) => m.id === selectedConsultationMethod.value)
  return selectedMethod ? selectedMethod.price : 99 // 直接返回选中方式的固定价格
})

const consultationMode = computed(() => {
  const selectedMethod = consultationMethods.find((m: ConsultationMethodOption) => m.id === selectedConsultationMethod.value)
  return selectedMethod ? selectedMethod.title : '图文问诊'
})

const validityDisplay = computed(() => {
  const selectedMethod = consultationMethods.find((m: ConsultationMethodOption) => m.id === selectedConsultationMethod.value)
  if (!selectedMethod)
    return '72 小时'

  const unit = selectedMethod.durationUnit === 'hours' ? '小时' : '分钟'
  return `${selectedMethod.duration} ${unit}`
})

// 根据模式动态获取可用的问诊方式
const availableConsultationMethods = computed(() => {
  // 智能推荐模式：显示所有问诊方式
  if (dispatchMode.value === 'smart') {
    return consultationMethods
  }

  // 指定医生或坐诊模式：仅显示医生支持的问诊方式
  if (assignedDoctor.value && assignedDoctor.value.consultationMethods) {
    return consultationMethods.filter((method: ConsultationMethodOption) =>
      assignedDoctor.value?.consultationMethods?.includes(method.id),
    )
  }

  // 默认返回所有方式
  return consultationMethods
})

// 判断是否需要显示医生信息
const showDoctorInfo = computed(() => {
  return (dispatchMode.value === 'assign' || dispatchMode.value === 'clinic') && assignedDoctor.value
})

// 判断是否为派单模式
const isDispatchMode = computed(() => {
  return dispatchMode.value === 'smart' || dispatchMode.value === 'assign'
})

// 判断是否为坐诊模式
const isClinicMode = computed(() => {
  return dispatchMode.value === 'clinic'
})

// 页面加载时获取路由参数
onLoad((options: any) => {
  console.log('问诊订单页路由参数:', options)

  // 获取问诊模式
  if (options.mode) {
    dispatchMode.value = options.mode
  }

  // 获取医生ID（指定医生和坐诊模式需要）
  if (options.doctorId) {
    doctorId.value = options.doctorId
  }

  // 获取问诊方式
  if (options.consultationType) {
    consultationType.value = options.consultationType
    selectedConsultationMethod.value = options.consultationType
  }

  // 获取预约日期（坐诊模式）
  if (options.scheduleDate) {
    scheduleDate.value = decodeURIComponent(options.scheduleDate)
  }

  // 获取预约时间段（坐诊模式）
  if (options.scheduleTime) {
    scheduleTime.value = decodeURIComponent(options.scheduleTime)
  }

  // 获取操作类型（坐诊模式：queue取号/appointment预约）
  if (options.action) {
    action.value = options.action
  }

  // 根据医生ID获取医生信息（仅指定医生和坐诊模式需要）
  if ((dispatchMode.value === 'assign' || dispatchMode.value === 'clinic') && doctorId.value) {
    assignedDoctor.value = mockDoctors[doctorId.value as string]
    console.log('已加载医生信息:', assignedDoctor.value)
  }
})

function handleSelectDispatch(id: string) {
  selectedDispatch.value = id
}

// 选择问诊方式
function handleSelectConsultationMethod(methodId: string) {
  selectedConsultationMethod.value = methodId
}

function openTypeModal() {
  showTypeModal.value = true
}

function handleTypeConfirm() {
  showTypeModal.value = false
}

function handleUpload() {
  uni.showToast({
    title: '上传功能暂未开放',
    icon: 'none',
  })
}

function handleBack() {
  uni.navigateBack()
}

// 支付中状态
const isPaying = ref(false)

// 支付确认弹窗
const showPaymentModal = ref(false)

// 支付方式列表（简化版）
const paymentMethodList = [
  {
    id: PaymentMethod.WECHAT,
    name: '微信支付',
    icon: '💚',
    description: '推荐使用',
    iconType: 'wechat' as const,
    bgColor: '#F5F5F0',
  },
  {
    id: PaymentMethod.ALIPAY,
    name: '支付宝',
    icon: '💙',
    description: '安全快捷',
    iconType: 'alipay' as const,
    bgColor: '#F5F5F0',
  },
]

function handleSubmitOrder() {
  // 验证必填项
  if (symptomDescription.value.trim().length < 10) {
    uni.showToast({
      title: '请详细描述您的症状',
      icon: 'none',
    })
    return
  }

  // 显示支付确认
  showPaymentModal.value = true
}

// 确认支付
function confirmPayment() {
  startPayment()
}

// 获取支付方式名称
function getPaymentMethodName() {
  return selectedPayment.value === PaymentMethod.WECHAT ? '微信支付' : '支付宝支付'
}

// 模拟支付流程
function startPayment() {
  isPaying.value = true
  uni.showLoading({
    title: '支付中...',
    mask: true,
  })

  // 模拟支付处理（2秒）
  setTimeout(() => {
    uni.hideLoading()
    isPaying.value = false

    // 支付成功
    uni.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 1500,
    })

    // 延迟跳转到问诊记录页，默认显示待接诊状态
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/diagnosis-user/consultation-records?tab=waiting',
      })
    }, 1500)
  }, 2000)
}
</script>

<template>
  <view class="relative h-screen w-full flex flex-col overflow-hidden bg-gray-50">
    <view class="absolute inset-0 z-0 from-gray-100 via-gray-50 to-white bg-gradient-to-b" aria-hidden="true" />

    <scroll-view scroll-y class="min-h-0 flex-1 px-24rpx pb-40rpx">
      <!-- 智能推荐模式-派单方式 -->
      <view v-if="dispatchMode === 'smart'" class="mb-32rpx">
        <text class="mb-16rpx mt-20rpx block text-28rpx text-gray-800 font-semibold">医生</text>
        <view class="flex gap-18rpx border border-primary/45 rounded-18rpx from-primary/10 to-white/95 bg-gradient-to-br p-20rpx shadow-md transition-all -translate-y-2rpx">
          <view class="flex items-center">
            <view class="h-32rpx w-32rpx flex items-center justify-center border-2rpx border-primary/20 rounded-full bg-white">
              <view class="h-18rpx w-18rpx rounded-full bg-primary" />
            </view>
          </view>
          <view class="flex flex-1 flex-col gap-6rpx">
            <view class="flex items-center gap-12rpx">
              <text class="text-28rpx text-gray-800 font-semibold">智能推荐</text>
              <text class="rounded-full bg-primary/12 px-14rpx py-4rpx text-20rpx text-primary font-semibold">AI</text>
            </view>
            <text class="text-24rpx text-gray-500 leading-relaxed">系统根据您的症状,历史问诊记录，智能匹配专业医生，2 小时内响应</text>
          </view>
        </view>
      </view>

      <!-- 指定医生模式 -->
      <view v-else-if="(dispatchMode === 'assign' || dispatchMode === 'clinic') && assignedDoctor" class="mb-32rpx">
        <text class="mb-16rpx block text-28rpx text-gray-800 font-semibold">{{ dispatchMode === 'clinic' ? '预约医生' : '指定医生' }}</text>
        <view class="flex gap-24rpx border border-primary/15 rounded-20rpx from-primary/6 to-white/95 bg-gradient-to-br p-24rpx shadow-lg">
          <image :src="assignedDoctor.avatar" class="h-120rpx w-120rpx flex-shrink-0 border-2rpx border-primary/15 rounded-16rpx" mode="aspectFill" />
          <view class="flex flex-1 flex-col gap-12rpx">
            <view class="flex items-center gap-16rpx">
              <text class="text-30rpx text-gray-800 font-bold">{{ assignedDoctor.name }}</text>
              <view class="flex items-center gap-8rpx rounded-full bg-green-500/12 px-12rpx py-4rpx">
                <view class="h-12rpx w-12rpx rounded-full bg-green-500" />
                <text class="text-20rpx text-green-500 font-semibold">在线</text>
              </view>
            </view>
            <text class="text-24rpx text-gray-500 font-medium">{{ assignedDoctor.title }} · {{ assignedDoctor.department }}</text>
            <text class="text-22rpx text-gray-400">{{ assignedDoctor.hospital }}</text>

            <!-- 坐诊模式显示预约信息 -->
            <view v-if="dispatchMode === 'clinic'" class="mt-16rpx border border-primary/10 rounded-12rpx from-primary/5 to-white/80 bg-gradient-to-br p-16rpx">
              <view v-if="scheduleDate" class="mb-8rpx flex items-center gap-8rpx">
                <text class="min-w-120rpx text-22rpx text-gray-500 font-medium">📅 预约日期：</text>
                <text class="flex-1 text-22rpx text-primary font-semibold">{{ scheduleDate }}</text>
              </view>
              <view v-if="scheduleTime" class="mb-8rpx flex items-center gap-8rpx">
                <text class="min-w-120rpx text-22rpx text-gray-500 font-medium">⏰ 预约时间：</text>
                <text class="flex-1 text-22rpx text-primary font-semibold">{{ scheduleTime }}</text>
              </view>
              <view class="mb-8rpx flex items-center gap-8rpx">
                <text class="min-w-120rpx text-22rpx text-gray-500 font-medium">🎫 取号类型：</text>
                <text class="flex-1 text-22rpx text-primary font-semibold">
                  {{ action === 'queue' ? '立即取号（当前问诊）' : '提前预约' }}
                </text>
              </view>
              <view class="flex items-center gap-8rpx">
                <text class="min-w-120rpx text-22rpx text-gray-500 font-medium">💊 问诊模式：</text>
                <text class="flex-1 text-22rpx text-primary font-semibold">在线坐诊</text>
              </view>
            </view>

            <text v-else class="mt-4rpx text-22rpx text-primary">{{ assignedDoctor.responseTime }}</text>
          </view>
        </view>
      </view>

      <view class="mb-32rpx">
        <text class="mb-16rpx block text-28rpx text-gray-800 font-semibold">问诊信息</text>
        <view class="border border-gray-200/80 rounded-20rpx bg-white/95 p-28rpx shadow-lg backdrop-blur-6rpx">
          <view class="mb-28rpx">
            <text class="mb-12rpx block text-26rpx text-gray-700 font-semibold">健康问题</text>
            <view v-if="dispatchMode === 'clinic'" class="border border-gray-200 rounded-12rpx bg-gray-50 px-24rpx py-16rpx">
              <text class="text-26rpx text-gray-700">
                {{
                  consultationType === 'text-voice' ? '图文+语音'
                  : consultationType === 'video' ? '实时视频'
                    : consultationType === 'voice' ? '实时语音' : '请选择健康问题'
                }}
              </text>
            </view>
            <view v-else class="flex cursor-pointer items-center justify-between border border-gray-200 rounded-12rpx bg-gray-50 px-24rpx py-16rpx transition-all active:bg-gray-100" @tap="openTypeModal">
              <text
                class="flex-1 text-26rpx"
                :class="selectedConsultationTypes.length === 0 ? 'text-gray-400' : 'text-gray-700'"
              >
                {{
                  selectedConsultationTypes.length > 0
                    ? selectedTypeLabels
                    : "请选择健康问题（可多选）"
                }}
              </text>
              <text class="text-32rpx text-gray-400 font-bold">›</text>
            </view>
            <view v-if="selectedConsultationTypes.length > 0 && dispatchMode !== 'clinic'" class="mt-12rpx flex flex-wrap gap-12rpx">
              <view
                v-for="typeId in selectedConsultationTypes"
                :key="typeId"
                class="border border-primary/20 rounded-full bg-primary/10 px-16rpx py-8rpx"
              >
                <text class="text-22rpx text-primary font-medium">{{ healthConcerns.find((t) => t.id === typeId)?.label }}</text>
              </view>
            </view>
          </view>

          <view class="mb-28rpx">
            <view class="mb-12rpx flex items-center justify-between">
              <text class="text-26rpx text-gray-700 font-semibold"><text class="text-red-500">*</text> 症状描述（主诉）</text>
              <text class="text-22rpx text-gray-400">
                {{ symptomDescription.length }}/500
              </text>
            </view>
            <textarea
              v-model="symptomDescription"
              :maxlength="500"
              class="min-h-200rpx w-full resize-none border border-gray-200 rounded-12rpx bg-gray-50 p-20rpx text-26rpx text-gray-700 leading-relaxed transition-colors focus:border-primary focus:bg-white placeholder:text-gray-400"
              placeholder="请详细描述您的症状、发病时间、持续时长、伴随情况等（如：头痛头晕伴乏力3天，加重1天）"
            />
          </view>

          <view class="mb-28rpx">
            <view class="mb-12rpx flex items-center justify-between">
              <text class="text-26rpx text-gray-700 font-semibold">症状图片（选填）</text>
              <text class="text-22rpx text-gray-400">最多 6 张</text>
            </view>
            <view class="flex flex-wrap gap-16rpx">
              <view class="h-160rpx w-160rpx" @tap="handleUpload">
                <view class="h-full w-full flex flex-col cursor-pointer items-center justify-center gap-8rpx border-2rpx border-gray-300 rounded-12rpx border-dashed bg-gray-50 transition-all active:bg-gray-100">
                  <text class="text-56rpx text-gray-400">＋</text>
                  <text class="text-22rpx text-gray-400">上传图片</text>
                </view>
              </view>
              <view
                v-for="(img, index) in uploadedImages"
                :key="index"
                class="h-160rpx w-160rpx"
              >
                <image :src="img" class="h-full w-full border border-gray-200 rounded-12rpx" mode="aspectFill" />
              </view>
            </view>
          </view>

          <view class="mb-28rpx">
            <view class="mb-12rpx flex items-center justify-between">
              <text class="text-26rpx text-gray-700 font-semibold">既往病史（选填）</text>
              <text class="text-22rpx text-primary">帮助医生更好了解您的健康状况</text>
            </view>
            <textarea
              v-model="existingHistory"
              :maxlength="300"
              class="min-h-160rpx w-full resize-none border border-gray-200 rounded-12rpx bg-gray-50 p-20rpx text-26rpx text-gray-700 leading-relaxed transition-colors focus:border-primary focus:bg-white placeholder:text-gray-400"
              placeholder="请填写您的既往病史、长期用药情况、手术史等（如：高血压病史5年，长期服用降压药）"
            />
          </view>

          <view class="mb-0">
            <view class="mb-12rpx flex items-center justify-between">
              <text class="text-26rpx text-gray-700 font-semibold">过敏史（选填）</text>
              <text class="text-22rpx text-orange-500">⚠️ 重要：用于避免药物不良反应</text>
            </view>
            <textarea
              v-model="allergyHistory"
              :maxlength="200"
              class="min-h-160rpx w-full resize-none border border-gray-200 rounded-12rpx bg-gray-50 p-20rpx text-26rpx text-gray-700 leading-relaxed transition-colors focus:border-primary focus:bg-white placeholder:text-gray-400"
              placeholder="请填写药物过敏史、食物过敏等（如：青霉素过敏、海鲜过敏。无过敏史请填写『无』）"
            />
          </view>
        </view>
      </view>

      <view class="mb-32rpx">
        <view class="border border-gray-200/80 rounded-20rpx bg-white/95 p-28rpx shadow-lg backdrop-blur-6rpx">
          <view class="mb-24rpx">
            <text class="mb-8rpx block text-26rpx text-gray-700 font-semibold"><text class="text-red-500">*</text> 问诊方式</text>
            <text v-if="dispatchMode !== 'smart' && assignedDoctor" class="mb-16rpx block text-22rpx text-primary">
              医生支持的问诊方式
            </text>
            <view class="flex flex-col gap-16rpx">
              <view
                v-for="method in availableConsultationMethods"
                :key="method.id"
                class="flex cursor-pointer items-center gap-16rpx border-2rpx rounded-16rpx p-20rpx transition-all active:scale-98"
                :class="selectedConsultationMethod === method.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 bg-white'"
                @tap="handleSelectConsultationMethod(method.id)"
              >
                <view class="flex-1">
                  <view class="mb-8rpx flex items-center gap-12rpx">
                    <text class="text-32rpx">{{ method.icon }}</text>
                    <text class="text-28rpx text-gray-800 font-semibold">{{ method.title }}</text>
                  </view>
                  <text class="mb-12rpx block text-24rpx text-gray-500 leading-relaxed">{{ method.description }}</text>
                  <view class="flex items-center gap-16rpx">
                    <text v-if="method.badge" class="rounded-full bg-primary px-12rpx py-4rpx text-20rpx text-white font-medium">{{ method.badge }}</text>
                    <text class="text-22rpx text-gray-400">
                      {{ method.duration + (method.durationUnit === 'hours' ? '小时' : '分钟') }}
                    </text>
                    <text class="text-26rpx text-primary font-bold">¥{{ method.price }}</text>
                  </view>
                </view>
                <view class="flex items-center">
                  <view class="h-32rpx w-32rpx flex items-center justify-center border-2rpx rounded-full bg-white" :class="selectedConsultationMethod === method.id ? 'border-primary' : 'border-gray-300'">
                    <view v-if="selectedConsultationMethod === method.id" class="h-18rpx w-18rpx rounded-full bg-primary" />
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="my-20rpx h-1rpx bg-gray-200" />

          <view class="flex items-center justify-between py-12rpx">
            <text class="text-26rpx text-gray-600">有效期</text>
            <text class="text-26rpx text-gray-800 font-medium">{{ validityDisplay }}</text>
          </view>
          <view class="my-20rpx h-1rpx bg-gray-200" />
          <view class="flex items-center justify-between py-12rpx">
            <text class="text-28rpx text-gray-800 font-bold">问诊费用</text>
            <text class="text-36rpx text-primary font-bold">¥ {{ fee.toFixed(2) }}</text>
          </view>
        </view>
      </view>

      <view class="mb-32rpx">
        <text class="mb-16rpx block text-28rpx text-gray-800 font-semibold"><text class="text-red-500">*</text> 选择支付方式</text>
        <view class="border border-gray-200/80 rounded-20rpx bg-white/95 p-28rpx shadow-lg backdrop-blur-6rpx">
          <PaymentMethodSelector
            v-model="selectedPayment"
            :methods="paymentMethodList"
          />
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>

    <!-- 健康问题选择弹窗 -->
    <HealthConcernSelector
      v-model="showTypeModal"
      v-model:selected-ids="selectedConsultationTypes"
      :types="healthConcerns"
      @confirm="handleTypeConfirm"
    />

    <!-- 底部提交栏 -->
    <view v-if="!showTypeModal" class="z-100 flex flex-shrink-0 items-center justify-between gap-24rpx border-t border-gray-200/80 bg-white px-24rpx py-20rpx shadow-lg">
      <view class="flex flex-col gap-4rpx">
        <text class="text-22rpx text-gray-500">总计：</text>
        <text class="text-36rpx text-primary font-bold">¥ {{ fee.toFixed(2) }}</text>
      </view>
      <view>
        <wd-button
          type="primary"
          custom-style="background: linear-gradient(135deg, #a85545 0%, #6d3329 100%); border: none; box-shadow: 0 4px 12px rgba(142, 67, 55, 0.3);"
          @click="handleSubmitOrder"
        >
          提交订单
        </wd-button>
      </view>
    </view>

    <!-- 支付确认弹窗 -->
    <ConfirmModal
      v-model:visible="showPaymentModal"
      title="确认支付"
      :content="`支付金额：¥${fee.toFixed(2)}\n支付方式：${getPaymentMethodName()}`"
      confirm-text="确认支付"
      @confirm="confirmPayment"
    />
  </view>
</template>
