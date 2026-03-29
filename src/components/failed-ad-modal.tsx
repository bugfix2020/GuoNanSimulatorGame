'use client';

import { Button, Modal, Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const { Paragraph, Text, Title } = Typography;

type Props = {
  open: boolean;
  onCloseAction: () => void;
  resetKey: string;
};

function CountdownSection({
  onCloseAction,
  resetKey,
}: {
  onCloseAction: () => void;
  resetKey: string;
}) {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    setSeconds(30);
  }, [resetKey]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div className='flex flex-col items-center gap-3'>
      <Text type='secondary' className='text-sm'>
        {seconds > 0 ? `${seconds} 秒后可关闭` : '广告已结束，感谢观看！'}
      </Text>
      <Button
        type='primary'
        disabled={seconds > 0}
        onClick={onCloseAction}
        className='rounded-xl! px-8!'
      >
        {seconds > 0 ? `跳过广告 (${seconds})` : '关闭广告，继续游戏'}
      </Button>
    </div>
  );
}

export function FailedAdModal({ open, onCloseAction, resetKey }: Props) {
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      centered
      destroyOnHidden
      mask={{closable:false}}
      width={480}
    >
      <div className='flex flex-col items-center gap-6 py-4 text-center'>
        <div className='rounded-full bg-[#f4eadb] px-4 py-1.5 text-xs tracking-[0.35em] text-[#9f2d20]'>
          广告位招商中
        </div>

        <div className='flex flex-col items-center gap-3'>
          <Title level={3} className='mb-0! text-[#241813]!'>
            📢 特别鸣谢
          </Title>
          <Paragraph className='mb-0! text-base text-[#53362b]'>
            本游戏由以下厂商提供技术支持
          </Paragraph>
          <Paragraph className='mb-0! text-xs! text-[#b0a89e]!'>
            *本页面仅为玩梗展示，与相关公司无商业合作关系
          </Paragraph>
          <div className='mt-1 flex flex-col gap-3'>
            {[
              { logo: '/gemini-color.svg', name: 'Gemini 3.1 Pro', alt: 'Gemini' },
              { logo: '/openai.svg', name: 'ChatGPT-5.4', alt: 'OpenAI' },
              { logo: '/claude-color.svg', name: 'Claude Sonnet 4.6', alt: 'Claude' },
            ].map(({ logo, name, alt }) => (
              <div key={name} className='flex items-center gap-3'>
                <Image src={logo} alt={alt} width={28} height={28} className='shrink-0 object-contain' />
                <Text strong className='text-base text-[#9f2d20]'>
                  {name}
                </Text>
              </div>
            ))}
          </div>

          <div className='mt-2 flex items-center gap-8 border-t border-[#e8d8cc] pt-3'>
            <div className='flex flex-col items-center gap-1.5'>
              <Image src='/next.svg' alt='Next.js' width={80} height={20} className='object-contain' />
            </div>
            <div className='flex flex-col items-center gap-1.5'>
              <Image src='/vercel.svg' alt='Vercel' width={80} height={20} className='object-contain' />
            </div>
          </div>

          <div className='mt-1 flex items-center gap-8 border-t border-[#e8d8cc]' />

          <Paragraph className='mb-0! text-base text-[#53362b]'>
            战略合作伙伴
          </Paragraph>
          <Paragraph className='mb-0! text-xs! text-[#b0a89e]!'>
            *战略合作伙伴指本项目名称
          </Paragraph>

          <div className='mt-1 flex w-full justify-around items-center border-t border-[#e8d8cc] pt-2'>
            {[
              { logo: '/nvidia-color.svg', name: 'GeForce RTX 4060 Ti GAMING X 16G', alt: 'NVIDIA' },
              { logo: '/intel-color.svg', name: 'Core i9-11900K', alt: 'Intel' },
            ].map(({ logo, name, alt }) => (
              <div key={name} className='flex items-center gap-3 max-w-[48%]'>
                <div className='flex h-8 w-10 items-center justify-center overflow-hidden shrink-0'>
                  <Image src={logo} alt={alt} width={40} height={28} className='object-contain' />
                </div>
                <Text strong className='text-base text-[#9f2d20] whitespace-normal wrap-break-word'>
                  {name}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {open && (
          <CountdownSection
            key={resetKey}
            onCloseAction={onCloseAction}
            resetKey={resetKey}
          />
        )}
      </div>
    </Modal>
  );
}
