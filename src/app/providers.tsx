'use client';

import { LanguageProvider, useTranslation } from '@/context/language-context';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';

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
      <AppSetup>{children}</AppSetup>
      <Toaster />
    </LanguageProvider>
  );
}
