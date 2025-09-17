<script setup lang="ts">
import { Solar } from 'lunar-javascript'
import { computed, ref } from 'vue'

defineProps(['style'])

// 弹窗控制
const showModal = ref(false)

// 获取当前日期
const now = new Date()
const solar = Solar.fromDate(now)
const lunar = solar.getLunar()

// 计算显示的数据
const dateInfo = computed(() => {
  // 公历日期
  const year = solar.getYear()
  const month = String(solar.getMonth()).padStart(2, '0')
  const day = String(solar.getDay()).padStart(2, '0')

  // 农历日期
  const lunarMonth = lunar.getMonthInChinese()
  const lunarDay = lunar.getDayInChinese()

  // 生肖年
  const yearInGanZhi = lunar.getYearInGanZhi()
  const yearShengXiao = lunar.getYearShengXiao()

  // 每日宜忌中的第一个
  const dayYiList = (lunar as any).getDayYi()
  const jieQi = dayYiList && dayYiList.length > 0 ? dayYiList[0] : '立春'
  // console.log('每日宜忌第一个:', jieQi)

  // 格式化节气显示（如果是两个字，中间加换行）
  const formatJieQi = (jq: string) => {
    if (!jq)
      return '立春'
    if (jq.length === 2) {
      return `${jq.charAt(0)}<br>${jq.charAt(1)}`
    }
    return jq
  }

  return {
    year,
    month,
    day,
    lunarDate: `${lunarMonth}${lunarDay}`,
    ganZhiYear: `${yearInGanZhi}${yearShengXiao}年`,
    jieQi: formatJieQi(jieQi || '立春'),
  }
})

// 完整农历信息
const fullLunarInfo = computed(() => {
  const lunarAny = lunar as any
  const dayYiList = lunarAny.getDayYi() || []
  const dayJiList = lunarAny.getDayJi() || []

  return {
    // 基本信息
    solarDate: `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`,
    lunarDate: `${lunarAny.getYearInChinese?.() || solar.getYear()}年${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`,
    weekday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()],

    // 干支信息
    yearGanZhi: lunar.getYearInGanZhi(),
    monthGanZhi: lunarAny.getMonthInGanZhi?.() || '未知',
    dayGanZhi: lunarAny.getDayInGanZhi?.() || '未知',
    timeGanZhi: lunarAny.getTimeInGanZhi?.() || '未知',

    // 生肖
    yearShengXiao: lunar.getYearShengXiao(),
    monthShengXiao: lunarAny.getMonthShengXiao?.() || '未知',
    dayShengXiao: lunarAny.getDayShengXiao?.() || '未知',
    timeShengXiao: lunarAny.getTimeShengXiao?.() || '未知',

    // 节气
    jieQi: lunarAny.getJieQi?.() || '无',

    // 宜忌
    dayYi: dayYiList.slice(0, 8), // 取前8个
    dayJi: dayJiList.slice(0, 8), // 取前8个

    // 其他信息
    naYin: lunarAny.getDayNaYin?.() || '未知',
    chong: lunarAny.getDayChong?.() || '无',
    sha: lunarAny.getDaySha?.() || '无',

    // 神煞
    pengZu: `${lunarAny.getPengZuGan?.() || ''} ${lunarAny.getPengZuZhi?.() || ''}`.trim() || '无',

    // 方位
    xiShen: lunarAny.getDayPositionXiDesc?.() || '未知',
    fuShen: lunarAny.getDayPositionFuDesc?.() || '未知',
    caiShen: lunarAny.getDayPositionCaiDesc?.() || '未知',
    yangGui: lunarAny.getDayPositionYangGuiDesc?.() || '未知',
    yinGui: lunarAny.getDayPositionYinGuiDesc?.() || '未知',
  }
})

// 打开弹窗
function openModal() {
  showModal.value = true
}

