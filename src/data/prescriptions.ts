// 处方相关数据

export interface PrescriptionRecord {
  id: number;
  doctor: {
    id: number;
    name: string;
    title: string;
    department: string;
    hospital: string;
    avatar: string;
  };
  prescriptionNumber: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    specification: string;
    quantity: string;
    usage: string;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed';
  isPaid: boolean;
  orderNumber?: string;
  shippingInfo?: {
    company: string;
    trackingNumber: string;
    status: string;
  };
}

export interface Prescription {
  id: number;
  prescriptionNumber: string;
  doctor: {
    id: number;
    name: string;
    title: string;
    department: string;
    hospital: string;
    avatar: string;
  };
  date: string;
  diagnosis: string;
  medicines: {
    id: number;
    name: string;
    specification: string;
    quantity: string;
    usage: string;
    price: number;
    stock: number;
  }[];
  totalAmount: number;
  validUntil: string;
  status: 'pending' | 'paid' | 'expired';
  // 扩展字段（用于 pharmacy 页面）
  prescriptionType?: string;      // 处方类型（颗粒/饮片）
  functionDescription?: string;   // 功用描述
  mainTreatment?: string;        // 主治
  usageMethod?: string;          // 用法
  precautions?: string;          // 注意事项
}

// 处方记录数据
export const prescriptionRecords: PrescriptionRecord[] = [
  {
    id: 1,
    doctor: {
      id: 1,
      name: "陈广志",
      title: "主任医师",
      department: "内分泌科",
      hospital: "佛山中医院",
      avatar: "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg",
    },
    prescriptionNumber: "RX20241105001",
    date: "2024-11-05 14:30",
    diagnosis: "气虚血瘀，心脉不畅",
    medicines: [
      {
        name: "丹参片",
        specification: "0.32g*100片",
        quantity: "2盒",
        usage: "口服，一次4片，一日3次",
        price: 28.5,
      },
      {
        name: "血府逐瘀胶囊",
        specification: "0.4g*36粒",
        quantity: "3盒",
        usage: "口服，一次3粒，一日2次",
        price: 35.8,
      },
      {
        name: "参芪颗粒",
        specification: "10g*10袋",
        quantity: "2盒",
        usage: "开水冲服，一次1袋，一日2次",
        price: 42.0,
      },
    ],
    totalAmount: 178.9,
    status: "completed",
    isPaid: true,
    orderNumber: "PO20241105001",
    shippingInfo: {
      company: "顺丰速运",
      trackingNumber: "SF1234567890",
      status: "已签收",
    },
  },
  {
    id: 2,
    doctor: {
      id: 2,
      name: "李明华",
      title: "主任医师",
      department: "心血管科",
      hospital: "广州中医院",
      avatar: "https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg",
    },
    prescriptionNumber: "RX20241103002",
    date: "2024-11-03 10:15",
    diagnosis: "脾胃虚弱，湿热内蕴",
    medicines: [
      {
        name: "香砂养胃丸",
        specification: "9g*10丸",
        quantity: "2盒",
        usage: "口服，一次1丸，一日2次",
        price: 32.0,
      },
      {
        name: "保和丸",
        specification: "6g*10袋",
        quantity: "1盒",
        usage: "口服，一次1袋，一日2次",
        price: 25.5,
      },
    ],
    totalAmount: 89.5,
    status: "shipped",
    isPaid: true,
    orderNumber: "PO20241103002",
    shippingInfo: {
      company: "中通快递",
      trackingNumber: "ZT9876543210",
      status: "运输中",
    },
  },
  {
    id: 3,
    doctor: {
      id: 3,
      name: "张仲景",
      title: "副主任医师",
      department: "中医内科",
      hospital: "北京中医院",
      avatar: "https://cdn.pixabay.com/photo/2016/11/29/09/16/architect-1868667_640.jpg",
    },
    prescriptionNumber: "RX20241101003",
    date: "2024-11-01 16:45",
    diagnosis: "肝郁气滞，失眠多梦",
    medicines: [
      {
        name: "逍遥丸",
        specification: "6g*10袋",
        quantity: "3盒",
        usage: "口服，一次1袋，一日2次",
        price: 28.0,
      },
      {
        name: "酸枣仁汤颗粒",
        specification: "10g*9袋",
        quantity: "2盒",
        usage: "开水冲服，一次1袋，睡前服用",
        price: 38.5,
      },
    ],
    totalAmount: 161.0,
    status: "pending",
    isPaid: false,
  },
];

// 药房处方数据（待支付的处方）
export const pharmacyPrescriptions: Prescription[] = [
  {
    id: 1,
    prescriptionNumber: "RX20241105001",
    doctor: {
      id: 1,
      name: "陈广志",
      title: "主任医师",
      department: "内分泌科",
      hospital: "佛山中医院",
      avatar: "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_640.jpg",
    },
    date: "2024-11-05 14:30",
    diagnosis: "气虚血瘀，心脉不畅",
    medicines: [
      {
        id: 1,
        name: "丹参片",
        specification: "0.32g*100片",
        quantity: "2盒",
        usage: "口服，一次4片，一日3次",
        price: 28.5,
        stock: 156,
      },
      {
        id: 2,
        name: "血府逐瘀胶囊",
        specification: "0.4g*36粒",
        quantity: "3盒",
        usage: "口服，一次3粒，一日2次",
        price: 35.8,
        stock: 89,
      },
      {
        id: 3,
        name: "参芪颗粒",
        specification: "10g*10袋",
        quantity: "2盒",
        usage: "开水冲服，一次1袋，一日2次",
        price: 42.0,
        stock: 234,
      },
    ],
    totalAmount: 178.9,
    validUntil: "2024-11-12",
    status: "pending",
    // pharmacy 页面扩展字段
    prescriptionType: "颗粒",
    functionDescription: "益气活血、通脉宁心",
    mainTreatment: "气虚血瘀、心脉不畅",
    usageMethod: "温开水冲服，每日2-3次，饭后服用",
    precautions: "忌食辛辣、油腻食物；孕妇慎用",
  },
  {
    id: 2,
    prescriptionNumber: "RX20241103002",
    doctor: {
      id: 2,
      name: "李明华",
      title: "主任医师",
      department: "心血管科",
      hospital: "广州中医院",
      avatar: "https://cdn.pixabay.com/photo/2018/01/04/21/15/young-3061652_640.jpg",
    },
    date: "2024-11-03 10:15",
    diagnosis: "脾胃虚弱，湿热内蕴",
    medicines: [
      {
        id: 4,
        name: "香砂养胃丸",
        specification: "9g*10丸",
        quantity: "2盒",
        usage: "口服，一次1丸，一日2次",
        price: 32.0,
        stock: 67,
      },
      {
        id: 5,
        name: "保和丸",
        specification: "6g*10袋",
        quantity: "1盒",
        usage: "口服，一次1袋，一日2次",
        price: 25.5,
        stock: 123,
      },
    ],
    totalAmount: 89.5,
    validUntil: "2024-11-10",
    status: "pending",
    // pharmacy 页面扩展字段
    prescriptionType: "饮片",
    functionDescription: "健脾和胃、消食导滞",
    mainTreatment: "脾胃虚弱、食积不化",
    usageMethod: "水煎服，每日1剂，分早晚两次温服",
    precautions: "忌食生冷、油腻食物；服药期间清淡饮食",
  },
];
