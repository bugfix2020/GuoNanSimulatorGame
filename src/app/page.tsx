import { HomeView } from '@/components/home-view';
import { homeStory } from '@/lib/story';

export default function Home() {
  return <HomeView story={homeStory} />;
}
