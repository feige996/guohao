<script setup lang="ts">
import { ref } from 'vue'

// 导航栏标题
const pageTitle = ref('养生单方')

// 搜索关键词
const searchKeyword = ref('')

// 当前选中的标签
const activeTab = ref('today') // today或total

// 方剂列表数据
const prescriptionList = ref([
  { id: '1', name: '小柴胡汤', category: '和解剂', description: '和解少阳。' },
  { id: '2', name: '补中益气汤', category: '补益剂', description: '补中益气，升阳举陷。' },
  { id: '3', name: '桂枝汤', category: '解表剂', description: '解肌发表，调和营卫。' },
  { id: '4', name: '四君子汤', category: '补益剂', description: '益气健脾。' },
  { id: '5', name: '半夏泻心汤', category: '和解剂', description: '寒热平调，消痞散结。' },
  { id: '6', name: '柴胡疏肝散', category: '理气剂', description: '疏肝解郁，行气止痛。' },
  { id: '7', name: '参苓白术散', category: '补益剂', description: '益气健脾，渗湿止泻。' },
  { id: '8', name: '五苓散', category: '祛湿剂', description: '利水渗湿，温阳化气。' },
  { id: '9', name: '四物汤', category: '补益剂', description: '补血调血。' },
  { id: '10', name: '真武汤', category: '祛湿剂', description: '温阳利水。' }
])

// 处理返回按钮点击
function handleBack() {
  uni.navigateBack()
}

// 处理搜索
function handleSearch() {
  uni.showToast({
    title: `搜索: ${searchKeyword.value}`,
    icon: 'none'
  })
}

// 处理标签切换
function handleTabChange(tab: string) {
  activeTab.value = tab
  // 这里可以根据选中的标签加载不同的数据
}

// 处理查看方剂详情
function handleViewPrescription(id: string, name: string) {
  uni.navigateTo({
    url: `/pages/normal/medication-purchase-service/prescription-detail?id=${id}&name=${encodeURIComponent(name)}`
  })
}

// 处理热榜标题点击
function handleHotListClick() {
  uni.showToast({
    title: '查看更多热榜',
    icon: 'none'
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <!-- 导航栏 -->
    <div class="relative h-[44px] flex items-center justify-center bg-white px-[16px] border-b border-[#e5e5e5]">
      <div class="absolute left-[16px] z-10 flex items-center justify-center p-[8px] -ml-[8px]" @click="handleBack">
        <uni-icons type="back" size="24" color="#333333" />
      </div>
      <h1 class="text-[18px] text-[#333333] font-medium">
        {{ pageTitle }}
      </h1>
    </div>

    <!-- 搜索框 -->
    <div class="p-[12px]">
      <div class="flex items-center rounded-[8px] bg-white px-[12px] border border-[#e5e5e5]">
        <uni-icons type="search" size="20" color="#999999" />
        <input 
          type="text" 
          v-model="searchKeyword"
          placeholder="搜索病症、方剂名称"
          class="ml-[8px] flex-1 bg-transparent py-[8px] text-[14px] text-[#333333] outline-none"
        />
        <div class="text-[#0957DE] text-[14px]" @click="handleSearch">搜索</div>
      </div>
    </div>

    <!-- 热榜标题区域 -->
    <div class="bg-[#fff1f0] px-[16px] py-[10px] flex items-center justify-between">
      <div class="flex items-center">
        <uni-icons type="heart" size="16" color="#ff4d4f" class="mr-[6px]" />
        <h2 class="text-[16px] font-medium text-[#333333]">方剂热榜皮</h2>
      </div>
      <div class="flex items-center text-[#ff4d4f] text-[14px]" @click="handleHotListClick">
        <span>更多</span>
        <uni-icons type="arrow-right" size="14" class="ml-[2px]" />
      </div>
    </div>

    <!-- 标签切换 -->
    <div class="bg-white px-[16px] py-[10px] flex border-b border-[#f0f0f0]">
      <div 
        class="mr-[24px] text-[14px] pb-[2px]" 
        :class="activeTab === 'today' ? 'text-[#ff4d4f] border-b-2 border-[#ff4d4f]' : 'text-[#666666]'"
        @click="handleTabChange('today')"
      >
        今日
      </div>
      <div 
        class="text-[14px] pb-[2px]"
        :class="activeTab === 'total' ? 'text-[#ff4d4f] border-b-2 border-[#ff4d4f]' : 'text-[#666666]'"
        @click="handleTabChange('total')"
      >
        总榜
      </div>
    </div>

    <!-- 方剂列表 -->
    <div class="bg-white">
      <div v-for="(item, index) in prescriptionList" :key="item.id" class="px-[16px] py-[14px] border-b border-[#f0f0f0]">
        <div class="flex items-center justify-between mb-[8px]">
          <div class="flex-1 flex items-center">
            <div class="h-[24px] w-[24px] rounded-full bg-[#fff1f0] flex items-center justify-center mr-[12px] flex-shrink-0">
              <span class="text-[12px] font-medium text-[#ff4d4f]">{{ index + 1 }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-[14px] font-medium text-[#333333] truncate">
                {{ item.name }}
                <span class="ml-[8px] py-[1px] px-[6px] rounded-[10px] bg-[#fff1f0] text-[#ff4d4f] text-[11px]">{{ item.category }}</span>
              </span>
            </div>
          </div>
          <button 
            class="ml-[12px] py-[4px] px-[12px] bg-[#ffd791] rounded-[14px] text-[14px] font-medium text-[#a05000] w-[60px] flex items-center justify-center"
            @click="handleViewPrescription(item.id, item.name)"
          >
            查看
          </button>
        </div>
        <div class="ml-[36px] text-[12px] text-[#666666]">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>