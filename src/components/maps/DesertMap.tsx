
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLanguage } from "@/contexts/LanguageContext";

// This is a temporary token for development purposes
// In production, this should be stored securely in environment variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbDRyemYxMDUwN3U4M2RtcDdlcTA0aGg1In0.MCrj7OSu0AY_JdCGF9o4ww";

// Define location coordinates for the map
const locations = [
  { name: "Merzouga", coordinates: [-4.0148, 31.0902], description: "Dunes de l'Erg Chebbi" },
  { name: "M'hamid El Ghizlane", coordinates: [-5.7236, 29.8267], description: "Porte du désert" },
  { name: "Vallée du Draa", coordinates: [-6.0667, 30.3333], description: "Plus grande palmeraie" },
  { name: "Tamegroute", coordinates: [-5.6706, 30.2922], description: "Bibliothèque coranique" },
  { name: "Zagora", coordinates: [-5.8384, 30.3324], description: "52 jours à Tombouctou" }
];

// Define TypeScript types
type LocationCoordinates = [number, number];
interface Location {
  name: string;
  coordinates: LocationCoordinates;
  description: string;
}

const DesertMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { language } = useLanguage();

  const getLocationDescription = (name: string, description: string): string => {
    if (language === 'fr') {
      return `${name}: ${description}`;
    } else if (language === 'ar') {
      // Simplified Arabic translations
      const arDescriptions: Record<string, string> = {
        "Merzouga": "كثبان العرق الشرقي",
        "M'hamid El Ghizlane": "بوابة الصحراء",
        "Vallée du Draa": "أكبر واحة نخيل",
        "Tamegroute": "المكتبة القرآنية",
        "Zagora": "52 يوما إلى تمبكتو"
      };
      return `${name}: ${arDescriptions[name] || description}`;
    }
    // Default to English
    const enDescriptions: Record<string, string> = {
      "Merzouga": "Erg Chebbi Dunes",
      "M'hamid El Ghizlane": "Gateway to the desert",
      "Vallée du Draa": "Largest palm grove",
      "Tamegroute": "Koranic Library",
      "Zagora": "52 days to Timbuktu"
    };
    return `${name}: ${enDescriptions[name] || description}`;
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-5.5, 30.5] as LocationCoordinates, // Type assertion to fix TypeScript error
      zoom: 5.5,
      projection: "globe" as mapboxgl.Projection // Use the correct type for projection
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      if (!map.current) return;
      
      setMapLoaded(true);
      
      // Add custom styling for the satellite map
      map.current.setFog({
        'color': 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2
      });
      
      // Add markers for each location
      locations.forEach((location) => {
        if (!map.current) return;
        
        // Create a marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'flex items-center justify-center w-6 h-6 bg-sahara-orange rounded-full border-2 border-white cursor-pointer';
        markerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
        
        // Create popup with location information
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3 class="text-sm font-bold">${location.name}</h3>
           <p class="text-xs">${getLocationDescription(location.name, location.description)}</p>`
        );
        
        // Add marker to map with properly typed coordinates
        new mapboxgl.Marker(markerEl)
          .setLngLat(location.coordinates as LocationCoordinates)
          .setPopup(popup)
          .addTo(map.current);
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update popup content when language changes
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Remove existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    // Re-add markers with updated language
    locations.forEach(location => {
      if (!map.current) return;
      
      const markerEl = document.createElement('div');
      markerEl.className = 'flex items-center justify-center w-6 h-6 bg-sahara-orange rounded-full border-2 border-white cursor-pointer';
      markerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="text-sm font-bold">${location.name}</h3>
         <p class="text-xs">${getLocationDescription(location.name, location.description)}</p>`
      );
      
      new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates as LocationCoordinates)
        .setPopup(popup)
        .addTo(map.current);
    });
  }, [language, mapLoaded]);

  return (
    <Card className="relative rounded-lg overflow-hidden shadow-md">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20">
          <div className="flex flex-col items-center gap-2 text-sahara-brown">
            <Globe className="h-8 w-8 animate-pulse" />
            <p>Loading map...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-[400px]"
      />
    </Card>
  );
};

export default DesertMap;
