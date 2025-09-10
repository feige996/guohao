<script lang="ts" setup>
import ToolbarItemContainer from '../toolbar-item-container/index.vue'
import { UploadType, useUpload } from '../uploadToolkit'

const {
  inputRef,
  toolbarConfig,
  isPC,
  isUniFrameWork,
  handleIconClick,
  handleWebFileChange,
} = useUpload(UploadType.ALBUM)
</script>

<template>
  <ToolbarItemContainer
    :icon-file="toolbarConfig.icon"
    :title="toolbarConfig.title"
    :icon-width="toolbarConfig.iconWidth"
    :icon-height="toolbarConfig.iconHeight"
    :need-dialog="false"
    @on-icon-click="handleIconClick"
  >
    <div
      v-if="!isUniFrameWork"
      class="image-upload" :class="[!isPC && 'image-upload-h5']"
    >
      <input
        ref="inputRef"
        title="图片"
        type="file"
        data-type="image"
        accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp,image/webp"
        @change="handleWebFileChange"
      >
    </div>
  </ToolbarItemContainer>
</template>

<style lang="scss" scoped>
@import '../../../../assets/styles/common';
</style>
