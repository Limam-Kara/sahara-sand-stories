
import { useRef, useState, useEffect } from "react";
import { MOROCCO_BOUNDS, MOROCCO_CENTER } from "@/utils/mapUtils";

export const useMapbox = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Since we're using Leaflet now, this hook is kept for backward compatibility
    // but we're not actually initializing Mapbox here anymore
    
    setTimeout(() => {
      setMapLoaded(true);
    }, 100);

    return () => {
      if (map.current) {
        map.current = null;
      }
    };
  }, []);

  return { mapContainer, map, mapLoaded };
};
