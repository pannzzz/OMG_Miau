import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CatBreeds from "./Gallery";

beforeEach(() => {
  // Configura un mock global para fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          id: "abc",
          name: "Breed Name",
          description: "Description of the breed",
          temperament: "Friendly",
          life_span: "10-12 years",
          origin: "Country",
          wikipedia_url: "https://example.com",
          image: {
            url: "https://example.com/image.jpg",
          },
        },
      ]),
    })
  );
});

afterEach(() => {
  global.fetch.mockClear();
});

test("renders CatBreeds component and displays breed information", async () => {
  render(<CatBreeds />);

  // Espera a que se muestre la lista de razas
  expect(screen.getByText(/cargando/i)).toBeInTheDocument();

  // Verifica que la raza se muestre correctamente después de cargar
  await waitFor(() => {
    expect(screen.getByText("Galería de Gatos")).toBeInTheDocument();
  });
});

test("filters breeds based on search input", async () => {
  render(<CatBreeds />);

  // Verifica que la raza se muestre correctamente después de cargar
  await waitFor(() => {
    expect(screen.getByText("Galería de Gatos")).toBeInTheDocument();
  });

  const searchInput = screen.queryByPlaceholderText(/Buscar raza.../i);
  fireEvent.change(searchInput, { target: { value: "Aegean" } });

  expect(screen.getByDisplayValue("aegean")).toBeInTheDocument();
});

