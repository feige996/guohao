<script lang="ts" setup>
import { ref } from 'vue'

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '我的认证',
  },
})

// 模拟医生认证数据
const doctorAuth = ref({
  realName: '',
  idCard: '',
  department: '',
  practiceScope: '',
  title: '',
  doctorPracticeLocation: '',
  practiceLicenseNumber: '',
  expiryDate: '',
  practiceLicenseSignDate: '',
})

// 控制选项卡显示
const activeTab = ref('qualification') // 'qualification' | 'later'

// 切换选项卡
function switchTab(tab: string) {
  activeTab.value = tab
}

// 处理证件上传
function handleUploadDocument(type: string) {
  console.log(`上传${type}证件`)
  // 这里可以添加文件上传逻辑
  uni.chooseImage({
    count: 5,
    success: (res) => {
      console.log('选择的图片:', res.tempFilePaths)
      // 这里可以添加上传图片的API调用
    },
  })
}

// 处理日期选择
function handleDateSelect(type: string) {
  console.log(`选择${type}日期`)
  uni.datePicker({
    success: (res) => {
      if (type === 'expiry') {
        doctorAuth.value.expiryDate = res.value
      }
      else if (type === 'sign') {
        doctorAuth.value.practiceLicenseSignDate = res.value
      }
    },
  })
}

// 处理选择科室
function handleSelectDepartment() {
  console.log('选择科室')
  // 这里可以添加科室选择逻辑，例如弹出选择器
  const departments = ['内科', '外科', '妇产科', '儿科', '眼科', '耳鼻喉科', '口腔科', '皮肤科', '精神心理科', '中医科']

  uni.showActionSheet({
    itemList: departments,
    success: (res) => {
      doctorAuth.value.department = departments[res.tapIndex]
    },
  })
}

