import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await axios.delete(
      "https://nobilis-back.onrender.com/logout"
    );

    if (response.status === 200) {
      localStorage.removeItem("user");
      toast.success("Logout successful");
    }
  };

  console.log(user);

  return (
    <div>
      <nav className="w-full flex justify-between items-center px-5 sm:px-10 md:px-20 py-5 bg-blue-500  text-white">
        <h2 className="">Nobilis Facts</h2>
        <ul className="flex items-center gap-6 sm:gap-12 justify-start ">
          <li>
            <Link to="/">Home</Link>
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
