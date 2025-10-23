<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store/userStore'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '课程详情',
    disableScroll: false,
  },
  excludeLoginPath: false,
})

// 定义讲师接口
interface Instructor {
  name: string
  title: string
  bio: string
  avatar?: string
}

// 定义课程详情接口
interface TcmLectureDetail {
  id: number
  title: string
  coverImageUrl: string
  videoUrl?: string
  description: string
  playCount: number
  duration: string
  isFree: boolean
  instructor: Instructor
  chapters?: Array<{ id: number, title: string, duration: string }>
  relatedCourses?: Array<{ id: number, title: string, coverImageUrl: string, isFree: boolean }>
  publishTime: string
  isCollected: boolean
}

// 获取页面参数
const lectureId = ref<number>(0)
const detailLoading = ref(false)

// 用户store
const userStore = useUserStore()

// 课程详情数据 - 初始化时直接设置默认模拟数据
const lectureDetail = ref<TcmLectureDetail>({
  id: 1,
  title: '中医养生之道：四季养生的基本原则',
  coverImageUrl: '/static/images/tcm-lecture4.png',
  videoUrl: '',
  description: '本课程详细讲解中医四季养生的理论基础和实践方法。中医认为，人与自然是一个统一的整体，四季气候变化人体生理功能有重要影响。通过学习本课程，您将了解春、夏、秋、冬四季的养生要点，掌握顺应自然、调整生活方式的实用技巧，从而达到预防疾病、延年益寿的目的。课程内容包括：春季养肝要点、夏季养心方法、秋季养肺之道、冬季养肾秘诀等。',
  playCount: 8976,
  duration: '48分钟',
  isFree: true,
  instructor: {
    name: '国豪中医',
    title: '中医内科主任医师',
    bio: '本科学历，毕业于广州中医药大学中医专业，十余年临床经验，擅长中医内科疾病的诊治，尤其是脾胃病、呼吸系统疾病的中医药治疗。具有丰富的临床experienced知识。',
    avatar: '/static/images/doctor-avatar.png',
  },
  chapters: [
    { id: 1, title: '中医养生理论基础', duration: '10分钟' },
    { id: 2, title: '春季养生：养肝为主', duration: '12分钟' },
    { id: 3, title: '夏季养生：养心为要', duration: '10分钟' },
    { id: 4, title: '秋季养生：养肺为重', duration: '8分钟' },
    { id: 5, title: '冬季养生：养肾为本', duration: '8分钟' },
  ],
  relatedCourses: [
    { id: 1, title: '口臭、脚臭、腋下臭？可能是湿气惹的祸', coverImageUrl: '/static/images/tcm-lecture1.png', isFree: true },
    { id: 2, title: '手脚冰凉不只是冬天！中医调理方法', coverImageUrl: '/static/images/tcm-lecture2.png', isFree: true },
    { id: 3, title: '长寿与身体先知道这种"感觉"', coverImageUrl: '/static/images/tcm-lecture3.png', isFree: true },
  ],
  publishTime: '2025-4-20',
  isCollected: false,
})
const currentTab = ref('详情') // '详情' | '目录' | '相关课程'
const isCollected = ref(false)

// 模拟讲师数据
// 修复讲师简介中的错误内容
const mockInstructor: Instructor = {
  name: '国豪中医',
  title: '中医内科主任医师',
  bio: '本科学历，毕业于广州中医药大学中医专业，十余年临床经验，擅长中医内科疾病的诊治，尤其是脾胃病、呼吸系统疾病的中医药治疗。具有丰富的临床工作经验。',
  avatar: '/static/images/doctor-avatar.png',
}

// 模拟课程详情数据
function getMockLectureDetail(id: number): TcmLectureDetail {
  return {
    id,
    title: '中医养生之道：四季养生的基本原则',
    coverImageUrl: '/static/images/tcm-lecture4.png',
    videoUrl: '', // 实际项目中应该是真实的视频URL
    description: '本课程详细讲解中医四季养生的理论基础和实践方法。中医认为，人与自然是一个统一的整体，四季气候变化的人体生理功能有重要影响。通过学习本课程，您将了解春、夏、秋、冬四季的养生要点，掌握顺应自然、调整生活方式的实用技巧，从而达到预防疾病、延年益寿的目的。课程内容包括：春季养肝要点、夏季养心方法、秋季养肺之道、冬季养肾秘诀等。',
    playCount: 8976,
    duration: '48分钟',
    isFree: true,
    instructor: mockInstructor,
    chapters: [
      { id: 1, title: '中医养生理论基础', duration: '10分钟' },
      { id: 2, title: '春季养生：养肝为主', duration: '12分钟' },
      { id: 3, title: '夏季养生：养心为要', duration: '10分钟' },
      { id: 4, title: '秋季养生：养肺为重', duration: '8分钟' },
      { id: 5, title: '冬季养生：养肾为本', duration: '8分钟' },
    ],
    relatedCourses: [
      { id: 1, title: '口臭、脚臭、腋下臭？可能是湿气惹的祸', coverImageUrl: '/static/images/tcm-lecture1.png', isFree: true },
      { id: 2, title: '手脚冰凉不只是冬天！中医调理方法', coverImageUrl: '/static/images/tcm-lecture2.png', isFree: true },
      { id: 3, title: '长寿与身体先知道这种"感觉"', coverImageUrl: '/static/images/tcm-lecture3.png', isFree: true },
    ],
    publishTime: '2025-4-20',
    isCollected: false,
  }
}

