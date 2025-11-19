<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

// 编辑数据，使用reactive确保响应性
const editData = reactive({
  name: '张帅',
  gender: '男',
  age: 32,
  height: '175cm',
  weight: '70kg',
  contactPhone: '13888888888',
  // 健康摘要
  diagnosis: '2型糖尿病',
  tcmDiagnosis: '消渴病',
  medication: '降糖药',
  // 日期选择
  year: '2025',
  month: '6',
  day: '30',
  // 健康分析
  healthAnalysis: '系统导入'
})

// picker组件需要的索引值
const genderIndex = ref(0) // 性别索引（男=0，女=1）
const yearIndex = ref(10) // 年份索引
const monthIndex = ref(5) // 月份索引（6月=5）
const dayIndex = ref(29) // 日期索引（30日=29）



// 年份选项
const yearOptions = []
const currentYear = new Date().getFullYear()
for (let i = currentYear - 10; i <= currentYear; i++) {
  yearOptions.push(i.toString())
}

// 月份选项
const monthOptions = []
for (let i = 1; i <= 12; i++) {
  monthOptions.push(i.toString())
}

// 日期选项
const dayOptions = []
for (let i = 1; i <= 30; i++) {
  dayOptions.push(i.toString())
}

// 组件挂载时初始化数据
onMounted(() => {
  // 这里可以从API或全局状态获取数据
  console.log('初始化编辑页面数据')
})

// 处理返回
function handleBack() {
  uni.navigateBack()
}

// 处理清空重置
function handleClear() {
  uni.showModal({
    title: '提示',
    content: '确定要清空当前编辑的内容吗？',
    success: (res) => {
      if (res.confirm) {
        // 重置表单数据
        editData.name = '张帅'
        editData.gender = '男'
        editData.age = 32
        editData.height = '175cm'
        editData.weight = '70kg'
        editData.contactPhone = '13888888888'
        editData.diagnosis = '2型糖尿病'
        editData.tcmDiagnosis = '消渴病'
        editData.medication = '降糖药'
        editData.year = '2025'
        editData.month = '6'
        editData.day = '30'
      }
    }
  })
}

