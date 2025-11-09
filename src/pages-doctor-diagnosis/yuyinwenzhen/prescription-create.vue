<script setup lang="ts" charset="utf-8">
import { computed, ref } from 'vue'

// 自定义toast函数替代不存在的模块
function showToast(message: string, duration: number = 2000): void {
  uni.showToast({
    title: message,
    icon: 'none',
    duration,
  })
}

// 定义类型接口
interface Medicine {
  id: string
  name: string
  specification: string
  unit: string
  quantity: number
  price: number
  category: string
  type: 'granule' | 'decoction' | 'mixture'
}

interface Template {
  id: string
  name: string
  type: 'granule' | 'decoction' | 'mixture'
  functionDescription: string
  mainTreatment: string
  usageMethod: string
  medicines: Medicine[]
}

// 响应式状态
const toastVisible = ref(false)
const toastMessage = ref('')
// 修改处方类型定义，包含'all'选项
const prescriptionType = ref<'all' | 'granule' | 'decoction' | 'mixture'>('granule')
const dosageCount = ref(7)
const functionDescription = ref('')
const mainTreatment = ref('')
const usageMethod = ref('')
const templateModalVisible = ref(false)
const medicineModalVisible = ref(false)
const functionSelectorVisible = ref(false)
const mainTreatmentSelectorVisible = ref(false)

// 药品和模板数据
const medicines = ref<Medicine[]>([])
const templates = ref<Template[]>([
  {
    id: '1',
    name: '麻黄汤',
    type: 'decoction',
    functionDescription: '发汗解表，宣肺平喘',
    mainTreatment: '外感风寒表实证',
    usageMethod: '水煎服，每日一剂',
    medicines: [
      { id: '1', name: '麻黄', specification: '10g', unit: 'g', quantity: 10, price: 5.2, category: '解表药', type: 'decoction' },
      { id: '2', name: '桂枝', specification: '10g', unit: 'g', quantity: 10, price: 4.5, category: '解表药', type: 'decoction' },
      { id: '3', name: '杏仁', specification: '10g', unit: 'g', quantity: 10, price: 6.8, category: '止咳平喘药', type: 'decoction' },
      { id: '4', name: '甘草', specification: '6g', unit: 'g', quantity: 6, price: 3.2, category: '补虚药', type: 'decoction' },
    ],
  },
  {
    id: '2',
    name: '桂枝汤',
    type: 'decoction',
    functionDescription: '解肌发表，调和营卫',
    mainTreatment: '外感风寒表虚证',
    usageMethod: '水煎服，每日一剂',
    medicines: [
      { id: '5', name: '桂枝', specification: '12g', unit: 'g', quantity: 12, price: 4.5, category: '解表药', type: 'decoction' },
      { id: '6', name: '芍药', specification: '12g', unit: 'g', quantity: 12, price: 7.3, category: '补虚药', type: 'decoction' },
      { id: '7', name: '甘草', specification: '6g', unit: 'g', quantity: 6, price: 3.2, category: '补虚药', type: 'decoction' },
      { id: '8', name: '生姜', specification: '3片', unit: '片', quantity: 3, price: 1.5, category: '解表药', type: 'decoction' },
      { id: '9', name: '大枣', specification: '12枚', unit: '枚', quantity: 12, price: 8.0, category: '补虚药', type: 'decoction' },
    ],
  },
])

// 药品数据库（模拟）
const medicineDatabase = ref<Medicine[]>([
  { id: '1', name: '麻黄', specification: '10g', unit: 'g', quantity: 10, price: 5.2, category: '解表药', type: 'decoction' },
  { id: '2', name: '桂枝', specification: '10g', unit: 'g', quantity: 10, price: 4.5, category: '解表药', type: 'decoction' },
  { id: '3', name: '杏仁', specification: '10g', unit: 'g', quantity: 10, price: 6.8, category: '止咳平喘药', type: 'decoction' },
  { id: '4', name: '甘草', specification: '6g', unit: 'g', quantity: 6, price: 3.2, category: '补虚药', type: 'decoction' },
  { id: '5', name: '麻黄颗粒', specification: '10g', unit: 'g', quantity: 10, price: 8.5, category: '解表药', type: 'granule' },
  { id: '6', name: '桂枝颗粒', specification: '10g', unit: 'g', quantity: 10, price: 7.8, category: '解表药', type: 'granule' },
  { id: '7', name: '杏仁颗粒', specification: '10g', unit: 'g', quantity: 10, price: 10.2, category: '止咳平喘药', type: 'granule' },
  { id: '8', name: '甘草颗粒', specification: '6g', unit: 'g', quantity: 6, price: 5.5, category: '补虚药', type: 'granule' },
])

