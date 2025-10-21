<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// 定义节气基础接口
interface SolarTerm {
  id: string
  name: string
  description: string
  imageUrl: string
}

// 定义节气详情接口
interface SolarTermDetail extends SolarTerm {
  tips: string
  audioUrl?: string
}

// 节气详情数据
const termDetail = ref<SolarTermDetail | null>(null)

// 是否播放音频
const isPlaying = ref(false)

// 获取路由参数
const route = useRoute()

// 获取节气ID - 同时考虑params和query中的id参数
const termId = computed(() => {
  // 优先从params中获取，然后尝试从query中获取
  const id = (route.params.id as string) || (route.query.id as string) || ''
  console.log('Computed termId:', id)
  return id
})

// 模拟获取节气详情数据
function getTermDetail(id: string): SolarTermDetail {
  console.log('getTermDetail called with id:', id)

  const details: Record<string, SolarTermDetail> = {
    yushui: {
      id: 'yushui',
      name: '雨水',
      description: '春捂下厚上且薄，调畅情志以养肝。',
      tips: '少酸略甜养脾胃，背背升阳驱体寒。\n\n雨水节气后，气温逐渐回升，降水也逐渐增多。雨水节气是最容易出现"倒春寒"的节气，春捂也有语恰到好处，注意下厚上薄，谨防寒从脚下起。',
      imageUrl: '/static/images/solar-terms/yushui-detail.png',
      audioUrl: '/static/audio/yushui.mp3',
    },
    qingming: {
      id: 'qingming',
      name: '清明',
      description: '广步于庭度久卧，时令青蒿藏之宜。',
      tips: '清明时节，万物复苏，阳气升发。此时宜顺应自然，早起锻炼，增加户外活动时间。饮食上宜清淡，多食时令蔬菜，如荠菜、春笋等，有助于肝气疏泄。',
      imageUrl: '/static/images/solar-terms/qingming-detail.png',
      audioUrl: '/static/audio/qingming.mp3',
    },
    lixia: {
      id: 'lixia',
      name: '立夏',
      description: '转眼返日好入眠，晨起涌泉多擦擦。',
      tips: '立夏后，阳气渐盛，万物生长旺盛。此时应调整作息，早睡早起，适当午休。饮食上宜清淡，多食清热祛湿的食物，如绿豆、冬瓜等，避免辛辣刺激。',
      imageUrl: '/static/images/solar-terms/lixia-detail.png',
      audioUrl: '/static/audio/lixia.mp3',
    },
    qiufen: {
      id: 'qiufen',
      name: '秋分',
      description: '秋凉胃病渐增多，南瓜煮粥保安康。',
      tips: '秋分时节，昼夜平分，气温逐渐转凉。此时应注意保暖，尤其是腹部和脚部。饮食上宜滋阴润肺，多食梨、百合、银耳等食物，少辛增酸，以养肝气。',
      imageUrl: '/static/images/solar-terms/qiufen-detail.png',
      audioUrl: '/static/audio/qiufen.mp3',
    },
    dahan: {
      id: 'dahan',
      name: '大寒',
      description: '三九温补最当时，羊肉萝卜不可少。',
      tips: '大寒是一年中最冷的节气，此时宜温补阳气。饮食上可适当食用羊肉、牛肉等温热食物，搭配萝卜、白菜等蔬菜，以达到阴阳平衡。同时注意保暖，避免过度劳累。',
      imageUrl: '/static/images/solar-terms/dahan-detail.png',
      audioUrl: '/static/audio/dahan.mp3',
    },
    xiaohan: {
      id: 'xiaohan',
      name: '小寒',
      description: '防寒保暖要做好，适当进补养阳气。',
      tips: '小寒标志着一年中最寒冷的日子开始。此时应特别注意防寒保暖，尤其是头部、颈部和脚部。饮食上宜温补，可食用桂圆、红枣、核桃等食物，同时适当运动，增强体质。',
      imageUrl: '/static/images/solar-terms/xiaohan-detail.png',
      audioUrl: '/static/audio/xiaohan.mp3',
    },
  }

  // 直接使用id查找，如果存在则返回，否则返回默认值
  const result = details[id] || details.yushui
  console.log('getTermDetail result:', result.name)
  return result
}

