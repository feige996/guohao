<script setup lang="ts">
import { ref } from 'vue'

// 类型定义
interface PatientInfo {
  name: string
  gender: string
  age: number
  avatar: string
}

// 响应式数据
const patientInfo = ref<PatientInfo>({
  name: '吴姗姗',
  gender: '女',
  age: 32,
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=center',
})

const consultationTime = ref('')
const chiefComplaint = ref('头痛，睡眠不安')
const chineseDiagnosis = ref('头痛')
const syndromeType = ref('肝胆上亢证')
const treatmentMethod = ref('平肝潜阳，滋养肝肾')

// 处理主诉编辑
function editChiefComplaint(): void {
  uni.showModal({
    title: '编辑主诉',
    content: chiefComplaint.value,
    editable: true,
    placeholderText: '请输入主诉',
    success: (res) => {
      if (res.confirm && res.content) {
        chiefComplaint.value = res.content
      }
    },
  })
}

// 处理辩证分型选择
function selectSyndromeType(): void {
  const syndromeTypes = ['肝胆上亢证', '肝阳上亢证', '肝肾阴虚证', '气血亏虚证', '痰浊中阻证']
  uni.showActionSheet({
    itemList: syndromeTypes,
    success: (res) => {
      syndromeType.value = syndromeTypes[res.tapIndex]
    },
  })
}

// 自定义辩证分型
function customSyndromeType(): void {
  uni.showModal({
    title: '自定义辩证分型',
    editable: true,
    placeholderText: '请输入自定义辩证分型',
    success: (res) => {
      if (res.confirm && res.content) {
        syndromeType.value = res.content
      }
    },
  })
}

