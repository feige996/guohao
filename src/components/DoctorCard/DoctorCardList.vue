<script setup lang="ts">
import type { DoctorCardConfig } from './types'
import DoctorCard from './DoctorCard.vue'

interface Props {
  doctors: DoctorCardConfig[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'doctor-click': [config: DoctorCardConfig]
}>()

function handleDoctorClick(config: DoctorCardConfig) {
  emit('doctor-click', config)
}
</script>

<template>
  <view class="w-full flex flex-col items-center">
    <view
      v-for="doctor in doctors"
      :key="doctor.id"
      class="mb-24rpx"
    >
      <DoctorCard
        :config="doctor"
        @click="handleDoctorClick"
      />
    </view>
  </view>
</template>