// 常用功用和主治
const commonFunctions = [
  '发汗解表',
  '宣肺平喘',
  '清热解毒',
  '活血化瘀',
  '健脾利湿',
  '补气养血',
  '滋阴补肾',
  '温阳散寒',
]

const commonMainTreatments = [
  '外感风寒表实证',
  '外感风寒表虚证',
  '风热感冒',
  '湿热内蕴',
  '气血两虚',
  '肝肾阴虚',
  '脾肾阳虚',
  '气滞血瘀',
]

// 获取药品分类列表
function getCategories(): string[] {
  const categories: Set<string> = new Set()
  medicineDatabase.value.forEach(med => categories.add(med.category))
  return Array.from(categories)
}

// 获取类型名称
function getTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    all: '全部',
    granule: '颗粒剂',
    decoction: '饮片',
    mixture: '混合',
  }
  return typeMap[type] || type
}

// 过滤后的模板和药品列表
const filteredTemplates = computed(() => {
  if (prescriptionType.value === 'mixture' || prescriptionType.value === 'all') {
    return templates.value
  }
  return templates.value.filter(t => t.type === prescriptionType.value)
})

const filteredMedicines = computed(() => {
  if (prescriptionType.value === 'mixture' || prescriptionType.value === 'all') {
    return medicineDatabase.value
  }
  return medicineDatabase.value.filter(m => m.type === prescriptionType.value)
})

// 计算总金额
const totalAmount = computed(() => {
  const sum = medicines.value.reduce((acc, medicine) => {
    return acc + (medicine.price * medicine.quantity * dosageCount.value)
  }, 0)
  return sum
})

// 方法 - 使用function关键字声明
function goBack(): void {
  uni.navigateBack()
}

function selectPrescriptionType(type: 'granule' | 'decoction' | 'mixture'): void {
  prescriptionType.value = type
}

// 支持'all'类型的选择器函数
function setPrescriptionType(type: 'all' | 'granule' | 'decoction' | 'mixture'): void {
  prescriptionType.value = type
}

function openTemplateModal(): void {
  templateModalVisible.value = true
}

function closeTemplateModal(): void {
  templateModalVisible.value = false
}

function openMedicineModal(): void {
  medicineModalVisible.value = true
}

function closeMedicineModal(): void {
  medicineModalVisible.value = false
}

function openFunctionSelector(): void {
  functionSelectorVisible.value = true
}

function closeFunctionSelector(): void {
  functionSelectorVisible.value = false
}

function openMainTreatmentSelector(): void {
  mainTreatmentSelectorVisible.value = true
}

function closeMainTreatmentSelector(): void {
  mainTreatmentSelectorVisible.value = false
}

function selectFunction(func: string): void {
  if (functionDescription.value.trim() !== '') {
    functionDescription.value = `${functionDescription.value}、${func}`
  }
  else {
    functionDescription.value = func
  }
  functionSelectorVisible.value = false
  showToast(`已添加：${func}`)
}

function selectMainTreatment(treatment: string): void {
  if (mainTreatment.value.trim() !== '') {
    mainTreatment.value = `${mainTreatment.value}、${treatment}`
  }
  else {
    mainTreatment.value = treatment
  }
  mainTreatmentSelectorVisible.value = false
  showToast(`已添加：${treatment}`)
}

function addMedicineToList(medicine: Medicine): void {
  // 检查药品是否已存在
  const existingIndex = medicines.value.findIndex(m => m.id === medicine.id)

  if (existingIndex !== -1) {
    showToast('该药品已在处方中')
    return
  }

  // 添加新药品到列表
  medicines.value.push({ ...medicine })
  medicineModalVisible.value = false
  showToast(`已添加：${medicine.name}`)
}

function removeMedicine(index: number): void {
  medicines.value.splice(index, 1)
  showToast('已删除药品')
}

function updateMedicineQuantity(index: number, quantity: number): void {
  if (quantity > 0) {
    medicines.value[index].quantity = quantity
  }
}

function increaseDosageCount(): void {
  if (dosageCount.value < 30) {
    dosageCount.value++
  }
}

