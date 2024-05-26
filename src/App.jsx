import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Facts from "./components/Facts";
import PrivateRoute from "./components/PrivateRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/facts" element={<Facts />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
