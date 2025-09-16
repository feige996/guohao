<script lang="ts" setup>
import { safeAreaInsets } from '@/utils/systemInfo'
import DateCard from './DateCard.vue'

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
    <div class="relative h-[984rpx] w-[750rpx] flex flex-col items-start">
      <!-- 顶部渐变区域 -->
      <div class="relative isolate h-[848rpx] w-[750rpx] flex flex-col items-start from-[#f6e2d3] to-transparent bg-gradient-to-b">
        <!-- 搜索栏 -->
        <div class="relative isolate z-1 ml-[24rpx] mt-[104rpx] h-[80rpx] w-[702rpx] flex flex-row items-start border border-[#cccccc] rounded-[660rpx] bg-[#f7f4f3]">
          <img
            class="relative z-0 ml-[30rpx] mt-[24rpx] h-[32rpx] w-[32rpx]"
            src="@img/homepage/search-icon.png"
          >
          <div class="relative z-2 ml-[520rpx] mt-[8rpx] h-[64rpx] w-[112rpx] flex flex-col items-start rounded-[116rpx] bg-[#97493d]">
            <span class="relative mx-auto mt-[20rpx] w-max whitespace-pre text-center text-[24rpx] text-white font-normal leading-[100%]"> 搜索 </span>
          </div>
          <span class="absolute left-0 right-[298rpx] top-[28rpx] z-1 mx-auto w-max whitespace-pre text-[24rpx] text-[#cccccc] font-normal leading-[100%]"> 搜索疾病、症状、科室等 </span>
        </div>

        <!-- 专业咨询区域 -->
        <div class="relative isolate z-0 ml-[24rpx] mt-[60rpx] h-[300rpx] w-[702rpx] flex flex-col items-start">
          <!-- 医生图片 -->
          <img
            class="relative z-4 ml-[410rpx] h-[262rpx] w-[274rpx] flex-shrink-0 object-cover -mt-[52rpx]"
            src="@img/homepage/decoration.png"
          >

          <!-- 背景矩形 -->
          <div class="relative z-1 ml-0 h-[300rpx] w-[702rpx] flex-shrink-0 rounded-[16rpx] from-[#feca75] to-[#d4b477] bg-gradient-to-r -mt-[210rpx]" />

          <!-- 专业咨询标题 -->
          <span class="relative z-3 ml-[24rpx] flex-shrink-0 whitespace-pre from-[#97493d] to-[#ba7720] bg-gradient-to-b bg-clip-text text-[40rpx] text-transparent font-bold leading-[100%] -mt-[252rpx]"> 专业咨询 </span>

          <!-- 副标题 -->
          <span class="relative z-2 ml-[24rpx] mt-[24rpx] flex-shrink-0 whitespace-pre text-[28rpx] text-white font-medium leading-[100%]"> 为您及家人健康提供专属服务 </span>

          <!-- 健康管家消息框 -->
          <div class="relative isolate z-5 ml-[24rpx] mt-[54rpx] h-[80rpx] w-[654rpx] flex flex-shrink-0 flex-col items-start">
            <img
              class="relative z-1 ml-[540rpx] h-[20rpx] w-[36rpx] -mt-[13rpx]"
              src="@img/homepage/arrow-icon.png"
            >
            <div class="relative isolate z-0 ml-0 h-[80rpx] w-[654rpx] flex flex-row items-start rounded-[40rpx] from-white to-[#fef9eb] bg-gradient-to-b -mt-[7rpx]">
              <img
                class="relative z-2 ml-[16rpx] mt-[20rpx] h-[40rpx] w-[40rpx]"
                src="@img/homepage/health-manager-icon.png"
              >
              <span class="relative z-0 ml-[16rpx] mt-[28rpx] whitespace-pre text-[22rpx] text-[#967f64] font-normal leading-[24rpx]">
                [健康管家]您最近身体怎么样？
              </span>
              <div class="relative z-1 ml-[116rpx] mt-[12rpx] h-[56rpx] w-[148rpx] flex flex-col items-start whitespace-pre rounded-[32rpx] from-[#f0c67a] to-[#eba54b] bg-gradient-to-b text-[24rpx] text-white font-medium leading-[100%]">
                <span class="relative ml-[38rpx] mt-[16rpx]"> 问医生 </span>
              </div>
            </div>
          </div>

          <!-- 会员权益矩形 -->
          <div class="relative isolate z-0 ml-0 mt-0 h-[98rpx] w-[702rpx] flex flex-shrink-0 flex-row items-start rounded-[16rpx] from-[#f6e2d3] to-[#ece3d1] bg-gradient-to-r">
            <span class="relative z-1 ml-[24rpx] mt-[50rpx] whitespace-pre text-[24rpx] text-[#ae956d] font-medium leading-[100%]"> 升级会员 享更多权益 </span>
            <span class="relative z-0 ml-[328rpx] mt-[50rpx] whitespace-pre text-[24rpx] text-[#ae956d] font-medium leading-[100%]"> 去升级 </span>
            <img
              class="relative z-2 ml-[8rpx] mt-[50rpx] h-[24rpx] w-[24rpx]"
              src="@img/homepage/upgrade-arrow.png"
            >
          </div>
        </div>
      </div>

      <!-- 体质卡片区域 -->
      <div class="relative isolate ml-[24rpx] h-[344rpx] w-[702rpx] flex flex-row items-start bg-white bg-cover bg-center bg-no-repeat -mt-[208rpx]">
        <DateCard class="relative z-1 ml-[32rpx] mt-[32rpx] h-[280rpx] w-[282rpx]" />
        <div class="relative z-0 ml-[22rpx] mt-[32rpx] h-[280rpx] w-[334rpx] flex flex-col items-start">
          <div class="relative ml-0 mt-0 h-[280rpx] w-[334rpx] flex flex-col items-start rounded-[16rpx] from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br">
            <div class="relative ml-[16rpx] mt-[16rpx] h-[40rpx] w-[288rpx] flex flex-row items-start">
              <span class="relative ml-0 mt-[8rpx] whitespace-pre text-[24rpx] text-[#ba7210] font-bold leading-[100%]"> 体质状态： </span>
              <div class="relative ml-[24rpx] mt-0 h-[40rpx] w-[144rpx] flex flex-col items-start whitespace-pre text-center text-[20rpx] text-white font-medium leading-[24rpx]">
                <div class="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[40rpx] w-[144rpx] flex flex-col items-start bg-[url('@img/homepage/constitution-badge.png')] bg-cover bg-center bg-no-repeat">
                  <span class="relative ml-[24rpx] mt-[8rpx]"> 平和体质 </span>
                </div>
              </div>
            </div>
            <div class="relative ml-[16rpx] mt-[16rpx] h-[192rpx] w-[302rpx] flex flex-col items-start">
              <div class="relative ml-0 mt-0 h-[192rpx] w-[302rpx] flex flex-col items-start rounded-[8rpx] bg-white/50">
                <span class="relative ml-[18rpx] mt-[10rpx] whitespace-pre text-[24rpx] text-[#333333] font-medium leading-[100%]"> 气节养生建议：神仙粥 </span>
                <span class="relative ml-[16rpx] mt-[22rpx] w-[270rpx] text-justify text-[24rpx] text-[#ababab] font-medium leading-[40rpx]"> 糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专属权益区域 -->
    <div class="relative isolate ml-[24rpx] mt-[28rpx] h-[640rpx] w-[702rpx] flex flex-col items-start rounded-[16rpx] bg-white">
      <!-- 标题栏 -->
      <div class="relative isolate z-3 ml-[24rpx] mt-[32rpx] h-[44rpx] w-[654rpx] flex flex-row items-start">
        <span class="relative z-2 ml-0 mt-0 h-[44rpx] w-[192rpx] whitespace-pre text-[32rpx] text-[#333333] font-medium leading-[40rpx]"> 您的专属权益 </span>
        <span class="relative z-0 ml-[382rpx] mt-[6rpx] h-[32rpx] w-[48rpx] whitespace-pre text-center text-[24rpx] text-[#999999] font-light leading-[32rpx]"> 设置 </span>
        <img
          class="relative z-1 ml-[8rpx] mt-[10rpx] h-[24rpx] w-[24rpx]"
          src="@img/homepage/settings-arrow.png"
        >
      </div>

      <!-- 第一行功能卡片 -->
      <div class="relative isolate z-2 ml-[16rpx] mt-[32rpx] h-[156rpx] w-[670rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/appointment-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 预约问诊 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[14rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/message-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 我的消息 </span>
          </div>
        </div>
      </div>

      <!-- 第二行功能卡片 -->
      <div class="relative isolate z-1 ml-[16rpx] mt-[16rpx] h-[156rpx] w-[670rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-[1rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/collection-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[23rpx] mt-[64rpx] h-[38rpx] w-[108rpx]"> 养生收藏 </span>
          </div>
        </div>
        <div class="relative z-0 ml-[14rpx] mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]">
          <div class="relative ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start bg-[url('@img/homepage/product-icon.png')] bg-cover bg-center bg-no-repeat">
            <span class="relative mb-[-7rpx] ml-[24rpx] mt-[64rpx] h-[38rpx]"> 关注商品 </span>
          </div>
        </div>
      </div>

      <!-- 全部功能卡片 -->
      <div class="relative isolate z-0 ml-[16rpx] mt-[12rpx] h-[156rpx] w-[328rpx] flex flex-row items-start">
        <div class="relative z-1 ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-col items-start">
          <div class="relative isolate ml-0 mt-0 h-[156rpx] w-[328rpx] flex flex-row items-start rounded-[8rpx] from-[#f1f6ff] to-[#e3eafe] bg-gradient-to-br">
            <div class="relative z-2 ml-[24rpx] mt-[32rpx] h-[92rpx] w-[104rpx] flex flex-col items-start">
              <span class="relative mb-[-7rpx] ml-0 mt-0 h-[38rpx] whitespace-pre text-[26rpx] text-[#333333] font-medium leading-[38rpx]"> 全部功能 </span>
              <span class="relative ml-0 mt-[16rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]"> 7x24小时 </span>
              <span class="relative ml-0 mt-[4rpx] whitespace-pre text-[20rpx] text-[#aca7c3] font-medium leading-[24rpx]"> 一对一服务 </span>
            </div>
            <img
              class="relative z-0 ml-[-28rpx] mt-0 h-[156rpx] w-[226rpx]"
              src="@img/homepage/all-function-bg1.png"
            >
            <img
              class="relative z-1 ml-[-184rpx] mt-0 h-[156rpx] w-[186rpx]"
              src="@img/homepage/all-function-bg2.png"
            >
          </div>
        </div>
        <img
          class="relative z-0 ml-[-132rpx] mt-[22rpx] h-[112rpx] w-[112rpx]"
          src="@img/homepage/settings-icon.png"
        >
      </div>
    </div>
  </div>
</template>
