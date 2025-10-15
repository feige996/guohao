<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { safeAreaInsets } from '@/utils/systemInfo'

// 定义页面元数据
definePage({
  type: 'page',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '问诊预约',
  },
})

// 医生信息接口
interface DoctorInfo {
  id: string
  name: string
  avatar: string
  title: string
  specialty: string
  introduction: string
  consultationCount: number
  satisfactionRate: number
  responseSpeed: string
}

// 医生信息
const doctorInfo = ref<DoctorInfo>({
  id: '',
  name: '孙医生',
  avatar: '/static/images/avatar.jpg',
  title: '骨科专家',
  specialty: 'XX疗法传承人',
  introduction: '师从中医骨科泰斗xxx，从医20年、患者好评率99%、擅长针灸正骨。\n\n个人简介："耄耋祖训，专攻疑难骨科"',
  consultationCount: 121,
  satisfactionRate: 0,
  responseSpeed: '较快',
})

// 页面加载时获取医生ID
onLoad((options: any) => {
  if (options.id) {
    doctorInfo.value.id = options.id
    loadDoctorInfo(options.id)
  }
  if (options.name) {
    doctorInfo.value.name = decodeURIComponent(options.name)
  }
})

// 加载医生信息
async function loadDoctorInfo(doctorId: string) {
  try {
    // TODO: 调用API获取医生详细信息
    console.log('加载医生信息:', doctorId)
    // const response = await Apis.doctor.getDoctorDetail({ params: { id: doctorId } })
    // doctorInfo.value = response
  }
  catch (error) {
    console.error('加载医生信息失败:', error)
  }
}

// 去挂号
function handleRegister() {
  uni.showToast({
    title: '去挂号功能开发中',
    icon: 'none',
  })
}

// 去图文问诊
function handleTextConsultation() {
  uni.showToast({
    title: '去图文问诊功能开发中',
    icon: 'none',
  })
}

// 去电话问诊
function handlePhoneConsultation() {
  uni.showToast({
    title: '去电话问诊功能开发中',
    icon: 'none',
  })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="min-h-screen flex flex-col bg-[#f5f7f4]" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
    <!-- 自定义导航栏 -->
    <wd-navbar title="问诊预约" left-text="返回" left-arrow @click-left="handleBack" />

    <!-- 主内容区域 -->
    <scroll-view class="scroll-content" scroll-y>
      <!-- 医生信息卡片 -->
      <view class="doctor-card">
        <view class="doctor-header">
          <image class="doctor-avatar" :src="doctorInfo.avatar" mode="aspectFill" />
          <view class="doctor-info">
            <view class="doctor-name-row">
              <text class="doctor-name">{{ doctorInfo.name }}</text>
              <text class="doctor-title">{{ doctorInfo.title }}</text>
              <text class="doctor-specialty">{{ doctorInfo.specialty }}</text>
            </view>
          </view>
        </view>

        <view class="doctor-description">
          {{ doctorInfo.introduction }}
        </view>

        <!-- 统计信息 -->
        <view class="doctor-stats">
          <view class="stat-item">
            <text class="stat-label">暂无</text>
            <text class="stat-value">{{ doctorInfo.consultationCount }}</text>
            <text class="stat-desc">接诊人次</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-label">暂无</text>
            <text class="stat-value empty">—</text>
            <text class="stat-desc">满意度</text>
          </view>
          <view class="stat-divider" />
          <view class="stat-item">
            <text class="stat-label">{{ doctorInfo.responseSpeed }}</text>
            <text class="stat-value empty">—</text>
            <text class="stat-desc">接诊速度</text>
          </view>
        </view>
      </view>

      <!-- 视频挂号 -->
      <view class="service-section">
        <view class="section-title">
          视频挂号
        </view>
        <view class="video-register-card">
          <view class="video-register-info">
            <text class="register-title">灵活视频时间</text>
            <text class="register-subtitle">您购买后医生将为您安排视频时间</text>
          </view>
          <view class="price-tag">
            ¥20
          </view>
          <view class="register-button" @click="handleRegister">
            <text class="button-text">去挂号</text>
          </view>
        </view>
      </view>

      <!-- 图文问诊 -->
      <view class="consultation-item">
        <view class="consultation-icon-wrapper text-consultation">
          <text class="consultation-icon">💬</text>
        </view>
        <view class="consultation-info">
          <view class="consultation-title-row">
            <text class="consultation-title">图文问诊</text>
            <text class="consultation-price">¥20/次</text>
          </view>
          <text class="consultation-desc">图文多轮沟通</text>
        </view>
        <view class="consultation-action" @click="handleTextConsultation">
          <text class="action-text">去问诊</text>
        </view>
      </view>

      <!-- 电话问诊 -->
      <view class="consultation-item">
        <view class="consultation-icon-wrapper phone-consultation">
          <text class="consultation-icon">📞</text>
        </view>
        <view class="consultation-info">
          <view class="consultation-title-row">
            <text class="consultation-title">电话问诊</text>
            <text class="consultation-price">¥20/10分钟</text>
            <view class="discount-badge">
              首单少
            </view>
          </view>
          <text class="consultation-desc">1对1电话交流，今日剩3个号</text>
        </view>
        <view class="consultation-action phone-action" @click="handlePhoneConsultation">
          <text class="action-text">去通话</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.consultation-booking-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

// 自定义导航栏
.custom-navbar {
  background-color: #fff;
  padding-top: var(--status-bar-height, 0);
  border-bottom: 1rpx solid #f0f0f0;

  .navbar-content {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 32rpx;

    .back-button {
      position: absolute;
      left: 32rpx;
      width: 48rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .back-icon {
        font-size: 40rpx;
        color: #333;
      }
    }

    .navbar-title {
      font-size: 36rpx;
      font-weight: 600;
      color: #333;
    }
  }
}

// 滚动内容区域
.scroll-content {
  flex: 1;
  padding: 24rpx;
}

// 医生信息卡片
.doctor-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;

  .doctor-header {
    display: flex;
    margin-bottom: 24rpx;

    .doctor-avatar {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      margin-right: 24rpx;
      background-color: #f0f0f0;
    }

    .doctor-info {
      flex: 1;

      .doctor-name-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 16rpx;

        .doctor-name {
          font-size: 36rpx;
          font-weight: 600;
          color: #333;
        }

        .doctor-title {
          font-size: 28rpx;
          color: #666;
        }

        .doctor-specialty {
          font-size: 28rpx;
          color: #666;
        }
      }
    }
  }

  .doctor-description {
    font-size: 28rpx;
    line-height: 44rpx;
    color: #666;
    margin-bottom: 32rpx;
    white-space: pre-line;
  }

  .doctor-stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 24rpx;
    border-top: 1rpx solid #f0f0f0;

    .stat-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8rpx;

      .stat-label {
        font-size: 24rpx;
        color: #999;
      }

      .stat-value {
        font-size: 40rpx;
        font-weight: 600;
        color: #333;

        &.empty {
          font-size: 32rpx;
          color: #999;
        }
      }

      .stat-desc {
        font-size: 24rpx;
        color: #999;
      }
    }

    .stat-divider {
      width: 1rpx;
      height: 80rpx;
      background-color: #f0f0f0;
    }
  }
}

