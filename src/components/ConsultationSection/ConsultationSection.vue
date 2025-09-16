<script lang="ts" setup>
interface Props {
  title?: string
  subtitle?: string
  healthManagerMessage?: string
  consultButtonText?: string
  membershipText?: string
  upgradeText?: string
  width?: string
  height?: string
  marginLeft?: string
  marginTop?: string
}

interface Emits {
  (e: 'consultClick'): void
  (e: 'upgradeClick'): void
  (e: 'healthManagerClick'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '专业咨询',
  subtitle: '为您及家人健康提供专属服务',
  healthManagerMessage: '[健康管家]您最近身体怎么样？',
  consultButtonText: '问医生',
  membershipText: '升级会员 享更多权益',
  upgradeText: '去升级',
  width: '702rpx',
  height: '300rpx',
  marginLeft: '24rpx',
  marginTop: '60rpx',
})

const emit = defineEmits<Emits>()

const handleConsultClick = () => {
  emit('consultClick')
}

const handleUpgradeClick = () => {
  emit('upgradeClick')
}

const handleHealthManagerClick = () => {
  emit('healthManagerClick')
}
</script>

<template>
  <div 
    class="relative isolate z-0 flex flex-col items-start"
    :style="{
      marginLeft: props.marginLeft,
      marginTop: props.marginTop,
      height: props.height,
      width: props.width,
    }"
  >
    <!-- 医生图片 -->
    <img
      class="relative z-4 ml-[410rpx] h-[262rpx] w-[274rpx] flex-shrink-0 object-cover -mt-[52rpx]"
      src="@img/homepage/decoration.png"
      alt="医生装饰图"
    >

    <!-- 背景矩形 -->
    <div class="relative z-1 ml-0 h-[300rpx] w-[702rpx] flex-shrink-0 rounded-[16rpx] from-[#feca75] to-[#d4b477] bg-gradient-to-r -mt-[210rpx]" />

    <!-- 专业咨询标题 -->
    <span class="relative z-3 ml-[24rpx] flex-shrink-0 whitespace-pre from-[#97493d] to-[#ba7720] bg-gradient-to-b bg-clip-text text-[40rpx] text-transparent font-bold leading-[100%] -mt-[252rpx]">
      {{ props.title }}
    </span>

    <!-- 副标题 -->
    <span class="relative z-2 ml-[24rpx] mt-[24rpx] flex-shrink-0 whitespace-pre text-[28rpx] text-white font-medium leading-[100%]">
      {{ props.subtitle }}
    </span>

    <!-- 健康管家消息框 -->
    <div 
      class="relative isolate z-5 ml-[24rpx] mt-[54rpx] h-[80rpx] w-[654rpx] flex flex-shrink-0 flex-col items-start cursor-pointer"
      @click="handleHealthManagerClick"
    >
      <img
        class="relative z-1 ml-[540rpx] h-[20rpx] w-[36rpx] -mt-[13rpx]"
        src="@img/homepage/arrow-icon.png"
        alt="箭头图标"
      >
      <div class="relative isolate z-0 ml-0 h-[80rpx] w-[654rpx] flex flex-row items-start rounded-[40rpx] from-white to-[#fef9eb] bg-gradient-to-b -mt-[7rpx]">
        <img
          class="relative z-2 ml-[16rpx] mt-[20rpx] h-[40rpx] w-[40rpx]"
          src="@img/homepage/health-manager-icon.png"
          alt="健康管家图标"
        >
        <span class="relative z-0 ml-[16rpx] mt-[28rpx] whitespace-pre text-[22rpx] text-[#967f64] font-normal leading-[24rpx]">
          {{ props.healthManagerMessage }}
        </span>
        <div 
          class="relative z-1 ml-[116rpx] mt-[12rpx] h-[56rpx] w-[148rpx] flex flex-col items-start whitespace-pre rounded-[32rpx] from-[#f0c67a] to-[#eba54b] bg-gradient-to-b text-[24rpx] text-white font-medium leading-[100%] cursor-pointer"
          @click.stop="handleConsultClick"
        >
          <span class="relative ml-[38rpx] mt-[16rpx]">
            {{ props.consultButtonText }}
          </span>
        </div>
      </div>
    </div>

    <!-- 会员权益矩形 -->
    <div 
      class="relative isolate z-0 ml-0 mt-0 h-[98rpx] w-[702rpx] flex flex-shrink-0 flex-row items-start rounded-[16rpx] from-[#f6e2d3] to-[#ece3d1] bg-gradient-to-r cursor-pointer"
      @click="handleUpgradeClick"
    >
      <span class="relative z-1 ml-[24rpx] mt-[50rpx] whitespace-pre text-[24rpx] text-[#ae956d] font-medium leading-[100%]">
        {{ props.membershipText }}
      </span>
      <span class="relative z-0 ml-[328rpx] mt-[50rpx] whitespace-pre text-[24rpx] text-[#ae956d] font-medium leading-[100%]">
        {{ props.upgradeText }}
      </span>
      <img
        class="relative z-2 ml-[8rpx] mt-[50rpx] h-[24rpx] w-[24rpx]"
        src="@img/homepage/upgrade-arrow.png"
        alt="升级箭头"
      >
    </div>
  </div>
</template>

<style scoped>
/* 可以在这里添加额外的样式 */
</style>
