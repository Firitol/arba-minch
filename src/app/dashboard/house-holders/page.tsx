import { HouseHoldersTable } from '@/components/dashboard/house-holders-table';
import { Button } from '@/components/ui/button';
import { mockHouseHolders } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function HouseHoldersPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">House Holders</h2>
        <Link href="/dashboard/house-holders/add" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add House Holder
          </Button>
        </Link>
      </div>
      <HouseHoldersTable data={mockHouseHolders} />
    </>
  );
}
