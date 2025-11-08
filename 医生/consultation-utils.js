/**
 * 问诊工具函数库
 * 提供结束问诊、辨证分型、调护建议等功能的复用组件
 */

// ==================== 数据配置 ====================

// 辨证分型选项（扩展版）
const syndromeTypes = [
    // 基本证型
    '气虚证', '血虚证', '阴虚证', '阳虚证',
    '气滞证', '血瘀证', '痰湿证', '湿热证',
    '寒证', '热证', '虚证', '实证',
    
    // 脏腑辨证
    '肝郁气滞', '肝火上炎', '肝阳上亢', '肝血不足', '肝肾阴虚',
    '心气虚', '心血虚', '心阴虚', '心阳虚', '心火亢盛', '心肾不交',
    '脾气虚', '脾阳虚', '脾虚湿困', '脾胃虚弱', '中气下陷',
    '肺气虚', '肺阴虚', '肺热炽盛', '风寒束肺', '风热犯肺',
    '肾阳虚', '肾阴虚', '肾气不固', '肾精不足',
    
    // 气血津液辨证
    '气血两虚', '气滞血瘀', '气不摄血', '气随血脱',
    '津液不足', '痰饮内停', '水湿内停',
    
    // 六经辨证
    '太阳病', '阳明病', '少阳病', '太阴病', '少阴病', '厥阴病',
    
    // 卫气营血辨证
    '卫分证', '气分证', '营分证', '血分证',
    
    // 三焦辨证
    '上焦病', '中焦病', '下焦病'
];

// 调护建议选项（扩展版）
const careAdvices = [
    // 休息与作息
    '注意休息，避免劳累',
    '保证充足睡眠，早睡早起',
    '规律作息，不要熬夜',
    '适当午休，劳逸结合',
    
    // 饮食调护
    '清淡饮食，忌辛辣油腻',
    '忌生冷食物，宜温热饮食',
    '多吃新鲜蔬菜水果',
    '少食多餐，不要暴饮暴食',
    '忌烟酒，戒除不良嗜好',
    '多喝温水，保持充足水分',
    '饮食宜软烂易消化',
    '忌食发物（鱼虾、牛羊肉等）',
    
    // 情志调护
    '保持心情舒畅，避免情绪激动',
    '调畅情志，避免忧思过度',
    '保持乐观心态，减轻心理压力',
    
    // 运动锻炼
    '适当运动，增强体质',
    '避免剧烈运动',
    '可进行散步、太极拳等轻柔运动',
    '坚持适度锻炼，循序渐进',
    
    // 环境防护
    '注意保暖，避免受凉',
    '注意通风，保持室内空气流通',
    '避免接触过敏原',
    '注意个人卫生',
    
    // 随访复诊
    '定期复诊，观察病情变化',
    '按时服药，不要自行停药',
    '如有不适及时就诊',
    '建议一周后复诊',
    '建议两周后复诊'
];

// 望诊常用描述
const inspectionOptions = [
    // 面色
    '面色红润', '面色苍白', '面色萎黄', '面色晦暗', '面色潮红',
    
    // 精神状态
    '精神良好', '精神欠佳', '精神萎靡', '精神烦躁',
    
    // 舌象
    '舌质淡红，苔薄白', '舌质淡，苔薄白', '舌质红，苔薄黄', 
    '舌质红，苔黄腻', '舌质暗红，苔厚腻', '舌质淡胖，边有齿痕',
    '舌质红绛，少苔', '舌质紫暗，有瘀斑', '舌苔白腻', '舌苔黄厚',
    
    // 形体
    '形体消瘦', '形体肥胖', '形体适中',
    
    // 其他
    '目光有神', '目光呆滞', '眼睑浮肿', '唇色淡白', '唇色红润'
];

// 闻诊常用描述
const hearingOptions = [
    // 语声
    '语声洪亮', '语声低微', '语声嘶哑', '言语流利', '言语不清',
    
    // 呼吸
    '呼吸平稳', '气短', '喘息', '呼吸急促',
    
    // 咳嗽
    '无咳嗽', '干咳少痰', '咳嗽痰多', '咳声重浊',
    
    // 其他
    '无异常气味', '口气重', '体味重'
];

