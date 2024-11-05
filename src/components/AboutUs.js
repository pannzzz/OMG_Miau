import React from "react";
import { Helmet } from "react-helmet";
import minino from "../assets/minino.jpg";
import mono from "../assets/mono.jpg";
import drako from "../assets/drako.jpg";
import pardo from "../assets/pardo.jpg";
import luna from "../assets/luna.jpg";
import nuestrosImg from "../assets/image.png";
import kittens from "../assets/ot.jpg";
import kittenAlone from "../assets/gatito.jpg";
import cat from "../assets/cat.png";
import "../styles/About.css";

const AboutUs = () => {
  const items = [
    {
      id: 1,
      imageUrl: minino,
      text: "Minino",
      hoverText:
        "Soy minino, mi dueña era Ifigenia, me gusta cazar y llorar al frente de la puerta cuando mi dueña llega, la muerdo si tengo hambre, soy cariñoso y me encanta ignorar a todos.",
    },
    {
      id: 2,
      imageUrl: mono,
      text: "Monito",
      hoverText:
        "Soy monito, mi dueña es María José, me encanta estar encima de mi dueña, por mí estaría siempre encima, soy muy curioso e inquieto, me encanta explorar y correr de lado a lado de la casa.",
    },
    {
      id: 3,
      imageUrl: drako,
      text: "Drako",
      hoverText:
        "Me llamo Drako, mi dueña es Dalia, soy un gato muy cariñoso y juguetón, adoro explorar cajas, las más grandes son mis favoritas, también me gusta que me peinen y me jueguen con mi caña para gatos de pajarito.",
    },
    {
      id: 4,
      imageUrl: pardo,
      text: "Pardo",
      hoverText:
        "Soy Pardo, mi dueña es Tatiana, me gusta ser muy mimado, cariñoso, juguetón y me encanta ronronear cuando estoy cerca de ella. Ella es muy tierna conmigo y le gusta darme premios cuando me comporto bien.",
    },
    {
      id: 5,
      imageUrl: luna,
      text: "Luna",
      hoverText:
        "Soy Luna, mi dueña es Sharit, soy tranquila, tengo un gran apetito, cariñosa, hace poquito di a luz a 3 gatitos muy lindos y tengo una maña muy tierna, la cual es sacar la puntita de mi lengua.",
    },
  ];

  const handleMouseEnter = (e) => {
    const container = e.currentTarget;
    container.style.backgroundColor = "#ec848c";
    const hoverText = container.querySelector(".hover-text");
    const image = container.querySelector(".image");
    const text = container.querySelector(".text");
    hoverText.style.opacity = 1;
    image.style.opacity = 0;
    text.style.opacity = 0;
  };

  const handleMouseLeave = (e) => {
    const container = e.currentTarget;
    container.style.backgroundColor = "#E0E9FA";
    const hoverText = container.querySelector(".hover-text");
    const image = container.querySelector(".image");
    const text = container.querySelector(".text");
    hoverText.style.opacity = 0;
    image.style.opacity = 1;
    text.style.opacity = 1;
  };

  return (
    <div className="itim-regular">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet" />
      </Helmet>
      <h1 className="main-title">Nosotras</h1>
      <div className="grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-container">
              <img src={item.imageUrl} alt={`Imagen ${item.id}`} className="image" />
              <div className="hover-text">{item.hoverText}</div>
            </div>
            <p className="text">{item.text}</p>
          </div>
        ))}
      </div>
      {console.log("Rendered items:", items)}
      <div className="info-section">
        <div className="info-block">
          <div className="image-container-info">
            <img src={nuestrosImg} alt="Imagen de nuestros valores" className="info-image" />
          </div>
          <div className="text-container">
            <h2 className="info-title">Nuestros valores</h2>
            <p>Empatía: Nos interesa entender tanto a los usuarios como a los gatos para ofrecer una experiencia alineada con ambos.</p>
            <p>Accesibilidad: Nos esforzamos en diseñar un sitio web fácil de usar, accesible y disponible para todos.</p>
            <p>Innovación: Aprovechamos tecnologías modernas y datos para crear una experiencia enriquecida y avanzada.</p>
          </div>
          <div className="imagen">
            <img src={cat} alt="cat" className="Image" />
          </div>
        </div>

        <div className="info-block">
          <div className="text-container">
            <h2 className="info-title">¿Por qué lo hacemos?</h2>
            <p>Nosotras entendemos que cada hogar y estilo de vida es único, y que encontrar el gato perfecto es una combinación de compatibilidad en energía, características, y personalidad. Crear un espacio donde esta búsqueda sea intuitiva y accesible es algo que nos inspira profundamente.</p>
          </div>
          <div className="image-container-info">
            <img src={kittens} alt="Imagen de por qué lo hacemos" className="info-image" />
          </div>
        </div>

        <div className="info-block">
          <div className="image-container-info">
            <img src={kittenAlone} alt="Imagen de misión" className="info-image" />
          </div>
          <div className="text-container">
            <h2 className="info-title">Misión</h2>
            <p>Nuestra misión es conectar a personas con su compañero felino ideal, facilitando un proceso de búsqueda que sea intuitivo y personalizado. A través de la tecnología y el análisis de datos, buscamos crear una experiencia significativa que ayude a construir lazos duraderos entre humanos y gatos, apoyando a cada usuario en la elección de un gato que realmente encaje con su estilo de vida y sus necesidades.</p>
            <h2 className="info-title">Visión</h2>
            <p>Ser la plataforma líder en la conexión entre personas y gatos, ofreciendo una herramienta confiable y fácil de usar que transforme el proceso de encontrar una mascota en una experiencia única y placentera. Queremos ser reconocidas por mejorar la relación humano-animal mediante el uso de tecnología de punta y un enfoque en la empatía y accesibilidad, logrando que cada gato encuentre el hogar perfecto y cada persona, el gato perfecto.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
