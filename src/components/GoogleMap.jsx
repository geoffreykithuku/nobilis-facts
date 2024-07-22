import {
  APIProvider,
  InfoWindow,
  Map,
  useMap,
  useMapsLibrary,
  Marker,
} from "@vis.gl/react-google-maps";

import { useEffect, useState, useRef } from "react";

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAP_ID;

const MyMap = () => {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [mode, setMode] = useState("DRIVING");

  const [waypoints, setWaypoints] = useState([]);

  const center = {
    lat: -1.286389,
    lng: 36.817223,
  };

  const handleOriginSelect = (place) => {
    if (place && place.geometry) {
      setOrigin({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleDestinationSelect = (place) => {
    if (place && place.geometry) {
      setDestination({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleWaypointSelect = (place) => {
    if (place && place.geometry) {
      setWaypoints((prevWaypoints) => [
        ...prevWaypoints,
        {
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          stopover: true,
        },
      ]);
    }
  };

  const removeWaypoint = (index) => {
    setWaypoints((prevWaypoints) =>
      prevWaypoints.filter((_, i) => i !== index)
    );
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-screen" id="map">
        <Map center={center} zoom={13} mapId={mapId}>
          <Directions
            origin={origin}
            destination={destination}
            mode={mode}
            waypoints={waypoints}
          />

          <div className="absolute top-10 left-0 m-4  bg-white p-4 rounded text-sm">
            <PlaceAutocomplete
              onPlaceSelect={handleOriginSelect}
              placeholder="Enter origin"
            />
            <PlaceAutocomplete
              onPlaceSelect={handleDestinationSelect}
              placeholder="Enter destination"
            />
            <WaypointAutocomplete
              onPlaceSelect={handleWaypointSelect}
              placeholder="Enter waypoint"
            />
            <div className="flex gap-5 mt-2">
              <button
                onClick={() => setMode("DRIVING")}
                className={`text-white py-2 px-3 rounded-lg ${
                  mode === "DRIVING" ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                Driving
              </button>
              <button
                onClick={() => setMode("WALKING")}
                className={`text-white py-2 px-3 rounded-lg ${
                  mode === "WALKING" ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                Walking
              </button>
            </div>
            {waypoints.map((waypoint, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <span>
                  {waypoint.location.lat}, {waypoint.location.lng}
                </span>
                <button
                  onClick={() => removeWaypoint(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {waypoints.map((waypoint, index) => (
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
      </div>
    </APIProvider>
  );
};

export default MyMap;

const Directions = ({ origin, destination, mode, waypoints }) => {
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
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    const request = {
      origin: origin,
      destination: destination,
      travelMode: mode,
      waypoints: waypoints,
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
        setRoutes(result.routes);
      }
    });
  }, [
    directionsService,
    directionsRenderer,
    origin,
    destination,
    mode,
    waypoints,
  ]);

  useEffect(
    () => {
      if (!directionsRenderer) return;

      directionsRenderer.setRouteIndex(routeIndex);
    },
    [routeIndex],
    directionsRenderer
  );

  if (!leg) return null;

  console.log(routes);
  return (
    <div className="directions absolute top-0 right-0 p-4 max-w-xl text-[#3c3c3c]">
      <div className="bg-white p-3 rounded w-full ">
        <h2 className="font-medium text-[#00000045]">
          {selectedRoute.summary}
        </h2>
        <p className="text-sm">
          {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
        </p>
        <p className="text-sm">
          Distance: {leg.distance?.text} Duration: {leg.duration?.text}
        </p>
        <h2 className="font-medium text-[#00000045]">Other Routes Available</h2>
        <ul className="space-y-2 list-disc pl-4">
          {routes.map((route, index) => (
            <li key={index} className="text-sm">
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

const PlaceAutocomplete = ({ onPlaceSelect, placeholder }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className=" rounded mb-2">
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none"
      />
    </div>
  );
};

const WaypointAutocomplete = ({ onPlaceSelect, placeholder }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className=" rounded mb-2">
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none"
      />
    </div>
  );
};
