
import React from "react";
import mapboxgl from "mapbox-gl";

interface CityMarkerProps {
  city: { name: string; coordinates: number[] };
  map: mapboxgl.Map;
}

const CityMarker = ({ city, map }: CityMarkerProps) => {
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
    .addTo(map);
  
  return null; // This component doesn't render anything directly
};

export default CityMarker;
