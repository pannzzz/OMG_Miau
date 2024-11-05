import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AboutUs from "./AboutUs";

// Test suite for AboutUs component
describe("AboutUs Component", () => {
  it("renders main title correctly", () => {
    render(<AboutUs />);
    const mainTitle = screen.getByText("Nosotras");
    expect(mainTitle).toBeInTheDocument();
  });

  it("renders all items with correct images and texts", () => {
    render(<AboutUs />);
    const items = [
      { text: "Minino" },
      { text: "Monito" },
      { text: "Drako" },
      { text: "Pardo" },
      { text: "Luna" },
    ];

    items.forEach((item) => {
      const itemText = screen.getByText(item.text);
      expect(itemText).toBeInTheDocument();
    });
  });

  it("hides hover text on mouse leave", () => {
    render(<AboutUs />);
    const mininoElement = screen.getByText("Minino");
    expect(mininoElement).toBeInTheDocument();

    // Assuming the hover text is within a sibling element
    const hoverText = "Soy minino, mi dueña era Ifigenia, me gusta cazar y llorar al frente de la puerta cuando mi dueña llega, la muerdo si tengo hambre, soy cariñoso y me encanta ignorar a todos.";
    const hoverElement = screen.getByText(hoverText);
   
    fireEvent.mouseEnter(mininoElement);
    fireEvent.mouseLeave(mininoElement);

    expect(hoverElement).toHaveStyle("opacity: 0"); // Hidden on mouse leave
  });

  it("renders all sections in the info-section correctly", () => {
    render(<AboutUs />);

    const valoresTitle = screen.getByText("Nuestros valores");
    const porqueLoHacemosTitle = screen.getByText("¿Por qué lo hacemos?");
    const misionTitle = screen.getByText("Misión");
    const visionTitle = screen.getByText("Visión");

    expect(valoresTitle).toBeInTheDocument();
    expect(porqueLoHacemosTitle).toBeInTheDocument();
    expect(misionTitle).toBeInTheDocument();
    expect(visionTitle).toBeInTheDocument();
  });
});
