<script lang="ts" setup>
definePage({
  style: {
    navigationBarTitleText: '患者',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: false,
})
</script>

<template root="uniKuRoot">
  <!-- page-meta 使用范例 -->
  <page-meta page-style="overflow: auto" />
  <view>
    <view class="h-6" />
  </view>
</template>
