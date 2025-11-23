<template>
  <wd-popup
    v-model="visible"
    position="bottom"
    closable
    :safe-area-inset-bottom="true"
    custom-style="border-radius: 32rpx 32rpx 0 0;"
    @close="handleClose"
  >
    <view class="h-80vh flex flex-col">
      <!-- 标题 -->
      <view class="flex-shrink-0 border-b border-gray-200 p-32rpx">
        <text class="text-32rpx text-gray-800 font-bold">选择健康问题</text>
      </view>

      <!-- 搜索框 -->
      <view class="flex-shrink-0 px-32rpx pb-16rpx pt-24rpx">
        <view class="flex items-center gap-16rpx border border-gray-200 rounded-16rpx bg-gray-50 px-24rpx py-16rpx">
          <text class="text-28rpx">🔍</text>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索症状或分类"
            class="flex-1 bg-transparent text-26rpx text-gray-700 placeholder:text-gray-400"
          >
        </view>
      </view>

      <!-- 类型列表 -->
      <scroll-view scroll-y class="flex-1 overflow-hidden px-32rpx py-16rpx">
        <view v-if="filteredTypes.length === 0" class="flex items-center justify-center py-80rpx">
          <text class="text-26rpx text-gray-400">未找到相关健康问题</text>
        </view>
        <view v-else class="flex flex-col gap-12rpx">
          <view
            v-for="type in filteredTypes"
            :key="type.id"
            class="flex items-center justify-between border-2rpx rounded-16rpx p-20rpx transition-all active:scale-98"
            :class="isSelected(type.id) ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'"
            @tap="toggleType(type.id)"
          >
            <view class="flex flex-1 flex-col gap-4rpx">
              <text class="mb-4rpx text-28rpx text-gray-800 font-semibold">{{ type.label }}</text>
              <text class="text-22rpx text-gray-500">{{ type.category }}</text>
            </view>
            <view
              class="h-40rpx w-40rpx flex items-center justify-center border-2rpx rounded-8rpx transition-all"
              :class="isSelected(type.id) ? 'border-primary bg-primary' : 'border-gray-300 bg-white'"
            >
              <text v-if="isSelected(type.id)" class="text-24rpx text-white font-bold">✓</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 底部操作栏 -->
      <view class="flex flex-shrink-0 items-center justify-between border-t border-gray-200 bg-white p-32rpx">
        <view class="text-26rpx text-gray-600">
          已选 <text class="text-primary font-bold">{{ selectedIds.length }}</text> 项
        </view>
        <wd-button
          type="primary"
          custom-class="confirm-btn"
          @click="handleConfirm"
        >
          确定
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<script setup lang="ts">
interface ConsultationType {
  id: string
  label: string
  category: string
}

interface Props {
  modelValue: boolean
  types: ConsultationType[]
  selectedIds: string[]
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:selectedIds', value: string[]): void
  (e: 'confirm'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  types: () => [],
  selectedIds: () => [],
})

const emit = defineEmits<Emits>()

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const searchKeyword = ref('')

const filteredTypes = computed(() => {
  if (!searchKeyword.value.trim()) {
    return props.types
  }
  const keyword = searchKeyword.value.trim().toLowerCase()
  return props.types.filter(
    type =>
      type.label.toLowerCase().includes(keyword)
      || type.category.toLowerCase().includes(keyword),
  )
})

function isSelected(id: string) {
  return props.selectedIds.includes(id)
}

function toggleType(id: string) {
  const newSelectedIds = [...props.selectedIds]
  const index = newSelectedIds.indexOf(id)

  if (index > -1) {
    // 至少保留一个
    if (newSelectedIds.length > 1) {
      newSelectedIds.splice(index, 1)
    }
    else {
      uni.showToast({
        title: '至少选择一个健康问题',
        icon: 'none',
      })
      return
    }
  }
  else {
    newSelectedIds.push(id)
  }

  emit('update:selectedIds', newSelectedIds)
}

function handleConfirm() {
  if (props.selectedIds.length === 0) {
    uni.showToast({
      title: '请至少选择一个健康问题',
      icon: 'none',
    })
    return
  }
  emit('confirm')
  visible.value = false
}

function handleClose() {
  searchKeyword.value = ''
  visible.value = false
}
</script>

<style lang="scss" scoped>
:deep(.confirm-btn) {
  padding: 12rpx 56rpx !important;
  height: 76rpx !important;
  border-radius: 76rpx !important;
  font-size: 28rpx !important;
  font-weight: 600 !important;
  background: linear-gradient(135deg, #a85545 0%, #6d3329 100%) !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(142, 67, 55, 0.3) !important;

  &:active {
    transform: scale(0.96);
    box-shadow: 0 2px 8px rgba(142, 67, 55, 0.3) !important;
  }
}
</style>
