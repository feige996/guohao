<script lang="ts" setup>
import SearchBar from '@/components/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '养生',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索')
  // 在这里添加搜索逻辑
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <view class="relative h-[848rpx] w-[750rpx] flex flex-col items-start from-[#f6e2d3] to-transparent bg-gradient-to-b">
      <!-- 搜索栏 -->
      <SearchBar
        @search="handleSearch"
        @click="handleSearchBarClick"
      />

      <view class="h-[264rpx] w-[702rpx] flex flex-row items-start justify-center gap-[14rpx]">
        <view class="relative h-[264rpx] w-[344rpx] flex flex-shrink-0 flex-col items-start justify-center rounded-[16rpx] from-[#fff7eb] to-[#ffead2] bg-gradient-to-br">
          <image
            class="relative ml-auto mr-[4rpx] mt-0 h-[138rpx] w-[224rpx]"
            src="@img/healthcare/guide-bg.png"
            mode="aspectFill"
          />
          <view class="relative ml-[16rpx] mt-[-138rpx] h-[248rpx] w-[328rpx] flex flex-col items-start">
            <image
              class="relative ml-auto mr-0 mt-0 h-[138rpx] w-[188rpx]"
              src="@img/healthcare/guide-decoration.png"
              mode="aspectFill"
            />
            <image
              class="relative ml-auto mr-[20rpx] mt-[-126rpx] h-[148rpx] w-[148rpx]"
              src="@img/healthcare/guide-avatar.png"
              mode="aspectFill"
            />
            <text class="relative mb-[-7rpx] ml-[8rpx] mt-[-132rpx] h-[38rpx] w-[108rpx] whitespace-pre text-[26rpx] text-[#5a462b] font-medium leading-[38rpx]"> 导诊顾问 </text>
            <text class="relative ml-[8rpx] mt-[16rpx] whitespace-pre text-[20rpx] text-[#baa482] font-medium leading-[24rpx]"> 不清楚挂什么科？ </text>
            <text class="relative ml-[8rpx] mt-[4rpx] h-[24rpx] w-[108rpx] whitespace-pre text-[20rpx] text-[#baa482] font-medium leading-[24rpx]"> 问我！ </text>
            <view class="absolute bottom-0 left-0 right-[16rpx] top-auto h-[112rpx] w-auto flex flex-row items-start rounded-[16rpx] bg-white/50 backdrop-blur-[10rpx]">
              <view class="relative z-1 ml-[22rpx] mt-[28rpx] h-[56rpx] w-[20rpx] flex flex-col items-start">
                <image
                  class="relative ml-0 mt-0 h-[16rpx] w-[20rpx]"
                  src="@img/healthcare/guide-icon1.png"
                  mode="aspectFill"
                />
                <image
                  class="absolute bottom-0 left-0 top-auto h-[16rpx] w-[20rpx]"
                  src="@img/healthcare/guide-icon2.png"
                  mode="aspectFill"
                />
              </view>
              <view class="relative z-0 ml-[6rpx] mt-[24rpx] h-[64rpx] w-[132rpx] flex flex-col items-start">
                <text class="relative ml-0 mt-0 w-[108rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 专业指导 </text>
                <text class="absolute bottom-0 left-0 top-auto w-[132rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 快速问答 </text>
              </view>
              <image
                class="absolute bottom-[31.25%] left-[82.0513%] right-[5.1282%] top-[33.0357%] z-2 h-[35.7143%] w-[12.8205%]"
                src="@img/healthcare/guide-arrow.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
        <view class="relative h-[264rpx] w-[344rpx] flex flex-shrink-0 flex-col items-start justify-center rounded-[16rpx] from-[#f0fbfc] to-[#def0f3] bg-gradient-to-br">
          <image
            class="relative ml-auto mr-[4rpx] mt-0 h-[138rpx] w-[224rpx]"
            src="@img/healthcare/consult-bg.png"
            mode="aspectFill"
          />
          <view class="relative ml-[16rpx] mt-[-138rpx] h-[248rpx] w-[328rpx] flex flex-col items-start">
            <image
              class="relative z-0 ml-auto mr-0 mt-0 h-[138rpx] w-[188rpx]"
              src="@img/healthcare/consult-decoration.png"
              mode="aspectFill"
            />
            <image
              class="relative z-1 ml-auto mr-[20rpx] mt-[-126rpx] h-[148rpx] w-[148rpx]"
              src="@img/healthcare/consult-avatar.png"
              mode="aspectFill"
            />
            <text class="relative z-3 mb-[-7rpx] ml-[8rpx] mt-[-132rpx] h-[38rpx] w-[108rpx] whitespace-pre text-[26rpx] text-[#456860] font-medium leading-[38rpx]"> 在线问诊 </text>
            <text class="relative z-4 ml-[8rpx] mt-[16rpx] h-[24rpx] w-[92rpx] whitespace-pre text-[20rpx] text-[#85b7b0] font-medium leading-[24rpx]"> 中医专家 </text>
            <text class="relative z-5 ml-[8rpx] mt-[4rpx] h-[24rpx] w-[108rpx] whitespace-pre text-[20rpx] text-[#85b7b0] font-medium leading-[24rpx]"> 在线咨询 </text>
            <view class="absolute bottom-0 left-0 right-[16rpx] top-auto z-2 h-[112rpx] w-auto flex flex-row items-start rounded-[16rpx] bg-white/50 backdrop-blur-[10rpx]">
              <view class="relative z-0 ml-[22rpx] mt-[28rpx] h-[56rpx] w-[20rpx] flex flex-col items-start">
                <image
                  class="relative ml-0 mt-0 h-[16rpx] w-[20rpx]"
                  src="@img/healthcare/consult-icon1.png"
                  mode="aspectFill"
                />
                <image
                  class="absolute bottom-0 left-0 top-auto h-[16rpx] w-[20rpx]"
                  src="@img/healthcare/consult-icon2.png"
                  mode="aspectFill"
                />
              </view>
              <view class="relative z-2 ml-[6rpx] mt-[24rpx] h-[64rpx] w-[154rpx] flex flex-col items-start">
                <text class="relative ml-0 mt-0 whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 与专家实时沟通 </text>
                <text class="absolute bottom-0 left-0 top-auto w-[132rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 服务严格质控 </text>
              </view>
              <image
                class="absolute bottom-[31.25%] left-[82.0513%] right-[5.1282%] top-[33.0357%] z-1 h-[35.7143%] w-[12.8205%]"
                src="@img/healthcare/consult-arrow.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
