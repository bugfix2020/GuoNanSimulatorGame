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

import type { StoryNode } from '@/lib/story';

const { Paragraph, Text, Title } = Typography;

type GameNodeViewProps = {
  node: StoryNode;
};

export function GameNodeView({ node }: GameNodeViewProps) {
  const isEnding = node.kind === 'ending';

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

                    return (
                      <Link
                        key={choice.href + choice.label}
                        href={choice.href}
                        className='w-full'
                      >
                        <Button
                          type={index === 0 ? 'primary' : 'default'}
                          size='large'
                          block
                          icon={icon}
                          className='story-choice-button !rounded-2xl !text-left'
                        >
                          {choice.label}
                        </Button>
                      </Link>
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
