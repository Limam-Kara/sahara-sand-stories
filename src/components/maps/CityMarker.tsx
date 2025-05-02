
import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface CityMarkerProps {
  city: { name: string; coordinates: number[] };
}

const CityMarker = ({ city }: CityMarkerProps) => {
  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <Marker 
      position={[city.coordinates[1], city.coordinates[0]]} 
      icon={customIcon}
    >
      <Popup>
        <h3 className="font-medium">{city.name}</h3>
      </Popup>
    </Marker>
  );
};

export default CityMarker;
