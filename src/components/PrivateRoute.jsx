import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
  const { user } = useContext(UserContext) || localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? <Outlet /> : null;
};

export default PrivateRoute;
