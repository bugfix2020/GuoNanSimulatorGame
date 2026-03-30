'use client';

import { ArrowRightOutlined, DesktopOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Divider,
  Modal,
  Radio,
  Segmented,
  Select,
  Steps,
  Tag,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { usePlayerProfile } from '@/components/player-profile-provider';
import {
  MBTI_QUIZ_QUESTIONS,
  MBTI_REFERENCE_NOTES,
  MBTI_TYPES,
  type MbtiCode,
  type PlayerAttributeId,
} from '@/lib/player-profile';
import type { HomeStory } from '@/lib/story';

const { Paragraph, Text, Title } = Typography;

const PROFILE_RADAR_AXES: Array<{ key: PlayerAttributeId; label: string }> = [
  { key: 'force', label: '武力' },
  { key: 'intelligence', label: '智力' },
  { key: 'tenacity', label: '坚韧' },
  { key: 'compassion', label: '怜悯' },
  { key: 'apathy', label: '冷漠' },
];

function getRadarPoint(
  axisIndex: number,
  ratio: number,
  radius: number,
  center: number,
  axisTotal: number
) {
  const angle = ((-90 + (360 / axisTotal) * axisIndex) * Math.PI) / 180;

  return {
    x: center + Math.cos(angle) * radius * ratio,
    y: center + Math.sin(angle) * radius * ratio,
  };
}

function buildRadarPolygonPoints(
  ratio: number,
  radius: number,
  center: number,
  axisTotal: number
) {
  return PROFILE_RADAR_AXES.map((_, axisIndex) => {
    const point = getRadarPoint(axisIndex, ratio, radius, center, axisTotal);
    return `${point.x},${point.y}`;
  }).join(' ');
}

type HomeViewProps = {
  story: HomeStory;
};

export function HomeView({ story }: HomeViewProps) {
  const {
    profile,
    ready,
    setProfileByMbti,
    setProfileByQuizAnswers,
    clearProfile,
  } = usePlayerProfile();
  const [entryMode, setEntryMode] = useState<'manual' | 'quiz'>('manual');
  const [manualMbti, setManualMbti] = useState<MbtiCode>('INTJ');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, 'A' | 'B'>>({});
  const [quizResult, setQuizResult] = useState<MbtiCode | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);

  const canSubmitQuiz = useMemo(
    () => MBTI_QUIZ_QUESTIONS.every((question) => !!quizAnswers[question.id]),
    [quizAnswers]
  );
  const totalQuizSteps = MBTI_QUIZ_QUESTIONS.length;
  const activeQuestion = MBTI_QUIZ_QUESTIONS[currentQuizStep];
  const activeQuestionAnswer = activeQuestion
    ? quizAnswers[activeQuestion.id]
    : undefined;

  const startLocked = !profile;

  return (
    <main className='game-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <Card className='paper-panel overflow-hidden rounded-[32px] border-0'>
          <div className='grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10'>
            <section className='flex flex-col gap-6 p-2 sm:p-4'>
              <div className='flex flex-wrap items-center gap-3'>
                <Tag
                  variant='filled'
                  color='error'
                  className='rounded-full px-4 py-1 text-sm tracking-[0.2em]'
                >
                  NEXT REMAKE
                </Tag>
                <Tag
                  variant='filled'
                  className='rounded-full px-4 py-1 text-sm tracking-[0.18em]'
                >
                  ELECTRON DESKTOP
                </Tag>
              </div>

              <div className='flex flex-col gap-4'>
                <Text className='text-sm uppercase tracking-[0.45em] text-[#8a5a45]'>
                  互动叙事重制版
                </Text>
                <Title
                  level={1}
                  className='story-title !mb-0 !text-5xl !leading-tight !text-[#241813] sm:!text-6xl'
                >
                  {story.title}
                </Title>
              </div>

              <div className='story-body flex flex-col gap-4 text-base text-[#3d2b24] sm:text-lg'>
                {story.intro.map((paragraph) => (
                  <Paragraph
                    key={paragraph}
                    className='!mb-0 !text-inherit'
                  >
                    {paragraph}
                  </Paragraph>
                ))}
              </div>

              <div className='sm:max-w-md'>
                <Card className='w-full rounded-[20px] border border-[#e4c9aa] bg-[#fff8ee]'>
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div className='flex flex-col'>
                      <Text className='text-sm text-[#7a4b36]'>
                        {profile
                          ? `人格已设定：${profile.mbti}`
                          : '尚未设定人格，部分剧情选项会被锁定'}
                      </Text>
                      <Text className='text-xs text-[#9a6a51]'>
                        通过弹窗完成 MBTI 直选或测试题初始化。
                      </Text>
                    </div>
                    <Button
                      type={profile ? 'default' : 'primary'}
                      shape='round'
                      onClick={() => setProfileModalOpen(true)}
                    >
                      打开人格设定
                    </Button>
                  </div>
                </Card>
              </div>

              <div className='grid gap-3 sm:max-w-md'>
                {!ready ? (
                  <Button
                    size='large'
                    block
                    loading
                    className='story-choice-button !rounded-2xl !text-left'
                  >
                    读取角色设定中...
                  </Button>
                ) : null}

                {story.choices.map((choice, index) => {
                  const button = (
                    <Button
                      type={
                        index === story.choices.length - 1
                          ? 'primary'
                          : 'default'
                      }
                      size='large'
                      block
                      disabled={startLocked || !ready}
                      icon={<ArrowRightOutlined />}
                      className='story-choice-button !rounded-2xl !text-left'
                    >
                      {choice.label}
                    </Button>
                  );

                  if (startLocked || !ready) {
                    return <div key={choice.href}>{button}</div>;
                  }

                  return (
                    <Link
                      key={choice.href}
                      href={choice.href}
                      className='w-full'
                    >
                      {button}
                    </Link>
                  );
                })}

                {startLocked ? (
                  <Text className='text-xs text-[#8e5a45]'>
                    完成人格设定后即可开始剧情。
                  </Text>
                ) : null}
              </div>
            </section>

            <aside className='flex flex-col justify-between gap-6 rounded-[28px] bg-[#241813] px-6 py-7 text-[#f7ede3] sm:px-8'>
              <div className='flex flex-col gap-5'>
                <DesktopOutlined className='text-2xl text-[#f0b47a]' />
                <Title
                  level={3}
                  className='story-title !mb-0 !text-[#fff7ef]'
                >
                  桌面版迁移方向
                </Title>
                <Paragraph className='!mb-0 !text-base !leading-8 !text-[#e6d4c4]'>
                  原始仓库是 Axure 导出的静态 HTML
                  原型。当前版本将页面和跳转重构成 Next.js 配置化路由，并通过
                  Electron 提供桌面运行壳层。
                </Paragraph>
              </div>

              <div>
                <Divider className='!my-5 !border-[#5f4337]' />
                <div className='grid gap-4 text-sm text-[#e6d4c4]'>
                  <div>
                    <Text className='!text-[#f0b47a]'>技术栈</Text>
                    <Paragraph className='!mb-0 !mt-1 !text-inherit'>
                      Electron + Next.js App Router + Ant Design
                    </Paragraph>
                  </div>
                  <div>
                    <Text className='!text-[#f0b47a]'>当前实现</Text>
                    <Paragraph className='!mb-0 !mt-1 !text-inherit'>
                      首页、场景页、结局页以及全部分支跳转已经改造成可维护的
                      TypeScript 数据模型。
                    </Paragraph>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Card>

        <Modal
          title='人格与初始属性设定'
          open={profileModalOpen}
          onCancel={() => setProfileModalOpen(false)}
          footer={
            <div className='flex justify-end gap-2'>
              <Button onClick={clearProfile}>清空设定</Button>
              <Button onClick={() => setProfileModalOpen(false)}>完成</Button>
            </div>
          }
          width={760}
          styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
        >
          <div className='flex flex-col gap-4'>
            <Segmented
              block
              value={entryMode}
              options={[
                { label: '直接选择 MBTI', value: 'manual' },
                { label: '完成测试题', value: 'quiz' },
              ]}
              onChange={(value) => {
                const nextMode = value as 'manual' | 'quiz';
                setEntryMode(nextMode);

                if (nextMode === 'quiz') {
                  const firstUnansweredIndex = MBTI_QUIZ_QUESTIONS.findIndex(
                    (question) => !quizAnswers[question.id]
                  );
                  setCurrentQuizStep(
                    firstUnansweredIndex === -1
                      ? totalQuizSteps - 1
                      : firstUnansweredIndex
                  );
                }
              }}
            />

            {entryMode === 'manual' ? (
              <Card className='rounded-[16px] border-0 bg-[#fffaf2]'>
                <div className='flex flex-col gap-3'>
                  <Select
                    value={manualMbti}
                    onChange={(value) => setManualMbti(value as MbtiCode)}
                    options={MBTI_TYPES.map((type) => ({ value: type, label: type }))}
                  />
                  <Button
                    type='primary'
                    onClick={() => {
                      setProfileByMbti(manualMbti);
                      setQuizResult(manualMbti);
                    }}
                  >
                    应用 MBTI 与属性
                  </Button>
                </div>
              </Card>
            ) : (
              <div className='flex flex-col gap-4'>
                <Alert
                  type='info'
                  showIcon
                  message={`测试进度：${Object.keys(quizAnswers).length} / ${totalQuizSteps}（第 ${currentQuizStep + 1} 题）`}
                  description='题目依据为内置四维解释改写版。'
                />
                <Steps
                  size='small'
                  current={currentQuizStep}
                  items={MBTI_QUIZ_QUESTIONS.map((_, index) => ({
                    title: `题 ${index + 1}`,
                  }))}
                />

                {activeQuestion ? (
                  <Card
                    key={activeQuestion.id}
                    className='rounded-[16px] border-0 bg-[#fffaf2]'
                    styles={{ body: { padding: 14 } }}
                  >
                    <div className='flex flex-col gap-2'>
                      <Text strong>{activeQuestion.prompt}</Text>
                      <Radio.Group
                        value={activeQuestionAnswer}
                        onChange={(event) => {
                          setQuizAnswers((previous) => ({
                            ...previous,
                            [activeQuestion.id]: event.target.value,
                          }));
                        }}
                      >
                        <div className='flex flex-col gap-2'>
                          <Radio value='A'>{activeQuestion.optionA.label}</Radio>
                          <Radio value='B'>{activeQuestion.optionB.label}</Radio>
                        </div>
                      </Radio.Group>
                    </div>
                  </Card>
                ) : null}

                <div className='flex items-center justify-end gap-2'>
                  <Button
                    disabled={currentQuizStep === 0}
                    onClick={() => setCurrentQuizStep((step) => Math.max(step - 1, 0))}
                  >
                    上一步
                  </Button>
                  {currentQuizStep === totalQuizSteps - 1 ? (
                    <Button
                      type='primary'
                      disabled={!canSubmitQuiz}
                      onClick={() => {
                        const mbti = setProfileByQuizAnswers(quizAnswers);
                        setQuizResult(mbti);
                      }}
                    >
                      完成测试并应用
                    </Button>
                  ) : (
                    <Button
                      type='primary'
                      disabled={!activeQuestionAnswer}
                      onClick={() =>
                        setCurrentQuizStep((step) => Math.min(step + 1, totalQuizSteps - 1))
                      }
                    >
                      下一步
                    </Button>
                  )}
                </div>
              </div>
            )}

            {quizResult ? (
              <Alert
                type='success'
                showIcon
                message={`当前人格：${quizResult}`}
                description='属性会影响部分关键选项，属性不足时会被锁定。'
              />
            ) : null}

            {profile ? (
              <div className='rounded-[16px] border border-[#e4c9aa] bg-[#fffaf2] p-3'>
                <div className='mx-auto w-full max-w-[360px]'>
                  <svg
                    viewBox='0 0 260 260'
                    className='h-[260px] w-full'
                    role='img'
                    aria-label='人格属性雷达图'
                  >
                    {[0.25, 0.5, 0.75, 1].map((ring) => (
                      <polygon
                        key={ring}
                        points={buildRadarPolygonPoints(ring, 104, 130, PROFILE_RADAR_AXES.length)}
                        fill='none'
                        stroke='rgba(122, 75, 54, 0.35)'
                        strokeWidth='1'
                      />
                    ))}

                    {PROFILE_RADAR_AXES.map((axis, axisIndex) => {
                      const edgePoint = getRadarPoint(
                        axisIndex,
                        1,
                        104,
                        130,
                        PROFILE_RADAR_AXES.length
                      );
                      const labelPoint = getRadarPoint(
                        axisIndex,
                        1.2,
                        104,
                        130,
                        PROFILE_RADAR_AXES.length
                      );

                      return (
                        <g key={axis.key}>
                          <line
                            x1='130'
                            y1='130'
                            x2={edgePoint.x}
                            y2={edgePoint.y}
                            stroke='rgba(122, 75, 54, 0.45)'
                            strokeWidth='1'
                          />
                          <text
                            x={labelPoint.x}
                            y={labelPoint.y}
                            textAnchor='middle'
                            dominantBaseline='middle'
                            fill='#6f4a3b'
                            fontSize='12'
                          >
                            {axis.label}
                          </text>
                        </g>
                      );
                    })}

                    <polygon
                      points={buildRadarPolygonPoints(
                        1,
                        104,
                        130,
                        PROFILE_RADAR_AXES.length
                      )}
                      fill='none'
                      stroke='rgba(0, 0, 0, 0.08)'
                      strokeWidth='0.8'
                    />

                    <polygon
                      points={PROFILE_RADAR_AXES.map((axis, axisIndex) => {
                        const point = getRadarPoint(
                          axisIndex,
                          profile.attributes[axis.key] / 100,
                          104,
                          130,
                          PROFILE_RADAR_AXES.length
                        );
                        return `${point.x},${point.y}`;
                      }).join(' ')}
                      fill='rgba(46, 111, 181, 0.35)'
                      stroke='#2e6fb5'
                      strokeWidth='2'
                    />

                    {PROFILE_RADAR_AXES.map((axis, axisIndex) => {
                      const point = getRadarPoint(
                        axisIndex,
                        profile.attributes[axis.key] / 100,
                        104,
                        130,
                        PROFILE_RADAR_AXES.length
                      );

                      return (
                        <circle
                          key={`point-${axis.key}`}
                          cx={point.x}
                          cy={point.y}
                          r='3'
                          fill='#2e6fb5'
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className='mt-2 grid grid-cols-2 gap-2 text-xs text-[#6f4a3b] sm:grid-cols-5'>
                  {PROFILE_RADAR_AXES.map((axis) => (
                    <div
                      key={`meta-${axis.key}`}
                      className='rounded-md bg-[#f8eee2] px-2 py-1 text-center'
                    >
                      {axis.label} {profile.attributes[axis.key]}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <Card
              className='rounded-[16px] border-0 bg-[#f9efe0]'
              styles={{ body: { padding: 12 } }}
            >
              <div className='flex flex-col gap-1 text-xs text-[#6f4a3b]'>
                <Text strong className='!text-inherit'>
                  测试题依据（内置说明）
                </Text>
                {MBTI_REFERENCE_NOTES.map((note) => (
                  <Paragraph
                    key={note}
                    className='!mb-0 !text-inherit'
                  >
                    - {note}
                  </Paragraph>
                ))}
              </div>
            </Card>
          </div>
        </Modal>
      </div>
    </main>
  );
}
