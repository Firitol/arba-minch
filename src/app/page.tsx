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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Home className="mr-2 h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{t('appName')}</h1>
          </div>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('login.emailPlaceholder')}
                required
                defaultValue="mayor@arbaminch.gov"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full">
              {t('login.button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('login.noAccount')}{' '}
            <Link href="/register" className="underline">
              {t('login.signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
