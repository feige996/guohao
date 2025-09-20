<script lang="ts" setup>
import type { ConstitutionCardEmits, ConstitutionCardProps } from './types'
import { onMounted, ref } from 'vue'
import Apis from '@/api/guohao-api'

const props = withDefaults(defineProps<ConstitutionCardProps>(), {
  constitutionType: '平和体质',
  adviceTitle: '',
  adviceContent: '糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。',
  badgeImageUrl: '@img/homepage/constitution-badge.png',
})

// 定义事件
const emit = defineEmits<ConstitutionCardEmits>()

// 响应式数据
const currentAdviceTitle = ref(props.adviceTitle)
const currentAdviceContent = ref(props.adviceContent)
const isLoading = ref(false)

// 弹窗控制
const showModal = ref(false)

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

// 关闭弹窗
function closeModal(event?: Event) {
  // 阻止事件冒泡，防止触发父级的点击事件
  if (event) {
    event.stopPropagation()
  }
  showModal.value = false
}

// 打开弹窗
function openModal() {
  showModal.value = true
}
</script>

<template>
  <div
    class="relative h-[280rpx] w-[334rpx] flex flex-col items-start"
  >
    <div
      class="relative ml-0 mt-0 h-[280rpx] w-[334rpx] flex flex-col cursor-pointer items-start rounded-[16rpx] from-[#fff1f2] to-[#fce3e1] bg-gradient-to-br"
      @click="openModal"
    >
      <div
        class="relative ml-[16rpx] mt-[16rpx] h-[40rpx] w-[288rpx] flex flex-row cursor-pointer items-start"
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
        >
          <span class="relative ml-[16rpx] mt-[22rpx] w-[270rpx] text-justify text-[#ababab] font-medium line-clamp-4 text-[24rpx] leading-[40rpx]">
            {{ isLoading ? '请稍候...' : currentAdviceContent }}
          </span>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <wd-popup
      v-model="showModal"
      position="bottom"
      :safe-area-inset-bottom="true"
      closable
      custom-style="height: 80vh; border-radius: 24rpx 24rpx 0 0; background: #f5f7f4;"
      @close="closeModal"
    >
      <!-- 弹窗头部 -->
      <div class="popup-header">
        <div class="header-icon">
          <span class="icon-text">💡</span>
        </div>
        <h2 class="popup-title">
          健康小妙招
        </h2>
        <p class="popup-subtitle">
          {{ currentAdviceTitle }}
        </p>
      </div>

      <!-- 弹窗内容 -->
      <div class="popup-body">
        <!-- 主要内容卡片 -->
        <div class="content-card">
          <div class="content-header">
            <span class="content-label">养生建议</span>
            <div class="refresh-btn" @click="fetchRandomHealthTip">
              <span class="refresh-icon">🔄</span>
              <span class="refresh-text">换一个</span>
            </div>
          </div>
          <div class="content-text">
            {{ isLoading ? '正在获取新的健康小妙招...' : currentAdviceContent }}
          </div>
        </div>

        <!-- 温馨提示卡片 -->
        <div class="tip-card">
          <div class="tip-header">
            <span class="tip-icon">⚠️</span>
            <span class="tip-title">温馨提示</span>
          </div>
          <div class="tip-content">
            以上建议仅供参考，具体情况请咨询专业医师。每个人的体质不同，请根据自身情况适量调整。
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button class="action-btn secondary-btn" @click="closeModal">
            知道了
          </button>
          <button class="action-btn primary-btn" @click="fetchRandomHealthTip">
            再看一个
          </button>
        </div>
      </div>
    </wd-popup>
  </div>
</template>

<style scoped>
/* 弹窗样式 - 与项目风格保持一致 */
.popup-header {
  padding: 40rpx 40rpx 32rpx;
  background: linear-gradient(135deg, #f6e2d3 0%, #f1d4c0 100%);
  border-radius: 24rpx 24rpx 0 0;
  text-align: center;
  position: relative;
}

.header-icon {
  margin-bottom: 16rpx;
}

.icon-text {
  font-size: 48rpx;
  display: inline-block;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.popup-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #ba7210;
  margin: 0 0 8rpx 0;
}

.popup-subtitle {
  font-size: 28rpx;
  color: #8b6914;
  margin: 0;
  font-weight: 500;
}

.popup-body {
  padding: 32rpx;
  background: #f5f7f4;
  max-height: calc(80vh - 140rpx);
  overflow-y: auto;
}

/* 内容卡片 */
.content-card {
  background: white;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid rgba(186, 114, 16, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 16rpx;
  border-bottom: 2rpx solid #f6e2d3;
}

.content-label {
  font-size: 30rpx;
  font-weight: 600;
  color: #ba7210;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 8rpx 16rpx;
  background: linear-gradient(135deg, #f6e2d3 0%, #f1d4c0 100%);
  border-radius: 20rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2rpx solid rgba(186, 114, 16, 0.2);
}

.refresh-btn:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 4rpx 8rpx rgba(186, 114, 16, 0.2);
}

.refresh-icon {
  font-size: 24rpx;
  animation: rotate 2s linear infinite paused;
}

.refresh-btn:active .refresh-icon {
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.refresh-text {
  font-size: 24rpx;
  color: #ba7210;
  font-weight: 500;
}

.content-text {
  font-size: 28rpx;
  line-height: 44rpx;
  color: #333333;
  text-align: justify;
  letter-spacing: 0.5rpx;
}

/* 提示卡片 */
.tip-card {
  background: linear-gradient(135deg, #fff9e6 0%, #fef3d9 100%);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
  border: 2rpx solid rgba(255, 193, 7, 0.3);
}

.tip-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.tip-icon {
  font-size: 28rpx;
}

.tip-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #ba7210;
}

.tip-content {
  font-size: 24rpx;
  line-height: 36rpx;
  color: #8b6914;
  text-align: justify;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 16rpx;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 24rpx 32rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 200rpx;
}

.secondary-btn {
  background: #f8f9fa;
  color: #6c757d;
  border: 2rpx solid #e9ecef;
}

.secondary-btn:hover {
  background: #e9ecef;
  transform: translateY(-2rpx);
}

.primary-btn {
  background: linear-gradient(135deg, #ba7210 0%, #8b6914 100%);
  color: white;
  box-shadow: 0 4rpx 12rpx rgba(186, 114, 16, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 16rpx rgba(186, 114, 16, 0.4);
}

.primary-btn:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .popup-header {
    padding: 32rpx 24rpx;
  }

  .popup-title {
    font-size: 32rpx;
  }

  .popup-subtitle {
    font-size: 26rpx;
  }

  .popup-body {
    padding: 24rpx;
  }

  .content-card {
    padding: 24rpx;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    max-width: none;
  }
}
</style>
