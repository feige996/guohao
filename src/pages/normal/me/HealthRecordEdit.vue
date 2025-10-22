<script setup lang="ts">
import { onMounted, reactive } from 'vue'

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
  healthAnalysis: '系统导入',
})

// 年份选项
const yearOptions = []
for (let i = 2010; i <= 2030; i++) {
  yearOptions.push(i.toString())
}

// 月份选项
const monthOptions = []
for (let i = 1; i <= 12; i++) {
  monthOptions.push(i.toString())
}

// 日期选项
const dayOptions = []
for (let i = 1; i <= 31; i++) {
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
        editData.healthAnalysis = '系统导入'
      }
    },
  })
}

// 处理系统导入
function handleImportFromSystem() {
  uni.showLoading({
    title: '导入中...'
  })
  
  // 模拟系统导入操作
  setTimeout(() => {
    // 这里可以实际调用API从系统获取健康分析数据
    editData.healthAnalysis = `健康分析报告：\n\n1. 基本健康状况：患者为中年男性，身高体重比例正常，BMI指数22.9，属于健康范围。\n\n2. 主要诊断：2型糖尿病，中医诊断为消渴病。\n\n3. 风险评估：根据当前血糖水平和用药情况，患者糖尿病控制状况良好，但仍需定期监测血糖。\n\n4. 生活建议：\n   - 控制碳水化合物摄入，避免高糖食物\n   - 每周进行至少150分钟中等强度有氧运动\n   - 定期监测血糖，保持规律作息\n   - 遵医嘱按时服药，不得擅自停药\n\n5. 随访计划：建议每3个月复查一次糖化血红蛋白，每年进行一次全面体检。`
    
    uni.hideLoading()
    uni.showToast({
      title: '导入成功',
      icon: 'success'
    })
  }, 1000)
}

// 处理保存
function handleSave() {
  // 验证表单
  if (!editData.name || !editData.contactPhone) {
    uni.showToast({
      title: '请填写姓名和联系方式',
      icon: 'none',
    })
    return
  }

  // 构建保存数据
  const saveData = {
    ...editData,
    firstVisit: `${editData.year}年${editData.month}月${editData.day}日`,
  }

  console.log('保存健康档案数据:', saveData)

  uni.showToast({
    title: '保存成功',
    icon: 'success',
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
      icon: 'none',
    })
    return
  }

  // 构建保存数据
  const saveData = {
    ...editData,
    firstVisit: `${editData.year}年${editData.month}月${editData.day}日`,
  }

  console.log('保存并分享健康档案数据:', saveData)

  // 模拟分享操作
  uni.showToast({
    title: '保存并分享成功',
    icon: 'success',
  })

  // 成功后返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
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

    <!-- 表单内容 -->
    <view class="px-4 py-2">
      <scroll-view scroll-y class="h-[calc(100vh-160px)]">
        <!-- 基本信息 -->
        <view class="mb-6">
          <view class="mb-4 text-lg font-medium">
            基本信息
          </view>
          <view class="space-y-4">
            <!-- 姓名 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                姓名
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.name"
                  type="text"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入姓名"
                >
              </view>
            </view>

            <!-- 性别 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                性别
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <radio-group v-model="editData.gender" class="flex gap-6">
                  <label class="flex items-center gap-2">
                    <radio value="男" />
                    <text>男</text>
                  </label>
                  <label class="flex items-center gap-2">
                    <radio value="女" />
                    <text>女</text>
                  </label>
                </radio-group>
              </view>
            </view>

            <!-- 年龄 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                年龄
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model.number="editData.age"
                  type="number"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入年龄"
                >
              </view>
            </view>

            <!-- 身高 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                身高
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.height"
                  type="text"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入身高"
                >
              </view>
            </view>

            <!-- 体重 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                体重
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.weight"
                  type="text"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入体重"
                >
              </view>
            </view>

            <!-- 联系方式 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                联系方式
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.contactPhone"
                  type="tel"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入手机号码"
                >
              </view>
            </view>
          </view>
        </view>

        <!-- 健康摘要 -->
        <view class="mb-6">
          <view class="mb-4 text-lg font-medium">
            健康摘要
          </view>
          <view class="space-y-4">
            <!-- 慢病史 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                慢病史
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <textarea
                  v-model="editData.diagnosis"
                  class="min-h-[80px] w-full bg-transparent outline-none"
                  placeholder="请输入慢病史（多个用顿号分隔）"
                />
              </view>
            </view>

            <!-- 中医诊断 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                中医诊断
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.tcmDiagnosis"
                  type="text"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入中医诊断"
                >
              </view>
            </view>

            <!-- 用药记录 -->
            <view class="space-y-2">
              <view class="text-gray-600">
                用药记录
              </view>
              <view class="rounded-lg bg-gray-50 p-3">
                <input
                  v-model="editData.medication"
                  type="text"
                  class="w-full bg-transparent outline-none"
                  placeholder="请输入用药记录"
                >
              </view>
            </view>
          </view>
        </view>

        <!-- 健康分析 -->
        <view class="mb-6">
          <view class="mb-4 text-lg font-medium">
            健康分析
          </view>
          <view class="rounded-lg bg-gray-50 p-4">
            <textarea
              v-model="editData.healthAnalysis"
              class="w-full h-32 bg-transparent outline-none resize-none"
              placeholder="请输入健康分析内容，或点击下方按钮从系统导入"
            ></textarea>
            <view class="mt-4">
              <button class="w-full rounded-lg border border-blue-500 bg-white px-4 py-2 text-sm text-blue-500" @click="handleImportFromSystem">
                系统导入
              </button>
            </view>
          </view>
        </view>

        <!-- 首次问诊日期 -->
        <view class="mb-6">
          <view class="mb-4 text-lg font-medium">
            首次问诊日期
          </view>
          <view class="rounded-lg bg-gray-50 p-3">
            <view class="flex gap-2">
              <picker v-model="editData.year" mode="selector" :range="yearOptions" class="flex-1 text-center">
                <view>{{ editData.year }}年</view>
              </picker>
              <text class="flex items-center">/</text>
              <picker v-model="editData.month" mode="selector" :range="monthOptions" class="flex-1 text-center">
                <view>{{ editData.month }}月</view>
              </picker>
              <text class="flex items-center">/</text>
              <picker v-model="editData.day" mode="selector" :range="dayOptions" class="flex-1 text-center">
                <view>{{ editData.day }}日</view>
              </picker>
            </view>
          </view>
        </view>

        <!-- 诊断时间显示 -->
        <view class="mb-8 rounded-lg bg-blue-50 p-4">
          <view class="text-sm text-blue-600">
            诊断时间：{{ editData.year }}年{{ editData.month }}月{{ editData.day }}日
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="fixed bottom-0 left-0 right-0 border-t bg-white px-4 pb-6 pt-4">
      <view class="flex gap-4">
        <button class="rounded-lg bg-gray-200 px-6 py-3 text-sm text-gray-800" @click="handleClear">
          清空
        </button>
        <button class="rounded-lg bg-blue-500 px-6 py-3 text-sm text-white" @click="handleSave">
          保存
        </button>
        <button class="rounded-lg bg-blue-500 px-6 py-3 text-sm text-white" @click="handleSaveAndShare">
          保存并分享
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding-bottom: 100px;
}
</style>
