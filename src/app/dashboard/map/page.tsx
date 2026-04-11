'use client';

import { MapView } from '@/components/map/map-view';
import { useTranslation } from '@/context/language-context';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { HouseHolder } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapPage() {
  const { t } = useTranslation();
  const firestore = useFirestore();
  const { data: houseHolders, loading } = useCollection<HouseHolder>(
    firestore ? collection(firestore, 'householders') : null
  );

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        {t('mapPage.title')}
      </h2>
      <div className="flex-grow overflow-hidden rounded-lg border bg-card shadow-sm">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <MapView houseHolders={houseHolders || []} />
        )}
      </div>
    </div>
  );
}
