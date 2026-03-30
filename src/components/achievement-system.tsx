'use client';

import {
  CompassOutlined,
  FireOutlined,
  HomeOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
import {
  Badge,
  Button,
  Card,
  Drawer,
  Progress,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';

import {
  achievementCategories,
  achievementDefinitions,
  createEmptyAchievementProgress,
  evaluateAchievements,
  gradeMeta,
  recordRouteVisit,
  type AchievementCategoryId,
  type AchievementDefinition,
  type AchievementGrade,
  type AchievementProgressState,
} from '@/lib/achievements';

const { Paragraph, Text, Title } = Typography;

const STORAGE_KEY = 'guonan-achievement-progress-v1';

type AchievementContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
  progress: AchievementProgressState;
  resetProgress: () => void;
  debugUnlockAchievement: () => void;
};

const AchievementContext = createContext<AchievementContextValue | null>(null);

function useAchievementContext() {
  const context = useContext(AchievementContext);

  if (!context) {
    throw new Error('Achievement context is unavailable');
  }

  return context;
}

function categoryIcon(categoryId: AchievementCategoryId) {
  switch (categoryId) {
    case 'exploration':
      return <CompassOutlined />;
    case 'conflict':
      return <FireOutlined />;
    case 'relationship':
      return <TeamOutlined />;
    case 'destiny':
      return <SafetyCertificateOutlined />;
    case 'loop':
      return <ReloadOutlined />;
    case 'archive':
      return <TrophyOutlined />;
    default:
      return <TrophyOutlined />;
  }
}

function ToastStack({
  items,
  onDone,
}: {
  items: AchievementDefinition[];
  onDone: (id: string) => void;
}) {
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const timers = items.map((item) =>
      window.setTimeout(() => {
        onDone(item.id);
      }, 4200)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [items, onDone]);

  return (
    <div className='pointer-events-none fixed right-4 top-4 z-70 flex w-[min(92vw,360px)] flex-col gap-3'>
      <AnimatePresence>
        {items.map((item) => {
          const meta = gradeMeta[item.grade];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.96 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <Card
                className='achievement-toast rounded-[24px] border-0 shadow-[0_20px_50px_rgba(49,27,19,0.3)]'
                style={{ background: '#332018', color: '#fff6ed' }}
                styles={{ body: { padding: 22 } }}
              >
                <div className='flex items-start gap-3'>
                  <span className={`achievement-grade-badge ${meta.className}`}>
                    {meta.label}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <Text className='!text-xs !tracking-[0.38em] !text-[#f0c899]'>
                      成就达成
                    </Text>
                    <Title
                      level={4}
                      className='story-title !mb-1 !mt-1 !text-[#fff8ef]'
                    >
                      {item.title}
                    </Title>
                    <Paragraph className='!mb-1 !text-sm !leading-7 !text-[#f2dfd0]'>
                      {item.description}
                    </Paragraph>
                    <Text className='!text-xs !text-[#f5bd6f]'>
                      奖励：{item.reward}
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

type UnlockEffectItem = {
  id: string;
  title: string;
  grade: AchievementGrade;
};

function UnlockEffectLayer({
  items,
  onDone,
}: {
  items: UnlockEffectItem[];
  onDone: (id: string) => void;
}) {
  useEffect(() => {
    if (items.length === 0) return;

    const timers = items.map((item) =>
      window.setTimeout(() => {
        onDone(item.id);
      }, 1300)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [items, onDone]);

  const gradeColorMap: Record<
    AchievementGrade,
    { glow: string; particle: string; ring: string }
  > = {
    jia: {
      glow: 'rgba(255, 209, 102, 0.36)',
      particle: '#ffd166',
      ring: '#ffecbf',
    },
    yi: {
      glow: 'rgba(255, 145, 102, 0.34)',
      particle: '#ff9166',
      ring: '#ffd5c2',
    },
    bing: {
      glow: 'rgba(173, 189, 223, 0.32)',
      particle: '#c9d5f2',
      ring: '#edf2ff',
    },
  };

  return (
    <div className='pointer-events-none fixed inset-0 z-68'>
      <AnimatePresence>
        {items.map((item) => {
          const color = gradeColorMap[item.grade];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0'
            >
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.05, ease: 'easeOut' }}
                className='absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full'
                style={{
                  background: color.glow,
                  boxShadow: `0 0 90px ${color.glow}`,
                }}
              />

              <motion.div
                initial={{ scale: 0.2, opacity: 0.95 }}
                animate={{ scale: 2.3, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border'
                style={{ borderColor: color.ring }}
              />

              {Array.from({ length: 14 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 14;
                const radius = 80 + (index % 3) * 36;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.span
                    key={`${item.id}-${index}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.9 }}
                    animate={{ x, y, opacity: 0, scale: 0.2 }}
                    transition={{ duration: 1.05, ease: 'easeOut' }}
                    className='absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full'
                    style={{
                      background: color.particle,
                      boxShadow: `0 0 14px ${color.particle}`,
                    }}
                  />
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -6 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-7 rounded-full px-4 py-1.5 text-xs tracking-[0.2em] text-[#fff7ef]'
                style={{ background: 'rgba(32, 18, 12, 0.72)' }}
              >
                {item.title}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function AchievementPanel() {
  const { open, setOpen, progress, resetProgress, debugUnlockAchievement } =
    useAchievementContext();
  const [activeCategory, setActiveCategory] = useState<
    AchievementCategoryId | 'all'
  >('all');
  const [lensMotionKey, setLensMotionKey] = useState(0);
  const [isOrbitOpen, setIsOrbitOpen] = useState(false);
  const orbitRootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hubLineRefs = useRef<(SVGLineElement | null)[]>([]);
  const ringLineRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const bladeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animData = useRef(
    [0, 1, 2, 3, 4, 5].map(() => ({ x: 0, y: 0, alpha: 0 }))
  );

  useEffect(() => {
    if (open) {
      setLensMotionKey((current) => current + 1);
      setIsOrbitOpen(false);
    }
  }, [open]);

  const evaluation = useMemo(() => evaluateAchievements(progress), [progress]);
  const filteredAchievements = useMemo(() => {
    if (activeCategory === 'all') {
      return achievementDefinitions;
    }

    return achievementDefinitions.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);
  const unlockedSet = useMemo(
    () => new Set(evaluation.unlockedIds),
    [evaluation.unlockedIds]
  );
  const orbitGroups = useMemo(() => {
    const categoryLookup = new Map(
      evaluation.categories.map((category) => [category.id, category])
    );
    const summarize = (categoryId: AchievementCategoryId) => {
      const category = categoryLookup.get(categoryId);

      return {
        unlocked: category?.unlocked ?? 0,
        total: category?.total ?? 0,
        completion: category?.completion ?? 0,
      };
    };

    const relationship = summarize('relationship');
    const destiny = summarize('destiny');
    const conflict = summarize('conflict');
    const archive = summarize('archive');
    const loop = summarize('loop');
    const exploration = summarize('exploration');

    return [
      {
        id: 'orbit-relationship',
        title: '关系成就',
        description: '围绕婚恋、家庭与牵连后果的分支勋章。',
        icon: categoryIcon('relationship'),
        orbitX: -255,
        orbitY: -120,
        ...relationship,
      },
      {
        id: 'orbit-destiny',
        title: '终局成就',
        description: '关键结局与高价值生还路线。',
        icon: categoryIcon('destiny'),
        orbitX: 0,
        orbitY: -250,
        ...destiny,
      },
      {
        id: 'orbit-conflict',
        title: '对抗成就',
        description: '来自校园冲突、公共空间与即时风险的记录。',
        icon: categoryIcon('conflict'),
        orbitX: 255,
        orbitY: -120,
        ...conflict,
      },
      {
        id: 'orbit-archive',
        title: '档案成就',
        description: '收集更多结局与完整档案进度。',
        icon: categoryIcon('archive'),
        orbitX: 255,
        orbitY: 165,
        ...archive,
      },
      {
        id: 'orbit-loop',
        title: '回环成就',
        description: '重启、回流与命运反复带来的隐藏标记。',
        icon: categoryIcon('loop'),
        orbitX: 0,
        orbitY: 240,
        ...loop,
      },
      {
        id: 'orbit-exploration',
        title: '探索成就',
        description: '走到更多场景，打开更多叙事支线。',
        icon: categoryIcon('exploration'),
        orbitX: -255,
        orbitY: 165,
        ...exploration,
      },
    ];
  }, [evaluation.categories]);

  // 相机光圈关闭动画
  useGSAP(
    () => {
      if (lensMotionKey === 0) return;
      const blades = bladeRefs.current;
      if (!blades || blades.length === 0) return;
      blades.forEach((b, i) => {
        if (!b) return;
        gsap.killTweensOf(b);
        // 重置到「开」的位置
        gsap.set(b, { rotate: i * 60, opacity: 0.95, scale: 1.05, x: 0 });
        // 动画到「关」的位置，模拟光圈叶片收拢
        gsap.to(b, {
          rotate: i * 60 + 72,
          opacity: 0,
          scale: 0.9,
          x: -8,
          duration: 0.9,
          delay: i * 0.03,
          ease: 'power2.inOut',
        });
      });
    },
    { dependencies: [lensMotionKey], scope: orbitRootRef }
  );

  function renderLines() {
    const svg = svgRef.current;
    if (!svg) return;
    const { width, height } = svg.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;
    const data = animData.current;
    data.forEach((d, i) => {
      const hub = hubLineRefs.current[i];
      if (hub) {
        hub.setAttribute('x1', String(cx));
        hub.setAttribute('y1', String(cy));
        hub.setAttribute('x2', String(cx + d.x));
        hub.setAttribute('y2', String(cy + d.y));
        hub.setAttribute('stroke-opacity', String(0.38 * d.alpha));
      }
    });
  }

  useGSAP(
    () => {
      const data = animData.current;
      if (!data || data.length === 0) return;
      data.forEach((d, i) => {
        gsap.killTweensOf(d);
        const el = nodeRefs.current[i];
        if (el) gsap.killTweensOf(el);
      });
      if (isOrbitOpen) {
        data.forEach((d, i) => {
          gsap.to(d, {
            x: orbitGroups[i].orbitX,
            y: orbitGroups[i].orbitY,
            alpha: 1,
            duration: 0.55,
            delay: i * 0.05,
            ease: 'back.out(1.7)',
            onUpdate: renderLines,
          });
          const el = nodeRefs.current[i];
          if (el) {
            gsap.fromTo(
              el,
              { x: 0, y: 0, opacity: 0, scale: 0.82 },
              {
                x: orbitGroups[i].orbitX,
                y: orbitGroups[i].orbitY,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                delay: i * 0.05,
                ease: 'back.out(1.7)',
              }
            );
          }
        });
      } else {
        data.forEach((d, i) => {
          gsap.to(d, {
            x: 0,
            y: 0,
            alpha: 0,
            duration: 0.28,
            ease: 'power2.in',
            onUpdate: renderLines,
          });
          const el = nodeRefs.current[i];
          if (el) {
            gsap.to(el, {
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.82,
              duration: 0.28,
              ease: 'power2.in',
            });
          }
        });
      }
    },
    { dependencies: [isOrbitOpen], scope: orbitRootRef }
  );

  return (
    <>
      <div className='achievement-fab'>
        <Badge
          count={evaluation.unlocked.length}
          color='#d26b4f'
        >
          <Button
            type='primary'
            size='large'
            shape='round'
            icon={<TrophyOutlined />}
            className='relative !h-12 !rounded-full !px-5'
            onClick={() => setOpen(true)}
          >
            成就图谱
          </Button>
        </Badge>
      </div>

      <Drawer
        title={null}
        open={open}
        onClose={() => setOpen(false)}
        size={860}
        styles={{ body: { padding: 22, background: '#efdfc8' } }}
      >
        <div className='flex flex-col gap-6'>
          <Card
            className='rounded-[28px] border-0 text-[#fff7ef]'
            style={{
              background: 'linear-gradient(135deg, #41261d 0%, #704130 100%)',
            }}
            styles={{ body: { padding: 30 } }}
          >
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div>
                <Text className='!text-xs !tracking-[0.38em] !text-[#f1cb96]'>
                  ACHIEVEMENT PATH
                </Text>
                <Title
                  level={2}
                  className='story-title !mb-1 !mt-2 !text-[#fff7ef]'
                >
                  成就达成之路径
                </Title>
                <Paragraph className='!mb-0 !text-base !leading-8 !text-[#f2dfcf]'>
                  参考经典网游成就面板结构，将本作分成探索、关系、对抗、终局、回环与档案六个方向，自动记录你的每一次分支推进。
                </Paragraph>
              </div>
              <Tag
                color='gold'
                className='!rounded-full !px-4 !py-1.5'
              >
                {evaluation.totalPoints} 成就点
              </Tag>
            </div>
          </Card>

          <div className='grid grid-cols-2 gap-3'>
            <Card
              className='rounded-[22px] border-0 bg-white/90'
              styles={{ body: { padding: 24 } }}
            >
              <Statistic
                title='已解锁'
                value={evaluation.unlocked.length}
                suffix={`/ ${achievementDefinitions.length}`}
              />
            </Card>
            <Card
              className='rounded-[22px] border-0 bg-white/90'
              styles={{ body: { padding: 24 } }}
            >
              <Statistic
                title='总点数'
                value={evaluation.totalPoints}
                suffix='pts'
              />
            </Card>
          </div>

          <Card
            className='rounded-[28px] border-0 bg-[rgba(255,250,244,0.94)]'
            styles={{ body: { padding: 24 } }}
          >
            <div className='achievement-constellation'>
              <div
                id='achievement-orbit-root'
                ref={orbitRootRef}
                className='achievement-orbit-root'
              >
                <button
                  type='button'
                  className='achievement-center relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-5 text-center'
                  onClick={() => {
                    setLensMotionKey((current) => current + 1);
                    if (!isOrbitOpen) {
                      setIsOrbitOpen(true);
                    }
                  }}
                >
                  <div className='relative z-10 flex flex-col items-center justify-center gap-2'>
                    <TrophyOutlined className='text-2xl text-[#fff2d3]' />
                    <Text className='!text-xs !tracking-[0.34em] !text-[#ffe3b3]'>
                      成就总览
                    </Text>
                    <Title
                      level={2}
                      className='story-title !mb-0 !mt-0 !text-[#fff8ef]'
                    >
                      {evaluation.totalPoints}
                    </Title>
                    <Text className='!text-xs !text-[#ffead0]'>
                      {evaluation.unlocked.length} 项已达成
                    </Text>
                    <Text className='!text-[11px] !tracking-[0.24em] !text-[#ffe1b6]'>
                      点击展开图谱
                    </Text>
                  </div>

                  <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-full'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <span
                        key={index}
                        ref={(el) => { bladeRefs.current[index] = el; }}
                        className='absolute left-1/2 top-1/2 h-[160%] w-[58%] -translate-y-1/2 rounded-l-full bg-[linear-gradient(180deg,#a86d42,#6a412d)] shadow-[0_0_20px_rgba(77,45,31,0.2)]'
                        style={{ transformOrigin: '0% 50%', opacity: 0 }}
                      />
                    ))}
                  </div>
                </button>

                <div className='achievement-orbit-branches'>
                  {orbitGroups.map((group, index) => (
                    <div
                      key={group.id}
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      className='achievement-node p-5'
                      data-complete={group.unlocked === group.total}
                      style={{ left: '50%', top: '50%', marginLeft: '-5.5rem', marginTop: '-4rem', width: '11rem', opacity: 0, zIndex: 1 }}
                    >
                      <div className='flex items-start gap-3'>
                        <span className='mt-1 text-lg text-[#9f2d20]'>
                          {group.icon}
                        </span>
                        <div className='min-w-0 flex-1'>
                          <Text className='!text-sm !font-semibold !text-[#8a4d34]'>
                            {group.title}
                          </Text>
                          <Paragraph className='!mb-2 !mt-1 !text-xs !leading-6 !text-[#775446]'>
                            {group.description}
                          </Paragraph>
                          <Text className='!text-xs !text-[#8f614f]'>
                            {group.unlocked} / {group.total}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card
            className='rounded-[28px] border-0 bg-white/88'
            styles={{ body: { padding: 24 } }}
          >
            <div className='mb-5 flex flex-wrap gap-2.5'>
              <Button
                type={activeCategory === 'all' ? 'primary' : 'default'}
                className='!rounded-full'
                onClick={() => setActiveCategory('all')}
              >
                全部
              </Button>
              {achievementCategories.map((category) => (
                <Button
                  key={category.id}
                  type={activeCategory === category.id ? 'primary' : 'default'}
                  className='!rounded-full'
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.shortTitle}
                </Button>
              ))}
            </div>

            <div className='flex flex-col gap-5'>
              {filteredAchievements.map((achievement) => {
                const unlocked = unlockedSet.has(achievement.id);
                const meta = gradeMeta[achievement.grade];
                const achievementProgress = achievement.progress(progress);
                const percent = Math.min(
                  100,
                  Math.round(
                    (achievementProgress.current / achievementProgress.total) *
                      100
                  )
                );

                return (
                  <Card
                    key={achievement.id}
                    className={`rounded-[22px] border-0 ${
                      unlocked ? 'bg-[#fff8ee]' : 'bg-[#f6eadc]'
                    }`}
                    styles={{ body: { padding: 26 } }}
                  >
                    <div className='flex items-start gap-4'>
                      <span
                        className={`achievement-grade-badge ${meta.className}`}
                      >
                        {meta.label}
                      </span>
                      <div className='min-w-0 flex-1'>
                        <div className='flex flex-wrap items-center justify-between gap-3'>
                          <div>
                            <Title
                              level={5}
                              className='story-title !mb-1 !text-[#2b1d16]'
                            >
                              {achievement.title}
                            </Title>
                            <Text className='!text-sm !leading-7 !text-[#6a4738]'>
                              {achievement.description}
                            </Text>
                          </div>
                          <Tag
                            color={unlocked ? 'success' : 'default'}
                            className='!rounded-full !px-3 !py-1'
                          >
                            {unlocked ? '已达成' : `${achievement.points} 点`}
                          </Tag>
                        </div>
                        <div className='mt-4 flex flex-col gap-2.5'>
                          <Progress
                            percent={percent}
                            strokeColor={unlocked ? '#52c41a' : '#c47a42'}
                            showInfo={false}
                          />
                          <div className='flex flex-wrap items-center justify-between gap-2 text-xs text-[#8f614f]'>
                            <span>
                              进度 {achievementProgress.current} /{' '}
                              {achievementProgress.total}
                            </span>
                            <span>奖励：{achievement.reward}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>

          <div className='flex flex-wrap justify-end gap-3'>
            <Button
              onClick={debugUnlockAchievement}
              icon={<TrophyOutlined />}
              className='!rounded-full'
            >
              调试：触发成就
            </Button>
            <Button
              onClick={resetProgress}
              icon={<HomeOutlined />}
              className='!rounded-full'
            >
              重置成就记录
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export function AchievementSystemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState<AchievementProgressState>(
    createEmptyAchievementProgress()
  );
  const [hydrated, setHydrated] = useState(false);
  const [toastIds, setToastIds] = useState<string[]>([]);
  const [effectItems, setEffectItems] = useState<UnlockEffectItem[]>([]);
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AchievementProgressState;
        setProgress(parsed);
      } catch {
        setProgress(createEmptyAchievementProgress());
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [hydrated, progress]);

  useEffect(() => {
    if (!hydrated || !pathname || lastTrackedPathRef.current === pathname) {
      return;
    }

    lastTrackedPathRef.current = pathname;

    setProgress((previous) => {
      const next = recordRouteVisit(previous, pathname);
      const previousUnlocked = new Set(
        evaluateAchievements(previous).unlockedIds
      );
      const nextUnlocked = evaluateAchievements(next).unlocked.filter(
        (item) => !previousUnlocked.has(item.id)
      );

      if (nextUnlocked.length > 0) {
        setToastIds((current) => {
          const currentSet = new Set(current);
          const newIds = nextUnlocked
            .map((item) => item.id)
            .filter((id) => !currentSet.has(id));
          return [...current, ...newIds];
        });
        setEffectItems((current) => [
          ...current,
          ...nextUnlocked.map((item) => ({
            id: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: item.title,
            grade: item.grade,
          })),
        ]);
      }

      return next;
    });
  }, [hydrated, pathname]);

  const toastItems = useMemo(() => {
    const lookup = new Map(
      achievementDefinitions.map((item) => [item.id, item])
    );
    return toastIds
      .map((id) => lookup.get(id))
      .filter(Boolean) as AchievementDefinition[];
  }, [toastIds]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      progress,
      resetProgress: () => {
        const fresh = recordRouteVisit(
          createEmptyAchievementProgress(),
          pathname ?? '/'
        );
        setProgress(fresh);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        setToastIds([]);
        setEffectItems([]);
        lastTrackedPathRef.current = pathname ?? null;
      },
      debugUnlockAchievement: () => {
        setProgress((previous) => {
          const next = {
            ...previous,
            routeCounts: {
              ...previous.routeCounts,
              __debug__: (previous.routeCounts.__debug__ ?? 0) + 1,
            },
          };
          const previousUnlocked = new Set(
            evaluateAchievements(previous).unlockedIds
          );
          const nextUnlocked = evaluateAchievements(next).unlocked.filter(
            (item) => !previousUnlocked.has(item.id)
          );

          if (nextUnlocked.length > 0) {
            setToastIds((current) => {
              const currentSet = new Set(current);
              const newIds = nextUnlocked
                .map((item) => item.id)
                .filter((id) => !currentSet.has(id));
              return [...current, ...newIds];
            });
            setEffectItems((current) => [
              ...current,
              ...nextUnlocked.map((item) => ({
                id: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                title: item.title,
                grade: item.grade,
              })),
            ]);
          }

          return next;
        });
      },
    }),
    [open, pathname, progress]
  );

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AchievementPanel />
      <ToastStack
        items={toastItems}
        onDone={(id) =>
          setToastIds((current) => current.filter((item) => item !== id))
        }
      />
      <UnlockEffectLayer
        items={effectItems}
        onDone={(id) =>
          setEffectItems((current) => current.filter((item) => item.id !== id))
        }
      />
    </AchievementContext.Provider>
  );
}
