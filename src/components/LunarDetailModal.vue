<script setup lang="ts">
import { computed } from 'vue'
import type { Solar, Lunar } from 'lunar-javascript'

interface Props {
  visible: boolean
  solar: Solar
  lunar: Lunar
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  'update:visible': [value: boolean]
}>()

// 完整农历信息
const fullLunarInfo = computed(() => {
  const lunarAny = props.lunar as any
  const dayYiList = lunarAny.getDayYi() || []
  const dayJiList = lunarAny.getDayJi() || []
  
  return {
    // 基本信息
    solarDate: `${props.solar.getYear()}年${props.solar.getMonth()}月${props.solar.getDay()}日`,
    lunarDate: `${lunarAny.getYearInChinese?.() || props.solar.getYear()}年${props.lunar.getMonthInChinese()}${props.lunar.getDayInChinese()}`,
    weekday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()],
    
    // 干支信息
    yearGanZhi: props.lunar.getYearInGanZhi(),
    monthGanZhi: lunarAny.getMonthInGanZhi?.() || '未知',
    dayGanZhi: lunarAny.getDayInGanZhi?.() || '未知',
    timeGanZhi: lunarAny.getTimeInGanZhi?.() || '未知',
    
    // 生肖
    yearShengXiao: props.lunar.getYearShengXiao(),
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

// 关闭弹窗
function closeModal() {
  emit('update:visible', false)
  emit('close')
}
</script>

<template>
  <!-- 农历详情弹窗 -->
  <wd-popup 
    :model-value="visible" 
    position="bottom" 
    :safe-area-inset-bottom="true"
    closable
    custom-style="height: 80vh; border-radius: 24rpx 24rpx 0 0; background: #f5f7f4;"
    @close="closeModal"
    @update:model-value="(val) => emit('update:visible', val)"
  >
    <!-- 弹窗头部 -->
    <div class="popup-header">
      <h2 class="popup-title">农历详情</h2>
    </div>

    <!-- 弹窗内容 -->
    <div class="popup-body">
      <!-- 基本日期信息 -->
      <div class="info-section">
        <h3 class="section-title">日期信息</h3>
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
        <h3 class="section-title">干支纪年</h3>
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
        <h3 class="section-title">每日宜忌</h3>
        <div class="yi-ji-container">
          <div class="yi-section">
            <h4 class="yi-ji-title yi-title">宜</h4>
            <div class="yi-ji-list">
              <span v-for="item in fullLunarInfo.dayYi" :key="item" class="yi-ji-item yi-item">{{ item }}</span>
              <span v-if="fullLunarInfo.dayYi.length === 0" class="yi-ji-item">无</span>
            </div>
          </div>
          <div class="ji-section">
            <h4 class="yi-ji-title ji-title">忌</h4>
            <div class="yi-ji-list">
              <span v-for="item in fullLunarInfo.dayJi" :key="item" class="yi-ji-item ji-item">{{ item }}</span>
              <span v-if="fullLunarInfo.dayJi.length === 0" class="yi-ji-item">无</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他信息 -->
      <div class="info-section">
        <h3 class="section-title">其他信息</h3>
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
        <h3 class="section-title">吉神方位</h3>
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
