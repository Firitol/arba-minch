'use client';

import { APIProvider as GoogleApiProvider } from '@vis.gl/react-google-maps';
import type { ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';
import { useTranslation } from '@/context/language-context';

export function APIProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8 text-center">
        <div className="mb-4 text-destructive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-destructive">
          {t('apiProvider.errorTitle')}
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {t('apiProvider.errorDesc')}
        </p>
        <Skeleton className="mt-6 h-[200px] w-full max-w-md" />
      </div>
    );
  }
  return <GoogleApiProvider apiKey={apiKey}>{children}</GoogleApiProvider>;
}
