<script setup lang="ts">
import { ref } from 'vue'

// 定义标签页状态
const activeTab = ref('healthRecord')

// 健康档案数据
const healthData = {
  name: '张帅',
  gender: '男',
  age: 32,
  contactPhone: '13888888888',
  firstVisit: '2025年6月30日',
  healthInfo: {
    height: '175cm',
    weight: '70kg',
  },
  healthSummary: {
    diagnosis: ['2型糖尿病', '高血压'],
    tcmDiagnosis: '消渴病',
    medication: '降糖药',
  },
  healthDiscovery: {
    chiefComplaint: '多食、多饮、多尿伴体重下降1月',
    presentIllness: '患者1月前无明显诱因出现多食、多饮、多尿症状，每日饮水量约3000ml，尿量与饮水量相当，伴有体重下降约5kg，无明显口渴、多饮症状，无发热、咳嗽、腹痛、腹泻等不适，未予重视及治疗。',
    diagnosis: '阴虚燥热、气阴两虚',
  },
  inquiryRecords: [
    {
      date: '2024年12月15日',
      doctor: '李医生',
      department: '内分泌科',
      content: '患者诉近1月来出现多食、多饮、多尿症状，查血糖偏高，诊断为2型糖尿病，给予降糖药物治疗。',
    },
  ],
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}

// 跳转到编辑页面
function handleEdit() {
  uni.navigateTo({
    url: '/pages/normal/me/HealthRecordEdit',
  })
}

// 处理分享
function handleShare() {
  // 这里实现分享逻辑
  console.log('分享健康档案')
  uni.showToast({
    title: '分享成功',
    icon: 'success',
  })
}
</script>

