'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  height?: string | number;
  onLocationFound?: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<{ onLocationFound?: (lat: number, lng: number) => void }> = ({ onLocationFound }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    const handleLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
      if (onLocationFound) onLocationFound(e.latlng.lat, e.latlng.lng);
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', (e) => console.error('Location error:', e.message));
    map.locate({ setView: false, enableHighAccuracy: true });

    return () => {
      map.off('locationfound', handleLocationFound);
    };
  }, [map, onLocationFound]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const Map: React.FC<MapProps> = ({ height = '100%', onLocationFound }) => {
  const defaultPosition: [number, number] = [28.6139, 77.209];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: height as string, width: '100%', minHeight: '300px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationFound={onLocationFound} />
    </MapContainer>
  );
};

export default Map;
