import React, { useState, useRef } from "react";
import "../styles/Form.css";
import cat from "../assets/cat_hand_trans-removebg-preview.png";

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
  const [showModal, setShowModal] = useState(false);

  const printRef = useRef();

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
      .filter((breed) => breed)
      .sort((a, b) => countScores(a) - countScores(b))
      .slice(0, 5);

    setRecommendations(filteredRecommendations);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Resultados de tus mejores compañeros</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .cat-card { margin-bottom: 20px; }
            .cat-card img { width: 100px; height: 100px; }
            .cat-card-name { font-weight: bold; margin: 10px 0; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleRetakeTest = () => {
    setCurrentQuestion(0);
    setScores({});
    setRecommendations([]);
    setSubmitted(false);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="cat-survey-container">
      <h2 className="title-itim">Encuentra tu Gato Perfecto</h2>
      <div className="imagenForm">
        <img src={cat} alt="cat" className="imageForm" />
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {!submitted && (
        <div className="question-form">
          <h3 className="question-label">{questions[currentQuestion].label}</h3>
          <p className="question-description">{questions[currentQuestion].description}</p>
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
            <button className="retake-button" onClick={handlePrint}>
              Imprimir Resultados
            </button>
          </div>
          <div className="recommendations-container" ref={printRef}>
            <h3 className="recommendation-title">Tus mejores compañeros podrían ser:</h3>
            <div className="cat-card-container">
              {recommendations.map((cat) => (
                <div key={cat.id} className="cat-card">
                  <img src={cat.image} alt={cat.name || "Gato desconocido"} />
                  <h4 className="cat-card-name">{cat.name || "Gato desconocido"}</h4>
                  <p className="cat-card-description">
                    <strong>Descripción:</strong> {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
