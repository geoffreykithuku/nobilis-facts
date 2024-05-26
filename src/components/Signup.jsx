import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }
    const user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    axios
      .post("https://nobilis-back.onrender.com/signup", { user })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid email or password");
        console.log(error);
      });
  };
  return (
    <div className="h-screen bg-[#eee] px-5 sm:px-10 md:px-20 py-14 text-blue-500">
      <form
        className="bg-white flex flex-col gap-5 rounded-md items-center justify-center max-w-[450px] p-6 mx-auto shadow-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="font-medium text-lg">Create an account with us</h2>
        <input
          type="text"
          value={username}
          className="w-full rounded focus:outline-none border-b p-4 "
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
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
        <input
          className="w-full rounded focus:outline-none border-b p-4 "
          type="password_confirmation"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Password confirmation"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 text-white py-2"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
