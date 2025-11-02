<script setup lang="ts">
// 在线问诊组件
import type { DoctorCardConfig } from '@/components/DoctorCard'
import { ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '在线问诊',
  },
})

// 搜索关键词
const searchKeyword = ref('')

// 筛选条件
const activeFilters = ref({
  department: '全部',
  condition: '全部',
  price: '全部',
  experience: '全部',
  therapy: '全部',
})

// 模拟医生数据
const doctors = ref<DoctorCardConfig[]>([
  {
    id: '1',
    name: '柴德建',
    title: '主治医师',
    department: ['中医全科', '中医内科'],
    hospital: '天津中医药大学附属医院',
    consultationCount: 1234,
    rating: 99.1,
    specialty: '毕业于天津中医药大学，师从天津中医药大学田霸教授，既往从事中医临床工作十余年',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: '2',
    name: '李新民',
    title: '副主任医师',
    department: ['中医内科', '高血压'],
    hospital: '仁心医院',
    consultationCount: 818,
    rating: 99.5,
    specialty: '汉族，中共党员，仁心医院副院长，毕业于中国人民解放军第一军医大学',
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: '3',
    name: '韩国刚',
    title: '主任医师',
    department: ['冠心病', '中医全科'],
    hospital: '国浩中医医院',
    consultationCount: 937,
    rating: 99.1,
    specialty: '从事中医临床工作20余年，擅长治疗各类心血管疾病，尤其在冠心病领域有深入研究',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=center',
  },
])

// 筛选选项数据
const filterOptions = {
  department: ['全部', '内科', '外科', '妇科', '儿科', '中医科', '康复科'],
  condition: ['全部', '高血压', '糖尿病', '冠心病', '感冒', '胃炎', '关节炎'],
  price: ['全部', '100元以下', '100-200元', '200-500元', '500元以上'],
  experience: ['全部', '5年以下', '5-10年', '10-20年', '20年以上'],
  therapy: ['全部', '中药调理', '针灸推拿', '中西医结合', '艾灸疗法'],
}

// 处理搜索
function handleSearch() {
  console.log('搜索医生:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

// 处理筛选
function handleFilter(type: string, value: string) {
  activeFilters.value[type as keyof typeof activeFilters.value] = value
  console.log('筛选条件:', type, value)
  // 这里可以添加筛选逻辑
}

// 处理医生卡片点击
function handleDoctorClick(doctor: DoctorCardConfig) {
  console.log('点击医生:', doctor.name)
  // 这里可以添加跳转到医生详情页的逻辑
  uni.showToast({
    title: `点击了${doctor.name}医生`,
    icon: 'none',
  })
}

// 处理咨询按钮点击
function handleConsultClick(doctorId: string) {
  console.log('立即咨询:', doctorId)
  // 跳转到问诊预约页面
  uni.navigateTo({
    url: `/pages-normal/wenzhenCard/online-consultation/appointment?id=${doctorId}`,
    success: () => console.log('跳转问诊预约页面成功'),
    fail: (err) => console.error('跳转问诊预约页面失败:', err)
  })
}

// 关闭弹窗
function handleClose() {
  console.log('关闭在线问诊弹窗')
  // 这里可以添加关闭弹窗的逻辑
  uni.navigateBack()
}

// 辅助函数
function getFilterLabel(type: string): string {
  const labels: Record<string, string> = {
    department: '按科室',
    condition: '按疾病',
    price: '按评价',
    experience: '从医年限',
    therapy: '擅长疗法',
  }
  return labels[type] || type
}
</script>

<template>
  <view class="rounded-[16rpx] bg-white p-4">
    <!-- 标题栏 -->
    <view class="mb-4 flex items-center justify-between">
      <text class="text-[#333] font-medium text-[32rpx]">在线问诊</text>
      <view class="h-8 w-8 flex items-center justify-center" @click="handleClose">
        <text class="text-[#999] text-[40rpx]">✕</text>
      </view>
    </view>

    <!-- 搜索栏 -->
    <view class="mb-4 flex items-center rounded-[8rpx] bg-[#f5f5f5] px-3 py-2">
      <text class="mr-2 text-[#999]">🔍</text>
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="搜索医生、医师姓名搜索"
        placeholder-style="color:#999; font-size:28rpx"
        class="flex-1 bg-transparent text-[28rpx]"
        @confirm="handleSearch"
      >
      <text class="text-[#8c2303] text-[28rpx]" @click="handleSearch">搜索</text>
    </view>

    <!-- 筛选栏 -->
    <view class="mb-4 flex overflow-x-auto pb-2">
      <view
        v-for="(options, type) in filterOptions"
        :key="type"
        class="mr-4 flex-shrink-0"
      >
        <view class="flex items-center">
          <text class="mr-2 text-[#666] text-[28rpx]">{{ getFilterLabel(type) }}</text>
          <view
            v-for="option in options"
            :key="option"
            class="flex-shrink-0"
          >
            <view
              class="mr-2 rounded-full px-3 py-1 text-[24rpx]"
              :class="[
                activeFilters[type as keyof typeof activeFilters] === option
                  ? 'bg-[#8c2303] text-white'
                  : 'bg-[#f5f5f5] text-[#666]',
              ]"
              @click="handleFilter(type, option)"
            >
              {{ option }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 筛选按钮 -->
    <view class="mb-4 flex items-center justify-end">
      <text class="mr-2 text-[#666] text-[28rpx]">筛选</text>
      <text class="text-[#999] text-[24rpx]">≡</text>
    </view>

    <!-- 医生列表 -->
    <view class="space-y-4">
      <view
        v-for="doctor in doctors"
        :key="doctor.id"
        class="border border-[#eee] rounded-[8rpx] p-3"
        @click="handleDoctorClick(doctor)"
      >
        <view class="flex items-start">
          <!-- 医生头像 -->
          <image
            :src="doctor.avatar"
            class="mr-3 h-20 w-20 flex-shrink-0 rounded-full"
          />

          <!-- 医生信息 -->
          <view class="flex-1">
            <view class="mb-1 flex items-center">
              <text class="mr-2 text-[#333] font-medium text-[28rpx]">{{ doctor.name }}</text>
              <text class="text-[#666] text-[24rpx]">{{ doctor.title }}</text>
            </view>

            <view class="mb-1 flex flex-wrap">
              <view
                v-for="(dept, index) in doctor.department"
                :key="index"
                class="mb-1 mr-2 rounded-[4rpx] bg-[#f5f5f5] px-2 py-0.5 text-[#666] text-[20rpx]"
              >
                {{ dept }}
              </view>
            </view>

            <text class="mb-2 block line-clamp-2 text-[#999] text-[24rpx]">{{ doctor.specialty }}</text>

            <view class="flex items-center justify-between">
              <view class="flex items-center">
                <text class="text-[#ff6b35] font-medium text-[24rpx]">好评率 {{ doctor.rating }}%</text>
                <text class="ml-3 text-[#999] text-[24rpx]">接诊量: {{ doctor.consultationCount }}</text>
              </view>

              <view
                class="rounded-full bg-[#8c2303] px-3 py-0.5 text-white text-[20rpx]"
                @click.stop="handleConsultClick(doctor.id)"
              >
                立即咨询
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
