'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import am from '@/locales/am.json';

type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations: Record<Language, any> = { en, am };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && ['en', 'am'].includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            // Fallback to English if translation is not found
            let fallbackResult = translations['en'];
            for (const fk of keys) {
                fallbackResult = fallbackResult?.[fk];
                if(fallbackResult === undefined) return key;
            }
             if (fallbackResult && params) {
                return Object.entries(params).reduce((acc, [key, value]) => {
                    return acc.replace(`{${key}}`, String(value));
                }, fallbackResult);
            }
            return fallbackResult || key;
        }
    }
    if (result && params) {
        return Object.entries(params).reduce((acc, [key, value]) => {
            return acc.replace(`{${key}}`, String(value));
        }, result);
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
