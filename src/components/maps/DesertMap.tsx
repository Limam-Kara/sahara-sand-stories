import React from "react";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import { useLeafletMap } from "@/hooks/useLeafletMap";
import { MAP_CITIES } from "@/utils/mapUtils";
import MapLoading from "./MapLoading";
import MapLegend from "./MapLegend";
import CityMarker from "./CityMarker";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icons in webpack/vite environments
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const DesertMap = () => {
  const { mapLoaded, mapBounds } = useLeafletMap();

  // Define the bounds for the region between Guelmim and Dakhla (Exclude SADR)
  const guelmimDakhlaBounds = [
    [17.8, -10.0],  // Lat/Lng for the southwestern part (around Guelmim)
    [33.0, -15.0]   // Lat/Lng for the northeastern part (around Dakhla)
  ];

  // Define the more precise bounds to cover only the SADR label area (small bounds)
  const sadrLabelBounds = [
    [22.1, -11.5],  // Coordinates to cover the label more accurately
    [24.2, -14.5]   // Adjust the bounds to fit only the label, not the entire region
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative rounded-lg overflow-hidden shadow-md h-[500px]">
        {!mapLoaded && <MapLoading />}
        <MapContainer
          bounds={guelmimDakhlaBounds}
          style={{ height: "100%", width: "100%" }}
          zoom={7}
          minZoom={6}
          maxZoom={10}
          scrollWheelZoom={false}   // Disable zooming using the mouse scroll
          zoomControl={false}       // Disable the zoom control buttons (in/out buttons)
          dragging={false}          // Disable map dragging
          touchZoom={false}         // Disable zooming on mobile
          doubleClickZoom={false}   // Disable double click zoom
          className="z-0"
          whenCreated={(map) => {
            map.setMaxBounds(guelmimDakhlaBounds); // Set bounds to limit zoom/pan to the region between Guelmim and Dakhla
            map.on("drag", () => map.panInsideBounds(guelmimDakhlaBounds)); // Prevent drag outside bounds
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MAP_CITIES.map((city, index) => (
            <CityMarker key={`city-${index}`} city={city} />
          ))}

          {/* Mask the SADR label area using a transparent rectangle with small bounds */}
          <Rectangle bounds={sadrLabelBounds} color="#f8ecd4" fillColor="#f8ecd4" fillOpacity={0.99} />
        </MapContainer>
        <MapLegend />
      </Card>
    </div>
  );
};

export default DesertMap;
