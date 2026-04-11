'use client';

import StatCard from '@/components/dashboard/stat-card';
import { KEBELÉS } from '@/lib/constants';
import { Home, MapPin, Users } from 'lucide-react';
import { useTranslation } from '@/context/language-context';
import Link from 'next/link';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { HouseHolder } from '@/lib/types';

export default function DashboardPage() {
  const { t } = useTranslation();
  const firestore = useFirestore();
  const { data: houseHolders, loading } = useCollection<HouseHolder>(
    firestore ? collection(firestore, 'householders') : null
  );

  const totalHouseHolders = houseHolders?.length || 0;
  const totalKebeles = houseHolders
    ? new Set(houseHolders.map((h) => h.kebele)).size
    : 0;
  const totalPopulation =
    houseHolders?.reduce((sum, h) => sum + h.familySize, 0) || 0;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.title')}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/house-holders">
          <StatCard
            title={t('dashboard.totalHouseHolders')}
            value={loading ? '...' : totalHouseHolders.toLocaleString()}
            icon={Home}
            description={t('dashboard.totalHouseHoldersDesc')}
          />
        </Link>
        <StatCard
          title={t('dashboard.estimatedPopulation')}
          value={loading ? '...' : totalPopulation.toLocaleString()}
          icon={Users}
          description={t('dashboard.estimatedPopulationDesc')}
        />
        <Link href="/dashboard/map">
          <StatCard
            title={t('dashboard.kebelesCovered')}
            value={loading ? '...' : `${totalKebeles} / ${KEBELÉS.length}`}
            icon={MapPin}
            description={t('dashboard.kebelesCoveredDesc')}
          />
        </Link>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold tracking-tight">
          {t('dashboard.welcome', { appName: t('appName') })}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {t('dashboard.welcomeDesc')}
        </p>
      </div>
    </>
  );
}
