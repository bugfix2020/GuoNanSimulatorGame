'use client';
import Link from 'next/link';
import { Button, Card, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export default function NotFound() {
  return (
    <main className='game-shell flex min-h-screen items-center justify-center px-4 py-8'>
      <Card className='paper-panel max-w-xl rounded-[28px] border-0 text-center'>
        <div className='flex flex-col gap-5 p-4'>
          <Title
            level={1}
            className='story-title !mb-0 !text-4xl !text-[#241813]'
          >
            页面不存在
          </Title>
          <Paragraph className='!mb-0 !text-base !leading-8 !text-[#53362b]'>
            这个分支没有对应页面，可能是路由参数不正确，或者原始 Axure
            页面尚未迁移。
          </Paragraph>
          <Link href='/'>
            <Button
              type='primary'
              size='large'
              className='!rounded-full'
            >
              返回首页
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