// 处理保存
function handleSave() {
  // 验证表单
  if (!editData.name || !editData.contactPhone) {
    uni.showToast({
      title: '请填写姓名和联系方式',
      icon: 'none'
    })
    return
  }
  
  // 构建保存数据
  const saveData = {
    ...editData,
    firstVisit: `${editData.year}年${editData.month}月${editData.day}日`
  }
  
  console.log('保存健康档案数据:', saveData)
  
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
  
  // 保存成功后返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 处理保存并分享
function handleSaveAndShare() {
  // 验证表单
  if (!editData.name || !editData.contactPhone) {
    uni.showToast({
      title: '请填写姓名和联系方式',
      icon: 'none'
    })
    return
  }
  
  // 构建保存数据
  const saveData = {
    ...editData,
    firstVisit: `${editData.year}年${editData.month}月${editData.day}日`
  }
  
  console.log('保存并分享健康档案数据:', saveData)
  
  // 模拟分享操作
  uni.showToast({
    title: '保存并分享成功',
    icon: 'success'
  })
  
  // 成功后返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<template>
  <view class="page w-full h-full bg-white">
      <!-- 头部导航栏 -->
      <view class="px-4 pt-6 pb-4 flex items-center">
        <view class="mr-4" @click="handleBack">
          <text class="text-lg">←</text>
        </view>
        <view class="flex-1 text-center text-xl font-semibold">
          健康档案
        </view>
        <view class="w-6"></view>
      </view>

      <!-- 用户基本信息 -->
      <view class="mb-6 flex items-center">
        <view class="mr-4 h-16 w-16 flex items-center justify-center rounded-full bg-gray-200">
          <text class="text-xl text-gray-500 font-bold">{{ editData.name.charAt(0) || '张' }}</text>
        </view>
        <view>
          <view class="font-medium">
            {{ editData.name || '张帅' }}
          </view>
          <view class="text-sm text-gray-500">
            {{ editData.gender }} | {{ editData.age || 32 }}岁
          </view>
          <view class="text-sm text-gray-500">
            创建时间：2024年1月12日
          </view>
          <view class="text-sm text-gray-500">
            诊断时间：2025年1月6日
          </view>
        </view>
      </view>

      <!-- 基础信息编辑 -->
      <view class="mb-6">
        <view class="mb-2 font-medium">
          基础信息
        </view>
        <view class="grid grid-cols-2 gap-3">
          <!-- 姓名 -->
          <view class="col-span-1">
            <span class="text-sm text-gray-500 block mb-1">姓名</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.name"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 年龄 -->
          <view class="col-span-1">
            <span class="text-sm text-gray-500 block mb-1">年龄</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model.number="editData.age"
                class="w-full px-3 py-2 text-sm outline-none"
                type="number"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 性别 -->
          <view class="col-span-1">
            <span class="text-sm text-gray-500 block mb-1">性别</span>
            <view class="border border-gray-200 rounded">
              <picker
                :value="genderIndex"
                :range="['男', '女']"
                @change="(e) => { genderIndex = e.detail.value; editData.gender = ['男', '女'][e.detail.value] }"
              >
                <view class="px-3 py-2 text-sm flex justify-between items-center">
                  <text>{{ editData.gender }}</text>
                  <text class="text-gray-400">▼</text>
                </view>
              </picker>
            </view>
          </view>
          
          <!-- 身高 -->
          <view class="col-span-1">
            <span class="text-sm text-gray-500 block mb-1">身高</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.height"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 体重 -->
          <view class="col-span-1">
            <span class="text-sm text-gray-500 block mb-1">体重</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.weight"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 联系方式 -->
          <view class="col-span-2">
            <span class="text-sm text-gray-500 block mb-1">联系方式</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.contactPhone"
                class="w-full px-3 py-2 text-sm outline-none"
                type="number"
                placeholder=""
              >
            </view>
          </view>
        </view>
      </view>

      <!-- 健康摘要编辑 -->
      <view class="mb-6">
        <view class="mb-2 font-medium">
          健康摘要
        </view>
        <view class="space-y-3">
          <!-- 慢病史 -->
          <view>
            <span class="text-sm text-gray-500 block mb-1">慢病史</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.diagnosis"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 中医诊断 -->
          <view>
            <span class="text-sm text-gray-500 block mb-1">中医诊断</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.tcmDiagnosis"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
          
          <!-- 初次记录 -->
          <view>
            <span class="text-sm text-gray-500 block mb-1">初次记录</span>
            <view class="flex space-x-2">
              <view class="flex-1 border border-gray-200 rounded">
                <picker
                  :value="yearIndex"
                  :range="yearOptions"
                  @change="(e) => { yearIndex = e.detail.value; editData.year = yearOptions[e.detail.value] }"
                >
                  <view class="px-3 py-2 text-sm text-center">
                    {{ editData.year }}
                  </view>
                </picker>
              </view>
              <text class="self-center text-sm">年</text>
              <view class="flex-1 border border-gray-200 rounded">
                <picker
                  :value="monthIndex"
                  :range="monthOptions"
                  @change="(e) => { monthIndex = e.detail.value; editData.month = monthOptions[e.detail.value] }"
                >
                  <view class="px-3 py-2 text-sm text-center">
                    {{ editData.month }}
                  </view>
                </picker>
              </view>
              <text class="self-center text-sm">月</text>
              <view class="flex-1 border border-gray-200 rounded">
                <picker
                  :value="dayIndex"
                  :range="dayOptions"
                  @change="(e) => { dayIndex = e.detail.value; editData.day = dayOptions[e.detail.value] }"
                >
                  <view class="px-3 py-2 text-sm text-center">
                    {{ editData.day }}
                  </view>
                </picker>
              </view>
              <text class="self-center text-sm">日</text>
            </view>
          </view>
          
          <!-- 服用药物 -->
          <view>
            <span class="text-sm text-gray-500 block mb-1">服用药物</span>
            <view class="border border-gray-200 rounded">
              <input
                v-model="editData.medication"
                class="w-full px-3 py-2 text-sm outline-none"
                placeholder=""
              >
            </view>
          </view>
        </view>
      </view>

      <!-- 健康分析 -->
      <view class="mb-6">
        <view class="mb-2 font-medium">
          健康分析
        </view>
        <view class="border border-gray-200 rounded">
          <view class="w-full px-3 py-2 text-sm text-gray-400">
            {{ editData.healthAnalysis }}
          </view>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="mt-6 flex justify-between">
        <button class="rounded py-3 px-6 text-sm text-white bg-red-300" @click="handleClear">
          清空重置
        </button>
        <button class="rounded py-3 px-6 text-sm text-white bg-blue-200" @click="handleSave">
          保存
        </button>
        <button class="rounded py-3 px-6 text-sm text-white bg-blue-500" @click="handleSaveAndShare">
          保存并分享给医师
        </button>
      </view>
    </view>
</template>

<style scoped>
.page {
  padding-bottom: 10px;
}
</style>
