'use client';

import { ArrowRightOutlined, DesktopOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Tag, Typography } from 'antd';
import Link from 'next/link';

import type { HomeStory } from '@/lib/story';

const { Paragraph, Text, Title } = Typography;

type HomeViewProps = {
  story: HomeStory;
};

export function HomeView({ story }: HomeViewProps) {
  return (
    <main className='game-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <Card className='paper-panel overflow-hidden rounded-[32px] border-0'>
          <div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10'>
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

              <div className='grid gap-3 sm:max-w-md'>
                {story.choices.map((choice, index) => (
                  <Link
                    key={choice.href}
                    href={choice.href}
                    className='w-full'
                  >
                    <Button
                      type={
                        index === story.choices.length - 1
                          ? 'primary'
                          : 'default'
                      }
                      size='large'
                      block
                      icon={<ArrowRightOutlined />}
                      className='story-choice-button !rounded-2xl !text-left'
                    >
                      {choice.label}
                    </Button>
                  </Link>
                ))}
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
      </div>
    </main>
  );
}
