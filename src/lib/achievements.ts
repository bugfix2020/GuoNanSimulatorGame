import { endingIds, sceneIds } from '@/lib/story';

export type AchievementCategoryId =
  | 'exploration'
  | 'conflict'
  | 'relationship'
  | 'destiny'
  | 'loop'
  | 'archive';

export type AchievementGrade = 'jia' | 'yi' | 'bing';

export type AchievementProgressState = {
  visitedScenes: string[];
  visitedEndings: string[];
  routeCounts: Record<string, number>;
};

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategoryId;
  grade: AchievementGrade;
  points: number;
  reward: string;
  check: (state: AchievementProgressState) => boolean;
  progress: (state: AchievementProgressState) => {
    current: number;
    total: number;
  };
};

export type AchievementCategory = {
  id: AchievementCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  anchor:
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom-left';
  x: string;
  y: string;
};

function countMatches(values: string[], targets: string[]) {
  return targets.filter((target) => values.includes(target)).length;
}

const allSceneCount = sceneIds.length;
const allEndingCount = endingIds.length;

export const achievementCategories: AchievementCategory[] = [
  {
    id: 'relationship',
    title: '关系成就',
    shortTitle: '关系',
    description: '围绕婚恋、家庭与牵连后果的分支勋章。',
    anchor: 'top-left',
    x: '8%',
    y: '7%',
  },
  {
    id: 'destiny',
    title: '终局成就',
    shortTitle: '终局',
    description: '关键结局与高价值生还路线。',
    anchor: 'top',
    x: '39%',
    y: '0%',
  },
  {
    id: 'conflict',
    title: '对抗成就',
    shortTitle: '对抗',
    description: '来自校园冲突、公共空间与即时风险的记录。',
    anchor: 'top-right',
    x: '72%',
    y: '8%',
  },
  {
    id: 'archive',
    title: '档案成就',
    shortTitle: '档案',
    description: '收集更多结局与完整档案进度。',
    anchor: 'right',
    x: '79%',
    y: '42%',
  },
  {
    id: 'loop',
    title: '回环成就',
    shortTitle: '回环',
    description: '重启、回流与命运反复带来的隐藏标记。',
    anchor: 'bottom-right',
    x: '68%',
    y: '74%',
  },
  {
    id: 'exploration',
    title: '探索成就',
    shortTitle: '探索',
    description: '走到更多场景，打开更多叙事支线。',
    anchor: 'bottom-left',
    x: '8%',
    y: '66%',
  },
];

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: 'first-scene',
    title: '初入迷局',
    description: '访问任意一个场景页。',
    category: 'exploration',
    grade: 'bing',
    points: 20,
    reward: '获得一枚初探徽记',
    check: (state) => state.visitedScenes.length >= 1,
    progress: (state) => ({
      current: Math.min(state.visitedScenes.length, 1),
      total: 1,
    }),
  },
  {
    id: 'campus-wanderer',
    title: '校园漫游',
    description: '访问至少 5 个不同场景。',
    category: 'exploration',
    grade: 'yi',
    points: 50,
    reward: '解锁探索流光边框',
    check: (state) => state.visitedScenes.length >= 5,
    progress: (state) => ({
      current: Math.min(state.visitedScenes.length, 5),
      total: 5,
    }),
  },
  {
    id: 'map-complete',
    title: '足迹遍历',
    description: '访问全部场景页。',
    category: 'exploration',
    grade: 'jia',
    points: 100,
    reward: '获得全图探索称号',
    check: (state) => state.visitedScenes.length >= allSceneCount,
    progress: (state) => ({
      current: state.visitedScenes.length,
      total: allSceneCount,
    }),
  },
  {
    id: 'first-ending',
    title: '命运旁观者',
    description: '触发任意一个结局。',
    category: 'archive',
    grade: 'bing',
    points: 20,
    reward: '达成第一次结局播报',
    check: (state) => state.visitedEndings.length >= 1,
    progress: (state) => ({
      current: Math.min(state.visitedEndings.length, 1),
      total: 1,
    }),
  },
  {
    id: 'ending-collector',
    title: '档案采集者',
    description: '解锁至少 6 个不同结局。',
    category: 'archive',
    grade: 'yi',
    points: 50,
    reward: '获得档案馆金边卡框',
    check: (state) => state.visitedEndings.length >= 6,
    progress: (state) => ({
      current: Math.min(state.visitedEndings.length, 6),
      total: 6,
    }),
  },
  {
    id: 'full-archive',
    title: '满档终章',
    description: '收集全部结局。',
    category: 'archive',
    grade: 'jia',
    points: 100,
    reward: '解锁最高档案勋章',
    check: (state) => state.visitedEndings.length >= allEndingCount,
    progress: (state) => ({
      current: state.visitedEndings.length,
      total: allEndingCount,
    }),
  },
  {
    id: 'pressure-front',
    title: '正面对抗',
    description: '触发“欲加之罪”“无妄之灾”“高人一等”三个对抗类结局。',
    category: 'conflict',
    grade: 'yi',
    points: 50,
    reward: '获得对抗烈纹特效',
    check: (state) =>
      countMatches(state.visitedEndings, [
        'endingbornguilt',
        'endingunexpecteddisaster',
        'endinghigherrace',
      ]) >= 3,
    progress: (state) => ({
      current: countMatches(state.visitedEndings, [
        'endingbornguilt',
        'endingunexpecteddisaster',
        'endinghigherrace',
      ]),
      total: 3,
    }),
  },
  {
    id: 'family-fallout',
    title: '关系余震',
    description: '触发“同道中人”“难得糊涂”“鸡犬不留”三个家庭关系类结局。',
    category: 'relationship',
    grade: 'yi',
    points: 50,
    reward: '获得关系支线铭牌',
    check: (state) =>
      countMatches(state.visitedEndings, [
        'endingcheatingwife',
        'endinggreenabove',
        'endingextermination',
      ]) >= 3,
    progress: (state) => ({
      current: countMatches(state.visitedEndings, [
        'endingcheatingwife',
        'endinggreenabove',
        'endingextermination',
      ]),
      total: 3,
    }),
  },
  {
    id: 'parking-loop',
    title: '命运回环',
    description: '两次抵达停车位场景。',
    category: 'loop',
    grade: 'bing',
    points: 20,
    reward: '获得回环碎光动画',
    check: (state) => (state.routeCounts.sceneparking ?? 0) >= 2,
    progress: (state) => ({
      current: Math.min(state.routeCounts.sceneparking ?? 0, 2),
      total: 2,
    }),
  },
  {
    id: 'survival-instinct',
    title: '局中求生',
    description: '触发“逃出升天”“血光之灾”“未来可期”三条高风险路线。',
    category: 'destiny',
    grade: 'jia',
    points: 100,
    reward: '获得凤羽腾光特效',
    check: (state) =>
      countMatches(state.visitedEndings, [
        'endingawayout',
        'endingbloodbath',
        'endingfutureawaits',
      ]) >= 3,
    progress: (state) => ({
      current: countMatches(state.visitedEndings, [
        'endingawayout',
        'endingbloodbath',
        'endingfutureawaits',
      ]),
      total: 3,
    }),
  },
  {
    id: 'future-awaits',
    title: '柳暗花明',
    description: '达成“未来可期”终局。',
    category: 'destiny',
    grade: 'jia',
    points: 100,
    reward: '获得金色通关章纹',
    check: (state) => state.visitedEndings.includes('endingfutureawaits'),
    progress: (state) => ({
      current: state.visitedEndings.includes('endingfutureawaits') ? 1 : 0,
      total: 1,
    }),
  },
  {
    id: 'debug-preview',
    title: '调试勋章',
    description:
      '通过调试按钮手动触发一次成就达成，用于预览解锁动画与面板效果。',
    category: 'loop',
    grade: 'bing',
    points: 20,
    reward: '仅用于本地调试预览',
    check: (state) => (state.routeCounts.__debug__ ?? 0) >= 1,
    progress: (state) => ({
      current: Math.min(state.routeCounts.__debug__ ?? 0, 1),
      total: 1,
    }),
  },
];

