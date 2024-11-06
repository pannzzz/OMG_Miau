import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders NotFound component with 404 title", () => {
  render(<NotFound />);

  // Verifica que el título '404 - Page Not Found' esté en el documento
  expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
});

test("renders NotFound component with error message", () => {
  render(<NotFound />);

  // Verifica que el mensaje de error esté en el documento
  expect(
    screen.getByText("Oops! The page you're looking for doesn't exist.")
  ).toBeInTheDocument();
});

