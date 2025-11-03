<script setup lang="ts">
definePage({
  name: 'consultation-guide',
  layout: 'default',
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '导诊顾问',
  },
})

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理在线客服点击
function handleOnlineService() {
  // 跳转到在线客服聊天页面
  uni.navigateTo({
    url: '/pages-user-diagnosis/consultation-guide/chat',
  })
}

// 处理微信客服点击
function handleWechatService() {
  // 跳转到微信客服页面
  uni.navigateTo({
    url: '/pages-user-diagnosis/consultation-guide/wechat-service',
  })
}

// 处理需求留言点击
function handleMessage() {
  // 跳转到留言确认页面
  uni.navigateTo({
    url: '/pages-user-diagnosis/consultation-guide/message-confirm',
  })
}
</script>

<template>
  <div class="">
    <!-- 导航栏 -->

    <!-- 页面内容 -->
    <div class="p-[16px]">
      <!-- 说明文字 -->
      <div class="mb-[16px] rounded-[8px] bg-white p-[16px]">
        <p class="text-[14px] text-[#666666] leading-[20px]">
          国华导诊服务，支持在线咨询和微信服务。
        </p>
      </div>

      <!-- 服务选项 -->
      <div class="space-y-[12px]">
        <!-- 在线客服 -->
        <div
          class="flex cursor-pointer items-center justify-between rounded-[8px] bg-white p-[16px]"
          @click="handleOnlineService"
        >
          <div class="flex items-center">
            <div class="mr-[12px] h-[44px] w-[44px] flex items-center justify-center rounded-full bg-[#f0f7ff]">
              <uni-icons type="headphones" size="24" color="#0957DE" />
            </div>
            <div>
              <h3 class="text-[16px] text-[#333333] font-medium">
                在线客服
              </h3>
              <p class="mt-[2px] text-[12px] text-[#999999]">
                平台客服7*24小时在线
              </p>
            </div>
          </div>
          <uni-icons type="right" size="18" color="#CCCCCC" />
        </div>

        <!-- 微信客服 -->
        <div
          class="flex cursor-pointer items-center justify-between rounded-[8px] bg-white p-[16px]"
          @click="handleWechatService"
        >
          <div class="flex items-center">
            <div class="mr-[12px] h-[44px] w-[44px] flex items-center justify-center rounded-full bg-[#f6ffed]">
              <uni-icons type="chat" size="24" color="#52c41a" />
            </div>
            <div>
              <h3 class="text-[16px] text-[#333333] font-medium">
                微信客服
              </h3>
              <p class="mt-[2px] text-[12px] text-[#999999]">
                添加企业微信，获得专属服务
              </p>
            </div>
          </div>
          <uni-icons type="right" size="18" color="#CCCCCC" />
        </div>

        <!-- 删除购药服务部分 -->

        <!-- 需求留言 -->
        <div
          class="flex cursor-pointer items-center justify-between rounded-[8px] bg-white p-[16px]"
          @click="handleMessage"
        >
          <div class="flex items-center">
            <div class="mr-[12px] h-[44px] w-[44px] flex items-center justify-center rounded-full bg-[#fff7e6]">
              <uni-icons type="chatboxes" size="24" color="#fa8c16" />
            </div>
            <div>
              <h3 class="text-[16px] text-[#333333] font-medium">
                需求留言
              </h3>
              <p class="mt-[2px] text-[12px] text-[#999999]">
                您的留言，我们会第一时间跟进处理
              </p>
            </div>
          </div>
          <uni-icons type="right" size="18" color="#CCCCCC" />
        </div>
      </div>

      <!-- 服务时间 -->
      <div class="mt-[24px] px-[16px]">
        <p class="text-center text-[12px] text-[#999999]">
          服务时间：周一至周日 08:00-21:00
        </p>
      </div>
    </div>
  </div>
</template>
