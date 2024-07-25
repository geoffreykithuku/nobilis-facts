const routes = [
  {
    origin: { lat: -1.286389, lng: 36.817223 },
    destination: { lat: -1.292065, lng: 36.821946 },
    waypoints: [
      { location: { lat: -1.291042, lng: 36.821945 }, stopover: true },
      { location: { lat: -1.290018, lng: 36.821949 }, stopover: true },
    ],
  },
  {
    origin: { lat: -1.295847, lng: 36.821946 }, // Nairobi University
    destination: { lat: -1.305782, lng: 36.749579 }, // Sarit Expo Centre
    waypoints: [
      { location: { lat: -1.286678, lng: 36.821254 }, stopover: true }, // Uhuru Park
      { location: { lat: -1.298321, lng: 36.782279 }, stopover: true }, // Nairobi Railway Museum
    ],
  },
  {
    origin: { lat: -1.292005, lng: 36.821945 }, // Nairobi Railway Station
    destination: { lat: -1.286565, lng: 36.796427 }, // Westlands
    waypoints: [
      { location: { lat: -1.288218, lng: 36.817279 }, stopover: true }, // City Hall
      { location: { lat: -1.28388, lng: 36.821873 }, stopover: true }, // Nairobi Gallery
    ],
  },
  {
    origin: { lat: -1.305782, lng: 36.749579 }, // Sarit Expo Centre
    destination: { lat: -1.292066, lng: 36.82181 }, // KICC
    waypoints: [
      { location: { lat: -1.284025, lng: 36.818226 }, stopover: true }, // Nairobi National Park
      { location: { lat: -1.291042, lng: 36.821945 }, stopover: true }, // Nairobi National Museum
    ],
  },
];

export default routes;
