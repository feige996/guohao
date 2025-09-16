<script setup lang="ts">
import { Solar } from 'lunar-javascript'
import { computed } from 'vue'

defineProps(['style'])

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
</script>

<template>
  <div class="relative h-[280rpx] w-[282rpx] flex flex-col items-start">
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
      <div class="relative isolate ml-[16rpx] mt-[36rpx] h-[128rpx] w-[248rpx] flex flex-col items-start rounded-[10rpx] bg-white">
        <span class="relative z-1 ml-[14rpx] mt-[9rpx] h-[30rpx] w-[72rpx] whitespace-pre text-center text-[25rpx] text-[#286bab] font-bold leading-[30rpx]">
          {{ dateInfo.year }}
        </span>
        <span class="relative z-0 ml-[20rpx] mt-[2rpx] h-[88rpx] whitespace-pre text-center text-[50rpx] text-[#286bab] font-bold leading-[88rpx] -mb-[19rpx]">
          {{ dateInfo.month }} / {{ dateInfo.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask-image {
  -webkit-mask-image: url('/static/images/homepage/date-card-bg.png');
  -webkit-mask-size: contain;
  mask-image: url('/static/images/homepage/date-card-bg.png');
  mask-size: contain;
}
</style>
