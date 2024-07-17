import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import LocationPicker from "./LocationPicker";

import { useState } from "react";

import Routing from "./Routing";

const CustomMap = () => {
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});

  const position = {
    lat: -1.2833,
    lng: 36.8167,
  };

  const onSourcePick = (value) => {
    const { lat, lon } = value;
    setSource({ lat: parseFloat(lat), lng: parseFloat(lon) });
  };

  const onDestinationPick = (value) => {
    const { lat, lon } = value;
    setDestination({ lat: parseFloat(lat), lng: parseFloat(lon) });
  };

  return (
    <div className="flex relative">
      <LocationPicker
        onSourcePick={onSourcePick}
        onDestinationPick={onDestinationPick}
      />

      <div id="map" className="h-[100vh] w-[70%] absolute right-0 ">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%", position: "relative" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Routing sourceCity={source} destinationCity={destination} />
        </MapContainer>
      </div>
    </div>
  );
};

export default CustomMap;
