import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const Navbar = () => {
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await axios.delete(
      "https://nobilis-back.onrender.com/logout"
    );

    if (response.status === 200) {
      localStorage.removeItem("user");
      toast.success("Logout successful");
      window.history.pushState({}, "", "/");
      window.location.reload();
    } else {
      toast.error("Logout failed");
    }
  };

  // check if user is loggedin

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          "https://nobilis-back.onrender.com/is_auth",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
  }, []);

  return (
    <div>
      <nav className="w-full flex justify-between items-center px-5 sm:px-10 md:px-20 py-5 bg-blue-500  text-white">
        <h2 className="">Nobilis Facts</h2>
        <ul className="flex items-center gap-6 sm:gap-12 justify-start ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout ({user.username})</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
