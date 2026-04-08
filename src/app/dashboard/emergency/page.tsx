import { EmergencyMapView } from '@/components/map/emergency-map-view';
import { mockHouseHolders } from '@/lib/data';

export default function EmergencyPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        Emergency Location Finder
      </h2>
      <p className="mb-4 text-muted-foreground">
        Quickly search by house number to locate a property on the map.
      </p>
      <div className="flex-grow rounded-lg border bg-card shadow-sm overflow-hidden">
        <EmergencyMapView houseHolders={mockHouseHolders} />
      </div>
    </div>
  );
}
