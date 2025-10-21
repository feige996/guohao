<script setup lang="ts">
// 医疗服务菜单项配置
const medicalServices = [
  {
    title: '导诊顾问',
    desc: '不清楚挂什么科？问我！',
    path: '/pages/normal/consultation-guide/index',
  },
  {
    title: '购药服务',
    desc: '在线开方，便捷购药',
    path: '/pages/normal/medication-purchase-service/index',
  },
  {
    title: '在线问诊',
    desc: '中医专家，实时沟通',
    path: '/pages/normal/online-consultation/index',
  },
]

// 菜单项点击处理
function handleServiceClick(item: { title: string; path: string }) {
  console.log('点击医疗服务项:', item.title, '路径:', item.path)
  try {
    const result = uni.navigateTo({
      url: item.path,
      success: () => console.log(`${item.title}页面跳转成功`),
      fail: (err) => {
        console.error(`${item.title}页面跳转失败:`, err)
        // 显示错误提示
        uni.showToast({
          title: `跳转失败: ${err.errMsg || '未知错误'}`,
          icon: 'none',
          duration: 3000
        })
      }
    })
    console.log('导航返回结果:', result)
  } catch (error) {
    console.error('导航发生异常:', error)
    uni.showToast({
      title: '导航异常，请重试',
      icon: 'none',
      duration: 3000
    })
  }
}
</script>

<template>
  <view class="rounded-[8rpx] bg-white px-3 py-4">
    <view class="mb-2 flex-shrink-0 whitespace-pre text-[#0e0e0e] font-medium text-[32rpx] leading-[40rpx]">
      医疗服务
    </view>
    <view
      v-for="(item, index) in medicalServices"
      :key="index"
      class="flex items-center gap-2 leading-10"
      @click="handleServiceClick(item)"
    >
      <view class="flex-1 text-[#333333] text-[28rpx]">
        {{ item.title }}
      </view>
      <text class="ml-auto text-xs text-[#ccc]">{{ item.desc }}</text>
      <image
        src="/static/images/homepage/arrow-right.png"
        class="h-[24rpx] w-[24rpx]"
      />
    </view>
  </view>
</template>
