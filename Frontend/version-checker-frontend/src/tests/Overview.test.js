import { render, screen } from '@testing-library/react';
import Overview from '../components/Overview';
import '@testing-library/jest-dom/extend-expect'

test('renders overview title component', () => {
  render(<Overview />);
  const textElement = screen.getByText(/Overview/i);
  expect(textElement).toBeInTheDocument();
});

test('renders title total programs', () => {
  render(<Overview />);
  const textElement = screen.getByText(/Total Programs/i);
  expect(textElement).toBeInTheDocument();
});

test('renders title updateable', () => {
  render(<Overview />);
  const textElement = screen.getByText(/Updateable/i);
  expect(textElement).toBeInTheDocument();
});

test('renders title eol approaching', () => {
  render(<Overview />);
  const textElement = screen.getByText(/EOL Approaching/i);
  expect(textElement).toBeInTheDocument();
});

test('renders title unsupported', () => {
  render(<Overview />);
  const textElement = screen.getByText(/Unsupported/i);
  expect(textElement).toBeInTheDocument();
});