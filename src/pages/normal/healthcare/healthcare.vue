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
            src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623418233/e056/328a/931e/55a68ba63bbc8996c9cdbd90c92bd1b3.png"
            mode="aspectFill"
          />
          <view class="relative ml-[16rpx] mt-[-138rpx] h-[248rpx] w-[328rpx] flex flex-col items-start">
            <image
              class="relative ml-auto mr-0 mt-0 h-[138rpx] w-[188rpx]"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62622947060/cdb1/c12d/ee07/2c813bab3cbf2e7121bfc3393e8cbb6f.png"
              mode="aspectFill"
            />
            <image
              class="relative ml-auto mr-[20rpx] mt-[-126rpx] h-[148rpx] w-[148rpx]"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623419080/3446/cec1/1d00/9b4cb132fcd6c2d0f94a671d08fb7904.png"
              mode="aspectFill"
            />
            <text class="relative mb-[-7rpx] ml-[8rpx] mt-[-132rpx] h-[38rpx] w-[108rpx] whitespace-pre text-[26rpx] text-[#5a462b] font-medium leading-[38rpx]"> 导诊顾问 </text>
            <text class="relative ml-[8rpx] mt-[16rpx] whitespace-pre text-[20rpx] text-[#baa482] font-medium leading-[24rpx]"> 不清楚挂什么科？ </text>
            <text class="relative ml-[8rpx] mt-[4rpx] h-[24rpx] w-[108rpx] whitespace-pre text-[20rpx] text-[#baa482] font-medium leading-[24rpx]"> 问我！ </text>
            <view class="absolute bottom-0 left-0 right-[16rpx] top-auto h-[112rpx] w-auto flex flex-row items-start rounded-[16rpx] bg-white/50 backdrop-blur-[10rpx]">
              <view class="relative z-1 ml-[22rpx] mt-[28rpx] h-[56rpx] w-[20rpx] flex flex-col items-start">
                <image
                  class="relative ml-0 mt-0 h-[16rpx] w-[20rpx]"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623418304/9e87/34ae/3cc4/f8cff4d1d1e1f020b9893a3411c4a09c.png"
                  mode="aspectFill"
                />
                <image
                  class="absolute bottom-0 left-0 top-auto h-[16rpx] w-[20rpx]"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623416546/7b6b/63d7/1e4f/37b0355552f11367e09684c46e84379c.png"
                  mode="aspectFill"
                />
              </view>
              <view class="relative z-0 ml-[6rpx] mt-[24rpx] h-[64rpx] w-[132rpx] flex flex-col items-start">
                <text class="relative ml-0 mt-0 w-[108rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 专业指导 </text>
                <text class="absolute bottom-0 left-0 top-auto w-[132rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 快速问答 </text>
              </view>
              <image
                class="absolute bottom-[31.25%] left-[82.0513%] right-[5.1282%] top-[33.0357%] z-2 h-[35.7143%] w-[12.8205%]"
                src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623416571/242b/1ebf/5f32/23ada3d896a187875c98b42da52d9ebc.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
        <view class="relative h-[264rpx] w-[344rpx] flex flex-shrink-0 flex-col items-start justify-center rounded-[16rpx] from-[#f0fbfc] to-[#def0f3] bg-gradient-to-br">
          <image
            class="relative ml-auto mr-[4rpx] mt-0 h-[138rpx] w-[224rpx]"
            src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623419147/556a/abea/fe50/e06d8cf1ca32e94c6ba525e97292c46c.png"
            mode="aspectFill"
          />
          <view class="relative ml-[16rpx] mt-[-138rpx] h-[248rpx] w-[328rpx] flex flex-col items-start">
            <image
              class="relative z-0 ml-auto mr-0 mt-0 h-[138rpx] w-[188rpx]"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62622944237/0f6c/321f/9c93/fb50ed5132e96b5bdb7fad1f986df0c6.png"
              mode="aspectFill"
            />
            <image
              class="relative z-1 ml-auto mr-[20rpx] mt-[-126rpx] h-[148rpx] w-[148rpx]"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415813/8b68/a8b9/5f30/f705fe5faa0c8a1d131876aed0278566.png"
              mode="aspectFill"
            />
            <text class="relative z-3 mb-[-7rpx] ml-[8rpx] mt-[-132rpx] h-[38rpx] w-[108rpx] whitespace-pre text-[26rpx] text-[#456860] font-medium leading-[38rpx]"> 在线问诊 </text>
            <text class="relative z-4 ml-[8rpx] mt-[16rpx] h-[24rpx] w-[92rpx] whitespace-pre text-[20rpx] text-[#85b7b0] font-medium leading-[24rpx]"> 中医专家 </text>
            <text class="relative z-5 ml-[8rpx] mt-[4rpx] h-[24rpx] w-[108rpx] whitespace-pre text-[20rpx] text-[#85b7b0] font-medium leading-[24rpx]"> 在线咨询 </text>
            <view class="absolute bottom-0 left-0 right-[16rpx] top-auto z-2 h-[112rpx] w-auto flex flex-row items-start rounded-[16rpx] bg-white/50 backdrop-blur-[10rpx]">
              <view class="relative z-0 ml-[22rpx] mt-[28rpx] h-[56rpx] w-[20rpx] flex flex-col items-start">
                <image
                  class="relative ml-0 mt-0 h-[16rpx] w-[20rpx]"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415838/2be7/5413/6f9d/8a08db37a164f3b64312aba3899f36bd.png"
                  mode="aspectFill"
                />
                <image
                  class="absolute bottom-0 left-0 top-auto h-[16rpx] w-[20rpx]"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415852/81dc/a79f/23fc/79301b0e45f3ab87f37c5d7eb1edc59a.png"
                  mode="aspectFill"
                />
              </view>
              <view class="relative z-2 ml-[6rpx] mt-[24rpx] h-[64rpx] w-[154rpx] flex flex-col items-start">
                <text class="relative ml-0 mt-0 whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 与专家实时沟通 </text>
                <text class="absolute bottom-0 left-0 top-auto w-[132rpx] whitespace-pre text-[22rpx] text-[#909090] font-medium leading-[24rpx]"> 服务严格质控 </text>
              </view>
              <image
                class="absolute bottom-[31.25%] left-[82.0513%] right-[5.1282%] top-[33.0357%] z-1 h-[35.7143%] w-[12.8205%]"
                src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415883/b277/4f62/cb71/f2edfb05f17eee1c788e31c7f92f044e.png"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
