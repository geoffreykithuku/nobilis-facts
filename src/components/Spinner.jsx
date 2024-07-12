import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen text-blue-500">
      <PacmanLoader color="#3b82f6"  />
    </div>
  );
};

export default Spinner;
