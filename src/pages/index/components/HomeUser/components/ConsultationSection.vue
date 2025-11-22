<script lang="ts" setup>
// 跳转到健康问答页面
function goToHealthConsult() {
  uni.navigateTo({
    url: '/pages-user-index/azixunCard/healthConsult',
    success: () => {
      console.log('成功跳转到健康问答页面')
    },
    fail: (err) => {
      console.error('跳转到健康问答页面失败:', err)
    },
  })
}
const searchQuery = ref('')
</script>

<template>
  <view class="consultation-section relative mt-6 cursor-pointer rounded-lg p-3 pt-6" @click="goToHealthConsult">
    <view class="consultation-title">
      专业咨询
    </view>
    <view class="consultation-subtitle mt-2">
      为您及家人健康提供专属服务
    </view>
    <view class="relative mt-4">
      <!-- 右侧的一个医生图片 -->
      <view class="absolute bottom-12 right-2">
        <image src="/static/images/home-user/doctor-avatar.png" class="mt-4 h-[131px] w-[137px]" />
      </view>
      <SearchBar placeholder="[健康管家]您最近身体怎么样？" is-ask-doctor search-text="问医生" @search="searchQuery = $event" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
// ToDo专业咨询卡片
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
