import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Header2 from "./Components/Header2/Header2";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import FoodDonors from "./Pages/Food-Donors/FoodDonors";
import Charities from "./Pages/Charities/Charities";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";

import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const showHeader2 =
    location.pathname === "/signup" || location.pathname === "/login";
  return (
    <div className="App">
      {showHeader2 ? <Header2 /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-donors" element={<FoodDonors />} />
        <Route path="/charities" element={<Charities />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/about"></Route>
        <Route path="/volunteer"></Route>
        <Route path="/contact"></Route>
      </Routes>
      {!showHeader2 && <Footer />}
    </div>
  );
}

export default App;
