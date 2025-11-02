<template>
  <wd-form-item prop="pactChecked" class="mt-60rpx rounded-lg">
    <wd-checkbox
      v-model="formData.pactChecked" shape="circle" checked-color="#3ba662"
      @change="handlePactChange"
    >
      <view class="flex items-center">
        <view>我已阅读并同意</view>
        <view class="text-[#3ba662]" @click="handleToUserAgreement">
          《用户协议》
        </view>
        <view>和</view>
        <view class="text-[#3ba662]" @click="handleToPrivacyPolicy">
          《隐私协议》
        </view>
      </view>
    </wd-checkbox>
  </wd-form-item>
</template>
