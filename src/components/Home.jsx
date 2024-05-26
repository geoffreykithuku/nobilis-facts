import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);

 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">
        Welcome, <span>{user?.username}</span>
      </h1>

      <Link to='/facts' className="mt-5 px-5 py-2 text-white bg-blue-500 shadow-md rounded">
        Fetch facts
      </Link>
    </div>
  );
};

export default Home;
