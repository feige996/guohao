# 数据结构说明

本项目将模拟数据和类型定义统一管理，提高代码的可维护性和类型安全性。

**重要更新**：数据结构已根据后端 API 定义（Admin.NET.Application）重新整理，确保前后端数据结构一致。

## 目录结构

```
src/
├── types/
│   └── index.ts          # 类型定义和枚举
├── data/
│   ├── doctors.ts        # 医生相关数据
│   ├── consultation.ts   # 问诊相关数据
│   ├── index.ts         # 统一导出
│   └── README.md        # 本文档
```

## 类型定义 (types/index.ts)

### 枚举类型（对应后端）

- `DoctorStatus` - 医生状态（正在问诊/可以预约）
- `ConsultType` - 问诊类型（图文=1/视频=2/语音=3）对应后端 ConsultTypeEnum
- `ConsultMode` - 问诊模式（派单=1/坐诊=2）对应后端 ConsultModeEnum
- `AssignMode` - 派单方式（智能匹配=1/指定医生=2）对应后端 AssignModeEnum
- `AppointmentStatus` - 订单状态（11种状态）对应后端 AppointmentStatusV2Enum
- `Department` - 科室专科（对应后端 AppDepartmentEnum 常用科室）
- `PaymentMethod` - 支付方式（微信/支付宝）
- `ActionType` - 操作类型（取号/预约）

### 兼容旧代码的枚举
- `ConsultationMethod` - 前端展示用问诊方式（text-image/voice/video）
- `DispatchMode` - 前端展示用派单方式（smart/assign/clinic）

### 接口类型

- `Doctor` - 基础医生信息（对应后端 app_DoctorAuditing）
  - 包含详细的问诊费用（图文/视频/语音分开）
  - 包含统计数据（评分、接诊人次、满意度等）
  - 保留旧字段以兼容现有代码
- `ClinicDoctor` - 在线坐诊医生信息（扩展 Doctor）
- `Appointment` - 问诊订单（对应后端 app_AppointmentV2）
  - 支持派单模式和坐诊模式
  - 包含完整的订单状态流转
  - 包含支付、处方、评价等信息
- `ConsultationType` - 健康问题/问诊类型
- `ConsultationMethodOption` - 问诊方式选项
- `DispatchOption` - 派单选项
- `PaymentMethodOption` - 支付方式选项
- `TabOption` - Tab选项
- `PatientStatus` - 患者状态
- `ConsultationRecord` - 旧的问诊记录接口（兼容）

## 数据文件

### doctors.ts
- `mockDoctors` - 基础医生数据（对应后端 app_DoctorAuditing 结构）
  - 包含详细的问诊费用配置
  - 包含统计数据（评分、接诊人次等）
  - 保留旧字段以兼容现有代码
- `clinicDoctors` - 在线坐诊医生数据（扩展自 mockDoctors）
- `getDoctorById()` - 根据ID获取医生数据
- `getClinicDoctorById()` - 根据ID获取坐诊医生数据

### consultation.ts
- `healthConcerns` - 健康问题数据（对应后端 AppDepartmentEnum）
- `consultationMethods` - 问诊方式选项
- `dispatchOptions` - 派单方式选项
- `paymentMethods` - 支付方式选项
- `clinicTabOptions` - 在线坐诊Tab选项
- `mockPatientStatus` - 模拟患者状态

### consultation-records.ts
- `consultationRecords` - 旧的问诊记录数据（兼容旧代码）
- `appointmentRecords` - 新的问诊订单数据（对应后端 app_AppointmentV2）
  - 包含派单模式和坐诊模式的完整示例
  - 包含各种订单状态的示例数据
- `convertToConsultationRecord()` - 将新订单转换为旧记录格式

## 使用方式

### 导入数据和类型

```typescript
// 导入所有数据和类型
import { 
  mockDoctors,
  clinicDoctors,
  consultationTypes,
  DoctorStatus,
  ConsultationMethod,
  type Doctor,
  type ClinicDoctor
} from '@/data';

// 或者从具体文件导入
import { mockDoctors } from '@/data/doctors';
import { DoctorStatus } from '@/types2';
```

### 在组件中使用

```typescript
<script setup lang="ts">
import { clinicDoctors, DoctorStatus, type ClinicDoctor } from '@/data';

// 使用数据
const doctors = ref<ClinicDoctor[]>(clinicDoctors);

// 使用枚举
const isConsulting = doctor.status === DoctorStatus.CONSULTING;
</script>
```

## 已重构的页面

- ✅ `online-clinic.vue` - 在线坐诊页面
- ✅ `consultation-order.vue` - 问诊订单页面  
- ✅ `doctor-detail.vue` - 医生详情页面

## 后端对应关系

| 前端类型/数据 | 后端实体/枚举 | 说明 |
|------------|------------|------|
| `Doctor` | `app_DoctorAuditing` | 医生审核表，包含医生详细信息 |
| `Appointment` | `app_AppointmentV2` | 问诊订单表V2 |
| `ConsultType` | `ConsultTypeEnum` | 问诊类型枚举 |
| `ConsultMode` | `ConsultModeEnum` | 问诊模式枚举 |
| `AssignMode` | `AssignModeEnum` | 派单方式枚举 |
| `AppointmentStatus` | `AppointmentStatusV2Enum` | 订单状态枚举 |
| `Department` | `AppDepartmentEnum` | 科室专科枚举 |

## 优势

1. **类型安全** - 使用TypeScript接口和枚举，减少运行时错误
2. **代码复用** - 统一的数据结构，避免重复定义
3. **易于维护** - 集中管理数据，修改时只需更新一处
4. **开发效率** - IDE智能提示，提高开发体验
5. **一致性** - 确保整个应用使用相同的数据结构
6. **前后端对齐** - 数据结构与后端API定义完全一致
7. **向后兼容** - 保留旧字段，确保现有代码正常运行

## 注意事项

1. 修改数据结构时，需要检查所有使用该数据的页面
2. 新增枚举值时，需要更新相关的类型定义
3. 保持数据的一致性，避免在不同文件中重复定义相同的数据
4. 使用新的 `Appointment` 接口时，注意枚举值为数字类型（对应后端）
5. 旧代码可以继续使用 `ConsultationRecord` 接口，通过 `convertToConsultationRecord()` 转换
