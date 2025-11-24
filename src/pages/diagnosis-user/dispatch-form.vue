<template>
  <view class="page">
    <view class="content">
      <!-- 选择派单方式 -->
      <view class="section">
        <view class="section-title">
          选择派单方式
        </view>
        <view class="dispatch-options">
          <view class="dispatch-option" :class="{ active: form.assignMode === 1 }" @tap="selectAssignMode(1)">
            <view class="option-header">
              <view class="radio" :class="{ checked: form.assignMode === 1 }" />
              <text class="option-title">智能推荐（推荐）</text>
            </view>
            <text class="option-desc">系统匹配3-5位专业医生，2小时内响应</text>
          </view>

          <view class="dispatch-option" :class="{ active: form.assignMode === 2 }" @tap="selectAssignMode(2)">
            <view class="option-header">
              <view class="radio" :class="{ checked: form.assignMode === 2 }" />
              <text class="option-title">指定医生</text>
            </view>
            <text class="option-desc">选择您信任的医生，6-24小时响应</text>
          </view>
        </view>

        <!-- 指定医生选择 -->
        <view v-if="form.assignMode === 2" class="doctor-select" @tap="selectDoctor">
          <text class="label">选择医生 *</text>
          <text v-if="selectedDoctor" class="value">{{ selectedDoctor.name }} {{ selectedDoctor.title }}</text>
          <text v-else class="placeholder">请选择医生</text>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 问诊信息 -->
      <view class="section">
        <view class="section-title">
          问诊信息
        </view>

        <view class="form-item">
          <text class="label">问诊类型 *</text>
          <picker mode="selector" :range="categoryTags" @change="onCategoryChange">
            <view class="picker">
              <text v-if="form.categoryTag">{{ form.categoryTag }}</text>
              <text v-else class="placeholder">请选择问诊类型</text>
              <text class="arrow">›</text>
            </view>
          </picker>
        </view>

        <view class="form-item">
          <text class="label">症状描述 *</text>
          <textarea
            v-model="form.symptoms"
            class="textarea"
            placeholder="请详细描述您的症状（不少于20字）"
            maxlength="500"
          />
          <text class="char-count">{{ form.symptoms.length }}/500</text>
        </view>

        <view class="form-item">
          <text class="label">症状图片（选填）</text>
          <view class="image-upload">
            <view v-for="(img, index) in form.symptomImages" :key="index" class="image-item">
              <image :src="img" mode="aspectFill" />
              <view class="remove-btn" @tap="removeImage(index)">
                ×
              </view>
            </view>
            <view v-if="form.symptomImages.length < 9" class="upload-btn" @tap="uploadImage">
              <text class="icon">+</text>
              <text class="text">上传图片</text>
            </view>
          </view>
        </view>

        <view class="form-item">
          <text class="label">既往病史（选填）</text>
          <textarea
            v-model="form.pastMedicalHistory"
            class="textarea"
            placeholder="请填写您的既往病史，帮助医生更好地了解您的健康状况"
            maxlength="500"
          />
        </view>
      </view>

      <!-- 价格信息 -->
      <view class="section">
        <view class="price-info">
          <view class="price-row">
            <text class="label">问诊方式</text>
            <text class="value">图文+语音消息</text>
          </view>
          <view class="price-row">
            <text class="label">有效期</text>
            <text class="value">48小时</text>
          </view>
          <view class="price-row total">
            <text class="label">问诊费用</text>
            <text class="price">¥{{ form.amount }}</text>
          </view>
        </view>
      </view>

      <!-- 支付方式选择 -->
      <view class="section">
        <view class="section-title">
          <text class="title-text">选择支付方式</text>
          <text class="required">*</text>
        </view>
        <view class="payment-methods">
          <view
            class="payment-item"
            :class="{ active: selectedPayType === 'WECHAT' }"
            @tap="selectPayType('WECHAT')"
          >
            <view class="payment-icon">
              <text class="icon">💚</text>
            </view>
            <view class="payment-info">
              <text class="payment-name">微信支付</text>
              <text class="payment-desc">安全快捷</text>
            </view>
            <view v-if="selectedPayType === 'WECHAT'" class="payment-check">
              <text class="check-icon">✓</text>
            </view>
          </view>

          <view
            class="payment-item"
            :class="{ active: selectedPayType === 'ALIPAY' }"
            @tap="selectPayType('ALIPAY')"
          >
            <view class="payment-icon">
              <text class="icon">💙</text>
            </view>
            <view class="payment-info">
              <text class="payment-name">支付宝支付</text>
              <text class="payment-desc">便捷支付</text>
            </view>
            <view v-if="selectedPayType === 'ALIPAY'" class="payment-check">
              <text class="check-icon">✓</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <view class="total">
        <text class="label">总计：</text>
        <text class="price">¥{{ form.amount }}</text>
      </view>
      <button class="btn-submit" @tap="submitOrder">
        提交订单
      </button>
    </view>
  </view>
