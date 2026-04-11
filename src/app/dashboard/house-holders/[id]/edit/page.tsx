'use client';

import { HouseHolderForm } from '@/components/dashboard/house-holder-form';
import { notFound } from 'next/navigation';
import { useTranslation } from '@/context/language-context';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { HouseHolder } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditHouseHolderPage({
  params,
}: {
  params: { id: string };
}) {
  const { t } = useTranslation();
  const firestore = useFirestore();
  const houseHolderRef = firestore
    ? doc(firestore, 'householders', params.id)
    : null;
  const { data: houseHolder, loading } = useDoc<HouseHolder>(houseHolderRef);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Skeleton className="h-96 lg:col-span-2" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

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
