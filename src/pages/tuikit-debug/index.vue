<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
// 使用相对路径导入 JS 文件，并使用类型断言
import { genTestUserSig } from '@/TUIKit/debug'
import { initTUIKitAuto } from '@/utils/tuikit'

const userStore = useUserStore()

// 调试表单数据
const debugForm = ref({
  SDKAppID: 1400210571,
  secretKey: '',
  userID: `user_${Math.floor(Math.random() * 10000).toString()}`,
})

const isInitializing = ref(false)
const initStatus = ref('未初始化')

interface LoginInfo {
  SDKAppID?: number
  userID?: string
  userSig?: string
}

const loginInfo = ref<LoginInfo>({})

// 生成测试用户签名
function generateTestUserSig(): void {
  if (!debugForm.value.secretKey) {
    uni.showToast({
      title: '请输入密钥',
      icon: 'none',
    })
    return
  }

  try {
    const result = genTestUserSig({
      SDKAppID: debugForm.value.SDKAppID,
      secretKey: debugForm.value.secretKey,
      userID: debugForm.value.userID,
    })

    // 保存到用户store
    userStore.userSig = result.userSig
    userStore.userInfo = {
      ...userStore.userInfo,
      id: Number(debugForm.value.userID),
    }

    loginInfo.value = {
      SDKAppID: result.SDKAppID,
      userID: debugForm.value.userID,
      userSig: `${result.userSig.substring(0, 20)}...`,
    }

    uni.showToast({
      title: '生成成功',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('生成测试签名失败:', error)
    uni.showToast({
      title: '生成失败',
      icon: 'none',
    })
  }
}

// 初始化TUIKit
async function initializeTUIKit(): Promise<void> {
  if (!userStore.userSig || !userStore.userInfo?.id) {
    uni.showToast({
      title: '请先生成测试签名',
      icon: 'none',
    })
    return
  }

  isInitializing.value = true
  initStatus.value = '初始化中...'

  try {
    await initTUIKitAuto()
    initStatus.value = '初始化成功'
    uni.showToast({
      title: '初始化成功',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('TUIKit初始化失败:', error)
    initStatus.value = `初始化失败: ${(error as Error).message}`
    uni.showToast({
      title: '初始化失败',
      icon: 'none',
    })
  }
  finally {
    isInitializing.value = false
  }
}

// 跳转到会话列表
function openConversationList(): void {
  uni.navigateTo({
    url: '/TUIKit/components/TUIConversation/index',
  })
}

// 跳转到联系人页面
function openContact(): void {
  uni.navigateTo({
    url: '/TUIKit/components/TUIContact/index',
  })
}

// 页面加载时的逻辑
console.log('TUIKit调试页面已加载')
</script>

<template>
  <view class="tuikit-debug-page">
    <view class="page-header">
      <text class="page-title">TUIKit 调试工具</text>
      <text
        class="init-status"
        :class="{
          'status-initial': initStatus === '未初始化',
          'status-loading': initStatus === '初始化中...',
          'status-success': initStatus === '初始化成功',
          'status-error': initStatus.includes('失败'),
        }"
      >
        {{ initStatus }}
      </text>
    </view>

    <view class="debug-form">
      <view class="form-item">
        <text class="label">SDKAppID:</text>
        <text class="value">{{ debugForm.SDKAppID }}</text>
      </view>

      <view class="form-item">
        <text class="label">Secret Key:</text>
        <wd-input
          v-model="debugForm.secretKey"
          placeholder="请输入密钥"
          class="input"
          password
        />
      </view>

      <view class="form-item">
        <text class="label">UserID:</text>
        <wd-input
          v-model="debugForm.userID"
          placeholder="请输入用户ID"
          class="input"
        />
      </view>
    </view>

    <view class="action-buttons">
      <wd-button
        type="primary"
        class="btn-primary"
        @click="generateTestUserSig"
      >
        生成测试签名
      </wd-button>

      <wd-button
        type="success"
        :loading="isInitializing"
        :disabled="isInitializing"
        class="btn-success"
        @click="initializeTUIKit"
      >
        初始化TUIKit
      </wd-button>
    </view>

    <view v-if="loginInfo.userSig" class="login-info">
      <text class="info-title">登录信息</text>
      <view class="info-item">
        <text class="info-label">SDKAppID:</text>
        <text class="info-value">{{ loginInfo.SDKAppID || '-' }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">UserID:</text>
        <text class="info-value">{{ loginInfo.userID || '-' }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">UserSig:</text>
        <text class="info-value">{{ loginInfo.userSig || '-' }}</text>
      </view>
    </view>

    <view class="function-buttons">
      <text class="function-title">功能入口</text>
      <wd-button
        type="primary"
        plain
        class="btn-ghost"
        @click="openConversationList"
      >
        打开会话列表
      </wd-button>

      <wd-button
        type="primary"
        class="btn-primary"
        @click="openContact"
      >
        打开联系人
      </wd-button>
    </view>
  </view>
</template>

<style scoped>
.tuikit-debug-page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30rpx;
}

.page-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.init-status {
  font-size: 28rpx;
  padding: 6rpx 16rpx;
  border-radius: 4rpx;
}

.status-initial {
  color: #666;
  background-color: #f0f0f0;
}

.status-loading {
  color: #1989fa;
  background-color: #ecf5ff;
}

.status-success {
  color: #07c160;
  background-color: #ebfaf2;
}

.status-error {
  color: #ee0a24;
  background-color: #fef0f0;
}

.debug-form {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.form-item {
  margin-bottom: 24rpx;
}

.form-item:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-bottom: 12rpx;
}

.value {
  font-size: 28rpx;
  color: #333;
  padding: 20rpx;
  background-color: #f8f8f8;
  border-radius: 8rpx;
  display: block;
}

.input {
  width: 100%;
}

.action-buttons {
  margin-bottom: 30rpx;
}

.action-buttons .wd-button {
  margin-bottom: 20rpx;
}

.btn-primary {
  width: 100%;
}

.btn-success {
  width: 100%;
}

.login-info {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.info-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.info-item {
  margin-bottom: 16rpx;
  display: flex;
  align-items: flex-start;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 28rpx;
  color: #666;
  width: 120rpx;
  flex-shrink: 0;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  flex: 1;
  word-break: break-all;
}

.function-buttons {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.function-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.btn-ghost {
  width: 100%;
  margin-bottom: 20rpx;
}
</style>
