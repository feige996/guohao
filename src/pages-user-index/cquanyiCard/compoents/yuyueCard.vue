<script setup lang="ts">
import { computed } from 'vue'

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
  doctorAvatar: '/src/static/default-avatar.png',
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

// 计算属性 - 状态标签配置
const statusConfig = computed(() => {
  if (props.status === 'confirmed') {
    return {
      text: '已确认',
      class: 'bg-[#2ec573] text-white',
    }
  }
  else if (props.status === 'completed') {
    return {
      text: '已完成',
      class: 'bg-[#1890ff] text-white',
    }
  }
  return {
    text: '',
    class: '',
  }
})

// 计算属性 - 问诊方式文本
const consultationTypeText = computed(() => {
  return props.consultationType === 'video' ? '视频问诊' : '语音问诊'
})

// 计算属性 - 是否已完成
const isCompleted = computed(() => {
  return props.status === 'completed'
})

// 计算属性 - 按钮颜色配置
const buttonConfigs = computed(() => ({
  cancel: { 
    color: isCompleted.value ? '#999999' : '#ff4d4f', 
    borderColor: isCompleted.value ? '#d9d9d9' : '#ff4d4f'
  },
  reschedule: { 
    color: isCompleted.value ? '#999999' : '#fa8c16', 
    borderColor: isCompleted.value ? '#d9d9d9' : '#fa8c16'
  },
  enter: { 
    color: isCompleted.value ? '#999999' : '#409eff', 
    borderColor: isCompleted.value ? '#d9d9d9' : '#409eff'
  },
}))

// 按钮点击处理函数
function handleButtonClick(buttonType: 'cancel' | 'reschedule' | 'enter'): void {
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
  <view class="mb-[24rpx] overflow-hidden border border-[#f0f0f0] rounded-[20rpx] bg-white">
    <!-- 卡片头部 -->
    <view class="flex items-center justify-between p-[24rpx]">
      <view>
        <text class="text-[#333333] font-medium text-[32rpx]">预约医师: {{ props.doctorName }}</text>
        <view class="mt-[8rpx]">
          <text class="text-[#666666] text-[26rpx]">问诊方式: {{ consultationTypeText }}</text>
        </view>
      </view>
      <view class="rounded-full px-[20rpx] py-[8rpx] font-medium text-[24rpx]" :class="statusConfig.class">
        {{ statusConfig.text }}
      </view>
    </view>

    <!-- 卡片内容 -->
    <view class="p-[24rpx]">
      <view class="flex items-center">
        <text class="text-[#666666] text-[28rpx]">预约时间: </text>
        <text class="text-[#333333] text-[28rpx]">{{ props.appointmentDate }} {{ props.appointmentTime }}</text>
      </view>
    </view>

    <!-- 卡片底部操作 -->
    <view class="flex justify-end p-[24rpx]">
      <wot-button
        :disabled="isCompleted"
        :style="{
          color: buttonConfigs.cancel.color,
          border: `1px solid ${buttonConfigs.cancel.borderColor}`,
          backgroundColor: 'transparent',
          borderRadius: '9999rpx',
          padding: '20rpx 36rpx'
        }"
        class="mr-[40rpx]"
        @click="handleButtonClick('cancel')"
      >
        取消
      </wot-button>
      <wot-button
        :disabled="isCompleted"
        :style="{
          color: buttonConfigs.reschedule.color,
          border: `1px solid ${buttonConfigs.reschedule.borderColor}`,
          backgroundColor: 'transparent',
          borderRadius: '9999rpx',
          padding: '20rpx 36rpx'
        }"
        class="mr-[40rpx]"
        @click="handleButtonClick('reschedule')"
      >
        改签
      </wot-button>
      <wot-button
        :disabled="isCompleted"
        :style="{
          color: buttonConfigs.enter.color,
          border: `1px solid ${buttonConfigs.enter.borderColor}`,
          backgroundColor: 'transparent',
          borderRadius: '9999rpx',
          padding: '20rpx 36rpx'
        }"
        @click="handleButtonClick('enter')"
      >
        进入诊室
      </wot-button>
    </view>
  </view>
</template>
