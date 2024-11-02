import React, { useState } from 'react';
import '../styles/Test.css';

const Test = () => {
    const questions = [
        { name: 'energy_level', label: 'Nivel de Actividad', description: '¿Qué tan activo te gustaría que sea tu gato?' },
        { name: 'affection_level', label: 'Cariño', description: '¿Buscas un gato muy cariñoso o más independiente?' },
        { name: 'adaptability', label: 'Adaptabilidad', description: '¿Qué tan bien debería adaptarse a nuevos entornos?' },
        { name: 'friendliness_with_other_animals', label: 'Amigable con otros animales', description: '¿Cuánta compatibilidad con otros animales es importante?' },
        { name: 'grooming', label: 'Nivel de Cuidado', description: '¿Qué tanto tiempo estás dispuesto a dedicar al aseo de tu gato?' },
        { name: 'intelligence', label: 'Inteligencia', description: '¿Te gustaría que tu gato sea especialmente inteligente?' }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCat, setSelectedCat] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleAnswer = (value) => {
        setScores((prevScores) => ({
            ...prevScores,
            [questions[currentQuestion].name]: parseInt(value)
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            setSubmitted(true);
    
            const response = await fetch('https://api.thecatapi.com/v1/breeds', {
                headers: {
                    'x-api-key': 'TU_CLAVE_DE_API',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            const breedsWithImages = await Promise.all(
                data.map(async (breed) => {
                    const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breed.id}`, {
                        headers: {
                            'x-api-key': 'TU_CLAVE_DE_API',
                        },
                    });
    
                    if (!imageResponse.ok) {
                        throw new Error(`HTTP error! status: ${imageResponse.status}`);
                    }
    
                    const imageData = await imageResponse.json();
                    return { ...breed, image: imageData[0]?.url };
                })
            );
    
            const filteredRecommendations = breedsWithImages.filter((breed) => {
                let matchScore = 0;
    
                if (Math.abs(scores.energy_level - breed.energy_level) <= 1) matchScore++;
                if (Math.abs(scores.affection_level - breed.affection_level) <= 1) matchScore++;
                if (Math.abs(scores.adaptability - breed.adaptability) <= 1) matchScore++;
                if (scores.friendliness_with_other_animals && breed.friendliness_with_other_animals >= scores.friendliness_with_other_animals) matchScore++;
                if (Math.abs(scores.grooming - breed.grooming) <= 1) matchScore++;
                if (Math.abs(scores.intelligence - breed.intelligence) <= 1) matchScore++;
    
                return matchScore >= 3;
            });
    
            setRecommendations(filteredRecommendations);
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            alert('Hubo un error al obtener los datos. Verifica tu conexión o intenta más tarde.');
        }
    };
    

    const handleRetakeTest = () => {
        setCurrentQuestion(0);
        setScores({});
        setRecommendations([]);
        setSubmitted(false);
    };

    const openModal = (cat) => {
        setSelectedCat(cat);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCat(null);
    };

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="cat-survey-container">
            <h2 className="cat-survey-title">Encuentra tu Gato Perfecto</h2>

            <div className="progress-bar-container">
                <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            {!submitted && (
                <div className="question-form">
                    <h3 className="question-label">{questions[currentQuestion].label}</h3>
                    <p className="question-description">{questions[currentQuestion].description}</p>
                    <div className="answer-options">
                        <button
                            className="answer-button"
                            onClick={() => handleAnswer("5")}
                        >
                            Alta
                        </button>
                        <button
                            className="answer-button"
                            onClick={() => handleAnswer("3")}
                        >
                            Media
                        </button>
                        <button
                            className="answer-button"
                            onClick={() => handleAnswer("2")}
                        >
                            Baja
                        </button>
                    </div>
                </div>
            )}

            {submitted && (
                <div className="recommendations-container">
                    <button className="retake-button" onClick={handleRetakeTest}>
                        Realizar el test de nuevo
                    </button>
                    <h3 className="recommendation-title">Recomendaciones para ti:</h3>
                    <div className="cat-card-container">
                        {recommendations.map((cat) => (
                            <div key={cat.id} className="cat-card" onClick={() => openModal(cat)}>
                                <img src={cat.image} alt="gato recomendado" />
                                <h4 className="cat-card-name">{cat.name || 'Gato desconocido'}</h4>
                                <p className="cat-card-description"><strong>Descripción:</strong> {cat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showModal && selectedCat && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>X</button>
                        <img src={selectedCat.image} alt={selectedCat.name} className="modal-image" />
                        <h2>{selectedCat.name}</h2>
                        <p><strong>Descripción:</strong> {selectedCat.description}</p>
                        <p><strong>Temperamento:</strong> {selectedCat.temperament}</p>
                        <p><strong>Esperanza de vida:</strong> {selectedCat.life_span} años</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Test;