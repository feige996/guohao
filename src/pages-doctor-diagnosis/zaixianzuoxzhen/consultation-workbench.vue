<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// 页面配置

definePage({
  style: {
    navigationStyle: 'default',
    navigationBarTitleText: '在线坐诊',
    navigationBarBackgroundColor: '#fff',
  },
})
// 移除不正确的组件导入，使用原生组件或正确的导入方式

// 响应式数据
const isLoading = ref(false)
const currentPatient = ref<Patient | null>(null)
const waitingPatients = ref<Patient[]>([])
const isModalVisible = ref(false)
const modalContent = reactive({
  icon: '',
  title: '',
  message: '',
})
const modalCallback = ref<(() => void) | null>(null)
const isIMVisible = ref(false)
const messages = ref<Message[]>([])
const messageInput = ref('')
const currentTime = ref('')
const isConsultationActive = ref(true)
const remainingTime = ref('01:28:45')
// 用于跟踪正在呼叫的患者
const callingPatients = ref<Set<string>>(new Set())

// 类型定义
interface Patient {
  id: string
  name: string
  age: number
  gender: string
  avatar: string
  consultationType: string
  price: number
  symptoms: string
  waitTime: string
  medicalRecordId: string
  hasBeenCalled?: boolean
}

interface Message {
  id: string
  content: string
  sender: 'doctor' | 'patient'
  timestamp: string
}

// 获取模拟数据
function getPatientData() {
  const zhangWei = {
    id: '1',
    name: '张伟',
    age: 35,
    gender: '男',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    consultationType: '图文问诊',
    price: 50,
    symptoms: '头痛、咳嗽、发热',
    waitTime: '0分钟',
    medicalRecordId: 'MR1001',
  }

  const liWei = {
    id: '2',
    name: '李伟',
    age: 28,
    gender: '男',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    consultationType: '图文问诊',
    price: 50,
    symptoms: '腹痛、腹泻',
    waitTime: '5分钟',
    medicalRecordId: 'MR1002',
  }

  const chenMei = {
    id: '3',
    name: '陈梅',
    age: 42,
    gender: '女',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    consultationType: '图文问诊',
    price: 50,
    symptoms: '高血压、头晕',
    waitTime: '10分钟',
    medicalRecordId: 'MR1003',
  }

  const wangJun = {
    id: '4',
    name: '王军',
    age: 55,
    gender: '男',
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    consultationType: '图文问诊',
    price: 50,
    symptoms: '胸闷、气短',
    waitTime: '15分钟',
    medicalRecordId: 'MR1004',
  }

  return { zhangWei, liWei, chenMei, wangJun }
}

// 页面加载时初始化数据
onMounted(() => {
  const { zhangWei, liWei, chenMei, wangJun } = getPatientData()
  currentPatient.value = zhangWei
  waitingPatients.value = [liWei, chenMei, wangJun]
  updateTime()
  setInterval(updateTime, 60000)
  checkConsultationStatus()

  // #ifdef H5
  // 监听ESC键关闭弹窗（仅在H5平台支持）
  document.addEventListener('keydown', handleEscKey)
  // #endif
})

onBeforeUnmount(() => {
  // #ifdef H5
  // 移除ESC键监听（仅在H5平台支持）
  document.removeEventListener('keydown', handleEscKey)
  // #endif
})

// ESC键处理（仅在H5平台支持）
function handleEscKey(e) {
  if (e.key === 'Escape' && isModalVisible.value) {
    closeModal()
  }
}

// 更新当前时间
function updateTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 刷新数据
function refreshData(event) {
  const target = event.currentTarget as HTMLButtonElement
  target.classList.add('btn-loading')

  setTimeout(() => {
    const { zhangWei, liWei, chenMei, wangJun } = getPatientData()
    currentPatient.value = zhangWei
    waitingPatients.value = [liWei, chenMei, wangJun]
    target.classList.remove('btn-loading')
    showToast('刷新成功')
  }, 1000)
}

// 显示Toast提示
function showToast(message: string) {
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })
}

