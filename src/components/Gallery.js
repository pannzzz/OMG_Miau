import React, { useState, useEffect } from "react";
import "../styles/Gallery.css";

function CatBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBreed, setSelectedBreed] = useState(null);
  const API_KEY = "TU_CLAVE_API";

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          "https://api.thecatapi.com/v1/breeds",
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );
        const data = await response.json();

        const breedsWithImages = await Promise.all(
          data.map(async (breed) => {
            const imageResponse = await fetch(
              `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`,
              {
                headers: {
                  "x-api-key": API_KEY,
                },
              }
            );
            const imageData = await imageResponse.json();
            breed.image = imageData[0]?.url || null;
            return breed;
          })
        );

        setBreeds(breedsWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching breeds:", error);
        setLoading(false);
      }
    };

    fetchBreeds();
  }, [API_KEY]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCardClick = (breed) => {
    setSelectedBreed(breed);
  };

  const closeExpandedView = () => {
    setSelectedBreed(null);
  };

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory
      ? breed.id === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="cat-breeds">Cargando...</div>;
  }
  function shortName(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}
  return (
    <div className="cat-breeds">
      <h1 className="title-itim">Galería de Gatos</h1>
      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-filter"
        >
          <option value="">Todas las razas</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <div className="search-bar-container">
          <span className="filter-icon">🐾</span>
          <input
            type="text"
            placeholder="  Buscar raza..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
      </div>

      <div className="breeds-container">
        {filteredBreeds.map((breed) => (
          <div
            key={breed.id}
            className="breed-card"
            onClick={() => handleCardClick(breed)}
          >
            <div className="breed-image-container">
              <img src={breed.image} alt={breed.name} className="breed-image" />
            </div>
            <h2>{shortName(breed.name,14)}</h2>
          </div>
        ))}
      </div>

      {selectedBreed && (
        <div className="expanded-view">
          <button className="close-button" onClick={closeExpandedView}>
            ✕
          </button>
          <h2>{selectedBreed.name}</h2>
          <img
            src={selectedBreed.image}
            alt={selectedBreed.name}
            className="expanded-image"
          />
          <p>
            <strong>Descripción:</strong> {selectedBreed.description}
          </p>
          <p>
            <strong>Temperamento:</strong>{" "}
            {selectedBreed.temperament || "No disponible"}
          </p>
          <p>
            <strong>Esperanza de vida:</strong>{" "}
            {selectedBreed.life_span || "No disponible"}
          </p>
          <p>
            <strong>País de origen:</strong> {selectedBreed.origin}
          </p>
          {selectedBreed.wikipedia_url && (
            <p>
              <a
                href={selectedBreed.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="more-info-link"
              >
                Más información
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CatBreeds;
