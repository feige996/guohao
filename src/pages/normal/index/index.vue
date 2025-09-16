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
  <view class="bg-white px-4 pt-2" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <div class="div">
      <div class="rectangle_9955" />
      <div class="rectangle_9972" />
      <img
        class="div_3fab9da00f5e52d27d3b9a7812753db13692cfb438d32_opmims_fw1200webp"
        src="/static/images/homepage/background.webp"
      >
      <div class="rectangle_9961" />
      <img
        class="div_18"
        src="/static/images/homepage/arrow-icon.png"
      ><span class="text_2"> 为您及家人健康提供专属服务 </span><span class="text_3"> 专业咨询 </span><span class="text_4"> 升级会员 享更多权益 </span><span class="text_5"> 去升级 </span><img
        class="frame"
        src="/static/images/homepage/upgrade-arrow.png"
      >
      <div class="group_9044">
        <div class="rectangle_9913" />
        <img
          class="frame_1"
          src="/static/images/homepage/search-icon.png"
        ><span class="text_6"> 搜索疾病、症状、科室等 </span>
        <div class="rectangle_9945" />
        <span class="text_7"> 搜索 </span>
      </div>
      <img
        class="div_7c6b0eae8edeb4866b93c9c11bdc991bf8ab758f9f625_qldtzd_fw1200webp"
        src="/static/images/homepage/decoration.png"
      >
      <div class="group_9227">
        <div class="rectangle_9963" />
        <span class="text_8"> [健康管家]您最近身体怎么样？ </span>
        <div class="rectangle_9967" />
        <span class="text_9"> 问医生 </span><img
          class="div_1"
          src="/static/images/homepage/health-manager-icon.png"
        >
      </div>
      <div class="group_9247">
        <div class="rectangle_11844" />
        <span class="text_10"> 您的专属权益 </span>
        <div class="group_9045">
          <img
            class="group_9253"
            src="/static/images/homepage/appointment-icon.png"
          ><span class="text_11"> 预约问诊 </span>
        </div>
        <div class="group_9046">
          <img
            class="group_9254"
            src="/static/images/homepage/message-icon.png"
          ><span class="text_12"> 我的消息 </span>
        </div>
        <div class="group_9047">
          <img
            class="group_9255"
            src="/static/images/homepage/collection-icon.png"
          ><span class="text_13"> 养生收藏 </span>
        </div>
        <div class="group_9048">
          <img
            class="group_9256"
            src="/static/images/homepage/product-icon.png"
          ><span class="text_14"> 关注商品 </span>
        </div>
        <div class="group_9049">
          <div class="rectangle_9978" />
          <img
            class="rectangle_9979"
            src="/static/images/homepage/all-function-bg1.png"
          ><img
            class="rectangle_9980"
            src="/static/images/homepage/all-function-bg2.png"
          ><span class="text_15"> 全部功能 </span><span class="text_16"> 7x24小时 </span><span class="text_17"> 一对一服务 </span>
        </div>
        <img
          class="div_2"
          src="/static/images/homepage/settings-icon.png"
        ><span class="text_18"> 设置 </span><img
          class="div_3"
          src="/static/images/homepage/settings-arrow.png"
        >
      </div>

      <div class="group_9245">
        <img
          class="rectangle_2"
          src="/static/images/homepage/calendar-bg.png"
        ><span class="text_23"> GO </span>
      </div>
      <div class="group_9230">
        <img
          class="group_9252"
          src="/static/images/homepage/calendar-icon.png"
        ><span class="text_24"> 七月十五 </span><span class="text_25"> 乙己蛇年 </span>
        <div class="rectangle_11843" />
        <span class="text_26"> 09 / 06 </span><span class="text_27"> 2025 </span>
        <div class="rectangle_11858" />
        <span class="text_28"> 雨<br>水 </span>
      </div>
      <div class="group_9229">
        <div class="rectangle_9966" />
        <span class="text_29"> 体质状态： </span>
        <div class="rectangle_9974" />
        <span class="text_30"> 气节养生建议：神仙粥 </span>
        <div class="group_9228">
          <img
            class="rectangle_11012"
            src="/static/images/homepage/constitution-badge.png"
          ><span class="text_31"> 平和体质 </span>
        </div>
      </div>
      <span class="text_32"> 糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。 </span>
    </div>
  </view>
