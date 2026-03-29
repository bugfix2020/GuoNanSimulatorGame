'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FailedAdModal } from './failed-ad-modal';

const GAMING_URL = '/gaming.mp3';
const FAILED_URL = '/failed.mp3';

export function AudioManager() {
  const pathname = usePathname();
  const gamingAudio = useRef<HTMLAudioElement | null>(null);
  const failedAudio = useRef<HTMLAudioElement | null>(null);

  // Track which ending path the user already dismissed the ad for
  const [dismissedForPath, setDismissedForPath] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isEnding = pathname?.startsWith('/endings/') ?? false;
  // Only show ad after component mounts and on ending pages, and not for the same path twice
  const showAd = isMounted && isEnding && dismissedForPath !== pathname;

  // Initialize audio elements once on mount
  useEffect(() => {
    gamingAudio.current = new Audio(GAMING_URL);
    gamingAudio.current.loop = true;
    gamingAudio.current.volume = 0.55;

    failedAudio.current = new Audio(FAILED_URL);
    failedAudio.current.loop = true;
    failedAudio.current.volume = 0.75;

    gamingAudio.current.play().catch(() => {});

    // Mark as mounted
    setIsMounted(true);

    return () => {
      gamingAudio.current?.pause();
      failedAudio.current?.pause();
    };
  }, []);

  // Reset dismissedForPath when returning to homepage
  useEffect(() => {
    if (pathname === '/' && dismissedForPath !== null) {
      setDismissedForPath(null);
    }
  }, [pathname, dismissedForPath]);

  // Handle music switching on navigation
  useEffect(() => {
    const ending = pathname?.startsWith('/endings/') ?? false;
    if (ending) {
      if (gamingAudio.current) {
        gamingAudio.current.pause();
        gamingAudio.current.currentTime = 0;
      }
      if (failedAudio.current) {
        failedAudio.current.currentTime = 0;
        failedAudio.current.play().catch(() => {});
      }
    } else {
      if (failedAudio.current) {
        failedAudio.current.pause();
        failedAudio.current.currentTime = 0;
      }
      if (gamingAudio.current?.paused) {
        gamingAudio.current.play().catch(() => {});
      }
    }
  }, [pathname]);

  const handleAdClose = useCallback(() => {
    setDismissedForPath(pathname);
  }, [pathname]);

  return (
    <FailedAdModal
      open={showAd}
      onCloseAction={handleAdClose}
      resetKey={pathname ?? ''}
    />
  );
}
