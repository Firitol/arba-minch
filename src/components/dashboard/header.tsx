'use client';

import Link from 'next/link';
import {
  Home,
  Menu,
  LogOut,
  User as UserIcon,
  Languages,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { mockUser } from '@/lib/data';
import { useTranslation } from '@/context/language-context';

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const user = mockUser;
  const { t, setLanguage, language } = useTranslation();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">{t('header.toggleMenu')}</span>
        </Button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Home className="h-6 w-6 text-primary" />
          <span className="sr-only">{t('appName')}</span>
        </Link>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages className="h-4 w-4" />
              <span className="sr-only">{t('language')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setLanguage('en')}>
              <div className="flex w-full items-center justify-between gap-2">
                <span>{t('english')}</span>
                {language === 'en' && <Check className="h-4 w-4" />}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLanguage('am')}>
              <div className="flex w-full items-center justify-between gap-2">
                <span>{t('amharic')}</span>
                {language === 'am' && <Check className="h-4 w-4" />}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">{t('header.toggleUserMenu')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{t('header.profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('header.logout')}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
