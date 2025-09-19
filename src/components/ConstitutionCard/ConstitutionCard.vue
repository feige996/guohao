<script lang="ts" setup>
import type { ConstitutionCardEmits, ConstitutionCardProps } from './types'
import { onMounted, ref } from 'vue'
import Apis from '@/api/guohao-api'

const props = withDefaults(defineProps<ConstitutionCardProps>(), {
  constitutionType: '平和体质',
  adviceTitle: '气节养生建议：神仙粥',
  adviceContent: '糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。',
  badgeImageUrl: '@img/homepage/constitution-badge.png',
})

// 定义事件
const emit = defineEmits<ConstitutionCardEmits>()

// 响应式数据
const currentAdviceTitle = ref(props.adviceTitle)
const currentAdviceContent = ref(props.adviceContent)
const isLoading = ref(false)

// 获取随机健康小妙招
async function fetchRandomHealthTip() {
  try {
    isLoading.value = true
    const response = await Apis.app_healthskill.apiApp_healthskillRandomGet({
      params: {
        title: undefined, // 或者传入具体的健康症状关键词
      },
      meta: {
        ignoreAuth: true,
      },
    })

    console.log(response)

    if (response?.result?.title && response?.result?.content) {
      currentAdviceTitle.value = response.result.title
      currentAdviceContent.value = response.result.content
    }
  }
  catch (error) {
    console.error('获取健康小妙招失败:', error)
    // 保持原有内容，不显示错误提示
  }
  finally {
    isLoading.value = false
  }
}

// 组件挂载时获取随机健康小妙招
onMounted(() => {
  fetchRandomHealthTip()
})

function handleCardClick() {
  emit('click')
}

function handleConstitutionClick() {
  emit('constitutionClick')
}

function handleAdviceClick() {
  // 点击养生建议时重新获取随机小妙招
  fetchRandomHealthTip()
  emit('adviceClick')
}
</script>

<template>
  <div
    class="relative z-0 h-[280rpx] w-[334rpx] flex flex-col cursor-pointer items-start"
    @click="handleCardClick"
  >
    <div class="relative ml-0 mt-0 h-[280rpx] w-[334rpx] flex flex-col items-start rounded-[16rpx] from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br">
      <!-- 体质状态区域 -->
      <div
        class="relative ml-[16rpx] mt-[16rpx] h-[40rpx] w-[288rpx] flex flex-row cursor-pointer items-start"
        @click.stop="handleConstitutionClick"
      >
        <view class="flex items-center justify-center gap-[8rpx]">
          <span class="whitespace-pre text-[#ba7210] font-bold text-[24rpx] leading-[100%]">
            健康症状：
          </span>
          <wd-tag type="warning" mark class="whitespace-pre">
            {{ currentAdviceTitle }}
          </wd-tag>
        </view>
      </div>

      <!-- 养生建议区域 -->
      <div class="relative ml-[16rpx] mt-[16rpx] h-[192rpx] w-[302rpx] flex flex-col items-start">
        <div
          class="relative ml-0 mt-0 h-[192rpx] w-[302rpx] flex flex-col cursor-pointer items-start rounded-[8rpx] bg-white/50"
          @click.stop="handleAdviceClick"
        >
          <!-- <span class="relative ml-[18rpx] mt-[10rpx] whitespace-pre text-[#333333] font-medium text-[24rpx] leading-[100%]">
            {{ isLoading ? '正在获取健康小妙招...' : currentAdviceTitle }}
          </span> -->
          <span class="relative ml-[16rpx] mt-[22rpx] w-[270rpx] text-justify text-[#ababab] font-medium line-clamp-4 text-[24rpx] leading-[40rpx]">
            {{ isLoading ? '请稍候...' : currentAdviceContent }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>
