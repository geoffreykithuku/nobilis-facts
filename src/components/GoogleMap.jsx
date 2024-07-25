import {
  APIProvider,
  InfoWindow,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

import Directions from "./Directions";
import PlaceAutocomplete from "./PlaceAutocomplete";
import WaypointAutocomplete from "./WaypointAutocomplete";

import { useState } from "react";
import routes from "./data.js";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAP_ID;

const MyMap = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [open, setOpen] = useState(false);

  const handleRouteSelect = async (route) => {
    setSelectedRoute(route);
  };

  const center = selectedRoute
    ? {
        lat: selectedRoute.origin.lat,
        lng: selectedRoute.origin.lng,
      }
    : { lat: -1.286389, lng: 36.817223 }; // Default center if no route selected

  return (
    <div className="h-screen">
      <APIProvider apiKey={apiKey}>
        <Map
          center={center}
          defaultZoom={13}
          zoomControl={true}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={mapId}
        >
          {selectedRoute && (
            <Directions
              origin={selectedRoute.origin}
              destination={selectedRoute.destination}
              mode="DRIVING" // You can make this dynamic as needed
              waypoints={selectedRoute.waypoints}
            />
          )}

          <div className="absolute top-10 left-0 m-4 bg-white p-4 rounded text-sm">
            <h2 className="text-lg font-semibold">Select Route</h2>
            <ul>
              {routes.map((route, index) => (
                <li key={index} className="flex gap-2">
                  <button
                    onClick={() => handleRouteSelect(route)}
                    className="text-white bg-blue-500 px-2 py-1 rounded-lg"
                  >
                    Route {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {selectedRoute &&
            selectedRoute.waypoints.map((waypoint, index) => (
              <Marker
                key={index}
                position={waypoint.location}
                title={`Waypoint ${index + 1}`}
              />
            ))}

          {open && (
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <div>
                <h1> I am a marker</h1>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MyMap;
