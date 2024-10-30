import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';
 
function CatBreeds() {
  const [breeds, setBreeds] = useState([]);
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
 
        // Obtener imágenes para cada raza
        const breedsWithImages = await Promise.all(
          data.map(async (breed) => {
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
              headers: {
                'x-api-key': API_KEY
              }
            });
            const imageData = await imageResponse.json();
            // Asignar la imagen o null si no hay imagen disponible
            breed.image = imageData[0]?.url || null;
            return breed;
          })
        );
 
        setBreeds(breedsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setLoading(false);
      }
    };
 
    fetchBreeds();
  }, [API_KEY]);
 
  if (loading) {
    return <div className="cat-breeds">Cargando...</div>;
  }
 
  return (
    <div className="cat-breeds">
      <h1>Razas de Gatos</h1>
      <div className="breeds-container">
        {breeds.map((breed) => (
          <div key={breed.id} className="breed-card">
            <h2>{breed.name}</h2>
            <p><strong>Descripción:</strong> {breed.description}</p>
            <p><strong>Temperamento:</strong> {breed.temperament ? breed.temperament : "No disponible"}</p>
            <p><strong>Esperanza de vida:</strong> {breed.life_span ? `${breed.life_span} años` : "No disponible"}</p>
            <p><strong>País de origen:</strong> {breed.origin}</p>
            <a href={breed.wikipedia_url} target="_blank" rel="noopener noreferrer">
              <strong>País de origen:</strong> {breed.wikipedia_url}
            </a>
            {breed.image ? (
              <img src={breed.image} alt={breed.name} className="breed-image" />
            ) : (
              <p>No hay imagen disponible</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default CatBreeds;