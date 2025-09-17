<template>
  <div class="demo-container">
    <h1>农历日历卡片 - 风格一致性演示</h1>
    
    <!-- 模拟主页面背景 -->
    <div class="main-page-bg">
      <div class="gradient-section">
        <h2>主页面风格参考</h2>
        <div class="style-showcase">
          <!-- 主页面风格卡片 -->
          <div class="main-card">
            <div class="card-header">
              <span class="status-label">体质状态：</span>
              <div class="status-badge">平和体质</div>
            </div>
            <div class="card-content">
              <div class="suggestion-box">
                <span class="suggestion-title">气节养生建议：神仙粥</span>
                <span class="suggestion-text">糯米30g+生姜5片+葱白3根煮粥，起锅前加10ml陈醋，驱寒暖胃。</span>
              </div>
            </div>
          </div>
          
          <!-- 功能卡片示例 -->
          <div class="function-card">
            <div class="function-content">
              <span class="function-title">全部功能</span>
              <span class="function-desc">7x24小时</span>
              <span class="function-desc">一对一服务</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 日历卡片区域 -->
      <div class="calendar-section">
        <h2>日历卡片（点击查看弹窗）</h2>
        <DateCard />
      </div>
    </div>
    
    <!-- 设计说明 -->
    <div class="design-notes">
      <h2>设计风格说明</h2>
      <div class="notes-grid">
        <div class="note-item">
          <h3>🎨 色彩搭配</h3>
          <div class="color-palette">
            <div class="color-item">
              <div class="color-box" style="background: #f5f7f4;"></div>
              <span>背景色 #f5f7f4</span>
            </div>
            <div class="color-item">
              <div class="color-box" style="background: #ba7210;"></div>
              <span>强调色 #ba7210</span>
            </div>
            <div class="color-item">
              <div class="color-box" style="background: #333333;"></div>
              <span>主文字 #333333</span>
            </div>
            <div class="color-item">
              <div class="color-box" style="background: #999999;"></div>
              <span>次要文字 #999999</span>
            </div>
          </div>
        </div>
        
        <div class="note-item">
          <h3>🌈 渐变效果</h3>
          <div class="gradient-examples">
            <div class="gradient-box" style="background: linear-gradient(135deg, #f6e2d3 0%, #f1d4c0 100%);">
              弹窗头部渐变
            </div>
            <div class="gradient-box" style="background: linear-gradient(135deg, #f1f6ff 0%, #e3eafe 100%);">
              宜事区域渐变
            </div>
            <div class="gradient-box" style="background: linear-gradient(135deg, #fff1f2 0%, #fce3e1 100%);">
              忌事区域渐变
            </div>
          </div>
        </div>
        
        <div class="note-item">
          <h3>📐 设计规范</h3>
          <ul>
            <li>圆角：16rpx（卡片）、12rpx（小组件）</li>
            <li>间距：32rpx（大间距）、24rpx（中间距）、16rpx（小间距）</li>
            <li>字体：36rpx（标题）、28rpx（正文）、24rpx（辅助文字）</li>
            <li>阴影：0 4rpx 12rpx rgba(0, 0, 0, 0.05)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DateCard from './DateCard.vue'
</script>

<style scoped>
.demo-container {
  min-height: 100vh;
  background: #f5f7f4;
  padding: 40rpx;
}

h1 {
  font-size: 48rpx;
  font-weight: 600;
  color: #333333;
  text-align: center;
  margin-bottom: 40rpx;
}

h2 {
  font-size: 36rpx;
  font-weight: 600;
  color: #ba7210;
  margin-bottom: 24rpx;
}

.main-page-bg {
  background: #f5f7f4;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.gradient-section {
  background: linear-gradient(to bottom, #f6e2d3, transparent);
  padding: 40rpx;
}

.style-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.main-card {
  background: linear-gradient(135deg, #fff1f2 0%, #fce3e1 100%);
  border-radius: 16rpx;
  padding: 24rpx;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.status-label {
  font-size: 24rpx;
  color: #ba7210;
  font-weight: bold;
  margin-right: 24rpx;
}

.status-badge {
  background: url('@img/homepage/constitution-badge.png') center/cover;
  color: white;
  padding: 8rpx 24rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: 500;
}

.suggestion-box {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8rpx;
  padding: 18rpx;
}

.suggestion-title {
  display: block;
  font-size: 24rpx;
  color: #333333;
  font-weight: 500;
  margin-bottom: 22rpx;
}

.suggestion-text {
  font-size: 24rpx;
  color: #ababab;
  line-height: 40rpx;
}

.function-card {
  background: linear-gradient(135deg, #f1f6ff 0%, #e3eafe 100%);
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
}

.function-content {
  display: flex;
  flex-direction: column;
}

.function-title {
  font-size: 26rpx;
  color: #333333;
  font-weight: 500;
  margin-bottom: 16rpx;
}

.function-desc {
  font-size: 20rpx;
  color: #aca7c3;
  font-weight: 500;
  margin-bottom: 4rpx;
}

.calendar-section {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx;
  margin: 32rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.design-notes {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300rpx, 1fr));
  gap: 32rpx;
}

.note-item {
  background: #f5f7f4;
  border-radius: 12rpx;
  padding: 24rpx;
}

.note-item h3 {
  font-size: 28rpx;
  color: #ba7210;
  margin-bottom: 16rpx;
}

.color-palette {
  display: grid;
  gap: 12rpx;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.color-box {
  width: 40rpx;
  height: 40rpx;
  border-radius: 8rpx;
  border: 2rpx solid #e5e7e9;
}

.color-item span {
  font-size: 24rpx;
  color: #333333;
}

.gradient-examples {
  display: grid;
  gap: 12rpx;
}

.gradient-box {
  padding: 16rpx;
  border-radius: 8rpx;
  color: #ba7210;
  font-size: 24rpx;
  font-weight: 500;
  text-align: center;
}

.note-item ul {
  list-style: none;
  padding: 0;
}

.note-item li {
  font-size: 24rpx;
  color: #333333;
  margin-bottom: 8rpx;
  padding-left: 20rpx;
  position: relative;
}

.note-item li::before {
  content: '•';
  color: #ba7210;
  position: absolute;
  left: 0;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .demo-container {
    padding: 24rpx;
  }
  
  .style-showcase,
  .notes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
