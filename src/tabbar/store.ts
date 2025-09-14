import type { CustomTabBarItem, CustomTabBarItemBadge } from './config'
import { reactive } from 'vue'
import { FG_LOG_ENABLE } from '@/router/interceptor'
import { useUserStore } from '@/store/userStore'
import { currRoute } from '@/utils/index' // 添加这个导入
import { AppRoleEnum, customTabbarEnable, customTabbarList, tabBar } from './config'

// TODO 1/2: 中间的鼓包tabbarItem的开关
const BULGE_ENABLE = false

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
// const tabbarList = reactive<CustomTabBarItem[]>(_tabbarList.map(item => ({
//   ...item,
//   pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}`,
// })))

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = computed<CustomTabBarItem[]>(() => {
  const userStore = useUserStore()
  const targetRole = userStore.userInfo?.defaultRole || AppRoleEnum.NormalUser

  // console.log('=== tabbarList Debug ===')
  // console.log('userInfo:', userStore.userInfo)
  // console.log('targetRole:', targetRole)
  // console.log('AppRoleEnum.NormalUser:', AppRoleEnum.NormalUser)
  // console.log('customTabbarList:', customTabbarList)

  // 检查每个 item 的 roles
  // customTabbarList.forEach((item, index) => {
  //   console.log(`item[${index}]:`, item.text, 'roles:', item.roles, 'includes targetRole:', item.roles.includes(targetRole))
  // })

  const list = customTabbarList
    .filter((item) => {
      const shouldInclude = item.roles.includes(targetRole)
      // console.log(`Filter ${item.text}:`, shouldInclude)
      return shouldInclude
    })
    .map(item => ({
      ...item,
      pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}`,
    }))

  // console.log('Filtered list:', list)
  // console.log('=== End Debug ===')

  const { path, query } = currRoute()
  // console.log('当前 tabbar 相关路由:', path)
  // uni.switchTab({ url: list[0].pagePath })
  return list
})

if (customTabbarEnable && BULGE_ENABLE) {
  if (tabbarList.value.length % 2) {
    console.error('有鼓包时 tabbar 数量必须是偶数，否则样式很奇怪！！')
  }
  tabbarList.value.splice(tabbarList.value.length / 2, 0, {
    isBulge: true,
  } as CustomTabBarItem)
}

export function isPageTabbar(path: string) {
  // console.log(tabBar.list)
  // console.log(path)
  const _path = path.split('?')[0]
  // console.log(tabBar.list.some(item => item.pagePath === _path))
  return tabBar.list.some(item => `/${item.pagePath}` === _path)
}

/**
 * 自定义 tabbar 的状态管理，原生 tabbar 无需关注本文件
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 * 使用reactive简单状态，而不是 pinia 全局状态
 */
const tabbarStore = reactive({
  curIdx: uni.getStorageSync('app-tabbar-index') || 0,
  prevIdx: uni.getStorageSync('app-tabbar-index') || 0,
  setCurIdx(idx: number) {
    this.curIdx = idx
    uni.setStorageSync('app-tabbar-index', idx)
  },
  setTabbarItemBadge(idx: number, badge: CustomTabBarItemBadge) {
    if (tabbarList.value[idx]) {
      tabbarList.value[idx].badge = badge
    }
  },
  setAutoCurIdx(path: string) {
    const index = tabbarList.value.findIndex(item => item.pagePath === path)
    FG_LOG_ENABLE && console.log('index:', index, path)
    // console.log('tabbarList:', tabbarList)
    if (index === -1) {
      const pagesPathList = getCurrentPages().map(item => item.route.startsWith('/') ? item.route : `/${item.route}`)
      // console.log(pagesPathList)
      const flag = tabbarList.value.some(item => pagesPathList.includes(item.pagePath))
      if (!flag) {
        this.setCurIdx(0)
        return
      }
    }
    else {
      this.setCurIdx(index)
    }
  },
  restorePrevIdx() {
    if (this.prevIdx === this.curIdx)
      return
    this.setCurIdx(this.prevIdx)
    this.prevIdx = uni.getStorageSync('app-tabbar-index') || 0
  },
})

export { tabbarList, tabbarStore }
