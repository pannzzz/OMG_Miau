import React, { useState } from 'react';
import CatBreeds from './components/Gallery';
import Test from './components/Test';
import './App.css';

function App() {
  const [showTest, setShowTest] = useState(false);

  const handleToggle = () => {
    setShowTest(!showTest);
  };

  return (
    <div className="App">
      <button onClick={handleToggle} className="toggle-button">
        {showTest ? 'Volver a Galería de Gatos' : 'Encuentra tu Gato Ideal'}
      </button>
      
      {showTest ? <Test onResults={(results) => console.log(results)} /> : <CatBreeds />}
    </div>
  );
}

export default App;
