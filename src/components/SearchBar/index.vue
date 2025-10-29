<script lang="ts" setup>
import { ref } from 'vue'
import searchIcon from './search.png'

// 响应式变量用于存储搜索输入框的值
const searchQuery = ref('')

/**
 * 处理搜索按钮点击事件
 * 获取输入框的值并执行搜索操作
 */
function handleSearch() {
  console.log('搜索患者:', searchQuery.value)
  // 可以在这里添加额外的搜索逻辑
}
</script>

<template>
  <!-- 搜索栏 -->
  <view class="bg-transparent pb-2 pt-2">
    <view class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索患者名称/疾病"
        class="box-border h-10 w-full rounded-full bg-[#F8F8F880] pl-8 pr-4 text-sm text-[#A59D8B] focus:outline-none"
      >
      <view class="absolute left-3 top-1/2 center transform -translate-y-1/2">
        <image :src="searchIcon" class="h-4 w-4" />
      </view>
      <button class="absolute right-1 top-1/2 transform rounded-full bg-[#97493D] px-4 py-[6px] text-sm text-white -translate-y-1/2" @click="handleSearch">
        搜索
      </button>
    </view>
  </view>
</template>
