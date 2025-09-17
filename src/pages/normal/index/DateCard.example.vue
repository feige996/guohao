<template>
  <div class="example-container">
    <h1>农历日历卡片示例</h1>
    <p>点击下方的日历卡片查看完整的农历信息</p>
    
    <!-- 日历卡片 -->
    <div class="card-wrapper">
      <DateCard />
    </div>
    
    <!-- 说明文字 -->
    <div class="description">
      <h2>功能说明</h2>
      <ul>
        <li>📅 显示当前公历和农历日期</li>
        <li>🐲 显示干支年份和生肖</li>
        <li>🎯 显示每日宜忌中的第一项</li>
        <li>🔍 点击卡片查看完整农历详情</li>
        <li>📱 支持移动端响应式显示</li>
      </ul>
      
      <h2>弹窗内容包括</h2>
      <div class="feature-grid">
        <div class="feature-item">
          <h3>📅 日期信息</h3>
          <p>公历、农历、星期、节气</p>
        </div>
        <div class="feature-item">
          <h3>🔮 干支纪年</h3>
          <p>年月日时的干支和生肖</p>
        </div>
        <div class="feature-item">
          <h3>✅ 每日宜忌</h3>
          <p>详细的宜做和忌做事项</p>
        </div>
        <div class="feature-item">
          <h3>🧭 方位信息</h3>
          <p>喜神、财神等吉神方位</p>
        </div>
        <div class="feature-item">
          <h3>🎵 其他信息</h3>
          <p>纳音、冲煞、彭祖百忌</p>
        </div>
      </div>

      <h2>技术特色</h2>
      <div class="tech-features">
        <div class="tech-item">
          <h4>🎨 Wot UI 弹窗</h4>
          <p>使用 Wot Design Uni 的 wd-popup 组件，提供原生体验</p>
        </div>
        <div class="tech-item">
          <h4>📱 底部弹出</h4>
          <p>从底部滑出，支持安全区域适配，符合移动端交互习惯</p>
        </div>
        <div class="tech-item">
          <h4>🔒 滚动锁定</h4>
          <p>自动处理滚动穿透问题，提供流畅的用户体验</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DateCard from './DateCard.vue'
</script>

<style scoped>
.example-container {
  padding: 40rpx;
  max-width: 1200rpx;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  font-size: 48rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 16rpx;
}

p {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 60rpx;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 80rpx;
}

.description {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 40rpx;
}

h2 {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  border-left: 6rpx solid #667eea;
  padding-left: 20rpx;
}

ul {
  list-style: none;
  padding: 0;
  margin-bottom: 40rpx;
}

li {
  font-size: 28rpx;
  color: #555;
  margin-bottom: 16rpx;
  padding-left: 40rpx;
  position: relative;
}

li::before {
  content: '•';
  color: #667eea;
  font-weight: bold;
  position: absolute;
  left: 20rpx;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 24rpx;
}

.feature-item {
  background: white;
  border-radius: 12rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-item:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.feature-item h3 {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
}

.feature-item p {
  font-size: 24rpx;
  color: #666;
  margin: 0;
  text-align: left;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .example-container {
    padding: 32rpx 24rpx;
  }
  
  h1 {
    font-size: 40rpx;
  }
  
  .description {
    padding: 32rpx 24rpx;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .tech-features {
    grid-template-columns: 1fr;
  }
}

.tech-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 24rpx;
  margin-top: 32rpx;
}

.tech-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12rpx;
  padding: 32rpx;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tech-item:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 12rpx 32rpx rgba(102, 126, 234, 0.3);
}

.tech-item h4 {
  font-size: 28rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
}

.tech-item p {
  font-size: 24rpx;
  margin: 0;
  text-align: left;
  opacity: 0.9;
}
</style>
