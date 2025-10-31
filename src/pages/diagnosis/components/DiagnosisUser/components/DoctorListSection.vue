<script lang="ts" setup>
import { ref } from 'vue'

// 模拟医生数据
const doctor = ref({
  name: '陈广志',
  title: '主任医师',
  department: '内分泌科',
  hospital: '佛山中医院',
  rating: '100%',
  consultationCount: '56800',
  specialty: '长期从事内分泌、代谢性疾病的诊断和中西医结合治疗，在糖尿病等疾病...',
  avatar: '',
})
</script>

<template>
  <view class="rounded-lg bg-white px-6 py-4 shadow-md">
    <view class="flex items-center">
      <view class="flex-1">
        <view class="flex items-center gap-2">
          <text class="text-base text-[#333333]">{{ doctor.name }}</text>
          <text class="text-sm text-[#999999]">{{ doctor.title }}</text>
        </view>

        <view class="mt-1 flex gap-2 text-xs">
          <text class="rounded bg-[#E7F0FF] px-3 py-1 text-xs text-[#69B0F7]">{{ doctor.department }}</text>
          <text class="rounded bg-[#EFEDFA] px-3 py-1 text-xs text-[#9F80EF]">{{ doctor.hospital + doctor.title }}</text>
        </view>

        <view class="mt-1 flex items-center gap-6 text-xs">
          <view class="flex items-center">
            <text class="text-xs text-[#999999]">好评:</text>
            <text class="ml-1 text-[#FF6B6B] font-semibold">{{ doctor.rating }}</text>
          </view>
          <view class="flex items-center">
            <text class="text-xs text-[#999999]">接诊量:</text>
            <text class="ml-1 text-[#FF6B6B] font-semibold">{{ doctor.consultationCount }}</text>
          </view>
        </view>

        <view class="mt-2 text-xs text-[#89A2BE]" style="width: calc(100% - 20px);">
          <text style="display: block; text-align: justify;">擅长: {{ doctor.specialty }}</text>
        </view>
      </view>
      <image
        :src="doctor.avatar"
        class="h-24 w-20 rounded-md object-cover"
        default-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      />
    </view>
  </view>
</template>
