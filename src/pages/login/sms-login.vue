<script setup lang="ts">
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from 'alova/client'
import { computed, onUnmounted, reactive, ref } from 'vue'
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'sms-login',
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '验证码登录',
  },
})

// 表单数据
const formData = reactive({
  mobile: '',
  code: '',
  pactChecked: true,
})

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
  pactChecked: [
    {
      required: false,
      validator: (value: boolean) => {
        return value === true
      },
      message: '请阅读并同意用户协议和隐私协议',
      trigger: 'change',
    },
  ],
}

// 页面加载
onLoad(() => {})

// 用户store
const userStore = useUserStore()

// 使用 useRequest hook 发送验证码
const {
  loading: sendCodeLoading,
  send: sendSmsCode,
} = useRequest(
  (mobile: string) => Apis.app.apiAppSendsmscodeMobilePost({
    pathParams: { mobile },
    data: {},
  }),
  {
    immediate: false,
  },
).onSuccess(() => {
  globalToast.success('验证码已发送')
  // 开始倒计时
  startCountdown()
})

// 使用 useRequest hook 进行短信登录
const {
  data: _loginData,
  loading: loginLoading,
  error: _loginError,
  send: performSmsLogin,
} = useRequest(
  (mobile: string, code: string) => Apis.app.apiAppLoginbyphonePost({
    data: {
      mobile,
      code,
      loginFrom: 'app',
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response) => {
  console.log('短信登录成功:', response)

  // 保存登录结果到store
  if (response?.data?.result) {
    userStore.saveLoginResult(response.data.result)
  }

  // 登录成功提示
  globalToast.success('登录成功')

  // 延迟跳转到首页或其他页面
  setTimeout(() => {
    // 这里可以根据用户角色跳转到不同页面
    uni.switchTab({
      url: '/pages/tabbar/index_Normal',
    })
  }, 50)
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

    // 调用发送验证码API
    await sendSmsCode(formData.mobile)
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

// 登录处理函数
async function handleLogin() {
  if (loginLoading.value)
    return

  try {
    // 表单验证
    const result = await formRef.value?.validate()
    if (!result?.valid) {
      return
    }

    // 调用短信登录API
    await performSmsLogin(formData.mobile, formData.code)
  }
  catch (error: any) {
    // 表单验证失败
    console.error('表单验证失败:', error)
  }
}

// 密码登录
function handlePasswordLogin() {
  uni.navigateTo({
    url: '/pages/login/password-login',
  })
}

// 忘记密码
function handleForgetPassword() {
  uni.navigateTo({
    url: '/pages/login/forget-password',
  })
}

// 协议勾选状态改变
function handlePactChange() {
  formRef.value?.validate('pactChecked')
}

// 跳转到用户协议页面
function handleToUserAgreement() {
  uni.navigateTo({
    url: '/pages/system/agreement/user-agreement',
  })
}

// 跳转到隐私政策页面
function handleToPrivacyPolicy() {
  uni.navigateTo({
    url: '/pages/system/agreement/privacy-policy',
  })
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
    class="min-h-screen flex flex-col justify-between from-[rgba(255,250,235,1)] via-[rgba(227,255,224,0)] to-white bg-gradient-to-b"
  >
    <!-- 标题区域 -->
    <view class="pb-130rpx pt-220rpx">
      <view class="pl-64rpx text-48rpx text-[#383838] font-bold">
        Hello！<br>欢迎来到国浩中医
      </view>
    </view>

    <!-- 表单区域 -->
    <view class="flex-1 px-64rpx">
      <!-- WotUI表单 -->
      <wd-form ref="formRef" :model="formData" :rules="rules" label-width="0" class="mb-132rpx" error-type="toast">
        <!-- 手机号输入 -->
        <wd-form-item prop="mobile" class="mb-48rpx">
          <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
            <view class="mr-20rpx border-r border-[#cdcdcd] pr-20rpx text-28rpx text-[#666]">
              +86
            </view>
            <wd-input
              v-model="formData.mobile" type="number" placeholder="手机号" no-border clearable class="flex-1"
              :adjust-position="false"
            />
          </view>
        </wd-form-item>

        <!-- 验证码输入 -->
        <wd-form-item prop="code">
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

        <!-- 协议勾选 -->
        <wd-form-item prop="pactChecked" class="mt-60rpx">
          <view class="flex items-center justify-center text-24rpx">
            <wd-checkbox
              v-model="formData.pactChecked" shape="circle" checked-color="#3ba662"
              @change="handlePactChange"
            />
            <view class="ml-10rpx">
              我已阅读并同意
              <text class="text-[#3ba662]" @click="handleToUserAgreement">
                《用户协议》
              </text>
              和
              <text class="text-[#3ba662]" @click="handleToPrivacyPolicy">
                《隐私协议》
              </text>
            </view>
          </view>
        </wd-form-item>
      </wd-form>

      <view class="mb-3">
        <wd-button size="large" block :loading="loginLoading" @click="handleLogin">
          立即登录
        </wd-button>
      </view>

      <!-- 提示信息和快捷链接 -->
      <view class="mt-30rpx text-center">
        <!-- 快捷操作链接 -->
        <view class="flex items-center justify-center text-28rpx">
          <text class="text-[#3ba662] transition-opacity active:opacity-70" @click="handlePasswordLogin">
            密码登录
          </text>
          <view class="mx-40rpx h-24rpx w-2rpx bg-[#ddd]" />
          <text class="text-[#3ba662] transition-opacity active:opacity-70" @click="handleForgetPassword">
            忘记密码？
          </text>
        </view>
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

/* 协议勾选框样式 */
:deep(.wd-checkbox) {
  margin-right: 10rpx;
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
