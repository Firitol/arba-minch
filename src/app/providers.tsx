'use client';

import { LanguageProvider, useTranslation } from '@/context/language-context';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

function AppSetup({ children }: { children: React.ReactNode }) {
  const { language, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('appName');

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('appDescription'));
    }
  }, [language, t]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FirebaseClientProvider>
        <AppSetup>{children}</AppSetup>
        <Toaster />
        <FirebaseErrorListener />
      </FirebaseClientProvider>
    </LanguageProvider>
  );
}
