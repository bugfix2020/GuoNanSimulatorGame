import type { PlayerAttributeId } from '@/lib/player-profile';

export type StoryChoice = {
  label: string;
  href: string;
  requirements?: Partial<Record<PlayerAttributeId, number>>;
  requirementHint?: string;
};

export type StoryNode = {
  id: string;
  kind: 'scene' | 'ending';
  title: string;
  body: string[];
  choices: StoryChoice[];
  endingTitle?: string;
  source?: string;
  keywords?: string;
  note?: string;
};

export type HomeStory = {
  title: string;
  intro: string[];
  choices: StoryChoice[];
};

export const homeStory: HomeStory = {
  title: '国男大冒险',
  intro: [
    '你是某国男性，简称国男，20 岁，是学生，就读于某高校。',
    '今天你没有课，你决定：',
  ],
  choices: [
    { label: '待在宿舍', href: '/endings/endingneet' },
    { label: '出去逛逛', href: '/scenes/scenedecidebelongings' },
  ],
};

export const sceneMap: Record<string, StoryNode> = {
  scenedecidebelongings: {
    id: 'scenedecidebelongings',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '出门应该带上哪些东西好呢，你看看手机、平板、kindle、switch......决定：',
    ],
    choices: [
      { label: '全都带上', href: '/endings/endingnottouch' },
      { label: '只带必要的', href: '/scenes/scenelining' },
    ],
  },
  scenelining: {
    id: 'scenelining',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '你只带了手机和蓝牙耳机。你在学校逛了一圈，看了看时间该吃午饭了，于是你来到食堂，发现这里已经人满为患。',
      '你选了一个看起来不太长的队伍走了过去：',
    ],
    choices: [
      {
        label: '为了防止有人插队，你紧紧跟着前一个人',
        href: '/endings/endingbornguilt',
      },
      { label: '和前一个人保持距离', href: '/scenes/scenewaitinginline' },
    ],
  },
  scenewaitinginline: {
    id: 'scenewaitinginline',
    kind: 'scene',
    title: '国男大冒险',
    body: ['你和前一个人保持着距离，但是队伍移动得很慢，你打算：'],
    choices: [
      { label: '玩手机打发时间', href: '/endings/endingunexpecteddisaster' },
      { label: '听歌就好', href: '/scenes/scenelunch' },
    ],
  },
  scenelunch: {
    id: 'scenelunch',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '你跟着队伍打到了饭，吃饭时耳机没电了，你草草收了起来，便一边吃饭一边玩手机。',
      '这时你注意到一个女生在偷你耳机，你：',
    ],
    choices: [
      { label: '制止她', href: '/endings/endingthiefcatched' },
      { label: '假装没看到', href: '/scenes/sceneelevator' },
    ],
  },
  sceneelevator: {
    id: 'sceneelevator',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '你继续吃饭，吃完饭回宿舍，刚吃饱的你不太想运动，但是电梯里已经站了几个女生。',
      '你决定：',
    ],
    choices: [
      { label: '坐电梯', href: '/endings/endinghigherrace' },
      { label: '走楼梯', href: '/scenes/sceneearlyoff' },
    ],
  },
  sceneearlyoff: {
    id: 'sceneearlyoff',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '你爬楼梯回到宿舍，之后无惊无险地毕业，找了一家公司 996，贷款买了车房，通过相亲结了婚，婚后一年有了个儿子，转眼儿子便到了上小学的年纪。',
      '你肩上的担子更重了。这天你破天荒地准时下班，看时间还早，决定：',
    ],
    choices: [
      { label: '回家休息', href: '/scenes/sceneparking' },
      { label: '赚点外快', href: '/scenes/sceneparttimejob' },
    ],
  },
  sceneparking: {
    id: 'sceneparking',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '难得有这空闲时间，你打算回家休息。停车时发现你的停车位被一陌生车辆占用，你决定：',
    ],
    choices: [
      { label: '想办法联系车主', href: '/scenes/scenenapping' },
      { label: '换个车位', href: '/endings/endingcheatingwife' },
    ],
  },
  scenenapping: {
    id: 'scenenapping',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '车主在雨刮器上留了联系方式，电话打通后，车主下来开车离开了。回到家，老婆在洗澡，你躺在沙发小憩。',
      '迷迷糊糊中老婆叫你去接儿子，你：',
    ],
    choices: [
      { label: '去接', href: '/scenes/sceneappearance' },
      { label: '不去', href: '/endings/endingunbearablepain' },
    ],
  },
  sceneappearance: {
    id: 'sceneappearance',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '你看了看时间，儿子差不多放学了，于是你将放学的儿子接回家。',
      '之后你和老婆响应国家号召生了二胎，并开始准备三胎。',
      '可是随着二儿子长大，他和大儿子之间的容貌差异越来越大，你看在眼里，决定：',
    ],
    choices: [
      { label: '装不知道', href: '/endings/endinggreenabove' },
      { label: '做亲子鉴定', href: '/scenes/scenefatherinlaw' },
    ],
  },
  scenefatherinlaw: {
    id: 'scenefatherinlaw',
    kind: 'scene',
    title: '国男大冒险',
    body: [
      '心中的疑问越来越大，你悄悄带着两个孩子做了亲子鉴定，发现两个孩子都不是自己的。',
      '你和妻子为此吵了一架，你决定离婚，同时为了眼不见心不烦，搬去和父母一起住。',
      '这天岳父敲门，说是为他女儿的事来赔礼，你决定：',
    ],
    choices: [
      { label: '见面聊聊', href: '/endings/endingextermination' },
      { label: '不见', href: '/endings/endingfutureawaits' },
    ],
  },
  sceneparttimejob: {
    id: 'sceneparttimejob',
    kind: 'scene',
    title: '国男大冒险',
    body: ['你在网约车平台注册了账户，平台推来两份可接单，你选择：'],
    choices: [
      { label: '第一份', href: '/endings/endingawayout' },
      { label: '第二份', href: '/endings/endingbloodbath' },
      { label: '都不接', href: '/scenes/sceneparking' },
    ],
  },

  // 第二章：证据窗口
  scenechapter2_meeting: {
    id: 'scenechapter2_meeting',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你离开上一段婚姻纠纷后，换了城市和工作，努力把生活拉回正轨。',
      '一次客户会后，有人拍了你并配文“疑似偷拍男”发到本地群，视频开始扩散。你决定：',
    ],
    choices: [
      { label: '当场追上去争辩并抢手机', href: '/endings/endingchapter2_boomerang' },
      { label: '先调取会议与门禁记录', href: '/scenes/scenechapter2_collect' },
    ],
  },
  scenechapter2_confront: {
    id: 'scenechapter2_confront',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你追到电梯口要求删帖，对方删了原视频，但转发截图已经扩散。',
      '围观者开始二次录制，你准备：',
    ],
    choices: [
      { label: '继续在线上逐条回怼', href: '/endings/endingchapter2_boomerang' },
      { label: '停止争吵并报警备案', href: '/scenes/scenechapter2_filing' },
    ],
  },
  scenechapter2_collect: {
    id: 'scenechapter2_collect',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你从公司拿到了会议签到和门禁时间，能证明自己在关键时段并无嫌疑行为。',
      '你下一步要：',
    ],
    choices: [
      { label: '马上发长文自证并附路人截图', href: '/endings/endingchapter2_overproof' },
      {
        label: '先让律师统一对外发声',
        href: '/scenes/scenechapter2_lawyerwindow',
        requirements: { intelligence: 58 },
        requirementHint: '需要更高智力：先证据后发声',
      },
    ],
  },
  scenechapter2_spiral: {
    id: 'scenechapter2_spiral',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你越解释越被截取片段，讨论焦点从事实变成了“态度问题”。',
      '客户开始观望，你决定：',
    ],
    choices: [
      { label: '删号沉默，等待降温', href: '/endings/endingchapter2_boomerang' },
      { label: '转线下维权并整理证据链', href: '/scenes/scenechapter2_evidencepack' },
    ],
  },
  scenechapter2_filing: {
    id: 'scenechapter2_filing',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '警方受理了你的线索登记，提示你固定“原帖-转帖-评论”链路。',
      '你要不要同步引入组织支持：',
    ],
    choices: [
      {
        label: '联系公司法务并申请说明',
        href: '/scenes/scenechapter2_orgsupport',
        requirements: { tenacity: 56 },
        requirementHint: '需要更高坚韧：程序推进会更漫长',
      },
      { label: '只做个人处理并继续刷屏回应', href: '/endings/endingchapter2_rebuild' },
    ],
  },
  scenechapter2_hastyproof: {
    id: 'scenechapter2_hastyproof',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你抢先发布了监控截图，却误把无关路人画面也带了出去。',
      '舆论开始质疑你“二次泄露隐私”，你决定：',
    ],
    choices: [
      { label: '撤图道歉并改走律师发布', href: '/scenes/scenechapter2_recover' },
      { label: '坚持不删继续辩解', href: '/endings/endingchapter2_overproof' },
    ],
  },
  scenechapter2_lawyerwindow: {
    id: 'scenechapter2_lawyerwindow',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '律师函发出后，对方删除了主要内容并私信道歉，但不愿公开澄清。',
      '你的选择是：',
    ],
    choices: [
      { label: '接受私下和解并签不再传播承诺', href: '/endings/endingchapter2_limitedloss' },
      { label: '坚持公开澄清并保留起诉', href: '/scenes/scenechapter2_publicclarify' },
    ],
  },
  scenechapter2_evidencepack: {
    id: 'scenechapter2_evidencepack',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你完成了证据包，确认存在首发账号和多个高传播账号。',
      '你准备如何起诉：',
    ],
    choices: [
      { label: '先起诉首发账号', href: '/endings/endingchapter2_singlewin' },
      { label: '首发与高传播账号一并追责', href: '/scenes/scenechapter2_orgsupport' },
    ],
  },
  scenechapter2_orgsupport: {
    id: 'scenechapter2_orgsupport',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '公司发布了事实说明并提供考勤佐证，客户沟通逐步恢复。',
      '你决定后续路径：',
    ],
    choices: [
      { label: '公司联动平台投诉侵权内容', href: '/endings/endingchapter2_comeback' },
      { label: '个人继续推进公开澄清', href: '/endings/endingchapter2_fullclean' },
    ],
  },
  scenechapter2_solo: {
    id: 'scenechapter2_solo',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你单兵应对，发声频率很高，但外界始终质疑“自说自话”。',
      '你需要在状态和节奏之间做选择：',
    ],
    choices: [
      { label: '先暂停社媒并做心理恢复', href: '/endings/endingchapter2_rebuild' },
      { label: '继续高频回应所有评论', href: '/endings/endingchapter2_boomerang' },
    ],
  },
  scenechapter2_recover: {
    id: 'scenechapter2_recover',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '你撤图后由律师发布不含隐私的时间轴声明，舆情明显回落。',
      '下一步你要：',
    ],
    choices: [
      { label: '继续平台投诉和法律追责', href: '/endings/endingchapter2_comeback' },
      { label: '到此止步，换取生活恢复', href: '/endings/endingchapter2_limitedloss' },
    ],
  },
  scenechapter2_publicclarify: {
    id: 'scenechapter2_publicclarify',
    kind: 'scene',
    title: '国男大冒险·第二章',
    body: [
      '对方愿意发“误会说明”，但措辞模糊，不肯写明“无偷拍证据”。',
      '你决定：',
    ],
    choices: [
      { label: '接受模糊澄清，优先止损', href: '/endings/endingchapter2_limitedloss' },
      { label: '拒绝模糊文本，进入诉讼确认', href: '/endings/endingchapter2_fullclean' },
    ],
  },

  // 第三章：婚恋财产安全线
  scenechapter3_start: {
    id: 'scenechapter3_start',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '风波平息后，你重建了生活节奏，朋友介绍你认识了一位相亲对象。',
      '关系升温很快，你决定：',
    ],
    choices: [
      { label: '先做基础信息核验', href: '/scenes/scenechapter3_verify' },
      { label: '不想多想，快速推进关系', href: '/endings/endingchapter3_chainloss' },
    ],
  },
  scenechapter3_verify: {
    id: 'scenechapter3_verify',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '你核对后发现对方履历时间线有几处冲突。',
      '你打算：',
    ],
    choices: [
      { label: '直接公开聊天记录质问对方', href: '/endings/endingchapter3_backfire' },
      {
        label: '先记录证据再观察',
        href: '/scenes/scenechapter3_keepnote',
        requirements: { intelligence: 60 },
        requirementHint: '需要更高智力：先留痕再动作',
      },
    ],
  },
  scenechapter3_fasttrack: {
    id: 'scenechapter3_fasttrack',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '刚确定关系，对方就提出“家里急用钱”，希望你先转一笔。',
      '你选择：',
    ],
    choices: [
      { label: '先转账救急', href: '/endings/endingchapter3_chainloss' },
      { label: '只走可追溯的正规支付', href: '/scenes/scenechapter3_formalpay' },
    ],
  },
  scenechapter3_askdirect: {
    id: 'scenechapter3_askdirect',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '对方解释称“过去婚约没走完，不算问题”，并催你尽快见家长谈彩礼。',
      '你准备：',
    ],
    choices: [
      { label: '继续推进关系并先交钱', href: '/endings/endingchapter3_servicepit' },
      { label: '先咨询律师再决定', href: '/scenes/scenechapter3_lawcheck' },
    ],
  },
  scenechapter3_keepnote: {
    id: 'scenechapter3_keepnote',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '你保留了关键聊天与转账请求记录，对方则进一步催促订婚并给出大额清单。',
      '你选择：',
    ],
    choices: [
      { label: '答应快速订婚', href: '/endings/endingchapter3_sunkcost' },
      {
        label: '坚持放慢节奏并核验家庭信息',
        href: '/scenes/scenechapter3_slowdown',
        requirements: { tenacity: 58 },
        requirementHint: '需要更高坚韧：抗住压力再推进',
      },
    ],
  },
  scenechapter3_transfer: {
    id: 'scenechapter3_transfer',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '首笔转账后，对方继续以“手续费、改口费、保证金”追加要钱。',
      '你决定：',
    ],
    choices: [
      { label: '继续转账维持关系', href: '/endings/endingchapter3_chainloss' },
      { label: '停止转账并整理证据', href: '/scenes/scenechapter3_stopandcollect' },
    ],
  },
  scenechapter3_formalpay: {
    id: 'scenechapter3_formalpay',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '你提出走正规支付与凭证流程，对方明显抗拒并频繁改口。',
      '你打算：',
    ],
    choices: [
      { label: '当场撕破脸公开质问', href: '/endings/endingchapter3_backfire' },
      { label: '继续留痕并推进报备', href: '/scenes/scenechapter3_stopandcollect' },
    ],
  },
  scenechapter3_upgrade: {
    id: 'scenechapter3_upgrade',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '关系继续推进后，对方提出购买“婚介升级服务包”，称交钱才能尽快领证。',
      '你的选择是：',
    ],
    choices: [
      { label: '付款换进度', href: '/endings/endingchapter3_servicepit' },
      { label: '拒绝并改走民事维权路径', href: '/endings/endingchapter3_civilrecover' },
    ],
  },
  scenechapter3_lawcheck: {
    id: 'scenechapter3_lawcheck',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '律师建议采用“分阶段承诺+分阶段给付+关键事实书面确认”的风控方案。',
      '你决定：',
    ],
    choices: [
      { label: '嫌麻烦，直接结束关系', href: '/endings/endingchapter3_quitintime' },
      { label: '按风控方案推进并保留报备', href: '/endings/endingchapter3_proceduralwin' },
    ],
  },
  scenechapter3_quickengage: {
    id: 'scenechapter3_quickengage',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '快速订婚后，对方很快提出分开并拒绝返还大额给付。',
      '你准备：',
    ],
    choices: [
      { label: '提起民事返还诉求', href: '/endings/endingchapter3_civilrecover' },
      { label: '认亏止损，避免继续消耗', href: '/endings/endingchapter3_sunkcost' },
    ],
  },
  scenechapter3_slowdown: {
    id: 'scenechapter3_slowdown',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '你提出放慢节奏后，对方家属轮番施压，要求你“别斤斤计较，先给钱再说”。',
      '你决定：',
    ],
    choices: [
      { label: '顾全面子继续投入', href: '/endings/endingchapter3_sunkcost' },
      { label: '终止关系并进入程序化处理', href: '/endings/endingchapter3_proceduralwin' },
    ],
  },
  scenechapter3_stopandcollect: {
    id: 'scenechapter3_stopandcollect',
    kind: 'scene',
    title: '国男大冒险·第三章',
    body: [
      '你停止转账后，对方以“曝光你”“让你社死”进行威胁。',
      '你选择：',
    ],
    choices: [
      { label: '私下再给一笔封口费', href: '/endings/endingchapter3_sunkcost' },
      {
        label: '报警报备并进行平台投诉',
        href: '/endings/endingchapter3_proceduralwin',
        requirements: { tenacity: 62, compassion: 46 },
        requirementHint: '需要坚韧与怜悯：既要坚持也要守住边界',
      },
    ],
  },

  // 第四章：未成年人保护与程序防线
  scenechapter4_start: {
    id: 'scenechapter4_start',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你把“先留痕再发声”的习惯带回家庭生活。',
      '一天，家中男童放学后情绪异常，提到托管机构里存在越界接触和偷拍视频传闻。你决定：',
    ],
    choices: [
      { label: '先安抚并记录细节', href: '/scenes/scenechapter4_record' },
      { label: '先在家长群公开指责并点名', href: '/endings/endingchapter4_reversalrisk' },
    ],
  },
  scenechapter4_record: {
    id: 'scenechapter4_record',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你记录了时间、地点、孩子原话，并同步整理接送记录。',
      '接下来你要：',
    ],
    choices: [
      {
        label: '先联系其他家长交叉核验',
        href: '/scenes/scenechapter4_crosscheck',
        requirements: { compassion: 60 },
        requirementHint: '需要更高怜悯：先保护孩子再推进',
      },
      { label: '先私下找机构负责人并接受私了', href: '/endings/endingchapter4_hushmoney' },
    ],
  },
  scenechapter4_publicaccuse: {
    id: 'scenechapter4_publicaccuse',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你在群里公开质疑后，讨论迅速失控，立场对立明显。',
      '你下一步：',
    ],
    choices: [
      { label: '继续发布未核实名单和截图', href: '/endings/endingchapter4_reversalrisk' },
      { label: '删帖并改为征集线索', href: '/scenes/scenechapter4_collectclues' },
    ],
  },
  scenechapter4_crosscheck: {
    id: 'scenechapter4_crosscheck',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '两位家长反馈了相似异常，你们初步形成了同一时间段的疑点。',
      '你决定：',
    ],
    choices: [
      { label: '联合报备并走正式流程', href: '/scenes/scenechapter4_reportjoint' },
      { label: '只给孩子转学，不再追究', href: '/endings/endingchapter4_withdraw' },
    ],
  },
  scenechapter4_privatetalk: {
    id: 'scenechapter4_privatetalk',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '机构负责人提出“退费+道歉”，希望你不要继续外传。',
      '你选择：',
    ],
    choices: [
      { label: '接受退费并签保密协议', href: '/endings/endingchapter4_hushmoney' },
      { label: '拒绝封口，书面要求调取监控', href: '/scenes/scenechapter4_monitor' },
    ],
  },
  scenechapter4_escalate: {
    id: 'scenechapter4_escalate',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你持续发布未核实信息，个别内容涉及未成年人可识别线索。',
      '事态快速恶化。',
    ],
    choices: [
      { label: '继续硬顶到底', href: '/endings/endingchapter4_reversalrisk' },
      { label: '立即收缩并补做证据链', href: '/scenes/scenechapter4_collectclues' },
    ],
  },
  scenechapter4_collectclues: {
    id: 'scenechapter4_collectclues',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你改为收集可核验材料，重点固定“时间线+接触场景+传播链路”。',
      '你决定：',
    ],
    choices: [
      { label: '补充专业评估后联合报备', href: '/scenes/scenechapter4_reportjoint' },
      { label: '仅靠聊天截图继续扩散', href: '/endings/endingchapter4_weakcase' },
    ],
  },
  scenechapter4_monitor: {
    id: 'scenechapter4_monitor',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '机构只提供了部分监控，关键时段以“设备故障”解释。',
      '你选择：',
    ],
    choices: [
      { label: '申请第三方鉴定并联合报备', href: '/scenes/scenechapter4_reportjoint' },
      { label: '接受解释，停止追查', href: '/endings/endingchapter4_weakcase' },
    ],
  },
  scenechapter4_reportjoint: {
    id: 'scenechapter4_reportjoint',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '你与其他家长按流程向相关部门报备，案件进入正式处理。',
      '后续阶段你准备：',
    ],
    choices: [
      {
        label: '同步法援与心理支持，统一口径',
        href: '/scenes/scenechapter4_legalaid',
        requirements: { intelligence: 56, compassion: 62 },
        requirementHint: '需要智力与怜悯：程序与保护并行',
      },
      { label: '担心压力过大，中途撤回', href: '/endings/endingchapter4_withdraw' },
    ],
  },
  scenechapter4_legalaid: {
    id: 'scenechapter4_legalaid',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '法援团队建议你坚持未成年人隐私保护，并以书面材料统一对外。',
      '你要：',
    ],
    choices: [
      { label: '接受模糊和解，尽快了结', href: '/endings/endingchapter4_halfsettle' },
      {
        label: '继续走程序并保护儿童信息',
        href: '/scenes/scenechapter4_followup',
        requirements: { tenacity: 60, compassion: 64 },
        requirementHint: '需要坚韧与怜悯：程序推进更艰难',
      },
    ],
  },
  scenechapter4_followup: {
    id: 'scenechapter4_followup',
    kind: 'scene',
    title: '国男大冒险·第四章',
    body: [
      '多方调查逐步推进，外界关注上升。',
      '你决定如何对外发声：',
    ],
    choices: [
      { label: '坚持匿名与最小披露原则', href: '/endings/endingchapter4_protectwin' },
      { label: '公开儿童身份细节换取关注', href: '/endings/endingchapter4_privacybackfire' },
    ],
  },
};

