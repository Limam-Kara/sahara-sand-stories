
import React from "react";
import { Polygon } from "react-leaflet";
import { RASD_POLYGON_COORDINATES } from "@/utils/mapUtils";

const GeoMask = () => {
  return (
    <Polygon
      positions={RASD_POLYGON_COORDINATES}
      pathOptions={{
        fillColor: '#F1F0FB',
        fillOpacity: 0.8,
        color: '#8E9196',
        weight: 1,
        opacity: 0.6,
      }}
    />
  );
};

export default GeoMask;
