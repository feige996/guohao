<script lang="ts" setup>
defineProps({
  patient: {
    type: Object,
    default: () => ({
      id: 0,
      name: '',
      gender: '',
      avatar: '',
      type: '',
      disease: '',
      lastConsultDate: '',
      consultationTime: '',
    }),
  },
})
// 待诊患者数据
const waitingPatients = [
  {
    id: 1,
    name: '王军',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 2,
    name: '刘艳',
    gender: '女',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
  {
    id: 3,
    name: '陈泰来',
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=center',
    type: '复诊',
    disease: '2型糖尿病',
    lastConsultDate: '6月10日',
    consultationTime: '2025/02/11 14:32:21',
  },
]

// 动作按钮组
const ActionButtons = [
  {
    text: '图文问诊',
    color: 'bg-[#EA887F]',
    jumpPath: '/pages/diagnosis/chat/index',
  },
  {
    text: '健康档案',
    color: 'bg-[#F4D095]',
    jumpPath: '/pages/diagnosis/record/index',
  },
  {
    text: '发送提醒',
    color: 'bg-[#98B298]',
    jumpPath: '/pages/diagnosis/reminder/index',
  },
]

// 处理点击按钮
function handleClickItem(jumpPath: string, patientId: number) {
  uni.navigateTo({
    url: `${jumpPath}?id=${patientId}`,
  })
}
</script>

<template>
  <view class="flex gap-2">
    <image
      :src="patient.avatar"
      class="mr-3 h-10 w-10 rounded-full object-cover"
    />
    <view class="flex-1">
      <view class="flex items-center">
        <view>
          <view class="flex items-center text-sm">
            <text class="mr-2">{{ patient.name }}</text>
            <text class="font-700" :class="patient.gender === '男' ? 'text-[#00AAB2]' : 'text-[#ED5ACB]'">
              {{ patient.gender }}
            </text>
          </view>
          <view class="mt-1 flex items-center gap-1 text-xs">
            <text class="rounded bg-[#E7F0FF] px-3 py-1 text-[#69B0F7]">{{ patient.type }}</text>
            <text class="rounded bg-[#EFEDFA] px-3 py-1 text-[#9F80EF]">{{ patient.disease }}</text>
            <text class="rounded bg-[#FAEDED] px-3 py-1 text-[#EF8080]">上次问诊: {{ patient.lastConsultDate }}</text>
          </view>
        </view>
      </view>

      <view class="mt-2 text-xs text-gray-400">
        {{ patient.consultationTime }}
      </view>
    </view>
  </view>
</template>
