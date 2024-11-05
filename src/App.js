import React, { useState } from 'react';
import CatBreeds from './components/Gallery';
import Form from './components/Form';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [breeds, setBreeds] = useState([]);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="App">
      <button onClick={handleToggle} className="toggle-button">
        {showForm ? 'Volver a Galería de Gatos' : 'Encuentra tu Gato Ideal'}
      </button>
      
      {showForm ? <Form breeds={breeds} setBreeds={setBreeds} onResults={(results) => console.log(results)} /> : <CatBreeds breeds={breeds} setBreeds={setBreeds}/>}
    </div>
  );
}

export default App;

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import AboutUs from "./components/AboutUs";
// import Navbar from "./components/Navbar";
// import NotFound from "./components/NotFound";
// import Gallery from "./components/Gallery";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/inicio" element={<Home />} />
//         <Route path="/catalogo" element={<Gallery/>} />
//         <Route path="/conocenos" element={<AboutUs />} />
//         <Route path="*" element={<NotFound/>} />

//       </Routes>
//     </Router>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// export default App;