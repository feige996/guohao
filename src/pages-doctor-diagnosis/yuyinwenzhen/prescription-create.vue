<script setup lang="ts" charset="utf-8">
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '开具处方',
    navigationBarBackgroundColor: '#fff',
  },
})

// 自定义toast函数替代不存在的模块
const toastVisible = ref(false)
const toastMessage = ref('')
function showToast(message: string, duration: number = 2000): void {
  toastMessage.value = message
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, duration)
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
  precautions?: string
  medicines: Medicine[]
}

// 响应式状态
const prescriptionType = ref<'granule' | 'decoction' | 'mixture'>('granule')
const dosageCount = ref(7)
const functionDescription = ref('')
const mainTreatment = ref('')
const usageMethod = ref('')
const precautions = ref('')
const templateModalVisible = ref(false)
const medicineModalVisible = ref(false)
const functionSelectorVisible = ref(false)
const mainTreatmentSelectorVisible = ref(false)
const medicineSearchQuery = ref('')
const currentMedicineFilter = ref('all')
const currentTemplateFilter = ref('all')

// 药品和模板数据
const medicines = ref<Medicine[]>([])
const templates = ref<Template[]>([
  {
    id: '1',
    name: '益气养阴颗粒方',
    type: 'granule',
    functionDescription: '益气养阴、清热生津',
    mainTreatment: '消渴病、气阴两虚',
    usageMethod: '温开水冲服，每日2-3次，饭后服用',
    precautions: '忌食辛辣、油腻食物',
    medicines: [
      { id: '1', name: '生地黄颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.5, category: '清热凉血', type: 'granule' },
      { id: '2', name: '山药颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.2, category: '补脾养胃', type: 'granule' },
      { id: '3', name: '黄芪颗粒', specification: '4g', unit: 'g', quantity: 4, price: 2.0, category: '补气', type: 'granule' },
      { id: '4', name: '天花粉颗粒', specification: '2.5g', unit: 'g', quantity: 2.5, price: 1.3, category: '清热生津', type: 'granule' },
    ],
  },
  {
    id: '2',
    name: '柴胡疏肝散',
    type: 'decoction',
    functionDescription: '疏肝理气、活血止痛',
    mainTreatment: '肝郁气滞、胸胁胀痛',
    usageMethod: '水煎服，每日一剂，分早晚两次温服',
    medicines: [
      { id: '101', name: '柴胡', specification: '10g', unit: 'g', quantity: 10, price: 1.2, category: '解表', type: 'decoction' },
      { id: '102', name: '当归', specification: '10g', unit: 'g', quantity: 10, price: 1.8, category: '补血活血', type: 'decoction' },
      { id: '103', name: '白芍', specification: '12g', unit: 'g', quantity: 12, price: 1.1, category: '养血敛阴', type: 'decoction' },
    ],
  },
])

// 药品数据库（模拟）
const medicineDatabase = ref<Medicine[]>([
  // 颗粒
  { id: '1', name: '生地黄颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.5, category: '清热凉血', type: 'granule' },
  { id: '2', name: '山药颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.2, category: '补脾养胃', type: 'granule' },
  { id: '3', name: '黄芪颗粒', specification: '4g', unit: 'g', quantity: 4, price: 2.0, category: '补气', type: 'granule' },
  { id: '4', name: '天花粉颗粒', specification: '2.5g', unit: 'g', quantity: 2.5, price: 1.3, category: '清热生津', type: 'granule' },
  { id: '5', name: '葛根颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.4, category: '解肌退热', type: 'granule' },
  { id: '6', name: '麦冬颗粒', specification: '2.5g', unit: 'g', quantity: 2.5, price: 1.8, category: '养阴润肺', type: 'granule' },
  { id: '7', name: '五味子颗粒', specification: '1.5g', unit: 'g', quantity: 1.5, price: 2.5, category: '收敛固涩', type: 'granule' },
  { id: '8', name: '丹参颗粒', specification: '3g', unit: 'g', quantity: 3, price: 1.6, category: '活血化瘀', type: 'granule' },
  // 饮片
  { id: '101', name: '柴胡', specification: '10g', unit: 'g', quantity: 10, price: 1.2, category: '解表', type: 'decoction' },
  { id: '102', name: '黄柏', specification: '10g', unit: 'g', quantity: 10, price: 0.8, category: '清热燥湿', type: 'decoction' },
  { id: '103', name: '枸杞子', specification: '10g', unit: 'g', quantity: 10, price: 1.0, category: '补益肝肾', type: 'decoction' },
  { id: '104', name: '菊花', specification: '10g', unit: 'g', quantity: 10, price: 0.6, category: '清热解毒', type: 'decoction' },
  { id: '105', name: '桔梗', specification: '6g', unit: 'g', quantity: 6, price: 0.5, category: '宣肺祛痰', type: 'decoction' },
  { id: '106', name: '薄荷', specification: '6g', unit: 'g', quantity: 6, price: 0.4, category: '疏散风热', type: 'decoction' },
])

// 常用功用和主治
const commonFunctions = [
  // 补益类
  '补气养血',
  '益气养阴',
  '滋阴补肾',
  '温阳补肾',
  '补中益气',
  '养血安神',
  '健脾益气',
  '补益肝肾',
  // 清热类
  '清热解毒',
  '清热生津',
  '清热燥湿',
  '清热凉血',
  '清肝明目',
  '清热泻火',
  // 解表类
  '疏风解表',
  '发散风寒',
  '疏风清热',
  '解肌退热',
  // 理气类
  '疏肝理气',
  '行气止痛',
  '理气健脾',
  '行气导滞',
  // 活血类
  '活血化瘀',
  '活血止痛',
  '活血调经',
  '破血逐瘀',
]

const commonMainTreatments = [
  // 内科
  '感冒风寒',
  '感冒风热',
  '咳嗽痰多',
  '气喘咳嗽',
  '失眠多梦',
  '心悸怔忡',
  '头痛头晕',
  '高血压',
  '消渴病（糖尿病）',
  '气阴两虚',
  '脾胃虚弱',
  '中气下陷',
  '肝郁气滞',
  '肝火上炎',
  '肝阳上亢',
  '心肾不交',
  '肾阳虚',
  '肾阴虚',
  '阴虚火旺',
  '气滞血瘀',
  '痰湿内阻',
  '湿热蕴结',
]

// 获取类型名称
function getTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    all: '全部',
    granule: '颗粒',
    decoction: '饮片',
    mixture: '混合',
  }
  return typeMap[type] || type
}

const ButtonTypeList = ['granule', 'decoction', 'mixture'] as const

// 过滤后的模板和药品列表
const filteredTemplates = computed(() => {
  let result = templates.value
  if (currentTemplateFilter.value !== 'all') {
    result = result.filter(t => t.type === currentTemplateFilter.value)
  }
  return result
})

const filteredMedicines = computed(() => {
  let result = medicineDatabase.value
  if (currentMedicineFilter.value !== 'all') {
    result = result.filter(m => m.type === currentMedicineFilter.value)
  }
  if (medicineSearchQuery.value.trim() !== '') {
    const query = medicineSearchQuery.value.toLowerCase()
    result = result.filter(m =>
      m.name.toLowerCase().includes(query)
      || m.category.toLowerCase().includes(query),
    )
  }
  return result
})

// 计算总金额
const totalAmount = computed(() => {
  const sum = medicines.value.reduce((acc, medicine) => {
    return acc + (medicine.price * medicine.quantity * dosageCount.value)
  }, 0)
  return sum
})

const singleDosageAmount = computed(() => {
  if (medicines.value.length === 0)
    return 0
  return totalAmount.value / dosageCount.value
})

// 方法 - 使用function关键字声明
function goBack(): void {
  uni.navigateBack()
}

function selectPrescriptionType(type: 'granule' | 'decoction' | 'mixture'): void {
  prescriptionType.value = type
}

function setTemplateFilter(filter: string): void {
  currentTemplateFilter.value = filter as 'all' | 'granule' | 'decoction' | 'mixture'
}

function setMedicineFilter(filter: string): void {
  currentMedicineFilter.value = filter as 'all' | 'granule' | 'decoction'
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

function updateMedicineQuantity(index: number, event: Event): void {
  const input = event.target as HTMLInputElement
  const quantity = Number(input.value)
  if (!Number.isNaN(quantity) && quantity > 0) {
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
  if (template.precautions) {
    precautions.value = template.precautions
  }

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
  uni.navigateTo({
    url: '/pages-doctor-diagnosis/yuyinwenzhen/medical-record',
  })
}
</script>

<template>
  <div class="prescription-create box-border max-w-full w-full overflow-x-hidden">
    <!-- Toast通知 -->
    <div v-if="toastVisible" class="fixed left-1/2 top-1/2 z-50 transform rounded-lg bg-black/70 px-4 py-2 text-sm text-white -translate-x-1/2 -translate-y-1/2">
      {{ toastMessage }}
    </div>

    <!-- 模板选择弹窗 -->
    <div v-if="templateModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="max-w-md w-full overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="relative flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <view class="text-lg text-[#1F2937] font-medium">
            选择模板
          </view>
          <wd-icon name="close" @click="closeTemplateModal" />
        </div>
        <div class="p-4">
          <div class="mb-4 flex border-b border-gray-200">
            <button
              v-for="type in ['all', 'granule', 'decoction']"
              :key="type"
              class="px-4 py-2 text-sm"
              :class="[currentTemplateFilter === type ? 'text-[#975518] border-b-2 border-[#975518]' : 'text-gray-500']"
              @click="setTemplateFilter(type)"
            >
              {{ getTypeName(type) }}
            </button>
          </div>
          <div class="max-h-[300px] overflow-y-auto">
            <div
              v-for="template in filteredTemplates"
              :key="template.id"
              class="mb-3 cursor-pointer border border-gray-200 rounded-lg p-3 transition-colors hover:border-[#975518]"
              @click="applyTemplate(template)"
            >
              <div class="mb-2 flex items-start justify-between">
                <h4 class="text-base font-medium">
                  {{ template.name }}
                </h4>
                <span class="rounded bg-[#f5e9d7] px-2 py-0.5 text-xs text-[#975518]">{{ getTypeName(template.type) }}</span>
              </div>
              <p class="mb-1 text-sm text-gray-700">
                {{ template.functionDescription }}
              </p>
              <p class="text-sm text-gray-500">
                {{ template.mainTreatment }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 药品选择弹窗 -->
    <div v-if="medicineModalVisible" class="fixed inset-0 z-50 flex flex-col bg-black/50 px-4">
      <div class="mt-auto w-full rounded-t-xl bg-white shadow-lg">
        <div class="relative flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <view class="text-lg text-[#1F2937] font-medium">
            添加药品
          </view>
          <wd-icon name="close" @click="closeMedicineModal" />
        </div>
        <div class="p-4">
          <div class="relative mb-4">
            <input
              v-model="medicineSearchQuery"
              type="text"
              placeholder="搜索药品名称或分类"
              class="w-full border border-gray-300 rounded-lg px-10 py-2 focus:border-[#975518] focus:outline-none focus:ring-2 focus:ring-[#975518]/30"
            >
            <svg class="absolute left-3 top-1/2 transform text-gray-400 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="mb-4 flex overflow-x-auto border-b border-gray-200">
            <button
              v-for="type in ['all', 'granule', 'decoction']"
              :key="type"
              class="whitespace-nowrap px-4 py-2 text-sm"
              :class="[currentMedicineFilter === type ? 'text-[#975518] border-b-2 border-[#975518]' : 'text-gray-500']"
              @click="setMedicineFilter(type)"
            >
              {{ getTypeName(type) }}
            </button>
          </div>
          <div class="max-h-[400px] overflow-y-auto">
            <div
              v-for="medicine in filteredMedicines"
              :key="medicine.id"
              class="mb-3 flex cursor-pointer items-center justify-between border border-gray-200 rounded-lg p-3 transition-colors hover:border-[#975518]"
              @click="addMedicineToList(medicine)"
            >
              <div>
                <h4 class="mb-1 text-base font-medium">
                  {{ medicine.name }}
                </h4>
                <p class="text-sm text-gray-500">
                  {{ medicine.category }}
                </p>
              </div>
              <div class="text-right">
                <p class="mb-1 text-sm text-gray-700">
                  {{ medicine.specification }}
                </p>
                <p class="text-sm text-[#975518] font-medium">
                  ￥{{ medicine.price.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="content box-border min-h-screen bg-gray-100 px-4 py-4 pb-20">
      <!-- 患者信息简要 -->
      <div class="mb-2 box-border w-full overflow-hidden rounded-[20px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="flex items-center gap-3">
          <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
            <img src="https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_640.jpg" alt="吴姗姗" class="h-full w-full object-cover">
          </div>
          <div class="flex-1">
            <div class="mb-1 flex items-center gap-2">
              <span class="truncate text-base text-[#1F2937] font-bold">吴姗姗</span>
              <span class="rounded-full bg-[#FEF2F2] px-2 py-0.5 text-xs text-[#EF4444] font-semibold">女</span>
              <span class="text-xs text-[#6B7280]">32岁</span>
            </div>
            <div class="truncate text-xs text-[#6B7280]">
              患者编号：GH973212
            </div>
          </div>
          <wd-button size="small" class="px-3 py-1 text-xs">
            病历
          </wd-button>
        </div>
      </div>

      <!-- 处方类型选择 -->
      <div class="mb-2 box-border rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <wd-icon name="books" size="22px" color="blue" />
          <span class="text-lg text-[#333333] font-bold leading-7">处方类型</span>
        </div>

        <div class="grid grid-cols-3 gap-4 px-4 pr-4">
          <view
            v-for="(type, index) in ButtonTypeList"
            :id="`type-${index + 1}`"
            :key="type"
            class="h-10 flex items-center justify-center gap-2 border rounded-lg border-solid"
            :class="[
              prescriptionType === type
                ? 'border-[#3B82F6]! bg-[#EFF6FF]!'
                : 'border-[#E5E7EB]! bg-white!',
            ]"
            @click="selectPrescriptionType(type)"
          >
            <wd-icon v-if="type === 'granule'" name="fork" size="18px" :color="prescriptionType === type ? '#3B82F6' : '#6B7280'" />
            <wd-icon v-else-if="type === 'decoction'" name="cloud-upload" size="18px" :color="prescriptionType === type ? '#3B82F6' : '#6B7280'" />
            <wd-icon v-else name="a-controlplatform" size="18px" :color="prescriptionType === type ? '#3B82F6' : '#6B7280'" />
            <view
              class="text-xs font-medium" :class="[
                prescriptionType === type ? 'text-[#3B82F6]' : 'text-[#6B7280]',
              ]"
            >
              {{ getTypeName(type) }}
            </view>
          </view>
        </div>
      </div>

      <!-- 处方信息 -->
      <div class="mb-4 rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <wd-icon name="warning" size="22px" color="blue" />
          <span class="text-lg text-[#333333] font-bold leading-7">处方信息</span>
        </div>

        <div class="space-y-4">
          <!-- 功用描述 -->
          <div>
            <label class="mb-2 block text-sm text-[#374151] font-medium" for="functionDescription">功用描述</label>
            <div class="mb-2 flex gap-2">
              <textarea
                id="functionDescription"
                v-model="functionDescription"
                rows="2"
                placeholder="如：益气养阴、清热生津..."
                class="min-h-[60px] w-full resize-none border border-[#E5E7EB] rounded-lg bg-white px-3 py-2 text-sm text-[#1F2937] transition-all focus:border-[#8E4337] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#8E4337] focus:ring-opacity-20 placeholder-[#9CA3AF]"
              />
            </div>
            <wd-button
              icon="search"
              block
              type="primary"
              @click="openFunctionSelector"
            >
              选择常用功用
            </wd-button>
          </div>

          <!-- 主治 -->
          <div>
            <label class="mb-2 block text-sm text-[#374151] font-medium" for="mainTreatment">主治</label>
            <div class="mb-2 flex gap-2">
              <textarea
                id="mainTreatment"
                v-model="mainTreatment"
                rows="2"
                placeholder="如：消渴病、气阴两虚..."
                class="min-h-[60px] flex-1 resize-none border border-[#E5E7EB] rounded-lg bg-white px-3 py-2 text-sm text-[#1F2937] focus:border-[#8E4337] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#8E4337] focus:ring-opacity-20 placeholder-[#9CA3AF]"
              />
            </div>
            <wd-button
              icon="search"
              block
              type="primary"
              @click="openMainTreatmentSelector"
            >
              选择常用主治
            </wd-button>
          </div>
        </div>
      </div>

      <!-- 药品明细 -->
      <div class="mb-4 rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <wd-icon name="subscribe" size="20px" />
            <span class="text-lg text-[#333333] font-bold leading-7">药品明细</span>
          </div>

          <div class="flex items-center gap-2" />
          <wd-button size="small" icon="spool" @click="openTemplateModal">
            使用药方
          </wd-button>
          <wd-button size="small" icon="add" @click="openMedicineModal">
            添加药品
          </wd-button>
        </div>

        <!-- 处方剂数 -->
        <div class="mb-4 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-4">
          <label class="mb-3 block text-sm text-[#374151] font-medium" for="dosageCount">处方剂数</label>
          <div class="flex items-center gap-3">
            <div class="flex flex-1 items-center gap-2">
              <button
                class="h-7 w-7 flex items-center justify-center"
                @click="decreaseDosageCount"
              >
                <wd-icon name="decrease" size="16px" />
              </button>

              <input
                id="dosageCount"
                v-model.number="dosageCount"
                type="number"
                class="h-10 flex-1 border-2 border-[#1677ff] rounded-lg bg-white px-4 py-2.5 text-center text-lg text-[#1677FF] font-bold focus:border-[#8E4337] focus:outline-none focus:ring-2 focus:ring-[#8E4337]"
              >

              <button
                class="h-7 w-7 flex items-center justify-center"
                @click="increaseDosageCount"
              >
                <wd-icon name="add" size="16px" />
              </button>
            </div>
            <span class="text-sm text-[#6B7280] font-medium">剂</span>
          </div>
          <div class="mt-3 flex gap-2">
            <button
              v-for="count in [3, 5, 7, 14, 30]"
              :key="count"
              :class="[
                dosageCount === count
                  ? 'h-7 w-12 flex items-center justify-center bg-white text-[#1677FF] text-xs '
                  : 'h-7 w-12 flex items-center justify-center text-[#6B7280] text-xs',
              ]"
              class="whitespace-nowrap transition-colors hover:bg-[#1677FF] hover:text-white"
              @click="setDosageCount(count)"
            >
              {{ count }}剂
            </button>
          </div>
        </div>

        <!-- 药品列表 -->
        <div v-if="medicines.length > 0" class="space-y-3">
          <!-- 药品列表头部 -->
          <div class="grid grid-cols-12 rounded-xl bg-[#F9FAFB] p-3 text-sm text-[#6B7280]">
            <div class="col-span-5">
              药品名称
            </div>
            <div class="col-span-3 text-center">
              剂量
            </div>
            <div class="col-span-3 text-right">
              金额
            </div>
            <div class="col-span-1 text-center">
              操作
            </div>
          </div>

          <!-- 药品项 -->
          <div
            v-for="(medicine, index) in medicines"
            :key="medicine.id"
            class="grid grid-cols-12 items-center border border-[#E5E7EB] rounded-xl bg-white p-3"
          >
            <div class="col-span-5">
              <div class="text-[#333333] font-medium">
                {{ medicine.name }}
              </div>
              <div class="text-xs text-[#9CA3AF]">
                {{ medicine.category }}
              </div>
            </div>
            <div class="col-span-3 flex items-center justify-center">
              <input
                type="number"
                :value="medicine.quantity.toString()"
                class="h-9 w-16 border border-[#E5E7EB] rounded-lg px-3 text-center text-sm focus:border-[#8E4337] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:ring-opacity-20"
                @input="updateMedicineQuantity(index, $event as unknown as Event)"
              >
              <span class="ml-2 text-sm text-[#6B7280]">{{ medicine.unit }}</span>
            </div>
            <div class="col-span-3 text-right">
              <div class="text-[#8E4337] font-medium">
                ￥{{ (medicine.price * medicine.quantity * dosageCount).toFixed(2) }}
              </div>
              <div class="text-xs text-[#9CA3AF]">
                ￥{{ medicine.price.toFixed(2) }}/{{ medicine.unit }}
              </div>
            </div>
            <div class="col-span-1 text-center">
              <button
                class="h-8 w-8 flex items-center justify-center border border-[#E5E7EB] rounded-full bg-white text-[#6B7280] transition-colors hover:border-[#DC2626] hover:text-[#DC2626]"
                @click="removeMedicine(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                  <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v10.5A2.75 2.75 0 008.75 17h2.5A2.75 2.75 0 0014 15.25v-10.5A2.75 2.75 0 0011.25 1h-2.5zm0 2C8.336 3 8 3.336 8 3.75v10.5c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-10.5c0-.414-.336-.75-.75-.75h-2.5z" clip-rule="evenodd" />
                  <path d="M3.493 6.27c.054-.864.736-1.547 1.598-1.547h7.91c.862 0 1.544.683 1.598 1.547l.211 3.584a2.25 2.25 0 01-2.231 2.472H5.453a2.25 2.25 0 01-2.231-2.472L3.493 6.27z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="rounded-xl bg-[#F9FAFB] p-4 text-center text-sm text-[#9CA3AF]">
          暂无药品，请点击"添加药品"按钮
        </div>
      </div>

      <!-- 用法及注意事项 -->
      <div class="mb-4 rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
        <div class="mb-4 flex items-center gap-2">
          <wd-icon name="error-circle-filled" size="16px" color="blue" />
          <span class="text-lg text-[#333333] font-bold leading-7">用法及注意事项</span>
        </div>

        <div class="space-y-4">
          <!-- 用法 -->
          <div>
            <label class="mb-2 block text-sm text-[#374151] font-medium" for="usageMethod">用法</label>
            <textarea
              id="usageMethod"
              v-model="usageMethod"
              rows="3"
              placeholder="如：水煎服，每日1剂，分早晚两次温服..."
              class="w-full resize-none border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F2937] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8E4337] placeholder-[#9CA3AF]"
            />
          </div>

          <!-- 注意事项 -->
          <div>
            <label class="mb-2 block text-sm text-[#374151] font-medium" for="precautions">注意事项</label>
            <textarea
              id="precautions"
              v-model="precautions"
              rows="3"
              placeholder="如：忌食辛辣、油腻食物；孕妇慎用..."
              class="w-full resize-none border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F2937] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8E4337] placeholder-[#9CA3AF]"
            />
          </div>
        </div>
      </div>

      <!-- 总金额 -->
      <!-- <div class="mb-2 box-border bg-white p-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-600">
              单剂金额
            </div>
            <div class="mt-1 text-base font-medium">
              ￥{{ singleDosageAmount.toFixed(2) }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-600">
              总金额
            </div>
            <div class="mt-1 text-xl text-[#975518] font-medium">
              ￥{{ totalAmount.toFixed(2) }}
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <!-- 底部操作栏 -->
    <div class="fixed bottom-0 center flex border-t border-[#E5E7EB] bg-white px-14 py-3">
      <div class="grid grid-cols-2 gap-10">
        <wd-button
          plain
          aria-label="保存为模板"
          @click="saveAsTemplate"
        >
          <wd-icon name="books" size="16px" color="blue" />
          保存模板
        </wd-button>
        <wd-button
          plain
          aria-label="开具处方"
          @click="submitPrescription"
        >
          <wd-icon name="check1" size="16px" color="blue" />
          开具处方
        </wd-button>
      </div>
    </div>

    <!-- 功用选择器弹窗 -->
    <div v-if="functionSelectorVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="max-w-md w-full overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="relative flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 class="text-lg text-[#1F2937] font-medium">
            选择功用
          </h3>
          <button
            class="absolute right-4 top-1/2 transform border-none bg-transparent px-1 text-xl -translate-y-1/2 !border-none"
            @click="closeFunctionSelector"
          >
            <wd-icon name="close-normal" size="22px" />
          </button>
        </div>
        <div class="px-4 py-2">
          <p class="text-sm text-gray-500">
            点击可添加，用逗号分隔
          </p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 max-h-[300px] gap-3 overflow-y-auto">
            <div
              v-for="(func, index) in commonFunctions"
              :key="index"
              class="cursor-pointer border border-gray-200 rounded-lg p-3 text-center transition-all hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:shadow-sm"
              @click="selectFunction(func)"
            >
              {{ func }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主治选择器弹窗 -->
    <div v-if="mainTreatmentSelectorVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div class="max-w-md w-full overflow-hidden rounded-xl bg-white shadow-lg">
        <div class="relative flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 class="text-lg text-[#1F2937] font-medium">
            选择主治
          </h3>
          <button class="absolute right-4 top-1/2 transform text-xl text-gray-500 transition-colors -translate-y-1/2 hover:text-gray-700" @click="closeMainTreatmentSelector">
            ×
          </button>
        </div>
        <div class="px-4 py-2">
          <p class="text-sm text-gray-500">
            点击可添加，用逗号分隔
          </p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 max-h-[300px] gap-3 overflow-y-auto">
            <div
              v-for="(treatment, index) in commonMainTreatments"
              :key="index"
              class="cursor-pointer border border-gray-200 rounded-lg p-3 text-center transition-all hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:shadow-sm"
              @click="selectMainTreatment(treatment)"
            >
              {{ treatment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
