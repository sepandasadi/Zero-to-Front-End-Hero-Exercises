import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CI/CD Pipeline heading', () => {
  render(<App />);
  const heading = screen.getByText(/CI\/CD Pipeline/i);
  expect(heading).toBeInTheDocument();
});

test('renders solution text', () => {
  render(<App />);
  const element = screen.getByText(/What You Accomplished/i);
  expect(element).toBeInTheDocument();
});

