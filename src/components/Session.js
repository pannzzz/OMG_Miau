import React from 'react';
import '../styles/Session.css';
import img from '../assets/Gato3.jpg'; // imagen principal
import icon from '../assets/Logo1.png'; // asegúrate de tener el ícono en tu carpeta de assets
import icon1 from '../assets/icon2.png'; // íconos de cuidado
import icon2 from '../assets/icon3.1.png';
import icon3 from '../assets/icon4.png';
import icon4 from '../assets/icon5.1.png';
import icon5 from '../assets/icon6.1.png';
import icon6 from '../assets/icon7.1.png';

const Session = () => {
  return (
    <div className="session-section">
      <div className="content">
        <img src={img} alt="Kitten" className="main-image" />
        <div className="text-section">
          <img src={icon} alt="Icono" className="header-icon" /> {/* Ícono sobre el título */}
          <h1>Gatitos felices</h1>
          <h2>
            La llegada de un gato a casa conlleva un gran cambio. Convivir con una mascota es una experiencia maravillosa que puede enriquecer enormemente tu vida, ofreciéndote momentos únicos de cariño y diversión, aunque también es una tarea que implica responsabilidad y tiempo. Y éste es el primer aspecto que debes valorar adecuadamente si estás pensando en adquirir un gatito.
          </h2>
        </div>
      </div>
      <h3>Tus cuidados:</h3>
      <div className="highlights">
        <div className="highlight">
          <img src={icon1} alt="Amarlos" />
          <p>Amarlos</p>
        </div>
        <div className="highlight">
          <img src={icon2} alt="Alimentarlos" />
          <p>Alimentarlos</p>
        </div> 
        <div className="highlight">
          <img src={icon3} alt="Cepillarlos" />
          <p>Cepillarlos</p>
        </div>
        <div className="highlight">
          <img src={icon4} alt="Compromiso" />
          <p>Compromiso</p>
        </div>
        <div className="highlight">
          <img src={icon5} alt="Entrenarlos" />
          <p>Entrenarlos</p>
        </div>
        <div className="highlight">
          <img src={icon6} alt="Cuidarlos" />
          <p>Cuidarlos</p> 
        </div>
      </div>
    </div>
  );
}

export default Session;