</template>

<script>
import Apis from '../../api/guohao-api'

export default {
  data() {
    return {
      form: {
        assignMode: 1, // 1:智能匹配 2:指定医生
        specifiedDoctorId: null,
        categoryTag: '体质调理',
        symptoms: '最近感觉身体不适，有轻微头痛和乏力的症状，持续了大约三天左右，想咨询一下医生的建议。',
        symptomImages: [],
        pastMedicalHistory: '',
        amount: 0.01,
      },
      categoryTags: ['体质调理', '痛症', '失眠', '妇科', '儿科', '皮肤科', '其他'],
      selectedDoctor: null,
      selectedPayType: 'WECHAT', // 默认选择微信支付
      pollTimer: null, // 轮询定时器
      pollCount: 0, // 轮询次数
    }
  },

  onShow() {
    // 页面显示时，检查是否有待查询的订单
    this.checkPendingPayment()
  },

  onHide() {
    // 页面隐藏时，停止轮询
    this.stopPolling()
  },

  onUnload() {
    // 页面卸载时，停止轮询
    this.stopPolling()
  },

  methods: {
    // 选择支付方式
    selectPayType(type) {
      this.selectedPayType = type
      console.log('选择支付方式:', type)
    },

    // 选择派单方式
    selectAssignMode(mode) {
      this.form.assignMode = mode
      if (mode === 1) {
        this.form.specifiedDoctorId = null
        this.selectedDoctor = null
        this.form.amount = 0.01
      }
      else {
        this.form.amount = 0.01
      }
    },

    // 选择问诊类型
    onCategoryChange(e) {
      this.form.categoryTag = this.categoryTags[e.detail.value]
    },

    // 选择医生（跳转到医生列表页面）
    selectDoctor() {
      uni.navigateTo({
        url: '/pages/doctor-list/doctor-list',
        events: {
          selectDoctor: (doctor) => {
            this.selectedDoctor = doctor
            this.form.specifiedDoctorId = doctor.id
          },
        },
      })
    },

    // 上传图片
    uploadImage() {
      uni.chooseImage({
        count: 9 - this.form.symptomImages.length,
        success: (res) => {
          // 这里应该上传到服务器，暂时使用本地路径
          this.form.symptomImages.push(...res.tempFilePaths)
        },
      })
    },

    // 删除图片
    removeImage(index) {
      this.form.symptomImages.splice(index, 1)
    },

    // 提交订单
    async submitOrder() {
      // 表单验证
      if (this.form.assignMode === 2 && !this.form.specifiedDoctorId) {
        return uni.showToast({ title: '请选择医生', icon: 'none' })
      }
      if (!this.form.categoryTag) {
        return uni.showToast({ title: '请选择问诊类型', icon: 'none' })
      }
      if (!this.form.symptoms || this.form.symptoms.length < 20) {
        return uni.showToast({ title: '请详细描述症状（不少于20字）', icon: 'none' })
      }

      try {
        uni.showLoading({ title: '提交中...' })

        // 创建订单
        const res = await Apis.app_Appointment.apiApp_appointmentAddPost({
          assignMode: this.form.assignMode,
          specifiedDoctorId: this.form.specifiedDoctorId,
          categoryTag: this.form.categoryTag,
          symptoms: this.form.symptoms,
          symptomImages: this.form.symptomImages.length > 0 ? JSON.stringify(this.form.symptomImages) : null,
          medicalHistory: this.form.pastMedicalHistory,
        })

        uni.hideLoading()

        // 后端返回格式：{ code: 200, type: "success", result: {...} }
        if (res.code === 200 && res.result) {
          // 发起支付
          this.startPayment(res.result)
        }
        else {
          uni.showToast({ title: res.message || '创建订单失败', icon: 'none' })
        }
      }
      catch (e) {
        uni.hideLoading()
        console.error('提交订单失败', e)
        uni.showToast({ title: '提交失败，请重试', icon: 'none' })
      }
    },

    // 发起支付
    async startPayment(orderData) {
      try {
        uni.showLoading({ title: '正在调起支付...' })

        // 调用后端创建支付订单
        const payRes = await Apis.app_PaymentTransaction.apiApp_paymenttransactionAddPost({
          appointmentNo: orderData.appointmentNo,
          payType: this.selectedPayType
        })

        uni.hideLoading()

        if (payRes.code !== 200 || !payRes.result) {
          uni.showToast({
            title: payRes.message || '发起支付失败',
            icon: 'none',
          })
          return
        }

        // 保存订单号，用于返回后查询支付状态
        uni.setStorageSync('pendingPayment', {
          appointmentNo: orderData.appointmentNo,
          appointmentId: orderData.appointmentId,
          createTime: Date.now(),
        })

        // 获取支付参数（后端直接返回在 result 中）
        const paymentParams = payRes.result

        console.log('收到支付参数：', paymentParams)

        if (this.selectedPayType === 'WECHAT') {
          // 微信支付 - 需要转换字段名为小写，timestamp转为整数
          const wxPayParams = {
            appid: paymentParams.appId,
            partnerid: paymentParams.partnerId,
            prepayid: paymentParams.prepayId,
            package: paymentParams.package,
            noncestr: paymentParams.nonceStr,
            timestamp: Number.parseInt(paymentParams.timeStamp), // ⚠️ 转换为整数
            sign: paymentParams.sign,
          }

          console.log('调用微信支付，参数：', wxPayParams)
          console.log('timestamp类型：', typeof wxPayParams.timestamp, wxPayParams.timestamp)

          uni.requestPayment({
            provider: 'wxpay',
            orderInfo: wxPayParams,
            success: (res) => {
              console.log('微信支付成功', res)
              this.startPolling() // 开始轮询查询支付状态
            },
            fail: (err) => {
              console.error('微信支付失败或取消', err)
              uni.removeStorageSync('pendingPayment')
              uni.showToast({
                title: '支付已取消',
                icon: 'none',
              })
            },
          })
        }
        else if (this.selectedPayType === 'ALIPAY') {
          // 支付宝支付
          console.log('调用支付宝支付，参数：', paymentParams.orderInfo || paymentParams)

          uni.requestPayment({
            provider: 'alipay',
            orderInfo: paymentParams.orderInfo || paymentParams,
            success: (res) => {
              console.log('支付宝支付成功', res)
              this.startPolling() // 开始轮询查询支付状态
            },
            fail: (err) => {
              console.error('支付宝支付失败或取消', err)
              uni.removeStorageSync('pendingPayment')
              uni.showToast({
                title: '支付已取消',
                icon: 'none',
              })
            },
          })
        }
      }
      catch (e) {
        uni.hideLoading()
        console.error('发起支付异常', e)
        uni.showToast({
          title: '发起支付失败，请重试',
          icon: 'none',
        })
      }
    },

    // 检查是否有待支付的订单
    checkPendingPayment() {
      const pendingPayment = uni.getStorageSync('pendingPayment')
      if (!pendingPayment)
        return

      // 检查订单是否超过30分钟（支付超时）
      const elapsed = Date.now() - pendingPayment.createTime
      if (elapsed > 30 * 60 * 1000) {
        console.log('订单已超时，清除待支付订单')
        uni.removeStorageSync('pendingPayment')
        return
      }

      console.log('检测到待支付订单，开始查询支付状态:', pendingPayment.appointmentNo)

      // 显示提示
      uni.showLoading({ title: '正在查询支付状态...' })

      // 立即查询一次
      this.queryPaymentStatus(pendingPayment)
    },

    // 查询支付状态
    async queryPaymentStatus(pendingPayment) {
      try {
        const res = await Apis.app_PaymentTransaction.apiApp_paymenttransactionDetailGet({
          appointmentNo: pendingPayment.appointmentNo
        })

        if (res.code === 200 && res.result) {
          console.log('支付状态:', res.result.isPaid ? '已支付' : '未支付', '订单状态:', res.result.appointmentStatus, res.result.appointmentStatusDesc)

          // appointmentStatus: 1=待支付, 2=待接单, 3=排队中, 4=叫号中, 5=进行中, 6=已完成, 7=已取消, 8=已退款, 9=叫号失败
          if (res.result.appointmentStatus >= 2 && res.result.appointmentStatus <= 6) {
            // 支付成功
            this.stopPolling()
            uni.removeStorageSync('pendingPayment')
            uni.hideLoading()

            uni.showModal({
              title: '支付成功',
              content: '订单已支付成功，是否查看订单详情？',
              confirmText: '查看详情',
              cancelText: '留在本页',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  uni.redirectTo({
                    url: `/pages/consultation-detail/consultation-detail?id=${pendingPayment.appointmentNo}`,
                  })
                }
              },
            })
          }
          else if (res.result.appointmentStatus === 1) {
            // 仍在待支付，继续轮询
            console.log('订单仍在待支付，继续轮询...')
            this.startPolling()
          }
          else {
            // 其他状态（取消/失败等）
            this.stopPolling()
            uni.removeStorageSync('pendingPayment')
            uni.hideLoading()

            uni.showToast({
              title: `订单${res.result.appointmentStatusDesc || '状态异常'}`,
              icon: 'none',
            })
          }
        }
        else {
          // 查询失败，继续轮询
          console.log('查询订单失败，继续轮询...')
          this.startPolling()
        }
      }
      catch (e) {
        console.error('查询支付状态失败', e)
        // 查询失败，继续轮询
        this.startPolling()
      }
    },

    // 开始轮询
    startPolling() {
      // 清除之前的定时器
      this.stopPolling()

      // 限制轮询次数（最多60次，即5分钟）
      if (this.pollCount >= 30) {
        console.log('轮询次数已达上限，停止轮询')
        uni.hideLoading()
        uni.showToast({
          title: '查询超时，请稍后在"我的问诊"中查看',
          icon: 'none',
          duration: 3000,
        })
        return
      }

      this.pollCount++

      // 每2秒查询一次
      this.pollTimer = setTimeout(() => {
        const pendingPayment = uni.getStorageSync('pendingPayment')
        if (pendingPayment) {
          this.queryPaymentStatus(pendingPayment)
        }
        else {
          this.stopPolling()
        }
      }, 2000)
    },

    // 停止轮询
    stopPolling() {
      if (this.pollTimer) {
        clearTimeout(this.pollTimer)
        this.pollTimer = null
      }
      this.pollCount = 0
      uni.hideLoading()
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 180rpx;
}

