export type StoryChoice = {
  label: string;
  href: string;
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
    choices: [],
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
};

export const sceneIds = Object.keys(sceneMap);
export const endingIds = Object.keys(endingMap);

export function getSceneById(id: string) {
  return sceneMap[id];
}

export function getEndingById(id: string) {
  return endingMap[id];
}
