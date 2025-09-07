<script setup lang="ts">
import type { FormInstance, FormRules } from 'wot-design-uni/components/wd-form/types'
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from 'alova/client'
import { sm2 } from 'sm-crypto'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'password-login',
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '密码登录',
  },
})

// const router = useRouter()

// 表单数据
const formData = reactive({
  account: '13927292525',
  password: '801672',
  pactChecked: true,
})

// 表单引用
const formRef = ref<FormInstance>()

// 全局提示store
// const globalToast = useGlobalToast()

// 表单验证规则
const rules: FormRules = {
  account: [
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
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      required: false,
      min: 6,
      message: '密码长度不能少于6位',
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
onLoad(() => { })

// 用户store
const _userStore = useUserStore()

// 使用 useRequest hook 进行登录
const {
  data: _loginData,
  loading: loginLoading,
  error: _loginError,
  send: performLogin,
} = useRequest(
  (account: string, password: string) => Apis.app.apiAppLoginPost({
    data: {
      account,
      password,
      loginFrom: 'app',
    },
    meta: {
      ignoreAuth: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((event) => {
  console.log('登录成功:', event.data)

  // 保存登录结果到store
  if (event.data) {
    _userStore.saveLoginResult(event.data as any)
  }

  // 登录成功提示
  // globalToast.success('登录成功')

  setTimeout(() => {
    // 检查用户默认首页是否存在，如果不存在则使用默认页面
    // const defaultPage = _userStore.userDefaultIndexPage || '/pages/tabbar/index_Normal'
    // console.log(_userStore.userDefaultIndexPage)
    // router.pushTab(defaultPage)
  }, 50)
})

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

    // SM2加密密码
    const publicKey = import.meta.env.VITE_SM_PUBLIC_KEY
    // 如果没有配置公钥，使用明文密码
    const encryptedPassword = publicKey
      ? sm2.doEncrypt(formData.password, publicKey, 1)
      : formData.password

    // 调用登录API
    await performLogin(formData.account, encryptedPassword)
  }
  catch (error: any) {
    // 登录失败处理
    console.error('登录过程出错:', error)
    // globalToast.error(error?.message || '登录失败，请重试')
  }
}

// 忘记密码
function handleForgetPassword() {
  uni.navigateTo({
    url: '/pages/login/forget-password',
  })
}

// 验证码登录
function handleSmsLogin() {
  uni.navigateTo({
    url: '/pages/login/sms-login',
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
        <wd-form-item prop="account" class="mb-48rpx">
          <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
            <view class="mr-20rpx border-r border-[#cdcdcd] pr-20rpx text-28rpx text-[#666]">
              +86
            </view>
            <wd-input
              v-model="formData.account" type="number" placeholder="手机号" no-border clearable class="flex-1"
              :adjust-position="false"
            />
          </view>
        </wd-form-item>

        <!-- 密码输入 -->
        <wd-form-item prop="password">
          <view class="h-76rpx flex items-center border-b border-[#cdcdcd]">
            <wd-input
              v-model="formData.password" type="text" placeholder="请输入密码" no-border clearable show-password
              class="flex-1" :adjust-position="false"
            />
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
          <text class="text-[#3ba662] transition-opacity active:opacity-70" @click="handleForgetPassword">
            忘记密码？
          </text>
          <view class="mx-40rpx h-24rpx w-2rpx bg-[#ddd]" />
          <text class="text-[#3ba662] transition-opacity active:opacity-70" @click="handleSmsLogin">
            验证码登录
          </text>
        </view>
      </view>
    </view>

    <!-- 其他登录方式 -->
    <!-- <view class="mb-60rpx px-160rpx">
      <view class="relative mb-40rpx mt-30rpx text-center text-28rpx text-[#808080]">
        其他登录方式
        <view class="absolute left-0 top-1/2 h-2rpx w-116rpx from-transparent to-[#ccc] bg-gradient-to-r" />
        <view class="absolute right-0 top-1/2 h-2rpx w-116rpx from-transparent to-[#ccc] bg-gradient-to-l" />
      </view>
    </view> -->
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
</style>
