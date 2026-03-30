'use client';

import { ArrowRightOutlined, DesktopOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Divider,
  Modal,
  Progress,
  Radio,
  Segmented,
  Select,
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
} from '@/lib/player-profile';
import type { HomeStory } from '@/lib/story';

const { Paragraph, Text, Title } = Typography;

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
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const canSubmitQuiz = useMemo(
    () => MBTI_QUIZ_QUESTIONS.every((question) => !!quizAnswers[question.id]),
    [quizAnswers]
  );

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

              <Card className='rounded-[24px] border-0 bg-[#fff7ec]'>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <Text className='text-sm uppercase tracking-[0.32em] text-[#8a5a45]'>
                      人格与初始属性
                    </Text>
                    {profile ? (
                      <Tag color='success'>已设定 {profile.mbti}</Tag>
                    ) : (
                      <Tag color='warning'>未设定</Tag>
                    )}
                  </div>

                  <Segmented
                    block
                    value={entryMode}
                    options={[
                      { label: '直接选择 MBTI', value: 'manual' },
                      { label: '完成测试题', value: 'quiz' },
                    ]}
                    onChange={(value) => setEntryMode(value as 'manual' | 'quiz')}
                  />

                  {entryMode === 'manual' ? (
                    <div className='flex flex-col gap-3'>
                      <Select
                        value={manualMbti}
                        onChange={(value) => setManualMbti(value as MbtiCode)}
                        options={MBTI_TYPES.map((type) => ({
                          value: type,
                          label: type,
                        }))}
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
                  ) : (
                    <div className='flex flex-col gap-4'>
                      <Alert
                        type='info'
                        showIcon
                        message='测试题采用弹窗答题，避免首页被挤压。'
                        description={`当前进度：${Object.keys(quizAnswers).length} / ${MBTI_QUIZ_QUESTIONS.length}`}
                      />
                      <Button onClick={() => setQuizModalOpen(true)}>
                        打开测试题
                      </Button>
                      <Button
                        type='primary'
                        disabled={!canSubmitQuiz}
                        onClick={() => {
                          const mbti = setProfileByQuizAnswers(quizAnswers);
                          setQuizResult(mbti);
                        }}
                      >
                        提交测试并生成属性
                      </Button>
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
                    <div className='grid gap-2 sm:grid-cols-2'>
                      {[
                        { key: 'force', label: '武力' },
                        { key: 'intelligence', label: '智力' },
                        { key: 'tenacity', label: '坚韧' },
                        { key: 'compassion', label: '怜悯' },
                        { key: 'apathy', label: '冷漠' },
                      ].map((item) => {
                        const value = profile.attributes[item.key as keyof typeof profile.attributes];
                        return (
                          <div key={item.key}>
                            <div className='mb-1 flex items-center justify-between text-xs text-[#7a4d3b]'>
                              <span>{item.label}</span>
                              <span>{value}</span>
                            </div>
                            <Progress
                              percent={value}
                              showInfo={false}
                              strokeColor='#c66d42'
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  <div className='flex flex-wrap gap-3'>
                    <Button onClick={clearProfile}>清空设定</Button>
                  </div>

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
              </Card>

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
                  <Text className='text-xs text-[#9f2d20]'>
                    请先完成人格设定，才可进入剧情分支。
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
          title='MBTI 测试题'
          open={quizModalOpen}
          onCancel={() => setQuizModalOpen(false)}
          footer={
            <div className='flex justify-end gap-2'>
              <Button onClick={() => setQuizModalOpen(false)}>关闭</Button>
              <Button
                type='primary'
                disabled={!canSubmitQuiz}
                onClick={() => {
                  const mbti = setProfileByQuizAnswers(quizAnswers);
                  setQuizResult(mbti);
                  setQuizModalOpen(false);
                }}
              >
                提交并应用属性
              </Button>
            </div>
          }
          width={760}
          styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
        >
          <div className='flex flex-col gap-4'>
            {MBTI_QUIZ_QUESTIONS.map((question) => (
              <Card
                key={question.id}
                className='rounded-[16px] border-0 bg-[#fffaf2]'
                styles={{ body: { padding: 14 } }}
              >
                <div className='flex flex-col gap-2'>
                  <Text strong>{question.prompt}</Text>
                  <Radio.Group
                    value={quizAnswers[question.id]}
                    onChange={(event) => {
                      setQuizAnswers((previous) => ({
                        ...previous,
                        [question.id]: event.target.value,
                      }));
                    }}
                  >
                    <div className='flex flex-col gap-2'>
                      <Radio value='A'>{question.optionA.label}</Radio>
                      <Radio value='B'>{question.optionB.label}</Radio>
                    </div>
                  </Radio.Group>
                </div>
              </Card>
            ))}
          </div>
        </Modal>
      </div>
    </main>
  );
}
