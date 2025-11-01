<script lang="ts" setup>
// 用户信息
const userInfo = reactive({
  username: '匿名',
  avatar: '/static/images/avatar-placeholder.png',
})

// 反馈表单数据
const feedbackData = reactive({
  topic: '预约较麻烦',
  content: '',
})

// 字数限制
const maxLength = 200

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 处理内容变化
function handleContentChange(e: any) {
  feedbackData.content = e.target.value
}

// 提交反馈
function handleSubmit() {
  if (!feedbackData.content.trim()) {
    uni.showToast({
      title: '请输入反馈内容',
      icon: 'none',
    })
    return
  }

  // 这里应该是实际的提交逻辑
  console.log('提交反馈:', feedbackData)

  uni.showToast({
    title: '提交成功',
    icon: 'success',
  })

  // 2秒后返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 2000)
}
</script>

<template>
  <div class="page min-h-screen bg-[#f8f8f8]">
    <!-- 顶部导航栏 -->
    <div class="sticky top-0 z-10 flex items-center bg-white px-[30rpx] py-[20rpx]">
      <view class="absolute left-[30rpx] flex items-center justify-center text-[32rpx]" @click="handleBack">
        &lt;
      </view>
      <h1 class="mx-auto font-bold text-[36rpx]">
        意见反馈
      </h1>
      <div class="h-[80rpx] w-[80rpx]" />
    </div>

    <!-- 主要内容 -->
    <div class="mt-[20rpx]">
      <!-- 用户信息卡片 -->
      <div class="bg-white p-[30rpx]">
        <div class="flex items-center gap-[20rpx]">
          <image :src="userInfo.avatar" class="h-[80rpx] w-[80rpx] rounded-full" />
          <view class="font-medium text-[30rpx]">
            {{ userInfo.username }}
          </view>
        </div>
      </div>

      <!-- 反馈主题 -->
      <div class="mt-[20rpx] bg-white p-[30rpx]">
        <div class="mb-[20rpx] text-[#666] text-[28rpx]">
          反馈主题:
        </div>
        <div class="text-[30rpx]">
          {{ feedbackData.topic }}
        </div>
      </div>

      <!-- 意见反馈输入 -->
      <div class="mt-[20rpx] bg-white p-[30rpx]">
        <div class="mb-[20rpx] text-[#666] text-[28rpx]">
          意见反馈
        </div>
        <textarea
          v-model="feedbackData.content"
          placeholder="请输入您的意见或建议..."
          class="min-h-[300rpx] w-full resize-none rounded-[8rpx] bg-[#f8f8f8] p-[20rpx] outline-none text-[30rpx]"
          :maxlength="200"
          @input="handleContentChange"
        />
        <div class="mt-[10rpx] text-right text-[#999] text-[24rpx]">
          {{ feedbackData.content.length }}/{{ maxLength.toString() }}
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="mx-[30rpx] mt-[60rpx]">
        <button
          class="w-full rounded-[44rpx] bg-[#007aff] py-[32rpx] text-center text-white font-medium text-[32rpx]"
          @click="handleSubmit"
        >
          提交
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 全局重置 */
textarea {
  line-height: 1.5;
}

button {
  &:active {
    opacity: 0.8;
  }
}
</style>