// 问诊常用模板
const askingTemplates = [
    '头痛以额部为主，胀痛为主，劳累后加重',
    '腹痛隐隐，喜温喜按，食后加重',
    '胸闷气短，活动后加重',
    '失眠多梦，入睡困难，易醒',
    '食欲不振，纳差，腹胀',
    '大便溏薄，日行2-3次',
    '大便秘结，3-4日一行',
    '小便频数，夜尿增多',
    '畏寒肢冷，得温则舒',
    '五心烦热，午后潮热',
    '自汗，活动后汗出明显',
    '盗汗，夜间汗出',
    '口干口苦，喜饮',
    '月经量少，色淡',
    '月经量多，色红',
    '腰膝酸软，乏力'
];

// 切诊常用描述
const palpationOptions = [
    // 脉象
    '脉象平和', '脉浮', '脉沉', '脉迟', '脉数',
    '脉细', '脉弱', '脉洪', '脉滑', '脉涩',
    '脉弦', '脉紧', '脉缓', '脉濡', '脉虚',
    '脉象细弱', '脉象弦细', '脉象沉细', '脉象浮数',
    
    // 血压
    '血压正常', '血压偏高', '血压偏低',
    '血压 120/80 mmHg', '血压 130/85 mmHg', '血压 140/90 mmHg',
    
    // 体温
    '体温正常', '体温 36.5°C', '体温 37.0°C', '体温 37.5°C',
    
    // 腹诊
    '腹软无压痛', '上腹部压痛', '下腹部压痛', '腹部胀满'
];

