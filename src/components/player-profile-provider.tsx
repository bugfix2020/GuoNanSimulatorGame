'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  buildProfileByMbti,
  deriveMbtiFromQuizAnswers,
  type MbtiCode,
  type PlayerProfile,
} from '@/lib/player-profile';

const STORAGE_KEY = 'guonan-player-profile-v1';

type PlayerProfileContextValue = {
  profile: PlayerProfile | null;
  ready: boolean;
  setProfileByMbti: (mbti: MbtiCode) => void;
  setProfileByQuizAnswers: (answers: Record<string, 'A' | 'B'>) => MbtiCode;
  clearProfile: () => void;
};

const PlayerProfileContext = createContext<PlayerProfileContextValue | null>(
  null
);

export function PlayerProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PlayerProfile;
        if (parsed?.mbti && parsed?.attributes) {
          setProfile(parsed);
        }
      }
    } catch {
      setProfile(null);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (profile) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [profile, ready]);

  const setProfileByMbti = useCallback((mbti: MbtiCode) => {
    setProfile(buildProfileByMbti(mbti, 'manual'));
  }, []);

  const setProfileByQuizAnswers = useCallback(
    (answers: Record<string, 'A' | 'B'>) => {
      const mbti = deriveMbtiFromQuizAnswers(answers);
      setProfile(buildProfileByMbti(mbti, 'quiz'));
      return mbti;
    },
    []
  );

  const value = useMemo(
    () => ({
      profile,
      ready,
      setProfileByMbti,
      setProfileByQuizAnswers,
      clearProfile: () => setProfile(null),
    }),
    [profile, ready, setProfileByMbti, setProfileByQuizAnswers]
  );

  return (
    <PlayerProfileContext.Provider value={value}>
      {children}
    </PlayerProfileContext.Provider>
  );
}

export function usePlayerProfile() {
  const context = useContext(PlayerProfileContext);
  if (!context) {
    throw new Error('Player profile context is unavailable');
  }

  return context;
}
