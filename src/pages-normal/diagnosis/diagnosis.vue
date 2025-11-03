<script lang="ts" setup>
import type { App_DoctorAuditing, SysDictData } from '@/api/guohao-api/globals.d'
import type { DoctorCardConfig } from '@/components/DoctorCard'
import { useRequest } from 'alova/client'
import { DoctorCardList } from '@/components/DoctorCard'
import { safeAreaInsets } from '@/utils/systemInfo'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '普通用户问诊',
  },
})

// 医疗服务卡片配置
const healthcareCards = [
  HEALTHCARE_CARD_CONFIGS.GUIDE,
  HEALTHCARE_CARD_CONFIGS.CONSULT,
]

// 医疗服务卡片配置
const medicalServiceCards = MEDICAL_SERVICE_CARDS_CONFIG

// 推荐医生数据
const recommendedDoctors = ref<App_DoctorAuditing[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
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

// 获取推荐医生列表
const {
  loading: doctorsLoading,
  send: fetchRecommendedDoctors,
} = useRequest(
  (page = 1, size = 10, keyword?: string) => Apis.app_DoctorAuditing.apiApp_doctorauditingGetrecommendeddoctorsPost({
    data: {
      page,
      pageSize: size,
      keyword,
      // 只获取审核通过的医生 (Approved = 2)
      auditing_status: 2,
    },
    meta: {
      ignoreAuth: true,
    },
  }),
  {
    immediate: false,
  },
).onSuccess((response: any) => {
  console.log('推荐医生数据原始响应:', response)

  const data = response.data?.items || response.data || response
  console.log('处理后的医生数据:', data)

  if (currentPage.value === 1) {
    recommendedDoctors.value = []
  }

  if (data?.records) {
    recommendedDoctors.value = [...recommendedDoctors.value, ...data.records]
    total.value = data.total || 0
  }
  else if (Array.isArray(data)) {
    recommendedDoctors.value = [...recommendedDoctors.value, ...data]
    total.value = data.length
  }
  else {
    console.warn('未识别的医生数据格式:', data)
  }
}).onError((error: any) => {
  console.error('获取推荐医生失败:', error)
  uni.showToast({
    title: '获取医生信息失败',
    icon: 'none',
  })
})

// 将API数据转换为DoctorCard组件需要的格式
const doctorCards = computed(() => {
  return recommendedDoctors.value.map((doctor, index) => {
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
  fetchRecommendedDoctors(1, pageSize.value, searchKeyword.value || undefined)
}

function handleSearchBarClick() {
  console.log('点击搜索栏')
  // 在这里添加点击搜索栏的逻辑，比如跳转到搜索页面
}

// 医疗服务卡片点击事件处理
function handleHealthcareCardClick(config: HealthcareCardConfig) {
  console.log('点击了医疗服务卡片:', config.id, config.title)

  switch (config.id) {
    case 'guide': {
      // 处理导诊顾问点击逻辑
      console.log('跳转到导诊顾问页面，URL: /pages-user-diagnosis/consultation-guide/index')
      const guideResult = uni.navigateTo({
        url: '/pages/YwenzhenType/consultation-guide/index',
        success: () => console.log('导诊顾问页面跳转成功'),
        fail: err => console.error('导诊顾问页面跳转失败:', err),
      })
      console.log('导航返回结果:', guideResult)
      break
    case 'consult':
      // 处理在线问诊点击逻辑
      console.log('跳转到在线问诊页面，URL: /pages/YwenzhenType/online-consultation/index')
      const consultResult = uni.navigateTo({
        url: '/pages/YwenzhenType/online-consultation/index',
        success: () => console.log('在线问诊页面跳转成功'),
        fail: err => console.error('在线问诊页面跳转失败:', err),
      })
      console.log('导航返回结果:', consultResult)
      break
    default:
      console.log('未知的卡片类型:', config.id)
  }
}

// 医疗服务卡片点击事件处理
function handleMedicalServiceCardClick(card: MedicalServiceCardConfig) {
  console.log('点击了医疗服务卡片:', card.id, card.title, card.action)

  switch (card.action) {
    case 'goToMedicineService':
      console.log('跳转到购药服务页面，URL: /pages/YwenzhenType/medication-purchase-service/index')
      const medicineResult = uni.navigateTo({
        url: '/pages/YwenzhenType/medication-purchase-service/index',
        success: () => console.log('购药服务页面跳转成功'),
        fail: err => console.error('购药服务页面跳转失败:', err),
      })
      console.log('导航返回结果:', medicineResult)
      break
    case 'goToSmartDiagnosis':
      console.log('跳转到智慧自诊页面')
      uni.navigateTo({ url: '/pages/YwenzhenType/smart-self-diagnosis/index' })
      break
    default:
      console.log('未知操作:', card.action)
  }

  // 显示提示
  uni.showToast({
    title: `点击了${card.title}`,
    icon: 'none',
  })
}

// 医生卡片点击事件处理
function handleDoctorCardClick(doctor: DoctorCardConfig) {
  console.log('点击了医生卡片:', doctor.id, doctor.name)

  // 显示提示
  uni.showToast({
    title: `点击了${doctor.name}医生`,
    icon: 'none',
  })

  // 这里可以添加跳转到医生详情页面的逻辑
  // uni.navigateTo({ url: `/pages/doctor/detail?id=${doctor.id}` })
}

// 查看所有医生
function handleViewAllDoctors() {
  console.log('查看所有医生')
  // 跳转到所有医生页面
  uni.navigateTo({
    url: '/pages/normal/alldoctor/alldoctor',
  })
}

// 加载更多医生
function loadMoreDoctors() {
  if (doctorsLoading.value)
    return

  currentPage.value++
  fetchRecommendedDoctors(currentPage.value, pageSize.value, searchKeyword.value || undefined)
}

// 刷新医生列表
function refreshDoctors() {
  currentPage.value = 1
  fetchRecommendedDoctors(1, pageSize.value, searchKeyword.value || undefined)
}

// 页面初始化
onMounted(async () => {
  // 开始加载推荐医生数据
  isLoading.value = true

  try {
    // 先获取字典数据
    await fetchDepartmentDict()

    // 再获取医生数据
    await fetchRecommendedDoctors(1, pageSize.value)
  }
  catch (error) {
    console.error('页面初始化失败:', error)
    // 即使字典获取失败，仍尝试获取医生数据
    fetchRecommendedDoctors(1, pageSize.value)
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template root="uniKuRoot">
  <view class="min-h-screen flex flex-col from-[#f6e2d3] to-transparent bg-gradient-to-b" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 搜索栏 -->
    <SearchBar
      v-model="searchKeyword"
      placeholder="搜索医生姓名或专业..."
      @search="handleSearch"
      @click="handleSearchBarClick"
    />

    <!-- 导诊顾问,在线问诊卡片 -->
    <view class="w-full flex justify-center pt-6">
      <HealthcareCardGroup
        :configs="healthcareCards"
        @click="handleHealthcareCardClick"
      />
    </view>

    <!-- 购药服务和智慧自诊卡片 -->
    <view class="w-full flex justify-center pt-3">
      <MedicalServiceCards
        :cards="medicalServiceCards"
        @card-click="handleMedicalServiceCardClick"
      />
    </view>

    <!-- 标题栏 -->
    <div class="relative ml-[24rpx] mt-[32rpx] h-[44rpx] w-[654rpx] flex flex-row items-start">
      <span class="relative ml-0 mt-0 h-[44rpx] w-[192rpx] whitespace-pre text-[#333333] font-medium text-[32rpx] leading-[40rpx]"> 推荐专家 </span>
      <view class="relative ml-[382rpx] mt-[6rpx] h-[32rpx] w-[48rpx] flex cursor-pointer items-center justify-center" @click="handleViewAllDoctors">
        <span class="whitespace-pre text-center text-[#999999] font-light text-[24rpx] leading-[32rpx]"> 所有 </span>
        <img
          class="ml-[8rpx] h-[24rpx] w-[24rpx]"
          src="/static/home-user/settings-arrow.png"
        >
      </view>
    </div>

    <!-- 专家医生卡片列表 -->
    <view class="w-full flex justify-center pt-2">
      <!-- 加载状态 -->
      <view v-if="doctorsLoading && doctorCards.length === 0" class="flex flex-col items-center justify-center py-20">
        <text class="text-base text-gray-400">加载中...</text>
      </view>

      <!-- 空状态提示 -->
      <view v-else-if="doctorCards.length === 0" class="flex flex-col items-center justify-center py-20">
        <view class="empty-icon mb-8">
          <wd-icon name="user" size="64px" color="#ddd" />
        </view>
        <text class="mb-4 text-[#333] font-semibold text-[36rpx]">暂无推荐医生</text>
        <text class="text-[#999] text-[28rpx]">请稍后再试或联系客服</text>
      </view>

      <!-- 医生卡片列表 -->
      <view v-else class="w-full">
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
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
