<script setup lang="ts">
import { ref } from 'vue'
// 服务设置状态
const serviceSettings = ref({
  textConsult: true,
  voiceConsult: false,
  videoConsult: false,
})

// 处理开关切换
function handleSwitchChange(type: string, value: boolean) {
  switch (type) {
    case 'text':
      serviceSettings.value.textConsult = value
      break
    case 'voice':
      serviceSettings.value.voiceConsult = value
      break
    case 'video':
      serviceSettings.value.videoConsult = value
      break
  }
  console.log(`开关${type}已切换为:`, value)
}
</script>

<template>
  <view class="card-bg mt-3 flex flex-col gap-3 p-4 text-white">
    <!-- 标题区域 - 可点击跳转 -->
    <view class="flex items-center justify-between">
      <view class="flex items-center">
        <image src="/static/images/me-doctor/settings.png" class="h-6 w-6 rounded-full object-cover" />
        <text class="ml-3 text-base font-medium">服务设置</text>
      </view>
    </view>

    <!-- 设置项 - 不可点击跳转 -->
    <!-- 图文问诊 -->
    <view class="flex items-center justify-between">
      <text class="text-base">图文问诊</text>
      <wd-switch
        v-model="serviceSettings.textConsult"
        size="24px"
        active-color="#8c2303"
        inactive-color="#dcdfe6"
        @update:model-value="(val) => handleSwitchChange('text', val)"
      />
    </view>

    <!-- 语音问诊 -->
    <view class="flex items-center justify-between">
      <text class="text-base">语音问诊</text>
      <wd-switch
        v-model="serviceSettings.voiceConsult"
        size="24px"
        active-color="#8c2303"
        inactive-color="#dcdfe6"
        @update:model-value="(val) => handleSwitchChange('voice', val)"
      />
    </view>

    <!-- 视频问诊 -->
    <view class="flex items-center justify-between">
      <text class="text-base">视频问诊</text>
      <wd-switch
        v-model="serviceSettings.videoConsult"
        size="24px"
        active-color="#8c2303"
        inactive-color="#dcdfe6"
        @update:model-value="(val) => handleSwitchChange('video', val)"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.card-bg {
  background-image: url('/static/images/me-doctor/card-bg.png');
  background-size: 100% 100%;
  background-position: left top;
  background-repeat: no-repeat;
}
</style>