// 播放/暂停音频
function togglePlay() {
  if (isPlaying.value) {
    // 停止播放
    uni.stopVoice()
  }
  else if (termDetail.value?.audioUrl) {
    // 开始播放
    uni.playVoice({
      filePath: termDetail.value.audioUrl,
      success: () => {
        console.log('播放成功')
      },
      fail: (err) => {
        console.error('播放失败:', err)
      },
      complete: () => {
        isPlaying.value = false
      },
    })
  }
  isPlaying.value = !isPlaying.value
}

// 我要评论
function handleComment() {
  uni.showToast({
    title: '评论功能开发中',
    icon: 'none',
  })
}

// 我要收藏
function handleFavorite() {
  uni.showToast({
    title: '收藏成功',
    icon: 'success',
  })
}

// 我要分享
function handleShare() {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

// 监听页面加载
onMounted(() => {
  // 完整输出路由对象以调试
  console.log('路由对象完整信息:', route)
  console.log('路由params:', route.params)
  console.log('路由query:', route.query)

  // 尝试多种方式获取id
  const idFromParams = String(route.params.id || '')
  const idFromQuery = String(route.query.id || '')

  // 优先使用termId computed属性，它已经处理了参数获取逻辑
  const id = termId.value || idFromParams || idFromQuery || 'yushui'

  console.log('加载节气详情 - 最终使用的ID:', id)

  // 获取并设置节气详情
  termDetail.value = getTermDetail(id)
  console.log('加载的详情数据:', termDetail.value)

  // 额外的验证检查
  if (!termDetail.value || termDetail.value.id !== id) {
    console.warn('警告: 返回的数据ID与请求的ID不匹配', { requested: id, returned: termDetail.value?.id })
  }
})

// 监听页面卸载，停止播放
try {
  // 使用uni-app的页面生命周期
  const currentPage = getCurrentPages().slice(-1)[0]
  if (currentPage) {
    ;(currentPage as any).onUnload = function () {
      if (isPlaying.value) {
        uni.stopVoice()
      }
    }

    // 添加分享功能
    ;(currentPage as any).onShareAppMessage = function () {
      return {
        title: '节气养生 - 传统中医养生智慧',
        path: `/pages/normal/healthcare/solar-term-detail?id=${route.params.id}`,
      }
    }

    ;(currentPage as any).onShareTimeline = function () {
      return {
        title: '节气养生 - 传统中医养生智慧',
        query: `id=${route.params.id}`,
      }
    }
  }
}
catch (error) {
  console.error('注册页面事件失败:', error)
}
</script>

<template>
  <view class="solar-term-detail-page bg-white px-4 py-4">
    <view v-if="termDetail" class="space-y-6">
      <!-- 标题和播放按钮 -->
      <view class="flex items-center justify-between">
        <view class="text-2xl text-gray-800 font-bold">
          {{ termDetail.name }}
        </view>
        <button
          class="rounded-full bg-orange-100 p-2 text-orange-500"
          @click="togglePlay"
        >
          <uni-icons :type="isPlaying ? 'pause' : 'volume'" size="24" />
        </button>
      </view>

      <!-- 描述 -->
      <view class="text-lg text-gray-600 leading-relaxed">
        {{ termDetail.description }}
      </view>

      <!-- 养生要点 -->
      <view>
        <view class="mb-2 text-lg text-gray-800 font-bold">
          养生要点
        </view>
        <view class="whitespace-pre-line text-gray-600 leading-relaxed">
          {{ termDetail.tips }}
        </view>
      </view>

      <!-- 图片 -->
      <view class="my-4 flex justify-center">
        <image :src="termDetail.imageUrl" class="h-48 w-48 object-contain" mode="aspectFit" />
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-gray-100 bg-white p-4">
      <button
        class="mx-2 flex-1 rounded-full bg-orange-100 py-3 text-center text-orange-500 font-medium"
        @click="handleComment"
      >
        我要评论
      </button>
      <button
        class="mx-2 flex-1 rounded-full bg-orange-100 py-3 text-center text-orange-500 font-medium"
        @click="handleFavorite"
      >
        我要收藏
      </button>
      <button
        class="mx-2 flex-1 rounded-full bg-orange-500 py-3 text-center text-white font-medium"
        @click="handleShare"
      >
        我要分享
      </button>
    </view>
  </view>
</template>
