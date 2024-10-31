import React, { useState, useEffect } from 'react';
import '../styles/Test.css';

function Test() {
  const [answers, setAnswers] = useState({
    
    energy_level: '',
    child_friendly: '',
    hypoallergenic: false,

  });
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState(null); // Para guardar los resultados del filtro.
  const [loading, setLoading] = useState(true);

  const API_KEY = 'TU_CLAVE_API';

  useEffect(() => {

    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=50', {
          headers: {
            'x-api-key': API_KEY
          }
        });
        const data = await response.json();
        setBreeds(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [API_KEY]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = () => {
    const results = breeds.filter((breed) => {
      // Filtro para "Amigable con niños".
      let childFriendlyMatch = true;
      if (answers.child_friendly === "1") {
        childFriendlyMatch = breed.child_friendly >= 0 && breed.child_friendly <= 2;
      } else if (answers.child_friendly === "3") {
        childFriendlyMatch = breed.child_friendly >= 2 && breed.child_friendly <= 4;
      } else if (answers.child_friendly === "5") {
        childFriendlyMatch = breed.child_friendly >= 4 && breed.child_friendly <= 6;
      }
  
      // Filtro para "Nivel de energía".
      const energyLevelMatch = !answers.energy_level || 
        (breed.energy_level >= answers.energy_level - 1 && breed.energy_level <= answers.energy_level + 1);
  
      // Filtro para "Hipoalergénico".
      let hypoallergenicMatch = true;
      if (answers.hypoallergenic === "true") {
        hypoallergenicMatch = breed.hypoallergenic === 1;
      } else if (answers.hypoallergenic === "false") {
        hypoallergenicMatch = breed.hypoallergenic === 0;
      }
  
      return energyLevelMatch && childFriendlyMatch && hypoallergenicMatch;
    });
  
    setFilteredBreeds(results);
  };
  


  if (loading) return <p>Cargando opciones de gatos...</p>;

  return (
    <div className="test-container">
      <h2>Encuentra tu Gato Ideal</h2>
      {filteredBreeds ? (
        <div className="results-container">
          <h3>Resultados de tu búsqueda</h3>
          {filteredBreeds.length > 0 ? (
            filteredBreeds.map((breed) => (
              <div key={breed.id} className="breed-card">
                <h4>{breed.name}</h4>
                <p><strong>Descripción:</strong> {breed.description}</p>
                <p><strong>Temperamento:</strong> {breed.temperament}</p>
                <p><strong>Esperanza de vida:</strong> {breed.life_span} años</p>
                {breed.image && (
                  <img src={breed.image.url} alt={breed.name} className="breed-image" />
                )}
              </div>
            ))
          ) : (
            <p>No se encontraron gatos que coincidan con tus preferencias.</p>
          )}
          <button onClick={() => setFilteredBreeds(null)}>Realizar el test de nuevo</button>
        </div>
      ) : (
        <div className="questions-container">
          <label>
            Nivel de energía:
            <select name="energy_level" value={answers.energy_level} onChange={handleChange}>
              <option value="">No importa</option>
              <option value="1">Bajo</option>
              <option value="3">Moderado</option>
              <option value="5">Alto</option>
            </select>
          </label>
          <label>
            Amigable con niños:
            <select name="child_friendly" value={answers.child_friendly} onChange={handleChange}>
              <option value="">No importa</option>
              <option value="1">No</option>
              <option value="3">Moderado</option>
              <option value="5">Sí</option>
            </select>
          </label>
          <label>
            Hipoalergénico:
            <select name="hypoallergenic" value={answers.hypoallergenic} onChange={handleChange}>
             <option value="">No importa</option>
             <option value="true">Sí</option>
             <option value="false">No</option>
             </select>
         </label>

          <button onClick={handleSubmit}>Buscar Gato Ideal</button>
        </div>
      )}
    </div>
  );
}

export default Test;

