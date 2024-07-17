import SourcePicker from "./SourcePicker";
import DestinationPicker from "./DestinationPicker";

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

export default LocationPicker;