function decreaseDosageCount(): void {
  if (dosageCount.value > 1) {
    dosageCount.value--
  }
}

function setDosageCount(count: number): void {
  dosageCount.value = count
  showToast(`已设置为 ${count} 剂`)
}

function applyTemplate(template: Template): void {
  // 设置处方类型
  prescriptionType.value = template.type

  // 填充表单
  functionDescription.value = template.functionDescription
  mainTreatment.value = template.mainTreatment
  usageMethod.value = template.usageMethod

  // 清空并添加药品
  medicines.value = template.medicines.map(med => ({ ...med }))

  templateModalVisible.value = false
  showToast(`已应用模板：${template.name}`)
}

function saveAsTemplate(): void {
  if (medicines.value.length === 0) {
    showToast('处方中至少需要有一味药品才能保存为模板')
    return
  }

  // 这里应该是弹出一个输入模板名称的对话框，然后保存
  // 为了简单起见，这里直接提示
  showToast('模板保存功能待实现')
}

function submitPrescription(): void {
  // 验证
  if (medicines.value.length === 0) {
    showToast('请至少添加一味药品')
    return
  }

  if (functionDescription.value.trim() === '' || mainTreatment.value.trim() === '' || usageMethod.value.trim() === '') {
    showToast('请填写完整的处方信息')
    return
  }

  showToast('正在开具处方...')

  // 模拟API请求
  setTimeout(() => {
    showToast('处方开具成功 ✓', 2000)
    setTimeout(() => {
      // 返回上一页
      uni.navigateBack()
    }, 2000)
  }, 1500)
}

// 查看病历
function viewMedicalRecord(): void {
  showToast('查看病历功能待实现')
}
</script>

