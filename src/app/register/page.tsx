'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/context/language-context';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Home className="mr-2 h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{t('appName')}</h1>
          </div>
          <CardTitle className="text-2xl">{t('register.title')}</CardTitle>
          <CardDescription>{t('register.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">{t('register.fullNameLabel')}</Label>
              <Input
                id="full-name"
                placeholder={t('register.fullNamePlaceholder')}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('register.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('register.emailPlaceholder')}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('register.passwordLabel')}</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t('register.button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('register.haveAccount')}{' '}
            <Link href="/" className="underline">
              {t('register.signIn')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
