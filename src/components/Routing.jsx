import L from "leaflet";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

const Routing = ({ sourceCity, destinationCity }) => {
  const map = useMap();

  useEffect(() => {
    if (sourceCity.lat && destinationCity.lat) {
      map.setView([sourceCity.lat, sourceCity.lng], 13);
      L.Routing.control({
        waypoints: [
          L.latLng(sourceCity.lat, sourceCity.lng),
          L.latLng(destinationCity.lat, destinationCity.lng),
        ],
        lineOptions: {
          styles: [{ color: "#00f", weight: 4 }],
        },
      }).addTo(map);
    }
  }, [sourceCity, destinationCity]);

  return null;
};

export default Routing;
