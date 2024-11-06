import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Form from "./Form";

const mockBreeds = [
  {
    id: 1,
    name: "Persian",
    image: "persian.jpg",
    description: "Gentle and quiet",
    energy_level: 3,
    affection_level: 5,
    adaptability: 4,
    dog_friendly: 2,
    grooming: 5,
    intelligence: 4,
    vocalisation: 2,
    child_friendly: 4,
    temperament: "Calm",
    life_span: 15,
  },
  {
    id: 2,
    name: "Siamese",
    image: "siamese.jpg",
    description: "Playful and vocal",
    energy_level: 5,
    affection_level: 5,
    adaptability: 5,
    dog_friendly: 4,
    grooming: 3,
    intelligence: 5,
    vocalisation: 5,
    child_friendly: 3,
    temperament: "Active",
    life_span: 12,
  },
];

describe("Form Component", () => {
  test("renders the form and handles answers", async () => {
    render(<Form breeds={mockBreeds} setBreeds={() => {}} />);

    // Check that the first question is rendered
    expect(screen.getByText("Nivel de Actividad")).toBeInTheDocument();

    // Answer the first question
    fireEvent.click(screen.getByText("Mucho"));

    // Check that the second question is rendered
    await waitFor(() => {
      expect(screen.getByText("Cariño")).toBeInTheDocument();
    });

    // Continue answering questions until the form is submitted
    fireEvent.click(screen.getByText("Mucho"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));

    // Check that the recommendations are rendered
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes("Tus mejores compañeros podrían ser:"))).toBeInTheDocument();
    });

    // Check that the recommendations contain the mock breeds
    expect(screen.getByText("Persian")).toBeInTheDocument();
    expect(screen.getByText("Siamese")).toBeInTheDocument();
  });

  test("handles retaking the test", async () => {
    render(<Form breeds={mockBreeds} setBreeds={() => {}} />);

    // Answer all questions to submit the form
    fireEvent.click(screen.getByText("Mucho"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));
    fireEvent.click(screen.getByText("Intermedio"));


    // Check that the recommendations are rendered
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes("Tus mejores compañeros podrían ser:"))).toBeInTheDocument();
    });

    // Click the retake button
    fireEvent.click(screen.getByText("Realizar el test de nuevo"));

    // Check that the first question is rendered again
    await waitFor(() => {
      expect(screen.getByText("Nivel de Actividad")).toBeInTheDocument();
    });
  });
});