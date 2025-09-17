<script lang="ts" setup>
import type { HealthcareCardConfig } from '@/components/HealthcareCard'
import { HEALTHCARE_CARD_CONFIGS, HealthcareCardGroup } from '@/components/HealthcareCard'
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

// 医疗服务卡片配置
const healthcareCards = [
  HEALTHCARE_CARD_CONFIGS.GUIDE,
  HEALTHCARE_CARD_CONFIGS.CONSULT,
]

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索')
  // 在这里添加搜索逻辑
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

// 医疗服务卡片点击事件处理
function handleHealthcareCardClick(config: HealthcareCardConfig) {
  console.log('点击了医疗服务卡片:', config.id, config.title)

  switch (config.id) {
    case 'guide':
      // 处理导诊顾问点击逻辑
      console.log('跳转到导诊顾问页面')
      // uni.navigateTo({ url: '/pages/guide/index' })
      break
    case 'consult':
      // 处理在线问诊点击逻辑
      console.log('跳转到在线问诊页面')
      // uni.navigateTo({ url: '/pages/consult/index' })
      break
    default:
      console.log('未知的卡片类型:', config.id)
  }
}
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索栏 -->
    <SearchBar
      @search="handleSearch"
      @click="handleSearchBarClick"
    />

    <!-- 导诊顾问,在线问诊卡片 -->
    <view class="w-full flex justify-center pt-6">
      <HealthcareCardGroup
        :configs="healthcareCards"
        @click="handleHealthcareCardClick"
      />
    </view>

    <div class="div">
      <div class="div_1">
        <span class="text"> 购药服务 </span>
        <div class="flexcontainer">
          <div class="flexcontainer_1">
            <span class="text_1"> 在线开方 </span><span class="text_2"> 便捷购药 </span>
          </div>
          <div class="group_9330">
            <div class="rectangle_10005">
              <span class="text_3"> 去选药 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="div_2">
        <span class="text_4"> 智慧自诊 </span>
        <div class="flexcontainer_2">
          <div class="flexcontainer_3">
            <span class="text_5"> 快速自测 </span><span class="text_6"> 获取初步建议 </span>
          </div>
          <div class="group_9329">
            <div class="rectangle_10005_1">
              <span class="text_7"> 开始自测 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
/* 购药服务智慧自诊 */
.div {
  width: 350px;
  height: 84px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8px;
  padding-right: 7px;
  padding-bottom: 8px;
  padding-left: 7px;
  gap: 8px;
  border-radius: 8px;
  background-color: #ffffff;
  position: relative;
}

/* 购药服务 */
.div_1 {
  width: 164px;
  height: 68px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: url(https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62626193860/eefa/7921/7b2b/acb2fa886ef7c4ab3d8b661b385120d5.png)
    center / cover no-repeat;
  isolation: isolate;
}

/* 购药服务 */
.text {
  width: 54px;
  height: 19px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #2b496b;
  white-space: pre;
  margin-top: 14px;
  margin-bottom: -3.5px;
  z-index: 1;
  position: relative;
  margin-left: 12px;
}

/* flexContainer */
.flexcontainer {
  position: relative;
  display: flex;
  width: 144px;
  height: 32px;
  flex-direction: row;
  align-items: flex-start;
  z-index: 0;
  margin-top: 2px;
  margin-left: 12px;
}

/* flexContainer */
.flexcontainer_1 {
  position: relative;
  display: flex;
  width: 60px;
  height: 26px;
  flex-direction: column;
  align-items: flex-start;
  isolation: isolate;
  margin-left: 0;
  margin-top: 6px;
}

/* 在线开方 */
.text_1 {
  width: 51px;
  height: 12px;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #89a2be;
  white-space: pre;
  z-index: 1;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 便捷购药 */
.text_2 {
  width: 60px;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #89a2be;
  white-space: pre;
  z-index: 0;
  position: relative;
  margin-top: 2px;
  margin-left: 0;
}

/* 组 9330 */
.group_9330 {
  position: relative;
  width: 72px;
  height: 28px;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 18px;
  color: #ffffff;
  white-space: pre;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  margin-top: 0;
}

/* 矩形 10005 */
.rectangle_10005 {
  position: relative;
  width: 72px;
  height: 28px;
  border-radius: 14px;
  background-color: #c37971;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0;
  margin-left: 0;
}

/* 去选药 */
.text_3 {
  height: 18px;
  margin-top: 8px;
  margin-bottom: -3px;
  position: relative;
  margin-left: 18px;
}

/* 智慧自诊 */
.div_2 {
  width: 164px;
  height: 68px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: url(https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/62624637754/241d/aee7/dd98/95eb888fdc7aa14b0119a81661c36be8.png)
    center / cover no-repeat;
  isolation: isolate;
}

/* 智慧自诊 */
.text_4 {
  width: 54px;
  height: 19px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #2b496b;
  white-space: pre;
  margin-top: 14px;
  margin-bottom: -3.5px;
  z-index: 1;
  position: relative;
  margin-left: 12px;
}

/* flexContainer */
.flexcontainer_2 {
  position: relative;
  display: flex;
  width: 144px;
  height: 32px;
  flex-direction: row;
  align-items: flex-start;
  z-index: 0;
  margin-top: 2px;
  margin-left: 12px;
}

/* flexContainer */
.flexcontainer_3 {
  position: relative;
  display: flex;
  width: 60px;
  height: 26px;
  flex-direction: column;
  align-items: flex-start;
  isolation: isolate;
  margin-left: 0;
  margin-top: 6px;
}

/* 快速自测 */
.text_5 {
  width: 51px;
  height: 12px;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #89a2be;
  white-space: pre;
  z-index: 1;
  position: relative;
  margin-top: 0;
  margin-left: 0;
}

/* 获取初步建议 */
.text_6 {
  width: 60px;
  position: absolute;
  top: auto;
  left: 0;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #89a2be;
  white-space: pre;
  bottom: 0;
  z-index: 0;
}

/* 组 9329 */
.group_9329 {
  position: relative;
  width: 72px;
  height: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  margin-top: 0;
}

/* 矩形 10005 */
.rectangle_10005_1 {
  position: absolute;
  width: 72px;
  height: 28px;
  top: auto;
  left: auto;
  border-radius: 14px;
  background-color: #70b9c1;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 开始自测 */
.text_7 {
  position: absolute;
  top: auto;
  left: auto;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 18px;
  color: #ffffff;
  white-space: pre;
  height: 18px;
  margin-top: -3px;
  margin-bottom: -3px;
  right: 12px;
  bottom: 8px;
}
</style>
