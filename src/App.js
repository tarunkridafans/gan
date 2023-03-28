import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./Components/Header/Header";
import Header2 from "./Components/Header2/Header2";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import FoodDonors from "./Pages/Food-Donors/FoodDonors";
import Charities from "./Pages/Charities/Charities";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import CharitiesDashboard from "./Pages/Charities-Dashboard/CharitiesDashboard";
import FoodDonorsDashboard from "./Pages/Food-Donors-Dashboard/FoodDonorsDashboard";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

import { useLocation } from "react-router-dom";
import Inside from "./Pages/Inside/Inside";
import Header3 from "./Components/Header3/Header3";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });
  const location = useLocation();
  const showHeader2 =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot" ||
    location.pathname === "/admin";
  let showHeader3 =
    location.pathname === "/foodDonorDashboard" ||
    location.pathname === "/charitiesDashboard" ||
    location.pathname === "/adminDashboard";
  return (
    <div className="App">
      {showHeader2 ? (
        <Header2 />
      ) : showHeader3 ? (
        <Header3 user={user} />
      ) : (
        <Header />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-donors" element={<FoodDonors />} />
        <Route path="/charities" element={<Charities />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/about"></Route>
        <Route path="/volunteer"></Route>
        <Route path="/contact"></Route>
        <Route path="*" element={<h1>No route found</h1>} />
        //loggedin route
        {user && (
          <>
            <Route path="/inside" element={<Inside user={user} />}></Route>
            <Route
              path="/foodDonorDashboard"
              element={<FoodDonorsDashboard user={user} />}
            ></Route>
            <Route
              path="/charitiesDashboard"
              element={<CharitiesDashboard user={user} />}
            ></Route>

            <Route
              path="/adminDashboard"
              element={<AdminDashboard user={user} />}
            ></Route>
          </>
        )}
      </Routes>
      <ToastContainer />
      {!showHeader3 && !showHeader2 && <Footer />}
    </div>
  );
}

export default App;
