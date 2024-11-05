import React from "react";
import "../styles/About.css";
import nuestrosImg from "../assets/image.png";
import misionImg from "../assets/gatito.jpg";
import minino from "../assets/minino.jpg";
import drako from "../assets/drako.jpg";
import pardo from "../assets/pardo.jpg";
import mono from "../assets/mono.jpg";
import luna from "../assets/luna.jpg";
import porImg from "../assets/ot.jpg";
import cat from "../assets/cat.png";
 
const AboutUs = () => {
  const items = [
    { id: 1, imageUrl: minino, text: "Minino", hoverText: "Soy minino, me gusta cazar y llorar al frente de la puerta cuando mi dueña llega." },
    { id: 2, imageUrl: mono, text: "Monito", hoverText: "Soy monito, me encanta estar encima de mi dueña, soy muy curioso e inquieto." },
    { id: 3, imageUrl: drako, text: "Drako", hoverText: "Me llamo Drako, soy un gato muy cariñoso y juguetón, adoro explorar cajas." },
    { id: 4, imageUrl: pardo, text: "Pardo", hoverText: "Soy Pardo, me gusta ser mimado y cariñoso, y me encanta ronronear." },
    { id: 5, imageUrl: luna, text: "Luna", hoverText: "Soy Luna, tranquila y cariñosa, hace poco di a luz a 3 gatitos." },
  ];
 
  const handleMouseEnter = (e) => {
    const container = e.currentTarget;
    container.style.backgroundColor = " #ec848c";
    const hoverText = container.querySelector(".hoverText");
    const image = container.querySelector(".image");
    const text = container.querySelector(".text");
    hoverText.style.opacity = 1;
    image.style.opacity = 0;
    text.style.opacity = 0;
  };
 
  const handleMouseLeave = (e) => {
    const container = e.currentTarget;
    container.style.backgroundColor = "#E0E9FA";
    const hoverText = container.querySelector(".hoverText");
    const image = container.querySelector(".image");
    const text = container.querySelector(".text");
    hoverText.style.opacity = 0;
    image.style.opacity = 1;
    text.style.opacity = 1;
  };
 
  return (
    <div>
      <h1 className="mainTitle itim-font">Nosotras</h1>
     
      <div className="grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="imageContainer">
              <img src={item.imageUrl} alt={`Imagen ${item.id}`} className="image" />
              <div className="hoverText">{item.hoverText}</div>
            </div>
            <p className="text itim-font">{item.text}</p>
          </div>
        ))}
      </div>
 
      <div className="infoSection">
        <div className="infoBlock">
          <div className="imageContainerInfo">
            <img src={nuestrosImg} alt="Nuestros valores" className="infoImage" />
          </div>
          <div className="textContainer">
            <h2 className="infoTitle itim-font">Nuestros valores</h2>
            <p>Empatía: Nos interesa entender tanto a los usuarios como a los gatos.</p>
            <p>Accesibilidad: Nos esforzamos en diseñar un sitio web accesible y fácil de usar.</p>
            <p>Innovación: Aprovechamos tecnologías modernas para enriquecer la experiencia.</p>
          </div>
          <div className="imagen">
            <img src={cat} alt="cat" className="image" />
          </div>
        </div>
 
        <div className="infoBlock">
          <div className="textContainer">
            <h2 className="infoTitle itim-font">¿Por qué lo hacemos?</h2>
            <p>Entendemos que encontrar el gato perfecto es una combinación de compatibilidad en energía, características y personalidad.</p>
          </div>
          <div className="imageContainerInfo">
            <img src={porImg} alt="¿Por qué lo hacemos?" className="infoImage" />
          </div>
        </div>
 
        <div className="infoBlock">
          <div className="imageContainerInfo">
            <img src={misionImg} alt="Misión" className="infoImage" />
          </div>
          <div className="textContainer">
            <h2 className="infoTitle itim-font">Misión</h2>
            <p>Conectar a personas con su compañero felino ideal mediante una búsqueda intuitiva y personalizada.</p>
            <h2 className="infoTitle itim-font">Visión</h2>
            <p>Ser la plataforma líder en la conexión entre personas y gatos, ofreciendo una herramienta confiable y fácil de usar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default AboutUs;
 