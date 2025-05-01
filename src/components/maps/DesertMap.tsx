
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapbox } from "@/hooks/useMapbox";
import { MOROCCO_CITIES } from "@/utils/mapUtils";
import MapLoading from "./MapLoading";
import MapLegend from "./MapLegend";
import CityMarker from "./CityMarker";

const DesertMap = () => {
  const { mapContainer, map, mapLoaded } = useMapbox();

  // Add city markers when map is loaded
  useEffect(() => {
    if (mapLoaded && map.current) {
      MOROCCO_CITIES.forEach(city => {
        // Using the CityMarker component logic directly here since it's DOM manipulation
        // and not React rendering
        const el = document.createElement('div');
        el.className = 'city-marker';
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#BA5536';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';
        
        // Add markers to map
        new mapboxgl.Marker(el)
          .setLngLat(city.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${city.name}</h3>`)
          )
          .addTo(map.current);
      });
    }
  }, [mapLoaded]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative rounded-lg overflow-hidden shadow-md h-[500px]">
        {!mapLoaded && <MapLoading />}
        <div ref={mapContainer} className="w-full h-full" />
        <MapLegend />
      </Card>
    </div>
  );
};

export default DesertMap;