// 获取课程详情
async function fetchLectureDetail(id: number) {
  detailLoading.value = true
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 300))

    // 使用模拟数据
    lectureDetail.value = getMockLectureDetail(id)
    isCollected.value = lectureDetail.value.isCollected

    // 从本地存储获取收藏状态
    if (userStore.userInfo?.id && lectureDetail.value) {
      const collectKey = `lecture_collect_${lectureDetail.value.id}_${userStore.userInfo.id}`
      isCollected.value = uni.getStorageSync(collectKey) === 'true'
    }
  }
  catch (error) {
    console.error('获取课程详情失败:', error)
    // 即使出错，也显示模拟数据
    lectureDetail.value = getMockLectureDetail(1)
  }
  finally {
    detailLoading.value = false
  }
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 处理标签切换
function handleTabChange(tab: string) {
  currentTab.value = tab
}

// 检查登录状态
function checkLoginStatus(): boolean {
  if (!userStore.isLoggedIn) {
    uni.showModal({
      title: '提示',
      content: '请先登录后再进行操作',
      confirmText: '去登录',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          const currentUrl = `/pages/normal/healthcare/tcm-lecture-detail?id=${lectureId.value}`
          uni.navigateTo({
            url: `${LOGIN_PAGE}?redirect=${encodeURIComponent(currentUrl)}`,
          })
        }
      },
    })
    return false
  }
  return true
}

// 处理收藏
async function handleCollect() {
  if (!checkLoginStatus()) {
    return
  }

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 200))

    // 更新状态
    isCollected.value = !isCollected.value

    // 保存到本地存储
    const userId = userStore.userInfo?.id
    if (userId && lectureDetail.value) {
      const collectKey = `lecture_collect_${lectureDetail.value.id}_${userId}`
      uni.setStorageSync(collectKey, isCollected.value.toString())
    }

    uni.showToast({
      title: isCollected.value ? '收藏成功' : '取消收藏',
      icon: 'success',
    })
  }
  catch (error) {
    console.error('收藏操作失败:', error)
    // 恢复原始状态
    isCollected.value = !isCollected.value
    uni.showToast({
      title: '操作失败，请重试',
      icon: 'none',
    })
  }
}

// 分享
function handleShare() {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
}

// 跳转到评论页面
function goToComment() {
  uni.navigateTo({
    url: `/pages/normal/healthcare/comment?id=${lectureId.value}&type=lecture`,
  })
}

// 跳转到相关课程
function goToRelatedCourse(id: number) {
  uni.navigateTo({
    url: `/pages/normal/healthcare/tcm-lecture-detail?id=${id}`,
  })
}

// 页面加载时获取数据
function onLoad(options: any) {
  // 始终使用默认ID 1 来加载模拟数据，确保页面有内容显示
  lectureId.value = 1
  fetchLectureDetail(lectureId.value)
}

// 组件挂载时执行，确保数据已初始化
onMounted(() => {
  console.log('课程详情页面已挂载，数据初始化完成')
})
</script>

