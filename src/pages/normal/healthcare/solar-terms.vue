<script setup lang="ts">
import { computed, ref } from 'vue'

// 定义节气数据接口
interface SolarTerm {
  id: string
  name: string
  description: string
  imageUrl: string
  season: string
}

// 节气数据
const solarTerms = ref<SolarTerm[]>([
  {
    id: 'yushui',
    name: '雨水',
    description: '春捂下厚上且薄，调畅情志以养肝。',
    imageUrl: '/static/images/solar-terms/yushui.png',
    season: 'spring',
  },
  {
    id: 'qingming',
    name: '清明',
    description: '广步于庭度久卧，时令青蒿藏之宜。',
    imageUrl: '/static/images/solar-terms/qingming.png',
    season: 'spring',
  },
  {
    id: 'lixia',
    name: '立夏',
    description: '转眼返日好入眠，晨起涌泉多擦擦。',
    imageUrl: '/static/images/solar-terms/lixia.png',
    season: 'summer',
  },
  {
    id: 'qiufen',
    name: '秋分',
    description: '秋凉胃病渐增多，南瓜煮粥保安康。',
    imageUrl: '/static/images/solar-terms/qiufen.png',
    season: 'autumn',
  },
  {
    id: 'dahan',
    name: '大寒',
    description: '三九温补最当时，羊肉萝卜不可少。',
    imageUrl: '/static/images/solar-terms/dahan.png',
    season: 'winter',
  },
  {
    id: 'xiaohan',
    name: '小寒',
    description: '防寒保暖要做好，适当进补养阳气。',
    imageUrl: '/static/images/solar-terms/xiaohan.png',
    season: 'winter',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 当前分类
const currentCategory = ref('全部')

// 分类列表
const categories = ['全部', '春季', '夏季', '秋季', '冬季']

// 过滤后的节气列表
const filteredTerms = computed(() => {
  return solarTerms.value.filter((term) => {
    // 搜索过滤
    const matchesSearch = term.name.includes(searchKeyword.value)
      || term.description.includes(searchKeyword.value)

    // 分类过滤
    const matchesCategory = currentCategory.value === '全部'
      || (currentCategory.value === '春季' && term.season === 'spring')
      || (currentCategory.value === '夏季' && term.season === 'summer')
      || (currentCategory.value === '秋季' && term.season === 'autumn')
      || (currentCategory.value === '冬季' && term.season === 'winter')

    return matchesSearch && matchesCategory
  })
})

// 处理节气点击
function handleTermClick(term: SolarTerm) {
  uni.navigateTo({
    url: `/pages/normal/healthcare/solar-term-detail?id=${term.id}`,
  })
}

// 清空搜索
function clearSearch() {
  searchKeyword.value = ''
}
</script>

<template>
  <view class="solar-terms-page px-4 py-4">
    <view class="mb-6">
      <!-- 搜索框 -->
      <view class="relative mb-4">
        <input
          v-model="searchKeyword"
          class="w-full border border-gray-200 rounded-lg bg-gray-50 py-2.5 pl-10 pr-12 text-sm"
          placeholder="搜索养生关键词"
        >
        <uni-icons class="absolute left-3 top-1/2 text-gray-400 -translate-y-1/2" type="search" size="20" />
        <uni-icons
          v-if="searchKeyword"
          class="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2"
          type="clear"
          size="20"
          @click="clearSearch"
        />
      </view>

      <!-- 分类标签 -->
      <view class="flex space-x-2 justify-between mb-4">
        <view
          v-for="category in categories"
          :key="category"
          class="flex-1 rounded-full py-1.5 text-xs text-center transition-colors whitespace-nowrap"
          :class="{
            'bg-orange-500 text-white': currentCategory === category,
            'bg-gray-100 text-gray-600': currentCategory !== category,
          }"
          @click="currentCategory = category"
        >
          {{ category }}
        </view>
      </view>
    </view>

    <!-- 节气列表 -->
    <view class="grid grid-cols-2 gap-4">
      <view
        v-for="term in filteredTerms"
        :key="term.id"
        class="overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm transition-all duration-300 active:scale-[0.98] hover:shadow-md"
        @click="handleTermClick(term)"
      >
        <view class="p-4">
          <view class="mb-2 flex items-center justify-between">
            <view class="text-lg text-gray-800 font-bold">
              {{ term.name || '节气名称' }}
            </view>
          </view>
          <view class="mb-3 text-sm text-gray-600">
            {{ term.description || '节气描述' }}
          </view>
          <view class="flex justify-end">
            <image v-if="term.imageUrl" :src="term.imageUrl" class="h-16 w-16 object-contain" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
