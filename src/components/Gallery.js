import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';

function Gallery() {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
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

                const breedsWithImages = await Promise.all(
                    data.map(async (breed) => {
                        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
                            headers: {
                                'x-api-key': API_KEY
                            }
                        });
                        const imageData = await imageResponse.json();
                        breed.image = imageData[0]?.url || null; // Guardar una única imagen
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

    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    

    const filteredBreeds = breeds.filter(breed => {
        const matchesSearch = breed.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory ? breed.id === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <div className="cat-breeds">Cargando...</div>;
    }

    return (
        <div className="cat-breeds">
            <h1>Razas de Gatos</h1>
            <div className="filter-container">
                <select value={selectedCategory} onChange={handleCategoryChange} className="category-filter">
                    <option value="">Todas las razas</option>
                    {breeds.map(breed => (
                        <option key={breed.id} value={breed.id}>{breed.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Buscar raza..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
            </div>
            <div className="breeds-container">
                {filteredBreeds.map((breed) => (
                    <div key={breed.id} className="breed-card">
                        <div className="breed-image-container">
                            <img 
                                src={breed.image} 
                                alt={breed.name} 
                                className="breed-image" 
                            />
                        </div>
                        <div className="breed-info">
                            <h2>{breed.name}</h2>
                            <p><strong>Descripción:</strong> {breed.description}</p>
                            <p><strong>Temperamento:</strong> {breed.temperament || "No disponible"}</p>
                            <p><strong>Esperanza de vida:</strong> {breed.life_span || "No disponible"}</p>
                            <p><strong>País de origen:</strong> {breed.origin}</p>
                             {/* Enlace a la Wikipedia */}
            {breed.wikipedia_url && (
              <p>
                <a 
                  href={breed.wikipedia_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="more-info-link"
                >
                  Más información
                </a>
              </p>
            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;