// 辨证分析模板
const syndromeAnalysisTemplates = [
    // 气血亏虚类
    {
        title: '气血亏虚证',
        content: '患者长期工作压力大，思虑过度，耗伤气血，气血不足，脑失所养，故见头痛头晕、乏力；舌淡脉细为气血亏虚之象。治以益气养血，安神定志。'
    },
    {
        title: '气虚证',
        content: '患者素体虚弱，或久病耗气，中气不足，升降失常，故见乏力、气短、纳差；舌淡苔白，脉弱。治以补中益气，升阳举陷。'
    },
    {
        title: '血虚证',
        content: '患者失血过多，或化源不足，血虚不能濡养，故见面色苍白、头晕心悸；舌淡脉细。治以养血补血，调和营卫。'
    },
    
    // 阴阳虚类
    {
        title: '阴虚证',
        content: '患者久病伤阴，或情志不遂，阴液亏耗，虚火内生，故见五心烦热、盗汗、口干；舌红少苔，脉细数。治以滋阴降火，养阴生津。'
    },
    {
        title: '阳虚证',
        content: '患者素体阳虚，或久病耗阳，阳气不足，温煦失职，故见畏寒肢冷、神疲乏力；舌淡胖，脉沉迟。治以温补阳气，温阳散寒。'
    },
    
    // 肝系证候
    {
        title: '肝郁气滞证',
        content: '患者情志不遂，肝失疏泄，气机郁滞，故见胸胁胀痛、情绪抑郁、善太息；舌淡红，脉弦。治以疏肝理气，调畅气机。'
    },
    {
        title: '肝火上炎证',
        content: '患者情志过极，肝郁化火，火热上炎，故见头痛目赤、急躁易怒、口苦咽干；舌红苔黄，脉弦数。治以清肝泻火，平肝潜阳。'
    },
    {
        title: '肝阳上亢证',
        content: '患者肝肾阴虚，水不涵木，肝阳上亢，故见头晕目眩、急躁易怒、腰膝酸软；舌红少苔，脉弦细数。治以平肝潜阳，滋养肝肾。'
    },
    
    // 脾胃证候
    {
        title: '脾胃虚弱证',
        content: '患者饮食不节，或思虑过度，损伤脾胃，运化失司，故见纳差、腹胀、便溏、乏力；舌淡苔白，脉弱。治以健脾益气，和胃助运。'
    },
    {
        title: '脾虚湿困证',
        content: '患者脾虚失运，水湿内停，湿浊中阻，故见脘腹胀满、身重困倦、大便溏薄；舌淡胖，苔白腻，脉濡缓。治以健脾祛湿，化湿和中。'
    },
    {
        title: '中气下陷证',
        content: '患者脾气虚弱，中气不足，升举无力，清阳下陷，故见脘腹坠胀、少气懒言、便意频频；舌淡，脉弱。治以补中益气，升阳举陷。'
    },
    
    // 心系证候
    {
        title: '心气虚证',
        content: '患者久病体虚，心气不足，鼓动无力，故见心悸气短、神疲乏力、自汗；舌淡，脉虚弱。治以益气养心，宁心安神。'
    },
    {
        title: '心血虚证',
        content: '患者失血过多，或久病耗血，心血不足，心神失养，故见心悸失眠、多梦健忘、面色无华；舌淡，脉细弱。治以养血安神，补益心血。'
    },
    {
        title: '心肾不交证',
        content: '患者肾阴亏虚，水不济火，心火独亢，心肾不交，故见心烦失眠、腰膝酸软、遗精盗汗；舌红少苔，脉细数。治以滋阴降火，交通心肾。'
    },
    {
        title: '心火亢盛证',
        content: '患者情志过极，心火内炽，扰乱心神，故见心烦失眠、口舌生疮、小便短赤；舌尖红，脉数有力。治以清心泻火，安神定志。'
    },
    
    // 肺系证候
    {
        title: '肺气虚证',
        content: '患者久咳伤肺，肺气虚弱，宣降失常，故见咳嗽气短、声低懒言、易感冒；舌淡苔白，脉弱。治以补益肺气，宣肺止咳。'
    },
    {
        title: '肺阴虚证',
        content: '患者久病伤阴，肺阴亏耗，虚火内生，故见干咳少痰、潮热盗汗、口干咽燥；舌红少津，脉细数。治以养阴润肺，清热生津。'
    },
    {
        title: '风寒束肺证',
        content: '患者感受风寒，肺气失宣，故见咳嗽、咯痰清稀、恶寒发热、鼻塞流涕；舌淡苔薄白，脉浮紧。治以疏风散寒，宣肺止咳。'
    },
    {
        title: '风热犯肺证',
        content: '患者感受风热，热邪犯肺，肺失清肃，故见咳嗽、痰黄稠、发热恶风、咽痛；舌红苔黄，脉浮数。治以疏风清热，宣肺止咳。'
    },
    
    // 肾系证候
    {
        title: '肾阴虚证',
        content: '患者久病伤阴，或房劳过度，肾阴亏虚，虚火内生，故见腰膝酸软、五心烦热、盗汗遗精；舌红少苔，脉细数。治以滋补肾阴，降火潜阳。'
    },
    {
        title: '肾阳虚证',
        content: '患者年老体衰，或久病耗阳，肾阳不足，温煦失职，故见腰膝酸冷、畏寒肢冷、阳痿早泄；舌淡胖，脉沉迟。治以温补肾阳，补火助阳。'
    },
    {
        title: '肾气不固证',
        content: '患者肾气虚弱，固摄失职，故见腰膝酸软、小便频数、遗精滑泄、带下清稀；舌淡，脉沉弱。治以补肾固精，涩精止遗。'
    },
    
    // 气血津液辨证
    {
        title: '气滞血瘀证',
        content: '患者情志不畅，气机郁滞，血行不畅，瘀血内停，故见胸胁刺痛、痛处固定、舌紫暗有瘀斑；脉涩。治以行气活血，化瘀止痛。'
    },
    {
        title: '痰湿内盛证',
        content: '患者脾失健运，水湿内停，聚而成痰，痰湿中阻，故见胸闷痰多、身重困倦、纳呆呕恶；舌淡胖，苔白腻，脉滑。治以健脾化痰，燥湿和中。'
    },
    {
        title: '湿热蕴结证',
        content: '患者感受湿热，或脾虚湿郁化热，湿热蕴结，故见身热不扬、胸闷纳呆、大便黏滞不爽；舌红苔黄腻，脉濡数。治以清热利湿，化浊和中。'
    }
];

