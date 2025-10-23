<script lang="ts" setup>
import { ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '服务与排诊设置',
  },
})

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 模拟当前月份
const currentMonth = ref('2025年6月')
// 模拟选中日期
const selectedDate = ref('2025年6月2日（星期一）')

// 模拟价格设置
const prices = ref({
  textConsult: '39',
  voiceConsult: '59',
  videoConsult: '89'
})

// 模拟排诊时间段
const timeSlots = ref({
  morning: '08:30 - 12:30',
  afternoon: '14:00 - 18:30'
})

// 是否允许拨打电话
const allowPhoneCall = ref(true)

// 切换月份
function changeMonth(direction: 'prev' | 'next') {
  console.log(`切换月份: ${direction}`)
  // 这里可以实现月份切换逻辑
}

// 编辑时间段
function editTimeSlot() {
  console.log('编辑时间段')
  // 这里可以实现编辑时间段的逻辑
}

// 保存设置
function saveSettings() {
  console.log('保存设置')
  console.log('价格设置:', prices.value)
  console.log('允许拨打电话:', allowPhoneCall.value)
  
  // 显示保存成功提示
  uni.showToast({
    title: '保存成功',
    icon: 'success',
    duration: 2000
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 返回栏 -->
    <view class="bg-white flex items-center px-4 py-3 border-b border-gray-200">
      <view class="h-10 w-10 flex items-center justify-center" @click="navigateBack">
        <text class="text-lg">←</text>
      </view>
      <view class="flex-1 text-center">
        <text class="text-lg font-medium">服务与排诊设置</text>
      </view>
      <view class="h-10 w-10"></view>
    </view>

    <!-- 月排诊计划 -->
    <view class="mt-3 bg-white p-4">
      <view class="text-base font-medium mb-3">月排诊计划</view>
      
      <!-- 月份切换 -->
      <view class="flex items-center justify-between mb-4">
        <text class="text-lg" @click="changeMonth('prev')">◀</text>
        <text class="text-base font-medium">{{ currentMonth }}</text>
        <text class="text-lg" @click="changeMonth('next')">▶</text>
      </view>

      <!-- 日历 -->
      <view class="border border-gray-200 rounded-lg p-2">
        <!-- 星期标题 -->
        <view class="grid grid-cols-7 mb-2">
          <view class="text-center text-sm text-gray-500">日</view>
          <view class="text-center text-sm text-gray-500">一</view>
          <view class="text-center text-sm text-gray-500">二</view>
          <view class="text-center text-sm text-gray-500">三</view>
          <view class="text-center text-sm text-gray-500">四</view>
          <view class="text-center text-sm text-gray-500">五</view>
          <view class="text-center text-sm text-gray-500">六</view>
        </view>

        <!-- 日期网格 -->
        <view class="grid grid-cols-7 gap-1">
          <!-- 上个月的日期 -->
          <view class="text-center py-2 text-gray-300">26</view>
          <view class="text-center py-2 text-gray-300">27</view>
          <view class="text-center py-2 text-gray-300">28</view>
          <view class="text-center py-2 text-gray-300">29</view>
          <view class="text-center py-2 text-gray-300">30</view>
          <view class="text-center py-2 text-gray-300">31</view>
          
          <!-- 本月的日期 -->
          <view class="text-center py-2">1</view>
          <view class="text-center py-2 bg-orange-500 text-white rounded-full">2</view>
          <view class="text-center py-2">3</view>
          <view class="text-center py-2">4</view>
          <view class="text-center py-2">5</view>
          <view class="text-center py-2">6</view>
          <view class="text-center py-2">7</view>
          <view class="text-center py-2">8</view>
          <view class="text-center py-2">9</view>
          <view class="text-center py-2">10</view>
          <view class="text-center py-2">11</view>
          <view class="text-center py-2">12</view>
          <view class="text-center py-2">13</view>
          <view class="text-center py-2">14</view>
          <view class="text-center py-2">15</view>
          <view class="text-center py-2">16</view>
          <view class="text-center py-2">17</view>
          <view class="text-center py-2">18</view>
          <view class="text-center py-2">19</view>
          <view class="text-center py-2">20</view>
          <view class="text-center py-2">21</view>
          <view class="text-center py-2">22</view>
          <view class="text-center py-2">23</view>
          <view class="text-center py-2">24</view>
          <view class="text-center py-2">25</view>
          <view class="text-center py-2">26</view>
          <view class="text-center py-2">27</view>
          <view class="text-center py-2">28</view>
          <view class="text-center py-2">29</view>
          <view class="text-center py-2">30</view>
          
          <!-- 下个月的日期 -->
          <view class="text-center py-2 text-gray-300">1</view>
          <view class="text-center py-2 text-gray-300">2</view>
          <view class="text-center py-2 text-gray-300">3</view>
          <view class="text-center py-2 text-gray-300">4</view>
          <view class="text-center py-2 text-gray-300">5</view>
        </view>
      </view>

      <!-- 选中日期信息 -->
      <view class="mt-4">
        <view class="text-base mb-2">{{ selectedDate }}</view>
        <view class="flex justify-between items-center mb-2">
          <text>上午排诊</text>
          <text class="text-green-500">排诊</text>
        </view>
        <view class="flex justify-between items-center mb-4">
          <text>{{ timeSlots.morning }}</text>
          <text class="text-red-500">取消排诊</text>
        </view>
        <view class="flex justify-between items-center mb-2">
          <text>下午排诊</text>
          <text class="text-red-500">取消排诊</text>
        </view>
        <view class="flex justify-between items-center mb-4">
          <text>{{ timeSlots.afternoon }}</text>
          <text class="text-green-500">排诊</text>
        </view>
        
        <!-- 编辑时间段 -->
        <view class="flex items-center text-blue-500 mb-2">
          <text>⏰</text>
          <text @click="editTimeSlot" class="ml-1">编辑时间段</text>
        </view>
      </view>
    </view>

    <!-- 收费设置 -->
    <view class="mt-3 bg-white p-4">
      <view class="text-base font-medium mb-3">收费设置:</view>
      
      <view class="flex justify-between items-center border-b border-gray-100 py-3">
        <text>图文问诊:</text>
        <view class="flex items-center">
          <text class="mr-2">¥</text>
          <input 
            v-model="prices.textConsult" 
            class="w-16 text-right border-none outline-none" 
            type="number"
          />
          <text class="ml-4 text-gray-500">24小时内不限次</text>
        </view>
      </view>
      
      <view class="flex justify-between items-center border-b border-gray-100 py-3">
        <text>语音问诊:</text>
        <view class="flex items-center">
          <text class="mr-2">¥</text>
          <input 
            v-model="prices.voiceConsult" 
            class="w-16 text-right border-none outline-none" 
            type="number"
          />
          <text class="ml-4 text-gray-500">不超过30分钟</text>
        </view>
      </view>
      
      <view class="flex justify-between items-center py-3">
        <text>视频问诊:</text>
        <view class="flex items-center">
          <text class="mr-2">¥</text>
          <input 
            v-model="prices.videoConsult" 
            class="w-16 text-right border-none outline-none" 
            type="number"
          />
          <text class="ml-4 text-gray-500">不超过30分钟</text>
        </view>
      </view>
    </view>

    <!-- 服务设置 -->
    <view class="mt-3 bg-white p-4">
      <view class="text-base font-medium mb-3">服务设置:</view>
      
      <view class="flex justify-between items-center py-3">
        <text>允许患者拨打医师虚拟手机号码:</text>
        <view class="h-6 w-6 border border-gray-300 rounded flex items-center justify-center" :class="allowPhoneCall ? 'bg-green-500' : ''">
          <text v-if="allowPhoneCall" class="text-white text-xs">✓</text>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="p-4 mt-6">
      <button 
        @click="saveSettings"
        class="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
      >
        保存
      </button>
    </view>
  </view>
</template>