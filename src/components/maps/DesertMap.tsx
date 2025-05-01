import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLanguage } from "@/contexts/LanguageContext";

// This is a temporary token for development purposes
// In production, this should be stored securely in environment variables
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbDRyemYxMDUwN3U4M2RtcDdlcTA0aGg1In0.MCrj7OSu0AY_JdCGF9o4ww";

// Define Sahrawi regions with GeoJSON data
const regions = [{
  id: "laayoune",
  name: "Laâyoune-Sakia El Hamra",
  center: [-13.2050, 27.1568] as [number, number],
  color: "#D7713D",
  stats: {
    population: 367758,
    area: 140018,
    cities: 8,
    description: "Region with important phosphate deposits"
  },
  // Simplified polygon for the region
  polygon: [[-13.5, 26.7], [-12.8, 26.7], [-12.3, 27.2], [-12.1, 28.0], [-13.0, 28.4], [-13.6, 27.8], [-13.5, 26.7]] as [number, number][]
}, {
  id: "dakhla",
  name: "Dakhla-Oued Ed-Dahab",
  center: [-15.9374, 23.7136] as [number, number],
  color: "#BA5536",
  stats: {
    population: 142955,
    area: 130898,
    cities: 6,
    description: "Region with rich maritime resources"
  },
  // Simplified polygon for the region
  polygon: [[-17.0, 25.5], [-15.5, 25.5], [-14.8, 24.5], [-14.8, 22.5], [-16.0, 21.2], [-17.0, 21.8], [-17.0, 25.5]] as [number, number][]
}, {
  id: "guelmim",
  name: "Guelmim-Oued Noun",
  center: [-10.0569, 28.9870] as [number, number],
  color: "#5D4037",
  stats: {
    population: 433757,
    area: 46108,
    cities: 12,
    description: "Gateway to the Sahara Desert"
  },
  // Simplified polygon for the region
  polygon: [[-11.5, 27.8], [-10.2, 27.8], [-9.5, 28.5], [-9.8, 29.6], [-10.5, 30.1], [-11.8, 29.8], [-11.5, 27.8]] as [number, number][]
}, {
  id: "souss",
  name: "Souss-Massa",
  center: [-9.1384, 30.4198] as [number, number],
  color: "#E6CCB2",
  stats: {
    population: 2676847,
    area: 53789,
    cities: 16,
    description: "Agricultural and tourism region"
  },
  // Simplified polygon for the region
  polygon: [[-10.5, 30.1], [-9.5, 29.8], [-8.8, 30.2], [-8.5, 31.1], [-9.2, 31.5], [-10.3, 31.2], [-10.5, 30.1]] as [number, number][]
}];

// Define TypeScript types
type Coordinates = [number, number];
type Polygon = Coordinates[];
interface RegionStats {
  population: number;
  area: number;
  cities: number;
  description: string;
}
interface Region {
  id: string;
  name: string;
  center: Coordinates;
  color: string;
  stats: RegionStats;
  polygon: Polygon;
}

