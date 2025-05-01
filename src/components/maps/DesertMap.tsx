
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Globe, MapPin, AlertCircle } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Default token - will be replaced by user's token
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

// Define location coordinates for the map - Sahrawi cities and significant locations
const locations = [
  { name: "Laayoune", coordinates: [-13.1990, 27.1536], description: "La plus grande ville du Sahara occidental" },
  { name: "Dakhla", coordinates: [-15.9378, 23.6848], description: "Ville côtière avec une péninsule spectaculaire" },
  { name: "Smara", coordinates: [-11.6719, 26.7384], description: "Ville historique avec une zaouia ancienne" },
  { name: "Boujdour", coordinates: [-14.4933, 26.1221], description: "Port de pêche important" },
  { name: "Tindouf", coordinates: [-8.1276, 27.6741], description: "Abrite des camps de réfugiés sahraouis" },
  { name: "Tifariti", coordinates: [-10.5969, 26.1568], description: "Centre culturel et politique" },
  { name: "Aousserd", coordinates: [-14.3266, 22.5503], description: "Région administrative sahraouie" }
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
  const [mapError, setMapError] = useState<string | null>(null);
  const { language } = useLanguage();
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem('mapbox-token') || DEFAULT_MAPBOX_TOKEN
  );
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [tokenInput, setTokenInput] = useState(mapboxToken);

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

  const saveToken = () => {
    localStorage.setItem('mapbox-token', tokenInput);
    setMapboxToken(tokenInput);
    setShowTokenForm(false);
    setMapError(null);
    
    // Remove existing map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    setMapLoaded(false);
    
    // Initialize map with new token
    initializeMap();
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-12.5, 25.0] as LocationCoordinates, // Centered on Western Sahara region
        zoom: 4.5,
        projection: { name: 'globe' } 
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        if (!map.current) return;
        
        setMapLoaded(true);
        setMapError(null);
        
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
          markerEl.className = 'flex items-center justify-center w-6 h-6 bg-sahara-terracotta rounded-full border-2 border-white cursor-pointer';
          markerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
          
          // Create popup with location information
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="text-sm font-bold">${location.name}</h3>
             <p class="text-xs">${getLocationDescription(location.name, location.description)}</p>`
          );
          
          // Add marker to map
          new mapboxgl.Marker(markerEl)
            .setLngLat(location.coordinates as LocationCoordinates)
            .setPopup(popup)
            .addTo(map.current);
        });
      });

      // Handle errors
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError("Erreur de chargement de la carte. Veuillez vérifier votre token Mapbox.");
        
        // If we get an error loading the map, we should try a different style
        if (!mapLoaded && map.current) {
          map.current.setStyle('mapbox://styles/mapbox/outdoors-v12');
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError("Erreur d'initialisation de la carte");
    }
  };

  useEffect(() => {
    initializeMap();

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
      markerEl.className = 'flex items-center justify-center w-6 h-6 bg-sahara-terracotta rounded-full border-2 border-white cursor-pointer';
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
        <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20 z-10">
          <div className="flex flex-col items-center gap-2 text-sahara-brown">
            {mapError ? (
              <>
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="text-center text-red-500">{mapError}</p>
                <Button 
                  variant="outline"
                  onClick={() => setShowTokenForm(true)}
                  className="mt-2"
                >
                  {language === 'ar' ? 'تحديث رمز Mapbox' : 
                   language === 'fr' ? 'Mettre à jour le token Mapbox' : 
                   'Update Mapbox token'}
                </Button>
              </>
            ) : (
              <>
                <Globe className="h-8 w-8 animate-pulse" />
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
      
      {showTokenForm && (
        <div className="absolute inset-0 z-20 bg-white/95 dark:bg-sahara-brown/95 backdrop-blur-sm p-4 flex flex-col items-center justify-center">
          <div className="max-w-md w-full bg-white dark:bg-sahara-brown/90 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {language === 'ar' ? 'أدخل رمز Mapbox الخاص بك' : 
               language === 'fr' ? 'Entrez votre token Mapbox' : 
               'Enter your Mapbox token'}
            </h3>
            <p className="text-sm mb-4">
              {language === 'ar' ? 'للحصول على رمز Mapbox، قم بالتسجيل في mapbox.com وابحث عن رمزك في قسم الرموز في لوحة المعلومات.' :
               language === 'fr' ? 'Pour obtenir un token Mapbox, inscrivez-vous sur mapbox.com et trouvez votre token dans la section Tokens du tableau de bord.' :
               'To get a Mapbox token, sign up at mapbox.com and find your token in the Tokens section of the dashboard.'}
            </p>
            <Input
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEi..."
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowTokenForm(false)}>
                {language === 'ar' ? 'إلغاء' : 
                 language === 'fr' ? 'Annuler' : 
                 'Cancel'}
              </Button>
              <Button onClick={saveToken} disabled={!tokenInput || tokenInput.length < 20}>
                {language === 'ar' ? 'حفظ' : 
                 language === 'fr' ? 'Sauvegarder' : 
                 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-[400px]"
      />
      <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-sahara-brown/80 px-3 py-2 rounded-md text-xs flex items-center">
        <MapPin className="h-3 w-3 mr-1" />
        <span>{language === 'ar' ? 'المدن الصحراوية' : language === 'fr' ? 'Villes sahraouies' : 'Sahrawi cities'}</span>
      </div>
      
      {mapLoaded && (
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-2 right-2 bg-white/70 hover:bg-white/90 text-xs p-1 h-auto"
          onClick={() => setShowTokenForm(true)}
        >
          {language === 'ar' ? 'تغيير الرمز' : 
           language === 'fr' ? 'Changer token' : 
           'Change token'}
        </Button>
      )}
    </Card>
  );
};

export default DesertMap;
