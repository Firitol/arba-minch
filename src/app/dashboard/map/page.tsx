'use client';

import { MapView } from '@/components/map/map-view';
import { mockHouseHolders } from '@/lib/data';
import { useTranslation } from '@/context/language-context';

export default function MapPage() {
  const { t } = useTranslation();
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        {t('mapPage.title')}
      </h2>
      <div className="flex-grow overflow-hidden rounded-lg border bg-card shadow-sm">
        <MapView houseHolders={mockHouseHolders} />
      </div>
    </div>
  );
}
