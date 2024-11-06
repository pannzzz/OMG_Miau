import { render, screen } from "@testing-library/react";
import Session from "./Session";
import img from "../assets/Gato3.jpg";
import icon from "../assets/LogoTrans.png";
import icon1 from "../assets/icon2.png";
import icon2 from "../assets/icon3.1.png";
import icon3 from "../assets/icon4.png";
import icon4 from "../assets/icon5.1.png";
import icon5 from "../assets/icon6.1.png";
import icon6 from "../assets/icon7.1.png";
import cat from "../assets/dos_patitas-removebg-preview.png";

test("renders Session component with correct images and texts", () => {
  render(<Session />);

  // Verifica que la imagen principal esté presente
  const mainImage = screen.getByAltText("Kitten");
  expect(mainImage).toBeInTheDocument();
  expect(mainImage).toHaveAttribute("src", img);

  // Verifica que el icono de la cabecera esté presente
  const headerIcon = screen.getByAltText("Icono");
  expect(headerIcon).toBeInTheDocument();
  expect(headerIcon).toHaveAttribute("src", icon);

  // Verifica que los textos de los encabezados estén presentes
  expect(screen.getByText("Gatitos felices")).toBeInTheDocument();
  expect(screen.getByText(/la llegada de un gato/i)).toBeInTheDocument();

  // Verifica las imágenes y los textos en las secciones de cuidados
  const highlightImages = [
    { altText: "Amarlos", src: icon1 },
    { altText: "Alimentarlos", src: icon2 },
    { altText: "Cepillarlos", src: icon3 },
    { altText: "Compromiso", src: icon4 },
    { altText: "Entrenarlos", src: icon5 },
    { altText: "Cuidarlos", src: icon6 },
  ];

  highlightImages.forEach(({ altText, src }) => {
    const image = screen.getByAltText(altText);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", src);
  });

  // Verifica que la imagen de la encuesta de gatos esté presente
  const catSurveyImage = screen.getByAltText("cat");
  expect(catSurveyImage).toBeInTheDocument();
  expect(catSurveyImage).toHaveAttribute("src", cat);
});

test("renders session title and subtitle", () => {
  render(<Session />);

  // Verifica que los títulos estén en el documento
  expect(screen.getByText("Gatitos felices")).toBeInTheDocument();
  expect(screen.getByText(/la llegada de un gato/i)).toBeInTheDocument();
});

test("renders session highlights section with correct text", () => {
  render(<Session />);

  // Verifica que los textos de la sección de cuidados estén presentes
  expect(screen.getByText("Amarlos")).toBeInTheDocument();
  expect(screen.getByText("Alimentarlos")).toBeInTheDocument();
  expect(screen.getByText("Cepillarlos")).toBeInTheDocument();
  expect(screen.getByText("Compromiso")).toBeInTheDocument();
  expect(screen.getByText("Entrenarlos")).toBeInTheDocument();
  expect(screen.getByText("Cuidarlos")).toBeInTheDocument();
});
