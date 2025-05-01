
import { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN, MOROCCO_BOUNDS, MOROCCO_CENTER } from "@/utils/mapUtils";

export const useMapbox = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11", // Use light style for better visibility
      center: MOROCCO_CENTER,
      zoom: 5,
      minZoom: 4,
      maxZoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add Morocco border when map loads
    map.current.on('load', () => {
      if (!map.current) return;
      setMapLoaded(true);
      
      // Create a bounding box for Morocco
      const bounds = [
        [MOROCCO_BOUNDS.west, MOROCCO_BOUNDS.south], // Southwest coordinates
        [MOROCCO_BOUNDS.east, MOROCCO_BOUNDS.north]  // Northeast coordinates
      ];
      
      // Fit the map to Morocco's bounds
      map.current.fitBounds(bounds as [[number, number], [number, number]], {
        padding: 50,
        duration: 1000
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return { mapContainer, map, mapLoaded };
};
