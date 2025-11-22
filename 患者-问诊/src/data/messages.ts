// 聊天消息相关数据

export interface ChatMessage {
  id?: number;
  type: 'patient' | 'doctor' | 'system';
  content: string;
  time?: string;
  image?: string;
  avatar?: string;  // 头像（用于聊天页面显示）
  prescription?: {
    id: number;
    name: string;
    medicines: string[];
  };
}

// 模拟聊天消息数据
export const mockChatMessages: ChatMessage[] = [
  {
    type: 'patient',
    content: '医生您好，我这几天一直头痛，咳嗽，喉咙也很痛。',
    time: '10:30'
  },
  {
    type: 'doctor',
    content: '您好，我看到您的症状描述了。请问这种情况持续多久了？',
    time: '10:31'
  },
  {
    type: 'patient',
    content: '大概有3-4天了，开始只是轻微的不舒服，这两天症状加重了。',
    time: '10:32'
  },
  {
    type: 'doctor',
    content: '明白了。请问您有没有发烧的症状？体温测量过吗？',
    time: '10:33'
  },
  {
    type: 'patient',
    content: '有一点低烧，昨天晚上测量是37.5度左右。',
    time: '10:34'
  },
  {
    type: 'doctor',
    content: '根据您的描述，初步判断可能是风热感冒。我建议您注意休息，多喝温水。我给您开一些中药调理。',
    time: '10:36'
  },
  {
    type: 'system',
    content: '医生已为您开具处方，请查看',
    time: '10:37'
  },
  {
    type: 'doctor',
    content: '处方中包含了清热解毒、疏风散寒的中药。按照处方说明服用，一般3-5天就会有明显改善。如果症状持续或加重，请及时就医。',
    time: '10:38'
  },
  {
    type: 'patient',
    content: '好的，谢谢医生！我还想问一下，饮食方面有什么需要注意的吗？',
    time: '10:39'
  },
  {
    type: 'doctor',
    content: '饮食方面建议清淡为主，避免辛辣刺激、油腻的食物。可以多吃一些新鲜蔬菜水果，补充维生素。同时要保证充足的睡眠，有助于身体恢复。',
    time: '10:40'
  },
  {
    type: 'patient',
    content: '明白了，我会注意的。非常感谢医生的耐心解答！',
    time: '10:41'
  },
  {
    type: 'doctor',
    content: '不客气，祝您早日康复！如果有任何问题，随时可以联系我。',
    time: '10:42'
  }
];

// 快捷回复选项
export const quickReplies: string[] = [
  '症状有所缓解',
  '症状没有改善',
  '出现了新的症状',
  '想要复诊',
  '谢谢医生'
];
