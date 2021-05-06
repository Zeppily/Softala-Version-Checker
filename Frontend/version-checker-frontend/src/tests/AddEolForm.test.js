import { render, screen } from '@testing-library/react';
import AddEolForm from '../components/AddEolForm';
import '@testing-library/jest-dom/extend-expect'

global.alert = jest.fn();

afterAll(() => {
  jest.fn().mockClear
})

test('renders add EOL form button', () => {
  render(<AddEolForm />);
  const buttonElement = screen.getByText(/Add new software to the EOL list/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders add EOL form dialog box', () => {
  render(<AddEolForm />);
  screen.getByText(/Add new software to the EOL list/i).click();
  const dialogElement = screen.getByLabelText(/EOL date/i);
  expect(dialogElement).toBeInTheDocument();
});

test('renders add EOL form dialog box alert if submitting empty strings', () => {
  render(<AddEolForm />);
  screen.getByText(/Add new software to the EOL list/i).click();
  screen.getByText(/Save/i).click();
  expect(global.alert).toHaveBeenCalledTimes(1);
});

test('renders add server form dialog box cancel hides dialog box', () => {
  render(<AddEolForm />);
  screen.getByText(/Add new software to the EOL list/i).click();
  screen.getByText(/Cancel/i).click();
  const dialogElement = screen.getAllByLabelText(/EOL date/i);
  expect(dialogElement[0]).not.toBeVisible();
});