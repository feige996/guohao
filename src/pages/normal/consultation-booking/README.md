# 问诊预约页面

## 页面路径
`/pages/normal/consultation-booking/consultation-booking`

## 功能说明
该页面用于展示医生详细信息和提供问诊预约服务。用户可以通过此页面：
- 查看医生的详细信息（头像、姓名、职称、专长等）
- 查看医生的统计数据（接诊人次、满意度、接诊速度）
- 预约视频挂号服务
- 进行图文问诊
- 进行电话问诊

## 页面参数
通过URL参数传递：
- `id`: 医生ID（必需）
- `name`: 医生姓名（可选，用于初始显示）

## 使用示例
```typescript
// 从医生列表跳转到问诊预约页面
uni.navigateTo({
  url: `/pages/normal/consultation-booking/consultation-booking?id=${doctorId}&name=${encodeURIComponent(doctorName)}`
})
```

## 页面结构
1. **自定义导航栏**：显示页面标题和返回按钮
2. **医生信息卡片**：
   - 医生头像
   - 医生姓名、职称、专长
   - 医生简介
   - 统计数据（接诊人次、满意度、接诊速度）
3. **视频挂号区域**：可预约灵活的视频时间
4. **图文问诊**：支持图文多轮沟通
5. **电话问诊**：支持1对1电话交流

## 待完成功能
- [ ] 集成医生详情API
- [ ] 实现视频挂号功能
- [ ] 实现图文问诊功能
- [ ] 实现电话问诊功能
- [ ] 添加支付流程
- [ ] 添加预约时间选择

## 相关文件
- 页面组件：`src/pages/normal/consultation-booking/consultation-booking.vue`
- 路由配置：`src/pages.json`（第249-255行）
- 入口页面：`src/pages/normal/alldoctor/alldoctor.vue`（医生列表页）