export const endingMap: Record<string, StoryNode> = {
  endingneet: {
    id: 'endingneet',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '人在家中坐',
    body: [
      '你打算在宿舍享受一下颓废的生活，于是叫了一份外卖开始打游戏。',
      '几轮厮杀过后，看到你舍友问你为什么在食堂对着女生 DIY，你感觉莫名其妙。',
      '一番网上冲浪后你才知道，社交网络上到处都是你的负面消息，而你今天并没有出过宿舍。',
      '事后事件源头的女生表示事件纯属虚构，而你已经社会性死亡。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/6239620007/L6iAi5T2l',
    keywords: '深圳大学 食堂',
  },
  endingnottouch: {
    id: 'endingnottouch',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '无过则勉',
    body: [
      '由于你的包太大，不小心碰到了一位学姐的屁股，她在社交网络上称你是色狼，你社会性死亡。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/2615417307/JuLwat2bs',
    keywords: '清华老师回应学姐错告学弟',
  },
  endingbornguilt: {
    id: 'endingbornguilt',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '欲加之罪',
    body: [
      '你距离前面的女生太近，被她拍了下来，并且在社交网络上称你对她图谋不轨，你社会性死亡。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/p/231522cba6129f538ccfce7f46a63025fc45e6',
  },
  endingunexpecteddisaster: {
    id: 'endingunexpecteddisaster',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '无妄之灾',
    body: [
      '你忘了跟上前面的队伍，突然听到一个女生喊“你是不是插我队？！”接着一个玻璃瓶就碎在了你的后脑勺。',
      '虽然你最后制服了对方，但你也受伤住院。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    keywords: '广东医科大学 玻璃瓶',
  },
  endingthiefcatched: {
    id: 'endingthiefcatched',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '捉贼拿脏',
    body: [
      '你将小偷捉了现行，对方却表示“抛开事实不谈，你坐了我常坐的位子难道就没错吗”，然后砸了你的耳机扬长而去。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    keywords: '华东理工大学 耳机',
  },
  endinghigherrace: {
    id: 'endinghigherrace',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '高人一等',
    body: [
      '电梯作为公共资源，当然可以用。你抱着这个想法走进电梯，却被电梯里的女生认为是抢占她们的资源，并对你网暴。',
      '后来学校禁止低楼层的男生使用电梯。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    keywords: '北京师范大学 电梯',
  },
  endingcheatingwife: {
    id: 'endingcheatingwife',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '同道中人',
    body: [
      '你换了个没人用的车位。回到家，发现门前有一双不认识的男鞋，开门看到老婆正在和一名陌生男子一起为爱鼓掌。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
  },
  endingunbearablepain: {
    id: 'endingunbearablepain',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '切肤之痛',
    body: [
      '你难得有时间休息，迷迷糊糊地拒绝了，平时儿子不用接能回来，今天应该也可以。',
      '但是今天你儿子很晚都没回来，后来得知，你儿子被一名女子抱到楼上摔死。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/5044281310/L44o2EDIJ',
    keywords: '男童被陌生女抱走后在附近小区坠亡',
  },
  endinggreenabove: {
    id: 'endinggreenabove',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '难得糊涂',
    body: [
      '你对两个儿子的容貌差异视若无睹，视如己出，老婆对你很满意。',
      '不久，你们又生了第三胎。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
  },
  endingextermination: {
    id: 'endingextermination',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '鸡犬不留',
    body: [
      '你打开门，没想到岳父带着刀，他趁你不防砍倒了你，又砍倒了你的父母，然后报警自首。',
      '之后你老婆出具谅解书，减轻了岳父的刑责，并带着你的家产改嫁了。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/1887344341/L2LHwrUZ5',
    keywords: '彭州 岳父 灭门',
  },
  endingfutureawaits: {
    id: 'endingfutureawaits',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '未来可期',
    body: [
      '你表示此事绝无回旋余地，对岳父闭门不见，他离去时你从窗户看到他带着刀，暗自庆幸。',
      '恭喜你已通关当前版本，本游戏中所有结局，除“同道中人”不确定是否有真实案例外，均根据真实事件改编，如有雷同，刻意为之。',
    ],
    choices: [{ label: '进入第二章：证据窗口', href: '/scenes/scenechapter2_meeting' }],
    note: '终局页面原版没有“如果能重来”按钮，这里保留该处理。',
  },
  endingawayout: {
    id: 'endingawayout',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '逃出升天',
    body: [
      '你选了第一份单，叫车的是一位女性，目的地不算远，你凭着记忆中的路线开了过去。',
      '没想到在快到目的地时，乘客突然跳车，随后身亡，你被拘留二百天。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/1806128454/L55Qeu5zh',
    keywords: '货拉拉司机 周某春',
  },
  endingbloodbath: {
    id: 'endingbloodbath',
    kind: 'ending',
    title: '国男大冒险',
    endingTitle: '血光之灾',
    body: [
      '叫车的是一位丰满的女性，手一直插在裤兜里，目的地有点远，中间要走一段高速公路。',
      '上了高速以后，乘客从裤兜里掏出一把刀，对你连捅数刀，你重伤住院。',
    ],
    choices: [{ label: '如果能重来......', href: '/' }],
    source: 'https://weibo.com/2628314830/KxZ8Hcdje',
    keywords: '湖南一女子乘出租车拿刀刺司机',
  },

  // 第二章：证据窗口
  endingchapter2_boomerang: {
    id: 'endingchapter2_boomerang',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '回旋镖',
    body: [
      '你把大量精力投入情绪对线，舆论焦点从“事实”转向“态度”，合作机会持续流失。',
      '你意识到：没有证据节奏，声音越大不代表越有效。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://www.zaobao.com.sg/realtime/china/story20230613-1404037',
    keywords: '广州 地铁 误指控 挂网',
  },
  endingchapter2_overproof: {
    id: 'endingchapter2_overproof',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '自证越界',
    body: [
      '你坚持使用不合规素材自证，反而新增隐私争议，让自己陷入双重被动。',
      '原本可控的名誉纠纷，变成了更复杂的合规风险。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://www.news.cn/20250912/74f132d6ffc34285b1d3fc07427f970b/c.html',
    keywords: '成都 地铁 拍摄误会 取证',
  },
  endingchapter2_limitedloss: {
    id: 'endingchapter2_limitedloss',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '有限止损',
    body: [
      '你接受了删除与私下承诺，扩散被压住，生活秩序逐步恢复。',
      '但公开层面的澄清仍有灰度，后续仍需谨慎管理舆情。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://www.news.cn/politics/20250920/9ebf1e3922b4482581099d8d97bc4145/c.html',
    keywords: '校园 指控争议 校方撤销处分',
  },
  endingchapter2_singlewin: {
    id: 'endingchapter2_singlewin',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '单点胜诉',
    body: [
      '你先追首发账号，成本可控、回款明确，但传播面清理有限。',
      '这是“低风险、低覆盖”的典型维权结果。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://www.yzwb.net/news/zntt/202501/t20250116_190538.html',
    keywords: '长春 公交 挂网 维权 一审',
  },
  endingchapter2_fullclean: {
    id: 'endingchapter2_fullclean',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '系统清理',
    body: [
      '你对首发和高传播账号并行追责，周期更长，但清理面更完整。',
      '名誉修复慢一些，却更稳定。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://www.xhby.net/content/s68c29ae9e4b0eca682625521.html',
    keywords: '公共场所 误会 后续民事诉讼',
  },
  endingchapter2_comeback: {
    id: 'endingchapter2_comeback',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '程序性翻盘',
    body: [
      '你建立了“证据保全 + 组织背书 + 法律节奏”的闭环，客户关系恢复最快。',
      '你决定把这套方法带进下一段生活议题。',
    ],
    choices: [{ label: '进入第三章：婚恋财产安全', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.yzwb.net/news/zntt/202501/t20250116_190538.html',
    keywords: '名誉维权 调监控 起诉',
  },
  endingchapter2_rebuild: {
    id: 'endingchapter2_rebuild',
    kind: 'ending',
    title: '国男大冒险·第二章',
    endingTitle: '恢复优先',
    body: [
      '你先修复情绪和睡眠，再回到维权流程，整体损耗明显下降。',
      '虽然短期名誉修复较慢，但你保住了长期行动能力。',
    ],
    choices: [{ label: '重来第二章', href: '/scenes/scenechapter2_meeting' }],
    source: 'https://k.sina.cn/article_7517400647_1c0126e47059021e9y.html',
    keywords: '校园 误伤 爆料 网暴',
  },

  // 第三章：婚恋财产安全线
  endingchapter3_chainloss: {
    id: 'endingchapter3_chainloss',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '连环转账',
    body: [
      '你在“再转一次就能结婚”的话术中不断加码，最终只剩流水和空承诺。',
      '当你回头时，关系和钱都已失控。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/486051.html',
    keywords: '重复订婚 骗取财物 最高法典型案例',
  },
  endingchapter3_backfire: {
    id: 'endingchapter3_backfire',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '当场翻车',
    body: [
      '你选择公开撕扯，对方把冲突片段发到社交平台，事件再度偏离事实主线。',
      '你在情绪战里消耗了本该用于维权的时间窗口。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/419922.html',
    keywords: '婚约纠纷 证据不足 风险放大',
  },
  endingchapter3_servicepit: {
    id: 'endingchapter3_servicepit',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '焦虑付费',
    body: [
      '你为“升级服务”付费后，新的收费名目不断出现。',
      '关系被包装成流程，流程只服务于继续收款。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/456091.html',
    keywords: '婚介 17万元 服务费 返还',
  },
  endingchapter3_quitintime: {
    id: 'endingchapter3_quitintime',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '及时止损',
    body: [
      '你在风险放大前终止关系，代价可控，生活节奏得以保全。',
      '这不是失败，而是把损失锁在可承受区间。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/419922.html',
    keywords: '短婚高彩礼 酌情返还 风险控制',
  },
  endingchapter3_civilrecover: {
    id: 'endingchapter3_civilrecover',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '民事追偿',
    body: [
      '你走上民事返还路径，虽然耗时，但部分损失有机会被追回。',
      '程序成本不低，却比无序消耗更可控。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/455871.html',
    keywords: '彩礼返还 另行登记 民事救济',
  },
  endingchapter3_sunkcost: {
    id: 'endingchapter3_sunkcost',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '沉没成本',
    body: [
      '你为了“已经投入这么多”继续投入，结果只把亏损推向更大。',
      '真正的拐点本来就在第一次违和感出现时。',
    ],
    choices: [{ label: '重来第三章', href: '/scenes/scenechapter3_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/486051.html',
    keywords: '多被害人 高频婚骗 刑事处理',
  },
  endingchapter3_proceduralwin: {
    id: 'endingchapter3_proceduralwin',
    kind: 'ending',
    title: '国男大冒险·第三章',
    endingTitle: '程序化反制',
    body: [
      '你坚持留痕、分阶段给付、及时报备，把主动权从情绪场拉回证据场。',
      '不是每段关系都能继续，但你终于掌握了可复制的自我保护机制。',
    ],
    choices: [{ label: '进入第四章：未成年人保护', href: '/scenes/scenechapter4_start' }],
    source: 'https://www.court.gov.cn/zixun/xiangqing/456091.html',
    keywords: '最高法 彩礼纠纷 风险提示',
  },

  // 第四章：未成年人保护与程序防线
  endingchapter4_withdraw: {
    id: 'endingchapter4_withdraw',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '撤回之后',
    body: [
      '你选择了撤回，短期冲突下降，但关键事实停留在“传闻与猜测”。',
      '你保住了平静，也失去了推动系统改进的窗口。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://www.chinanews.com.cn/sh/2020/07-18/9242545.shtml',
    keywords: '男童 身体边界 机构事件',
  },
  endingchapter4_hushmoney: {
    id: 'endingchapter4_hushmoney',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '退费封口',
    body: [
      '你接受了退费方案，事件被快速压下。',
      '问题看似结束，但风险没有被系统性识别。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://www.thepaper.cn/newsDetail_forward_8226820',
    keywords: '男童 亲吻视频 二次传播',
  },
  endingchapter4_reversalrisk: {
    id: 'endingchapter4_reversalrisk',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '反噬风险',
    body: [
      '你在证据不足时公开点名，反而给了对方反诉与舆论反击空间。',
      '事实尚未澄清，自己先陷入程序被动。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://m.gmw.cn/2024-03/25/content_1303695057.htm',
    keywords: '幼教 伤害事件 舆论反噬',
  },
  endingchapter4_weakcase: {
    id: 'endingchapter4_weakcase',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '证据断层',
    body: [
      '你的线索停留在碎片截图，无法形成稳定证据链。',
      '案件推进受阻，最终只剩各说各话。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://nx.jcy.gov.cn/plxy/ygwj/201904/t20190401_618781.html',
    keywords: '男童 偷拍 传播 取证困难',
  },
  endingchapter4_halfsettle: {
    id: 'endingchapter4_halfsettle',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '半程和解',
    body: [
      '你选择了模糊和解，冲突成本被控制，但公开结论并不明确。',
      '这条路适合止损，不适合追求完整事实复盘。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://edu.people.com.cn/n/2013/0521/c1053-21551005.html',
    keywords: '男童 幼教暴力 监管责任',
  },
  endingchapter4_privacybackfire: {
    id: 'endingchapter4_privacybackfire',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '隐私反噬',
    body: [
      '你为了扩大关注公开了未成年人身份细节，造成二次伤害与新的合规争议。',
      '原本的保护目标被舆论流量稀释。',
    ],
    choices: [{ label: '重来第四章', href: '/scenes/scenechapter4_start' }],
    source: 'https://www.thepaper.cn/newsDetail_forward_8226820',
    keywords: '未成年人 隐私 传播 二次伤害',
  },
  endingchapter4_protectwin: {
    id: 'endingchapter4_protectwin',
    kind: 'ending',
    title: '国男大冒险·第四章',
    endingTitle: '保护闭环',
    body: [
      '你坚持“最小披露+持续留痕+联合报备”，既保护了儿童隐私，也推动了实质调查。',
      '你终于把个人经验转化为可复用的家庭安全流程。',
    ],
    choices: [{ label: '回到首页', href: '/' }],
    source: 'https://www.chinanews.com.cn/sh/2020/07-18/9242545.shtml',
    keywords: '男童保护 联合报备 隐私优先',
  },
};

export const sceneIds = Object.keys(sceneMap);
export const endingIds = Object.keys(endingMap);

export function getSceneById(id: string) {
  return sceneMap[id];
}

export function getEndingById(id: string) {
  return endingMap[id];
}