// 查看病历
function viewMedicalRecord(patientId: string) {
  showToast('正在查看病历...')
  // 跳转到病历页面
  setTimeout(() => {
    uni.navigateTo({
      url: `/pages-doctor-diagnosis/yuyinwenzhen/medical-record?patientId=${patientId}`,
    })
  }, 300)
}

// 进入问诊（打开IM聊天窗口）
function startConsultation(patient: Patient) {
  currentPatient.value = patient
  openIMChat()
}

// 打开IM聊天窗口
function openIMChat() {
  isIMVisible.value = true
  // 初始化聊天记录
  messages.value = [
    {
      id: '1',
      content: '医生您好，我最近一直头痛，已经持续三天了。',
      sender: 'patient',
      timestamp: '10:00',
    },
    {
      id: '2',
      content: '您好，请详细描述一下您的症状，比如是哪种类型的头痛，有没有伴随其他不适？',
      sender: 'doctor',
      timestamp: '10:01',
    },
    {
      id: '3',
      content: '就是太阳穴两侧胀痛，有时会伴有恶心，但没有呕吐。',
      sender: 'patient',
      timestamp: '10:02',
    },
  ]

  nextTick(() => {
    scrollToBottom()
  })
}

// 关闭IM聊天窗口
function closeIMChat() {
  isIMVisible.value = false
}

// 发送消息
function sendMessage() {
  if (!messageInput.value.trim())
    return

  const newMessage: Message = {
    id: Date.now().toString(),
    content: messageInput.value.trim(),
    sender: 'doctor',
    timestamp: currentTime.value,
  }

  messages.value.push(newMessage)
  messageInput.value = ''

  nextTick(() => {
    scrollToBottom()
  })

  // 模拟患者回复
  setTimeout(() => {
    const patientReply: Message = {
      id: (Date.now() + 1).toString(),
      content: '好的，我明白了，谢谢医生。',
      sender: 'patient',
      timestamp: currentTime.value,
    }
    messages.value.push(patientReply)

    nextTick(() => {
      scrollToBottom()
    })
  }, 2000)
}

// 滚动到聊天底部
const messageListRef = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    }
  })
}

// 结束问诊
function endConsultation() {
  showModal(
    'icon-warning',
    '结束问诊',
    '确定要结束当前问诊吗？',
    () => {
      if (currentPatient.value) {
        showToast('问诊已结束')
        // 模拟开具处方
        showPrescriptionModal()
        // 从等待队列中取出下一位患者
        if (waitingPatients.value.length > 0) {
          currentPatient.value = waitingPatients.value.shift() || null
        }
        else {
          currentPatient.value = null
        }
        // 返回工作台
        setTimeout(() => {
          // 确保导航到正确的工作台页面
          uni.navigateTo({
            url: '/pages-doctor-diagnosis/zaixianzuoxzhen/consultation-workbench',
          })
        }, 1500)
      }
    },
  )
}

// 显示开具处方弹窗
function showPrescriptionModal() {
  showModal(
    'icon-prescription',
    '开具处方',
    '是否为患者开具处方？',
    () => {
      showToast('处方已开具')
      // 实际项目中应跳转到处方页面
    },
  )
}

// 呼叫患者
function callPatient(patient: Patient, event: Event) {
  // 阻止事件冒泡
  event.stopPropagation()

  const startCalling = () => {
    // 添加到正在呼叫的患者集合中
    callingPatients.value.add(patient.id)

    // 模拟叫号成功
    setTimeout(() => {
      showSuccessModal(
        '叫号成功',
        `患者 ${patient.name} 已收到叫号通知，请等待患者响应（3分钟内有效）`,
      )

      patient.hasBeenCalled = true

      // 从正在呼叫的集合中移除
      callingPatients.value.delete(patient.id)

      // 3分钟后检查患者是否响应
      setTimeout(() => {
        checkPatientResponse(patient)
      }, 180000)
    }, 1500)
  }

  // 为叫号确认弹窗设置特殊的圆形图标
  showModal(
    'icon-call-circle',
    '叫号确认',
    `确定要呼叫患者 ${patient.name} 吗？`,
    startCalling,
  )
}

