import { useState, useEffect } from "react";

const apiKey = "669630f65d673692297070iwa31b47b";

const LocationPicker = ({ onSourcePick, onDestinationPick }) => {
  return (
    <div className="bg-white max-w-[400px] text-sm">
      <div className="px-4 sm:px-10">
        <h1 className="text-2xl font-bold text-center mt-5 text-[#8f8f8f]">
          Set starting and ending points
        </h1>
        <SourcePicker onPick={onSourcePick} />
        <DestinationPicker onPick={onDestinationPick} />
      </div>
    </div>
  );
};

const SourcePicker = ({ onPick }) => {
  const [addresses, setAddresses] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${query}&api_key=${apiKey}`
      );
      const data = await response.json();
      setAddresses(data);
    };

    if (query.length > 0) {
      fetchLocations();
    }
  }, [query]);

  const handleSearch = () => {
    setQuery(source);
  };

  return (
    <div className="w-full my-5 flex-wrap gap-5 flex-row">
      <input
        type="search"
        placeholder="Set starting point"
        className="bg-[#eaeaea] px-5 py-2 rounded border-0 ring-0 outline-none w-full sm:w-[60%] mb-5 sm:mb-0"
        onChange={(e) => setSource(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-2 rounded-md ml-2"
      >
        Search
      </button>
      <div className="flex flex-col overflow-y-scroll max-h-[200px]">
        {addresses.map((address, index) => (
          <p
            onClick={() => {
              onPick(address);
              setAddresses([]);
            }}
            key={index}
            className="text-[#8f8f8f] mb-2 border cursor-pointer rounded-md p-2"
          >
            {address.display_name}
          </p>
        ))}
      </div>
    </div>
  );
};

const DestinationPicker = ({ onPick }) => {
  const [addresses, setAddresses] = useState([]);
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${query}&api_key=${apiKey}`
      );
      const data = await response.json();
      setAddresses(data);
    };

    if (query.length > 0) {
      fetchLocations();
    }
  }, [query]);

  const handleSearch = () => {
    setQuery(destination);
  };

  return (
    <div className="w-full my-5 flex-wrap gap-5 flex-row">
      <input
        type="search"
        placeholder="Set destination point"
        className="bg-[#eaeaea] px-5 py-2 rounded border-0 ring-0 outline-none w-full sm:w-[60%] mb-5 sm:mb-0"
        onChange={(e) => setDestination(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-2 rounded-md ml-2"
      >
        Search
      </button>
      <div className="flex flex-col overflow-y-scroll max-h-[200px]">
        {addresses.map((address, index) => (
          <p
            onClick={() => {
              onPick(address);
              setAddresses([]);
            }}
            key={index}
            className="text-[#8f8f8f] mb-2 border cursor-pointer rounded-md p-2"
          >
            {address.display_name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LocationPicker;
