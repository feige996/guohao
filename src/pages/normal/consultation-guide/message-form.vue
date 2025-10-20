<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('问诊登记')

// 表单数据 - 使用简单的ref而不是嵌套ref
const name = ref('')
const phone = ref('')
const isReturnVisit = ref('否') // '是' 或 '否'
const symptomDescription = ref('')

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理提交按钮点击
function handleSubmit() {
  // 表单验证
  if (!name.value.trim()) {
    uni.showToast({
      title: '请输入您的姓名',
      icon: 'none'
    })
    return
  }
  
  if (!phone.value.trim()) {
    uni.showToast({
      title: '请输入您的联系电话',
      icon: 'none'
    })
    return
  }
  
  // 简单的手机号验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(phone.value.trim())) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }
  
  if (!symptomDescription.value.trim()) {
    uni.showToast({
      title: '请描述您的症状',
      icon: 'none'
    })
    return
  }
  
  if (symptomDescription.value.length > 200) {
    uni.showToast({
      title: '症状描述不能超过200字',
      icon: 'none'
    })
    return
  }
  
  // 模拟提交数据
  console.log('提交表单数据:', {
    name: name.value,
    phone: phone.value,
    isReturnVisit: isReturnVisit.value,
    symptomDescription: symptomDescription.value
  })
  
  // 显示提交成功提示
  uni.showToast({
    title: '提交成功，我们将尽快联系您',
    icon: 'success'
  })
  
  // 延迟返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 处理客服按钮点击
function handleCustomerService() {
  uni.showModal({
    title: '联系客服',
    content: '客服热线：400-123-4567',
    showCancel: false
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#eee]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 表单区域 -->
    <div class="p-[16px] space-y-[16px]">
      <!-- 姓名输入 -->
      <div class="bg-white rounded-[12px] p-[16px]">
        <div class="flex items-center mb-[8px]">
          <span class="text-[14px] text-[#333333]">姓名</span>
          <span class="ml-[4px] text-[14px] text-[#ff4d4f]">*</span>
        </div>
        <input
          type="text"
          v-model="name"
          placeholder="请输入您的姓名"
          class="w-full border border-[#d9d9d9] rounded-[8px] px-[12px] py-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0957DE] focus:border-[#0957DE]"
        />
      </div>

      <!-- 联系电话 -->
      <div class="bg-white rounded-[12px] p-[16px]">
        <div class="flex items-center mb-[8px]">
          <span class="text-[14px] text-[#333333]">联系电话</span>
          <span class="ml-[4px] text-[14px] text-[#ff4d4f]">*</span>
        </div>
        <input
          type="tel"
          v-model="phone"
          placeholder="请输入您的联系电话"
          class="w-full border border-[#d9d9d9] rounded-[8px] px-[12px] py-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0957DE] focus:border-[#0957DE]"
        />
      </div>

      <!-- 是否复诊 -->
      <div class="bg-white rounded-[12px] p-[16px]">
        <div class="flex items-center mb-[8px]">
          <span class="text-[14px] text-[#333333]">是否复诊</span>
          <span class="ml-[4px] text-[14px] text-[#ff4d4f]">*</span>
        </div>
        <div class="flex justify-between">
          <!-- 是选项 -->
          <div
            class="flex items-center cursor-pointer"
            @click="isReturnVisit = '是'"
          >
            <!-- 矩形选择框 -->
            <div class="mr-[8px] h-[20px] w-[20px] flex items-center justify-center rounded border-2 bg-white"
                 :class="isReturnVisit === '是' ? 'border-[#0957DE]' : 'border-[#d9d9d9]'">
              <!-- 选中状态的对勾 -->
              <div
                v-if="isReturnVisit === '是'"
                class="h-[12px] w-[12px] bg-[#0957DE]"
              ></div>
            </div>
            <span class="text-[14px] text-[#333333]">是</span>
          </div>
          
          <!-- 否选项 -->
          <div
            class="flex items-center cursor-pointer"
            @click="isReturnVisit = '否'"
          >
            <!-- 矩形选择框 -->
            <div class="mr-[8px] h-[20px] w-[20px] flex items-center justify-center rounded border-2 bg-white"
                 :class="isReturnVisit === '否' ? 'border-[#0957DE]' : 'border-[#d9d9d9]'">
              <!-- 选中状态的对勾 -->
              <div
                v-if="isReturnVisit === '否'"
                class="h-[12px] w-[12px] bg-[#0957DE]"
              ></div>
            </div>
            <span class="text-[14px] text-[#333333]">否</span>
          </div>
        </div>
      </div>

      <!-- 症状描述 -->
      <div class="bg-white rounded-[12px] p-[16px]">
        <div class="flex items-center mb-[8px]">
          <span class="text-[14px] text-[#333333]">症状描述</span>
          <span class="ml-[4px] text-[14px] text-[#ff4d4f]">*</span>
        </div>
        <div class="mb-[4px] text-[12px] text-[#999999]">
          请描述您主要的症状、持续时间以及想要解决的问题。
        </div>
        <textarea
          v-model="symptomDescription"
          placeholder="请详细描述您的症状（200字内）"
          maxlength="200"
          rows="5"
          class="w-full border border-[#d9d9d9] rounded-[8px] px-[12px] py-[10px] text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#0957DE] focus:border-[#0957DE]"
        ></textarea>
        <div class="mt-[4px] text-right text-[12px] text-[#999999]">
          {{ symptomDescription.length }}/200
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="text-[12px] text-[#999999]">
        <p>您的信息仅用于问诊预约联系，我们将严格保密。</p>
      </div>

      <!-- 提交按钮 -->
      <div
        @click="handleSubmit"
        class="w-full rounded-[12px] bg-[#0957DE] py-[14px] text-center text-[16px] text-white font-medium"
      >
        提交并等待医生联系
      </div>

      <!-- 服务提示 -->
      <div class="text-center text-[12px] text-[#999999]">
        <p>医生将在30分钟内通过电话联系您，请保持畅通。</p>
      </div>
    </div>

    <!-- 客服图标 -->
    <div class="fixed right-[20px] bottom-[60px] z-10">
      <div
        @click="handleCustomerService"
        class="h-[50px] w-[50px] flex items-center justify-center rounded-full bg-[#0957DE] shadow-lg"
      >
        <uni-icons type="chatboxes" size="28" color="#ffffff" />
      </div>
    </div>
  </div>
</template>