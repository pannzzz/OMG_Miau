import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders Navbar component with navigation links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Verifica que el enlace 'Inicio' esté en el documento
  expect(screen.getByRole("link", { name: /inicio/i })).toBeInTheDocument();

  // Verifica que el enlace 'Galería' esté en el documento
  expect(screen.getByRole("link", { name: /galería/i })).toBeInTheDocument();

  // Verifica que el enlace 'Conócenos' esté en el documento
  expect(screen.getByRole("link", { name: /conócenos/i })).toBeInTheDocument();
});

test("renders the logo image with alt text 'Cats Logo'", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Verifica que la imagen del logo esté en el documento
  const logo = screen.getByAltText("Cats Logo");
  expect(logo).toBeInTheDocument();
});

test("renders the 'Test para ver tu gato adecuado✨' button link", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Verifica que el enlace para el test esté en el documento
  const testLink = screen.getByRole("link", { name: /test para ver tu gato adecuado✨/i });
  expect(testLink).toBeInTheDocument();
});

