import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GameNodeView } from '@/components/game-node-view';
import { getSceneById, sceneIds } from '@/lib/story';

type ScenePageProps = {
  params: Promise<{
    sceneId: string;
  }>;
};

export async function generateStaticParams() {
  return sceneIds.map((sceneId) => ({ sceneId }));
}

export async function generateMetadata({
  params,
}: ScenePageProps): Promise<Metadata> {
  const { sceneId } = await params;
  const node = getSceneById(sceneId);

  if (!node) {
    return {
      title: '场景未找到',
    };
  }

  return {
    title: `${node.title} | ${sceneId}`,
    description: node.body[0],
  };
}

export default async function ScenePage({ params }: ScenePageProps) {
  const { sceneId } = await params;
  const node = getSceneById(sceneId);

  if (!node) {
    notFound();
  }

  return <GameNodeView node={node} />;
}
