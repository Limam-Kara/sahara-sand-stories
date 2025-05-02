
import { useRef, useState, useEffect } from "react";
import { MOROCCO_BOUNDS } from "@/utils/mapUtils";

export const useLeafletMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Set map as loaded after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return { 
    mapLoaded,
    mapBounds: [
      [MOROCCO_BOUNDS.south, MOROCCO_BOUNDS.west], // Southwest coordinates
      [MOROCCO_BOUNDS.north, MOROCCO_BOUNDS.east]  // Northeast coordinates
    ] as [[number, number], [number, number]]
  };
};