// 检查患者响应
function checkPatientResponse(patient: Patient) {
  // 模拟患者响应
  const hasResponded = Math.random() > 0.3 // 70%概率响应

  if (hasResponded) {
    // 患者响应，进入问诊
    const patientIndex = waitingPatients.value.findIndex(p => p.id === patient.id)
    if (patientIndex > -1) {
      // 从等待队列移除
      const removedPatients = waitingPatients.value.splice(patientIndex, 1)
      if (removedPatients.length > 0) {
        // 设置为当前问诊患者
        currentPatient.value = removedPatients[0]
        // 打开聊天窗口
        openIMChat()
      }
    }
    showToast('患者已响应，正在为您转接...')
  }
  else {
    showToast('患者未响应，请重新叫号或跳过')
  }
}

// 显示成功弹窗
function showSuccessModal(title: string, message: string) {
  modalContent.icon = 'icon-success'
  modalContent.title = title
  modalContent.message = message
  modalCallback.value = null
  isModalVisible.value = true
}

// 显示确认弹窗
function showModal(icon: string, title: string, message: string, callback: () => void) {
  modalContent.icon = icon
  modalContent.title = title
  modalContent.message = message
  modalCallback.value = callback
  isModalVisible.value = true
}

// 关闭弹窗
function closeModal() {
  isModalVisible.value = false
}

// 确认弹窗操作
function confirmModal() {
  if (modalCallback.value) {
    modalCallback.value()
  }
  closeModal()
}