export const gradeMeta: Record<
  AchievementGrade,
  { label: string; className: string }
> = {
  jia: { label: '甲', className: 'achievement-grade-jia' },
  yi: { label: '乙', className: 'achievement-grade-yi' },
  bing: { label: '丙', className: 'achievement-grade-bing' },
};

export function createEmptyAchievementProgress(): AchievementProgressState {
  return {
    visitedScenes: [],
    visitedEndings: [],
    routeCounts: {},
  };
}

export function recordRouteVisit(
  state: AchievementProgressState,
  pathname: string
) {
  if (pathname === '/') {
    return state;
  }

  if (pathname.startsWith('/scenes/')) {
    const sceneId = pathname.replace('/scenes/', '');

    return {
      visitedScenes: state.visitedScenes.includes(sceneId)
        ? state.visitedScenes
        : [...state.visitedScenes, sceneId],
      visitedEndings: state.visitedEndings,
      routeCounts: {
        ...state.routeCounts,
        [sceneId]: (state.routeCounts[sceneId] ?? 0) + 1,
      },
    };
  }

  if (pathname.startsWith('/endings/')) {
    const endingId = pathname.replace('/endings/', '');

    return {
      visitedScenes: state.visitedScenes,
      visitedEndings: state.visitedEndings.includes(endingId)
        ? state.visitedEndings
        : [...state.visitedEndings, endingId],
      routeCounts: {
        ...state.routeCounts,
        [endingId]: (state.routeCounts[endingId] ?? 0) + 1,
      },
    };
  }

  return state;
}

export function evaluateAchievements(state: AchievementProgressState) {
  const unlocked = achievementDefinitions.filter((definition) =>
    definition.check(state)
  );
  const unlockedIds = unlocked.map((item) => item.id);
  const totalPoints = unlocked.reduce((sum, item) => sum + item.points, 0);

  const categories = achievementCategories.map((category) => {
    const items = achievementDefinitions.filter(
      (item) => item.category === category.id
    );
    const unlockedCount = items.filter((item) =>
      unlockedIds.includes(item.id)
    ).length;

    return {
      ...category,
      total: items.length,
      unlocked: unlockedCount,
      completion:
        items.length === 0
          ? 0
          : Math.round((unlockedCount / items.length) * 100),
    };
  });

  return {
    unlocked,
    unlockedIds,
    totalPoints,
    categories,
  };
}
