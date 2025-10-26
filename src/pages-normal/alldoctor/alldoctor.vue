<script lang="ts" setup>
import type { App_DoctorAuditingOutput, SysDictData } from '@/api/guohao-api/globals.d'
import type { DoctorCardConfig } from '@/components/DoctorCard'
import { useRequest } from 'alova/client'
import { DoctorCardList } from '@/components/DoctorCard'
import SearchBar from '@/components-bak/SearchBar'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  type: 'page',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '所有医生',
    disableScroll: true,
  },
})

// 所有医生数据
const allDoctors = ref<App_DoctorAuditingOutput[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const isLoading = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 字典数据
const departmentDict = ref<SysDictData[]>([])
const departmentMap = ref<Record<string, string>>({})

// 获取科室字典数据
const {
  loading: dictLoading,
  send: fetchDepartmentDict,
} = useRequest(
  () => Apis.appSysDictData.apiAppsysdictdataDatalistCodeGet({
    pathParams: {
      code: 'AppDepartmentEnum',
    },
    meta: {
      ignoreAuth: true,
      allowAnonymous: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('科室字典数据响应:', response)

  const dictData = response.data?.result || response.result || response.data || []
  console.log('处理后的字典数据:', dictData)

  if (Array.isArray(dictData)) {
    departmentDict.value = dictData

    // 创建字典映射表: value -> label
    const mapping: Record<string, string> = {}
    dictData.forEach((item) => {
      if (item.value && item.label) {
        mapping[item.value] = item.label
      }
    })
    departmentMap.value = mapping

    console.log('科室字典映射:', mapping)
  }
}).onError((error: any) => {
  console.error('获取科室字典失败:', error)
  // 失败时使用默认映射
  departmentMap.value = {
    1: '内科',
    2: '外科',
    3: '妇科',
    4: '儿科',
    5: '中医科',
    6: '康复科',
    7: '营养科',
  }
})

// 获取所有医生列表（使用APP专用分页接口）
const {
  loading: doctorsLoading,
  send: fetchAllDoctors,
} = useRequest(
  (page = 1, size = 20, keyword?: string) => Apis.app_DoctorAuditing.apiApp_doctorauditingApppagePost({
    data: {
      page,
      pageSize: size,
      keyword,
      // 获取所有审核通过的医生 (Approved = 2)
      // auditing_status: 2,
    },
    meta: {
      ignoreAuth: true,
      allowAnonymous: true,
    },
  }),
  {
    // 组件挂载时不会自动请求 - 需要手动控制请求时机
    // 如果改成 immediate: true，组件一挂载就会立即发起请求，可能不符合业务需求
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('APP专用分页医生数据原始响应:', response)

  const result = response.data?.result || response.result || response.data
  console.log('处理后的医生数据:', result)

  if (currentPage.value === 1) {
    allDoctors.value = []
  }

  if (result?.items && Array.isArray(result.items)) {
    // APP专用分页接口返回的数据在items字段中
    allDoctors.value = [...allDoctors.value, ...result.items]
    total.value = result.total || 0
  }
  else if (Array.isArray(result)) {
    allDoctors.value = [...allDoctors.value, ...result]
    total.value = result.length
  }
  else {
    console.warn('未识别的医生数据格式:', result)
  }
}).onError((error: any) => {
  console.error('获取所有医生失败:', error)
  uni.showToast({
    title: '获取医生信息失败',
    icon: 'none',
  })
})

// 将API数据转换为DoctorCard组件需要的格式
const doctorCards = computed(() => {
  return allDoctors.value.map((doctor, index) => {
    // 从关联的用户信息中获取姓名
    const userName = doctor.appUser?.nickName || doctor.appUser?.username || '医生'

    return {
      id: doctor.appUser?.id?.toString() || `doctor_${index}`,
      name: userName,
      title: doctor.job_title || '主治医师',
      department: doctor.fields && doctor.fields.length > 0
        ? doctor.fields.map((field) => {
            // 使用从API获取的字典数据转换枚举值
            return departmentMap.value[field.toString()] || `科室${field}`
          })
        : ['中医科'],
      hospital: doctor.position || '国浩中医医院',
      consultationCount: Math.floor(Math.random() * 1000) + 100, // 暂时使用随机数
      rating: doctor.avg_rating_score || (4.5 + Math.random() * 0.5), // 使用真实评分或随机评分
      specialty: doctor.introduction || '中医内科',
      avatar: doctor.avatar || doctor.appUser?.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=center',
    } as DoctorCardConfig
  })
})

// 搜索栏事件处理
function handleSearch() {
  console.log('执行搜索:', searchKeyword.value)
  // 重新加载医生数据
  currentPage.value = 1
  fetchAllDoctors(1, pageSize.value, searchKeyword.value || undefined)
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
}

// 医生卡片点击事件处理
function handleDoctorCardClick(doctor: DoctorCardConfig) {
  console.log('点击了医生卡片:', doctor.id, doctor.name)

  // 跳转到问诊预约页面
  uni.navigateTo({
    url: `/pages/normal/consultation-booking/consultation-booking?id=${doctor.id}&name=${encodeURIComponent(doctor.name)}`,
  })
}

// 加载更多医生
function loadMoreDoctors() {
  if (doctorsLoading.value)
    return

  currentPage.value++
  fetchAllDoctors(currentPage.value, pageSize.value, searchKeyword.value || undefined)
}

// 刷新医生列表
function refreshDoctors() {
  currentPage.value = 1
  fetchAllDoctors(1, pageSize.value, searchKeyword.value || undefined)
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 页面初始化
onMounted(async () => {
  // 开始加载所有医生数据
  isLoading.value = true

  try {
    // 先获取字典数据
    await fetchDepartmentDict()

    // 再获取医生数据
    await fetchAllDoctors(1, pageSize.value)
  }
  catch (error) {
    console.error('页面初始化失败:', error)
    // 即使字典获取失败，仍尝试获取医生数据
    fetchAllDoctors(1, pageSize.value)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <view class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 固定头部区域 -->
    <view class="header-fixed">
      <!-- 自定义导航栏 -->
      <view class="nav-bar flex items-center justify-between px-[28rpx] py-4">
        <view class="nav-left" @click="goBack">
          <view class="back-btn w-[80rpx] flex items-center justify-center rounded-[40rpx] bg-white shadow-sm">
            <wd-icon name="arrow-left" size="20px" color="#333" />
          </view>
        </view>
        <view class="nav-center flex-1 text-center">
          <text class="nav-title block text-[#333] font-semibold text-[36rpx]">所有医生</text>
          <text class="nav-subtitle mt-1 block text-[#999] text-[24rpx]">共 {{ total }} 位医生</text>
        </view>
        <view class="nav-right" @click="refreshDoctors">
          <view class="refresh-btn w-[80rpx] flex items-center justify-center rounded-[40rpx] bg-white shadow-sm" :class="{ loading: doctorsLoading }">
            <wd-icon name="refresh" size="18px" color="#666" />
          </view>
        </view>
      </view>

      <!-- 搜索栏 -->
      <view class="pb-4">
        <SearchBar
          v-model="searchKeyword"
          placeholder="搜索医生姓名或专业..."
          margin-top="0"
          @search="handleSearch"
          @click="handleSearchBarClick"
        />
      </view>
    </view>

    <!-- 可滚动的医生列表区域 -->
    <view class="content-scroll">
      <scroll-view scroll-y class="scroll-area" enable-back-to-top @scrolltolower="loadMoreDoctors">
        <!-- 加载状态 -->
        <view v-if="doctorsLoading && doctorCards.length === 0" class="flex flex-col items-center justify-center py-20">
          <text class="text-base text-gray-400">加载中...</text>
        </view>

        <!-- 空状态提示 -->
        <view v-else-if="doctorCards.length === 0" class="flex flex-col items-center justify-center py-20">
          <view class="empty-icon mb-8">
            <wd-icon name="user" size="64px" color="#ddd" />
          </view>
          <text class="mb-4 text-[#333] font-semibold text-[36rpx]">暂无医生信息</text>
          <text class="text-[#999] text-[28rpx]">请稍后再试或联系客服</text>
        </view>

        <!-- 医生卡片列表 -->
        <view v-else class="mb-[32rpx]">
          <DoctorCardList
            :doctors="doctorCards"
            @doctor-click="handleDoctorCardClick"
          />

          <!-- 加载更多提示 -->
          <view v-if="doctorsLoading && doctorCards.length > 0" class="flex items-center justify-center py-8">
            <wd-icon name="loading" size="20px" color="#8c2303" />
            <text class="ml-2 text-[#666] text-[28rpx]">加载中...</text>
          </view>

          <!-- 加载更多按钮 -->
          <view v-else-if="doctorCards.length < total" class="flex justify-center py-8">
            <view
              class="rounded-[50rpx] from-[#8c2303] to-[#b8441f] bg-gradient-to-br px-[48rpx] py-[16rpx] transition-all duration-300 active:scale-[0.95]"
              @click="loadMoreDoctors"
            >
              <text class="text-white text-[28rpx]">加载更多医生</text>
            </view>
          </view>

          <!-- 没有更多数据提示 -->
          <view v-else-if="doctorCards.length > 0 && doctorCards.length >= total" class="flex justify-center py-8">
            <text class="text-[#999] text-[28rpx]">已显示全部医生</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// 头部固定区域
.header-fixed {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

// 可滚动内容区域
.content-scroll {
  margin-top: 30rpx;
  flex: 1;
  overflow: hidden;
}

.scroll-area {
  height: 100%;
}

// 刷新按钮旋转动画
.refresh-btn.loading {
  animation: rotate 1s linear infinite;
}

// 动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 隐藏滚动条
.uni-scroll-view {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
