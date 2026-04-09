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
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: t('forgotPassword.toastTitle'),
      description: t('forgotPassword.toastDescription'),
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Home className="mr-2 h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{t('appName')}</h1>
          </div>
          <CardTitle className="text-2xl">{t('forgotPassword.title')}</CardTitle>
          <CardDescription>{t('forgotPassword.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('forgotPassword.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('forgotPassword.emailPlaceholder')}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t('forgotPassword.button')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('forgotPassword.rememberedPassword')}{' '}
            <Link href="/" className="underline">
              {t('forgotPassword.signIn')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
