import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Barra de navegación aquí */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/conocenos" element={<AboutUs />} />
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;


