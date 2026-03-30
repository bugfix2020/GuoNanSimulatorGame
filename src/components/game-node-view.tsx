'use client';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FlagOutlined,
  HomeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Card, Divider, Tag, Typography } from 'antd';
import Link from 'next/link';
import { useMemo } from 'react';

import { usePlayerProfile } from '@/components/player-profile-provider';
import type { StoryNode } from '@/lib/story';

const { Paragraph, Text, Title } = Typography;

type GameNodeViewProps = {
  node: StoryNode;
};

export function GameNodeView({ node }: GameNodeViewProps) {
  const isEnding = node.kind === 'ending';
  const { profile } = usePlayerProfile();

  const attributeLabels = useMemo(
    () => ({
      force: '武力',
      intelligence: '智力',
      tenacity: '坚韧',
      compassion: '怜悯',
      apathy: '冷漠',
    }),
    []
  );

  return (
    <main className='game-shell flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl'>
        <Card className='paper-panel rounded-[30px] border-0'>
          <div className='flex flex-col gap-8 p-1 sm:p-3'>
            <header className='flex flex-wrap items-start justify-between gap-4'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-wrap items-center gap-3'>
                  <Tag
                    variant='filled'
                    color={isEnding ? 'error' : 'gold'}
                    className='rounded-full px-3 py-1 tracking-[0.2em]'
                  >
                    {isEnding ? 'ENDING' : 'SCENE'}
                  </Tag>
                  <Tag
                    variant='filled'
                    className='rounded-full px-3 py-1 text-[#7f5644]'
                  >
                    {node.id}
                  </Tag>
                </div>
                <Title
                  level={1}
                  className='story-title !mb-0 !text-4xl !leading-tight !text-[#241813] sm:!text-5xl'
                >
                  {node.title}
                </Title>
              </div>

              <div className='flex items-center gap-3'>
                <Link href='/'>
                  <Button
                    icon={<HomeOutlined />}
                    className='!rounded-full'
                  >
                    首页
                  </Button>
                </Link>
                <Link href='/'>
                  <Button
                    icon={<ArrowLeftOutlined />}
                    className='!rounded-full'
                  >
                    {isEnding ? '重新开始' : '重开'}
                  </Button>
                </Link>
              </div>
            </header>

            <section className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
              <Card className='story-meta rounded-[26px] border-0'>
                <div className='story-body flex flex-col gap-4 text-base text-[#392822] sm:text-lg'>
                  {node.body.map((paragraph) => (
                    <Paragraph
                      key={paragraph}
                      className='!mb-0 !text-inherit'
                    >
                      {paragraph}
                    </Paragraph>
                  ))}
                </div>
              </Card>

              <div className='flex flex-col gap-4'>
                {profile ? (
                  <Card className='rounded-[26px] border-0 bg-white/85'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex items-center justify-between'>
                        <Text strong>当前人格</Text>
                        <Tag color='processing'>{profile.mbti}</Tag>
                      </div>
                      <div className='grid grid-cols-2 gap-2 text-xs text-[#5f4034]'>
                        {Object.entries(profile.attributes).map(([key, value]) => (
                          <div
                            key={key}
                            className='flex items-center justify-between rounded-lg bg-[#f5e8d6] px-2 py-1'
                          >
                            <span>
                              {attributeLabels[key as keyof typeof attributeLabels]}
                            </span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ) : null}

                {isEnding && node.endingTitle ? (
                  <Card className='ending-seal rounded-[26px] border-0'>
                    <div className='flex flex-col gap-2'>
                      <Text className='text-xs uppercase tracking-[0.45em] text-[#8b4b39]'>
                        结局
                      </Text>
                      <Title
                        level={2}
                        className='story-title !mb-0 !text-3xl !text-[#842c1f]'
                      >
                        {node.endingTitle}
                      </Title>
                    </div>
                  </Card>
                ) : null}

                {(node.source || node.keywords || node.note) && (
                  <Card className='rounded-[26px] border-0 bg-white/70'>
                    <div className='flex flex-col gap-3 text-sm leading-7 text-[#53362b]'>
                      {node.source ? (
                        <div>
                          <Text strong>来源</Text>
                          <Paragraph className='!mb-0 !mt-1 !text-inherit break-all'>
                            <a
                              href={node.source}
                              target='_blank'
                              rel='noreferrer'
                            >
                              {node.source}
                            </a>
                          </Paragraph>
                        </div>
                      ) : null}
                      {node.keywords ? (
                        <div>
                          <Text strong>关键词</Text>
                          <Paragraph className='!mb-0 !mt-1 !text-inherit'>
                            {node.keywords}
                          </Paragraph>
                        </div>
                      ) : null}
                      {node.note ? (
                        <div>
                          <Text strong>备注</Text>
                          <Paragraph className='!mb-0 !mt-1 !text-inherit'>
                            {node.note}
                          </Paragraph>
                        </div>
                      ) : null}
                    </div>
                  </Card>
                )}
              </div>
            </section>

            <Divider className='!my-0 !border-[#d8c3b0]' />

            <section className='flex flex-col gap-4'>
              <div className='flex items-center gap-3'>
                <FlagOutlined className='text-[#9f2d20]' />
                <Text className='text-sm uppercase tracking-[0.32em] text-[#875a47]'>
                  {isEnding ? '下一步' : '你的选择'}
                </Text>
              </div>

              {node.choices.length > 0 ? (
                <div className='grid gap-3'>
                  {node.choices.map((choice, index) => {
                    const icon = isEnding ? (
                      <ReloadOutlined />
                    ) : (
                      <ArrowRightOutlined />
                    );
                    const requirements = choice.requirements;
                    const requirementEntries = requirements
                      ? Object.entries(requirements)
                      : [];
                    const profileReady = !!profile;
                    const meetRequirements =
                      requirementEntries.length === 0 ||
                      (profileReady &&
                        requirementEntries.every(
                          ([key, value]) =>
                            (profile?.attributes[
                              key as keyof typeof profile.attributes
                            ] ?? 0) >= (value ?? 0)
                        ));

                    const requirementText =
                      requirementEntries.length > 0
                        ? requirementEntries
                            .map(
                              ([key, value]) =>
                                `${
                                  attributeLabels[
                                    key as keyof typeof attributeLabels
                                  ]
                                } ${value}`
                            )
                            .join(' / ')
                        : '';

                    const locked = !meetRequirements;
                    const button = (
                      <Button
                        type={index === 0 ? 'primary' : 'default'}
                        size='large'
                        block
                        disabled={locked}
                        icon={icon}
                        className='story-choice-button !rounded-2xl !text-left'
                      >
                        {choice.label}
                      </Button>
                    );

                    return (
                      <div key={choice.href + choice.label}>
                        {locked ? (
                          <div>{button}</div>
                        ) : (
                          <Link href={choice.href} className='w-full'>
                            {button}
                          </Link>
                        )}
                        {locked && requirementText ? (
                          <Text className='mt-1 block text-xs text-[#9f2d20]'>
                            {choice.requirementHint ?? '属性不足，无法选择'}
                            （{requirementText}）
                          </Text>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Card className='rounded-[22px] border-0 bg-white/60'>
                  <Paragraph className='!mb-0 !text-base !leading-8 !text-[#53362b]'>
                    当前结局页没有继续按钮，和原始页面保持一致。你可以通过顶部入口返回首页重开。
                  </Paragraph>
                </Card>
              )}
            </section>
          </div>
        </Card>
      </div>
    </main>
  );
}
