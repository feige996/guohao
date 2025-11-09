<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
  router.back()
}
</script>

<template>
  <div class="w-full max-w-[375px] mx-auto min-h-screen relative pb-5 bg-[#F9FAFB] box-border">
    <div class="w-full max-w-[375px] mx-auto min-h-screen relative pb-5">
        <!-- Toast 通知 -->
    <div class="toast" :class="{ show: isToastVisible }">
      {{ toastMessage }}
    </div>

        <!-- 顶部导航 -->
        <header class="w-full h-[56px] flex justify-between items-center px-4 bg-white fixed top-0 left-0 right-0 max-w-[375px] mx-auto z-50 shadow-sm">
            <button class="text-[#333333] hover:text-[#6B7280] transition-colors" @click="goBack" aria-label="返回上一页">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                </svg>
            </button>
            <h1 class="text-[#1F2937] text-lg font-bold">处方详情</h1>
            <div class="w-6"></div>
        </header>

        <!-- 主内容区 -->
        <main class="pt-[64px] px-4 space-y-4">
            
            <!-- 处方状态 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-gradient-to-r from-[#8E4337] to-[#6E2F25] text-white box-border break-words overflow-hidden">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-lg font-bold">处方已开具</span>
                    </div>
                    <span class="px-3 py-1 bg-white/20 rounded-full text-xs font-bold">中药处方</span>
                </div>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <div class="text-white/70 text-xs mb-1">处方编号</div>
                        <div class="font-medium">CF202510260001</div>
                    </div>
                    <div>
                        <div class="text-white/70 text-xs mb-1">开方时间</div>
                        <div class="font-medium">2025-10-26 14:45</div>
                    </div>
                </div>
            </section>

            <!-- 患者信息 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white box-border break-words overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-[18px] h-[18px]">
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                    </svg>
                    <span class="text-[#333333] text-lg font-bold leading-7">患者信息</span>
                </div>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span class="text-[#6B7280]">姓名</span>
                        <span class="text-[#1F2937] font-medium">王女士</span>
                    </div>
                    <div class="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span class="text-[#6B7280]">年龄</span>
                        <span class="text-[#1F2937] font-medium">28岁</span>
                    </div>
                    <div class="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span class="text-[#6B7280]">性别</span>
                        <span class="text-[#1F2937] font-medium">女</span>
                    </div>
                    <div class="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span class="text-[#6B7280]">患者编号</span>
                        <span class="text-[#1F2937] font-medium">GH973212</span>
                    </div>
                </div>
            </section>

            <!-- 诊断信息 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white box-border break-words overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-[18px] h-[18px]">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[#333333] text-lg font-bold leading-7">诊断信息</span>
                </div>
                <div class="space-y-2">
                    <div class="p-3 bg-[#F5EBE9] rounded-xl">
                        <div class="text-[#6B7280] text-xs mb-1">西医诊断</div>
                        <div class="text-[#8E4337] text-sm font-bold">紧张性头痛</div>
                    </div>
                    <div class="p-3 bg-[#FFF7ED] rounded-xl">
                        <div class="text-[#6B7280] text-xs mb-1">中医诊断</div>
                        <div class="text-[#EA580C] text-sm font-bold">头痛（气血亏虚证）</div>
                    </div>
                </div>
            </section>

            <!-- 处方信息 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white border-2 border-[#8E4337] box-border break-words overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-[18px] h-[18px]">
                        <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[#333333] text-lg font-bold leading-7">处方内容</span>
                </div>

                <!-- 处方名称 -->
                <div class="p-4 bg-gradient-to-r from-[#F5EBE9] to-[#FCE7E3] rounded-xl mb-4 box-border break-words overflow-hidden">
                    <div class="text-[#8E4337] text-lg font-bold mb-1">归脾汤加减</div>
                    <div class="text-[#6B7280] text-sm">益气补血,健脾养心</div>
                </div>

                <!-- 药品明细 -->
                <div class="mb-4">
                    <div class="text-[#374151] text-sm font-semibold mb-3">药品明细</div>
                    <div class="space-y-2">
                        <!-- 药品项 -->
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] box-border break-words overflow-hidden">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">黄芪</span>
                                <span class="text-[#8E4337] text-sm font-bold">20g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">补气升阳，固表止汗</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">党参</span>
                                <span class="text-[#8E4337] text-sm font-bold">15g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">补中益气，健脾益肺</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">白术</span>
                                <span class="text-[#8E4337] text-sm font-bold">10g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">健脾益气，燥湿利水</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">当归</span>
                                <span class="text-[#8E4337] text-sm font-bold">10g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">补血活血，调经止痛</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">茯神</span>
                                <span class="text-[#8E4337] text-sm font-bold">12g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">宁心安神，利水渗湿</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">远志</span>
                                <span class="text-[#8E4337] text-sm font-bold">6g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">安神益智，祛痰开窍</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">酸枣仁</span>
                                <span class="text-[#8E4337] text-sm font-bold">15g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">养心安神，敛汗生津</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">龙眼肉</span>
                                <span class="text-[#8E4337] text-sm font-bold">10g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">补益心脾，养血安神</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">木香</span>
                                <span class="text-[#8E4337] text-sm font-bold">6g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">行气止痛，健脾消食</div>
                        </div>
                        <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-[#1F2937] text-sm font-medium">炙甘草</span>
                                <span class="text-[#8E4337] text-sm font-bold">6g</span>
                            </div>
                            <div class="text-[#6B7280] text-xs">补脾益气，调和诸药</div>
                        </div>
                    </div>
                </div>

                <!-- 处方总计 -->
                <div class="p-3 bg-[#F5EBE9] rounded-xl mb-4 box-border break-words overflow-hidden">
                    <div class="flex items-center justify-between">
                        <span class="text-[#6B7280] text-sm">处方剂数</span>
                        <span class="text-[#1F2937] text-base font-bold">7剂</span>
                    </div>
                </div>
            </section>

            <!-- 用法说明 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white box-border break-words overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-[18px] h-[18px]">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[#333333] text-lg font-bold leading-7">用法说明</span>
                </div>
                <div class="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] box-border break-words overflow-hidden">
                    <div class="text-[#1F2937] text-sm leading-relaxed mb-3 break-words">
                        水煎服，每日1剂，分早晚两次温服，饭后服用。连服7天。
                    </div>
                    <div class="flex items-start gap-2 text-[#6B7280] text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 flex-shrink-0 mt-0.5">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                        </svg>
                        <span class="break-words">煎药方法：先浸泡30分钟，大火煮沸后转小火煎煮30分钟，每剂煎两次，合并药液约400ml。</span>
                    </div>
                </div>
            </section>

            <!-- 注意事项 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white box-border break-words overflow-hidden">
                <div class="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#EA580C" class="w-[18px] h-[18px]">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[#333333] text-lg font-bold leading-7">注意事项</span>
                </div>
                <div class="p-4 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] box-border break-words overflow-hidden">
                    <div class="space-y-2">
                        <div class="flex items-start gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0"></div>
                            <div class="text-[#6B7280] text-sm leading-relaxed break-words">忌食辛辣、油腻、生冷食物</div>
                        </div>
                        <div class="flex items-start gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0"></div>
                            <div class="text-[#6B7280] text-sm leading-relaxed break-words">保证充足睡眠，避免熬夜</div>
                        </div>
                        <div class="flex items-start gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0"></div>
                            <div class="text-[#6B7280] text-sm leading-relaxed break-words">避免过度劳累，保持心情舒畅</div>
                        </div>
                        <div class="flex items-start gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0"></div>
                            <div class="text-[#6B7280] text-sm leading-relaxed break-words">如服药期间症状无缓解或加重，请及时复诊</div>
                        </div>
                        <div class="flex items-start gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-2 flex-shrink-0"></div>
                            <div class="text-[#6B7280] text-sm leading-relaxed break-words">孕妇、哺乳期妇女及儿童请在医师指导下使用</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 医生签名 -->
            <section class="w-full p-5 rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] bg-white box-border break-words overflow-hidden">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-[#6B7280] text-xs mb-1">开方医生</div>
                        <div class="text-[#1F2937] text-sm font-medium">李时珍 主任医师</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[#6B7280] text-xs mb-1">医生签名</div>
                        <div class="text-[#8E4337] text-lg font-bold italic" style="font-family: cursive;">李时珍</div>
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