// 服务区域
.service-section {
  margin-bottom: 24rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }

  .video-register-card {
    background-color: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    display: flex;
    align-items: center;
    position: relative;

    .video-register-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8rpx;

      .register-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
      }

      .register-subtitle {
        font-size: 24rpx;
        color: #999;
      }
    }

    .price-tag {
      font-size: 32rpx;
      font-weight: 600;
      color: #ff6b35;
      margin: 0 24rpx;
    }

    .register-button {
      background: linear-gradient(135deg, #ff8a65 0%, #ff6b35 100%);
      border-radius: 48rpx;
      padding: 16rpx 32rpx;

      .button-text {
        font-size: 28rpx;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}

// 问诊项
.consultation-item {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;

  .consultation-icon-wrapper {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;

    &.text-consultation {
      background-color: #e3f2fd;
    }

    &.phone-consultation {
      background-color: #e8f5e9;
    }

    .consultation-icon {
      font-size: 48rpx;
    }
  }

  .consultation-info {
    flex: 1;

    .consultation-title-row {
      display: flex;
      align-items: center;
      gap: 12rpx;
      margin-bottom: 8rpx;

      .consultation-title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
      }

      .consultation-price {
        font-size: 28rpx;
        color: #ff6b35;
        font-weight: 500;
      }

      .discount-badge {
        background-color: #bbdefb;
        color: #1976d2;
        font-size: 20rpx;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
      }
    }

    .consultation-desc {
      font-size: 24rpx;
      color: #999;
    }
  }

  .consultation-action {
    background: linear-gradient(135deg, #ff8a65 0%, #ff6b35 100%);
    border-radius: 48rpx;
    padding: 16rpx 32rpx;

    .action-text {
      font-size: 28rpx;
      color: #fff;
      font-weight: 500;
    }

    &.phone-action {
      background: linear-gradient(135deg, #ff8a65 0%, #ff6b35 100%);
    }
  }
}

// 底部间距
.scroll-content::after {
  content: '';
  display: block;
  height: 24rpx;
}
</style>
