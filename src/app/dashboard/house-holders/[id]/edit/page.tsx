'use client';

import { HouseHolderForm } from '@/components/dashboard/house-holder-form';
import { mockHouseHolders } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/context/language-context';

export default function EditHouseHolderPage({
  params,
}: {
  params: { id: string };
}) {
  const { t } = useTranslation();
  const houseHolder = mockHouseHolders.find((h) => h.id === params.id);

  if (!houseHolder) {
    notFound();
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">
        {t('editHolderPage.title')}
      </h2>
      <div className="mt-6">
        <HouseHolderForm houseHolder={houseHolder} />
      </div>
    </>
  );
}