<template>
  <view class="page h-full w-full bg-white">
    <!-- 头部导航栏 -->
    <view class="flex items-center px-4 pb-4 pt-6">
      <view class="mr-4" @click="handleBack">
        <text class="text-lg">←</text>
      </view>
      <view class="flex-1 text-center text-xl font-semibold">
        健康档案
      </view>
      <view class="w-6" />
    </view>

    <!-- 标签页切换 -->
    <view class="flex border-b">
      <view
        class="flex-1 py-3 text-center"
        :class="activeTab === 'healthRecord' ? 'border-b-2 border-blue-500 text-blue-500' : ''"
        @click="activeTab = 'healthRecord'"
      >
        健康档案
      </view>
      <view
        class="flex-1 py-3 text-center"
        :class="activeTab === 'syncRecord' ? 'border-b-2 border-blue-500 text-blue-500' : ''"
        @click="activeTab = 'syncRecord'"
      >
        问诊记录
      </view>
    </view>

    <!-- 健康档案内容 -->
    <view v-if="activeTab === 'healthRecord'" class="p-4">
      <!-- 基本信息 -->
      <view class="mb-6">
        <view class="mb-4 flex items-center justify-between">
          <view class="text-lg font-medium">
            基本信息
          </view>
        </view>
        <view class="rounded-lg bg-gray-50 p-4">
          <view class="grid grid-cols-2 gap-4">
            <view>
              <view class="mb-1 text-gray-500">
                姓名
              </view>
              <view class="font-medium">
                {{ healthData.name }}
              </view>
            </view>
            <view>
              <view class="mb-1 text-gray-500">
                性别
              </view>
              <view class="font-medium">
                {{ healthData.gender }}
              </view>
            </view>
            <view>
              <view class="mb-1 text-gray-500">
                年龄
              </view>
              <view class="font-medium">
                {{ healthData.age }}岁
              </view>
            </view>
            <view>
              <view class="mb-1 text-gray-500">
                身高
              </view>
              <view class="font-medium">
                {{ healthData.healthInfo.height }}
              </view>
            </view>
            <view>
              <view class="mb-1 text-gray-500">
                体重
              </view>
              <view class="font-medium">
                {{ healthData.healthInfo.weight }}
              </view>
            </view>
            <view>
              <view class="mb-1 text-gray-500">
                联系方式
              </view>
              <view class="font-medium">
                {{ healthData.contactPhone }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 健康摘要 -->
      <view class="mb-6">
        <view class="mb-4 flex items-center justify-between">
          <view class="text-lg font-medium">
            健康摘要
          </view>
        </view>
        <view class="rounded-lg bg-gray-50 p-4">
          <view class="mb-4">
            <view class="mb-1 text-gray-500">
              慢病史
            </view>
            <view class="font-medium">
              {{ healthData.healthSummary.diagnosis.join('、') }}
            </view>
          </view>
          <view class="mb-4">
            <view class="mb-1 text-gray-500">
              中医诊断
            </view>
            <view class="font-medium">
              {{ healthData.healthSummary.tcmDiagnosis }}
            </view>
          </view>
          <view>
            <view class="mb-1 text-gray-500">
              用药记录
            </view>
            <view class="font-medium">
              {{ healthData.healthSummary.medication }}
            </view>
          </view>
        </view>
      </view>

      <!-- 健康发现 -->
      <view class="mb-6">
        <view class="mb-4 flex items-center justify-between">
          <view class="text-lg font-medium">
            健康发现
          </view>
        </view>
        <view class="rounded-lg bg-gray-50 p-4">
          <view class="mb-4">
            <view class="mb-1 text-gray-500">
              主诉
            </view>
            <view class="font-medium">
              {{ healthData.healthDiscovery.chiefComplaint }}
            </view>
          </view>
          <view class="mb-4">
            <view class="mb-1 text-gray-500">
              现病史
            </view>
            <view class="font-medium">
              {{ healthData.healthDiscovery.presentIllness }}
            </view>
          </view>
          <view>
            <view class="mb-1 text-gray-500">
              中医体质辨识
            </view>
            <view class="font-medium">
              {{ healthData.healthDiscovery.diagnosis }}
            </view>
          </view>
        </view>
      </view>

      <!-- 问诊记录内容 -->
      <view class="mb-8">
        <view class="mb-4 flex items-center justify-between">
          <view class="text-lg font-medium">
            问诊记录
          </view>
          <view class="text-sm text-gray-500">
            共 {{ healthData.inquiryRecords.length }} 条
          </view>
        </view>
        <view v-if="healthData.inquiryRecords.length > 0" class="rounded-lg bg-gray-50 p-4">
          <view class="mb-4">
            <view class="mb-1 text-gray-500">
              首次问诊
            </view>
            <view class="font-medium">
              {{ healthData.firstVisit }}
            </view>
          </view>
          <view v-for="(record, index) in healthData.inquiryRecords" :key="index" class="mt-4 border-t pt-4">
            <view class="mb-2 flex justify-between">
              <view class="font-medium">
                {{ record.date }}
              </view>
              <view class="text-sm text-gray-500">
                {{ record.doctor }}
              </view>
            </view>
            <view class="mb-2 text-sm text-gray-500">
              {{ record.department }}
            </view>
            <view class="text-sm">
              {{ record.content }}
            </view>
          </view>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="flex justify-between px-4">
        <button class="rounded-lg bg-gray-200 px-6 py-3 text-sm text-gray-800" @click="handleEdit">
          手动编辑
        </button>
        <button class="rounded-lg bg-blue-500 px-6 py-3 text-sm text-white" @click="handleShare">
          分享档案
        </button>
      </view>
    </view>

    <!-- 问诊记录内容 -->
    <view v-else-if="activeTab === 'syncRecord'" class="p-4">
      <view v-if="healthData.inquiryRecords.length > 0" class="space-y-4">
        <view v-for="(record, index) in healthData.inquiryRecords" :key="index" class="rounded-lg bg-gray-50 p-4">
          <view class="mb-2 flex justify-between">
            <view class="font-medium">
              {{ record.date }}
            </view>
            <view class="text-sm text-gray-500">
              {{ record.doctor }}
            </view>
          </view>
          <view class="mb-2 text-sm text-gray-500">
            {{ record.department }}
          </view>
          <view class="text-sm">
            {{ record.content }}
          </view>
        </view>
      </view>
      <view v-else class="py-10 text-center">
        <view class="text-gray-500">
          暂无问诊记录
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding-bottom: 10px;
}
</style>
