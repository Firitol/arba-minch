'use client';

import { HouseHolderForm } from '@/components/dashboard/house-holder-form';
import { useTranslation } from '@/context/language-context';

export default function AddHouseHolderPage() {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">
        {t('addHolderPage.title')}
      </h2>
      <div className="mt-6">
        <HouseHolderForm />
      </div>
    </>
  );
}
