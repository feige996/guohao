<script setup lang="ts">
import { departments, allDoctors as importedDoctors, getDoctorsByDepartment } from '@/data'
import PageHeader from '@/components/PageHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import DoctorCard from '@/components/DoctorCard.vue'

definePage({
  style: {
    navigationBarTitleText: "所有专家",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

// 搜索关键词
const searchKeyword = ref("");

// 选中的科室
const selectedDepartment = ref("");

// 所有专家数据（使用导入的数据）
const allDoctors = ref(importedDoctors.map(doctor => ({
  ...doctor,
  isOnline: true, // 默认在线
  specialty: doctor.introduction || doctor.specialty?.join('、') || '',
  rating: doctor.avgRatingScore || 4.8,
  consultations: doctor.consultationCount || 10000
})));

// 筛选后的医生列表
const filteredDoctors = computed(() => {
  let doctors = allDoctors.value;

  // 按科室筛选
  if (selectedDepartment.value) {
    doctors = doctors.filter(doctor => doctor.department === selectedDepartment.value);
  }

  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase();
    doctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(keyword) ||
      doctor.department.toLowerCase().includes(keyword) ||
      doctor.specialty.toLowerCase().includes(keyword)
    );
  }

  return doctors;
});

// 返回
function handleBack() {
  uni.navigateBack();
}

// 选择科室
function handleDepartmentChange(departmentId: string) {
  selectedDepartment.value = departmentId;
}

// 跳转到医生详情
function handleDoctorClick(doctor: any) {
  uni.navigateTo({
    url: `/pages/doctor-detail?id=${doctor.id}`,
  });
}

// 搜索
function handleSearch() {
  // 搜索逻辑已通过computed实现
  console.log("搜索关键词:", searchKeyword.value);
}
</script>

<template>
  <view class="w-full h-screen bg-gray-50 flex flex-col">
    <!-- 页头 -->
    <PageHeader title="所有专家" @back="handleBack" />

    <!-- 搜索栏 -->
    <SearchBar
      v-model="searchKeyword"
      placeholder="搜索医生姓名、科室或擅长"
      :show-button="false"
      @confirm="handleSearch"
    />

    <!-- 科室筛选 -->
    <view class="px-24rpx py-20rpx bg-white shadow-sm">
      <scroll-view scroll-x class="whitespace-nowrap">
        <view class="flex gap-16rpx">
          <view
            v-for="dept in departments"
            :key="dept.id"
            class="flex-shrink-0 px-20rpx py-12rpx rounded-24rpx bg-gray-50 border border-gray-200 transition-all active:scale-95"
            :class="selectedDepartment === dept.id ? 'bg-red-50 border-primary' : ''"
            @tap="handleDepartmentChange(dept.id)"
          >
            <text 
              class="text-24rpx font-medium"
              :class="selectedDepartment === dept.id ? 'text-primary font-semibold' : 'text-gray-500'"
            >{{ dept.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 医生列表 -->
    <scroll-view scroll-y class="flex-1 min-h-0">
      <view class="p-24rpx flex flex-col gap-16rpx">
        <view
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="w-full p-28rpx bg-white rounded-20rpx shadow-sm transition-all active:scale-98 active:shadow-md border border-gray-100"
          @tap="handleDoctorClick(doctor)"
        >
          <view class="flex gap-20rpx mb-20rpx">
            <view class="flex-shrink-0 relative">
              <image
                :src="doctor.avatar"
                class="w-130rpx h-130rpx rounded-full block border-3rpx border-gray-50 shadow-md"
                mode="aspectFill"
              />
              <view
                v-if="doctor.isOnline"
                class="absolute bottom-4rpx right-4rpx w-16rpx h-16rpx rounded-full bg-green-500 border-2rpx border-white"
              />
            </view>
            <view class="flex-1 flex flex-col gap-12rpx">
              <view class="flex items-center justify-between gap-12rpx">
                <view class="flex items-center gap-12rpx">
                  <text class="text-36rpx font-bold text-gray-900 tracking-tight">{{ doctor.name }}</text>
                  <text class="text-26rpx text-gray-500 font-medium">{{ doctor.title }}</text>
                </view>
                <view class="flex items-center gap-2rpx flex-shrink-0">
                  <text
                    v-for="star in 5"
                    :key="star"
                    class="text-26rpx leading-none"
                  >⭐</text>
                </view>
              </view>
              <view class="flex gap-8rpx flex-wrap mt-6rpx">
                <view class="px-12rpx py-4rpx rounded-8rpx bg-gradient-to-br from-red-50 to-red-100 border border-red-100 flex items-center justify-center">
                  <text class="text-primary text-20rpx font-medium leading-tight">{{ doctor.department }}</text>
                </view>
                <view class="px-12rpx py-4rpx rounded-8rpx bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center">
                  <text class="text-gray-500 text-20rpx font-medium leading-tight">{{ doctor.hospital }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="w-full px-24rpx py-20rpx bg-gradient-to-br from-gray-50 to-gray-100 rounded-16rpx border border-gray-100">
            <text class="text-24rpx text-gray-600 leading-relaxed">{{ doctor.specialty }}</text>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