// 结束坐诊
function endWork() {
  showModal(
    'icon-warning',
    '结束坐诊',
    '结束后需要重新开启才能接诊，确定要结束坐诊吗？',
    () => {
      // 清除坐诊状态
      uni.removeStorageSync('consultationStatus')
      uni.removeStorageSync('consultationStartTime')
      showToast('已结束坐诊')
      // 实际项目中应跳转到医生首页
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
  )
}

// 检查坐诊状态
function checkConsultationStatus() {
  const status = uni.getStorageSync('consultationStatus')
  isConsultationActive.value = status === 'active'

  // 如果有开始坐诊时间，计算已坐诊时长
  const startTime = uni.getStorageSync('consultationStartTime')
  if (startTime) {
    updateConsultationDuration(startTime)
  }
}

// 更新坐诊时长
function updateConsultationDuration(startTimeStr: string) {
  const startTime = new Date(startTimeStr)
  const updateDuration = () => {
    const now = new Date()
    const durationMs = now.getTime() - startTime.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000)

    // 更新UI显示
    remainingTime.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  updateDuration()
  const timer = setInterval(updateDuration, 1000)

  onBeforeUnmount(() => {
    clearInterval(timer)
  })
}

// 输入框自动调整高度
function autoResizeTextarea(event) {
  const textarea = event.target
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}
</script>

<template>
  <view class="relative mx-auto min-h-screen w-full pb-5">
    <!-- Toast 通知 -->
    <div id="toast" class="toast" />

    <!-- 结束坐诊确认弹窗 -->
    <div id="confirmModal" class="modal-overlay" :class="{ show: isModalVisible }" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-content">
        <div id="modalContent" class="mb-6">
          <div id="modalIcon" class="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-[#FEF2F2]">
            <wd-icon name="error-circle-filled" size="24px" color="#EF4444" />
          </div>
          <h3 id="modalTitle" class="mb-2 text-center text-lg text-[#1F2937] font-bold">
            {{ modalContent.title }}
          </h3>
          <p id="modalMessage" class="text-center text-sm text-[#6B7280] leading-relaxed">
            {{ modalContent.message }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <wd-button
            type="info"
            @click="closeModal"
          >
            取消
          </wd-button>
          <wd-button
            type="error"
            @click="confirmModal"
          >
            确认
          </wd-button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <main class="flex flex-col gap-5 px-4 pb-20 pt-[24px]">
      <!-- 坐诊状态头部卡片 -->
      <view class="w-full border border-[#E5E7EB] rounded-[20px] bg-white p-5 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)]">
        <div class="mb-4 flex items-center gap-2">
          <!-- 坐诊图标 -->
          <wd-icon name="check-circle-filled" size="22px" color="#10B981" />
          <span class="flex items-center gap-2 text-base text-[#10B981] font-semibold">
            <span class="status-dot" />
            在线坐诊中
          </span>
        </div>

        <!-- 倒计时 -->
        <div class="mb-4">
          <div class="mb-2 text-sm text-[#6B7280]">
            剩余坐诊时间
          </div>
          <div class="timer-text">
            {{ remainingTime }}
          </div>
        </div>
        <!-- 结束坐诊按钮 -->
        <div class="">
          <wd-button
            block
            type="error"
            @click="endWork"
          >
            结束坐诊
          </wd-button>
        </div>
      </view>
      <!-- 统计信息 -->
      <view class="w-full border border-[#E5E7EB] rounded-[20px] bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)]">
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="rounded-lg p-3">
            <div class="mt-1 text-xs text-[#6B7280]">
              问诊中
            </div>
            <div class="text-lg text-[#8E4337] font-bold">
              1
            </div>
          </div>
          <div class="rounded-lg p-3">
            <div class="mt-1 text-xs text-[#6B7280]">
              排队中
            </div>
            <div class="text-lg font-bold">
              28
            </div>
          </div>
          <div class="rounded-lg p-3">
            <div class="mt-1 text-xs text-[#6B7280]">
              已完成
            </div>
            <div class="text-lg font-bold">
              12
            </div>
          </div>
        </div>
      </view>
      <!-- 正在问诊的患者卡片 -->
      <view v-if="currentPatient">
        <div class="mb-3 flex items-center justify-between">
          <view class="text-base text-[#333333] font-bold">
            正在问诊
          </view>
        </div>

        <view class="w-full border-2 border-[#8E4337] rounded-[20px] bg-white p-5 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
          <div class="mb-4 flex items-start gap-3">
            <!-- 头像 -->
            <div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
              <image :src="currentPatient.avatar" alt="患者头像" class="h-full w-full object-cover" />
            </div>

            <!-- 患者信息 -->
            <div class="flex-1">
              <div class="mb-2 flex items-center gap-2">
                <span class="text-lg text-[#1F2937] font-bold">{{ currentPatient.name }}</span>
                <div class="ml-auto flex items-center gap-2">
                  <div class="flex items-center gap-1 rounded-full bg-[#F5EBE9] px-2.5 py-1">
                    <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8E4337]" />
                    <span class="text-xs text-[#8E4337] font-bold">问诊中</span>
                  </div>
                  <div class="rounded-full bg-[#8E4337] px-2.5 py-1">
                    <span class="text-xs text-white font-bold">12:34</span>
                  </div>
                </div>
              </div>

              <!-- 问诊类型 -->
              <div class="mb-2 flex items-center gap-2">
                <wd-icon name="video" size="16px" color="#8E4337" />
                <span class="text-sm text-[#6B7280] font-medium">视频通话中...</span>
              </div>

              <!-- 症状 -->
              <div class="text-sm text-[#6B7280]">
                症状：{{ currentPatient.symptoms }}
              </div>
            </div>
          </div>

          <!-- 按钮组 - 一行显示 -->
          <div class="w-full flex gap-2">
            <wd-button
              plain block
              type="warning"
              icon="list"
              size="small"
              class="w-full"
              @click="viewMedicalRecord(currentPatient.medicalRecordId)"
            >
              病历
            </wd-button>
            <wd-button
              icon="chat"
              plain block
              size="small"
              type="success"
              class="w-full"
              @click="startConsultation(currentPatient)"
            >
              进入问诊
            </wd-button>
            <wd-button
              icon="check"
              plain block
              size="small"
              type="error"
              class="w-full"
              @click="endConsultation"
            >
              结束问诊
            </wd-button>
          </div>
        </view>
      </view>

      <!-- 暂无问诊 -->
      <view v-else class="w-full border border-[#E5E7EB] rounded-[20px] bg-white p-8 text-center shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)]">
        <wd-icon name="user" size="48px" color="#D1D5DB" />
        <div class="text-sm text-[#6B7280]">
          暂无正在问诊的患者
        </div>
      </view>

      <!-- 等待队列 -->
      <view class="w-full">
        <div class="mb-3 flex items-center justify-between">
          <view class="text-base text-[#333333] font-bold">
            等待队列（{{ waitingPatients.length }}人）
          </view>
        </div>

        <!-- 等待队列列表 -->
        <div class="space-y-3">
          <!-- 等待患者卡片 -->
          <div v-for="patient in waitingPatients" :key="patient.id" class="card-hover border border-[#E5E7EB] rounded-[12px] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)]">
            <div class="flex gap-3">
              <!-- 患者头像 -->
              <image :src="patient.avatar" alt="患者头像" class="h-12 w-12 border-2 border-[#F3F1ED] rounded-full object-cover" />

              <!-- 患者信息 -->
              <div class="flex-1">
                <div class="mb-1 flex flex-wrap items-center gap-2">
                  <span class="inline-block max-w-[80px] text-ellipsis text-[#1F2937] font-semibold">{{ patient.name }}</span>
                  <span class="text-sm text-[#6B7280]">{{ patient.age }}岁/{{ patient.gender }}</span>
                </div>
                <div class="mb-1 text-xs text-[#6B7280]">
                  {{ patient.consultationType }} · ¥{{ patient.price }}
                </div>
                <div class="text-ellipsis-2 mb-1 text-xs text-[#6B7280]">
                  {{ patient.symptoms }}
                </div>
                <div class="flex flex-wrap items-center justify-between">
                  <div class="flex flex-shrink-0 items-center gap-1 text-xs text-[#F59E0B]">
                    <wd-icon name="warn-bold" size="16px" color-amber />
                    已等待{{ patient.waitTime }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="mt-3 w-full flex gap-2">
              <wd-button
                plain block
                type="warning"
                icon="list"
                class="w-full"
                @click="viewMedicalRecord(patient.medicalRecordId)"
              >
                病历
              </wd-button>
              <wd-button
                icon="chat"
                plain block
                type="primary"
                class="w-full"
                @click="callPatient(patient, $event)"
              >
                呼叫患者
              </wd-button>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="waitingPatients.length === 0" class="rounded-[12px] bg-[#F9FAFB] p-6 text-center">
            <div class="text-sm text-[#6B7280]">
              暂无等待患者
            </div>
          </div>
        </div>
      </view>
    </main>

    <!-- IM聊天弹窗 -->
    <div v-if="isIMVisible" class="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-50 pt-10">
      <!-- IM聊天头部 -->
      <div class="h-[56px] flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4">
        <div class="flex items-center gap-3">
          <button class="text-[#333333]" aria-label="关闭聊天" @click="closeIMChat">
            <wd-icon name="warn-bold" size="16px" color="red" />
          </button>
          <div v-if="currentPatient" class="flex items-center gap-2">
            <image :src="currentPatient.avatar" alt="患者头像" class="h-8 w-8 rounded-full object-cover" />
            <div>
              <div class="text-sm font-semibold">
                {{ currentPatient.name }}
              </div>
              <div class="text-xs text-[#6B7280]">
                {{ currentPatient.consultationType }}
              </div>
            </div>
          </div>
        </div>
        <button class="rounded-lg bg-[#8E4337] px-3 py-1 text-xs text-white font-medium transition-colors hover:bg-[#7B3429]" aria-label="结束问诊" @click="endConsultation">
          结束问诊
        </button>
      </div>

      <!-- 主诉信息卡片 -->
      <div class="border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
        <div class="mb-1 text-xs text-[#6B7280]">
          主诉
        </div>
        <div v-if="currentPatient" class="text-sm text-[#1F2937]">
          {{ currentPatient.symptoms }}
        </div>
      </div>

      <!-- 消息列表 -->
      <div ref="messageListRef" class="scrollbar-thin flex-1 overflow-y-auto bg-[#F3F1ED] p-4 space-y-4">
        <!-- 时间分隔 -->
        <div class="flex justify-center">
          <div class="rounded-full bg-black bg-opacity-20 px-3 py-1 text-xs text-white">
            {{ currentTime }}
          </div>
        </div>

        <!-- 消息项 -->
        <div v-for="message in messages" :key="message.id" class="flex" :class="[message.sender === 'patient' ? 'justify-start' : 'justify-end']">
          <div v-if="message.sender === 'patient'" class="max-w-[75%] flex items-end gap-2">
            <image v-if="currentPatient" :src="currentPatient.avatar" alt="患者头像" class="h-8 w-8 rounded-full object-cover" />
            <div>
              <div class="rounded-lg rounded-tl-none bg-white px-4 py-2 shadow-sm">
                <div class="text-sm text-[#333333]">
                  {{ message.content }}
                </div>
              </div>
              <div class="ml-1 mt-1 text-xs text-[#9CA3AF]">
                {{ message.timestamp }}
              </div>
            </div>
          </div>

          <div v-else class="max-w-[75%] flex items-end gap-2">
            <div class="text-right">
              <div class="rounded-lg rounded-tr-none bg-[#8E4337] px-4 py-2 shadow-sm">
                <div class="text-sm text-white">
                  {{ message.content }}
                </div>
              </div>
              <div class="mr-1 mt-1 text-xs text-[#9CA3AF]">
                {{ message.timestamp }}
              </div>
            </div>
            <image src="https://img.yzcdn.cn/vant/cat.jpeg" alt="医生头像" class="h-8 w-8 object-cover" />
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="border-t border-[#E5E7EB] bg-white p-3">
        <div class="flex items-end gap-2">
          <!-- 功能按钮 -->
          <div class="flex gap-2">
            <button class="h-8 w-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6]" aria-label="表情">
              <!-- <wd-icon name="github-filled" size="16px" color="blue" /> -->
              <wd-icon name="github-filled" size="16px" />
            </button>
            <button class="h-8 w-8 flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6]" aria-label="图片">
              <wd-icon name="picture" size="16px" />
            </button>
          </div>

          <!-- 输入框 -->
          <div class="relative flex-1">
            <textarea
              v-model="messageInput"
              class="h-8 w-full resize-none overflow-hidden border border-[#D1D4DB] px-3 py-1.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#8E4337]"
              placeholder="请输入消息..."
              rows="1"
              aria-label="消息输入框"
            />
          </div>

          <!-- 发送按钮 -->
          <button
            class="bg-[#8E4337] px-4 py-2 text-sm text-white font-medium transition-colors disabled:bg-gray-300 hover:bg-[#7B3429]"
            :disabled="!messageInput.trim()"
            aria-label="发送消息"
            @click="sendMessage"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </view>
</template>

<style scoped>
/* 基础样式重置 */
* {
  box-sizing: border-box;
}

/* Toast 通知样式 */
.toast {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%) translateY(-100px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  max-width: 300px;
  text-align: center;
  box-sizing: border-box;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 按钮加载状态 */
.btn-loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 0.6s linear infinite;
}

/* 动画 */
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 状态点 */
.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* 计时器文本 */
.timer-text {
  font-size: 40px;
  font-weight: 700;
  color: #8e4337;
  letter-spacing: 0.02em;
  line-height: 1;
}

/* 模态弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 320px;
  width: calc(100% - 48px);
  z-index: 1000;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.modal-overlay.show .modal-content {
  opacity: 1;
  transform: scale(1);
}

/* 卡片基础样式 */
.consult-card {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

/* 卡片悬浮效果 */
.card-hover {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 文本溢出控制 */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 滚动条样式 */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 0.6s linear infinite;
}
</style>