<template>
  <view class="tcm-lecture-detail-page">
    <!-- 自定义导航栏 -->
    <view class="custom-navigator" :style="{ paddingTop: `${safeAreaInsets.top}px` }">
      <view class="nav-content">
        <view class="nav-left" @click="goBack">
          <uni-icons type="arrow-left" size="24" color="#333" />
        </view>
        <view class="nav-title">
          课程详情
        </view>
        <view class="nav-right" />
      </view>
    </view>

    <!-- 内容区域 - 移除v-if条件，确保始终渲染 -->
    <view class="content-container">
      <!-- 视频播放区域 -->
      <view class="video-container">
        <image :src="lectureDetail.coverImageUrl" class="h-48 w-full object-cover" />
        <!-- 播放按钮 -->
        <view class="absolute inset-0 flex items-center justify-center">
          <view class="h-16 w-16 flex items-center justify-center rounded-full bg-black/50">
            <uni-icons type="play-circle" size="32" color="white" />
          </view>
        </view>
        <!-- 播放次数 -->
        <view class="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
          {{ lectureDetail.playCount }}次播放
        </view>
      </view>

      <!-- 课程信息 -->
      <view class="lecture-info bg-white p-4">
        <text class="lecture-title text-lg font-medium leading-tight">{{ lectureDetail.title }}</text>
        <view class="mt-2 flex items-center justify-between">
          <view class="text-sm text-gray-500">
            <text>{{ lectureDetail.publishTime }} · </text>
            <text>{{ lectureDetail.duration }}</text>
          </view>
          <view v-if="lectureDetail.isFree" class="rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-600">
            免费
          </view>
        </view>
      </view>

      <!-- 标签切换 -->
      <view class="tab-container mt-2 bg-white">
        <view class="flex border-b">
          <view
            v-for="tab in ['详情', '目录', '相关课程']"
            :key="tab"
            class="flex-1 py-3 text-center text-sm"
            :class="{
              'text-orange-600 border-b-2 border-orange-600': currentTab === tab,
              'text-gray-600': currentTab !== tab,
            }"
            @click="handleTabChange(tab)"
          >
            {{ tab }}
          </view>
        </view>
      </view>

      <!-- 标签内容 -->
      <view class="tab-content mt-1 bg-white p-4">
        <!-- 课程详情 -->
        <view v-if="currentTab === '详情'">
          <view class="mb-4">
            <view class="mb-2 text-base font-medium">
              课程简介
            </view>
            <text class="text-gray-600 leading-relaxed">{{ lectureDetail.description }}</text>
          </view>

          <view class="mb-4">
            <view class="mb-2 text-base font-medium">
              讲师介绍
            </view>
            <view class="flex items-start">
              <image v-if="lectureDetail.instructor.avatar" :src="lectureDetail.instructor.avatar" class="mr-3 h-16 w-16 rounded-full" />
              <view v-else class="mr-3 h-16 w-16 flex items-center justify-center rounded-full bg-gray-200 text-gray-400">
                <uni-icons type="person" size="32" />
              </view>
              <view class="flex-1">
                <view class="mb-1 flex items-center">
                  <text class="font-medium">{{ lectureDetail.instructor.name }}</text>
                  <text class="ml-2 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">{{ lectureDetail.instructor.title }}</text>
                </view>
                <text class="text-sm text-gray-600 leading-relaxed">{{ lectureDetail.instructor.bio }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 课程目录 -->
        <view v-if="currentTab === '目录'">
          <view v-if="lectureDetail.chapters && lectureDetail.chapters.length > 0">
            <view v-for="chapter in lectureDetail.chapters" :key="chapter.id" class="flex items-center justify-between border-b border-gray-100 py-3">
              <view class="flex items-center">
                <view class="mr-3 h-6 w-6 flex items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
                  {{ chapter.id }}
                </view>
                <text class="text-sm">{{ chapter.title }}</text>
              </view>
              <text class="text-xs text-gray-500">{{ chapter.duration }}</text>
            </view>
          </view>
          <view v-else class="py-6 text-center text-sm text-gray-500">
            暂无课程目录
          </view>
        </view>

        <!-- 相关课程 -->
        <view v-if="currentTab === '相关课程'">
          <view v-if="lectureDetail.relatedCourses && lectureDetail.relatedCourses.length > 0">
            <view v-for="course in lectureDetail.relatedCourses" :key="course.id" class="mb-4 flex last:mb-0" @click="goToRelatedCourse(course.id)">
              <image :src="course.coverImageUrl" class="mr-3 h-20 w-32 rounded object-cover" />
              <view class="flex-1">
                <text class="line-clamp-2 text-sm font-medium">{{ course.title }}</text>
                <view class="mt-2">
                  <view v-if="course.isFree" class="inline-block rounded bg-orange-100 px-1.5 py-0.5 text-xs text-orange-600">
                    免费
                  </view>
                  <view v-else class="inline-block rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                    付费
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view v-else class="py-6 text-center text-sm text-gray-500">
            暂无相关课程
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar" :style="{ paddingBottom: safeAreaInsets.bottom > 0 ? `${safeAreaInsets.bottom}px` : '0' }">
      <view class="action-item" @click="goToComment">
        <uni-icons type="chat-filled" :size="24" color="#666" />
        <text class="action-text">评论</text>
      </view>
      <view class="action-item" @click="handleCollect">
        <uni-icons :type="isCollected ? 'star-filled' : 'star'" :size="24" :color="isCollected ? '#ffb400' : '#666'" />
        <text class="action-text" :class="isCollected ? 'favorited' : ''">收藏</text>
      </view>
      <view class="action-item" @click="handleShare">
        <uni-icons type="share" :size="24" color="#666" />
        <text class="action-text">分享</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.tcm-lecture-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.custom-navigator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
}

.nav-left,
.nav-right {
  width: 40px;
}

.nav-title {
  font-size: 16px;
  font-weight: 500;
}

.content-container {
  padding-top: calc(44px + var(--safe-area-inset-top, 0px));
}

.video-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.action-text.favorited {
  color: #ffb400;
}

.loading-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
}
</style>
