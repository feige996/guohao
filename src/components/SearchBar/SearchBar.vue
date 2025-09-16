<script lang="ts" setup>
interface Props {
  placeholder?: string
  buttonText?: string
  width?: string
  height?: string
  marginLeft?: string
  marginTop?: string
}

interface Emits {
  (e: 'search'): void
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索疾病、症状、科室等',
  buttonText: '搜索',
  width: '702rpx',
  height: '80rpx',
  marginLeft: '24rpx',
  marginTop: '104rpx',
})

const emit = defineEmits<Emits>()

const handleSearch = () => {
  emit('search')
}

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div 
    class="relative isolate z-1 flex flex-row items-start border border-[#cccccc] rounded-[660rpx] bg-[#f7f4f3] cursor-pointer"
    :style="{
      marginLeft: props.marginLeft,
      marginTop: props.marginTop,
      height: props.height,
      width: props.width,
    }"
    @click="handleClick"
  >
    <!-- 搜索图标 -->
    <img
      class="relative z-0 ml-[30rpx] mt-[24rpx] h-[32rpx] w-[32rpx]"
      src="@img/homepage/search-icon.png"
      alt="搜索图标"
    >
    
    <!-- 搜索按钮 -->
    <div 
      class="relative z-2 ml-[520rpx] mt-[8rpx] h-[64rpx] w-[112rpx] flex flex-col items-start rounded-[116rpx] bg-[#97493d] cursor-pointer"
      @click.stop="handleSearch"
    >
      <span class="relative mx-auto mt-[20rpx] w-max whitespace-pre text-center text-[24rpx] text-white font-normal leading-[100%]">
        {{ props.buttonText }}
      </span>
    </div>
    
    <!-- 占位符文本 -->
    <span class="absolute left-0 right-[298rpx] top-[28rpx] z-1 mx-auto w-max whitespace-pre text-[24rpx] text-[#cccccc] font-normal leading-[100%]">
      {{ props.placeholder }}
    </span>
  </div>
</template>

<style scoped>
/* 可以在这里添加额外的样式 */
</style>
