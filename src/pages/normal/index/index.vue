<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '普通用户首页',
  },
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 主容器 -->
    <div class="relative h-[492px] w-[375px] flex flex-col items-start">
      <!-- 顶部渐变区域 -->
      <div class="relative isolate h-[424px] w-[375px] flex flex-col items-start from-[#f6e2d3] to-transparent bg-gradient-to-b">
        <!-- 搜索栏 -->
        <div class="relative isolate z-1 ml-[12px] mt-[52px] h-[40px] w-[351px] flex flex-row items-start border border-[#cccccc] rounded-[330px] bg-[#f7f4f3]">
          <img
            class="relative z-0 ml-[15px] mt-[12px] h-[16px] w-[16px]"
            src="@img/homepage/search-icon.png"
          >
          <div class="relative z-2 ml-[260px] mt-[4px] h-[32px] w-[56px] flex flex-col items-start rounded-[58px] bg-[#97493d]">
            <span class="relative mx-auto mt-[10px] w-max whitespace-pre text-center text-[12px] text-white font-normal leading-[100%]"> 搜索 </span>
          </div>
          <span class="absolute left-0 right-[149px] top-[14px] z-1 mx-auto w-max whitespace-pre text-[12px] text-[#cccccc] font-normal leading-[100%]"> 搜索疾病、症状、科室等 </span>
        </div>

        <!-- 专业咨询区域 -->
        <div class="relative isolate z-0 ml-[12px] mt-[30px] h-[150px] w-[351px] flex flex-col items-start">
          <!-- 医生图片 -->
          <img
            class="relative z-4 ml-[205px] h-[131px] w-[137px] flex-shrink-0 object-cover -mt-[26px]"
            src="@img/homepage/decoration.png"
          >

          <!-- 背景矩形 -->
          <div class="relative z-1 ml-0 h-[150px] w-[351px] flex-shrink-0 rounded-[8px] from-[#feca75] to-[#d4b477] bg-gradient-to-r -mt-[105px]" />

          <!-- 专业咨询标题 -->
          <span class="relative z-3 ml-[12px] flex-shrink-0 whitespace-pre from-[#97493d] to-[#ba7720] bg-gradient-to-b bg-clip-text text-[20px] text-transparent font-bold leading-[100%] -mt-[126px]"> 专业咨询 </span>

          <!-- 副标题 -->
          <span class="relative z-2 ml-[12px] mt-[12px] flex-shrink-0 whitespace-pre text-[14px] text-white font-medium leading-[100%]"> 为您及家人健康提供专属服务 </span>

          <!-- 健康管家消息框 -->
          <div class="relative isolate z-5 ml-[12px] mt-[27px] h-[40px] w-[327px] flex flex-shrink-0 flex-col items-start">
            <img
              class="relative z-1 ml-[270px] h-[10px] w-[18px] -mt-[6.5px]"
              src="@img/homepage/arrow-icon.png"
            >
            <div class="relative isolate z-0 ml-0 h-[40px] w-[327px] flex flex-row items-start rounded-[20px] from-white to-[#fef9eb] bg-gradient-to-b -mt-[3.5px]">
              <img
                class="relative z-2 ml-[8px] mt-[10px] h-[20px] w-[20px]"
                src="@img/homepage/health-manager-icon.png"
              >
              <span class="relative z-0 ml-[8px] mt-[14px] whitespace-pre text-[11px] text-[#967f64] font-normal leading-[12px]">
                [健康管家]您最近身体怎么样？
              </span>
              <div class="relative z-1 ml-[58px] mt-[6px] h-[28px] w-[74px] flex flex-col items-start whitespace-pre rounded-[16px] from-[#f0c67a] to-[#eba54b] bg-gradient-to-b text-[12px] text-white font-medium leading-[100%]">
                <span class="relative ml-[19px] mt-[8px]"> 问医生 </span>
              </div>
            </div>
          </div>

          <!-- 会员权益矩形 -->
          <div class="relative isolate z-0 ml-0 mt-0 h-[49px] w-[351px] flex flex-shrink-0 flex-row items-start rounded-[8px] from-[#f6e2d3] to-[#ece3d1] bg-gradient-to-r">
            <span class="relative z-1 ml-[12px] mt-[25px] whitespace-pre text-[12px] text-[#ae956d] font-medium leading-[100%]"> 升级会员 享更多权益 </span>
            <span class="relative z-0 ml-[164px] mt-[25px] whitespace-pre text-[12px] text-[#ae956d] font-medium leading-[100%]"> 去升级 </span>
            <img
              class="relative z-2 ml-[4px] mt-[25px] h-[12px] w-[12px]"
              src="@img/homepage/upgrade-arrow.png"
            >
          </div>
        </div>
      </div>

      <!-- 体质卡片区域 -->
      <div class="relative isolate ml-[12px] h-[172px] w-[351px] flex flex-row items-start bg-[url('@img/homepage/background.webp')] bg-cover bg-center bg-no-repeat -mt-[104px]">
        <img
          class="relative z-1 ml-[16px] mt-[16px] h-[140px] w-[141px]"
          src="@img/homepage/calendar-icon.png"
        >
        <div class="relative z-0 ml-[11px] mt-[16px] h-[140px] w-[167px] flex flex-col items-start">
          <div class="relative ml-0 mt-0 h-[140px] w-[167px] flex flex-col items-start rounded-[8px] from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br">
            <div class="relative ml-[8px] mt-[8px] h-[20px] w-[144px] flex flex-row items-start">
              <span class="relative ml-0 mt-[4px] whitespace-pre text-[12px] text-[#ba7210] font-bold leading-[100%]"> 体质状态： </span>
              <div class="relative ml-[12px] mt-0 h-[20px] w-[72px] flex flex-col items-start whitespace-pre text-center text-[10px] text-white font-medium leading-[12px]">
                <div class="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[20px] w-[72px] flex flex-col items-start bg-[url('@img/homepage/constitution-badge.png')] bg-cover bg-center bg-no-repeat">
                  <span class="relative ml-[12px] mt-[4px]"> 平和体质 </span>
                </div>
              </div>
            </div>
            <div class="relative ml-[8px] mt-[8px] h-[96px] w-[151px] flex flex-col items-start">
              <div class="relative ml-0 mt-0 h-[96px] w-[151px] flex flex-col items-start rounded-[4px] bg-white/50">
                <span class="relative ml-[9px] mt-[5px] whitespace-pre text-[12px] text-[#333333] font-medium leading-[100%]"> 气节养生建议：神仙粥 </span>
                <span class="relative ml-[8px] mt-[11px] w-[135px] text-justify text-[12px] text-[#ababab] font-medium leading-[20px]"> 糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专属权益区域 -->
    <div class="relative isolate ml-[12px] mt-[14px] h-[320px] w-[351px] flex flex-col items-start rounded-[8px] bg-white">
      <!-- 标题栏 -->
      <div class="relative isolate z-3 ml-[12px] mt-[16px] h-[22px] w-[327px] flex flex-row items-start">
        <span class="relative z-2 ml-0 mt-0 h-[22px] w-[96px] whitespace-pre text-[16px] text-[#333333] font-medium leading-[20px]"> 您的专属权益 </span>
        <span class="relative z-0 ml-[191px] mt-[3px] h-[16px] w-[24px] whitespace-pre text-center text-[12px] text-[#999999] font-light leading-[16px]"> 设置 </span>
        <img
          class="relative z-1 ml-[4px] mt-[5px] h-[12px] w-[12px]"
          src="@img/homepage/settings-arrow.png"
        >
      </div>

      <!-- 第一行功能卡片 -->
      <div class="relative isolate z-2 ml-[8px] mt-[16px] h-[78px] w-[335px] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start whitespace-pre text-[13px] text-[#333333] font-medium leading-[19px]">
          <div class="relative ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start bg-[url('@img/homepage/appointment-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-3.5px] ml-[12px] mt-[32px] h-[19px] w-[54px]"> 预约问诊 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[7px] mt-0 h-[78px] w-[164px] flex flex-col items-start whitespace-pre text-[13px] text-[#333333] font-medium leading-[19px]">
          <div class="relative ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start bg-[url('@img/homepage/message-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-3.5px] ml-[12px] mt-[32px] h-[19px] w-[54px]"> 我的消息 </span>
          </div>
        </div>
      </div>

      <!-- 第二行功能卡片 -->
      <div class="relative isolate z-1 ml-[8px] mt-[8px] h-[78px] w-[335px] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start whitespace-pre text-[13px] text-[#333333] font-medium leading-[19px]">
          <div class="relative ml-[0.5px] mt-0 h-[78px] w-[164px] flex flex-col items-start bg-[url('@img/homepage/collection-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-3.5px] ml-[11.5px] mt-[32px] h-[19px] w-[54px]"> 养生收藏 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[7px] mt-0 h-[78px] w-[164px] flex flex-col items-start whitespace-pre text-[13px] text-[#333333] font-medium leading-[19px]">
          <div class="relative ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start bg-[url('@img/homepage/product-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-3.5px] ml-[12px] mt-[32px] h-[19px]"> 关注商品 </span>
          </div>
        </div>
      </div>

      <!-- 全部功能卡片 -->
      <div class="relative isolate z-0 ml-[8px] mt-[6px] h-[78px] w-[164px] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[78px] w-[164px] flex flex-col items-start">
          <div class="relative isolate ml-0 mt-0 h-[78px] w-[164px] flex flex-row items-start rounded-[4px] from-[#f1f6ff] to-[#e3eafe] bg-gradient-to-br">
            <div class="relative z-2 ml-[12px] mt-[16px] h-[46px] w-[52px] flex flex-col items-start">
              <span class="relative mb-[-3.5px] ml-0 mt-0 h-[19px] whitespace-pre text-[13px] text-[#333333] font-medium leading-[19px]"> 全部功能 </span>
              <span class="relative ml-0 mt-[8px] whitespace-pre text-[10px] text-[#aca7c3] font-medium leading-[12px]"> 7x24小时 </span>
              <span class="relative ml-0 mt-[2px] whitespace-pre text-[10px] text-[#aca7c3] font-medium leading-[12px]"> 一对一服务 </span>
            </div>
            <img
              class="relative z-0 ml-[-14px] mt-0 h-[78px] w-[113px]"
              src="@img/homepage/all-function-bg1.png"
            >
            <img
              class="relative z-1 ml-[-92px] mt-0 h-[78px] w-[93px]"
              src="@img/homepage/all-function-bg2.png"
            >
          </div>
        </div>
        <img
          class="relative z-0 ml-[-66px] mt-[11px] h-[56px] w-[56px]"
          src="@img/homepage/settings-icon.png"
        >
      </div>
    </div>
  </div>
</template>
