
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define location coordinates for the map - Sahrawi cities and significant locations
const locations = [
  { name: "Laayoune", coordinates: [27.1536, -13.1990] as [number, number], description: "La plus grande ville du Sahara occidental" },
  { name: "Dakhla", coordinates: [23.6848, -15.9378] as [number, number], description: "Ville côtière avec une péninsule spectaculaire" },
  { name: "Smara", coordinates: [26.7384, -11.6719] as [number, number], description: "Ville historique avec une zaouia ancienne" },
  { name: "Boujdour", coordinates: [26.1221, -14.4933] as [number, number], description: "Port de pêche important" },
  { name: "Tindouf", coordinates: [27.6741, -8.1276] as [number, number], description: "Abrite des camps de réfugiés sahraouis" },
  { name: "Tifariti", coordinates: [26.1568, -10.5969] as [number, number], description: "Centre culturel et politique" },
  { name: "Aousserd", coordinates: [22.5503, -14.3266] as [number, number], description: "Région administrative sahraouie" }
];

// Define TypeScript types
interface Location {
  name: string;
  coordinates: [number, number];
  description: string;
}

// Fix Leaflet icon issue
const fixLeafletIcon = () => {
  // Fix for default icon images
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

// Create custom marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-pin bg-sahara-terracotta rounded-full border-2 border-white flex items-center justify-center" style="width: 24px; height: 24px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const DesertMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    fixLeafletIcon();
    
    // Initialize map only if container exists and map hasn't been initialized
    if (mapContainerRef.current && !mapInstanceRef.current) {
      try {
        // Create map instance
        const map = L.map(mapContainerRef.current).setView([25.0, -12.5], 4);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add markers for each location
        locations.forEach((location) => {
          const marker = L.marker(location.coordinates, { icon: createCustomIcon() })
            .addTo(map);
          
          // Create popup content
          const popupContent = document.createElement('div');
          popupContent.className = 'text-sm';
          
          const title = document.createElement('h3');
          title.className = 'font-bold';
          title.textContent = location.name;
          
          const description = document.createElement('p');
          description.textContent = getLocationDescription(location.name, location.description);
          
          popupContent.appendChild(title);
          popupContent.appendChild(description);
          
          // Bind popup to marker
          marker.bindPopup(popupContent);
        });
        
        // Store map instance in ref
        mapInstanceRef.current = map;
        setMapLoaded(true);
        setMapError(null);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Erreur de chargement de la carte");
        setMapLoaded(false);
      }
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const getLocationDescription = (name: string, description: string): string => {
    if (language === 'fr') {
      return `${name}: ${description}`;
    } else if (language === 'ar') {
      // Simplified Arabic translations
      const arDescriptions: Record<string, string> = {
        "Laayoune": "أكبر مدينة في الصحراء الغربية",
        "Dakhla": "مدينة ساحلية ذات شبه جزيرة مذهلة",
        "Smara": "مدينة تاريخية بها زاوية قديمة",
        "Boujdour": "ميناء صيد مهم",
        "Tindouf": "تستضيف مخيمات اللاجئين الصحراويين",
        "Tifariti": "مركز ثقافي وسياسي",
        "Aousserd": "منطقة إدارية صحراوية"
      };
      return `${name}: ${arDescriptions[name] || description}`;
    }
    // Default to English
    const enDescriptions: Record<string, string> = {
      "Laayoune": "Largest city in Western Sahara",
      "Dakhla": "Coastal city with a spectacular peninsula",
      "Smara": "Historic city with an ancient zawiya",
      "Boujdour": "Important fishing port",
      "Tindouf": "Hosts Sahrawi refugee camps",
      "Tifariti": "Cultural and political center",
      "Aousserd": "Sahrawi administrative region"
    };
    return `${name}: ${enDescriptions[name] || description}`;
  };

  return (
    <Card className="relative rounded-lg overflow-hidden shadow-md">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20 z-10">
          <div className="flex flex-col items-center gap-2 text-sahara-brown">
            {mapError ? (
              <>
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="text-center text-red-500">{mapError}</p>
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="mt-2"
                >
                  {language === 'ar' ? 'إعادة تحميل الخريطة' : 
                   language === 'fr' ? 'Recharger la carte' : 
                   'Reload map'}
                </Button>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p>
                  {language === 'ar' ? 'تحميل الخريطة...' : 
                   language === 'fr' ? 'Chargement de la carte...' : 
                   'Loading map...'}
                </p>
                <Skeleton className="h-4 w-48 rounded-full mt-2" />
              </>
            )}
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px]"
        style={{ zIndex: 0 }}
      />
      
      <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-sahara-brown/80 px-3 py-2 rounded-md text-xs flex items-center">
        <MapPin className="h-3 w-3 mr-1" />
        <span>{language === 'ar' ? 'المدن الصحراوية' : language === 'fr' ? 'Villes sahraouies' : 'Sahrawi cities'}</span>
      </div>
    </Card>
  );
};

export default DesertMap;
