'use client';

import { HouseHoldersTable } from '@/components/dashboard/house-holders-table';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { CsvImporter } from '@/components/dashboard/csv-importer';
import { useTranslation } from '@/context/language-context';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { HouseHolder } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HouseHoldersPage() {
  const { t } = useTranslation();
  const firestore = useFirestore();
  const { data: houseHolders, loading } = useCollection<HouseHolder>(
    firestore ? collection(firestore, 'householders') : null
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('houseHoldersPage.title')}
        </h2>
        <div className="flex items-center gap-2">
          <CsvImporter />
          <Link href="/dashboard/house-holders/add" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('houseHoldersPage.addHolder')}
            </Button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="mt-4 space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <HouseHoldersTable data={houseHolders || []} />
      )}
    </>
  );
}
