<script setup lang="ts">
// 电话问诊页面
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

// 页面配置
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '电话问诊',
  },
})

// 响应式数据
const doctorInfo = ref({
  id: '1',
  name: '李医生',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center',
  department: '内科医师',
  title: '专家'
})

const isMuted = ref(false)
const isSpeakerEnabled = ref(false)
const isCallActive = ref(true)
const callDuration = ref(0)

// 新增：症状描述模板相关状态
const showSymptomTemplate = ref(false)
const symptomData = ref({
  bodyPart: '',
  symptomNature: '',
  duration: '',
  severity: '',
  otherInfo: ''
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

// 挂断电话
function endCall() {
  isCallActive.value = false
  stopTimer()
  
  // 显示确认对话框
  uni.showModal({
    title: '确认挂断',
    content: '确定要结束本次电话问诊吗？',
    success: (res) => {
      if (res.confirm) {
        console.log('用户确认挂断')
        // 跳转到医师评价页面，传递医生信息
        uni.navigateTo({
          url: `/pages/normal/online-consultation/doctor-rating?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&doctorTitle=${encodeURIComponent(doctorInfo.value.title)}&doctorSpecialty=${encodeURIComponent(doctorInfo.value.department)}&doctorAvatar=${encodeURIComponent(doctorInfo.value.avatar)}`
        })
      } else {
        // 用户取消挂断，恢复通话状态
        isCallActive.value = true
        startTimer()
      }
    }
  })
}

// 打开病历
function openMedicalRecord() {
  uni.showToast({
    title: '打开病历',
    icon: 'none'
  })
}

// 图文交流
function openChat() {
  uni.navigateTo({
    url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&serviceType=电话问诊`
  })
}

// 转接医生
function transferCall() {
  uni.showToast({
    title: '转接医生',
    icon: 'none'
  })
}

// 查看费用详情
function viewCostDetails() {
  uni.showToast({
    title: '费用详情',
    icon: 'none'
  })
}

// 投诉建议
function openComplaint() {
  uni.navigateTo({
    url: '/pages/normal/complaint-suggestion/index'
  })
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
      icon: 'none'
    })
    return
  }
  
  // 构建症状描述文本
  const symptomText = `部位：${symptomData.value.bodyPart}\n性质：${symptomData.value.symptomNature}\n持续时间：${symptomData.value.duration}\n严重程度：${symptomData.value.severity || '未填写'}\n其他信息：${symptomData.value.otherInfo || '无'}`
  
  console.log('症状描述:', symptomText)
  
  // 可以在这里调用发送消息的接口，将症状描述发送给医生
  
  // 关闭弹窗并清空表单
  showSymptomTemplate.value = false
  Object.keys(symptomData.value).forEach(key => {
    symptomData.value[key as keyof typeof symptomData.value] = ''
  })
  
  uni.showToast({
    title: '症状描述已提交',
    icon: 'success'
  })
}

// 新增：打开会诊类型选择弹窗
function openConsultationTypeModal() {
  showConsultationTypeModal.value = true
}

// 新增：切换到视频问诊
function switchToVideoConsultation() {
  showConsultationTypeModal.value = false
  uni.showModal({
    title: '切换会诊方式',
    content: '确定要切换到视频问诊吗？',
    success: (res) => {
      if (res.confirm) {
        uni.navigateTo({
          url: `/pages/normal/online-consultation/video-consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}`
        })
      }
    }
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
          url: `/pages/normal/online-consultation/consultation?doctorId=${doctorInfo.value.id}&doctorName=${encodeURIComponent(doctorInfo.value.name)}&department=${encodeURIComponent(doctorInfo.value.department)}&avatar=${encodeURIComponent(doctorInfo.value.avatar)}`
        })
      }
    }
  })
}

// 新增：打开处方/健康档案
function openPrescription() {
  uni.navigateTo({
    url: '/me/HealthRecordDetail.vue'
  })
}

// 新增：打开转账弹窗
function openTransferModal() {
  showTransferModal.value = true
}

// 新增：验证转账金额
function validateTransferAmount() {
  const amount = parseFloat(transferAmount.value)
  if (isNaN(amount) || amount <= 0) {
    uni.showToast({
      title: '请输入有效的转账金额',
      icon: 'none'
    })
    return false
  }
  if (amount > 9999) {
    uni.showToast({
      title: '单笔转账金额不能超过9999元',
      icon: 'none'
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
    remark: transferRemark.value
  })
  
  showConfirmTransferModal.value = false
  transferAmount.value = ''
  transferRemark.value = ''
  
  uni.showToast({
    title: '转账成功',
    icon: 'success'
  })
}

// 生命周期
onLoad((options: { doctorId?: string; doctorName?: string; department?: string; avatar?: string }) => {
  console.log('电话问诊页面加载，参数:', options)
  
  // 如果传入了医生信息，更新医生信息
  if (options.doctorId) {
    doctorInfo.value = {
      id: options.doctorId || '1',
      name: options.doctorName || '李医生',
      department: options.department || '内科医师',
      title: options.title || '专家',
      avatar: options.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=center'
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
  <view class="bg-gradient-to-b from-blue-600 to-blue-800 min-h-screen text-white">
    <!-- 顶部导航栏 -->
    <view class="pt-12 pb-4 px-6 flex justify-between items-center">
      <text class="text-white text-3xl" @click="endCall">←</text>
      <text class="text-white text-xl font-medium">电话问诊</text>
      <view class="w-10"></view> <!-- 占位元素，保持标题居中 -->
    </view>

    <!-- 功能按钮区域 -->
    <view class="px-6 py-4">
      <view class="grid grid-cols-5 gap-4">
        <!-- 拍照按钮 -->
        <view class="flex flex-col items-center">
          <view class="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1">
            <text class="text-white text-2xl">📷</text>
          </view>
          <text class="text-white text-sm">拍照</text>
        </view>

        <!-- 病历按钮 -->
        <view class="flex flex-col items-center" @click="openMedicalRecord">
          <view class="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1">
            <text class="text-white text-2xl">📋</text>
          </view>
          <text class="text-white text-sm">病历</text>
        </view>

        <!-- 症状描述模板按钮 -->
        <view class="flex flex-col items-center" @click="openSymptomTemplate">
          <view class="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1">
            <text class="text-white text-2xl">📝</text>
          </view>
          <text class="text-white text-sm">症状</text>
        </view>

        <!-- 处方按钮 -->
        <view class="flex flex-col items-center" @click="openPrescription">
          <view class="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1">
            <text class="text-white text-2xl">📋</text>
          </view>
          <text class="text-white text-sm">处方</text>
        </view>

        <!-- 转账按钮 -->
        <view class="flex flex-col items-center" @click="openTransferModal">
          <view class="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1">
            <text class="text-white text-2xl">💰</text>
          </view>
          <text class="text-white text-sm">转账</text>
        </view>
      </view>
    </view>

    <!-- 医生信息区域 -->
    <view class="px-6 py-8 flex flex-col items-center">
      <image :src="doctorInfo.avatar" class="w-24 h-24 rounded-full border-4 border-white mb-4" mode="aspectFill"></image>
      <text class="text-white text-xl font-medium mb-1">{{ doctorInfo.name }}</text>
      <text class="text-white text-sm opacity-80">{{ doctorInfo.department }}</text>
      <text class="text-white text-xs opacity-80 mb-4">{{ doctorInfo.title }}</text>
    </view>

    <!-- 通话画面区域 -->
    <view class="flex-1 flex flex-col items-center justify-center px-6">
      <image src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=60" class="w-full h-48 rounded-lg object-cover mb-8 opacity-90" mode="aspectFill"></image>
      
      <view class="flex items-center justify-center mb-6">
        <view class="w-4 h-4 rounded-full bg-red-500 mr-2 animate-pulse"></view>
        <text class="text-white text-lg font-medium">通话中</text>
      </view>
      
      <text class="text-white text-4xl font-bold mb-8">{{ formattedDuration }}</text>
      
      <view class="flex items-center justify-center">
        <image :src="doctorInfo.avatar" class="w-12 h-12 rounded-full border-2 border-white mr-4" mode="aspectFill"></image>
        <view>
          <text class="text-white text-sm opacity-80">对方已接通</text>
          <text class="text-white text-xs opacity-60">在线</text>
        </view>
      </view>

      <!-- 通话指示器 -->
      <view class="absolute bottom-40 left-0 right-0 flex justify-center">
        <view class="flex items-center space-x-2">
          <view class="w-2 h-8 bg-green-500 rounded-full animate-pulse"></view>
          <view class="w-2 h-12 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.2s;"></view>
          <view class="w-2 h-10 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s;"></view>
        </view>
      </view>

      <!-- 摄像头切换提示 -->
      <view class="absolute bottom-32 left-0 right-0 text-center">
        <text class="text-white text-xs opacity-60">轻触屏幕可切换前后摄像头</text>
      </view>
    </view>

    <!-- 通话控制按钮区域 -->
    <view class="px-6 py-8">
      <view class="flex justify-around items-center">
        <!-- 静音按钮 -->
        <view 
          class="w-16 h-16 rounded-full flex items-center justify-center" 
          :class="isMuted ? 'bg-red-600' : 'bg-white bg-opacity-20'"
          @click="toggleMute"
        >
          <text class="text-white text-3xl">{{ isMuted ? '🔇' : '🔊' }}</text>
        </view>

        <!-- 挂断按钮 -->
        <view 
          class="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center"
          @click="endCall"
        >
          <text class="text-white text-3xl">📞</text>
        </view>

        <!-- 免提按钮 -->
        <view 
          class="w-16 h-16 rounded-full flex items-center justify-center"
          :class="isSpeakerEnabled ? 'bg-green-500' : 'bg-white bg-opacity-20'"
          @click="toggleSpeaker"
        >
          <text class="text-white text-3xl">🔈</text>
        </view>
      </view>

      <!-- 图文交流和切换会诊方式按钮 -->
      <view class="flex justify-center items-center mt-8 space-x-6">
        <button class="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm" @click="openChat">
          图文交流
        </button>
        <button class="bg-white bg-opacity-20 text-white px-6 py-2 rounded-full text-sm" @click="openConsultationTypeModal">
          切换会诊方式
        </button>
      </view>
    </view>

    <!-- 投诉建议入口 -->
    <view class="px-6 pb-6 text-center">
      <text class="text-white text-xs opacity-60" @click="openComplaint">投诉建议</text>
    </view>

    <!-- 症状描述模板弹窗 -->
    <view v-if="showSymptomTemplate" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end justify-center">
      <view class="bg-white text-black w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <view class="flex justify-between items-center mb-6">
          <text class="text-xl font-bold">症状描述模板</text>
          <text class="text-2xl" @click="showSymptomTemplate = false">✕</text>
        </view>
        
        <view class="mb-4">
          <text class="block text-sm mb-1">症状部位 *</text>
          <input type="text" v-model="symptomData.bodyPart" placeholder="如：头部、胸部、腹部等" class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>
        
        <view class="mb-4">
          <text class="block text-sm mb-1">症状性质 *</text>
          <input type="text" v-model="symptomData.symptomNature" placeholder="如：疼痛、麻木、瘙痒等" class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>
        
        <view class="mb-4">
          <text class="block text-sm mb-1">持续时间 *</text>
          <input type="text" v-model="symptomData.duration" placeholder="如：3天、1周、2个月等" class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>
        
        <view class="mb-4">
          <text class="block text-sm mb-1">严重程度</text>
          <input type="text" v-model="symptomData.severity" placeholder="如：轻微、中等、严重等" class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>
        
        <view class="mb-6">
          <text class="block text-sm mb-1">其他信息</text>
          <textarea v-model="symptomData.otherInfo" placeholder="如：加重或缓解因素、伴随症状等" class="w-full border border-gray-300 rounded-lg px-3 py-2 h-32" />
        </view>
        
        <button class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium" @click="submitSymptomTemplate">
          提交症状描述
        </button>
      </view>
    </view>

    <!-- 会诊类型选择弹窗 -->
    <view v-if="showConsultationTypeModal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <view class="bg-white text-black w-4/5 rounded-2xl p-6">
        <text class="block text-xl font-bold text-center mb-6">选择会诊方式</text>
        
        <view class="grid grid-cols-2 gap-4 mb-6">
          <view class="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100" @click="switchToVideoConsultation">
            <text class="text-4xl block mb-2">📹</text>
            <text class="font-medium">视频问诊</text>
          </view>
          
          <view class="border border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100" @click="switchToTextConsultation">
            <text class="text-4xl block mb-2">💬</text>
            <text class="font-medium">图文问诊</text>
          </view>
        </view>
        
        <button class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium" @click="showConsultationTypeModal = false">
          取消
        </button>
      </view>
    </view>

    <!-- 转账弹窗 -->
    <view v-if="showTransferModal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end justify-center">
      <view class="bg-white text-black w-full rounded-t-3xl p-6">
        <view class="flex justify-between items-center mb-6">
          <text class="text-xl font-bold">向医生转账</text>
          <text class="text-2xl" @click="showTransferModal = false">✕</text>
        </view>
        
        <view class="mb-6">
          <text class="block text-sm mb-1">转账金额（元） *</text>
          <input type="number" v-model="transferAmount" placeholder="请输入转账金额" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-medium" />
        </view>
        
        <view class="mb-6">
          <text class="block text-sm mb-1">转账备注</text>
          <input type="text" v-model="transferRemark" placeholder="选填，可填写转账说明" class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </view>
        
        <button class="w-full bg-blue-500 text-white py-3 rounded-lg font-medium" @click="confirmTransfer">
          确认转账
        </button>
      </view>
    </view>

    <!-- 转账确认弹窗 -->
    <view v-if="showConfirmTransferModal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <view class="bg-white text-black w-4/5 rounded-2xl p-6">
        <text class="block text-xl font-bold text-center mb-6">确认转账</text>
        
        <view class="text-center mb-6">
          <text class="block text-sm text-gray-600 mb-2">向 {{ doctorInfo.name }} 医生转账</text>
          <text class="block text-3xl font-bold text-red-600">¥{{ transferAmount }}</text>
          <text v-if="transferRemark" class="block text-sm text-gray-600 mt-2">备注：{{ transferRemark }}</text>
        </view>
        
        <view class="grid grid-cols-2 gap-4">
          <button class="bg-gray-200 text-gray-800 py-3 rounded-lg font-medium" @click="showConfirmTransferModal = false">
            取消
          </button>
          <button class="bg-blue-500 text-white py-3 rounded-lg font-medium" @click="executeTransfer">
            确认支付
          </button>
        </view>
      </view>
    </view>
  </view>
</template>