<template>
  <view class="min-h-screen flex flex-col bg-gray-50">
    <!-- Toast 通知 -->
    <transition name="fade">
      <view v-if="toastVisible" class="fixed left-1/2 top-20 z-50 transform rounded-lg bg-black/70 px-4 py-2 text-white -translate-x-1/2">
        {{ toastMessage }}
      </view>
    </transition>

    <!-- 模板选择弹窗 -->
    <transition name="slide">
      <view v-if="templateModalVisible" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <view class="max-h-[80vh] w-full overflow-y-auto rounded-t-lg bg-white" @click.stop>
          <view class="flex items-center justify-between border-b p-4">
            <h3 class="text-lg text-gray-800 font-bold">
              选择模板
            </h3>
            <button class="text-gray-500 hover:text-gray-800" @click="closeTemplateModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </view>
          <view class="p-4">
            <view class="mb-4 flex overflow-x-auto pb-2 space-x-2">
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-blue-500 text-white': prescriptionType === 'all' }"
                @click="setPrescriptionType('all')"
              >
                {{ getTypeName('all') }}
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-blue-500 text-white': prescriptionType === 'granule' }"
                @click="selectPrescriptionType('granule')"
              >
                {{ getTypeName('granule') }}
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-blue-500 text-white': prescriptionType === 'decoction' }"
                @click="selectPrescriptionType('decoction')"
              >
                {{ getTypeName('decoction') }}
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-blue-500 text-white': prescriptionType === 'mixture' }"
                @click="selectPrescriptionType('mixture')"
              >
                {{ getTypeName('mixture') }}
              </button>
            </view>
            <view class="space-y-3">
              <button
                v-for="template in filteredTemplates"
                :key="template.id"
                class="w-full border rounded-lg p-4 text-left transition-colors hover:bg-gray-50"
                @click="applyTemplate(template)"
              >
                <div class="flex items-start justify-between">
                  <h4 class="text-gray-800 font-medium">
                    {{ template.name }}
                  </h4>
                  <span
                    class="rounded-full px-2 py-0.5 text-xs"
                    :class="{
                      'bg-purple-100 text-purple-600': template.type === 'granule',
                      'bg-red-100 text-red-600': template.type === 'decoction',
                      'bg-orange-100 text-orange-600': template.type === 'mixture',
                    }"
                  >
                    {{ getTypeName(template.type) }}
                  </span>
                </div>
                <p class="mt-2 text-sm text-gray-600">
                  {{ template.functionDescription }}
                </p>
                <p class="mt-1 text-sm text-gray-600">
                  {{ template.mainTreatment }}
                </p>
                <p class="mt-2 text-xs text-gray-500">
                  {{ template.medicines.length }} 味药
                </p>
              </button>
              <div v-if="filteredTemplates.length === 0" class="py-8 text-center text-gray-500">
                暂无相关模板
              </div>
            </view>
          </view>
        </view>
      </view>
    </transition>

    <!-- 药品选择弹窗 -->
    <transition name="slide">
      <view v-if="medicineModalVisible" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <view class="max-h-[80vh] w-full overflow-y-auto rounded-t-lg bg-white" @click.stop>
          <view class="flex items-center justify-between border-b p-4">
            <h3 class="text-lg text-gray-800 font-bold">
              选择药品
            </h3>
            <button class="text-gray-500 hover:text-gray-800" @click="closeMedicineModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </view>
          <view class="p-4">
            <div class="mb-4">
              <input
                type="text"
                placeholder="搜索药品名称或规格"
                class="w-full border rounded-lg px-4 py-2 text-sm"
              >
            </div>
            <div class="mb-4 flex overflow-x-auto pb-2 space-x-2">
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                全部
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                解表药
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                清热药
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                止咳平喘药
              </button>
              <button
                class="whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                补虚药
              </button>
            </div>
            <div class="space-y-3">
              <button
                v-for="medicine in filteredMedicines"
                :key="medicine.id"
                class="w-full border rounded-lg p-4 text-left transition-colors hover:bg-gray-50"
                @click="addMedicineToList(medicine)"
              >
                <div class="flex items-start justify-between">
                  <h4 class="text-gray-800 font-medium">
                    {{ medicine.name }}
                  </h4>
                  <span
                    class="rounded-full px-2 py-0.5 text-xs"
                    :class="{
                      'bg-purple-100 text-purple-600': medicine.type === 'granule',
                      'bg-red-100 text-red-600': medicine.type === 'decoction',
                      'bg-orange-100 text-orange-600': medicine.type === 'mixture',
                    }"
                  >
                    {{ getTypeName(medicine.type) }}
                  </span>
                </div>
                <p class="mt-1 text-sm text-gray-600">
                  {{ medicine.specification }} / {{ medicine.unit }}
                </p>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-xs text-gray-500">{{ medicine.category }}</span>
                  <span class="text-sm text-gray-800 font-medium">¥{{ medicine.price.toFixed(2) }}</span>
                </div>
              </button>
            </div>
          </view>
        </view>
      </view>
    </transition>

    <!-- 功用选择器弹窗 -->
    <transition name="slide">
      <view v-if="functionSelectorVisible" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <view class="max-h-[80vh] w-full overflow-y-auto rounded-t-lg bg-white" @click.stop>
          <view class="flex items-center justify-between border-b p-4">
            <h3 class="text-lg text-gray-800 font-bold">
              选择功用
            </h3>
            <button class="text-gray-500 hover:text-gray-800" @click="closeFunctionSelector">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </view>
          <div class="p-4">
            <div class="mb-3 text-xs text-gray-500">
              点击可添加，用顿号分隔
            </div>
            <div class="max-h-[400px] overflow-y-auto pr-2 space-y-2">
              <button
                v-for="func in commonFunctions"
                :key="func"
                class="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 transition-colors hover:border-red-800 hover:bg-red-50 hover:text-red-800"
                @click="selectFunction(func)"
              >
                {{ func }}
              </button>
            </div>
          </div>
        </view>
      </view>
    </transition>

    <!-- 主治选择器弹窗 -->
    <transition name="slide">
      <view v-if="mainTreatmentSelectorVisible" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
        <view class="max-h-[80vh] w-full overflow-y-auto rounded-t-lg bg-white" @click.stop>
          <view class="flex items-center justify-between border-b p-4">
            <h3 class="text-lg text-gray-800 font-bold">
              选择主治
            </h3>
            <button class="text-gray-500 hover:text-gray-800" @click="closeMainTreatmentSelector">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </view>
          <div class="p-4">
            <div class="mb-3 text-xs text-gray-500">
              点击可添加，用顿号分隔
            </div>
            <div class="max-h-[400px] overflow-y-auto pr-2 space-y-2">
              <button
                v-for="treatment in commonMainTreatments"
                :key="treatment"
                class="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 transition-colors hover:border-red-800 hover:bg-red-50 hover:text-red-800"
                @click="selectMainTreatment(treatment)"
              >
                {{ treatment }}
              </button>
            </div>
          </div>
        </view>
      </view>
    </transition>

    <!-- 页面内容 -->
    <header class="bg-white shadow-sm">
      <div class="flex items-center justify-between px-4 py-3">
        <button class="p-1 text-gray-700" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <h1 class="text-lg text-gray-800 font-bold">
          开具处方
        </h1>
        <button class="border border-red-800 rounded-full px-3 py-1 text-sm text-red-800 transition-colors hover:bg-red-50" @click="openTemplateModal">
          选择模板
        </button>
      </div>
    </header>

    <main class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 患者信息 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <view class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
              <span class="text-blue-600 font-medium">王女士</span>
            </view>
            <div>
              <h3 class="text-gray-800 font-medium">
                王女士
              </h3>
              <p class="text-sm text-gray-500">
                28岁 | 女
              </p>
            </div>
          </div>
          <button class="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200" @click="viewMedicalRecord">
            查看病历
          </button>
        </div>
      </view>

      <!-- 处方类型选择 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-base text-gray-800 font-medium">
          处方类型
        </h2>
        <div class="grid grid-cols-3 gap-3">
          <button
            class="border border-gray-200 rounded-lg bg-gray-50 p-3 text-center text-gray-600"
            :class="{ 'bg-purple-100 text-purple-700 border-2 border-purple-500': prescriptionType === 'granule' }"
            @click="selectPrescriptionType('granule')"
          >
            <div class="mb-1 text-xl">
              💊
            </div>
            <div class="text-sm font-medium">
              颗粒剂
            </div>
          </button>
          <button
            class="border border-gray-200 rounded-lg bg-gray-50 p-3 text-center text-gray-600"
            :class="{ 'bg-red-100 text-red-700 border-2 border-red-500': prescriptionType === 'decoction' }"
            @click="selectPrescriptionType('decoction')"
          >
            <div class="mb-1 text-xl">
              🌿
            </div>
            <div class="text-sm font-medium">
              饮片
            </div>
          </button>
          <button
            class="border border-gray-200 rounded-lg bg-gray-50 p-3 text-center text-gray-600"
            :class="{ 'bg-orange-100 text-orange-700 border-2 border-orange-500': prescriptionType === 'mixture' }"
            @click="selectPrescriptionType('mixture')"
          >
            <div class="mb-1 text-xl">
              ⚖️
            </div>
            <div class="text-sm font-medium">
              混合
            </div>
          </button>
        </div>
      </view>

      <!-- 处方信息 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <h2 class="mb-3 text-base text-gray-800 font-medium">
          处方信息
        </h2>

        <!-- 功用 -->
        <div class="mb-4">
          <label class="mb-1 block text-sm text-gray-700 font-medium">功用</label>
          <div class="relative">
            <textarea
              v-model="functionDescription"
              placeholder="请输入处方功用，多个功用用顿号分隔"
              class="h-20 w-full resize-none border rounded-lg px-3 py-2 text-sm"
            />
            <button
              class="absolute bottom-2 right-2 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              @click="openFunctionSelector"
            >
              常用选择
            </button>
          </div>
          <div class="mt-2 flex flex-wrap gap-1">
            <button
              v-for="func in commonFunctions.slice(0, 4)"
              :key="func"
              class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              @click="selectFunction(func)"
            >
              {{ func }}
            </button>
          </div>
        </div>

        <!-- 主治 -->
        <div class="mb-4">
          <label class="mb-1 block text-sm text-gray-700 font-medium">主治</label>
          <div class="relative">
            <textarea
              v-model="mainTreatment"
              placeholder="请输入处方主治，多个主治用顿号分隔"
              class="h-20 w-full resize-none border rounded-lg px-3 py-2 text-sm"
            />
            <button
              class="absolute bottom-2 right-2 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              @click="openMainTreatmentSelector"
            >
              常用选择
            </button>
          </div>
          <div class="mt-2 flex flex-wrap gap-1">
            <button
              v-for="treatment in commonMainTreatments.slice(0, 4)"
              :key="treatment"
              class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
              @click="selectMainTreatment(treatment)"
            >
              {{ treatment }}
            </button>
          </div>
        </div>
      </view>

      <!-- 药品明细 -->
      <view class="rounded-lg bg-white p-4 shadow-sm">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-base text-gray-800 font-medium">
            药品明细
          </h2>
          <button class="rounded-full bg-red-800 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700" @click="openMedicineModal">
            添加药品
          </button>
        </div>

        <!-- 剂数控制 -->
        <div class="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div class="flex items-center">
            <button class="h-8 w-8 flex items-center justify-center border rounded-full bg-white text-gray-700" @click="decreaseDosageCount">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path fill-rule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            <input
              v-model.number="dosageCount"
              type="number"
              min="1"
              max="30"
              class="mx-3 w-12 border rounded py-1 text-center text-gray-800"
            >
            <button class="h-8 w-8 flex items-center justify-center border rounded-full bg-white text-gray-700" @click="increaseDosageCount">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="flex space-x-2">
            <button class="border rounded bg-white px-2 py-1 text-xs text-gray-700" @click="setDosageCount(3)">
              3剂
            </button>
            <button class="border rounded bg-white px-2 py-1 text-xs text-gray-700" @click="setDosageCount(5)">
              5剂
            </button>
            <button class="border rounded bg-white px-2 py-1 text-xs text-gray-700" @click="setDosageCount(7)">
              7剂
            </button>
            <button class="border rounded bg-white px-2 py-1 text-xs text-gray-700" @click="setDosageCount(14)">
              14剂
            </button>
          </div>
        </div>

        <!-- 药品列表 -->
        <div v-if="medicines.length === 0" class="py-8 text-center text-gray-500">
          暂无药品，请点击添加药品按钮
        </div>
        <div v-else class="mb-4 space-y-3">
          <div
            v-for="(medicine, index) in medicines"
            :key="medicine.id"
            class="flex items-center justify-between border rounded-lg p-3"
          >
            <div class="flex-1">
              <div class="mb-1 flex items-center justify-between">
                <h4 class="text-gray-800 font-medium">
                  {{ medicine.name }}
                </h4>
                <span
                  class="rounded-full px-2 py-0.5 text-xs"
                  :class="{
                    'bg-purple-100 text-purple-600': medicine.type === 'granule',
                    'bg-red-100 text-red-600': medicine.type === 'decoction',
                    'bg-orange-100 text-orange-600': medicine.type === 'mixture',
                  }"
                >
                  {{ getTypeName(medicine.type) }}
                </span>
              </div>
              <p class="mb-1 text-sm text-gray-600">
                {{ medicine.specification }} / {{ medicine.unit }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="mr-1 text-sm text-gray-500">剂量：</span>
                  <input
                    v-model.number="medicine.quantity"
                    type="number"
                    min="1"
                    class="w-12 border rounded py-1 text-center text-sm text-gray-800"
                    @input="updateMedicineQuantity(index, medicine.quantity)"
                  >
                  <span class="ml-1 text-sm text-gray-500">{{ medicine.unit }}</span>
                </div>
                <span class="text-sm text-gray-800 font-medium">¥{{ (medicine.price * medicine.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <button
              class="ml-3 p-2 text-gray-500 hover:text-red-500"
              @click="removeMedicine(index)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 用法及注意事项 -->
        <div class="mb-4">
          <label class="mb-1 block text-sm text-gray-700 font-medium">用法及注意事项</label>
          <textarea
            v-model="usageMethod"
            placeholder="请输入用法及注意事项"
            class="h-24 w-full resize-none border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <!-- 总金额 -->
        <div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div class="text-gray-700">
            单剂总金额：
          </div>
          <div class="text-gray-800 font-medium">
            ¥{{ (totalAmount / dosageCount).toFixed(2) }}
          </div>
        </div>
        <div class="mt-2 flex items-center justify-between rounded-lg bg-gray-50 p-3">
          <div class="text-gray-700">
            总金额：
          </div>
          <div class="text-lg text-red-800 font-medium">
            ¥{{ totalAmount.toFixed(2) }}
          </div>
        </div>
      </view>
    </main>

    <!-- 底部按钮 -->
    <footer class="bg-white p-4 shadow-sm">
      <div class="flex space-x-3">
        <button class="flex-1 border border-red-800 rounded-lg py-3 text-red-800 font-medium transition-colors hover:bg-red-50" @click="saveAsTemplate">
          保存为模板
        </button>
        <button class="flex-1 rounded-lg bg-red-800 py-3 text-white font-medium transition-colors hover:bg-red-700" @click="submitPrescription">
          开具处方
        </button>
      </div>
    </footer>
  </view>
</template>
