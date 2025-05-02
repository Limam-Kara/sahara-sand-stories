
import React from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer } from "react-leaflet";
import { useLeafletMap } from "@/hooks/useLeafletMap";
import { MAP_CITIES } from "@/utils/mapUtils";
import MapLoading from "./MapLoading";
import MapLegend from "./MapLegend";
import CityMarker from "./CityMarker";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in webpack/vite environments
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DesertMap = () => {
  const { mapLoaded, mapBounds } = useLeafletMap();

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative rounded-lg overflow-hidden shadow-md h-[500px]">
        {!mapLoaded && <MapLoading />}
        <MapContainer 
          bounds={mapBounds}
          style={{ height: "100%", width: "100%" }}
          zoom={6}
          minZoom={5}
          maxZoom={10}
          scrollWheelZoom={false}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MAP_CITIES.map((city, index) => (
            <CityMarker key={`city-${index}`} city={city} />
          ))}
        </MapContainer>
        <MapLegend />
      </Card>
    </div>
  );
};

export default DesertMap;