// Convert regions to proper typed regions
const typedRegions: Region[] = regions.map(region => ({
  ...region,
  center: region.center as Coordinates,
  polygon: region.polygon as Polygon
}));
const DesertMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const {
    language
  } = useLanguage();
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  const getTranslatedDescription = (region: Region): string => {
    const {
      id
    } = region;
    if (language === 'fr') {
      const frDescriptions: Record<string, string> = {
        "laayoune": "Région avec d'importants gisements de phosphate",
        "dakhla": "Région avec de riches ressources maritimes",
        "guelmim": "Porte d'entrée vers le désert du Sahara",
        "souss": "Région agricole et touristique"
      };
      return frDescriptions[id] || region.stats.description;
    } else if (language === 'ar') {
      const arDescriptions: Record<string, string> = {
        "laayoune": "منطقة ذات رواسب فوسفات مهمة",
        "dakhla": "منطقة غنية بالموارد البحرية",
        "guelmim": "بوابة إلى صحراء الصحراء الكبرى",
        "souss": "منطقة زراعية وسياحية"
      };
      return arDescriptions[id] || region.stats.description;
    }
    return region.stats.description;
  };
  const getTranslatedLabels = (): Record<string, string> => {
    if (language === 'fr') {
      return {
        population: "Population",
        area: "Superficie (km²)",
        cities: "Villes",
        clickRegion: "Cliquez sur une région pour voir ses statistiques"
      };
    } else if (language === 'ar') {
      return {
        population: "السكان",
        area: "المساحة (كم²)",
        cities: "المدن",
        clickRegion: "انقر على منطقة لرؤية إحصائياتها"
      };
    }
    // English default
    return {
      population: "Population",
      area: "Area (km²)",
      cities: "Cities",
      clickRegion: "Click on a region to see its statistics"
    };
  };
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      // Use light style instead of satellite for better region visibility
      center: [-12.0, 26.5] as Coordinates,
      zoom: 5,
      minZoom: 4,
      maxZoom: 9
    });
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.on('load', () => {
      if (!map.current) return;
      setMapLoaded(true);

      // Add region polygons
      typedRegions.forEach(region => {
        if (!map.current) return;

        // Convert the simple polygon to GeoJSON format
        const polygonGeoJSON = {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [region.polygon]
          },
          'properties': {
            'name': region.name,
            'id': region.id
          }
        };

        // Add the region as a source
        map.current.addSource(region.id, {
          'type': 'geojson',
          'data': polygonGeoJSON as any
        });

        // Add the fill layer for the region
        map.current.addLayer({
          'id': `${region.id}-fill`,
          'type': 'fill',
          'source': region.id,
          'layout': {},
          'paint': {
            'fill-color': region.color,
            'fill-opacity': 0.5
          }
        });

        // Add the outline layer for the region
        map.current.addLayer({
          'id': `${region.id}-line`,
          'type': 'line',
          'source': region.id,
          'layout': {},
          'paint': {
            'line-color': region.color,
            'line-width': 2
          }
        });

        // Add region name label
        map.current.addLayer({
          'id': `${region.id}-label`,
          'type': 'symbol',
          'source': region.id,
          'layout': {
            'text-field': region.name,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-transform': 'uppercase',
            'text-letter-spacing': 0.05,
            'text-offset': [0, 0]
          },
          'paint': {
            'text-color': '#333',
            'text-halo-color': '#fff',
            'text-halo-width': 2
          }
        });

        // Add hover effect
        map.current.on('mouseenter', `${region.id}-fill`, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
            map.current.setPaintProperty(`${region.id}-fill`, 'fill-opacity', 0.7);
          }
        });
        map.current.on('mouseleave', `${region.id}-fill`, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
            map.current.setPaintProperty(`${region.id}-fill`, 'fill-opacity', 0.5);
          }
        });

        // Click event to show region stats
        map.current.on('click', `${region.id}-fill`, () => {
          // Use the typed region from typedRegions instead of the original regions array
          const selectedTypedRegion = typedRegions.find(r => r.id === region.id);
          if (selectedTypedRegion) {
            setSelectedRegion(selectedTypedRegion);

            // Fly to the region with properly typed coordinates
            if (map.current) {
              map.current.flyTo({
                center: selectedTypedRegion.center,
                zoom: 6.5,
                duration: 2000
              });
            }
          }
        });
      });
    });
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update translations when language changes
  useEffect(() => {
    if (selectedRegion) {
      // Force a re-render to update translations
      setSelectedRegion({
        ...selectedRegion
      });
    }
  }, [language]);
  const labels = getTranslatedLabels();
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-md h-[500px]">
        {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-sahara-sand/20">
            <div className="flex flex-col items-center gap-2 text-sahara-brown">
              <div className="h-8 w-8 animate-pulse bg-sahara-sand/50 rounded-full"></div>
              <p>Loading map...</p>
            </div>
          </div>}
        <div ref={mapContainer} className="w-full h-full" />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow-sm">
          <Layers className="w-4 h-4 text-sahara-terracotta" />
          <span className="text-xs font-medium">{language === 'ar' ? 'مناطق' : language === 'fr' ? 'Régions' : 'Regions'}</span>
        </div>
      </Card>

      
    </div>;
};
export default DesertMap;