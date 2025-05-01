
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLanguage } from "@/contexts/LanguageContext";

// This is a temporary token for development purposes
// In production, this should be stored securely in environment variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbDRyemYxMDUwN3U4M2RtcDdlcTA0aGg1In0.MCrj7OSu0AY_JdCGF9o4ww";

// Morocco bounds - approximate coordinates to focus on Morocco
const MOROCCO_BOUNDS = {
  north: 35.9, 
  south: 27.6,
  west: -17.5,
  east: -1.0
};

const MOROCCO_CENTER: [number, number] = [-7.09262, 31.7917];

const DesertMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { language } = useLanguage();

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

      // You could add Morocco GeoJSON border here if you have accurate data
      // For now, we'll just focus the map on the Morocco area
      
      // Add a marker for a few major cities in Morocco
      const cities = [
        { name: "Rabat", coordinates: [-6.8498, 33.9716] },
        { name: "Casablanca", coordinates: [-7.5898, 33.5731] },
        { name: "Marrakech", coordinates: [-8.0083, 31.6295] },
        { name: "Fes", coordinates: [-4.9998, 34.0181] },
        { name: "Tangier", coordinates: [-5.8326, 35.7595] },
        { name: "Agadir", coordinates: [-9.5982, 30.4278] },
        { name: "Dakhla", coordinates: [-15.9374, 23.7136] },
        { name: "Laayoune", coordinates: [-13.2050, 27.1568] }
      ];
      
      cities.forEach(city => {
        // Create a DOM element for the marker
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
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>${city.name}</h3>`)
          )
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

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative rounded-lg overflow-hidden shadow-md h-[500px]">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20">
            <div className="flex flex-col items-center gap-2 text-sahara-brown">
              <div className="h-8 w-8 animate-pulse bg-sahara-sand/50 rounded-full"></div>
              <p>Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapContainer} className="w-full h-full" />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm">
          <MapPin className="w-4 h-4 text-sahara-terracotta" />
          <span className="text-xs font-medium">
            {language === 'ar' ? 'المغرب' : language === 'fr' ? 'Maroc' : 'Morocco'}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default DesertMap;
