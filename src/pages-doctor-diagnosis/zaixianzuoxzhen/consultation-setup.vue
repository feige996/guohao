<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

// 问诊类型状态
const consultationTypes = reactive({
  text: true,
  video: true,
  voice: false,
})

// 价格状态
const prices = reactive({
  text: '50',
  video: '150',
  voice: '80',
})

// 坐诊设置
const duration = ref('4')
const maxPatients = ref('20')

// 按钮加载状态
const isLoading = ref(false)

// Toast 状态
const toastVisible = ref(false)
const toastMessage = ref('')

// 显示Toast通知
function showToast(message: string, duration: number = 2000) {
  // 使用uni-app的toast组件
  uni.showToast({
    title: message,
    icon: 'none',
    duration,
  })
}

// 获取问诊类型名称
function getTypeName(type: string): string {
  const names = {
    text: '图文问诊',
    video: '视频问诊',
    voice: '语音问诊',
  }
  return names[type as keyof typeof names] || type
}

// 切换问诊类型
function toggleConsultationType(type: keyof typeof consultationTypes) {
  consultationTypes[type] = !consultationTypes[type]
  showToast(`已${consultationTypes[type] ? '开启' : '关闭'}${getTypeName(type)}`)
}

// 返回
function handleBack() {
  uni.showModal({
    title: '提示',
    content: '确定要放弃设置并返回吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateBack()
      }
    },
  })
}

// 取消
function handleCancel() {
  uni.showModal({
    title: '提示',
    content: '确定要取消开启坐诊吗？',
    success: (res) => {
      if (res.confirm) {
        showToast('已取消')
        setTimeout(() => {
          // 返回上一页
          uni.navigateBack()
        }, 1000)
      }
    },
  })
}

