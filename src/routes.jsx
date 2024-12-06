import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ContactUs from "./pages/ContactUS";
import Inquiry from "./pages/Inquiry";
import Career from "./pages/Career";
import Service from "./pages/Service";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/inquiry' element={<Inquiry />} />
        <Route path='/career' element={<Career />} />
        <Route path='/services' element={<Service />} />
        <Route path='/events' element={<Events />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='*' element={<Home />} />

        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
