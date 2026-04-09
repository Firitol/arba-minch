'use client';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider, useTranslation } from '@/context/language-context';
import { useEffect } from 'react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { language, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t('appName');

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t('appDescription'));
    }
  }, [language, t]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="description"
            content="Arba Minch City House Holder Information Management System"
          />
          <meta name="theme-color" content="#4da64d" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-body antialiased">
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </LanguageProvider>
  );
}
