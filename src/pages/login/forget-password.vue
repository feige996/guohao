<script setup lang="ts">
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from 'alova/client'
import { sm2 } from 'sm-crypto'
import { computed, onUnmounted, reactive, ref } from 'vue'

definePage({
  name: 'forget-password',
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '忘记密码',
  },
})

// 当前步骤：1-验证手机号，2-重置密码
const currentStep = ref(1)

// 表单数据
const formData = reactive({
  mobile: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
})

// 重置Token（从验证码验证接口返回）
const resetToken = ref<any>('')

// 表单引用
const formRef = ref<FormInstance>()

// 全局提示store
// const globalToast = useGlobalToast()
const globalToast = {
  success: (message: string) => {
    uni.showToast({
      title: message,
      icon: 'success',
    })
  },
  error: (message: string) => {
    uni.showToast({
      title: message,
      icon: 'error',
    })
  },
}

// 验证码倒计时
const countdown = ref(0)
const countdownTimer = ref<NodeJS.Timeout>()

// 倒计时文本
const countdownText = computed(() => {
  return countdown.value > 0 ? `${countdown.value}s后重发` : '获取验证码'
})

// 是否可以发送验证码
const canSendCode = computed(() => {
  return countdown.value === 0 && /^1[3-9]\d{9}$/.test(formData.mobile)
})

// 表单验证规则
const rules: FormRules = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    {
      required: true,
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur',
    },
    {
      required: true,
      pattern: /^\d{6}$/,
      message: '请输入6位数字验证码',
      trigger: 'blur',
    },
  ],
  newPassword: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur',
    },
    {
      required: false,
      min: 6,
      message: '密码长度不能少于6位',
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur',
    },
    {
      required: false,
      validator: (value: string) => {
        return value === formData.newPassword
      },
      message: '两次输入的密码不一致',
      trigger: 'blur',
    },
  ],
}

// 页面加载
onLoad(() => {})

