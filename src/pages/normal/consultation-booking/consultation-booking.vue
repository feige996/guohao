<script setup lang="ts">
import type { App_DoctorAuditingOutput, SysDictData } from '@/api/guohao-api/globals.d'
import { onLoad } from '@dcloudio/uni-app'
import { useRequest } from 'alova/client'
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面元数据
definePage({
  type: 'page',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '问诊预约',
  },
})

// 医生信息接口
interface DoctorInfo {
  id: string
  name: string
  avatar: string
  title: string
  specialty: string
  introduction: string
  consultationCount: number
  satisfactionRate: number
  responseSpeed: string
}

// 医生信息
const doctorInfo = ref<DoctorInfo>({
  id: '',
  name: '孙医生',
  avatar: '/static/images/avatar.jpg',
  title: '骨科专家',
  specialty: 'XX疗法传承人',
  introduction: '师从中医骨科泰斗xxx，从医20年、患者好评率99%、擅长针灸正骨。\n\n个人简介："耄耋祖训，专攻疑难骨科"',
  consultationCount: 121,
  satisfactionRate: 0,
  responseSpeed: '较快',
})

// 原始医生数据（从API获取）
const doctorData = ref<App_DoctorAuditingOutput | null>(null)

// 字典数据
const departmentDict = ref<SysDictData[]>([])
const departmentMap = ref<Record<string, string>>({})

