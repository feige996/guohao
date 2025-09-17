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

      <div class="group_9296">
        <div class="group_9295">
          <img
            class="rectangle_9979"
            src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623418233/e056/328a/931e/55a68ba63bbc8996c9cdbd90c92bd1b3.png"
          >
          <div class="flexcontainer">
            <img
              class="rectangle_9980"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62622947060/cdb1/c12d/ee07/2c813bab3cbf2e7121bfc3393e8cbb6f.png"
            ><img
              class="group_9249"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623419080/3446/cec1/1d00/9b4cb132fcd6c2d0f94a671d08fb7904.png"
            ><span class="text"> 导诊顾问 </span><span class="text_1"> 不清楚挂什么科？ </span><span class="text_2"> 问我！ </span>
            <div class="rectangle_10003">
              <div class="flexcontainer_1">
                <img
                  class="path_696"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623418304/9e87/34ae/3cc4/f8cff4d1d1e1f020b9893a3411c4a09c.png"
                ><img
                  class="path_696_1"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623416546/7b6b/63d7/1e4f/37b0355552f11367e09684c46e84379c.png"
                >
              </div>
              <div class="flexcontainer_2">
                <span class="text_3"> 专业指导 </span><span class="text_4"> 快速问答 </span>
              </div>
              <img
                class="path"
                src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623416571/242b/1ebf/5f32/23ada3d896a187875c98b42da52d9ebc.png"
              >
            </div>
          </div>
        </div>
        <div class="group_9294">
          <img
            class="rectangle_9979_1"
            src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623419147/556a/abea/fe50/e06d8cf1ca32e94c6ba525e97292c46c.png"
          >
          <div class="flexcontainer_3">
            <img
              class="rectangle_9980_1"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62622944237/0f6c/321f/9c93/fb50ed5132e96b5bdb7fad1f986df0c6.png"
            ><img
              class="group_9250"
              src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415813/8b68/a8b9/5f30/f705fe5faa0c8a1d131876aed0278566.png"
            ><span class="text_5"> 在线问诊 </span><span class="text_6"> 中医专家 </span><span class="text_7"> 在线咨询 </span>
            <div class="rectangle_10002">
              <div class="flexcontainer_4">
                <img
                  class="path_696_2"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415838/2be7/5413/6f9d/8a08db37a164f3b64312aba3899f36bd.png"
                ><img
                  class="path_696_3"
                  src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415852/81dc/a79f/23fc/79301b0e45f3ab87f37c5d7eb1edc59a.png"
                >
              </div>
              <div class="flexcontainer_5">
                <span class="text_8"> 与专家实时沟通 </span><span class="text_9"> 服务严格质控 </span>
              </div>
              <img
                class="path_1"
                src="https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62623415883/b277/4f62/cb71/f2edfb05f17eee1c788e31c7f92f044e.png"
              >
            </div>
          </div>
        </div>
      </div>
    </view>
  </view>
</template>

