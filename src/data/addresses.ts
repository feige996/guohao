// 收货地址相关数据

export interface Address {
  id: number;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

// 收货地址数据
export const addresses: Address[] = [
  {
    id: 1,
    name: '张三',
    phone: '138****5678',
    province: '广东省',
    city: '广州市',
    district: '天河区',
    detail: '天河路123号',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '139****8765',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区456号',
    isDefault: false
  },
  {
    id: 3,
    name: '王五',
    phone: '136****4321',
    province: '广东省',
    city: '佛山市',
    district: '禅城区',
    detail: '季华路789号',
    isDefault: false
  }
];

// 获取默认地址
export function getDefaultAddress(): Address | undefined {
  return addresses.find(addr => addr.isDefault);
}

// 根据ID获取地址
export function getAddressById(id: number): Address | undefined {
  return addresses.find(addr => addr.id === id);
}
