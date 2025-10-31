<script lang="ts" setup>

</script>

<template>
  <view class="consultation-section rounded-lg p-3 pt-6">
    <view class="consultation-title">
      专业咨询
    </view>
    <view class="consultation-subtitle mt-2">
      为您及家人健康提供专属服务
    </view>
    <SearchBar class="mt-4" placeholder="[健康管家]您最近身体怎么样？" is-ask-doctor search-text="问医生" />
  </view>
</template>

<style lang="scss" scoped>
// 专业咨询卡片
.consultation-section {
  background: linear-gradient(112deg, #feca75 0%, #d4b477 100%);
  .consultation-title {
    font-size: 20px;
    font-weight: bold;
    background: linear-gradient(180deg, #97493d 0%, #ba7720 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .consultation-subtitle {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