.content {
  padding: 20rpx;
}

.section {
  margin-bottom: 20rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 24rpx;
}

.dispatch-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.dispatch-option {
  padding: 24rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  transition: all 0.3s;
}

.dispatch-option.active {
  border-color: #667eea;
  background: #f0f3ff;
}

.option-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.radio {
  width: 36rpx;
  height: 36rpx;
  border: 2rpx solid #ccc;
  border-radius: 50%;
  margin-right: 16rpx;
  position: relative;
}

.radio.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rpx;
  height: 20rpx;
  background: #667eea;
  border-radius: 50%;
}

.option-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.option-desc {
  font-size: 24rpx;
  color: #666;
  padding-left: 52rpx;
}

.doctor-select {
  margin-top: 20rpx;
  padding: 24rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-item {
  margin-bottom: 24rpx;
  position: relative;
}

.label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.picker {
  padding: 24rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.placeholder {
  color: #999;
}

.arrow {
  color: #999;
  font-size: 36rpx;
}

.textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  width: 160rpx;
  height: 160rpx;
  position: relative;
}

.image-item image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.remove-btn {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 40rpx;
  height: 40rpx;
  background: #ff4444;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 40rpx;
  font-size: 32rpx;
}

.upload-btn {
  width: 160rpx;
  height: 160rpx;
  border: 2rpx dashed #ccc;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-btn .icon {
  font-size: 60rpx;
  color: #999;
}

.upload-btn .text {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.price-info {
  padding: 20rpx 0;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
  font-size: 28rpx;
}

.price-row.total {
  padding-top: 16rpx;
  border-top: 2rpx solid #f0f0f0;
  font-size: 32rpx;
  font-weight: bold;
}

.price {
  color: #ff6600;
  font-size: 36rpx;
  font-weight: bold;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx;
  background: #fff;
  border-top: 2rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.total .label {
  font-size: 28rpx;
  color: #666;
}

.total .price {
  font-size: 40rpx;
  color: #ff6600;
  font-weight: bold;
}

.btn-submit {
  flex: 1;
  margin-left: 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  border: none;
}

/* 支付方式选择 */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.payment-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  border: 2rpx solid #eee;
  transition: all 0.3s ease;
}

.payment-item.active {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.payment-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 50%;
  margin-right: 20rpx;
}

.payment-icon .icon {
  font-size: 48rpx;
}

.payment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.payment-name {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.payment-desc {
  font-size: 24rpx;
  color: #999;
}

.payment-check {
  width: 48rpx;
  height: 48rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  font-size: 32rpx;
  color: #fff;
  font-weight: bold;
}
</style>
