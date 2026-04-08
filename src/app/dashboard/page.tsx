import StatCard from '@/components/dashboard/stat-card';
import { KEBELÉS, APP_NAME } from '@/lib/constants';
import { mockHouseHolders } from '@/lib/data';
import { Home, MapPin, Users } from 'lucide-react';

export default function DashboardPage() {
  const totalHouseHolders = mockHouseHolders.length;
  const totalKebeles = new Set(mockHouseHolders.map((h) => h.kebele)).size;
  const totalPopulation = mockHouseHolders.reduce(
    (sum, h) => sum + h.familySize,
    0
  );

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total House Holders"
          value={totalHouseHolders.toLocaleString()}
          icon={Home}
          description="Total registered properties"
        />
        <StatCard
          title="Estimated Population"
          value={totalPopulation.toLocaleString()}
          icon={Users}
          description="Based on family size"
        />
        <StatCard
          title="Kebeles Covered"
          value={`${totalKebeles} / ${KEBELÉS.length}`}
          icon={MapPin}
          description="Active areas in the system"
        />
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold tracking-tight">Welcome to {APP_NAME}</h3>
        <p className="text-muted-foreground mt-2">
          Use the navigation to manage house holder information, view locations on the map, or use the emergency finder for rapid response.
        </p>
      </div>
    </>
  );
}
