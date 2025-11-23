<script setup lang="ts">
import { pharmacyPrescriptions, addresses } from '@/data'
import type { Prescription, Address } from '@/data'

definePage({
  style: {
    navigationBarTitleText: "购药服务",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

// 处方数据
const prescriptions = ref<Prescription[]>(pharmacyPrescriptions)

// 当前选中的处方
const selectedPrescription = ref<any>(null)

// 购买剂数
const purchaseDosage = ref(7)

// 当前选中的收货地址
const selectedAddressIndex = ref(0)

// 收货地址数据
const addressList = ref<Address[]>(addresses)

// 支付方式
const selectedPaymentMethod = ref('wechat')

// 步骤控制
const currentStep = ref(1) // 1: 选择处方, 2: 确认订单, 3: 支付

// 页面加载
onLoad(() => {
  if (prescriptions.value.length > 0) {
    selectedPrescription.value = prescriptions.value[0]
  }
})

// 选择处方
function selectPrescription(prescription: any) {
  selectedPrescription.value = prescription
  currentStep.value = 2
}

// 增加剂数
function increaseDosage() {
  if (purchaseDosage.value < 30) {
    purchaseDosage.value++
  }
}

// 减少剂数
function decreaseDosage() {
  if (purchaseDosage.value > 1) {
    purchaseDosage.value--
  }
}

// 设置剂数
function setDosage(count: number) {
  purchaseDosage.value = count
}

// 选择收货地址
function selectAddress(index: number) {
  selectedAddressIndex.value = index
}

// 选择支付方式
function selectPaymentMethod(method: string) {
  selectedPaymentMethod.value = method
}

// 计算总价
const totalAmount = computed(() => {
  if (!selectedPrescription.value) return 0
  return selectedPrescription.value.totalAmount * purchaseDosage.value
})

// 下一步
function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

// 上一步
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 确认订单
function confirmOrder() {
  currentStep.value = 3
}

// 支付
function handlePayment() {
  uni.showModal({
    title: '确认支付',
    content: `确认使用${selectedPaymentMethod.value === 'wechat' ? '微信支付' : '支付宝'}支付 ¥${totalAmount.value.toFixed(2)} 吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '支付中...' })
        
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          
          setTimeout(() => {
            uni.navigateBack()
          }, 2000)
        }, 1500)
      }
    },
  })
}

// 返回
function handleBack() {
  if (currentStep.value > 1) {
    prevStep()
  } else {
    uni.navigateBack()
  }
}

// 管理收货地址
function manageAddresses() {
  uni.showToast({
    title: '跳转地址管理',
    icon: 'none',
  })
}

// 获取处方类型图标
function getPrescriptionTypeIcon(type: string) {
  const icons: Record<string, string> = {
    '颗粒': '💊',
    '饮片': '🌿',
    '混合': '🔄'
  }
  return icons[type] || '💊'
}

// 获取处方类型颜色
function getPrescriptionTypeColor(type: string) {
  const colors: Record<string, string> = {
    '颗粒': '#8e4337',
    '饮片': '#059669',
    '混合': '#7c3aed'
  }
  return colors[type] || '#8e4337'
}
</script>

<template>
  <view class="w-full min-h-screen bg-gray-50 flex flex-col">
    <!-- 步骤指示器 -->
    <view class="flex-shrink-0 bg-white px-24rpx py-32rpx">
      <wd-steps :active="currentStep - 1" :steps="[
        { title: '选择处方' },
        { title: '确认订单' },
        { title: '支付' }
      ]" />
    </view>

    <scroll-view scroll-y class="flex-1">
      <view class="p-24rpx flex flex-col gap-24rpx">
        <!-- 步骤1: 选择处方 -->
        <view v-if="currentStep === 1">
          <wd-cell-group title="选择历史处方" border>
            <view v-if="prescriptions.length === 0" class="px-32rpx py-120rpx flex flex-col items-center justify-center gap-16rpx">
              <text class="text-80rpx">📋</text>
              <text class="text-28rpx text-gray-400">暂无历史处方</text>
            </view>

            <wd-cell
              v-for="prescription in prescriptions"
              :key="prescription.id"
              custom-class="mb-16rpx"
              :border="false"
              clickable
              @click="selectPrescription(prescription)"
            >
              <view class="w-full">
                <!-- 医生信息 -->
                <view class="flex gap-24rpx mb-24rpx">
                  <image
                    :src="prescription.doctor.avatar"
                    class="w-120rpx h-120rpx rounded-16rpx flex-shrink-0"
                    mode="aspectFill"
                  />
                  
                  <view class="flex-1 flex flex-col gap-8rpx">
                    <view class="flex items-center justify-between">
                      <text class="text-30rpx font-bold text-gray-800">{{ prescription.doctor.name }}</text>
                      <wd-tag :type="selectedPrescription?.id === prescription.id ? 'primary' : 'default'" size="small">
                        {{ prescription.prescriptionType || '颗粒' }}
                      </wd-tag>
                    </view>
                    <text class="text-24rpx text-gray-500">{{ prescription.doctor.title }}</text>
                    <text class="text-22rpx text-gray-400">{{ prescription.doctor.hospital }}</text>
                    <text class="text-22rpx text-gray-400">{{ prescription.date }}</text>
                  </view>
                </view>

                <!-- 处方信息 -->
                <view class="px-20rpx py-16rpx bg-gray-50 rounded-12rpx">
                  <view class="flex items-center justify-between mb-12rpx">
                    <text class="text-24rpx text-gray-600">处方编号：{{ prescription.prescriptionNumber }}</text>
                  </view>
                  <text class="text-26rpx text-gray-700 block mb-12rpx">诊断：{{ prescription.diagnosis }}</text>
                  
                  <view class="mb-12rpx">
                    <text class="text-24rpx text-gray-600">功用：</text>
                    <text class="text-24rpx text-gray-700">{{ prescription.functionDescription }}</text>
                  </view>
                  
                  <view class="mb-16rpx">
                    <text class="text-24rpx text-gray-600">主治：</text>
                    <text class="text-24rpx text-gray-700">{{ prescription.mainTreatment }}</text>
                  </view>

                  <!-- 药品预览 -->
                  <view class="flex flex-wrap gap-8rpx mb-12rpx">
                    <wd-tag
                      v-for="(medicine, index) in prescription.medicines.slice(0, 4)"
                      :key="index"
                      type="success"
                      plain
                      size="small"
                    >
                      {{ medicine.name }}
                    </wd-tag>
                    <wd-tag v-if="prescription.medicines.length > 4" type="warning" plain size="small">
                      +{{ prescription.medicines.length - 4 }}
                    </wd-tag>
                  </view>

                  <!-- 价格 -->
                  <view class="flex items-center justify-between pt-12rpx border-t-1rpx border-gray-200">
                    <text class="text-24rpx text-gray-600">单剂价格</text>
                    <text class="text-32rpx font-bold text-primary">¥ {{ prescription.totalAmount }}</text>
                  </view>
                </view>
              </view>
            </wd-cell>
          </wd-cell-group>
        </view>

        <!-- 步骤2: 确认订单 -->
        <view v-else-if="currentStep === 2" class="flex flex-col gap-24rpx">
          <!-- 处方信息 -->
          <wd-cell-group title="处方信息" border>
            <wd-cell title="处方编号" :value="selectedPrescription?.prescriptionNumber" />
            <wd-cell title="诊断" :value="selectedPrescription?.diagnosis" />
            <wd-cell title="医生" :value="`${selectedPrescription?.doctor.name} ${selectedPrescription?.doctor.title}`" />
            <wd-cell title="处方类型" :value="selectedPrescription?.prescriptionType" />
          </wd-cell-group>

          <!-- 药品明细 -->
          <wd-cell-group title="药品明细" border>
            <wd-cell
              v-for="(medicine, index) in selectedPrescription?.medicines"
              :key="index"
              :title="`${index + 1}. ${medicine.name}`"
              :label="`${medicine.dosage} · ${medicine.frequency}`"
            >
              <template #right-icon>
                <wd-tag type="success" plain size="small">{{ medicine.category }}</wd-tag>
              </template>
            </wd-cell>
          </wd-cell-group>

          <!-- 购买剂数 -->
          <wd-cell-group title="购买剂数" border>
            <wd-cell>
              <view class="w-full flex flex-col gap-24rpx py-16rpx">
                <!-- 数量调整 -->
                <view class="flex items-center justify-center gap-32rpx">
                  <wd-button
                    round
                    size="large"
                    :disabled="purchaseDosage <= 1"
                    @click="decreaseDosage"
                  >
                    −
                  </wd-button>
                  <view class="flex flex-col items-center gap-4rpx min-w-120rpx">
                    <text class="text-48rpx font-bold text-primary">{{ purchaseDosage }}</text>
                    <text class="text-24rpx text-gray-500">剂</text>
                  </view>
                  <wd-button
                    round
                    size="large"
                    :disabled="purchaseDosage >= 30"
                    @click="increaseDosage"
                  >
                    +
                  </wd-button>
                </view>

                <!-- 快捷选择 -->
                <view class="flex gap-12rpx">
                  <wd-button
                    v-for="count in [3, 5, 7, 14, 30]"
                    :key="count"
                    size="small"
                    :type="purchaseDosage === count ? 'primary' : 'default'"
                    custom-class="flex-1"
                    @click="setDosage(count)"
                  >
                    {{ count }}剂
                  </wd-button>
                </view>
              </view>
            </wd-cell>
          </wd-cell-group>

          <!-- 订单总价 -->
          <wd-cell-group title="订单总价" border>
            <wd-cell title="单剂价格" :value="`¥ ${selectedPrescription?.totalAmount || 0}`" />
            <wd-cell title="购买剂数" :value="`× ${purchaseDosage} 剂`" />
            <wd-cell title="订单总价">
              <template #value>
                <text class="text-36rpx font-bold text-primary">¥ {{ totalAmount.toFixed(2) }}</text>
              </template>
            </wd-cell>
          </wd-cell-group>

          <!-- 操作按钮 -->
          <view class="flex gap-24rpx mt-16rpx">
            <wd-button custom-class="flex-1" size="large" @click="prevStep">
              上一步
            </wd-button>
            <wd-button custom-class="flex-1" type="primary" size="large" @click="confirmOrder">
              确认订单
            </wd-button>
          </view>
        </view>

        <!-- 步骤3: 支付 -->
        <view v-else-if="currentStep === 3" class="flex flex-col gap-24rpx">
          <!-- 收货地址 -->
          <wd-cell-group border>
            <template #title>
              <view class="flex items-center justify-between w-full pr-24rpx">
                <text class="text-28rpx font-bold">收货地址</text>
                <wd-button size="small" type="primary" plain @click="manageAddresses">
                  管理地址
                </wd-button>
              </view>
            </template>
            
            <wd-radio-group v-model="selectedAddressIndex">
              <wd-cell
                v-for="(address, index) in addressList"
                :key="address.id"
                clickable
                @click="selectAddress(index)"
              >
                <view class="w-full flex items-start gap-16rpx">
                  <wd-radio :value="index" custom-class="mt-4rpx" />
                  <view class="flex-1">
                    <view class="flex items-center gap-12rpx mb-8rpx">
                      <text class="text-28rpx font-bold text-gray-800">{{ address.name }}</text>
                      <text class="text-26rpx text-gray-600">{{ address.phone }}</text>
                      <wd-tag v-if="address.isDefault" type="primary" size="small">默认</wd-tag>
                    </view>
                    <text class="text-26rpx text-gray-600 block">
                      {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
                    </text>
                  </view>
                </view>
              </wd-cell>
            </wd-radio-group>
          </wd-cell-group>

          <!-- 支付方式 -->
          <wd-cell-group title="支付方式" border>
            <wd-radio-group v-model="selectedPaymentMethod">
              <wd-cell clickable @click="selectPaymentMethod('wechat')">
                <view class="w-full flex items-center gap-16rpx">
                  <wd-radio value="wechat" />
                  <text class="text-32rpx">💚</text>
                  <view class="flex-1 flex items-center gap-12rpx">
                    <text class="text-28rpx font-semibold text-gray-800">微信支付</text>
                    <wd-tag type="success" size="small">推荐</wd-tag>
                  </view>
                </view>
              </wd-cell>

              <wd-cell clickable @click="selectPaymentMethod('alipay')">
                <view class="w-full flex items-center gap-16rpx">
                  <wd-radio value="alipay" />
                  <text class="text-32rpx">💙</text>
                  <view class="flex-1 flex items-center gap-12rpx">
                    <text class="text-28rpx font-semibold text-gray-800">支付宝</text>
                    <wd-tag type="default" size="small">快捷</wd-tag>
                  </view>
                </view>
              </wd-cell>
            </wd-radio-group>
          </wd-cell-group>

          <!-- 订单信息 -->
          <wd-cell-group title="订单信息" border>
            <wd-cell title="商品" :value="selectedPrescription?.prescriptionNumber" />
            <wd-cell title="数量" :value="`${purchaseDosage} 剂`" />
            <wd-cell title="运费" value="¥ 0.00" />
            <wd-cell title="实付金额">
              <template #value>
                <text class="text-36rpx font-bold text-primary">¥ {{ totalAmount.toFixed(2) }}</text>
              </template>
            </wd-cell>
          </wd-cell-group>

          <!-- 操作按钮 -->
          <view class="flex gap-24rpx mt-16rpx">
            <wd-button custom-class="flex-1" size="large" @click="prevStep">
              上一步
            </wd-button>
            <wd-button custom-class="flex-1" type="primary" size="large" @click="handlePayment">
              立即支付 ¥ {{ totalAmount.toFixed(2) }}
            </wd-button>
          </view>
        </view>
      </view>

      <view class="h-40rpx" />
    </scroll-view>
  </view>
</template>
