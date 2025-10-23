<script setup lang="ts">
// 视频问诊页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '视频问诊',
  },
})

// 响应式数据
const doctorInfo = ref({
  id: '1',
  name: '李医生',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  department: '内科医师',
  title: '专家',
})

const isMuted = ref(false)
const isSpeakerEnabled = ref(false)
const isCallActive = ref(true)
const callDuration = ref(0)
const isCameraEnabled = ref(true)

// 新增：症状描述模板相关状态
const showSymptomTemplate = ref(false)
const symptomData = ref({
  bodyPart: '',
  symptomNature: '',
  duration: '',
  severity: '',
  otherInfo: '',
})

// 新增：会诊类型选择弹窗
const showConsultationTypeModal = ref(false)

// 新增：转账相关状态
const showTransferModal = ref(false)
const transferAmount = ref('')
const transferRemark = ref('')
const showConfirmTransferModal = ref(false)

// 格式化通话时长
const formattedDuration = computed(() => {
  const minutes = Math.floor(callDuration.value / 60)
  const seconds = callDuration.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// 获取当前时间
const currentTime = computed(() => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `下午${hours}:${minutes}`
})

// 通话计时器
let timer: number | ReturnType<typeof setInterval> | null = null

// 开始计时
function startTimer() {
  timer = setInterval(() => {
    callDuration.value++
  }, 1000)
}

// 停止计时
function stopTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

// 切换静音
function toggleMute() {
  isMuted.value = !isMuted.value
  console.log('切换静音:', isMuted.value)
}

// 切换免提
function toggleSpeaker() {
  isSpeakerEnabled.value = !isSpeakerEnabled.value
  console.log('切换免提:', isSpeakerEnabled.value)
}

// 切换摄像头
function toggleCamera() {
  isCameraEnabled.value = !isCameraEnabled.value
  console.log('切换摄像头:', isCameraEnabled.value)
}

// 挂断电话
function endCall() {
  isCallActive.value = false
  stopTimer()

  // 显示确认对话框
  uni.showModal({
    title: '确认挂断',
    content: '确定要结束本次视频问诊吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户确认挂断')
        // 跳转到医师评价页面，传递医生信息
        uni.navigateTo({
          url: `/pages/normal/online-consultation/doctor-rating?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&doctorTitle=${encodeURIComponent(doctorInfo.value.title)}&doctorSpecialty=${encodeURIComponent(doctorInfo.value.department)}&doctorAvatar=${encodeURIComponent(doctorInfo.value.avatar)}`,
        })
      }
      else {
        // 用户取消挂断，恢复通话状态
        isCallActive.value = true
        startTimer()
      }
    },
  })
}

// 打开病历
function openMedicalRecord() {
  uni.showToast({
    title: '打开病历',
    icon: 'none',
  })
}

// 图文交流
function openChat() {
  uni.navigateTo({
    url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&serviceType=视频问诊`,
  })
}

// 查看医生信息
function viewDoctorInfo() {
  uni.showToast({
    title: '查看医生信息',
    icon: 'none',
  })
}

// 发送爱心
function sendHeart() {
  // 这里可以实现发送爱心的动画效果
  console.log('发送爱心')
}

// 新增：打开症状描述模板
function openSymptomTemplate() {
  showSymptomTemplate.value = true
}

// 新增：提交症状描述
function submitSymptomTemplate() {
  if (!symptomData.value.bodyPart || !symptomData.value.symptomNature || !symptomData.value.duration) {
    uni.showToast({
      title: '请填写主要症状信息',
      icon: 'none',
    })
    return
  }

  // 构建症状描述文本
  const symptomText = `部位：${symptomData.value.bodyPart}\n性质：${symptomData.value.symptomNature}\n持续时间：${symptomData.value.duration}\n严重程度：${symptomData.value.severity || '未填写'}\n其他信息：${symptomData.value.otherInfo || '无'}`

  console.log('症状描述:', symptomText)

  // 可以在这里调用发送消息的接口，将症状描述发送给医生

  // 关闭弹窗并清空表单
  showSymptomTemplate.value = false
  Object.keys(symptomData.value).forEach((key) => {
    symptomData.value[key as keyof typeof symptomData.value] = ''
  })

  uni.showToast({
    title: '症状描述已提交',
    icon: 'success',
  })
}

// 新增：打开会诊类型选择弹窗
function openConsultationTypeModal() {
  showConsultationTypeModal.value = true
}

// 新增：切换到电话问诊
function switchToPhoneConsultation() {
  showConsultationTypeModal.value = false
  uni.showModal({
    title: '切换会诊方式',
    content: '确定要切换到电话问诊吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateTo({
          url: `/pages/normal/online-consultation/phone-consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}`,
        })
      }
    },
  })
}

// 新增：切换到图文问诊
function switchToTextConsultation() {
  showConsultationTypeModal.value = false
  uni.showModal({
    title: '切换会诊方式',
    content: '确定要切换到图文问诊吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateTo({
          url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}`,
        })
      }
    },
  })
}

