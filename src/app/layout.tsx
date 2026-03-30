import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Noto_Serif_SC, ZCOOL_XiaoWei } from 'next/font/google';
import React from 'react';
import { AchievementSystemProvider } from '@/components/achievement-system';
import AudioManagerClient from '@/components/audio-manager-client';
import { PlayerProfileProvider } from '@/components/player-profile-provider';
import './globals.css';

const serif = Noto_Serif_SC({
  variable: '--font-story-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const display = ZCOOL_XiaoWei({
  variable: '--font-story-display',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: '国男大冒险',
  description: '使用 Electron、Next.js 与 Ant Design 重制的分支叙事桌面版。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='zh-CN'
      className={`${serif.variable} ${display.variable} h-full antialiased`}
    >
      <body className='min-h-full'>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#9f2d20',
                colorInfo: '#9f2d20',
                colorBgBase: '#f4eadb',
                colorTextBase: '#241813',
                colorBorder: '#d6c0ad',
                colorText: '#241813',
                colorTextSecondary: '#6f4d3f',
                colorBgElevated: '#fff8ef',
                borderRadius: 18,
                fontFamily: 'var(--font-story-serif)',
              },
            }}
          >
            <PlayerProfileProvider>
              <AchievementSystemProvider>
                <AudioManagerClient />
                {children}
              </AchievementSystemProvider>
            </PlayerProfileProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
