<script lang="ts" setup>
import { ref } from 'vue'
import alertIcon from './alert.png'
import searchIcon from './search.png'

withDefaults(defineProps<{
  placeholder?: string
  isAskDoctor?: boolean
  searchText?: string
}>(), {
  placeholder: '搜索患者名称/疾病',
  isAskDoctor: false,
  searchText: '搜索',
})

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
  <view class="bg-transparent">
    <view class="relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="box-border h-10 w-full rounded-full pl-8 pr-4 text-sm text-[#A59D8B] focus:outline-none"
        :class="isAskDoctor ? 'bg-[#ffffff]' : 'bg-[#F8F8F880]'"
      >
      <view class="absolute top-1/2 center transform -translate-y-1/2" :class="isAskDoctor ? 'left-2' : 'left-3'">
        <image v-if="isAskDoctor" :src="alertIcon" class="mb-[3px] h-5 w-5" />
        <image v-else :src="searchIcon" class="mb-[2px] h-4 w-4" />
      </view>

      <button class="absolute right-1 top-1/2 transform rounded-full px-4 py-[6px] text-sm text-white -translate-y-1/2" :class="isAskDoctor ? 'linearBg' : 'bg-[#97493D]'" @click="handleSearch">
        {{ searchText }}
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.linearBg {
  background: linear-gradient(180deg, #f0c67a 0%, #eba54b 98%);
}
</style>
