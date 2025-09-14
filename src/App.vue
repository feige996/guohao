<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { useUserStore } from '@/store/userStore'
// 移除静态导入
// import { initTUIKitAuto } from '@/utils/tuikit'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

onLaunch((options) => {
  const userStore = useUserStore()
  // console.log('App Launch', options)
  // console.log('检查令牌 accessToken 是否过期 : ', userStore.isTokenExpired)
  if (userStore.isTokenExpired) {
    // userStore.logout()
    userStore.clearUserInfo()
    uni.switchTab({ url: userStore.userDefaultIndexPage })
  }

  // 动态导入并初始化 TUIKit
  setTimeout(async () => {
    if (!userStore.isLoggedIn) {
      // console.log('用户未登录，跳过 TUIKit 初始化')
      return
    }

    try {
      // 动态导入 TUIKit 模块
      const { initTUIKitAuto } = await import('@/utils/tuikit')
      await initTUIKitAuto()
      // console.log('TUIKit 动态加载并初始化成功')
    }
    catch (error) {
      console.error('TUIKit 动态加载失败:', error)
      uni.showToast({
        title: '即时通讯初始化失败',
        icon: 'none',
        duration: 2000,
      })
    }
  }, 2000) // 延迟 2 秒，确保首屏已渲染

  // 延迟初始化 TUIKit，确保用户登录状态已恢复
  // setTimeout(async () => {
  //   // 检查用户是否已登录
  //   if (!userStore.isLoggedIn) {
  //     console.log('用户未登录，跳过 TUIKit 初始化')
  //     return
  //   }

  //   try {
  //     // 自动获取配置并初始化 TUIKit
  //     // SDKAppID: 1400210571 (固定)
  //     // userID: 从 userStore.userInfo.id 获取
  //     // userSig: 通过 API apiAppGenimusersigUseridGet 获取
  //     await initTUIKitAuto()
  //     console.log('TUIKit 初始化成功')
  //   }
  //   catch (error) {
  //     console.error('TUIKit 初始化失败:', error)

  //     // 显示用户友好的错误提示
  //     uni.showToast({
  //       title: '即时通讯初始化失败',
  //       icon: 'none',
  //       duration: 2000,
  //     })
  //   }
  // }, 1000) // 延迟 1 秒，确保 store 数据已恢复
})

onShow((options) => {
  // console.log('App Show', options)
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})

onHide(() => {
  // console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>