// 关闭弹窗
function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div class="relative h-[280rpx] w-[282rpx] flex flex-col cursor-pointer items-start" @click="openModal">
    <img
      class="relative ml-[1rpx] mt-0 h-[280rpx] w-[280rpx]"
      src="/static/images/homepage/date-card-bg.png"
    >
    <div class="relative ml-0 h-[280rpx] w-[280rpx] flex flex-col items-start -mt-[280rpx]">
      <div class="mask-image relative ml-0 mt-0 h-[280rpx] w-[280rpx] flex flex-col items-start overflow-hidden rounded-[20rpx]">
        <img
          class="absolute left-[82rpx] top-1/2 h-[198rpx] w-[198rpx] -mt-[20rpx]"
          src="/static/images/homepage/date-card-content.png"
        >
      </div>
      <div class="relative ml-[16rpx] h-[84rpx] w-[244rpx] flex flex-row items-start -mt-[264rpx]">
        <div class="relative ml-0 mt-0 h-[80rpx] w-[112rpx] flex flex-col items-start">
          <span class="relative ml-0 mt-0 whitespace-pre text-center text-[28rpx] text-[#999999] font-medium leading-[40rpx]">
            {{ dateInfo.lunarDate }}
          </span>
          <span class="relative ml-0 mt-0 whitespace-pre text-center text-[28rpx] text-[#999999] font-medium leading-[40rpx]">
            {{ dateInfo.ganZhiYear }}
          </span>
        </div>
        <div class="relative ml-[84rpx] mt-0 h-[84rpx] w-[48rpx] flex flex-col items-start rounded-[16rpx] bg-[rgba(40,107,171,0.48)] text-center text-[24rpx] text-white font-medium leading-[33.6rpx]">
          <span
            class="relative ml-[12rpx] mt-[8rpx]"
            v-html="dateInfo.jieQi"
          />
        </div>
      </div>
      <div class="relative ml-[16rpx] mt-[36rpx] h-[128rpx] w-[248rpx] flex flex-col items-start rounded-[10rpx] bg-white">
        <span class="relative z-1 ml-[14rpx] mt-[9rpx] h-[30rpx] w-[72rpx] whitespace-pre text-center text-[25rpx] text-[#286bab] font-bold leading-[30rpx]">
          {{ dateInfo.year }}
        </span>
        <span class="relative z-0 ml-[20rpx] mt-[2rpx] h-[88rpx] whitespace-pre text-center text-[50rpx] text-[#286bab] font-bold leading-[88rpx] -mb-[19rpx]">
          {{ dateInfo.month }} / {{ dateInfo.day }}
        </span>
      </div>
    </div>
  </div>

  <!-- 农历详情弹窗 -->
  <wd-popup
    v-model="showModal"
    position="bottom"
    :safe-area-inset-bottom="true"
    closable
    custom-style="height: 80vh; border-radius: 24rpx 24rpx 0 0; background: #f5f7f4;"
    @close="closeModal"
  >
    <!-- 弹窗头部 -->
    <div class="popup-header">
      <h2 class="popup-title">
        农历详情
      </h2>
    </div>

    <!-- 弹窗内容 -->
    <div class="popup-body">
      <!-- 基本日期信息 -->
      <div class="info-section">
        <h3 class="section-title">
          日期信息
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">公历：</span>
            <span class="value">{{ fullLunarInfo.solarDate }} {{ fullLunarInfo.weekday }}</span>
          </div>
          <div class="info-item">
            <span class="label">农历：</span>
            <span class="value">{{ fullLunarInfo.lunarDate }}</span>
          </div>
          <div class="info-item">
            <span class="label">节气：</span>
            <span class="value">{{ fullLunarInfo.jieQi }}</span>
          </div>
        </div>
      </div>

      <!-- 干支信息 -->
      <div class="info-section">
        <h3 class="section-title">
          干支纪年
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">年柱：</span>
            <span class="value">{{ fullLunarInfo.yearGanZhi }}{{ fullLunarInfo.yearShengXiao }}</span>
          </div>
          <div class="info-item">
            <span class="label">月柱：</span>
            <span class="value">{{ fullLunarInfo.monthGanZhi }}{{ fullLunarInfo.monthShengXiao }}</span>
          </div>
          <div class="info-item">
            <span class="label">日柱：</span>
            <span class="value">{{ fullLunarInfo.dayGanZhi }}{{ fullLunarInfo.dayShengXiao }}</span>
          </div>
          <div class="info-item">
            <span class="label">时柱：</span>
            <span class="value">{{ fullLunarInfo.timeGanZhi }}{{ fullLunarInfo.timeShengXiao }}</span>
          </div>
        </div>
      </div>

      <!-- 宜忌信息 -->
      <div class="info-section">
        <h3 class="section-title">
          每日宜忌
        </h3>
        <div class="yi-ji-container">
          <div class="yi-section">
            <h4 class="yi-ji-title yi-title">
              宜
            </h4>
            <div class="yi-ji-list">
              <span v-for="item in fullLunarInfo.dayYi" :key="item" class="yi-ji-item yi-item">{{ item }}</span>
              <span v-if="fullLunarInfo.dayYi.length === 0" class="yi-ji-item">无</span>
            </div>
          </div>
          <div class="ji-section">
            <h4 class="yi-ji-title ji-title">
              忌
            </h4>
            <div class="yi-ji-list">
              <span v-for="item in fullLunarInfo.dayJi" :key="item" class="yi-ji-item ji-item">{{ item }}</span>
              <span v-if="fullLunarInfo.dayJi.length === 0" class="yi-ji-item">无</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他信息 -->
      <div class="info-section">
        <h3 class="section-title">
          其他信息
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">纳音：</span>
            <span class="value">{{ fullLunarInfo.naYin }}</span>
          </div>
          <div class="info-item">
            <span class="label">冲煞：</span>
            <span class="value">{{ fullLunarInfo.chong }} {{ fullLunarInfo.sha }}</span>
          </div>
          <div class="info-item">
            <span class="label">彭祖百忌：</span>
            <span class="value">{{ fullLunarInfo.pengZu }}</span>
          </div>
        </div>
      </div>

      <!-- 方位信息 -->
      <div class="info-section">
        <h3 class="section-title">
          吉神方位
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">喜神：</span>
            <span class="value">{{ fullLunarInfo.xiShen }}</span>
          </div>
          <div class="info-item">
            <span class="label">福神：</span>
            <span class="value">{{ fullLunarInfo.fuShen }}</span>
          </div>
          <div class="info-item">
            <span class="label">财神：</span>
            <span class="value">{{ fullLunarInfo.caiShen }}</span>
          </div>
          <div class="info-item">
            <span class="label">阳贵：</span>
            <span class="value">{{ fullLunarInfo.yangGui }}</span>
          </div>
          <div class="info-item">
            <span class="label">阴贵：</span>
            <span class="value">{{ fullLunarInfo.yinGui }}</span>
          </div>
        </div>
      </div>
    </div>
  </wd-popup>
