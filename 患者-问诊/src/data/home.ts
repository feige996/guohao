// 首页相关数据

export interface MainFeature {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  route: string;
}

export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  route?: string;
}

export interface OnlineDoctor {
  id: number;
  name: string;
  title: string;
  department: string;
  hospital: string;
  avatar: string;
  status: 'consulting' | 'available';
  specialty: string[];
  totalSlots: number;
  usedSlots: number;
  currentNumber?: number;
  waitingCount?: number;
  price: number;
}

// 主要功能卡片
export const mainFeatures: MainFeature[] = [
  {
    id: 1,
    title: "在线问诊",
    subtitle: "专业医生24小时在线",
    icon: "consultation",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    route: "/pages/consultation-order"
  },
  {
    id: 2,
    title: "在线坐诊",
    subtitle: "名医坐诊，即时问诊",
    icon: "clinic",
    bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    route: "/pages/online-clinic"
  },
  {
    id: 3,
    title: "健康档案",
    subtitle: "记录您的健康信息",
    icon: "health",
    bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    route: "/pages/patient-profile"
  },
  {
    id: 4,
    title: "药房购药",
    subtitle: "在线购买中药配方",
    icon: "pharmacy",
    bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    route: "/pages/pharmacy"
  }
];

// 快捷功能
export const quickActions: QuickAction[] = [
  { id: 1, title: "问诊记录", icon: "records", route: "/pages/consultation-records" },
  { id: 2, title: "我的处方", icon: "prescription", route: "/pages/prescription-records" },
  { id: 3, title: "健康档案", icon: "health", route: "/pages/patient-profile" },
  { id: 4, title: "购药服务", icon: "pharmacy", route: "/pages/pharmacy" }
];

// 专家坐诊医生数据（首页展示）
export const onlineDoctors: OnlineDoctor[] = [
  {
    id: 1,
    name: "陈广志",
    title: "主任医师",
    department: "内分泌科",
    hospital: "佛山中医院",
    avatar: "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg",
    status: "consulting",
    specialty: ["糖尿病", "甲状腺疾病", "骨质疏松", "肥胖症"],
    totalSlots: 20,
    usedSlots: 15,
    currentNumber: 8,
    waitingCount: 7,
    price: 99
  },
  {
    id: 2,
    name: "李明华",
    title: "主任医师",
    department: "心血管科",
    hospital: "广州中医院",
    avatar: "https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg",
    status: "consulting",
    specialty: ["冠心病", "高血压", "心律失常", "心力衰竭"],
    totalSlots: 15,
    usedSlots: 15,
    currentNumber: 12,
    waitingCount: 3,
    price: 89
  },
  {
    id: 3,
    name: "张仲景",
    title: "副主任医师",
    department: "中医内科",
    hospital: "北京中医院",
    avatar: "https://cdn.pixabay.com/photo/2016/11/29/09/16/architect-1868667_640.jpg",
    status: "available",
    specialty: ["失眠", "胃肠病", "感冒", "调理"],
    totalSlots: 12,
    usedSlots: 8,
    price: 79
  },
  {
    id: 4,
    name: "华佗",
    title: "主治医师",
    department: "针灸科",
    hospital: "上海中医院",
    avatar: "https://cdn.pixabay.com/photo/2015/07/20/12/57/doctor-852770_640.jpg",
    status: "available",
    specialty: ["颈椎病", "肩周炎", "腰椎间盘突出", "膝关节炎"],
    totalSlots: 10,
    usedSlots: 10,
    price: 69
  }
];

// 推荐专家（基于mockDoctors的简化版本）
export const recommendDoctors = [
  {
    id: 1,
    name: "陈广志",
    title: "主任医师",
    department: "内分泌科",
    hospital: "佛山中医院",
    avatar: "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg",
    rating: 4.9,
    consultations: 56800,
    specialty: ["糖尿病", "甲状腺疾病"],
    consultationFee: 99,
    introduction: "从事内分泌临床工作20余年,擅长中西医结合治疗糖尿病及其并发症"
  },
  {
    id: 2,
    name: "李明华",
    title: "主任医师",
    department: "心血管科",
    hospital: "广州中医院",
    avatar: "https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg",
    rating: 4.8,
    consultations: 42300,
    specialty: ["冠心病", "高血压"],
    consultationFee: 89,
    introduction: "中医心血管专家,擅长中医药调理心血管疾病"
  },
  {
    id: 3,
    name: "张仲景",
    title: "副主任医师",
    department: "中医内科",
    hospital: "北京中医院",
    avatar: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_640.jpg",
    rating: 4.7,
    consultations: 32100,
    specialty: ["失眠", "胃肠病"],
    consultationFee: 79,
    introduction: "中医内科专家，擅长脾胃病、失眠等常见病的中医调理"
  },
  {
    id: 4,
    name: "华佗",
    title: "主治医师",
    department: "针灸科",
    hospital: "上海中医院",
    avatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_640.jpg",
    rating: 4.6,
    consultations: 25600,
    specialty: ["颈椎病", "肩周炎"],
    consultationFee: 69,
    introduction: "针灸推拿专家，擅长运用针灸、推拿治疗各类痛症"
  }
];
