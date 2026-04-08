import { MapView } from '@/components/map/map-view';
import { mockHouseHolders } from '@/lib/data';

export default function MapPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        House Holders Map View
      </h2>
      <div className="flex-grow rounded-lg border bg-card shadow-sm overflow-hidden">
        <MapView houseHolders={mockHouseHolders} />
      </div>
    </div>
  );
}
