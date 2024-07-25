import { useEffect, useRef, useState } from "react";

import { useMapsLibrary } from "@vis.gl/react-google-maps";

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

    return () => {
      placeAutocomplete.unbindAll();
    };
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

export default WaypointAutocomplete;
