<script lang="ts" setup>
interface Props {
  placeholder?: string
  buttonText?: string
  width?: string
  height?: string
  marginLeft?: string
  marginTop?: string
  modelValue?: string
}

interface Emits {
  (e: 'search', value: string): void
  (e: 'click'): void
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '搜索疾病、症状、科室等',
  buttonText: '搜索',
  width: '702rpx',
  height: '80rpx',
  marginLeft: '24rpx',
  marginTop: '0rpx',
  modelValue: '',
})

const emit = defineEmits<Emits>()

// 内部输入值
const inputValue = ref(props.modelValue)

// 监听外部传入的值变化
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// 监听内部值变化，同步到外部
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
  emit('input', newValue)
})

function handleSearch() {
  emit('search', inputValue.value)
}

function handleInputClick() {
  emit('click')
}
</script>

<template>
  <div
    class="relative"
    :style="{
      marginLeft: props.marginLeft,
      marginTop: props.marginTop,
      width: props.width,
    }"
  >
    <wd-input
      v-model="inputValue"
      :placeholder="props.placeholder"
      :height="props.height"
      shape="round"
      clearable
      custom-style="background-color: #f7f4f3; border: none; border-radius: 660rpx; font-size: 24rpx; color: #333333;"
      placeholder-style="color: #cccccc; font-size: 24rpx;"
      @click="handleInputClick"
      @confirm="handleSearch"
    >
      <!-- 前置图标插插槽  -->
      <template #prefix>
        <wd-icon name="search" class="pl-[20rpx] text-[#999999]" />
      </template>

      <!-- 搜索按钮插槽 -->
      <template #suffix>
        <div
          class="mr-[4rpx] h-[54rpx] w-[100rpx] flex cursor-pointer items-center justify-center rounded-[100rpx] bg-[#97493d]"
          @click="handleSearch"
        >
          <span class="text-center text-white font-normal text-[24rpx]">
            {{ props.buttonText }}
          </span>
        </div>
      </template>
    </wd-input>
  </div>
</template>

<style scoped>
/* 可以在这里添加额外的样式 */
</style>
