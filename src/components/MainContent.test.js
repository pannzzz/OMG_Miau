import { render, screen } from "@testing-library/react";
import MainContent from "./MainContent";

test("renders MainContent component with Hemingway's quote", () => {
  render(<MainContent />);

  // Verifica que el texto de la cita esté en el documento
  expect(
    screen.getByText(
      /Los gatos tienen una absoluta honestidad emocional; los seres humanos, por una razón u otra, pueden ocultar sus sentimientos, pero el gato no/i
    )
  ).toBeInTheDocument();

  // Verifica que el nombre del autor esté en el documento
  expect(screen.getByText(/Ernest Hemingway/i)).toBeInTheDocument();
});

test("renders the 'Curiosidades!' button", () => {
  render(<MainContent />);

  // Verifica que el botón con el texto 'Curiosidades!' esté en el documento
  const button = screen.getByRole("button", { name: /Curiosidades!/i });
  expect(button).toBeInTheDocument();
});

test("renders the secondary cat image", () => {
  render(<MainContent />);

  // Verifica que la imagen con el alt 'Gatito' esté en el documento
  const image = screen.getByAltText("Gatito");
  expect(image).toBeInTheDocument();
});