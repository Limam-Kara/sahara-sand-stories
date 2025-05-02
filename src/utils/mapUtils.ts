
// Morocco bounds - focused on Morocco and the Sahara region
export const MOROCCO_BOUNDS = {
  north: 35.9, 
  south: 21.0,
  west: -17.0,
  east: -1.0
};

export const MOROCCO_CENTER: [number, number] = [-8.0, 28.5];

// City data for Morocco
export const MOROCCO_CITIES = [
  { name: "Rabat", coordinates: [-6.8498, 33.9716] },
  { name: "Casablanca", coordinates: [-7.5898, 33.5731] },
  { name: "Marrakech", coordinates: [-8.0083, 31.6295] },
  { name: "Fes", coordinates: [-4.9998, 34.0181] },
  { name: "Tangier", coordinates: [-5.8326, 35.7595] },
  { name: "Agadir", coordinates: [-9.5982, 30.4278] }
];

// Sahara region specific cities
export const SAHARA_CITIES = [
  { name: "Dakhla", coordinates: [-15.9374, 23.7136] },
  { name: "Laayoune", coordinates: [-13.2050, 27.1568] },
  { name: "Boujdour", coordinates: [-14.4860, 26.1221] },
  { name: "Smara", coordinates: [-11.6714, 26.7384] },
  { name: "Tan-Tan", coordinates: [-11.1004, 28.4380] }
];

// Combined list of cities to show on the map (only Morocco and Saharan cities)
export const MAP_CITIES = [...MOROCCO_CITIES, ...SAHARA_CITIES];

// Coordinates approximatives pour masquer la République Arabe Sahraouie Démocratique (RASD)
// Ces coordonnées définissent un polygone qui couvre la zone revendiquée par la RASD
export const RASD_POLYGON_COORDINATES: [number, number][] = [
  [27.7, -13.2], // Nord-ouest
  [27.7, -8.6],  // Nord-est
  [21.3, -8.6],  // Sud-est
  [21.3, -17.0], // Sud-ouest
  [27.7, -13.2]  // Fermer le polygone
];