// 使用 useRequest hook 检查手机号并发送验证码
const {
  loading: sendCodeLoading,
  send: checkMobileAndSendCode,
} = useRequest(
  (mobile: string) => Apis.appUser.apiAppuserCheckmobileregisteredandsendcodeGet({
    params: { mobile },
    meta: {
      ignoreAuth: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess(() => {
  globalToast.success('验证码已发送')
  // 开始倒计时
  startCountdown()
})

// 使用 useRequest hook 验证忘记密码验证码
const {
  loading: verifyCodeLoading,
  send: verifyForgetPasswordCode,
} = useRequest(
  (mobile: string, code: string) => Apis.appUser.apiAppuserVerifyforgetpasswordcodePost({
    data: { mobile, code },
    meta: {
      ignoreAuth: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response) => {
  console.log('验证码验证成功:', response)
  console.log('验证码验证成功:', response.data)

  // 保存resetToken - 根据API响应结构调整
  resetToken.value = response.data

  console.log('保存的resetToken:', resetToken.value)

  // 进入下一步
  currentStep.value = 2

  globalToast.success('验证码验证成功')
})

// 使用 useRequest hook 重置密码
const {
  loading: resetPasswordLoading,
  send: resetPassword,
} = useRequest(
  (mobile: string, resetToken: string, newPassword: string) => Apis.appUser.apiAppuserResetpasswordPost({
    data: { mobile, resetToken, newPassword },
    meta: {
      ignoreAuth: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess(() => {
  globalToast.success('密码重置成功')

  // 延迟跳转到密码登录页
  setTimeout(() => {
    uni.redirectTo({
      url: '/pages/login/password-login',
    })
  }, 1500)
})

// 发送验证码处理函数
async function handleSendCode() {
  if (!canSendCode.value || sendCodeLoading.value)
    return

  try {
    // 验证手机号
    const mobileValid = await formRef.value?.validate('mobile')
    if (!mobileValid?.valid)
      return

    // 调用检查手机号并发送验证码API
    await checkMobileAndSendCode(formData.mobile)
  }
  catch (error: any) {
    console.error('发送验证码失败:', error)
  }
}

// 开始倒计时
function startCountdown() {
  countdown.value = 60
  countdownTimer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer.value)
    }
  }, 1000)
}

// 验证验证码并进入下一步处理函数
async function handleVerifyCode() {
  if (verifyCodeLoading.value)
    return

  try {
    // 表单验证
    const result = await formRef.value?.validate(['mobile', 'code'])
    if (!result?.valid)
      return

    // 调用验证忘记密码验证码API
    await verifyForgetPasswordCode(formData.mobile, formData.code)
  }
  catch (error: any) {
    console.error('表单验证失败:', error)
  }
}

// 重置密码处理函数
async function handleResetPassword() {
  if (resetPasswordLoading.value)
    return

  try {
    // 表单验证
    const result = await formRef.value?.validate(['newPassword', 'confirmPassword'])
    if (!result?.valid)
      return

    // 检查resetToken是否存在
    if (!resetToken.value) {
      console.error('resetToken为空，无法重置密码:', resetToken.value)
      globalToast.error('重置Token无效，请重新验证手机号')
      currentStep.value = 1
      return
    }

    // SM2加密密码
    const publicKey = import.meta.env.VITE_SM_PUBLIC_KEY
    // 如果没有配置公钥，使用明文密码
    const encryptedPassword = publicKey
      ? sm2.doEncrypt(formData.newPassword, publicKey, 1)
      : formData.newPassword

    console.log('准备重置密码，参数:', {
      mobile: formData.mobile,
      resetToken: resetToken.value,
      resetTokenType: typeof resetToken.value,
      hasNewPassword: !!formData.newPassword,
      encryptedPassword: encryptedPassword ? '***已加密***' : '明文密码',
    })

    // 调用重置密码API
    await resetPassword(formData.mobile, resetToken.value, encryptedPassword)
  }
  catch (error: any) {
    console.error('重置密码失败:', error)
  }
}

// 返回上一步
function handlePrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 返回登录页
function handleBackToLogin() {
  uni.navigateBack()
}

// 组件销毁时清理定时器
onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})
</script>

<template>
  <view
    class="px-3 py-4"
  >
    <!-- 标题区域 -->
    <view class="pb-130rpx pt-220rpx">
      <view class="pl-64rpx text-48rpx text-[#383838] font-bold">
        {{ currentStep === 1 ? '验证手机号' : '重置密码' }}<br>
        {{ currentStep === 1 ? '请输入您的手机号码' : '请设置新密码' }}
      </view>
    </view>

    <!-- 表单区域 -->
    <view class="flex-1 px-64rpx">
      <!-- 步骤1：验证手机号 -->
      <view v-if="currentStep === 1">
        <wd-form ref="formRef" :model="formData" :rules="rules" label-width="0" class="mb-132rpx" error-type="toast">
          <!-- 手机号输入 -->
          <wd-form-item prop="mobile" class="mb-48rpx rounded-lg">
            <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
              <view class="mr-20rpx border-r border-[#cdcdcd] pr-20rpx text-28rpx text-[#666]">
                +86
              </view>
              <wd-input
                v-model="formData.mobile" type="number" placeholder="手机号" clearable no-border class="flex-1"
                :adjust-position="false"
              />
            </view>
          </wd-form-item>

          <!-- 验证码输入 -->
          <wd-form-item prop="code" class="mb-48rpx rounded-lg">
            <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
              <wd-input
                v-model="formData.code" type="number" placeholder="请输入验证码" no-border clearable
                class="flex-1" :adjust-position="false"
              />
              <wd-button
                :disabled="!canSendCode"
                :loading="sendCodeLoading"
                type="text"
                size="small"
                class="ml-20rpx text-[#3ba662]"
                @click="handleSendCode"
              >
                {{ countdownText }}
              </wd-button>
            </view>
          </wd-form-item>
        </wd-form>

        <view class="mb-3">
          <wd-button size="large" block :loading="verifyCodeLoading" @click="handleVerifyCode">
            下一步
          </wd-button>
        </view>
      </view>

      <!-- 步骤2：重置密码 -->
      <view v-else-if="currentStep === 2">
        <wd-form ref="formRef" :model="formData" :rules="rules" label-width="0" class="mb-132rpx" error-type="toast">
          <!-- 新密码输入 -->
          <wd-form-item prop="newPassword" class="mb-48rpx">
            <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
              <wd-input
                v-model="formData.newPassword" type="text" placeholder="请输入新密码" no-border clearable show-password
                class="flex-1" :adjust-position="false"
              />
            </view>
          </wd-form-item>

          <!-- 确认密码输入 -->
          <wd-form-item prop="confirmPassword">
            <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
              <wd-input
                v-model="formData.confirmPassword" type="text" placeholder="请确认新密码" no-border clearable show-password
                class="flex-1" :adjust-position="false"
              />
            </view>
          </wd-form-item>
        </wd-form>

        <view class="mb-3">
          <wd-button size="large" block :loading="resetPasswordLoading" @click="handleResetPassword">
            完成重置
          </wd-button>
        </view>

        <view class="mt-30rpx text-center">
          <text class="text-28rpx text-[#3ba662] transition-opacity active:opacity-70" @click="handlePrevStep">
            返回上一步
          </text>
        </view>
      </view>

      <!-- 返回登录 -->
      <view class="mt-30rpx text-center">
        <text class="text-28rpx text-[#666] transition-opacity active:opacity-70" @click="handleBackToLogin">
          返回登录
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* WotUI表单样式优化 */
:deep(.wd-form-item__body) {
  padding: 0;
}

:deep(.wd-form-item__error) {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #fa4350;
}

:deep(.wd-input__inner) {
  font-size: 32rpx;
  color: #333;
}

:deep(.wd-input__placeholder) {
  color: #999;
}

/* 验证码按钮样式 */
:deep(.wd-button--text) {
  padding: 0;
  min-width: auto;
}

:deep(.wd-button--text.is-disabled) {
  color: #ccc !important;
}
</style>
