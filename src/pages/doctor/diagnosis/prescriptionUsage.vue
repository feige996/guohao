<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '处方使用',
    backgroundColor: '#f5f5f5'
  }
})

// 处方信息接口
interface Prescription {
  name: string;
  effect: string;
 主治?: string;
  用法?: string;
  禁忌?: string;
  medicines: Array<{
    id: number;
    name: string;
    amount: string;
  }>;
}

// 处方信息
const prescription = ref<Prescription>({
  name: '益气通瘀',
  effect: '益气宁心，活血祛瘀。',
  主治: '用于气虚血瘀所致的心悸、胸闷。',
  用法: '每日一剂，水煎300ml，分早晚两次温服。',
  禁忌: '孕妇慎用。',
  medicines: []
})

// 预估药费
const estimatedCost = ref('¥XX.XX')

// 页面加载时获取处方信息
onMounted(() => {
  try {
    const prescriptionData = uni.getStorageSync('currentPrescription')
    if (prescriptionData) {
      const parsed = JSON.parse(prescriptionData)
      // 合并处方信息，保持默认的主治、用法、禁忌等
      prescription.value = {
        ...prescription.value,
        ...parsed
      }
    }
  } catch (e) {
    console.error('获取处方信息失败', e)
    uni.showToast({
      title: '加载处方失败',
      icon: 'none'
    })
  }
})

// 选择配药方式
function chooseDispensingMethod(method: 'platform' | 'self'): void {
  console.log('选择配药方式:', method === 'platform' ? '平台配药' : '患者自购')
  
  // 显示成功提示
  uni.showToast({
    title: '处方已完成',
    icon: 'success',
    duration: 1500
  })
  
  // 延迟返回问诊首页
  setTimeout(() => {
    // 清除临时存储的处方信息
    try {
      uni.removeStorageSync('currentPrescription')
    } catch (e) {
      console.error('清除处方信息失败', e)
    }
    
    // 使用switchTab跳转到问诊首页（tabbar页面）
    uni.switchTab({
      url: '/pages/doctor/diagnosis/diagnosis',
      success: () => {
        console.log('成功返回问诊首页')
      },
      fail: (err) => {
        console.error('switchTab跳转失败:', err)
        
        // 降级方案：使用redirectTo
        uni.redirectTo({
          url: '/pages/doctor/diagnosis/diagnosis',
          success: () => {
            console.log('redirectTo跳转成功')
          },
          fail: () => {
            // 最后提示用户
            uni.showModal({
              title: '提示',
              content: '处方已完成，请返回问诊首页',
              showCancel: false,
              success: () => {
                // 尝试返回上一页
                uni.navigateBack({
                  delta: 3 // 返回三级页面到问诊首页
                })
              }
            })
          }
        })
      }
    })
  }, 1600)
}

// 返回上一页
function handleBack(): void {
  uni.navigateBack()
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 返回栏 -->
    <view class="header-bar flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <view class="w-8">
        <text class="text-lg" @click="handleBack">&lt;</text>
      </view>
      <view class="text-center flex-1">
        <text class="text-lg font-medium">处方使用</text>
      </view>
      <view class="w-8"></view>
    </view>
    <!-- 处方信息卡片 -->
    <view class="mb-4 mt-2 space-y-4 bg-white px-4 py-5">
      <!-- 方名 -->
      <view class="flex items-center justify-between">
        <text class="text-sm text-gray-500">方名：</text>
        <text class="text-base font-medium text-gray-800">{{ prescription.name }}</text>
      </view>
      
      <!-- 功用 -->
      <view class="flex">
        <text class="mr-2 text-sm text-gray-500">功用：</text>
        <text class="text-sm text-gray-800">{{ prescription.effect }}</text>
      </view>
      
      <!-- 主治 -->
      <view class="flex">
        <text class="mr-2 text-sm text-gray-500">主治：</text>
        <text class="text-sm text-gray-800">{{ prescription.主治 }}</text>
      </view>
      
      <!-- 用法 -->
      <view class="flex">
        <text class="mr-2 text-sm text-gray-500">用法：</text>
        <text class="text-sm text-gray-800">{{ prescription.用法 }}</text>
      </view>
      
      <!-- 禁忌 -->
      <view class="flex">
        <text class="mr-2 text-sm text-gray-500">禁忌：</text>
        <text class="text-sm text-gray-800">{{ prescription.禁忌 }}</text>
      </view>
    </view>
    
    <!-- 组成 -->
    <view class="mb-4 bg-white px-4 py-4">
      <view class="mb-3 text-base font-medium">组成</view>
      
      <view class="space-y-3">
        <view
          v-for="item in prescription.medicines"
          :key="item.id"
          class="flex items-center justify-between"
        >
          <text class="text-sm text-gray-800">{{ item.name }}</text>
          <text class="text-sm text-gray-500">{{ item.amount }}克</text>
        </view>
      </view>
    </view>
    
    <!-- 配药方式选择 -->
    <view class="mt-6 space-y-4 px-4">
      <!-- 平台配药 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <view class="mb-3 flex items-center justify-between">
          <text class="text-base font-medium text-gray-800">平台配药</text>
          <text class="text-red-500">预估药费：{{ estimatedCost }}</text>
        </view>
        <text class="mb-4 block text-sm text-gray-500">顺丰配送上门（24小时内发货）</text>
        <button
          class="w-full rounded bg-green-500 py-2 text-sm text-white"
          @click="chooseDispensingMethod('platform')"
        >
          选择
        </button>
      </view>
      
      <!-- 患者自购 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <view class="mb-4 block text-sm text-gray-500">需自行按方抓药，品质可能不一</view>
        <button
          class="w-full rounded border border-purple-500 bg-white py-2 text-sm text-purple-500"
          @click="chooseDispensingMethod('self')"
        >
          选择
        </button>
      </view>
    </view>
  </view>
</template>