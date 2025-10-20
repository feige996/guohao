<script setup lang="ts">
import { ref } from "vue"

// 导航栏标题
const pageTitle = ref("开药购药")

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理复诊开方点击
function handleFollowUpPrescription() {
  uni.showToast({
    title: "申请开方功能",
    icon: "none"
  })
}

// 处理养生方药点击
function handleHealthPrescription() {
  uni.showToast({
    title: "自选方药功能",
    icon: "none"
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#e5e5e5]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 搜索框 -->
    <div class="p-[12px]">
      <div class="flex items-center rounded-[8px] bg-[#f0f0f0] px-[12px]">
        <uni-icons type="search" size="20" color="#999999" />
        <input 
          type="text" 
          placeholder="搜索药品、药店、医生" 
          class="ml-[8px] flex-1 bg-transparent py-[8px] text-[14px] text-[#333333] outline-none"
        />
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="p-[12px]">
      <!-- 复诊开方卡片 -->
      <div class="mb-[12px] rounded-[12px] bg-white overflow-hidden shadow-sm">
        <div class="flex items-center bg-[#f6f9ff] px-[16px] py-[14px]">
          <div class="mr-[12px] h-[40px] w-[40px] rounded-full bg-[#0957DE] p-[8px]">
            <uni-icons type="medal" size="24" color="#ffffff" />
          </div>
          <div>
            <h3 class="text-[16px] text-[#333333] font-medium">
              复诊开方
            </h3>
            <p class="mt-[2px] text-[12px] text-[#999999]">
              如您复诊，可指定医师代煎送药。
            </p>
          </div>
        </div>
        <div class="px-[16px] py-[12px]">
          <button 
            class="w-full rounded-[20px] bg-[#0957DE] py-[10px] text-[14px] text-white font-medium"
            @click="handleFollowUpPrescription"
          >
            申请开方
          </button>
        </div>
      </div>

      <!-- 养生方药卡片 -->
      <div class="rounded-[12px] bg-white overflow-hidden shadow-sm">
        <div class="flex items-center bg-[#fff1f0] px-[16px] py-[14px]">
          <div class="mr-[12px] h-[40px] w-[40px] rounded-full bg-[#ff4d4f] p-[8px]">
            <uni-icons type="star" size="24" color="#ffffff" />
          </div>
          <div>
            <h3 class="text-[16px] text-[#333333] font-medium">
              养生方药
            </h3>
            <p class="mt-[2px] text-[12px] text-[#999999]">
              配方药材，可线下代煎购买。
            </p>
          </div>
        </div>
        <div class="px-[16px] py-[12px]">
          <button 
            class="w-full rounded-[20px] bg-[#ff4d4f] py-[10px] text-[14px] text-white font-medium"
            @click="handleHealthPrescription"
          >
            自选方药
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
