import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  useMap,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAP_ID;

const center = {
  lat: -1.286389,
  lng: 36.817223,
};

console.log(apiKey, mapId);

const MyMap = () => {
  const [open, setOpen] = useState(false);
  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-screen">
        <Map center={center} zoom={12} mapId={mapId}>
          <AdvancedMarker position={center} onClick={() => setOpen(true)}>
            <Pin
              background={"gray"}
              borderColor={"green"}
              glyphColor={"blue"}
            />
          </AdvancedMarker>

          <Directions />

          {open && (
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <div>
                <h1> I am a marker</h1>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MyMap;

const Directions = () => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);

  const selectedRoute = routes[routeIndex];
  const leg = selectedRoute?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const request = {
      origin: "Nairobi garage, Ngong Rd, Nairobi, Kenya",
      destination: "Railways Golf Club, Nairobi, Kenya",
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
        setRoutes(result.routes);
      }
    });
  }, [directionsService, directionsRenderer]);

  useEffect(
    () => {
      if (!directionsRenderer) return;

      directionsRenderer.setRouteIndex(routeIndex);
    },
    [routeIndex],
    directionsRenderer
  );

  if (!leg) return null;

  return (
    <div className="directions absolute top-0 right-0 p-4 max-w-xl">
      <div className="bg-white p-3 rounded-lg w-full ">
        <h2>{selectedRoute.summary}</h2>
        <p>
          {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
        </p>
        <p>
          Distance: {leg.distance?.text} Duration: {leg.duration?.text}
        </p>
        <h2>Other Routes Available</h2>
        <ul>
          {routes.map((route, index) => (
            <li key={index}>
              <button onClick={() => setRouteIndex(index)}>
                {route.summary}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