// 处理选择职称
function handleSelectTitle() {
  console.log('选择职称')
  // 这里可以添加职称选择逻辑
  const titles = ['住院医师', '主治医师', '副主任医师', '主任医师']

  uni.showActionSheet({
    itemList: titles,
    success: (res) => {
      doctorAuth.value.title = titles[res.tapIndex]
    },
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100">
    <!-- 返回栏 -->
    <view class="h-12 flex items-center justify-center border-b border-gray-200 bg-white">
      <view class="absolute left-4">
        <view class="text-base text-gray-700" style="padding: 8px 0;" @click="navigateBack">
          &lt;
        </view>
      </view>
      <text class="text-lg font-medium">我的认证</text>
    </view>

    <!-- 医生信息卡片 -->
    <view class="bg-white p-4">
      <view class="flex items-center">
        <!-- 医生头像 -->
        <view class="h-20 w-20 flex items-center justify-center border-2 border-gray-200 rounded-full bg-gray-100">
          <text class="text-4xl">👨‍⚕️</text>
        </view>

        <!-- 医生信息 -->
        <view class="ml-4 flex-1">
          <text class="text-xl font-semibold">李浩</text>
          <text class="ml-2 text-base text-gray-600">内科专家</text>
          <view class="mt-1">
            <text class="text-sm text-gray-500">国浩中医院</text>
          </view>
        </view>

        <!-- 设置图标 -->
        <view class="text-xl text-gray-400">
          ⚙️
        </view>
      </view>
    </view>

    <!-- 选项卡切换 -->
    <view class="flex border-b border-gray-200 bg-white">
      <view
        class="relative flex-1 py-4 text-center text-base font-medium transition-colors"
        :class="activeTab === 'qualification' ? 'text-green-500' : 'text-gray-600'"
        @click="switchTab('qualification')"
      >
        资质认证
        <view v-if="activeTab === 'qualification'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
      </view>
      <view
        class="relative flex-1 py-4 text-center text-base font-medium transition-colors"
        :class="activeTab === 'later' ? 'text-green-500' : 'text-gray-600'"
        @click="switchTab('later')"
      >
        稍后认证
        <view v-if="activeTab === 'later'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
      </view>
    </view>

    <!-- 认证表单区域 -->
    <view v-if="activeTab === 'qualification'" class="mt-3 bg-white">
      <!-- 资料信息标题 -->
      <view class="border-b border-gray-100 p-4">
        <text class="text-base font-medium">资料信息</text>
      </view>

      <!-- 表单项 -->
      <view class="px-4 py-3">
        <!-- 真实姓名 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">真实姓名</text>
            <text class="text-red-500">*</text>
          </view>
          <input
            v-model="doctorAuth.realName"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="用于核实真实身份"
          >
        </view>

        <!-- 身份证号 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">身份证号</text>
            <text class="text-red-500">*</text>
          </view>
          <input
            v-model="doctorAuth.idCard"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="用于核实真实身份"
          >
        </view>

        <!-- 科室 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">科室</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            @click="handleSelectDepartment"
          >
            <text v-if="doctorAuth.department" class="text-gray-800">{{ doctorAuth.department }}</text>
            <text v-else class="text-gray-400">请选择科室</text>
            <text class="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2">›</text>
          </view>
        </view>

        <!-- 执业范围 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">执业范围</text>
            <text class="text-red-500">*</text>
          </view>
          <input
            v-model="doctorAuth.practiceScope"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="请输入主执业地点全称"
          >
        </view>

        <!-- 职称 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">职称</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            @click="handleSelectTitle"
          >
            <text v-if="doctorAuth.title" class="text-gray-800">{{ doctorAuth.title }}</text>
            <text v-else class="text-gray-400">请选择职称</text>
            <text class="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2">›</text>
          </view>
        </view>

        <!-- 职称证明 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">职称证明</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative h-24 w-full flex cursor-pointer items-center justify-center border-2 border-gray-300 rounded-lg border-dashed"
            @click="handleUploadDocument('职称证明')"
          >
            <text class="text-4xl">+</text>
            <text class="absolute bottom-3 text-sm text-gray-500">限上传5张</text>
          </view>
        </view>

        <!-- 医生执业地点 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">医生执业地点</text>
            <text class="text-red-500">*</text>
          </view>
          <input
            v-model="doctorAuth.doctorPracticeLocation"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="请输入主执业地点"
          >
        </view>

        <!-- 执业证书编号 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">执业证书编号</text>
            <text class="text-red-500">*</text>
          </view>
          <input
            v-model="doctorAuth.practiceLicenseNumber"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            placeholder="请输入执业证书编号"
          >
        </view>

        <!-- 有效期 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">有效期</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            @click="handleDateSelect('expiry')"
          >
            <text v-if="doctorAuth.expiryDate" class="text-gray-800">{{ doctorAuth.expiryDate }}</text>
            <text v-else class="text-gray-400">请选择执业证书有效期</text>
            <text class="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2">›</text>
          </view>
        </view>

        <!-- 执业证书 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">执业证书</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative h-24 w-full flex cursor-pointer items-center justify-center border-2 border-gray-300 rounded-lg border-dashed"
            @click="handleUploadDocument('执业证书')"
          >
            <text class="text-4xl">+</text>
            <text class="absolute bottom-3 text-sm text-gray-500">限上传5张</text>
          </view>
        </view>

        <!-- 执业证书签发时间 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">执业证书签发时间</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
            @click="handleDateSelect('sign')"
          >
            <text v-if="doctorAuth.practiceLicenseSignDate" class="text-gray-800">{{ doctorAuth.practiceLicenseSignDate }}</text>
            <text v-else class="text-gray-400">请选择执业证书签发时间</text>
            <text class="absolute right-4 top-1/2 text-gray-400 -translate-y-1/2">›</text>
          </view>
          <text class="mt-2 text-sm text-red-500">未获3年优先开具处方</text>
        </view>

        <!-- 资格证明 -->
        <view class="mb-6">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">资格证明</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative h-24 w-full flex cursor-pointer items-center justify-center border-2 border-gray-300 rounded-lg border-dashed"
            @click="handleUploadDocument('资格证明')"
          >
            <text class="text-4xl">+</text>
            <text class="absolute bottom-3 text-sm text-gray-500">限上传5张</text>
          </view>
        </view>

        <!-- 电子证照 -->
        <view class="mb-16">
          <view class="mb-2 flex items-center">
            <text class="mr-1 text-base">电子证照</text>
            <text class="text-red-500">*</text>
          </view>
          <view
            class="relative h-24 w-full flex cursor-pointer items-center justify-center border-2 border-gray-300 rounded-lg border-dashed"
            @click="handleUploadDocument('电子证照')"
          >
            <text class="text-4xl">+</text>
            <text class="absolute bottom-3 text-sm text-gray-500">限上传5张</text>
          </view>

          <!-- 电子证照示意图 -->
          <view class="mt-4 border border-gray-200 rounded-lg bg-gray-50 p-3">
            <text class="mb-2 block text-sm text-gray-600">电子证照示意图</text>
            <view class="h-24 w-full flex items-center justify-center rounded-lg bg-white">
              <text class="text-sm text-gray-500">医师执业电子证照示例</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 稍后认证区域 -->
    <view v-else-if="activeTab === 'later'" class="mt-3 bg-white p-6">
      <view class="flex flex-col items-center justify-center py-16">
        <text class="mb-4 text-6xl">⏰</text>
        <text class="mb-2 text-lg font-medium">稍后认证</text>
        <text class="text-center text-sm text-gray-500">
          您可以稍后再完成认证流程
          完成认证后可以获得更多功能权限
        </text>
        <button
          class="mt-6 rounded-lg bg-green-500 px-8 py-3 text-white font-medium"
          @click="switchTab('qualification')"
        >
          立即认证
        </button>
      </view>
    </view>
  </view>
</template>