// 从常用处方选择
function selectFromCommonPrescriptions(): void {
  console.log('从常用处方选择')
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

// 开方
function createPrescription(): void {
  console.log('开方')
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

// 保存并开具处方 - 核心修复：确保能正确返回问诊首页
function saveAndOpenPrescription(): void {
  console.log('保存并开具处方')

  // 显示成功提示
  uni.showToast({
    title: '处方已发送给患者',
    icon: 'success',
    duration: 1500,
  })

  // // 延迟执行跳转，确保用户看到成功提示
  // setTimeout(() => {
  //   // 确认目标页面路径 - 根据tabbar配置，医生问诊页面是tabbar页面
  //   const targetPage = '/pages/doctor/diagnosis/diagnosis'

  //   // 核心方案：使用switchTab跳转到tabbar页面
  //   // 对于tabbar页面，必须使用switchTab而不是navigateTo
  //   uni.switchTab({
  //     url: targetPage,
  //     success: () => {
  //       console.log('成功使用switchTab跳转到问诊首页')
  //     },
  //     fail: (err) => {
  //       console.error('switchTab跳转失败:', err)

  //       // 降级方案1：尝试使用redirectTo，替换当前页面
  //       console.log('尝试使用redirectTo进行降级跳转')
  //       uni.redirectTo({
  //         url: targetPage,
  //         success: () => {
  //           console.log('redirectTo跳转成功')
  //         },
  //         fail: (redirectErr) => {
  //           console.error('redirectTo也失败:', redirectErr)

  //           // 降级方案2：尝试使用reLaunch，关闭所有页面并跳转到目标页面
  //           console.log('尝试使用reLaunch进行最终降级跳转')
  //           uni.reLaunch({
  //             url: targetPage,
  //             success: () => {
  //               console.log('reLaunch跳转成功')
  //             },
  //             fail: (relaunchErr) => {
  //               console.error('所有跳转方式均失败:', relaunchErr)
  //               // 最后提示用户手动返回
  //               uni.showModal({
  //                 title: '提示',
  //                 content: '无法自动跳转，请点击底部导航栏返回问诊首页',
  //                 showCancel: false
  //               })
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // }, 1600)
}

// 保存草稿
function saveDraft(): void {
  console.log('保存草稿')
  uni.showToast({
    title: '已保存草稿',
    icon: 'success',
  })
}

// 返回上一页
function navigateBack(): void {
  uni.navigateBack()
}

// 页面加载时获取参数
function onLoad(options: any): void {
  // 如果从上一个页面传递了患者信息，则更新
  if (options && options.patientInfo) {
    try {
      const info = JSON.parse(decodeURIComponent(options.patientInfo))
      patientInfo.value = { ...patientInfo.value, ...info }
    }
    catch (e) {
      console.error('解析患者信息失败', e)
    }
  }

  // 设置当前日期作为问诊时间
  const now = new Date()
  consultationTime.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
}

// 设置页面生命周期
definePage({
  onLoad,
})
</script>

<template>
  <view class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <view class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
      <text class="text-base text-blue-500" @click="navigateBack">‹</text>
      <text class="text-lg font-medium">诊断书</text>
      <view class="w-6" />
    </view>

    <!-- 患者信息 -->
    <view class="border-b border-gray-200 bg-white p-4">
      <view class="flex items-center gap-3">
        <image :src="patientInfo.avatar" class="h-12 w-12 rounded-full" />
        <view>
          <text class="text-base font-medium">{{ patientInfo.name }} {{ patientInfo.gender }} {{ patientInfo.age }}岁</text>
          <view class="mt-1 text-sm text-gray-500">
            问诊时间：{{ consultationTime }}
          </view>
        </view>
      </view>
    </view>

    <!-- 诊断内容 -->
    <view class="mt-2 border-b border-gray-200 bg-white">
      <!-- 主诉 -->
      <view class="flex items-center justify-between p-4">
        <text class="text-base font-medium">主诉：</text>
        <view class="ml-3 flex-1">
          <view class="flex items-center justify-between">
            <text class="text-base">{{ chiefComplaint }}</text>
            <text class="text-blue-500" @click="editChiefComplaint">✏️</text>
          </view>
        </view>
      </view>

      <!-- 中医诊断 -->
      <view class="flex items-center justify-between border-t border-gray-100 p-4">
        <text class="text-base font-medium">中医诊断：</text>
        <view class="ml-3 flex-1">
          <text class="text-base">{{ chineseDiagnosis }}</text>
        </view>
      </view>

      <!-- 辩证分型 -->
      <view class="flex items-center justify-between border-t border-gray-100 p-4">
        <text class="text-base font-medium">辩证分型：</text>
        <view class="ml-3 flex items-center gap-2">
          <text class="text-base">{{ syndromeType }}</text>
          <button class="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-500" @click="selectSyndromeType">
            ▼
          </button>
          <button class="rounded-full bg-red-50 px-3 py-1 text-sm text-red-500" @click="customSyndromeType">
            自定义
          </button>
        </view>
      </view>

      <!-- 治法 -->
      <view class="flex items-center justify-between border-t border-gray-100 p-4">
        <text class="text-base font-medium">治法：</text>
        <view class="ml-3 flex-1">
          <text class="text-base">{{ treatmentMethod }}</text>
        </view>
      </view>

      <!-- 方药 -->
      <view class="border-t border-gray-100 p-4">
        <text class="text-base font-medium">方药：</text>
        <view class="mt-3 flex gap-3">
          <button class="flex-1 rounded-full bg-green-500 py-2 text-white" @click="createPrescription">
            开方
          </button>
          <button class="flex-1 rounded-full bg-blue-100 py-2 text-blue-500" @click="selectFromCommonPrescriptions">
            从常用处方选择
          </button>
        </view>
      </view>

      <!-- 调护建议 -->
      <view class="border-t border-gray-100 p-4">
        <text class="text-base font-medium">调护建议：</text>
        <view class="mt-2">
          <view class="mb-1 flex gap-2">
            <text class="font-medium">情志：</text>
            <text>保持心情舒畅...</text>
          </view>
          <view class="mb-1 flex gap-2">
            <text class="font-medium">饮食：</text>
            <text>清淡为宜...</text>
          </view>
          <view class="flex gap-2">
            <text class="font-medium">作息：</text>
            <text>避免熬夜...</text>
          </view>
        </view>
        <button class="mt-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-500">
          常用建议
        </button>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="sticky bottom-0 z-10 flex gap-3 border-t border-gray-200 bg-white p-4">
      <button class="flex-1 rounded-full bg-gray-200 py-3 text-base" @click="saveDraft">
        保存草稿
      </button>
      <button class="flex-1 rounded-full bg-blue-500 py-3 text-base text-white" @click="saveAndOpenPrescription">
        保存并开具处方
      </button>
    </view>

    <!-- 说明信息 -->
    <view class="mb-20 text-center text-xs text-gray-500">
      <text>说明：点击"保存并开具处方"后，药单直接发送给患者。</text>
    </view>
  </view>
</template>
