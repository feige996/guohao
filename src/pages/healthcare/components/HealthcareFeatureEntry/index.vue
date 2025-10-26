<script lang="ts" setup>
import { ref } from 'vue'

// 定义组件的 props 接口
interface FeatureEntry {
  id: string
  imageUrl: string
  title: string
  color: string
  description: string
}

// 定义功能入口数据
const features = ref<FeatureEntry[]>([
  {
    id: 'article',
    imageUrl: '/static/images/health-article.png',
    title: '养生文章',
    color: 'from-[#FFF8E6] to-[#FFF0CC]',
    description: '严选养生、中医知识',
  },
  {
    id: 'case',
    imageUrl: '/static/images/case-study.png',
    title: '案例分享',
    color: 'from-[#E6F7F0] to-[#B3E5DC]',
    description: '真实案例、经验分享',
  },
  {
    id: 'lecture',
    imageUrl: '/static/images/tcm-lecture.png',
    title: '中医讲堂',
    color: 'from-[#E6F0FF] to-[#B3CCFF]',
    description: '开启学习、健康生活',
  },
])

// 处理功能入口点击事件
function handleFeatureClick(feature: FeatureEntry) {
  console.log('点击功能入口:', feature)
  // 根据不同的功能入口跳转到不同的页面
  switch (feature.id) {
    case 'article':
      // 跳转到养生养气页面
      uni.navigateTo({
        url: '/pages/normal/healthcare/solar-terms',
      })
      break
    case 'case':
      // 跳转到案例分享页面
      uni.navigateTo({
        url: '/pages/normal/healthcare/article-list?type=case',
      })
      break
    case 'lecture':
      // 跳转到中医讲堂页面
      uni.navigateTo({
        url: '/pages/normal/healthcare/tcm-lecture-list',
      })
      break
    default:
      break
  }
}
</script>

<template>
  <view class="px-4 pb-4 mt-4">
    <view class="grid grid-cols-3 gap-3">
      <!-- 养生文章 -->
      <view
        class="relative overflow-hidden border border-gray-100 rounded-xl bg-white shadow-md transition-all duration-300 active:scale-[0.98] hover:shadow-lg"
        style="aspect-ratio: 1; width: 100%;"
        @click="handleFeatureClick(features[0])"
      >
        <view class="h-full flex flex-col items-center justify-center p-3">
          <view class="mb-2 h-12 w-12 rounded-lg bg-[#FFF8E6] p-1.5">
            <image :src="features[0].imageUrl" class="h-full w-full object-contain" mode="aspectFit" />
          </view>
          <view class="text-center">
            <view class="text-sm text-gray-800 font-bold">
              {{ features[0].title }}
            </view>
          </view>
        </view>
      </view>

      <!-- 案例分享 -->
      <view
        class="relative overflow-hidden border border-gray-100 rounded-xl bg-white shadow-md transition-all duration-300 active:scale-[0.98] hover:shadow-lg"
        style="aspect-ratio: 1; width: 100%;"
        @click="handleFeatureClick(features[1])"
      >
        <view class="h-full flex flex-col items-center justify-center p-3">
          <view class="mb-2 h-12 w-12 rounded-lg bg-[#E6F7F0] p-1.5">
            <image :src="features[1].imageUrl" class="h-full w-full object-contain" mode="aspectFit" />
          </view>
          <view class="text-center">
            <view class="text-sm text-gray-800 font-bold">
              {{ features[1].title }}
            </view>
          </view>
        </view>
      </view>

      <!-- 中医讲堂 -->
      <view
        class="relative overflow-hidden border border-gray-100 rounded-xl bg-white shadow-md transition-all duration-300 active:scale-[0.98] hover:shadow-lg"
        style="aspect-ratio: 1; width: 100%;"
        @click="handleFeatureClick(features[2])"
      >
        <view class="h-full flex flex-col items-center justify-center p-3">
          <view class="mb-2 h-12 w-12 rounded-lg bg-[#E6F0FF] p-1.5">
            <image :src="features[2].imageUrl" class="h-full w-full object-contain" mode="aspectFit" />
          </view>
          <view class="text-center">
            <view class="text-sm text-gray-800 font-bold">
              {{ features[2].title }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