</template>

<style scoped>
.mask-image {
  -webkit-mask-image: url('/static/images/homepage/date-card-bg.png');
  -webkit-mask-size: contain;
  mask-image: url('/static/images/homepage/date-card-bg.png');
  mask-size: contain;
}

/* Wot UI 弹窗样式 - 与主页面风格一致 */
.popup-header {
  padding: 32rpx 40rpx 24rpx;
  border-bottom: 2rpx solid #e5e7e9;
  background: linear-gradient(135deg, #f6e2d3 0%, #f1d4c0 100%);
  color: #ba7210;
  text-align: center;
  border-radius: 24rpx 24rpx 0 0;
}

.popup-title {
  font-size: 36rpx;
  font-weight: 600;
  margin: 0;
}

.popup-body {
  padding: 40rpx;
  max-height: calc(80vh - 120rpx);
  overflow-y: auto;
  background: #f5f7f4;
}

.info-section {
  margin-bottom: 32rpx;
  background: white;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #ba7210;
  margin: 0 0 24rpx 0;
  padding-bottom: 16rpx;
  border-bottom: 3rpx solid #f6e2d3;
  display: inline-block;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 20rpx;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
}

.label {
  font-size: 28rpx;
  font-weight: 500;
  color: #999999;
  min-width: 120rpx;
  flex-shrink: 0;
}

.value {
  font-size: 28rpx;
  color: #333333;
  font-weight: 400;
}

/* 宜忌样式 */
.yi-ji-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}

.yi-section,
.ji-section {
  border-radius: 12rpx;
  padding: 24rpx;
}

.yi-section {
  background: linear-gradient(135deg, #f1f6ff 0%, #e3eafe 100%);
}

.ji-section {
  background: linear-gradient(135deg, #fff1f2 0%, #fce3e1 100%);
}

.yi-ji-title {
  font-size: 28rpx;
  font-weight: 600;
  margin: 0 0 16rpx 0;
  text-align: center;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

.yi-title {
  background: rgba(255, 255, 255, 0.8);
  color: #ba7210;
}

.ji-title {
  background: rgba(255, 255, 255, 0.8);
  color: #ba7210;
}

.yi-ji-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.yi-ji-item {
  font-size: 24rpx;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.9);
  border: 2rpx solid rgba(186, 114, 16, 0.2);
  transition: all 0.2s;
  color: #333333;
}

.yi-item {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(186, 114, 16, 0.3);
}

.ji-item {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(186, 114, 16, 0.3);
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .modal-content {
    width: 95vw;
    max-height: 85vh;
  }

  .modal-header {
    padding: 24rpx 32rpx;
  }

  .modal-title {
    font-size: 32rpx;
  }

  .modal-body {
    padding: 32rpx 24rpx;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .yi-ji-container {
    grid-template-columns: 1fr;
    gap: 24rpx;
  }

  .section-title {
    font-size: 28rpx;
  }

  .label,
  .value {
    font-size: 26rpx;
  }
}
</style>