// ==================== 选择器弹窗函数 ====================

/**
 * 打开辨证分型选择器
 */
function openSyndromeSelector() {
    const currentValue = document.getElementById('syndromeType').value;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择辨证分型</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="text-xs text-[#6B7280] mb-3">
                点击可添加多个证型，用顿号分隔
            </div>
            <div class="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                ${syndromeTypes.map(type => `
                    <button 
                        class="py-2 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm font-medium hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors text-left"
                        onclick="selectSyndrome('${type}')"
                        aria-label="选择${type}">
                        ${type}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择辨证分型
 */
function selectSyndrome(type) {
    const input = document.getElementById('syndromeType');
    if (input.value) {
        input.value += '、' + type;
    } else {
        input.value = type;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开调护建议选择器
 */
function openCareAdviceSelector() {
    const currentValue = document.getElementById('careAdvice').value;
    
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择调护建议</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="text-xs text-[#6B7280] mb-3">
                点击可添加多条建议，用分号分隔
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${careAdvices.map(advice => `
                    <button 
                        class="w-full py-2.5 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors"
                        onclick="selectCareAdvice('${advice}')"
                        aria-label="选择${advice}">
                        ${advice}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择调护建议
 */
function selectCareAdvice(advice) {
    const input = document.getElementById('careAdvice');
    if (input.value) {
        input.value += '；' + advice;
    } else {
        input.value = advice;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开望诊选择器
 */
function openInspectionSelector() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择望诊描述</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${inspectionOptions.map(option => `
                    <button 
                        class="w-full py-2.5 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors"
                        onclick="selectInspection('${option}')"
                        aria-label="选择${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择望诊描述
 */
function selectInspection(option) {
    const input = document.getElementById('inspection');
    if (input.value) {
        input.value += '，' + option;
    } else {
        input.value = option;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开闻诊选择器
 */
function openHearingSelector() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择闻诊描述</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${hearingOptions.map(option => `
                    <button 
                        class="w-full py-2.5 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors"
                        onclick="selectHearing('${option}')"
                        aria-label="选择${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择闻诊描述
 */
function selectHearing(option) {
    const input = document.getElementById('hearing');
    if (input.value) {
        input.value += '，' + option;
    } else {
        input.value = option;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开辨证分析模板选择器
 */
function openSyndromeAnalysisSelector() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择辨证分析模板</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="text-xs text-[#6B7280] mb-3">
                选择后可根据实际情况修改
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${syndromeAnalysisTemplates.map(template => `
                    <button 
                        class="w-full p-3 border-2 border-[#E5E7EB] rounded-lg text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] transition-colors"
                        onclick='selectSyndromeAnalysis(\`${template.content}\`)'
                        aria-label="选择${template.title}">
                        <div class="text-[#8E4337] text-sm font-bold mb-1">${template.title}</div>
                        <div class="text-[#6B7280] text-xs line-clamp-2">${template.content}</div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择辨证分析模板
 */
function selectSyndromeAnalysis(content) {
    const input = document.getElementById('syndromeAnalysis');
    input.value = content;
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开问诊选择器
 */
function openAskingSelector() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择问诊模板</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${askingTemplates.map(option => `
                    <button 
                        class="w-full py-2.5 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors"
                        onclick="selectAsking('${option}')"
                        aria-label="选择${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择问诊模板
 */
function selectAsking(option) {
    const input = document.getElementById('asking');
    if (input.value) {
        input.value += '。' + option;
    } else {
        input.value = option;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

/**
 * 打开切诊选择器
 */
function openPalpationSelector() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <div class="modal-content max-w-[340px]">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-[#1F2937] text-lg font-bold">选择切诊描述</h3>
                <button onclick="this.closest('.modal-overlay').remove()" class="text-[#6B7280] hover:text-[#1F2937]" aria-label="关闭">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>
            </div>
            <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                ${palpationOptions.map(option => `
                    <button 
                        class="w-full py-2.5 px-3 border-2 border-[#E5E7EB] rounded-lg text-[#1F2937] text-sm text-left hover:border-[#8E4337] hover:bg-[#F5EBE9] hover:text-[#8E4337] transition-colors"
                        onclick="selectPalpation('${option}')"
                        aria-label="选择${option}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

/**
 * 选择切诊描述
 */
function selectPalpation(option) {
    const input = document.getElementById('palpation');
    if (input.value) {
        input.value += '，' + option;
    } else {
        input.value = option;
    }
    document.querySelector('.modal-overlay[style*="9999"]').remove();
}

// ==================== 结束问诊表单生成 ====================

/**
 * 生成结束问诊表单HTML
 * @param {boolean} includeFourDiagnosis - 是否包含四诊信息
 * @returns {string} 表单HTML
 */
function generateEndConsultationForm(includeFourDiagnosis = true) {
    let formHTML = `
        <div class="text-left space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-2">
            <!-- 主诉 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="chiefComplaint">主诉 <span class="text-[#EF4444]">*</span></label>
                <textarea 
                    id="chiefComplaint"
                    rows="2"
                    placeholder="请输入主诉..."
                    class="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                ></textarea>
            </div>
    `;

    // 四诊信息（可选）
    if (includeFourDiagnosis) {
        formHTML += `
            <!-- 四诊信息标题 -->
            <div class="pt-2 pb-1 border-t border-[#E5E7EB]">
                <div class="text-sm font-semibold text-[#8E4337]">四诊信息</div>
            </div>

            <!-- 望诊 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="inspection">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-3.5 h-3.5">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        望诊
                    </span>
                </label>
                <div class="flex gap-2">
                    <textarea 
                        id="inspection"
                        rows="2"
                        placeholder="面色、舌象、精神状态等..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                    <button 
                        type="button"
                        onclick="openInspectionSelector()"
                        class="px-3 py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center gap-1 self-start"
                        aria-label="选择望诊">
                        选择
                    </button>
                </div>
            </div>

            <!-- 闻诊 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="hearing">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-3.5 h-3.5">
                            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                        </svg>
                        闻诊
                    </span>
                </label>
                <div class="flex gap-2">
                    <textarea 
                        id="hearing"
                        rows="2"
                        placeholder="语声、呼吸、咳嗽等..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                    <button 
                        type="button"
                        onclick="openHearingSelector()"
                        class="px-3 py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center gap-1 self-start"
                        aria-label="选择闻诊">
                        选择
                    </button>
                </div>
            </div>

            <!-- 问诊 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="asking">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-3.5 h-3.5">
                            <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                            <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                        </svg>
                        问诊
                    </span>
                </label>
                <div class="flex gap-2 mb-2">
                    <textarea 
                        id="asking"
                        rows="3"
                        placeholder="症状详情、伴随症状、大小便、睡眠等..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                </div>
                <button 
                    type="button"
                    onclick="openAskingSelector()"
                    class="w-full py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center justify-center gap-1"
                    aria-label="选择问诊模板">
                    选择常用模板
                </button>
            </div>

            <!-- 切诊 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="palpation">
                    <span class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#8E4337" class="w-3.5 h-3.5">
                            <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z" />
                        </svg>
                        切诊
                    </span>
                </label>
                <div class="flex gap-2">
                    <textarea 
                        id="palpation"
                        rows="2"
                        placeholder="脉象、血压、体温等..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                    <button 
                        type="button"
                        onclick="openPalpationSelector()"
                        class="px-3 py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center gap-1 self-start"
                        aria-label="选择切诊">
                        选择
                    </button>
                </div>
            </div>

            <!-- 分隔线 -->
            <div class="pt-2 pb-1 border-t border-[#E5E7EB]">
                <div class="text-sm font-semibold text-[#8E4337]">诊断与调护</div>
            </div>
        `;
    }

    formHTML += `
            <!-- 诊断结果 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="diagnosisResult">诊断结果 <span class="text-[#EF4444]">*</span></label>
                <textarea 
                    id="diagnosisResult"
                    rows="2"
                    placeholder="请输入诊断结果..."
                    class="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                ></textarea>
            </div>
            
            <!-- 辨证分型 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="syndromeType">辨证分型</label>
                <div class="flex gap-2">
                    <input 
                        type="text"
                        id="syndromeType"
                        placeholder="请输入或选择辨证分型..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent"
                    />
                    <button 
                        type="button"
                        onclick="openSyndromeSelector()"
                        class="px-3 py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center gap-1"
                        aria-label="选择辨证分型">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                            <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                        </svg>
                        选择
                    </button>
                </div>
            </div>

            <!-- 辨证分析 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="syndromeAnalysis">
                    辨证分析
                    <span class="text-[#9CA3AF] text-xs font-normal ml-1">(病因、病机、治则)</span>
                </label>
                <div class="flex gap-2 mb-2">
                    <textarea 
                        id="syndromeAnalysis"
                        rows="4"
                        placeholder="例如：患者长期工作压力大,思虑过度,耗伤气血,气血不足,脑失所养,故见头痛头晕、乏力;舌淡脉细为气血亏虚之象。治以益气养血,安神定志。"
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                </div>
                <button 
                    type="button"
                    onclick="openSyndromeAnalysisSelector()"
                    class="w-full py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center justify-center gap-1"
                    aria-label="选择辨证分析模板">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                        <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" />
                    </svg>
                    选择辨证分析模板
                </button>
            </div>
            
            <!-- 调护建议 -->
            <div>
                <label class="block text-sm font-medium text-[#374151] mb-2" for="careAdvice">调护建议</label>
                <div class="flex gap-2 mb-2">
                    <textarea 
                        id="careAdvice"
                        rows="3"
                        placeholder="请输入或选择调护建议..."
                        class="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8E4337] focus:border-transparent resize-none"
                    ></textarea>
                </div>
                <button 
                    type="button"
                    onclick="openCareAdviceSelector()"
                    class="w-full py-2 bg-[#F5EBE9] border border-[#8E4337] rounded-lg text-[#8E4337] text-xs font-medium hover:bg-[#E5D5D0] transition-colors flex items-center justify-center gap-1"
                    aria-label="选择调护建议">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                        <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
                    </svg>
                    选择常用调护建议
                </button>
            </div>
        </div>
    `;

    return formHTML;
}

/**
 * 验证结束问诊表单
 * @param {boolean} includeFourDiagnosis - 是否验证四诊信息
 * @returns {Object} 验证结果 { valid: boolean, message: string, data: object }
 */
function validateEndConsultationForm(includeFourDiagnosis = true) {
    const chiefComplaint = document.getElementById('chiefComplaint').value.trim();
    const diagnosis = document.getElementById('diagnosisResult').value.trim();
    
    if (!chiefComplaint) {
        return { valid: false, message: '请输入主诉' };
    }
    if (!diagnosis) {
        return { valid: false, message: '请输入诊断结果' };
    }

    const data = {
        chiefComplaint,
        diagnosis,
        syndromeType: document.getElementById('syndromeType').value.trim(),
        syndromeAnalysis: document.getElementById('syndromeAnalysis').value.trim(),
        careAdvice: document.getElementById('careAdvice').value.trim()
    };

    if (includeFourDiagnosis) {
        data.inspection = document.getElementById('inspection').value.trim();
        data.hearing = document.getElementById('hearing').value.trim();
        data.asking = document.getElementById('asking').value.trim();
        data.palpation = document.getElementById('palpation').value.trim();
    }

    return { valid: true, message: '', data };
}

