import React, { useState, useEffect } from 'react';
import Form from './Form';
import Gallery from './Gallery';

function FormLogic() {
  const [breeds, setBreeds] = useState([]); // Mantiene las razas de gatos
  const [results, setResults] = useState([]); // Almacena los resultados del test
  const API_KEY = 'TU_CLAVE_API'; // Asegúrate de tener tu clave API aquí

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        const data = await response.json();
        const breedsWithImages = await Promise.all(
          data.map(async (breed) => {
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
              headers: {
                'x-api-key': API_KEY,
              },
            });
            const imageData = await imageResponse.json();
            breed.image = imageData[0]?.url || null;
            return breed;
          })
        );
        setBreeds(breedsWithImages); // Establece las razas en el estado
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds(); // Llama a la función de carga de razas
  }, [API_KEY]);

  const handleResults = (newResults) => {
    setResults(newResults); // Almacena los resultados en el estado
  };

  return (
    <div className="App">
      <Form breeds={breeds} setBreeds={setBreeds} onResults={handleResults} />
      {results.length > 0 && <Gallery breeds={results} setBreeds={setBreeds} />}
    </div>
  );
}

export default FormLogic;




