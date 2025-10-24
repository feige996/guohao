<script setup lang="ts">
import { onMounted, ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '新建处方',
    backgroundColor: '#f5f5f5'
  }
})

// 处方信息
const prescriptionName = ref('益气通瘀汤')
const prescriptionEffect = ref('益气宁心，活血祛瘀。')

// 药材项接口
interface MedicinalItem {
  id: number;
  name: string;
  amount: string;
  isNew?: boolean;
}

// 药材列表
const medicinalList = ref<MedicinalItem[]>([
  { id: 1, name: '太子参', amount: '15' },
  { id: 2, name: '枣仁', amount: '15' },
  { id: 3, name: '苏木', amount: '15' },
  { id: 4, name: '降香', amount: '15' }
])

// 下一个药材ID
let nextId = 5

// 保存处方
function savePrescription(): void {
  console.log('保存处方', {
    name: prescriptionName.value,
    effect: prescriptionEffect.value,
    medicines: medicinalList.value
  })
  uni.showToast({
    title: '处方已保存',
    icon: 'success'
  })
}

// 发布处方，跳转到处方使用页面
function publishPrescription(): void {
  console.log('发布处方')
  // 保存处方信息到全局，供处方使用页面获取
  try {
    uni.setStorageSync('currentPrescription', JSON.stringify({
      name: prescriptionName.value,
      effect: prescriptionEffect.value,
      medicines: medicinalList.value
    }))
    
    // 跳到处方使用页面
    uni.navigateTo({
      url: '/pages/doctor/diagnosis/prescriptionUsage'
    })
  } catch (e) {
    console.error('保存处方信息失败', e)
    uni.showToast({
      title: '发布失败，请重试',
      icon: 'none'
    })
  }
}

// 删除处方
function deletePrescription(): void {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除当前处方吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('删除处方')
        uni.showToast({
          title: '处方已删除',
          icon: 'success'
        })
        // 返回上一页
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    }
  })
}

// 增加药材
function addMedicinal(): void {
  console.log('增加药材')
  // 跳转到药材名单页面
  uni.navigateTo({
    url: '/pages/doctor/diagnosis/medicinalList'
  })
}

// 返回上一页
function handleBack(): void {
  uni.navigateBack()
}

// 更新药材名称
function updateMedicinalName(id: number, name: string): void {
  const index = medicinalList.value.findIndex(item => item.id === id)
  if (index !== -1) {
    medicinalList.value[index].name = name
  }
}

// 更新药材剂量
function updateMedicinalAmount(id: number, amount: string): void {
  const index = medicinalList.value.findIndex(item => item.id === id)
  if (index !== -1) {
    medicinalList.value[index].amount = amount
  }
}

// 删除药材项
function removeMedicinal(id: number): void {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这味药材吗？',
    success: (res) => {
      if (res.confirm) {
        medicinalList.value = medicinalList.value.filter(item => item.id !== id)
      }
    }
  })
}

// 页面加载时检查是否有选中的药材
onMounted(() => {
  try {
    // 页面加载时从本地存储获取处方信息
    const savedPrescription = uni.getStorageSync('currentPrescription')
    if (savedPrescription) {
      try {
        const parsed = JSON.parse(savedPrescription)
        prescriptionName.value = parsed.name || ''
        prescriptionEffect.value = parsed.effect || ''
        
        if (parsed.medicines && Array.isArray(parsed.medicines)) {
          medicinalList.value = parsed.medicines
        }
      } catch (e) {
        console.error('解析处方数据失败', e)
      }
    }
    
    // 检查是否有选中的药材
    const selectedMedicinal = uni.getStorageSync('selectedMedicinal')
    if (selectedMedicinal) {
      const medicinal = JSON.parse(selectedMedicinal)
      medicinalList.value.push({
        id: nextId++,
        name: medicinal.name,
        amount: '15' // 默认剂量
      })
      // 清除临时存储
      uni.removeStorageSync('selectedMedicinal')
    }
  } catch (e) {
    console.error('获取选中药材失败', e)
  }
})
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5] pb-20">
    <!-- 返回栏 -->
    <view class="header-bar flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <view class="w-8">
        <text class="text-lg" @click="handleBack">&lt;</text>
      </view>
      <view class="text-center flex-1">
        <text class="text-lg font-medium">新建处方</text>
      </view>
      <view class="w-8"></view>
    </view>
    <!-- 顶部操作栏 -->
    <view class="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <button class="text-green-500" @click="savePrescription">保存</button>
      <button class="text-blue-500" @click="publishPrescription">发布</button>
      <button class="text-red-500" @click="deletePrescription">删除</button>
    </view>

    <!-- 处方信息 -->
    <view class="mb-4 mt-2 space-y-4 px-4">
      <!-- 处方名称 -->
      <view class="space-y-2">
        <text class="text-sm text-gray-500">处方名称:</text>
        <input
          v-model="prescriptionName"
          class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
          placeholder="请输入处方名称"
        />
      </view>

      <!-- 处方功用 -->
      <view class="space-y-2">
        <text class="text-sm text-gray-500">处方功用:</text>
        <input
          v-model="prescriptionEffect"
          class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
          placeholder="请输入处方功用"
        />
      </view>
    </view>

    <!-- 药材列表 -->
    <view class="mb-6 bg-white px-4 pt-4">
      <view class="mb-4 flex items-center justify-between">
        <text class="text-base font-medium">药材名单</text>
        <text class="text-sm text-gray-500">剂量 (g)</text>
      </view>

      <!-- 药材项 -->
      <view class="space-y-4 pb-4">
        <view
          v-for="(item, index) in medicinalList"
          :key="item.id"
          class="flex items-center justify-between"
        >
          <!-- 序号 -->
          <text class="mr-2 w-4 text-center text-sm text-gray-500">{{ index + 1 }}</text>
          
          <!-- 药材名称 -->
          <input
            v-model="item.name"
            class="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-gray-800 placeholder:text-gray-400"
            placeholder="输入药材名"
          />
          
          <!-- 剂量 -->
          <input
            v-model="item.amount"
            class="ml-3 w-20 rounded-lg border border-gray-200 px-3 py-2 text-center text-gray-800"
            type="number"
          />
          
          <!-- 删除按钮 -->
          <text
            class="ml-3 text-red-500"
            @click="removeMedicinal(item.id)"
          >
            ✕
          </text>
        </view>

        <!-- 新增药材项 -->
        <view class="flex items-center justify-between">
          <text class="mr-2 w-4 text-center text-sm text-gray-500">{{ medicinalList.length + 1 }}</text>
          <input
            class="flex-1 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-gray-400 placeholder:text-gray-400"
            placeholder="输入药材名"
            disabled
          />
          <input
            class="ml-3 w-20 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-center text-gray-400"
            type="number"
            value="15"
            disabled
          />
        </view>
      </view>

      <!-- 增加按钮 -->
      <view class="flex justify-center border-t border-gray-100 pt-4">
        <button
          class="flex items-center justify-center rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-500"
          @click="addMedicinal"
        >
          <text class="mr-1 text-base">+</text>
          增加
        </button>
      </view>
    </view>
  </view>
</template>