// 新增：打开处方/健康档案
function openPrescription() {
  uni.navigateTo({
    url: '/me/HealthRecordDetail.vue',
  })
}

// 新增：打开转账弹窗
function openTransferModal() {
  showTransferModal.value = true
}

// 新增：验证转账金额
function validateTransferAmount() {
  const amount = Number.parseFloat(transferAmount.value)
  if (isNaN(amount) || amount <= 0) {
    uni.showToast({
      title: '请输入有效的转账金额',
      icon: 'none',
    })
    return false
  }
  if (amount > 9999) {
    uni.showToast({
      title: '单笔转账金额不能超过9999元',
      icon: 'none',
    })
    return false
  }
  return true
}

// 新增：确认转账
function confirmTransfer() {
  if (!validateTransferAmount()) {
    return
  }
  showTransferModal.value = false
  showConfirmTransferModal.value = true
}

// 新增：执行转账
function executeTransfer() {
  console.log('执行转账:', {
    doctorId: doctorInfo.value.id,
    amount: transferAmount.value,
    remark: transferRemark.value,
  })

  showConfirmTransferModal.value = false
  transferAmount.value = ''
  transferRemark.value = ''

  uni.showToast({
    title: '转账成功',
    icon: 'success',
  })
}

// 生命周期
onLoad((options: { doctorId?: string, doctorName?: string, department?: string, avatar?: string }) => {
  console.log('视频问诊页面加载，参数:', options)

  // 如果传入了医生信息，更新医生信息
  if (options.doctorId) {
    doctorInfo.value = {
      id: options.doctorId || '1',
      name: options.doctorName || '李医生',
      department: options.department || '内科医师',
      title: options.title || '专家',
      avatar: options.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
    }
    console.log('更新后的医生信息:', doctorInfo.value)
  }

  // 开始计时
  startTimer()
})

onUnload(() => {
  // 停止计时
  stopTimer()
})
</script>

