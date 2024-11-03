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
