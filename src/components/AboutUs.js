import React from "react";
import { Helmet } from "react-helmet";
import minino from "../assets/minino.jpg";
import mono from "../assets/mono.jpg";
import drako from "../assets/drako.jpg";
import pardo from "../assets/pardo.jpg";
import luna from "../assets/luna.jpg";
import nuestrosImg from "../assets/image.png";
import porImg from "../assets/ot.jpg";
import misionImg from "../assets/gatito.jpg";
import cat from "../assets/cat.png";

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
        "Me llamo Drako, soy un gato muy cariñoso y juguetón, mi dueña es Dalia, adoro explorar cajas las más grandes son mis favoritas, también me gusta perseguir pelotas de aluminio y que me peinen.",
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
        "Soy Luna, mi dueña es Sharit, soy tranquila, tengo un gran apetito, cariñosa, hace poquito di a luz a 3 gatitos muy lindos y tengo una maña muy tierna la cal es la de sacar la puntita de mi lengua.",
    },
  ];

  const handleMouseEnter = (e) => {
    const container = e.currentTarget;
    container.style.backgroundColor = " #ec848c";
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
      <h1 style={styles.mainTitle}>Nosotras</h1>
      <div style={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            style={styles.container}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={styles.imageContainer}>
              <img src={item.imageUrl} alt={`Imagen ${item.id}`} style={styles.image} className="image" />
              <div className="hover-text" style={styles.hoverText}>
                {item.hoverText}
              </div>
            </div>
            <p style={styles.text} className="text">{item.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.infoSection}>

        <div style={styles.infoBlock}>
        <div style={styles.imageContainerInfo}>
            <img src={nuestrosImg} alt="Imagen de nuestros valores" style={styles.infoImage} />
          </div>
          <div style={styles.textContainer}>
            <h2 style={styles.infoTitle}>Nuestros valores</h2>
            <p>Empatía: Nos interesa entender tanto a los usuarios como a los gatos para ofrecer una experiencia alineada con ambos.</p>
            <p>Accesibilidad: Nos esforzamos en diseñar un sitio web fácil de usar, accesible y disponible para todos.</p>
            <p>Innovación: Aprovechamos tecnologías modernas y datos para crear una experiencia enriquecida y avanzada.</p>
          </div>
          <div style={styles.imagen}>
            <img src={cat} alt="cat" style={styles.Image} />
          </div>

          
        </div>

        <div style={styles.infoBlock}>
          <div style={styles.textContainer}>
            <h2 style={styles.infoTitle}>¿Por qué lo hacemos?</h2>
            <p>Nosotras entendemos que cada hogar y estilo de vida es único, y que encontrar el gato perfecto es una combinación de compatibilidad en energía, características, y personalidad. Crear un espacio donde esta búsqueda sea intuitiva y accesible es algo que nos inspira profundamente.</p>
          </div>
          <div style={styles.imageContainerInfo}>
            <img src={porImg} alt="Imagen de porque lo hacemos" style={styles.infoImage} />
          </div>
        </div>

        <div style={styles.infoBlock}>
        <div style={styles.imageContainerInfo}>
            <img src={misionImg} alt="Imagen de mision" style={styles.infoImage} />
          </div>
          <div style={styles.textContainer}>
            <h2 style={styles.infoTitle}>Misión</h2>
            <p>Nuestra misión es conectar a personas con su compañero felino ideal, facilitando un proceso de búsqueda que sea intuitivo y personalizado. A través de la tecnología y el análisis de datos, buscamos crear una experiencia significativa que ayude a construir lazos duraderos entre humanos y gatos, apoyando a cada usuario en la elección de un gato que realmente encaje con su estilo de vida y sus necesidades.            </p>
            <h2 style={styles.infoTitle}>Visión</h2>
            <p>Ser la plataforma líder en la conexión entre personas y gatos, ofreciendo una herramienta confiable y fácil de usar que transforme el proceso de encontrar una mascota en una experiencia única y placentera. Queremos ser reconocidas por mejorar la relación humano-animal mediante el uso de tecnología de punta y un enfoque en la empatía y accesibilidad, logrando que cada gato encuentre el hogar perfecto y cada persona, el gato perfecto.            </p>
          </div>
          
        </div>


      </div>
    </div>
  );
};

const styles = {
  mainTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "60px",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "20px",
  },
  container: {
    textAlign: "center",
    margin: "10px",
    padding: "20px",
    backgroundColor: "#E0E9FA",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    width: "300px",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "opacity 0.3s ease",
  },
  text: {
    marginTop: "10px",
    fontSize: "25px",
    color: "#333",
    transition: "opacity 0.3s ease",
  },
  hoverText: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#000",
    padding: "20px",
    borderRadius: "10px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "15px",
    width: "100%",
    height: "100%",
    whiteSpace: "normal",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginTop: "30px",
    backgroundColor: "#F5F7FB",
  },
  infoBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "20px",
  },
  textContainer: {
    flex: 1,
    padding: "20px",
    fontSize: "20px",
    color: "#333",
  },
  infoTitle: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
  },
  imageContainerInfo: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  infoImage: {
    width: "360px",
    height: "360px",
    borderRadius: "100%",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  imagen: {
    width: "160px",
    height: "300px",
    left: "20px",
  }
};

export default AboutUs;