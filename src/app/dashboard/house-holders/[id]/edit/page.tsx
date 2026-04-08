import { HouseHolderForm } from '@/components/dashboard/house-holder-form';
import { mockHouseHolders } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function EditHouseHolderPage({ params }: { params: { id: string } }) {
  const houseHolder = mockHouseHolders.find((h) => h.id === params.id);

  if (!houseHolder) {
    notFound();
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Edit House Holder</h2>
      <div className="mt-6">
        <HouseHolderForm houseHolder={houseHolder} />
      </div>
    </>
  );
}
