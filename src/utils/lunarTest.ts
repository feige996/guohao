import { Solar } from 'lunar-javascript'

// 测试 lunar-javascript 库的功能
export function testLunarLibrary() {
  const now = new Date()
  const solar = Solar.fromDate(now)
  const lunar = solar.getLunar()

  console.log('=== Lunar JavaScript 库测试 ===')
  console.log('当前日期:', now.toLocaleDateString())
  console.log('公历年:', solar.getYear())
  console.log('公历月:', solar.getMonth())
  console.log('公历日:', solar.getDay())
  console.log('农历月:', lunar.getMonthInChinese())
  console.log('农历日:', lunar.getDayInChinese())
  console.log('干支年:', lunar.getYearInGanZhi())
  console.log('生肖:', lunar.getYearShengXiao())
  console.log('节气:', lunar.getJieQi())
  console.log('=== 测试完成 ===')

  return {
    solar: {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay()
    },
    lunar: {
      month: lunar.getMonthInChinese(),
      day: lunar.getDayInChinese(),
      ganZhi: lunar.getYearInGanZhi(),
      shengXiao: lunar.getYearShengXiao(),
      jieQi: lunar.getJieQi()
    }
  }
}
