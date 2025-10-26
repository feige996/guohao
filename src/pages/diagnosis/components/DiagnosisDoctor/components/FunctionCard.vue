<script lang="ts" setup>
// 点击跳转至问诊房间
const dataList = [
  {
    icon: '/static/images/diagnosis-doctor/wdzs.png',
    iconArrow: '/static/images/diagnosis-doctor/wdzs-arrow.png',
    text: '我的诊室',
    bgColor: '#DEF0F3',
    jumpPath: '/pages/xx',
  },
  {
    icon: '/static/images/diagnosis-doctor/wykf.png',
    iconArrow: '/static/images/diagnosis-doctor/wykf-arrow.png',
    text: '我要开方',
    bgColor: '#FCE3E1',
    jumpPath: '/pages/xx',
  },
]

function handleClickItem(path: string) {
  uni.navigateTo({
    url: path,
  })
}
</script>

<template>
  <!-- 功能按钮区域 -->
  <view class="box-border h-70px flex gap-2">
    <view
      v-for="item in dataList"
      :key="item.text" class="flex flex-1 rounded-lg p-4 px-3"
      :style="{ backgroundColor: item.bgColor }"
      @click="handleClickItem(item.jumpPath)"
    >
      <view class="w-full flex items-center">
        <image :src="item.icon" class="mr-2 h-38px w-38px" />
        <text class="text-#070707 font-medium">{{ item.text }}</text>
        <image :src="item.iconArrow" class="ml-auto h-22px w-22px" />
      </view>
    </view>
  </view>
</template>
