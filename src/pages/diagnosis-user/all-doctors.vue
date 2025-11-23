<script setup lang="ts">
import { departments, allDoctors as importedDoctors } from '@/data'
import SearchBar from './components/SearchBar.vue'

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '所有专家',
    navigationBarBackgroundColor: '#FFFFFF',
  },
})

// 搜索关键词
const searchKeyword = ref('')

// 选中的科室
const selectedDepartment = ref('')

// 所有专家数据（使用导入的数据）
const allDoctors = ref(importedDoctors.map(doctor => ({
  ...doctor,
  isOnline: true, // 默认在线
  specialty: doctor.introduction || doctor.specialty?.join('、') || '',
  rating: doctor.avgRatingScore || 4.8,
  consultations: doctor.consultationCount || 10000,
})))

// 筛选后的医生列表
const filteredDoctors = computed(() => {
  let doctors = allDoctors.value

  // 按科室筛选
  if (selectedDepartment.value) {
    doctors = doctors.filter(doctor => doctor.department === selectedDepartment.value)
  }

  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    doctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(keyword)
      || doctor.department.toLowerCase().includes(keyword)
      || doctor.specialty.toLowerCase().includes(keyword),
    )
  }

  return doctors
})

// 返回
function handleBack() {
  uni.navigateBack()
}

// 选择科室
function handleDepartmentChange(departmentId: string) {
  selectedDepartment.value = departmentId
}

// 跳转到医生详情
function handleDoctorClick(doctor: any) {
  uni.navigateTo({
    url: `/pages/doctor-detail?id=${doctor.id}`,
  })
}

// 搜索
function handleSearch() {
  // 搜索逻辑已通过computed实现
  console.log('搜索关键词:', searchKeyword.value)
}
</script>

<template>
  <view class="h-screen w-full flex flex-col bg-gray-50">
    <!-- 搜索栏 -->
    <SearchBar
      v-model="searchKeyword"
      placeholder="搜索医生姓名、科室或擅长"
      :show-button="false"
      @confirm="handleSearch"
    />

    <!-- 科室筛选 -->
    <view class="bg-white px-24rpx py-20rpx shadow-sm">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view class="flex gap-16rpx">
          <view
            v-for="dept in departments"
            :key="dept.id"
            class="flex-shrink-0 border border-gray-200 rounded-24rpx bg-gray-50 px-20rpx py-12rpx transition-all active:scale-95"
            :class="selectedDepartment === dept.id ? 'bg-red-50 border-primary' : ''"
            @tap="handleDepartmentChange(dept.id)"
          >
            <text
              class="text-24rpx font-medium"
              :class="selectedDepartment === dept.id ? 'text-primary font-semibold' : 'text-gray-500'"
            >
              {{ dept.label }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 医生列表 -->
    <scroll-view scroll-y class="min-h-0 flex-1">
      <view class="flex flex-col gap-16rpx p-24rpx">
        <view
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="w-full border border-gray-100 rounded-20rpx bg-white p-28rpx shadow-sm transition-all active:scale-98 active:shadow-md"
          @tap="handleDoctorClick(doctor)"
        >
          <view class="mb-20rpx flex gap-20rpx">
            <view class="relative flex-shrink-0">
              <image
                :src="doctor.avatar"
                class="block h-130rpx w-130rpx border-3rpx border-gray-50 rounded-full shadow-md"
                mode="aspectFill"
              />
              <view
                v-if="doctor.isOnline"
                class="absolute bottom-4rpx right-4rpx h-16rpx w-16rpx border-2rpx border-white rounded-full bg-green-500"
              />
            </view>
            <view class="flex flex-1 flex-col gap-12rpx">
              <view class="flex items-center justify-between gap-12rpx">
                <view class="flex items-center gap-12rpx">
                  <text class="text-36rpx text-gray-900 font-bold tracking-tight">{{ doctor.name }}</text>
                  <text class="text-26rpx text-gray-500 font-medium">{{ doctor.title }}</text>
                </view>
                <view class="flex flex-shrink-0 items-center gap-2rpx">
                  <text
                    v-for="star in 5"
                    :key="star"
                    class="text-26rpx leading-none"
                  >
                    ⭐
                  </text>
                </view>
              </view>
              <view class="mt-6rpx flex flex-wrap gap-8rpx">
                <view class="flex items-center justify-center border border-red-100 rounded-8rpx from-red-50 to-red-100 bg-gradient-to-br px-12rpx py-4rpx">
                  <text class="text-20rpx text-primary font-medium leading-tight">{{ doctor.department }}</text>
                </view>
                <view class="flex items-center justify-center border border-gray-200 rounded-8rpx from-gray-50 to-gray-100 bg-gradient-to-br px-12rpx py-4rpx">
                  <text class="text-20rpx text-gray-500 font-medium leading-tight">{{ doctor.hospital }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="w-full border border-gray-100 rounded-16rpx from-gray-50 to-gray-100 bg-gradient-to-br px-24rpx py-20rpx">
            <text class="text-24rpx text-gray-600 leading-relaxed">{{ doctor.specialty }}</text>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
