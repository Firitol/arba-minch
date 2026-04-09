'use client';

import { EmergencyMapView } from '@/components/map/emergency-map-view';
import { mockHouseHolders } from '@/lib/data';
import { useTranslation } from '@/context/language-context';

export default function EmergencyPage() {
  const { t } = useTranslation();
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        {t('emergencyPage.title')}
      </h2>
      <p className="mb-4 text-muted-foreground">{t('emergencyPage.description')}</p>
      <div className="flex-grow overflow-hidden rounded-lg border bg-card shadow-sm">
        <EmergencyMapView houseHolders={mockHouseHolders} />
      </div>
    </div>
  );
}
