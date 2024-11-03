import React, { useState } from "react";
import "../styles/Form.css";

const Form = ({ breeds, setBreeds }) => {
  const questions = [
    {
      name: "energy_level",
      label: "Nivel de Actividad",
      description: "¿Qué tan activo te gustaría que sea tu gato?",
    },
    {
      name: "affection_level",
      label: "Cariño",
      description: "¿Buscas un gato muy cariñoso o más independiente?",
    },
    {
      name: "adaptability",
      label: "Adaptabilidad",
      description: "¿Qué tan bien debería adaptarse a nuevos entornos?",
    },
    {
      name: "dog_friendly",
      label: "Amigable con los perros",
      description: "¿Cuánta compatibilidad con los perros es importante?",
    },
    {
      name: "grooming",
      label: "Nivel de Cuidado",
      description:
        "¿Qué tanto tiempo estás dispuesto a dedicar al aseo de tu gato?",
    },
    {
      name: "intelligence",
      label: "Inteligencia",
      description: "¿Te gustaría que tu gato sea especialmente inteligente?",
    },
    {
      name: "vocalisation",
      label: "Maullido",
      description: "¿Qué tanto quieres que maulle tu gato?",
    },
    {
        name: "child_friendly",
        label: "Amigable con los niños",
        description: "¿Qué tan amigo de los niños debería ser tu gato?",
    },
      {
        name: "empty",
        label: "Felicitaciones",
        description: "¿Qué tanto te gustaron las preguntas?",
    },
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
      [questions[currentQuestion].name]: parseInt(value),
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const breedsWithImages = breeds; //Las razas vienen desde Gallery.js

    const countScores = (breed) => {
      let matchScore = 0;

      matchScore += Math.abs(scores.energy_level - breed.energy_level);
      matchScore += Math.abs(scores.affection_level - breed.affection_level);
      matchScore += Math.abs(scores.adaptability - breed.adaptability);
      matchScore += Math.abs(scores.dog_friendly - breed.dog_friendly);
      matchScore += Math.abs(scores.grooming - breed.grooming);
      matchScore += Math.abs(scores.intelligence - breed.intelligence);
      matchScore += Math.abs(scores.vocalisation - breed.vocalisation);
      matchScore += Math.abs(scores.child_friendly - breed.child_friendly);
      console.log(
        breed.name, matchScore,
        "energy_level",scores.energy_level,breed.energy_level,
        "affection_level",scores.affection_level,breed.affection_level,
        "adaptability",scores.adaptability,breed.adaptability,
        "dog_friendly",scores.dog_friendly,breed.dog_friendly,
        "grooming",scores.grooming,breed.grooming,
        "intelligence",scores.intelligence,breed.intelligence,
        "vocalisation",scores.vocalisation,breed.vocalisation,
        "child_friendly",scores.child_friendly,breed.child_friendly
      );
      return matchScore;
    };

    const filteredRecommendations = breedsWithImages.sort(
      (breed, secondBreed) => {
        let matchScoreFirstBreed = countScores(breed);
        let matchScoreSecondBreed = countScores(secondBreed);
        return matchScoreFirstBreed - matchScoreSecondBreed; // menor puntaje es mejor
      }
    );

    setRecommendations(filteredRecommendations.slice(0, 5)); // 5 recomendaciones con mejor puntaje
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
      <h2 className="title-itim">Encuentra tu Gato Perfecto</h2>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {!submitted && (
        <div className="question-form">
          <h3 className="question-label">{questions[currentQuestion].label}</h3>
          <p className="question-description">
            {questions[currentQuestion].description}
          </p>
          <div className="answer-options">
            <button className="answer-button" onClick={() => handleAnswer(5)}>
              Mucho
            </button>
            <button className="answer-button" onClick={() => handleAnswer(3)}>
              Intermedio
            </button>
            <button className="answer-button" onClick={() => handleAnswer(1)}>
              Poco
            </button>
          </div>
        </div>
      )}

{submitted && (
  <div>
    <div className="retake-button-container">
      <button className="retake-button" onClick={handleRetakeTest}>
        Realizar el test de nuevo
      </button>
    </div>

    <div className="recommendations-container">
      <h3 className="recommendation-title">Tus mejores compañeros podrían ser:</h3>
      <div className="cat-card-container">
        {recommendations.map((cat) => (
          <div
            key={cat.id}
            className="cat-card"
            onClick={() => openModal(cat)}
          >
            <img src={cat.image} alt="gato recomendado" />
            <h4 className="cat-card-name">
              {cat.name || "Gato desconocido"}
            </h4>
            <p className="cat-card-description">
              <strong>Descripción:</strong> {cat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


      {showModal && selectedCat && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <img
              src={selectedCat.image}
              alt={selectedCat.name}
              className="modal-image"
            />
            <h2>{selectedCat.name}</h2>
            <p>
              <strong>Descripción:</strong> {selectedCat.description}
            </p>
            <p>
              <strong>Temperamento:</strong> {selectedCat.temperament}
            </p>
            <p>
              <strong>Esperanza de vida:</strong> {selectedCat.life_span} años
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
