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
  <view class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 顶部区域 -->
    <view class="relative flex-shrink-0">
      <!-- 背景图片 -->
      <image
        class="h-530rpx w-full object-cover"
        src="/static/images/homepage/background.webp"
        mode="aspectFill"
      />

      <!-- 顶部渐变遮罩 -->
      <view class="absolute inset-0 from-[#f6e2d3]/80 to-transparent bg-gradient-to-b" />

      <!-- 搜索框 -->
      <view class="absolute left-24rpx right-24rpx top-52rpx">
        <view class="h-80rpx flex items-center border border-[#cccccc] rounded-full bg-[#f7f4f3] px-16rpx">
          <image
            class="mr-16rpx h-32rpx w-32rpx"
            src="/static/images/homepage/search-icon.png"
          />
          <text class="flex-1 text-24rpx text-[#cccccc]">搜索疾病、症状、科室等</text>
          <view class="h-56rpx w-112rpx flex items-center justify-center rounded-full bg-[#97493d]">
            <text class="text-24rpx text-white">搜索</text>
          </view>
        </view>
      </view>

      <!-- 专业咨询卡片 -->
      <view class="absolute left-24rpx right-24rpx top-244rpx">
        <view class="relative h-300rpx rounded-16rpx from-[#feca75] to-[#d4b477] bg-gradient-to-br p-48rpx">
          <text class="mb-16rpx from-[#97493d] to-[#ba7720] bg-gradient-to-b bg-clip-text text-40rpx text-transparent font-bold">专业咨询</text>
          <text class="mb-32rpx text-28rpx text-white font-medium">为您及家人健康提供专属服务</text>

          <!-- 底部升级区域 -->
          <view class="absolute bottom-48rpx left-48rpx right-48rpx flex items-center justify-between">
            <text class="text-24rpx text-[#ae956d]">升级会员 享更多权益</text>
            <view class="flex items-center">
              <text class="mr-8rpx text-24rpx text-[#ae956d]">去升级</text>
              <image
                class="h-24rpx w-24rpx"
                src="/static/images/homepage/upgrade-arrow.png"
              />
            </view>
          </view>

          <!-- 箭头装饰 -->
          <image
            class="absolute right-48rpx top-169rpx h-20rpx w-36rpx"
            src="/static/images/homepage/arrow-icon.png"
          />
        </view>
      </view>

      <!-- 装饰图片 -->
      <image
        class="absolute right-42rpx top-192rpx h-262rpx w-274rpx"
        src="/static/images/homepage/decoration.png"
      />
    </view>

    <!-- 健康管家区域 -->
    <view class="mx-48rpx mt-32rpx">
      <view class="h-80rpx flex items-center rounded-40rpx from-white to-[#fef9eb] bg-gradient-to-b px-16rpx">
        <image
          class="mr-16rpx h-40rpx w-40rpx"
          src="/static/images/homepage/health-manager-icon.png"
        />
        <text class="flex-1 text-22rpx text-[#967f64]">[健康管家]您最近身体怎么样？</text>
        <view class="h-56rpx w-148rpx flex items-center justify-center rounded-32rpx from-[#f0c67a] to-[#eba54b] bg-gradient-to-b">
          <text class="text-24rpx text-white font-medium">问医生</text>
        </view>
      </view>
    </view>

    <!-- 专属权益区域 -->
    <view class="mx-24rpx mt-32rpx flex-1">
      <view class="rounded-16rpx bg-white p-24rpx">
        <!-- 标题和设置 -->
        <view class="mb-32rpx flex items-center justify-between">
          <text class="text-32rpx text-[#333333] font-medium">您的专属权益</text>
          <view class="flex items-center">
            <text class="mr-8rpx text-24rpx text-[#999999]">设置</text>
            <image
              class="h-24rpx w-24rpx"
              src="/static/images/homepage/settings-arrow.png"
            />
          </view>
        </view>

        <!-- 功能网格 -->
        <view class="grid grid-cols-2 mb-32rpx gap-16rpx">
          <!-- 预约问诊 -->
          <view class="relative h-156rpx overflow-hidden rounded-8rpx">
            <image
              class="h-full w-full object-cover"
              src="/static/images/homepage/appointment-icon.png"
            />
            <text class="absolute bottom-16rpx left-24rpx text-26rpx text-[#333333] font-medium">预约问诊</text>
          </view>

          <!-- 我的消息 -->
          <view class="relative h-156rpx overflow-hidden rounded-8rpx">
            <image
              class="h-full w-full object-cover"
              src="/static/images/homepage/message-icon.png"
            />
            <text class="absolute bottom-16rpx left-24rpx text-26rpx text-[#333333] font-medium">我的消息</text>
          </view>

          <!-- 养生收藏 -->
          <view class="relative h-156rpx overflow-hidden rounded-8rpx">
            <image
              class="h-full w-full object-cover"
              src="/static/images/homepage/collection-icon.png"
            />
            <text class="absolute bottom-16rpx left-24rpx text-26rpx text-[#333333] font-medium">养生收藏</text>
          </view>

          <!-- 关注商品 -->
          <view class="relative h-156rpx overflow-hidden rounded-8rpx">
            <image
              class="h-full w-full object-cover"
              src="/static/images/homepage/product-icon.png"
            />
            <text class="absolute bottom-16rpx left-24rpx text-26rpx text-[#333333] font-medium">关注商品</text>
          </view>
        </view>

        <!-- 全部功能卡片 -->
        <view class="relative h-156rpx overflow-hidden rounded-8rpx from-[#f1f6ff] to-[#e3eafe] bg-gradient-to-br p-24rpx">
          <image
            class="absolute right-2rpx top-0 h-full w-226rpx object-cover"
            src="/static/images/homepage/all-function-bg1.png"
          />
          <image
            class="absolute right-0 top-0 h-full w-186rpx object-cover"
            src="/static/images/homepage/all-function-bg2.png"
          />
          <view class="relative z-10">
            <text class="mb-16rpx text-26rpx text-[#333333] font-medium">全部功能</text>
            <text class="mb-8rpx text-20rpx text-[#aca7c3] font-medium">7x24小时</text>
            <text class="text-20rpx text-[#aca7c3] font-medium">一对一服务</text>
          </view>
        </view>

        <!-- 设置图标 -->
        <image
          class="absolute bottom-22rpx left-212rpx h-112rpx w-112rpx"
          src="/static/images/homepage/settings-icon.png"
        />
      </view>
    </view>

    <!-- 底部信息区域 -->
    <view class="mx-24rpx mb-32rpx mt-32rpx">
      <view class="h-344rpx flex gap-16rpx">
        <!-- 日历背景区域 -->
        <view class="relative flex-1 overflow-hidden rounded-16rpx">
          <image
            class="h-full w-full object-cover"
            src="/static/images/homepage/calendar-bg.png"
          />
          <text class="absolute left-68rpx top-154rpx text-20rpx text-white font-normal">GO</text>

          <!-- 日历信息 -->
          <view class="absolute left-16rpx right-16rpx top-16rpx">
            <image
              class="h-280rpx w-full object-cover"
              src="/static/images/homepage/calendar-icon.png"
            />
            <text class="absolute left-16rpx top-16rpx text-28rpx text-[#999999] font-medium">七月十五</text>
            <text class="absolute left-16rpx top-56rpx text-28rpx text-[#999999] font-medium">乙己蛇年</text>

            <!-- 日期卡片 -->
            <view class="absolute bottom-16rpx left-16rpx right-18rpx h-128rpx flex flex-col items-center justify-center rounded-10rpx bg-white">
              <text class="text-60rpx text-[#286bab] font-bold">09 / 06</text>
              <text class="text-25rpx text-[#286bab] font-bold">2025</text>
            </view>

            <!-- 节气标签 -->
            <view class="absolute right-22rpx top-16rpx h-84rpx w-48rpx flex items-center justify-center rounded-16rpx bg-[rgba(40,107,171,0.48)]">
              <text class="text-center text-24rpx text-white font-medium leading-tight">雨<br>水</text>
            </view>
          </view>
        </view>

        <!-- 体质状态区域 -->
        <view class="flex-1 rounded-16rpx from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br p-16rpx">
          <text class="mb-16rpx text-24rpx text-[#ba7210] font-bold">体质状态：</text>

          <view class="h-192rpx rounded-8rpx bg-[rgba(255,255,255,0.5)] p-18rpx">
            <!-- 体质徽章 -->
            <view class="mb-16rpx flex justify-end">
              <view class="relative h-40rpx w-144rpx">
                <image
                  class="h-full w-full"
                  src="/static/images/homepage/constitution-badge.png"
                />
                <text class="absolute inset-0 flex items-center justify-center text-20rpx text-white font-medium">平和体质</text>
              </view>
            </view>

            <text class="text-24rpx text-[#333333] font-medium">气节养生建议：神仙粥</text>
          </view>
        </view>
      </view>

      <!-- 养生建议文字 -->
      <text class="mt-16rpx text-24rpx text-[#ababab] font-medium leading-relaxed">糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。</text>
    </view>
  </view>
</template>
