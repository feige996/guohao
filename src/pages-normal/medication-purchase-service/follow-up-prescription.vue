<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('复诊开方')

// 患者信息
const patientInfo = ref({
  name: '张三',
  gender: '男',
  age: '45岁',
})

// 医嘱列表数据
const prescriptionItems = ref([
  {
    id: '1',
    name: '疏肝和胃丸',
    frequency: '每日3次',
    duration: '2025/3/12',
    checked: true,
  },
  {
    id: '2',
    name: '防风通圣丸',
    frequency: '每日2次',
    duration: '2025/3/20',
    checked: false,
  },
  {
    id: '3',
    name: '橘红丸',
    frequency: '每日3次',
    duration: '2025/4/5',
    checked: false,
  },
])

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理复选框变化
function handleCheckboxChange(item: typeof prescriptionItems.value[0]) {
  item.checked = !item.checked
}

// 处理查看结果
function handleViewResult() {
  uni.showToast({
    title: '查看历史处方结果',
    icon: 'none',
  })
}

// 处理提交申请
function handleSubmitApplication() {
  // 获取选中的医嘱
  const selectedItems = prescriptionItems.value.filter(item => item.checked)
  if (selectedItems.length === 0) {
    uni.showToast({
      title: '请至少选择一项医嘱',
      icon: 'none',
    })
    return
  }

  uni.showToast({
    title: '提交申请成功',
    icon: 'none',
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center border-b border-[#e5e5e5] bg-white px-[16px]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 患者信息卡片 -->
    <div class="m-[16px] rounded-[8px] bg-white p-[16px] shadow-sm">
      <div class="mb-[16px] flex items-center justify-between">
        <h2 class="text-[16px] text-[#333333] font-medium">
          患者信息
        </h2>
        <span class="text-[14px] text-[#666666]">{{ patientInfo.name }} {{ patientInfo.gender }} {{ patientInfo.age }}</span>
      </div>
    </div>

    <!-- 医嘱列表 -->
    <div class="m-[16px] rounded-[8px] bg-white p-[16px] shadow-sm">
      <h2 class="mb-[16px] text-[16px] text-[#333333] font-medium">
        医嘱列表
      </h2>

      <!-- 医嘱项 -->
      <div v-for="item in prescriptionItems" :key="item.id" class="flex items-center justify-between border-b border-[#f0f0f0] py-[12px] last:border-b-0">
        <div class="flex-1">
          <div class="mb-[4px] text-[14px] text-[#333333] font-medium">
            {{ item.name }}
          </div>
          <div class="text-[12px] text-[#999999]">
            {{ item.frequency }} · {{ item.duration }}
          </div>
        </div>
        <wd-checkbox v-model="item.checked" size="20" shape="square" />
      </div>
    </div>

    <!-- 提示文本 -->
    <div class="mx-[16px] mb-[24px]">
      <p class="line-clamp-2 text-[12px] text-[#999999]">
        勾选您想继续使用的医嘱后，提交即可申请。
      </p>
    </div>

    <!-- 底部按钮 -->
    <div class="fixed bottom-0 left-0 right-0 border-t border-[#e5e5e5] p-[16px]">
      <div class="flex gap-[12px]">
        <wd-button
          type="primary"
          plain
          class="h-[44px] flex-1 rounded-[22px] text-[16px]"
          @click="handleViewResult"
        >
          查看结果
        </wd-button>
        <wd-button
          type="primary"
          class="h-[44px] flex-1 rounded-[22px] text-[16px]"
          @click="handleSubmitApplication"
        >
          提交申请
        </wd-button>
      </div>
    </div>
  </div>
</template>
