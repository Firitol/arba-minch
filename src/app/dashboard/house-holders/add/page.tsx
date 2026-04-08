import { HouseHolderForm } from '@/components/dashboard/house-holder-form';

export default function AddHouseHolderPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Add New House Holder</h2>
      <div className="mt-6">
        <HouseHolderForm />
      </div>
    </>
  );
}