<template>
  <view class="relative min-h-screen bg-black text-white">
    <!-- 顶部信息栏 -->
    <view class="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 py-3">
      <!-- 返回按钮 -->
      <text class="text-white text-[36rpx]" @click="endCall">←</text>

      <!-- 标题 -->
      <text class="text-white font-medium text-[32rpx]">视频会诊</text>

      <!-- 网络和时间 -->
      <view class="flex items-center text-[24rpx]">
        <text class="mr-1">无SIM卡</text>
        <text class="mr-1">5G</text>
        <text>🔋</text>
      </view>
    </view>

    <!-- 顶部功能按钮 -->
    <view class="absolute left-0 right-0 top-[80rpx] z-10 flex justify-around px-4">
      <view class="flex flex-col items-center">
        <view class="mb-1 h-14 w-14 flex items-center justify-center rounded-full bg-black bg-opacity-50 shadow-lg">
          <text class="text-white text-[32rpx]">📷</text>
        </view>
        <text class="text-white text-[20rpx]">拍照</text>
      </view>

      <view class="flex flex-col items-center" @click="openMedicalRecord">
        <view class="mb-1 h-14 w-14 flex items-center justify-center rounded-full bg-black bg-opacity-50 shadow-lg">
          <text class="text-white text-[32rpx]">📋</text>
        </view>
        <text class="text-white text-[20rpx]">病历</text>
      </view>

      <view class="flex flex-col items-center" @click="openSymptomTemplate">
        <view class="mb-1 h-14 w-14 flex items-center justify-center rounded-full bg-black bg-opacity-50 shadow-lg">
          <text class="text-white text-[32rpx]">📝</text>
        </view>
        <text class="text-white text-[20rpx]">症状</text>
      </view>

      <view class="flex flex-col items-center" @click="openPrescription">
        <view class="mb-1 h-14 w-14 flex items-center justify-center rounded-full bg-black bg-opacity-50 shadow-lg">
          <text class="text-white text-[32rpx]">📄</text>
        </view>
        <text class="text-white text-[20rpx]">处方</text>
      </view>

      <view class="flex flex-col items-center" @click="openTransferModal">
        <view class="mb-1 h-14 w-14 flex items-center justify-center rounded-full bg-black bg-opacity-50 shadow-lg">
          <text class="text-white text-[32rpx]">💰</text>
        </view>
        <text class="text-white text-[20rpx]">转账</text>
      </view>
    </view>

    <!-- 医生信息卡片 -->
    <view class="absolute left-4 top-[260rpx] z-10 flex items-center rounded-xl bg-black bg-opacity-50 px-4 py-3 backdrop-blur-md">
      <image :src="doctorInfo.avatar" class="mr-3 h-12 w-12 border-2 border-white rounded-full" />
      <view>
        <view class="flex items-center">
          <text class="text-white font-medium text-[28rpx]">{{ doctorInfo.name }}</text>
          <text class="ml-2 rounded bg-blue-500 px-2 py-0.5 text-white text-[20rpx]">{{ doctorInfo.title }}</text>
        </view>
        <text class="text-white text-opacity-80 text-[24rpx]">{{ doctorInfo.department }}</text>
      </view>
    </view>

    <!-- 时间显示 -->
    <view class="absolute right-4 top-[260rpx] z-10 rounded-full bg-black bg-opacity-50 px-3 py-1 backdrop-blur-md text-[24rpx]">
      {{ currentTime }}
    </view>

    <!-- 主视频区域（医生画面） -->
    <view class="h-full w-full flex items-center justify-center">
      <!-- 医生视频画面 -->
      <image
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&auto=format&fit=crop&q=60"
        class="h-full w-full object-cover"
        mode="aspectFill"
      />

      <!-- 通话状态 -->
      <view class="absolute left-1/2 top-1/2 transform text-center -translate-x-1/2 -translate-y-1/2">
        <view class="mb-4 flex items-center justify-center">
          <text class="mr-2 animate-pulse text-[#52c41a] text-[40rpx]">🔴</text>
          <text class="rounded-full bg-black bg-opacity-50 px-4 py-1 text-white text-[36rpx]">视频通话中</text>
        </view>
        <view class="rounded-full bg-black bg-opacity-50 px-6 py-2">
          <text class="text-white font-medium text-[48rpx]">{{ formattedDuration }}</text>
        </view>
      </view>
    </view>

    <!-- 小窗口视频（用户画面） -->
    <view class="absolute right-4 top-[380rpx] z-10 h-52 w-36 overflow-hidden border-2 border-white rounded-lg shadow-xl">
      <image
        v-if="isCameraEnabled"
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&auto=format&fit=crop&q=60"
        class="h-full w-full object-cover"
        mode="aspectFill"
      />
      <view v-else class="h-full w-full flex items-center justify-center bg-gray-800">
        <text class="text-white text-[64rpx]">📹</text>
      </view>
      <!-- 摄像头状态指示 -->
      <view class="absolute bottom-2 left-2 rounded bg-black bg-opacity-70 px-2 py-1 text-white text-[16rpx]">
        {{ isCameraEnabled ? '摄像头开' : '摄像头关' }}
      </view>
    </view>

    <!-- 底部控制区域 -->
    <view class="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center z-10">
      <!-- 通话控制按钮 -->
      <view class="flex justify-around items-center w-full mb-8">
        <!-- 静音按钮 -->
        <view class="flex flex-col items-center">
          <view 
            class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
            :class="isMuted ? 'bg-red-600' : 'bg-white bg-opacity-30'"
            @click="toggleMute"
          >
            <text class="text-white text-[48rpx]">{{ isMuted ? '🔇' : '🔊' }}</text>
          </view>
          <text class="mt-2 text-white text-[24rpx]">{{ isMuted ? '已静音' : '静音' }}</text>
        </view>
        
        <!-- 摄像头开关按钮 -->
        <view class="flex flex-col items-center">
          <view 
            class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
            :class="isCameraEnabled ? 'bg-white bg-opacity-30' : 'bg-red-600'"
            @click="toggleCamera"
          >
            <text class="text-white text-[48rpx]">{{ isCameraEnabled ? '📹' : '📷' }}</text>
          </view>
          <text class="mt-2 text-white text-[24rpx]">{{ isCameraEnabled ? '摄像头' : '关闭' }}</text>
        </view>
        
        <!-- 挂断按钮 -->
        <view class="flex flex-col items-center">
          <view 
            class="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            @click="endCall"
          >
            <text class="text-white text-[48rpx]">📞</text>
          </view>
          <text class="mt-2 text-white text-[24rpx]">挂断</text>
        </view>
        
        <!-- 免提按钮 -->
        <view class="flex flex-col items-center">
          <view 
            class="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
            :class="isSpeakerEnabled ? 'bg-green-500' : 'bg-white bg-opacity-30'"
            @click="toggleSpeaker"
          >
            <text class="text-white text-[48rpx]">{{ isSpeakerEnabled ? '🔊' : '🔈' }}</text>
          </view>
          <text class="mt-2 text-white text-[24rpx]">{{ isSpeakerEnabled ? '免提开' : '免提' }}</text>
        </view>
        
        <!-- 切换摄像头按钮 -->
        <view class="flex flex-col items-center">
          <view 
            class="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center transition-all duration-300"
            @click="toggleCamera"
          >
            <text class="text-white text-[48rpx]">🔄</text>
          </view>
          <text class="mt-2 text-white text-[24rpx]">切换</text>
        </view>
      </view>

      <!-- 功能按钮 -->
      <view class="w-full flex items-center justify-around">
        <!-- 发送爱心按钮 -->
        <view
          class="h-12 w-12 flex items-center justify-center rounded-full bg-pink-500 shadow-lg transition-all duration-300 hover:scale-110"
          @click="sendHeart"
        >
          <text class="text-white text-[32rpx]">❤️</text>
        </view>

        <!-- 图文交流按钮 -->
        <view
          class="rounded-full bg-blue-500 px-6 py-2.5 text-white font-medium shadow-lg transition-all duration-300 text-[28rpx] hover:bg-blue-600"
          @click="openChat"
        >
          图文交流
        </view>

        <!-- 查看医生信息按钮 -->
        <view
          class="rounded-full bg-white bg-opacity-30 px-6 py-2.5 text-white font-medium shadow-lg backdrop-blur-sm transition-all duration-300 text-[28rpx] hover:bg-opacity-40"
          @click="openConsultationTypeModal"
        >
          切换会诊方式
        </view>
      </view>
    </view>

    <!-- 症状描述模板弹窗 -->
    <view v-if="showSymptomTemplate" class="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-70">
      <view class="max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 text-black">
        <view class="mb-6 flex items-center justify-between">
          <text class="text-xl font-bold">症状描述模板</text>
          <text class="text-2xl" @click="showSymptomTemplate = false">✕</text>
        </view>

        <view class="mb-4">
          <text class="mb-1 block text-sm">症状部位 *</text>
          <input v-model="symptomData.bodyPart" type="text" placeholder="如：头部、胸部、腹部等" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </view>

        <view class="mb-4">
          <text class="mb-1 block text-sm">症状性质 *</text>
          <input v-model="symptomData.symptomNature" type="text" placeholder="如：疼痛、麻木、瘙痒等" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </view>

        <view class="mb-4">
          <text class="mb-1 block text-sm">持续时间 *</text>
          <input v-model="symptomData.duration" type="text" placeholder="如：3天、1周、2个月等" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </view>

        <view class="mb-4">
          <text class="mb-1 block text-sm">严重程度</text>
          <input v-model="symptomData.severity" type="text" placeholder="如：轻微、中等、严重等" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </view>

        <view class="mb-6">
          <text class="mb-1 block text-sm">其他信息</text>
          <textarea v-model="symptomData.otherInfo" placeholder="如：加重或缓解因素、伴随症状等" class="h-32 w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>

        <button class="w-full rounded-lg bg-blue-500 py-3 text-white font-medium" @click="submitSymptomTemplate">
          提交症状描述
        </button>
      </view>
    </view>

    <!-- 会诊类型选择弹窗 -->
    <view v-if="showConsultationTypeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <view class="w-4/5 rounded-2xl bg-white p-6 text-black">
        <text class="mb-6 block text-center text-xl font-bold">选择会诊方式</text>

        <view class="grid grid-cols-2 mb-6 gap-4">
          <view class="cursor-pointer border border-gray-300 rounded-lg p-4 text-center hover:bg-gray-100" @click="switchToPhoneConsultation">
            <text class="mb-2 block text-4xl">📞</text>
            <text class="font-medium">电话问诊</text>
          </view>

          <view class="cursor-pointer border border-gray-300 rounded-lg p-4 text-center hover:bg-gray-100" @click="switchToTextConsultation">
            <text class="mb-2 block text-4xl">💬</text>
            <text class="font-medium">图文问诊</text>
          </view>
        </view>

        <button class="w-full rounded-lg bg-gray-200 py-3 text-gray-800 font-medium" @click="showConsultationTypeModal = false">
          取消
        </button>
      </view>
    </view>

    <!-- 转账弹窗 -->
    <view v-if="showTransferModal" class="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-70">
      <view class="w-full rounded-t-3xl bg-white p-6 text-black">
        <view class="mb-6 flex items-center justify-between">
          <text class="text-xl font-bold">向医生转账</text>
          <text class="text-2xl" @click="showTransferModal = false">✕</text>
        </view>

        <view class="mb-6">
          <text class="mb-1 block text-sm">转账金额（元） *</text>
          <input v-model="transferAmount" type="number" placeholder="请输入转账金额" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-medium">
        </view>

        <view class="mb-6">
          <text class="mb-1 block text-sm">转账备注</text>
          <input v-model="transferRemark" type="text" placeholder="选填，可填写转账说明" class="w-full border border-gray-300 rounded-lg px-3 py-2">
        </view>

        <button class="w-full rounded-lg bg-blue-500 py-3 text-white font-medium" @click="confirmTransfer">
          确认转账
        </button>
      </view>
    </view>

    <!-- 转账确认弹窗 -->
    <view v-if="showConfirmTransferModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <view class="w-4/5 rounded-2xl bg-white p-6 text-black">
        <text class="mb-6 block text-center text-xl font-bold">确认转账</text>

        <view class="mb-6 text-center">
          <text class="mb-2 block text-sm text-gray-600">向 {{ doctorInfo.name }} 医生转账</text>
          <text class="block text-3xl text-red-600 font-bold">¥{{ transferAmount }}</text>
          <text v-if="transferRemark" class="mt-2 block text-sm text-gray-600">备注：{{ transferRemark }}</text>
        </view>

        <view class="grid grid-cols-2 gap-4">
          <button class="rounded-lg bg-gray-200 py-3 text-gray-800 font-medium" @click="showConfirmTransferModal = false">
            取消
          </button>
          <button class="rounded-lg bg-blue-500 py-3 text-white font-medium" @click="executeTransfer">
            确认支付
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
