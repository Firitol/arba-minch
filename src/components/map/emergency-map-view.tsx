'use client';

import { Map, AdvancedMarker, useMapsLibrary } from '@vis.gl/react-google-maps';
import { APIProvider } from './api-provider';
import { useState, useMemo, useEffect } from 'react';
import type { HouseHolder } from '@/lib/types';
import { ARBA_MINCH_COORDS } from '@/lib/constants';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface EmergencyMapViewProps {
  houseHolders: HouseHolder[];
}

export function EmergencyMapView({ houseHolders }: EmergencyMapViewProps) {
  const [selectedHolder, setSelectedHolder] = useState<HouseHolder | null>(null);
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerLibrary = useMapsLibrary('marker');

  useEffect(() => {
    if (selectedHolder && map) {
      map.panTo({ lat: selectedHolder.latitude, lng: selectedHolder.longitude });
      map.setZoom(18);
    }
  }, [selectedHolder, map]);

  return (
    <APIProvider>
      <div className="relative h-full w-full">
        <Map
          ref={setMap}
          defaultCenter={ARBA_MINCH_COORDS}
          defaultZoom={13}
          mapId="abm_emergency_view"
          gestureHandling={'greedy'}
          className="h-full w-full"
        >
          {markerLibrary && houseHolders.map((holder) => {
            const isSelected = selectedHolder?.id === holder.id;
            const pin = new markerLibrary.PinElement({
              background: isSelected ? 'hsl(var(--primary))' : '#9ca3af',
              borderColor: '#fff',
              glyph: new URL(
                'https://maps.gstatic.com/mapfiles/arrow.png'
              ),
            });
            return (
              <AdvancedMarker
                key={holder.id}
                position={{ lat: holder.latitude, lng: holder.longitude }}
                content={pin.element}
              />
            );
          })}
        </Map>
        <div className="absolute left-4 top-4 w-full max-w-sm">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search by house number..." />
            <CommandList>
              <CommandEmpty>No house number found.</CommandEmpty>
              <CommandGroup>
                {houseHolders.map((holder) => (
                  <CommandItem
                    key={holder.id}
                    value={`${holder.houseNumber} ${holder.fullName}`}
                    onSelect={() => {
                      setSelectedHolder(holder);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{holder.houseNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {holder.fullName} - {holder.kebele}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </APIProvider>
  );
}
