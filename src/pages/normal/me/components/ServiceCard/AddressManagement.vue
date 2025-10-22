<script setup lang="ts">
import { reactive, ref } from 'vue'

// 定义表单数据结构
interface AddressForm {
  name: string
  phone: string
  region: string
  detailAddress: string
  tags: string[]
  default: boolean
}

// 表单数据
const formData = reactive<AddressForm>({
  name: '',
  phone: '',
  region: '',
  detailAddress: '',
  tags: [],
  default: false,
})

// 预定义的地址标签
const predefinedTags = [
  { label: '家', value: 'home' },
  { label: '公司', value: 'company' },
  { label: '学校', value: 'school' },
]

// 当前选中的标签
const selectedTag = ref<string>('')

// 处理标签选择
function handleTagSelect(tag: string) {
  selectedTag.value = tag
  // 这里可以根据需要添加逻辑，比如限制只能选一个标签
  formData.tags = [tag]
}

// 处理地区选择
function handleRegionSelect() {
  // 这里应该调用地区选择器组件，暂时使用模拟数据
  // 实际项目中可以使用uni-app的内置选择器或自定义组件
  uni.showActionSheet({
    itemList: ['北京市', '上海市', '广东省'],
    success: (res) => {
      const regions = ['北京市', '上海市', '广东省']
      formData.region = regions[res.tapIndex]
    },
  })
}

// 添加自定义标签
function handleAddCustomTag() {
  uni.showModal({
    title: '添加标签',
    content: '请输入自定义标签名称',
    editable: true,
    placeholderText: '请输入标签名称',
    success: (res) => {
      if (res.confirm && res.content) {
        // 实际项目中应该更新标签列表并选择新标签
        uni.showToast({ title: '标签添加成功', icon: 'success' })
      }
    },
  })
}

// 保存地址
function handleSaveAddress() {
  // 表单验证
  if (!formData.name.trim()) {
    uni.showToast({ title: '请输入收货人姓名', icon: 'none' })
    return
  }

  if (!formData.phone.trim()) {
    uni.showToast({ title: '请输入手机号码', icon: 'none' })
    return
  }

  // 简单的手机号验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.phone)) {
    uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
    return
  }

  if (!formData.region) {
    uni.showToast({ title: '请选择所在地区', icon: 'none' })
    return
  }

  if (!formData.detailAddress.trim()) {
    uni.showToast({ title: '请输入详细地址', icon: 'none' })
    return
  }

  // 模拟保存操作
  uni.showLoading({ title: '保存中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '保存成功', icon: 'success' })

    // 保存成功后返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="address-management-container min-h-screen bg-[#f6e2d3]">
    <!-- 顶部导航栏 -->
    <view class="header flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <view class="back-button" @click="handleBack">
        <uni-icons type="left" size="20" color="#333" />
      </view>
      <view class="title text-lg text-gray-800 font-medium">
        新建地址
      </view>
      <view class="w-8" /> <!-- 占位，保持标题居中 -->
    </view>

    <!-- 表单内容 -->
    <view class="form-container mt-2 bg-white">
      <!-- 收货人姓名 -->
      <view class="form-item flex items-center border-b border-gray-100 px-4 py-3">
        <view class="label w-20 text-gray-700">
          收货人姓名
        </view>
        <input
          v-model="formData.name"
          class="input flex-1 text-gray-800"
          type="text"
          placeholder="请输入收货人姓名"
        >
      </view>

      <!-- 收货人手机号码 -->
      <view class="form-item flex items-center border-b border-gray-100 px-4 py-3">
        <view class="label w-28 text-gray-700">
          收货人手机号码
        </view>
        <input
          v-model="formData.phone"
          class="input flex-1 text-gray-800"
          type="tel"
          placeholder="请输入手机号码"
        >
      </view>

      <!-- 所在地区 -->
      <view
        class="form-item flex items-center justify-between border-b border-gray-100 px-4 py-3"
        @click="handleRegionSelect"
      >
        <view class="label w-20 text-gray-700">
          所在地区
        </view>
        <view class="region-value flex flex-1 items-center justify-between">
          <text class="text-gray-800">{{ formData.region || '请选择' }}</text>
          <uni-icons type="right" size="16" color="#999" />
        </view>
      </view>

      <!-- 详细地址 -->
      <view class="form-item px-4 py-3">
        <view class="label mb-2 w-20 text-gray-700">
          详细地址
        </view>
        <textarea
          v-model="formData.detailAddress"
          class="textarea h-24 w-full border border-gray-200 rounded-md px-3 py-2 text-gray-800"
          placeholder="如街道、小区、门牌号、单元室等"
        />
      </view>
    </view>

    <!-- 地址标签 -->
    <view class="tags-container mt-2 bg-white px-4 py-3">
      <view class="label mb-3 text-gray-700">
        地址标签
      </view>
      <view class="tags flex flex-wrap gap-2">
        <view
          v-for="tag in predefinedTags"
          :key="tag.value"
          class="tag border rounded-full px-3 py-1 text-sm"
          :class="{
            'border-red-500 text-red-500 bg-red-50': selectedTag === tag.value,
            'border-gray-200 text-gray-600': selectedTag !== tag.value,
          }"
          @click="handleTagSelect(tag.value)"
        >
          {{ tag.label }}
        </view>
        <view
          class="tag-add flex items-center justify-center border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-600"
          @click="handleAddCustomTag"
        >
          <uni-icons type="plusempty" size="14" class="mr-1" />
          +
        </view>
      </view>
    </view>

    <!-- 设置默认地址 -->
    <view class="mt-2 flex items-center justify-between bg-white px-4 py-3 default-container">
      <view class="label text-gray-700">
        设置默认地址
      </view>
      <switch v-model="formData.default" color="#d4380d" />
    </view>

    <!-- 保存按钮 -->
    <view class="save-button-container flex justify-center items-center mt-6">
      <button 
        class="save-button w-[calc(100%-2rem)] py-2 rounded-md text-white font-medium"
        style="background-color: #d4380d"
        @click="handleSaveAddress"
      >
        保存
      </button>
    </view>
  </view>
</template>
