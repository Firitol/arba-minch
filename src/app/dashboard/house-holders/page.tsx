'use client';

import { HouseHoldersTable } from '@/components/dashboard/house-holders-table';
import { Button } from '@/components/ui/button';
import { mockHouseHolders } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { CsvImporter } from '@/components/dashboard/csv-importer';
import { useTranslation } from '@/context/language-context';

export default function HouseHoldersPage() {
  const { t } = useTranslation();
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
      <HouseHoldersTable data={mockHouseHolders} />
    </>
  );
}