<style>
* {
  box-sizing: border-box;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.justify-start {
  display: flex;
  justify-content: flex-start;
}
.justify-center {
  display: flex;
  justify-content: center;
}
.justify-end {
  display: flex;
  justify-content: flex-end;
}
.justify-between {
  display: flex;
  justify-content: space-between;
}
.items-start {
  display: flex;
  align-items: flex-start;
}
.items-end {
  display: flex;
  align-items: flex-end;
}
.items-center {
  display: flex;
  align-items: center;
}
.no-shrink {
  flex-shrink: 0;
}
</style>

<style scoped>
/* 组 9296 */
.group_9296 {
  width: 702rpx;
  height: 264rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 14rpx;
}

/* 组 9295 */
.group_9295 {
  width: 344rpx;
  height: 264rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;
  border-radius: 16rpx;
  background: linear-gradient(127.5deg, #fff7eb 0%, #ffead2 100%), linear-gradient(127.5deg, #f0fbfc 0%, #def0f3 100%);
}

/* 矩形 9979 */
.rectangle_9979 {
  width: 224rpx;
  height: 138rpx;
  position: relative;
  margin-top: 0;
  margin-left: auto;
  margin-right: 4rpx;
}

/* flexContainer */
.flexcontainer {
  position: relative;
  display: flex;
  width: 328rpx;
  height: 248rpx;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -138rpx;
  margin-left: 16rpx;
}

/* 矩形 9980 */
.rectangle_9980 {
  width: 188rpx;
  height: 138rpx;
  position: relative;
  margin-top: 0;
  margin-left: auto;
  margin-right: 0;
}

/* 组 9249 */
.group_9249 {
  width: 148rpx;
  height: 148rpx;
  position: relative;
  margin-top: -126rpx;
  margin-left: auto;
  margin-right: 20rpx;
}

/* 导诊顾问 */
.text {
  width: 108rpx;
  height: 38rpx;
  font-size: 26rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 38rpx;
  color: #5a462b;
  white-space: pre;
  margin-top: -132rpx;
  margin-bottom: -7rpx;
  position: relative;
  margin-left: 8rpx;
}

/* 不清楚挂什么科？ */
.text_1 {
  font-size: 20rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #baa482;
  white-space: pre;
  position: relative;
  margin-top: 16rpx;
  margin-left: 8rpx;
}

/* 问我！ */
.text_2 {
  width: 108rpx;
  height: 24rpx;
  font-size: 20rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #baa482;
  white-space: pre;
  position: relative;
  margin-top: 4rpx;
  margin-left: 8rpx;
}

/* 矩形 10003 */
.rectangle_10003 {
  position: absolute;
  width: auto;
  height: 112rpx;
  top: auto;
  left: 0;
  border-radius: 16rpx;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10rpx);
  right: 16rpx;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  isolation: isolate;
}

/* flexContainer */
.flexcontainer_1 {
  position: relative;
  display: flex;
  width: 20rpx;
  height: 56rpx;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  margin-left: 22rpx;
  margin-top: 28rpx;
}

/* 路径 696 */
.path_696 {
  width: 20rpx;
  height: 16rpx;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 路径 696 */
.path_696_1 {
  width: 20rpx;
  height: 16rpx;
  position: absolute;
  top: auto;
  left: 0;
  bottom: 0;
}

/* flexContainer */
.flexcontainer_2 {
  position: relative;
  display: flex;
  width: 132rpx;
  height: 64rpx;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;
  margin-left: 6rpx;
  margin-top: 24rpx;
}

/* 专业指导 */
.text_3 {
  width: 108rpx;
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #909090;
  white-space: pre;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 快速问答 */
.text_4 {
  width: 132rpx;
  position: absolute;
  top: auto;
  left: 0;
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #909090;
  white-space: pre;
  bottom: 0;
}

/* 路径 */
.path {
  width: 12.8205%;
  height: 35.7143%;
  position: absolute;
  top: 33.0357%;
  left: 82.0513%;
  right: 5.1282%;
  bottom: 31.25%;
  z-index: 2;
}

/* 组 9294 */
.group_9294 {
  width: 344rpx;
  height: 264rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  position: relative;
  border-radius: 16rpx;
  background: linear-gradient(127.5deg, #f0fbfc 0%, #def0f3 100%);
}

/* 矩形 9979 */
.rectangle_9979_1 {
  width: 224rpx;
  height: 138rpx;
  position: relative;
  margin-top: 0;
  margin-left: auto;
  margin-right: 4rpx;
}

/* flexContainer */
.flexcontainer_3 {
  position: relative;
  display: flex;
  width: 328rpx;
  height: 248rpx;
  flex-direction: column;
  align-items: flex-start;
  isolation: isolate;
  margin-top: -138rpx;
  margin-left: 16rpx;
}

/* 矩形 9980 */
.rectangle_9980_1 {
  width: 188rpx;
  height: 138rpx;
  position: relative;
  z-index: 0;
  margin-top: 0;
  margin-left: auto;
  margin-right: 0;
}

/* 组 9250 */
.group_9250 {
  width: 148rpx;
  height: 148rpx;
  position: relative;
  z-index: 1;
  margin-top: -126rpx;
  margin-left: auto;
  margin-right: 20rpx;
}

/* 在线问诊 */
.text_5 {
  width: 108rpx;
  height: 38rpx;
  font-size: 26rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 38rpx;
  color: #456860;
  white-space: pre;
  margin-top: -132rpx;
  margin-bottom: -7rpx;
  z-index: 3;
  position: relative;
  margin-left: 8rpx;
}

/* 中医专家 */
.text_6 {
  width: 92rpx;
  height: 24rpx;
  font-size: 20rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #85b7b0;
  white-space: pre;
  z-index: 4;
  position: relative;
  margin-top: 16rpx;
  margin-left: 8rpx;
}

/* 在线咨询 */
.text_7 {
  width: 108rpx;
  height: 24rpx;
  font-size: 20rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #85b7b0;
  white-space: pre;
  z-index: 5;
  position: relative;
  margin-top: 4rpx;
  margin-left: 8rpx;
}

/* 矩形 10002 */
.rectangle_10002 {
  position: absolute;
  width: auto;
  height: 112rpx;
  top: auto;
  left: 0;
  border-radius: 16rpx;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10rpx);
  right: 16rpx;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  isolation: isolate;
  z-index: 2;
}

/* flexContainer */
.flexcontainer_4 {
  position: relative;
  display: flex;
  width: 20rpx;
  height: 56rpx;
  flex-direction: column;
  align-items: flex-start;
  z-index: 0;
  margin-left: 22rpx;
  margin-top: 28rpx;
}

/* 路径 696 */
.path_696_2 {
  width: 20rpx;
  height: 16rpx;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 路径 696 */
.path_696_3 {
  width: 20rpx;
  height: 16rpx;
  position: absolute;
  top: auto;
  left: 0;
  bottom: 0;
}

/* flexContainer */
.flexcontainer_5 {
  position: relative;
  display: flex;
  width: 154rpx;
  height: 64rpx;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  margin-left: 6rpx;
  margin-top: 24rpx;
}

/* 与专家实时沟通 */
.text_8 {
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #909090;
  white-space: pre;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 服务严格质控 */
.text_9 {
  width: 132rpx;
  position: absolute;
  top: auto;
  left: 0;
  font-size: 22rpx;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 24rpx;
  color: #909090;
  white-space: pre;
  bottom: 0;
}

/* 路径 */
.path_1 {
  width: 12.8205%;
  height: 35.7143%;
  position: absolute;
  top: 33.0357%;
  left: 82.0513%;
  right: 5.1282%;
  bottom: 31.25%;
  z-index: 1;
}
</style>
