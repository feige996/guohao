<script setup lang="ts">
interface Doctor {
  id: string | number
  name: string
  avatar: string
  title: string
  hospital: string
  department: string
  isOnline?: boolean
  specialty?: string | string[]
  rating?: number
  consultations?: number
}

interface Props {
  doctor: Doctor
  showOnlineStatus?: boolean
  showSpecialty?: boolean
  showStats?: boolean
  clickable?: boolean
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  showOnlineStatus: false,
  showSpecialty: false,
  showStats: false,
  clickable: true,
  size: 'medium'
})

const emit = defineEmits<{
  click: [doctor: Doctor]
}>()

const avatarSize = computed(() => {
  return {
    small: 'w-100rpx h-100rpx',
    medium: 'w-120rpx h-120rpx',
    large: 'w-160rpx h-160rpx'
  }[props.size]
})

const specialtyText = computed(() => {
  if (!props.doctor.specialty) return ''
  if (Array.isArray(props.doctor.specialty)) {
    return props.doctor.specialty.join('、')
  }
  return props.doctor.specialty
})

function handleClick() {
  if (props.clickable) {
    emit('click', props.doctor)
  }
}
</script>

<template>
  <view 
    class="flex gap-24rpx"
    :class="{ 'cursor-pointer transition-all active:scale-98': clickable }"
    @tap="handleClick"
  >
    <!-- 医生头像 -->
    <view class="flex-shrink-0 relative">
      <image
        :src="doctor.avatar"
        :class="avatarSize"
        class="rounded-16rpx border-2rpx border-primary/10"
        mode="aspectFill"
      />
      <!-- 在线状态 -->
      <view
        v-if="showOnlineStatus && doctor.isOnline"
        class="absolute bottom-4rpx right-4rpx w-16rpx h-16rpx rounded-full bg-green-500 border-2rpx border-white"
      />
    </view>

    <!-- 医生信息 -->
    <view class="flex-1 flex flex-col gap-12rpx">
      <view class="flex items-center gap-16rpx">
        <text class="text-30rpx font-bold text-gray-800">{{ doctor.name }}</text>
        <view 
          v-if="showOnlineStatus && doctor.isOnline" 
          class="flex items-center gap-8rpx px-12rpx py-4rpx bg-green-500/12 rounded-full"
        >
          <view class="w-12rpx h-12rpx rounded-full bg-green-500" />
          <text class="text-20rpx text-green-500 font-semibold">在线</text>
        </view>
      </view>
      
      <text class="text-24rpx text-gray-500 font-medium">{{ doctor.title }}</text>
      <text class="text-22rpx text-gray-400">{{ doctor.hospital }} · {{ doctor.department }}</text>

      <!-- 擅长领域 -->
      <view v-if="showSpecialty && specialtyText" class="mt-6rpx">
        <text class="text-24rpx text-gray-600 leading-relaxed">{{ specialtyText }}</text>
      </view>

      <!-- 统计信息 -->
      <view v-if="showStats" class="flex items-center gap-16rpx mt-6rpx">
        <view v-if="doctor.rating" class="flex items-center gap-6rpx">
          <text class="text-26rpx">⭐</text>
          <text class="text-24rpx text-amber-500 font-semibold">{{ doctor.rating }}</text>
        </view>
        <view v-if="doctor.consultations" class="flex items-center gap-6rpx">
          <text class="text-24rpx text-gray-500">问诊量</text>
          <text class="text-24rpx text-primary font-semibold">{{ ((doctor.consultations || 0) / 10000).toFixed(1) }}万+</text>
        </view>
      </view>

      <!-- 自定义插槽 -->
      <slot name="extra" />
    </view>
  </view>
</template>
