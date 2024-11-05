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
      description: "¿Qué tanto tiempo estás dispuesto a dedicar al aseo de tu gato?",
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

  const handleSubmit = () => {
    setSubmitted(true);

    const countScores = (breed) => {
      let matchScore = 0;
      // Asegúrate de que las propiedades existan en el objeto `breed`
      matchScore += Math.abs((scores.energy_level || 0) - (breed.energy_level || 0));
      matchScore += Math.abs((scores.affection_level || 0) - (breed.affection_level || 0));
      matchScore += Math.abs((scores.adaptability || 0) - (breed.adaptability || 0));
      matchScore += Math.abs((scores.dog_friendly || 0) - (breed.dog_friendly || 0));
      matchScore += Math.abs((scores.grooming || 0) - (breed.grooming || 0));
      matchScore += Math.abs((scores.intelligence || 0) - (breed.intelligence || 0));
      matchScore += Math.abs((scores.vocalisation || 0) - (breed.vocalisation || 0));
      matchScore += Math.abs((scores.child_friendly || 0) - (breed.child_friendly || 0));
      return matchScore;
    };

    const filteredRecommendations = breeds
      .filter(breed => breed) // Asegúrate de que la raza no sea undefined
      .sort((a, b) => countScores(a) - countScores(b))
      .slice(0, 5); // Los 5 mejores gatos

    console.log("Filtered recommendations:", filteredRecommendations); // Debugging line
    setRecommendations(filteredRecommendations);
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