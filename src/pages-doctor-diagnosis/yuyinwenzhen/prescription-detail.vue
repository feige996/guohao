<script setup lang="ts">
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '处方详情',
    navigationBarBackgroundColor: '#fff',
  },
})
const toastMessage = ref('')
const isToastVisible = ref(false)

// Toast 提示
function showToast(message: string, duration = 2000): void {
  toastMessage.value = message
  isToastVisible.value = true

  setTimeout(() => {
    isToastVisible.value = false
  }, duration)
}

// 返回上一页
function goBack(): void {
  uni.navigateBack()
}
</script>

<template>
  <div class="relative mx-auto box-border max-w-[375px] min-h-screen w-full bg-[#F9FAFB] pb-5">
    <div class="relative mx-auto max-w-[375px] min-h-screen w-full pb-5">
      <!-- Toast 通知 -->
      <div class="toast" :class="{ show: isToastVisible }">
        {{ toastMessage }}
      </div>

      <!-- 顶部导航 -->
      <!-- <header class="w-full h-[56px] flex justify-between items-center px-4 bg-white fixed top-0 left-0 right-0 max-w-[375px] mx-auto z-50 shadow-sm">
            <button class="text-[#333333] hover:text-[#6B7280] transition-colors" @click="goBack" aria-label="返回上一页">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                </svg>
            </button>
            <h1 class="text-[#1F2937] text-lg font-bold">处方详情</h1>
            <div class="w-6"></div>
        </header> -->

      <!-- 主内容区 -->
      <main class="px-4 pt-[24px] space-y-4">
        <!-- 处方状态 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] from-[#8E4337] to-[#6E2F25] bg-gradient-to-r p-5 text-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <wd-icon name="check-circle-filled" size="22px" color="#fff" />
              <span class="text-lg font-bold">处方已开具</span>
            </div>
            <span class="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">中药处方</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div class="mb-1 text-xs text-white/70">
                处方编号
              </div>
              <div class="font-medium">
                CF202510260001
              </div>
            </div>
            <div>
              <div class="mb-1 text-xs text-white/70">
                开方时间
              </div>
              <div class="font-medium">
                2025-10-26 14:45
              </div>
            </div>
          </div>
        </section>

        <!-- 患者信息 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-center gap-2">
            <wd-icon name="user-circle" size="22px" color="#8E4337" />
            <span class="text-lg text-[#333333] font-bold leading-7">患者信息</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
              <span class="text-[#6B7280]">姓名</span>
              <span class="text-[#1F2937] font-medium">王女士</span>
            </div>
            <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
              <span class="text-[#6B7280]">年龄</span>
              <span class="text-[#1F2937] font-medium">28岁</span>
            </div>
            <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
              <span class="text-[#6B7280]">性别</span>
              <span class="text-[#1F2937] font-medium">女</span>
            </div>
            <div class="flex items-center justify-between border-b border-[#E5E7EB] py-2">
              <span class="text-[#6B7280]">患者编号</span>
              <span class="text-[#1F2937] font-medium">GH973212</span>
            </div>
          </div>
        </section>

        <!-- 诊断信息 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-center gap-2">
            <wd-icon name="check-circle-filled" size="20px" color="#8E4337" />
            <span class="text-lg text-[#333333] font-bold leading-7">诊断信息</span>
          </div>
          <div class="space-y-2">
            <div class="rounded-xl bg-[#F5EBE9] p-3">
              <div class="mb-1 text-xs text-[#6B7280]">
                西医诊断
              </div>
              <div class="text-sm text-[#8E4337] font-bold">
                紧张性头痛
              </div>
            </div>
            <div class="rounded-xl bg-[#FFF7ED] p-3">
              <div class="mb-1 text-xs text-[#6B7280]">
                中医诊断
              </div>
              <div class="text-sm text-[#EA580C] font-bold">
                头痛（气血亏虚证）
              </div>
            </div>
          </div>
        </section>

        <!-- 处方信息 -->
        <section class="box-border w-full overflow-hidden break-words border-2 border-[#8E4337] rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-center gap-2">
            <wd-icon name="list" size="20px" color="#8E4337" />
            <span class="text-lg text-[#333333] font-bold leading-7">处方内容</span>
          </div>

          <!-- 处方名称 -->
          <div class="mb-4 box-border overflow-hidden break-words rounded-xl from-[#F5EBE9] to-[#FCE7E3] bg-gradient-to-r p-4">
            <div class="mb-1 text-lg text-[#8E4337] font-bold">
              归脾汤加减
            </div>
            <div class="text-sm text-[#6B7280]">
              益气补血,健脾养心
            </div>
          </div>

          <!-- 药品明细 -->
          <div class="mb-4">
            <div class="mb-3 text-sm text-[#374151] font-semibold">
              药品明细
            </div>
            <div class="space-y-2">
              <!-- 药品项 -->
              <div class="box-border overflow-hidden break-words border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">黄芪</span>
                  <span class="text-sm text-[#8E4337] font-bold">20g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  补气升阳，固表止汗
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">党参</span>
                  <span class="text-sm text-[#8E4337] font-bold">15g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  补中益气，健脾益肺
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">白术</span>
                  <span class="text-sm text-[#8E4337] font-bold">10g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  健脾益气，燥湿利水
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">当归</span>
                  <span class="text-sm text-[#8E4337] font-bold">10g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  补血活血，调经止痛
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">茯神</span>
                  <span class="text-sm text-[#8E4337] font-bold">12g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  宁心安神，利水渗湿
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">远志</span>
                  <span class="text-sm text-[#8E4337] font-bold">6g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  安神益智，祛痰开窍
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">酸枣仁</span>
                  <span class="text-sm text-[#8E4337] font-bold">15g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  养心安神，敛汗生津
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">龙眼肉</span>
                  <span class="text-sm text-[#8E4337] font-bold">10g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  补益心脾，养血安神
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">木香</span>
                  <span class="text-sm text-[#8E4337] font-bold">6g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  行气止痛，健脾消食
                </div>
              </div>
              <div class="border border-[#E5E7EB] rounded-lg bg-[#F9FAFB] p-3">
                <div class="mb-1 flex items-start justify-between">
                  <span class="text-sm text-[#1F2937] font-medium">炙甘草</span>
                  <span class="text-sm text-[#8E4337] font-bold">6g</span>
                </div>
                <div class="text-xs text-[#6B7280]">
                  补脾益气，调和诸药
                </div>
              </div>
            </div>
          </div>

          <!-- 处方总计 -->
          <div class="mb-4 box-border overflow-hidden break-words rounded-xl bg-[#F5EBE9] p-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-[#6B7280]">处方剂数</span>
              <span class="text-base text-[#1F2937] font-bold">7剂</span>
            </div>
          </div>
        </section>

        <!-- 用法说明 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-center gap-2">
            <wd-icon name="help-circle-filled" size="22px" color="#8E4337" />
            <span class="text-lg text-[#333333] font-bold leading-7">用法说明</span>
          </div>
          <div class="box-border overflow-hidden break-words border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-4">
            <div class="mb-3 break-words text-sm text-[#1F2937] leading-relaxed">
              水煎服，每日1剂，分早晚两次温服，饭后服用。连服7天。
            </div>
            <div class="flex items-start gap-2 text-xs text-[#6B7280]">
              <wd-icon name="error-circle-filled" size="16px" />
              <span class="break-words">煎药方法：先浸泡30分钟，大火煮沸后转小火煎煮30分钟，每剂煎两次，合并药液约400ml。</span>
            </div>
          </div>
        </section>

        <!-- 注意事项 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-center gap-2">
            <wd-icon name="error-circle-filled" size="22px" color="red" />
            <span class="text-lg text-[#333333] font-bold leading-7">注意事项</span>
          </div>
          <div class="box-border overflow-hidden break-words border border-[#FED7AA] rounded-xl bg-[#FFF7ED] p-4">
            <div class="space-y-2">
              <div class="flex items-start gap-2">
                <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                <div class="break-words text-sm text-[#6B7280] leading-relaxed">
                  忌食辛辣、油腻、生冷食物
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                <div class="break-words text-sm text-[#6B7280] leading-relaxed">
                  保证充足睡眠，避免熬夜
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                <div class="break-words text-sm text-[#6B7280] leading-relaxed">
                  避免过度劳累，保持心情舒畅
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                <div class="break-words text-sm text-[#6B7280] leading-relaxed">
                  如服药期间症状无缓解或加重，请及时复诊
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EA580C]" />
                <div class="break-words text-sm text-[#6B7280] leading-relaxed">
                  孕妇、哺乳期妇女及儿童请在医师指导下使用
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 医生签名 -->
        <section class="box-border w-full overflow-hidden break-words rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="flex items-center justify-between">
            <div>
              <div class="mb-1 text-xs text-[#6B7280]">
                开方医生
              </div>
              <div class="text-sm text-[#1F2937] font-medium">
                李时珍 主任医师
              </div>
            </div>
            <div class="text-right">
              <div class="mb-1 text-xs text-[#6B7280]">
                医生签名
              </div>
              <div class="text-lg text-[#8E4337] font-bold italic" style="font-family: cursive;">
                李时珍
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 全局盒模型设置 */
* {
  box-sizing: border-box;
}

.toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  max-width: 90%;
  text-align: center;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
