'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Map as MapIcon,
  Siren,
  Home,
} from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/house-holders',
    label: 'House Holders',
    icon: Users,
  },
  {
    href: '/dashboard/map',
    label: 'Map View',
    icon: MapIcon,
  },
  {
    href: '/dashboard/emergency',
    label: 'Emergency Finder',
    icon: Siren,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Home className="h-6 w-6 text-primary" />
          <span className="duration-200 group-data-[collapsible=icon]:opacity-0">
            {APP_NAME}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/dashboard'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                }
                tooltip={{
                  children: item.label,
                  className: 'group-data-[collapsible=icon]:flex hidden',
                }}
                className="justify-start"
              >
                <Link href={item.href} className={cn('flex items-center gap-2')}>
                  <item.icon className="h-5 w-5" />
                  <span className="duration-200 group-data-[collapsible=icon]:opacity-0">
                    {item.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
