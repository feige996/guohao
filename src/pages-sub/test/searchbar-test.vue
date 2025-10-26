<script lang="ts" setup>
import SearchBar from 'components-bak/SearchBar'

definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'SearchBar 测试',
  },
})

const searchValue = ref('')

function handleSearch(value: string) {
  console.log('搜索:', value)
  uni.showToast({
    title: `搜索: ${value}`,
    icon: 'none',
  })
}

function handleClick() {
  console.log('点击搜索栏')
  uni.showToast({
    title: '点击了搜索栏',
    icon: 'none',
  })
}

function handleInput(value: string) {
  console.log('输入:', value)
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f4] p-[24rpx]">
    <div class="mb-[40rpx] text-center font-bold text-[32rpx]">
      SearchBar 组件测试 (搜索按钮在输入框内)
    </div>

    <!-- 基础用法 -->
    <div class="mb-[40rpx]">
      <div class="mb-[20rpx] font-medium text-[28rpx]">
        基础用法:
      </div>
      <SearchBar
        placeholder="请输入搜索内容"
        @search="handleSearch"
        @click="handleClick"
      />
      <div class="mt-[10rpx] text-[#666] text-[24rpx]">
        ✨ 搜索按钮现在在输入框内部，使用 wot-design-uni 的 suffix 插槽实现
      </div>
    </div>

    <!-- 双向绑定 -->
    <div class="mb-[40rpx]">
      <div class="mb-[20rpx] font-medium text-[28rpx]">
        双向绑定:
      </div>
      <SearchBar
        v-model="searchValue"
        placeholder="双向绑定测试"
        @search="handleSearch"
        @input="handleInput"
      />
      <div class="mt-[20rpx] text-[#666] text-[24rpx]">
        当前值: {{ searchValue }}
      </div>
    </div>

    <!-- 自定义样式 -->
    <div class="mb-[40rpx]">
      <div class="mb-[20rpx] font-medium text-[28rpx]">
        自定义样式:
      </div>
      <SearchBar
        placeholder="自定义样式测试"
        button-text="查找"
        width="600rpx"
        height="70rpx"
        margin-left="0"
        margin-top="0"
        @search="handleSearch"
      />
    </div>

    <!-- 清空按钮 -->
    <div class="mb-[40rpx]">
      <button
        class="h-[80rpx] w-full rounded-[16rpx] bg-[#97493d] text-white text-[28rpx]"
        @click="searchValue = ''"
      >
        清空输入值
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 测试页面样式 */
</style>
