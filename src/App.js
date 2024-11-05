import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Gallery from "./components/Gallery";
import FormLogic from "./components/FormLogic";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/catalogo" element={<Gallery/>} />
        <Route path="/conocenos" element={<AboutUs />} />
        <Route path="/test" element={<FormLogic />} />
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;