// 获取科室字典数据
const {
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

// 获取医生详情
const {
  loading: doctorLoading,
  send: fetchDoctorDetail,
} = useRequest(
  (doctorId: number) => Apis.app_DoctorAuditing.apiApp_doctorauditingDetailGet({
    params: {
      Id: doctorId,
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
  console.log('医生详情数据响应:', response)

  const result = response.data?.result || response.result || response.data || response
  console.log('处理后的医生数据:', result)

  if (result) {
    doctorData.value = result

    // 转换为页面展示格式
    const userName = result.appUser?.nickName || result.appUser?.username || '医生'
    const userAvatar = result.avatar || result.appUser?.avatar || '/static/images/default-avatar.png'

    // 处理科室信息
    let specialtyText = '中医科'
    if (result.fields && result.fields.length > 0) {
      const fieldLabels = result.fields.map((field: number) => {
        return departmentMap.value[field.toString()] || `科室${field}`
      })
      specialtyText = fieldLabels.join('、')
    }

    doctorInfo.value = {
      id: result.appUser?.id?.toString() || doctorInfo.value.id,
      name: userName,
      avatar: userAvatar,
      title: result.job_title || '主治医师',
      specialty: specialtyText,
      introduction: result.introduction || '暂无简介',
      consultationCount: result.consultation_count || 0,
      satisfactionRate: result.avg_rating_score || 0,
      responseSpeed: result.avg_response_speed || '—',
    }
  }
}).onError((error: any) => {
  console.error('获取医生详情失败:', error)
  uni.showToast({
    title: '获取医生信息失败',
    icon: 'none',
  })
})

// 页面加载时获取医生ID
onLoad(async (options: any) => {
  if (options.id) {
    doctorInfo.value.id = options.id
    await loadDoctorInfo(options.id)
  }
  if (options.name) {
    doctorInfo.value.name = decodeURIComponent(options.name)
  }
})

// 加载医生信息
async function loadDoctorInfo(doctorId: string) {
  try {
    console.log('加载医生信息:', doctorId)

    // 先获取字典数据
    await fetchDepartmentDict()

    // 再获取医生详情
    await fetchDoctorDetail(Number(doctorId))
  }
  catch (error) {
    console.error('加载医生信息失败:', error)
  }
}

// 去挂号
function handleRegister() {
  uni.showToast({
    title: '去挂号功能开发中',
    icon: 'none',
  })
}

// 去图文问诊
function handleTextConsultation() {
  uni.showToast({
    title: '去图文问诊功能开发中',
    icon: 'none',
  })
}

// 去电话问诊
function handlePhoneConsultation() {
  uni.showToast({
    title: '去电话问诊功能开发中',
    icon: 'none',
  })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="h-screen w-full flex flex-col bg-[#f5f5f5]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <wd-navbar title="问诊预约" left-text="返回" left-arrow @click-left="handleBack" />

    <!-- 主内容区域 -->
    <scroll-view class="flex-1" scroll-y>
      <!-- 加载状态 -->
      <view v-if="doctorLoading" class="flex flex-col items-center justify-center py-20">
        <text class="text-base text-gray-400">加载中...</text>
      </view>

      <view v-else class="p-[24rpx]">
        <!-- 医生信息卡片 -->
        <view class="mb-[24rpx] rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mb-[24rpx] flex">
            <image class="mr-[24rpx] h-[96rpx] w-[96rpx] rounded-full bg-[#f0f0f0]" :src="doctorInfo.avatar" mode="aspectFill" />
            <view class="flex-1">
              <view class="flex flex-wrap items-center gap-[16rpx]">
                <text class="text-[#333] font-semibold text-[36rpx]">{{ doctorInfo.name }}</text>
                <text class="text-[#666] text-[28rpx]">{{ doctorInfo.title }}</text>
                <text class="text-[#666] text-[28rpx]">{{ doctorInfo.specialty }}</text>
              </view>
            </view>
          </view>

          <view class="mb-[32rpx] whitespace-pre-line text-[#666] text-[28rpx] leading-[44rpx]">
            {{ doctorInfo.introduction }}
          </view>

          <!-- 统计信息 -->
          <view class="flex items-center justify-around border-t border-[#f0f0f0] pt-[24rpx]">
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text v-if="doctorInfo.consultationCount > 0" class="text-[#333] font-semibold text-[40rpx]">{{ doctorInfo.consultationCount }}</text>
              <text v-else class="text-[#999] text-[32rpx]">—</text>
              <text class="text-[#999] text-[24rpx]">接诊人次</text>
            </view>
            <view class="h-[80rpx] w-[1rpx] bg-[#f0f0f0]" />
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text v-if="doctorInfo.satisfactionRate > 0" class="text-[#333] font-semibold text-[40rpx]">{{ (doctorInfo.satisfactionRate * 100).toFixed(0) }}%</text>
              <text v-else class="text-[#999] text-[32rpx]">—</text>
              <text class="text-[#999] text-[24rpx]">满意度</text>
            </view>
            <view class="h-[80rpx] w-[1rpx] bg-[#f0f0f0]" />
            <view class="flex flex-1 flex-col items-center gap-[8rpx]">
              <text v-if="doctorInfo.responseSpeed && doctorInfo.responseSpeed !== '—'" class="text-[#333] font-semibold text-[32rpx]">{{ doctorInfo.responseSpeed }}</text>
              <text v-else class="text-[#999] text-[32rpx]">—</text>
              <text class="text-[#999] text-[24rpx]">接诊速度</text>
            </view>
          </view>
        </view>

        <!-- 视频挂号 -->
        <view class="mb-[24rpx]">
          <view class="mb-[16rpx] text-[#333] font-semibold text-[32rpx]">
            视频挂号
          </view>
          <view class="relative flex items-center rounded-[24rpx] bg-white p-[32rpx]">
            <view class="flex flex-1 flex-col gap-[8rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">灵活视频时间</text>
              <text class="text-[#999] text-[24rpx]">您购买后医生将为您安排视频时间</text>
            </view>
            <view class="mx-[24rpx] flex items-center text-[#ff6b35] font-semibold text-[32rpx]">
              ¥20
            </view>
            <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handleRegister">
              <text class="text-white font-medium text-[28rpx]">去挂号</text>
            </view>
          </view>
        </view>

        <!-- 图文问诊 -->
        <view class="mb-[24rpx] flex items-center rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mr-[24rpx] h-[88rpx] w-[88rpx] flex items-center justify-center rounded-full bg-[#e3f2fd]">
            <text class="text-[48rpx]">💬</text>
          </view>
          <view class="flex-1">
            <view class="mb-[8rpx] flex items-center gap-[12rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">图文问诊</text>
              <text class="text-[#ff6b35] font-medium text-[28rpx]">¥20/次</text>
            </view>
            <text class="text-[#999] text-[24rpx]">图文多轮沟通</text>
          </view>
          <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handleTextConsultation">
            <text class="text-white font-medium text-[28rpx]">去问诊</text>
          </view>
        </view>

        <!-- 电话问诊 -->
        <view class="mb-[24rpx] flex items-center rounded-[24rpx] bg-white p-[32rpx]">
          <view class="mr-[24rpx] h-[88rpx] w-[88rpx] flex items-center justify-center rounded-full bg-[#e8f5e9]">
            <text class="text-[48rpx]">📞</text>
          </view>
          <view class="flex-1">
            <view class="mb-[8rpx] flex items-center gap-[12rpx]">
              <text class="text-[#333] font-medium text-[32rpx]">电话问诊</text>
              <text class="text-[#ff6b35] font-medium text-[28rpx]">¥20/10分钟</text>
              <view class="inline-flex items-center rounded-[8rpx] bg-[#bbdefb] px-[12rpx] py-[4rpx] text-[#1976d2] text-[20rpx]">
                首单少
              </view>
            </view>
            <text class="text-[#999] text-[24rpx]">1对1电话交流，今日剩3个号</text>
          </view>
          <view class="rounded-[48rpx] from-[#ff8a65] to-[#ff6b35] bg-gradient-to-br px-[32rpx] py-[16rpx]" @click="handlePhoneConsultation">
            <text class="text-white font-medium text-[28rpx]">去通话</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
// 所有样式已使用 UnoCSS 原子类实现
// 仅保留必要的全局样式覆盖
</style>
