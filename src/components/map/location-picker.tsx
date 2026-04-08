'use client';

import {
  Map,
  AdvancedMarker,
  MapCameraProps,
} from '@vis.gl/react-google-maps';
import { APIProvider } from './api-provider';
import { ARBA_MINCH_COORDS } from '@/lib/constants';

type Position = { lat: number; lng: number };

interface LocationPickerProps {
  position: Position;
  onPositionChange: (pos: Position) => void;
}

export function LocationPicker({
  position,
  onPositionChange,
}: LocationPickerProps) {
  const cameraState: MapCameraProps = {
    center: position,
    zoom: 15,
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onPositionChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  return (
    <APIProvider>
      <div className="h-64 w-full overflow-hidden rounded-md border">
        <Map
          defaultCenter={ARBA_MINCH_COORDS}
          defaultZoom={13}
          {...cameraState}
          mapId="abm_location_picker"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          onClick={handleMapClick}
          className="h-full w-full"
        >
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}
