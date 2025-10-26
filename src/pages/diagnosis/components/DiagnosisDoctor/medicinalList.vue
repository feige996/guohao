<script setup lang="ts">
import { computed, ref } from 'vue'

definePage({
  style: {
    navigationBarTitleText: '药材名单',
    backgroundColor: '#f5f5f5'
  }
})

// 搜索关键词
const searchKeyword = ref('')

// 药材项接口
interface MedicinalItem {
  id: number;
  name: string;
  price: string;
  selected: boolean;
  alias?: string;
}

// 模拟药材数据
const medicinalItems = ref<MedicinalItem[]>([
  { id: 1, name: '炮山甲', price: '52.00元/克', selected: false },
  { id: 2, name: '阿胶', price: '9.55元/克', selected: false, alias: '东阿' },
  { id: 3, name: '青芙藤', price: '2.91元/克', selected: false, alias: '小叶' },
  { id: 4, name: '锯镰果', price: '0.17元/克', selected: false },
  { id: 5, name: '红豆豆', price: '35.10元/克', selected: false, alias: '包' },
  { id: 6, name: '阿胶', price: '4.78元/克', selected: false, alias: '福牌' },
  { id: 7, name: '地龙', price: '0.97元/克', selected: false },
  { id: 8, name: '槟榔', price: '0.14元/克', selected: false },
  { id: 9, name: '胡椒', price: '0.51元/克', selected: false, alias: '白' },
  { id: 10, name: '罗汉果', price: '0.40元/克', selected: false },
  { id: 11, name: '石榴皮', price: '0.08元/克', selected: false },
  { id: 12, name: '莪术', price: '0.13元/克', selected: false },
  { id: 13, name: '紫花地丁', price: '0.14元/克', selected: false },
  { id: 14, name: '太子参', price: '1.20元/克', selected: false },
  { id: 15, name: '枣仁', price: '2.50元/克', selected: false },
  { id: 16, name: '苏木', price: '0.30元/克', selected: false },
  { id: 17, name: '降香', price: '1.80元/克', selected: false },
  { id: 18, name: '丹参', price: '0.50元/克', selected: false },
  { id: 19, name: '桃仁', price: '0.60元/克', selected: false },
  { id: 20, name: '川草', price: '0.45元/克', selected: false },
  { id: 21, name: '石菖蒲', price: '0.80元/克', selected: false },
  { id: 22, name: '黄芪', price: '0.75元/克', selected: false },
  { id: 23, name: '当归', price: '1.30元/克', selected: false },
  { id: 24, name: '川芎', price: '0.90元/克', selected: false },
  { id: 25, name: '白芍', price: '0.65元/克', selected: false },
  { id: 26, name: '熟地', price: '0.85元/克', selected: false },
  { id: 27, name: '茯苓', price: '0.40元/克', selected: false },
  { id: 28, name: '白术', price: '0.70元/克', selected: false },
  { id: 29, name: '甘草', price: '0.25元/克', selected: false },
  { id: 30, name: '人参', price: '5.00元/克', selected: false }
])

// 过滤后的药材列表
const filteredMedicinals = computed(() => {
  if (!searchKeyword.value.trim()) {
    return medicinalItems.value
  }
  
  const keyword = searchKeyword.value.toLowerCase()
  return medicinalItems.value.filter(item => 
    item.name.toLowerCase().includes(keyword) || 
    (item.alias && item.alias.toLowerCase().includes(keyword))
  )
})

// 选择药材
function selectMedicinal(item: MedicinalItem): void {
  // 取消所有选择
  medicinalItems.value.forEach(med => {
    med.selected = med.id === item.id
  })
  
  // 保存选中的药材
  try {
    uni.setStorageSync('selectedMedicinal', JSON.stringify({
      name: item.name,
      alias: item.alias
    }))
    
    // 返回上一页（新建处方页面）
    uni.navigateBack()
  } catch (e) {
    console.error('保存选中药材失败', e)
    uni.showToast({
      title: '选择失败，请重试',
      icon: 'none'
    })
  }
}

function handleBack(): void {
  // 返回上一页
  uni.navigateBack()
}
</script>

<template>
  <view class="min-h-screen bg-[#f5f5f5]">
    <!-- 返回栏 -->
    <view class="header-bar flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <view class="w-8">
        <text class="text-lg" @click="handleBack">&lt;</text>
      </view>
      <view class="text-center flex-1">
        <text class="text-lg font-medium">药材名单</text>
      </view>
      <view class="w-8"></view>
    </view>
    
    <!-- 搜索栏 -->
    <view class="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
      <view class="relative">
        <text class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</text>
        <input
          v-model="searchKeyword"
          class="w-full rounded-full bg-gray-100 pl-10 pr-4 py-2 text-gray-800 placeholder:text-gray-400"
          placeholder="输入药材/关键词"
        />
      </view>
    </view>

    <!-- 药材列表 -->
    <view class="mt-2 bg-white">
      <view
        v-for="item in filteredMedicinals"
        :key="item.id"
        class="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0"
        @click="selectMedicinal(item)"
      >
        <view class="flex items-center">
          <!-- 选中标记 -->
          <view class="mr-3 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300">
            <text v-if="item.selected" class="text-green-500">✓</text>
          </view>
          
          <!-- 药材名称 -->
          <view>
            <text class="text-gray-800">{{ item.name }}</text>
            <text v-if="item.alias" class="ml-2 text-sm text-gray-500">({{ item.alias }})</text>
          </view>
        </view>
        
        <!-- 价格 -->
        <text class="text-gray-500">{{ item.price }}</text>
      </view>
    </view>
  </view>
</template>