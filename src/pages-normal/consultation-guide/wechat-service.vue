<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('导诊-微信客服')

// 客服信息
const customerService = {
  name: '小浩',
  avatar: '/src/static/images/customer-service-avatar.png', // 假设的头像路径，实际需要替换
  greeting: '您好，我是您的健康顾问小浩，请问扫码添加，为您提供专属服务！',
}

// 二维码信息
const qrCode = {
  image: '/src/static/images/wechat-qrcode.png', // 临时二维码路径，实际会替换
  title: '扫码添加微信',
  description: '小浩为您 58.6 万+ 用户提供专业服务。',
}

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理保存图片
function handleSaveQrCode() {
  // 在实际应用中，这里应该实现保存图片到相册的功能
  uni.showToast({
    title: '二维码已保存到相册',
    icon: 'success',
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center border-b border-[#eee] bg-white px-[16px]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex flex-col items-center p-[20px]">
      <!-- 客服图片占位符 -->
      <div class="relative mb-[20px] h-[150px] w-full overflow-hidden border border-[#e6f7ff] rounded-[12px]">
        <image :src="customerService.avatar" class="h-full w-full object-cover" />
        <!-- 如果没有实际图片，显示占位符 -->
        <div v-if="!customerService.avatar.includes('/src/static/images/')" class="absolute inset-0 flex items-center justify-center bg-[#f0f7ff]">
          <uni-icons type="contact" size="60" color="#0957DE" />
        </div>
      </div>

      <!-- 客服信息卡片 -->
      <div class="mb-[20px] w-full rounded-[12px] bg-white p-[20px] shadow-sm">
        <div class="mb-[16px] flex items-center">
          <div class="mr-[16px] h-[60px] w-[60px] overflow-hidden border-2 border-[#e6f7ff] rounded-full">
            <image :src="customerService.avatar" class="h-full w-full object-cover" />
          </div>
          <div class="flex-1">
            <p class="whitespace-pre-wrap text-[15px] text-[#333] leading-[22px]">
              {{ customerService.greeting }}
            </p>
          </div>
        </div>
      </div>

      <!-- 二维码展示区域 -->
      <div class="w-full rounded-[12px] bg-white p-[20px] shadow-sm">
        <div class="flex flex-col items-center">
          <!-- 手持手机场景中的二维码 -->
          <div class="relative mb-[20px] flex justify-center">
            <div class="relative h-[300px] w-[180px] flex flex-col items-center justify-center overflow-hidden border-8 border-[#333] rounded-[20px] bg-[#e6f7ff]">
              <!-- 手机顶部 -->
              <div class="absolute top-0 h-[10px] w-full flex justify-center bg-[#333]">
                <div class="h-[5px] w-[30px] rounded-b-md bg-[#222]" />
              </div>

              <!-- 二维码内容 -->
              <div class="mt-[15px] h-[100px] w-[100px] bg-white">
                <image :src="qrCode.image" class="h-full w-full object-contain" />
                <!-- 模拟二维码内容 -->
                <div v-if="qrCode.image.includes('/src/static/images/')" class="absolute inset-[45px] flex items-center justify-center">
                  <div class="h-[100px] w-[100px] flex items-center justify-center border border-[#eee] bg-white">
                    <div class="h-[80px] w-[80px] flex flex-col items-center justify-center bg-[#f0f0f0]">
                      <uni-icons type="chat" size="24" color="#0957DE" />
                      <div class="grid grid-cols-3 mt-2 w-[80px] gap-1">
                        <div v-for="n in 9" :key="n" class="h-[6px] w-[6px] bg-[#0957DE]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 二维码标题 -->
              <h3 class="mt-[10px] text-[14px] text-[#333] font-medium">
                国华导诊服务
              </h3>

              <!-- 手持效果 -->
              <div class="absolute h-[100px] w-[50px] rounded-full bg-[#f0f0f0] opacity-70 -bottom-[50px] -left-[30px]" />
              <div class="absolute h-[100px] w-[50px] rounded-full bg-[#f0f0f0] opacity-70 -bottom-[50px] -right-[30px]" />
            </div>
          </div>

          <!-- 二维码标题 -->
          <h2 class="mb-[8px] text-[16px] text-[#333] font-medium">
            {{ qrCode.title }}
          </h2>

          <!-- 二维码描述 -->
          <p class="mb-[20px] text-[13px] text-[#999]">
            {{ qrCode.description }}
          </p>

          <!-- 保存按钮 -->
          <button
            class="rounded-[20px] bg-[#0957DE] px-[40px] py-[10px] text-[15px] text-white font-medium"
            @click="handleSaveQrCode"
          >
            保存二维码
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
