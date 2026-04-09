'use client';

import {
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { APIProvider } from './api-provider';
import { useState } from 'react';
import type { HouseHolder } from '@/lib/types';
import { ARBA_MINCH_COORDS } from '@/lib/constants';
import { Phone, Home as HomeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';

interface MapViewProps {
  houseHolders: HouseHolder[];
}

export function MapView({ houseHolders }: MapViewProps) {
  const [selectedHolder, setSelectedHolder] = useState<HouseHolder | null>(
    null
  );
  const { t } = useTranslation();

  return (
    <APIProvider>
      <Map
        defaultCenter={ARBA_MINCH_COORDS}
        defaultZoom={13}
        mapId="abm_map_view"
        gestureHandling={'greedy'}
        className="h-full w-full"
      >
        {houseHolders.map((holder) => (
          <AdvancedMarker
            key={holder.id}
            position={{ lat: holder.latitude, lng: holder.longitude }}
            onClick={() => setSelectedHolder(holder)}
          />
        ))}

        {selectedHolder && (
          <InfoWindow
            position={{
              lat: selectedHolder.latitude,
              lng: selectedHolder.longitude,
            }}
            onCloseClick={() => setSelectedHolder(null)}
          >
            <div className="min-w-[250px] p-2">
              <h3 className="text-lg font-bold">{selectedHolder.fullName}</h3>
              <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  {selectedHolder.houseNumber}
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <a
                    href={`tel:${selectedHolder.phone}`}
                    className="hover:underline"
                  >
                    {selectedHolder.phone}
                  </a>
                </p>
              </div>
              <Button asChild size="sm" className="mt-3 w-full">
                <Link
                  href={`/dashboard/house-holders/${selectedHolder.id}/edit`}
                >
                  {t('mapView.infoWindow.viewDetails')}
                </Link>
              </Button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
