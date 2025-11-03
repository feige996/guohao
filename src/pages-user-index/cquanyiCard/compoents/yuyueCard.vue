<script setup lang="ts">
// 预约卡片组件的Props接口
interface Props {
  // 预约状态：confirmed(已确认) 或 completed(已完成)
  status: 'confirmed' | 'completed'
  // 医生姓名
  doctorName: string
  // 问诊方式：video(视频问诊) 或 voice(语音问诊)
  consultationType: 'video' | 'voice'
  // 预约日期，格式：YYYY-MM-DD
  appointmentDate: string
  // 预约时间，格式：HH:MM
  appointmentTime: string
  // 医生头像URL
  doctorAvatar?: string
}

// 定义组件Props
const props = withDefaults(defineProps<Props>(), {
  doctorAvatar: '/src/static/default-avatar.png'
})

// 定义组件事件
const emit = defineEmits<{
  // 取消预约事件
  cancel: []
  // 改签预约事件
  reschedule: []
  // 进入诊室事件
  enterConsultationRoom: []
}>()

// 获取问诊方式的中文文本
const getConsultationTypeText = (type: string): string => {
  return type === 'video' ? '视频问诊' : '语音问诊'
}

// 获取状态样式类
const getStatusClass = (): string => {
  return props.status === 'confirmed' 
    ? 'bg-green-500 text-white' 
    : 'bg-blue-500 text-white'
}

// 获取状态文本
const getStatusText = (): string => {
  return props.status === 'confirmed' ? '已确认' : '已完成'
}

// 获取幽灵按钮样式类
const getGhostButtonClass = (buttonType: 'cancel' | 'reschedule' | 'enter'): string => {
  // 已完成状态下所有按钮都应禁用
  if (props.status === 'completed') {
    return 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed'
  }
  
  // 已确认状态下按钮颜色不同（幽灵按钮样式）
  switch (buttonType) {
    case 'cancel':
      return 'border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300'
    case 'reschedule':
      return 'border-orange-400 text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300'
    case 'enter':
      return 'border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 transition-all duration-300'
    default:
      return 'border-gray-300 text-gray-500'
  }
}

// 按钮点击处理函数
const handleButtonClick = (buttonType: 'cancel' | 'reschedule' | 'enter'): void => {
  // 已完成状态下不触发事件
  if (props.status === 'completed') {
    return
  }
  
  switch (buttonType) {
    case 'cancel':
      emit('cancel')
      break
    case 'reschedule':
      emit('reschedule')
      break
    case 'enter':
      emit('enterConsultationRoom')
      break
  }
}
</script>

<template>
  <view class="rounded-lg bg-white shadow-md p-5 mb-4 border border-gray-100">
    <!-- 医生信息和状态 -->
    <div class="flex items-start justify-between mb-5">
      <div class="flex items-center">
        <image 
          :src="props.doctorAvatar" 
          class="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
          mode="aspectFill"
        />
        <div class="ml-4">
          <div class="font-medium text-gray-800 text-base">预约医师：{{ props.doctorName }}</div>
          <div class="text-sm text-gray-500 mt-1">问诊方式：{{ getConsultationTypeText(props.consultationType) }}</div>
          <div class="text-sm text-gray-500 mt-1">预约时间：{{ props.appointmentDate }} {{ props.appointmentTime }}</div>
        </div>
      </div>
      <div :class="['px-4 py-1.5 rounded-full text-sm font-medium', getStatusClass()]">
        {{ getStatusText() }}
      </div>
    </div>
    
    <!-- 操作按钮区域 - 使用幽灵按钮样式 -->
    <div class="flex justify-between mt-6">
      <button 
        :class="['flex-1 py-3 rounded-md text-center font-medium transition-all duration-200 mr-3 border', getGhostButtonClass('cancel')]"
        @click="handleButtonClick('cancel')"
      >
        取消
      </button>
      <button 
        :class="['flex-1 py-3 rounded-md text-center font-medium transition-all duration-200 mx-3 border', getGhostButtonClass('reschedule')]"
        @click="handleButtonClick('reschedule')"
      >
        改签
      </button>
      <button 
        :class="['flex-1 py-3 rounded-md text-center font-medium transition-all duration-200 ml-3 border', getGhostButtonClass('enter')]"
        @click="handleButtonClick('enter')"
      >
        进入诊室
      </button>
    </div>
  </view>
</template>