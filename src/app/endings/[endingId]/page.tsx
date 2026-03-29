import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GameNodeView } from '@/components/game-node-view';
import { endingIds, getEndingById } from '@/lib/story';

type EndingPageProps = {
  params: Promise<{
    endingId: string;
  }>;
};

export async function generateStaticParams() {
  return endingIds.map((endingId) => ({ endingId }));
}

export async function generateMetadata({
  params,
}: EndingPageProps): Promise<Metadata> {
  const { endingId } = await params;
  const node = getEndingById(endingId);

  if (!node) {
    return {
      title: '结局未找到',
    };
  }

  return {
    title: `${node.title} | ${node.endingTitle ?? endingId}`,
    description: node.body[0],
  };
}

export default async function EndingPage({ params }: EndingPageProps) {
  const { endingId } = await params;
  const node = getEndingById(endingId);

  if (!node) {
    notFound();
  }

  return <GameNodeView node={node} />;
}