</template>

<style lang="scss" scoped>
//
</style>

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
/* 首页 */
.div {
  width: 375px;
  height: 812px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #f5f7f4;
}

/* 矩形 9955 */
.rectangle_9955 {
  width: auto;
  height: 424px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #f6e2d3 0%, rgba(247, 246, 246, 0) 100%);
  right: 0;
}

/* 矩形 9972 */
.rectangle_9972 {
  width: auto;
  height: 49px;
  position: absolute;
  top: 259px;
  left: 12px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f6e2d3 0%, #ece3d1 100%);
  right: 12px;
}

/* 3fab9da00f5e52d27d3b9a7812753db13692cfb438d32-OpMImS_fw1200webp */
.div_3fab9da00f5e52d27d3b9a7812753db13692cfb438d32_opmims_fw1200webp {
  width: 100%;
  height: 530px;
  position: absolute;
  top: -391px;
  left: 0;
  object-fit: cover;
  right: 0;
}

/* Status bar/light */
.status_bar_light {
  width: 375px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* Status bar/light */
.status_bar_light_1 {
  width: 375px;
  height: 40px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

/* Fill 17 */
.fill_17 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
}

/* icons/network/status bar */
.icons_network_status_bar {
  width: 4.5333%;
  height: 27.5%;
  position: absolute;
  top: 47.5%;
  left: 78.6667%;
  right: 16.8%;
  bottom: 25%;
}

/* icons/wifi/status bar */
.icons_wifi_status_bar {
  width: 4%;
  height: 27.5%;
  position: absolute;
  top: 47.5%;
  left: 84.4%;
  right: 11.6%;
  bottom: 25%;
}

/* icons/buttary/status bar */
.icons_buttary_status_bar {
  width: 6.6667%;
  height: 27.5%;
  position: absolute;
  top: 45%;
  left: 89.7333%;
  right: 3.6%;
  bottom: 27.5%;
}

/* 9:41 */
.text {
  position: absolute;
  top: 9px;
  left: 8.2667%;
  font-size: 15px;
  font-family: 'Alibaba PuHuiTi 3.0';
  font-weight: 250;
  line-height: 21px;
  letter-spacing: 0px;
  color: #333333;
  white-space: pre;
  right: 83.7333%;
  width: 8%;
  bottom: 0;
  height: max-content;
  margin-top: auto;
  margin-bottom: auto;
}

/* Status bar/light */
.status_bar_light_2 {
  width: 375px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* Status bar/light */
.status_bar_light_3 {
  width: 375px;
  height: 40px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

/* Fill 17 */
.fill_17_1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
}

/* icons/network/status bar */
.icons_network_status_bar_1 {
  width: 4.5333%;
  height: 27.5%;
  position: absolute;
  top: 47.5%;
  left: 78.6667%;
  right: 16.8%;
  bottom: 25%;
}

/* icons/wifi/status bar */
.icons_wifi_status_bar_1 {
  width: 4%;
  height: 27.5%;
  position: absolute;
  top: 47.5%;
  left: 84.4%;
  right: 11.6%;
  bottom: 25%;
}

/* icons/buttary/status bar */
.icons_buttary_status_bar_1 {
  width: 6.6667%;
  height: 27.5%;
  position: absolute;
  top: 45%;
  left: 89.7333%;
  right: 3.6%;
  bottom: 27.5%;
}

/* 9:41 */
.text_1 {
  position: absolute;
  top: 9px;
  left: 8.2667%;
  font-size: 15px;
  font-family: 'Alibaba PuHuiTi 3.0';
  font-weight: 250;
  line-height: 21px;
  letter-spacing: 0px;
  color: #333333;
  white-space: pre;
  right: 83.7333%;
  width: 8%;
  bottom: 0;
  height: max-content;
  margin-top: auto;
  margin-bottom: auto;
}

/* 矩形 9961 */
.rectangle_9961 {
  width: auto;
  height: 150px;
  position: absolute;
  top: 122px;
  left: 12px;
  border-radius: 8px;
  background: linear-gradient(112.48deg, #feca75 0.48%, #d4b477 100%);
  right: 12px;
}

/* 多边形 18 */
.div_18 {
  width: 18px;
  height: 10px;
  position: absolute;
  top: 212.5px;
  left: 294px;
}

/* 为您及家人健康提供专属服务 */
.text_2 {
  position: absolute;
  top: 178px;
  left: 24px;
  font-size: 14px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 100%;
  color: #ffffff;
  white-space: pre;
}

/* 专业咨询 */
.text_3 {
  position: absolute;
  top: 146px;
  left: 24px;
  font-size: 20px;
  font-family: 'Source Han Sans';
  font-weight: 700;
  line-height: 100%;
  background: linear-gradient(180deg, #97493d 0%, #ba7720 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  white-space: pre;
}

/* 升级会员 享更多权益 */
.text_4 {
  position: absolute;
  top: 284px;
  left: 24px;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 100%;
  color: #ae956d;
  white-space: pre;
}

/* 去升级 */
.text_5 {
  position: absolute;
  top: 284px;
  left: 299px;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 100%;
  color: #ae956d;
  white-space: pre;
}

/* 容器 */
.frame {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 284px;
  left: auto;
  right: 24px;
}

/* 组 9044 */
.group_9044 {
  width: auto;
  height: 40px;
  position: absolute;
  top: 52px;
  left: 12px;
  right: 12px;
}

/* 矩形 9913 */
.rectangle_9913 {
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 330px;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: #cccccc;
  background-color: #f7f4f3;
  right: 0;
  bottom: 0;
}

/* 容器 */
.frame_1 {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0;
  left: 8px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* 搜索疾病、症状、科室等 */
.text_6 {
  position: absolute;
  top: 14px;
  left: 0;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 400;
  line-height: 100%;
  color: #cccccc;
  white-space: pre;
  right: 163px;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}

/* 矩形 9945 */
.rectangle_9945 {
  width: 56px;
  height: auto;
  position: absolute;
  top: 4px;
  left: auto;
  border-radius: 58px;
  background-color: #97493d;
  right: 4px;
  bottom: 4px;
}

/* 搜索 */
.text_7 {
  position: absolute;
  top: 14px;
  left: 287px;
  text-align: center;
  font-size: 12px;
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  line-height: 100%;
  color: #ffffff;
  white-space: pre;
  right: 0;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
}

/* 7c6b0eae8edeb4866b93c9c11bdc991bf8ab758f9f625-qlDTZD_fw1200webp */
.div_7c6b0eae8edeb4866b93c9c11bdc991bf8ab758f9f625_qldtzd_fw1200webp {
  width: 137px;
  height: 131px;
  position: absolute;
  top: 96px;
  left: auto;
  object-fit: cover;
  right: 21px;
}

/* 组 9227 */
.group_9227 {
  width: auto;
  height: 40px;
  position: absolute;
  top: 219px;
  left: 24px;
  right: 24px;
}

/* 矩形 9963 */
.rectangle_9963 {
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fef9eb 100%);
  right: 0;
  bottom: 0;
}

/* [健康管家]您最近身体怎么样？ */
.text_8 {
  position: absolute;
  top: 0;
  left: 36px;
  font-size: 11px;
  font-family: 'Source Han Sans';
  font-weight: 400;
  line-height: 12px;
  color: #967f64;
  white-space: pre;
  bottom: 0;
  height: max-content;
  margin-top: auto;
  margin-bottom: auto;
}

/* 矩形 9967 */
.rectangle_9967 {
  width: 74px;
  height: auto;
  position: absolute;
  top: 6px;
  left: auto;
  border-radius: 16px;
  background: linear-gradient(180deg, #f0c67a 0%, #eba54b 98.57%);
  right: 8px;
  bottom: 6px;
}

/* 问医生 */
.text_9 {
  position: absolute;
  top: 0;
  left: auto;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 100%;
  color: #ffffff;
  white-space: pre;
  right: 27px;
  bottom: 0;
  height: max-content;
  margin-top: auto;
  margin-bottom: auto;
}

/* 提示 (1) */
.div_1 {
  width: 20px;
  height: auto;
  position: absolute;
  top: 10px;
  left: 8px;
  bottom: 10px;
}

/* 组 9247 */
.group_9247 {
  width: auto;
  height: 300px;
  position: absolute;
  top: auto;
  left: 12px;
  right: 12px;
  bottom: 6px;
}

/* 矩形 11844 */
.rectangle_11844 {
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background-color: #ffffff;
  right: 0;
  bottom: 5px;
}

/* 您的专属权益 */
.text_10 {
  width: 96px;
  height: 22px;
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 16px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 20px;
  color: #333333;
  white-space: pre;
}

/* 组 9045 */
.group_9045 {
  width: 164px;
  height: 78px;
  position: absolute;
  top: 54px;
  left: 8px;
}

/* 组 9253 */
.group_9253 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 预约问诊 */
.text_11 {
  width: 54px;
  position: absolute;
  top: 0;
  left: 12px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #333333;
  white-space: pre;
  height: 19px;
  margin-top: auto;
  margin-bottom: auto;
  bottom: 2px;
}

/* 组 9046 */
.group_9046 {
  width: 164px;
  height: 78px;
  position: absolute;
  top: 54px;
  left: auto;
  right: 8px;
}

/* 组 9254 */
.group_9254 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 我的消息 */
.text_12 {
  width: 54px;
  position: absolute;
  top: 0;
  left: 12px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #333333;
  white-space: pre;
  height: 19px;
  margin-top: auto;
  margin-bottom: auto;
  bottom: 2px;
}

/* 组 9047 */
.group_9047 {
  width: 164px;
  height: 78px;
  position: absolute;
  top: 140px;
  left: 8px;
}

/* 组 9255 */
.group_9255 {
  width: calc(100% - 0px);
  height: auto;
  position: absolute;
  top: 0;
  left: 0.5px;
  right: -0.5px;
  bottom: 0;
}

/* 养生收藏 */
.text_13 {
  width: 54px;
  position: absolute;
  top: 0;
  left: 12px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #333333;
  white-space: pre;
  height: 19px;
  margin-top: auto;
  margin-bottom: auto;
  bottom: 2px;
}

/* 组 9048 */
.group_9048 {
  width: 164px;
  height: 78px;
  position: absolute;
  top: 140px;
  left: auto;
  right: 8px;
}

/* 组 9256 */
.group_9256 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 关注商品 */
.text_14 {
  position: absolute;
  top: 0;
  left: 12px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #333333;
  white-space: pre;
  height: 19px;
  margin-top: auto;
  margin-bottom: auto;
  bottom: 2px;
}

/* 组 9049 */
.group_9049 {
  width: 164px;
  height: 78px;
  position: absolute;
  top: auto;
  left: 8px;
  bottom: 0;
}

/* 矩形 9978 */
.rectangle_9978 {
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  background: linear-gradient(115.44deg, #f1f6ff 0%, #e3eafe 100%);
  right: 0;
  bottom: 0;
}

/* 矩形 9979 */
.rectangle_9979 {
  width: 113px;
  height: auto;
  position: absolute;
  top: 0;
  left: auto;
  right: 1px;
  bottom: 0;
}

/* 矩形 9980 */
.rectangle_9980 {
  width: 93px;
  height: auto;
  position: absolute;
  top: 0;
  left: auto;
  right: 0;
  bottom: 0;
}

/* 全部功能 */
.text_15 {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 13px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 19px;
  color: #333333;
  white-space: pre;
  height: 19px;
  margin-top: -3.5px;
  margin-bottom: -3.5px;
}

/* 7x24小时 */
.text_16 {
  position: absolute;
  top: 36px;
  left: 12px;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #aca7c3;
  white-space: pre;
}

/* 一对一服务 */
.text_17 {
  position: absolute;
  top: auto;
  left: 12px;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #aca7c3;
  white-space: pre;
  bottom: 16px;
}

/* 其他信息功能 */
.div_2 {
  width: 56px;
  height: 56px;
  position: absolute;
  top: auto;
  left: 106px;
  bottom: 11px;
}

/* 设置 */
.text_18 {
  width: 24px;
  height: 16px;
  position: absolute;
  top: 19px;
  left: auto;
  text-align: center;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 350;
  line-height: 16px;
  color: #999999;
  white-space: pre;
  right: 28px;
}

/* 设置 */
.div_3 {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 21px;
  left: auto;
  right: 12px;
}

/* 组 9042 */
.group_9042 {
  width: 375px;
  position: absolute;
  top: 729px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* 组 9025 */
.group_9025 {
  width: 375px;
  height: 55px;
  position: relative;
  flex-shrink: 0;
}

/* 矩形 9684 */
.rectangle_9684 {
  width: auto;
  height: 49px;
  position: absolute;
  top: auto;
  left: 0;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: transparent;
  border-image: linear-gradient(180deg, #f5f5f5 0%, rgba(245, 245, 245, 0) 100%) 1;
  background-color: #ffffff;
  right: 0;
  bottom: 6px;
}

/* 组 9238 */
.group_9238 {
  width: 24px;
  position: absolute;
  top: 8px;
  left: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  line-height: 14.04px;
  color: #d85843;
  white-space: pre;
}

/* 首页 (4) */
.div_4 {
  width: 24px;
  height: 24px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 首页 */
.text_19 {
  flex-shrink: 0;
}

/* 组 9236 */
.group_9236 {
  width: 24px;
  position: absolute;
  top: 8px;
  left: 111px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  line-height: 14.04px;
  color: #c5cbd3;
  white-space: pre;
}

/* 养生 (1) */
.div_1_1 {
  width: 24px;
  height: 24px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 养生 */
.text_20 {
  flex-shrink: 0;
}

/* 组 9232 */
.group_9232 {
  width: 24px;
  position: absolute;
  top: 8px;
  left: 242px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  line-height: 14.04px;
  color: #c5cbd3;
  white-space: pre;
}

/* S_中医问诊 */
.s {
  width: 24px;
  height: 24px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 问诊 */
.text_21 {
  flex-shrink: 0;
}

/* 组 9234 */
.group_9234 {
  width: 24px;
  position: absolute;
  top: 8px;
  left: 176px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-family: 'HarmonyOS Sans SC';
  font-weight: 400;
  line-height: 14.04px;
  color: #c5cbd3;
  white-space: pre;
}

/* 169商城 */
.div_169 {
  width: 24px;
  height: 24px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
}

/* 商城 */
.text_22 {
  flex-shrink: 0;
}

/* 组 9233 */
.group_9233 {
  width: 24px;
  height: 47px;
  position: absolute;
  top: auto;
  left: 307px;
  bottom: 0;
}

/* 组 9024 */
.group_9024 {
  width: 375px;
  height: 34px;
  position: relative;
  flex-shrink: 0;
  margin-top: -6px;
}

/* 矩形 */
.rectangle {
  width: 100%;
  height: 34px;
  position: absolute;
  top: auto;
  left: 0%;
  background-color: #ffffff;
  right: 0%;
  bottom: 0;
}

/* 矩形 */
.rectangle_1 {
  width: 35.7333%;
  height: 5px;
  position: absolute;
  top: auto;
  left: 32.2667%;
  border-radius: 2.5px;
  background-color: #000000;
  right: 32%;
  bottom: 9px;
}

/* 组 9245 */
.group_9245 {
  width: auto;
  height: 172px;
  position: absolute;
  top: 0;
  left: 12px;
  right: 12px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* 矩形 */
.rectangle_2 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* GO */
.text_23 {
  position: absolute;
  top: 77px;
  left: 34px;
  text-align: center;
  font-size: 10px;
  font-family: 'PingFang SC';
  font-weight: normal;
  line-height: 14px;
  color: #ffffff;
  white-space: pre;
}

/* 组 9230 */
.group_9230 {
  width: 141px;
  height: 140px;
  position: absolute;
  top: 0;
  left: 28px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* 组 9252 */
.group_9252 {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 七月十五 */
.text_24 {
  position: absolute;
  top: 8px;
  left: 8px;
  text-align: center;
  font-size: 14px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 20px;
  color: #999999;
  white-space: pre;
}

/* 乙己蛇年 */
.text_25 {
  position: absolute;
  top: 28px;
  left: 8px;
  text-align: center;
  font-size: 14px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 20px;
  color: #999999;
  white-space: pre;
}

/* 矩形 11843 */
.rectangle_11843 {
  width: auto;
  height: 64px;
  position: absolute;
  top: auto;
  left: 8px;
  border-radius: 5px;
  background-color: #ffffff;
  right: 9px;
  bottom: 8px;
}

/* 09 / 06 */
.text_26 {
  position: absolute;
  top: auto;
  left: 21px;
  text-align: center;
  font-size: 30px;
  font-family: 'Source Han Sans';
  font-weight: 700;
  line-height: 44px;
  color: #286bab;
  white-space: pre;
  height: 44px;
  margin-top: -9.5px;
  margin-bottom: -9.5px;
  right: 24px;
  width: auto;
  bottom: 20px;
}

/* 2025 */
.text_27 {
  width: 36px;
  height: 15px;
  position: absolute;
  top: 72.5px;
  left: 15px;
  text-align: center;
  font-size: 12.5px;
  font-family: 'Source Han Sans';
  font-weight: 700;
  line-height: 15px;
  color: #286bab;
  white-space: pre;
}

/* 矩形 11858 */
.rectangle_11858 {
  width: 24px;
  height: 42px;
  position: absolute;
  top: 8px;
  left: auto;
  border-radius: 8px;
  background-color: rgba(40, 107, 171, 0.48);
  right: 11px;
}

/* 雨 水 */
.text_28 {
  position: absolute;
  top: 12px;
  left: auto;
  text-align: center;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 16.8px;
  color: #ffffff;
  right: 17px;
}

/* 组 9229 */
.group_9229 {
  width: 167px;
  height: 140px;
  position: absolute;
  top: 0;
  left: auto;
  right: 28px;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* 矩形 9966 */
.rectangle_9966 {
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background: linear-gradient(129.97deg, #fff1f2 0%, #fce3e1 100%), linear-gradient(0, #ffffff, #ffffff);
  right: 0;
  bottom: 0;
}

/* 体质状态： */
.text_29 {
  position: absolute;
  top: 12px;
  left: 8px;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 700;
  line-height: 100%;
  color: #ba7210;
  white-space: pre;
}

/* 矩形 9974 */
.rectangle_9974 {
  width: auto;
  height: 96px;
  position: absolute;
  top: auto;
  left: 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  right: 8px;
  bottom: 8px;
}

/* 气节养生建议：神仙粥 */
.text_30 {
  position: absolute;
  top: 41px;
  left: 17px;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 100%;
  color: #333333;
  white-space: pre;
  right: 30px;
  width: auto;
}

/* 组 9228 */
.group_9228 {
  width: 72px;
  height: 20px;
  position: absolute;
  top: 8px;
  left: auto;
  right: 19px;
}

/* 矩形 11012 */
.rectangle_11012 {
  width: 72px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

/* 平和体质 */
.text_31 {
  position: absolute;
  top: 4px;
  left: 16px;
  text-align: center;
  font-size: 10px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 12px;
  color: #ffffff;
  white-space: pre;
  right: 16px;
  width: auto;
  bottom: 4px;
  height: auto;
}

/* 糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。 */
.text_32 {
  width: 135px;
  position: absolute;
  top: 400px;
  left: 196px;
  text-align: justify;
  font-size: 12px;
  font-family: 'Source Han Sans';
  font-weight: 500;
  line-height: 20px;
  color: #ababab;
}
</style>
