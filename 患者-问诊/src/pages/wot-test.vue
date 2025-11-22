<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "Wot UI 测试",
    navigationBarBackgroundColor: "#FFFFFF",
  },
});

const showToast = () => {
  uni.showToast({
    title: 'Wot UI 安装成功！',
    icon: 'success'
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-50 p-6">
    <view class="mb-6">
      <text class="text-2xl font-bold text-gray-800">Wot Design Uni 组件测试</text>
    </view>

    <!-- 按钮测试 -->
    <view class="mb-6">
      <text class="block text-lg font-semibold mb-3">按钮组件</text>
      <view class="flex flex-col gap-3">
        <wd-button type="primary" @click="showToast">主要按钮</wd-button>
        <wd-button type="success">成功按钮</wd-button>
        <wd-button type="warning">警告按钮</wd-button>
        <wd-button type="error">错误按钮</wd-button>
        <wd-button type="info">信息按钮</wd-button>
      </view>
    </view>

    <!-- 单元格测试 -->
    <view class="mb-6">
      <text class="block text-lg font-semibold mb-3">单元格组件</text>
      <wd-cell-group>
        <wd-cell title="单元格" value="内容" />
        <wd-cell title="单元格" value="内容" label="描述信息" />
        <wd-cell title="单元格" is-link />
      </wd-cell-group>
    </view>

    <!-- 标签测试 -->
    <view class="mb-6">
      <text class="block text-lg font-semibold mb-3">标签组件</text>
      <view class="flex gap-2 flex-wrap">
        <wd-tag>默认标签</wd-tag>
        <wd-tag type="primary">主要标签</wd-tag>
        <wd-tag type="success">成功标签</wd-tag>
        <wd-tag type="warning">警告标签</wd-tag>
        <wd-tag type="danger">危险标签</wd-tag>
      </view>
    </view>

    <!-- 徽标测试 -->
    <view class="mb-6">
      <text class="block text-lg font-semibold mb-3">徽标组件</text>
      <view class="flex gap-6">
        <wd-badge value="8">
          <wd-button>按钮</wd-button>
        </wd-badge>
        <wd-badge value="99+" max="99">
          <wd-button>按钮</wd-button>
        </wd-badge>
        <wd-badge is-dot>
          <wd-button>按钮</wd-button>
        </wd-badge>
      </view>
    </view>

    <!-- 图标测试 -->
    <view class="mb-6">
      <text class="block text-lg font-semibold mb-3">图标组件</text>
      <view class="flex gap-4">
        <wd-icon name="add-circle" size="32px" />
        <wd-icon name="check-circle" size="32px" color="#4CAF50" />
        <wd-icon name="close-circle" size="32px" color="#F44336" />
        <wd-icon name="warning-circle" size="32px" color="#FF9800" />
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 使用 TailwindCSS，无需额外样式 */
</style>
