import React from 'react';
import '../styles/MainContent.css';
import img2 from '../assets/Gato2.jpg';

function MainContent() {
  return (
    <section className="main-conten">
      <div className="text-and-buttons" >
        <h1>''Los gatos tienen una absoluta honestidad emocional; los seres humanos, por una razón u otra, pueden ocultar sus sentimientos, pero el gato no'', Ernest Hemingway.</h1>
        <div className="action-button">
          <button>Curiosidades!</button>
        </div>
      </div>
      <div className="cat-image">
        <img src={img2} alt="Gatito" className="gato-secundario" />
      </div>
    </section>
  );
}

export default MainContent;


