import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Encuentra tu Gato Ideal");
  expect(linkElement).toBeInTheDocument();
});