// 开启坐诊
function handleStartConsultation() {
  // 验证至少选择一种问诊方式
  const hasType = consultationTypes.text || consultationTypes.video || consultationTypes.voice
  if (!hasType) {
    showToast('请至少选择一种问诊方式')
    return
  }

  // 验证价格
  const pricesToCheck = []
  if (consultationTypes.text) {
    if (!prices.text || Number.parseInt(prices.text) <= 0) {
      showToast('请设置图文问诊价格')
      return
    }
    pricesToCheck.push(`图文¥${prices.text}`)
  }
  if (consultationTypes.video) {
    if (!prices.video || Number.parseInt(prices.video) <= 0) {
      showToast('请设置视频问诊价格')
      return
    }
    pricesToCheck.push(`视频¥${prices.video}`)
  }
  if (consultationTypes.voice) {
    if (!prices.voice || Number.parseInt(prices.voice) <= 0) {
      showToast('请设置语音问诊价格')
      return
    }
    pricesToCheck.push(`语音¥${prices.voice}`)
  }

  // 验证时长和人数
  if (!duration.value || Number.parseInt(duration.value) <= 0) {
    showToast('请设置计划时长')
    return
  }
  if (!maxPatients.value || Number.parseInt(maxPatients.value) <= 0) {
    showToast('请设置最多接诊人数')
    return
  }

  // 显示加载状态
  isLoading.value = true
  showToast('正在开启坐诊...')

  // 模拟提交
  setTimeout(() => {
    isLoading.value = false
    showToast('坐诊已开启 ✓', 1500)

    // 保存状态到 uni-app 存储
    uni.setStorageSync('consultationActive', 'true')
    uni.setStorageSync('consultationData', JSON.stringify({
      types: consultationTypes,
      prices,
      duration: duration.value,
      maxPatients: maxPatients.value,
    }))
    // 清除旧的开始时间
    uni.removeStorageSync('consultationStartTime')

    setTimeout(() => {
      uni.navigateTo({ url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-workbench' })
    }, 1000)
  }, 1500)
}
</script>

<template>
  <div class="relative min-h-screen w-full bg-[#F9FAFB] pb-24">
    <!-- 顶部导航 -->
    <!-- <div class="fixed left-0 right-0 top-0 z-50 h-14 w-full flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4">
      <button
        class="h-10 w-10 flex items-center justify-center -ml-2 focus:outline-none focus:ring-2 focus:ring-[#8E4337]"
        aria-label="返回"
        @click="handleBack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#333" class="h-5 w-5">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <h1 class="text-lg text-[#333333] font-bold">
        开启坐诊
      </h1>
      <div class="w-10" />
    </div> -->

    <!-- 主内容区 -->
    <div class="box-border flex flex-col gap-5 px-4 pb-4 pt-[24px]">
      <!-- 问诊方式设置 -->
      <section>
        <h2 class="mb-4 text-base text-[#333333] font-bold">
          问诊方式和价格
        </h2>

        <!-- 图文+语音消息 -->
        <div class="mb-4 box-border w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex flex-1 items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E4337" class="h-5 w-5">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span class="truncate text-[#333333] font-medium">图文+语音消息</span>
            </div>
            <button
              class="relative h-6 w-11 inline-flex items-center rounded-full transition-colors duration-300 ease-in-out"
              :class="consultationTypes.text ? 'bg-[#52c41a]' : 'bg-[#D1D5DB]'"
              aria-label="图文问诊开关"
              role="switch"
              :aria-checked="consultationTypes.text.toString()"
              @click="toggleConsultationType('text')"
            >
              <div
                class="absolute left-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out"
                :class="consultationTypes.text ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>
          <div :class="consultationTypes.text ? 'opacity-100' : 'opacity-50'">
            <div class="border-t border-[#E5E7EB] pt-4">
              <label class="mb-2 block text-sm text-[#9CA3AF]">问诊价格</label>
              <div class="relative w-full overflow-hidden rounded-lg">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-lg font-bold" :class="consultationTypes.text ? 'text-[#8E4337]' : 'text-[#9CA3AF]'">¥</span>
                <input
                  v-model="prices.text"
                  type="number"
                  :disabled="!consultationTypes.text"
                  class="box-border h-full w-full border-none bg-[#F5EBE9] py-3 pl-8 pr-4 text-lg font-bold focus:ring-2 focus:ring-[#8E4337]"
                  :class="consultationTypes.text ? 'text-[#8E4337]' : 'text-[#9CA3AF]'"
                  aria-label="图文问诊价格"
                >
              </div>
              <p class="mt-2 text-xs text-[#6B7280]">
                <span class="truncate">48小时多轮对话，支持文字、图片、语音消息</span>
              </p>
            </div>
          </div>
        </div>

        <!-- 实时视频问诊 -->
        <div class="mb-4 box-border w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex flex-1 items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E4337" class="h-5 w-5">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              <span class="truncate text-[#333333] font-medium">实时视频问诊</span>
            </div>
            <button
              class="relative h-6 w-11 inline-flex items-center rounded-full transition-colors duration-300 ease-in-out"
              :class="consultationTypes.video ? 'bg-[#52c41a]' : 'bg-[#D1D5DB]'"
              aria-label="视频问诊开关"
              role="switch"
              :aria-checked="consultationTypes.video.toString()"
              @click="toggleConsultationType('video')"
            >
              <div
                class="absolute left-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out"
                :class="consultationTypes.video ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>
          <div :class="consultationTypes.video ? 'opacity-100' : 'opacity-50'">
            <div class="border-t border-[#E5E7EB] pt-4">
              <label class="mb-2 block text-sm text-[#9CA3AF]">问诊价格</label>
              <div class="relative w-full overflow-hidden rounded-lg">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-lg font-bold" :class="consultationTypes.video ? 'text-[#8E4337]' : 'text-[#9CA3AF]'">¥</span>
                <input
                  v-model="prices.video"
                  type="number"
                  :disabled="!consultationTypes.video"
                  class="box-border h-full w-full border-none bg-[#F5EBE9] py-3 pl-8 pr-4 text-lg font-bold focus:ring-2 focus:ring-[#8E4337]"
                  :class="consultationTypes.video ? 'text-[#8E4337]' : 'text-[#9CA3AF]'"
                  aria-label="视频问诊价格"
                >
              </div>
              <p class="mt-2 text-xs text-[#6B7280]">
                <span class="truncate">15-20分钟基础时长，面对面视频通话</span>
              </p>
            </div>
          </div>
        </div>

        <!-- 实时语音问诊 -->
        <div class="box-border w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex flex-1 items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E4337" class="h-5 w-5">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              <span class="truncate text-[#333333] font-medium">实时语音问诊</span>
            </div>
            <button
              class="relative h-6 w-11 inline-flex items-center rounded-full transition-colors duration-300 ease-in-out"
              :class="consultationTypes.voice ? 'bg-[#52c41a]' : 'bg-[#D1D5DB]'"
              aria-label="语音问诊开关"
              role="switch"
              :aria-checked="consultationTypes.voice.toString()"
              @click="toggleConsultationType('voice')"
            >
              <div
                class="absolute left-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out"
                :class="consultationTypes.voice ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>
          <div :class="consultationTypes.voice ? 'opacity-100' : 'opacity-50'">
            <div class="border-t border-[#E5E7EB] pt-4">
              <label class="mb-2 block text-sm text-[#9CA3AF]">问诊价格</label>
              <div class="relative w-full overflow-hidden rounded-lg">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-lg font-bold" :class="consultationTypes.voice ? 'text-[#8E4337]' : 'text-[#9CA3AF]'">¥</span>
                <input
                  v-model="prices.voice"
                  type="number"
                  :disabled="!consultationTypes.voice"
                  class="box-border h-full w-full border-none bg-[#F5EBE9] py-3 pl-8 pr-4 text-lg font-bold focus:ring-2 focus:ring-[#8E4337]"
                  :class="consultationTypes.voice ? 'text-[#8E4337]' : 'text-[#9CA3AF]'"
                  aria-label="语音问诊价格"
                >
              </div>
              <p class="mt-2 text-xs text-[#6B7280]">
                <span class="truncate">15-20分钟基础时长，纯语音通话</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 坐诊设置 -->
      <section>
        <h2 class="mb-4 text-base text-[#333333] font-bold">
          坐诊设置
        </h2>
        <div class="box-border w-full rounded-[20px] bg-white p-5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
          <div class="space-y-6">
            <div>
              <label class="mb-2 block text-sm text-[#9CA3AF]">计划时长</label>
              <div class="relative w-full overflow-hidden rounded-lg">
                <input
                  v-model="duration"
                  type="number"
                  class="box-border h-full w-full border-none bg-[#F5EBE9] py-3 pl-4 pr-16 text-lg text-[#333333] font-bold focus:ring-2 focus:ring-[#8E4337]"
                  aria-label="计划时长"
                >
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-sm text-[#6B7280]">小时</span>
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm text-[#9CA3AF]">最多接诊人数</label>
              <div class="relative w-full overflow-hidden rounded-lg">
                <input
                  v-model="maxPatients"
                  type="number"
                  class="box-border h-full w-full border-none bg-[#F5EBE9] py-3 pl-4 pr-16 text-lg text-[#333333] font-bold focus:ring-2 focus:ring-[#8E4337]"
                  aria-label="最多接诊人数"
                >
                <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-sm text-[#6B7280]">人</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 z-50 box-border w-full border-t border-[#E5E7EB] bg-white/95 p-4 backdrop-blur-sm" style="max-width: 100vw; overflow-x: hidden;">
      <div class="flex gap-3">
        <button
          class="flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-[#8E4337] rounded py-3 text-sm text-[#8E4337] font-medium leading-5 transition-all active:scale-98 hover:bg-[#8E4337] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#8E4337]"
          :disabled="isLoading"
          aria-label="取消开启坐诊"
          @click="handleCancel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
          取消
        </button>
        <button
          class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded py-3 text-sm text-white font-medium leading-5 transition-colors active:scale-98 hover:bg-[#6E2F25] focus:outline-none focus:ring-2 focus:ring-[#8E4337]"
          :disabled="isLoading"
          style="background-color: #8E4337;"
          aria-label="确认开启坐诊"
          @click="handleStartConsultation"
        >
          <template v-if="!isLoading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
            <span>开启坐诊</span>
          </template>
          <template v-else>
            <div class="flex items-center gap-2">
              <div class="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
              <span>正在开启...</span>
            </div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 加载动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 0.6s linear infinite;
}

/* 输入框样式 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
