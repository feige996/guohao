<script lang="ts" setup>
import { ref } from 'vue'

// 返回上一页
function navigateBack() {
  uni.navigateBack()
}

// 页面配置
definePage({
  style: {
    navigationBarTitleText: '医生档案',
  },
})

// 模拟医生信息数据
const doctorInfo = ref({
  name: '李浩',
  title: '主任医师',
  department: '内分泌科',
  hospital: '国浩中医院',
  gender: '男',
  phone: '',
  experienceYears: '',
  titleDetail: '主任医师',
  businessTags: '',
  education: '',
  graduatedSchool: '',
  teacherName: '',
})

// 业务标签下拉选项
const businessTagsOptions = [
  '糖尿病',
  '高血压',
  '甲状腺疾病',
  '肥胖症',
  '代谢综合征',
  '骨质疏松',
  '内分泌失调',
  '痛风',
]

// 控制下拉菜单显示状态
const isTagsDropdownVisible = ref(false)

// 切换下拉菜单显示/隐藏
function toggleTagsDropdown() {
  isTagsDropdownVisible.value = !isTagsDropdownVisible.value
}

// 选择标签
function selectTag(tag: string) {
  // 如果已有标签，添加逗号分隔
  if (doctorInfo.value.businessTags) {
    // 检查是否已经包含该标签
    const existingTags = doctorInfo.value.businessTags.split(',')
    if (!existingTags.includes(tag)) {
      doctorInfo.value.businessTags = `${doctorInfo.value.businessTags},${tag}`
    }
  }
  else {
    doctorInfo.value.businessTags = tag
  }
  // 选择后关闭下拉菜单
  isTagsDropdownVisible.value = false
}

// 保存表单数据
function handleSave() {
  console.log('保存医生档案信息:', doctorInfo.value)
  // 这里可以添加API调用逻辑
  uni.showToast({
    title: '保存成功',
    icon: 'success',
    duration: 2000,
  })
}

// 处理认证按钮点击
function handleAuthenticationClick() {
  console.log('点击了我的认证按钮')
  // 跳转到认证页面
  uni.navigateTo({
    url: '/pages/doctor/me/authentication'
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
      <text class="text-lg font-medium">我的专业档案</text>
    </view>

    <!-- 顶部医生信息卡片 -->
    <view class="bg-white p-4">
      <view class="flex items-center">
        <!-- 医生头像 -->
        <view class="h-20 w-20 flex items-center justify-center border-2 border-gray-200 rounded-full bg-gray-100">
          <text class="text-4xl">👨‍⚕️</text>
        </view>

        <!-- 医生信息 -->
        <view class="ml-4 flex-1">
          <view class="flex items-center justify-between">
            <view>
              <text class="text-xl font-semibold">{{ doctorInfo.name }}</text>
              <text class="ml-2 text-base text-gray-600">{{ doctorInfo.title }}</text>
            </view>
            <!-- 我的认证按钮 -->
            <button
              class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 font-medium"
              @click="handleAuthenticationClick"
            >
              我的认证
            </button>
          </view>
          <view class="mt-1">
            <text class="text-sm text-gray-500">{{ doctorInfo.department }}，{{ doctorInfo.hospital }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 警告提示 -->
    <view class="m-4 border border-yellow-200 rounded-lg bg-yellow-50 p-3">
      <view class="flex items-start">
        <text class="mr-2 text-xl text-yellow-500">⚠️</text>
        <text class="flex-1 text-sm text-gray-700">
          以下信息将展示给患者，请认真填写。
        </text>
      </view>
    </view>

    <!-- 表单区域 -->
    <view class="mb-20 bg-white">
      <!-- 专业档案标题 -->
      <view class="border-b border-gray-100 p-4">
        <text class="text-base font-medium">专业档案</text>
      </view>

      <!-- 表单项 -->
      <view class="px-4">
        <!-- 医生姓名 -->
        <view class="mt-6 space-y-4">
          <view>
            <text class="mb-2 block text-base">医生姓名</text>
            <input
              v-model="doctorInfo.name"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="请输入医生姓名"
            >
          </view>

          <!-- 性别选择 -->
          <view>
            <text class="mb-2 block text-base">性别</text>
            <view class="flex space-x-4">
              <view
                class="flex flex-1 cursor-pointer items-center justify-center border rounded-lg px-4 py-2 transition-colors"
                :class="doctorInfo.gender === '男' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
                @click="doctorInfo.gender = '男'"
              >
                <text :class="doctorInfo.gender === '男' ? 'text-green-500 font-medium' : 'text-gray-700'">男</text>
              </view>
              <view
                class="flex flex-1 cursor-pointer items-center justify-center border rounded-lg px-4 py-2 transition-colors"
                :class="doctorInfo.gender === '女' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
                @click="doctorInfo.gender = '女'"
              >
                <text :class="doctorInfo.gender === '女' ? 'text-green-500 font-medium' : 'text-gray-700'">女</text>
              </view>
            </view>
          </view>

          <!-- 手机号码 -->
          <view>
            <text class="mb-2 block text-base">手机号码</text>
            <input
              v-model="doctorInfo.phone"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="仅用于平台联系"
            >
          </view>

          <!-- 从业年限 -->
          <view>
            <text class="mb-2 block text-base">从业年限</text>
            <div class="relative">
              <input
                v-model="doctorInfo.experienceYears"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-base"
                placeholder="请输入从业年限"
                type="number"
              >
              <text class="absolute right-4 top-1/2 transform text-base -translate-y-1/2">年</text>
            </div>
          </view>
        </view>

        <view class="mt-6 space-y-4">
          <!-- 职称 -->
          <view>
            <text class="mb-2 block text-base">职称</text>
            <input
              v-model="doctorInfo.titleDetail"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="请输入职称"
            >
          </view>

          <!-- 业务标签 -->
          <view class="relative">
            <text class="mb-2 block text-base">业务标签</text>
            <div class="relative">
              <input
                v-model="doctorInfo.businessTags"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base"
                placeholder="从清单中选择"
                readonly
              >
              <button
                class="absolute right-2 top-1/2 transform rounded bg-gray-100 px-3 py-1 text-gray-600 -translate-y-1/2"
                @click.stop="toggleTagsDropdown"
              >
                选择 ▼
              </button>
            </div>

            <!-- 下拉选项列表 -->
            <view
              v-if="isTagsDropdownVisible"
              class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg"
              @click.stop
            >
              <view
                v-for="tag in businessTagsOptions"
                :key="tag"
                class="cursor-pointer border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
                @click="selectTag(tag)"
              >
                {{ tag }}
              </view>
            </view>
          </view>

          <!-- 教育和师承 -->
          <view>
            <text class="mb-2 block text-base">教育和师承</text>
            <input
              v-model="doctorInfo.education"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="请输入学历与师承"
            >
          </view>

          <!-- 毕业院校 -->
          <view>
            <text class="mb-2 block text-base">毕业院校</text>
            <input
              v-model="doctorInfo.graduatedSchool"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="请输入毕业院校"
            >
          </view>

          <!-- 师承导师 -->
          <view>
            <text class="mb-2 block text-base">师承导师</text>
            <input
              v-model="doctorInfo.teacherName"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="请输入导师姓名"
            >
          </view>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
      <button class="w-full rounded-lg bg-green-500 py-3 text-base text-white font-medium" @click="handleSave">
        保存
      </button>
    </view>
  </view>
</template>
