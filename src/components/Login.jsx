import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Login = () => {
  const { setUser, loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://nobilis-back.onrender.com/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setLoading(false);
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-[#eee] px-5 sm:px-10 md:px-20 py-20 text-blue-500">
      <form
        className="bg-white flex flex-col gap-5 rounded-md items-center justify-center max-w-[450px] p-6 mx-auto shadow-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="font-medium text-lg">Welcome back</h2>
        <input
          type="email"
          value={email}
          className="w-full rounded focus:outline-none border-b p-4 "
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full rounded focus:outline-none border-b p-4 "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 text-white py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
