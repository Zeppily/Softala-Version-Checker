import { render, screen } from '@testing-library/react';
import AddServerForm from '../components/AddServerForm';
import '@testing-library/jest-dom/extend-expect'

global.alert = jest.fn();

afterAll(() => {
  jest.fn().mockClear
})

test('renders add server form button', () => {
  render(<AddServerForm />);
  const buttonElement = screen.getByText(/Add new server/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders add server form dialog box', () => {
  render(<AddServerForm />);
  screen.getByText(/Add new server/i).click();
  const dialogElement = screen.getByLabelText(/Username/i);
  expect(dialogElement).toBeInTheDocument();
});

test('renders add server form dialog box alert if submitting empty strings', () => {
  render(<AddServerForm />);
  screen.getByText(/Add new server/i).click();
  screen.getByText(/Save/i).click();
  expect(global.alert).toHaveBeenCalledTimes(1);
});

test('renders add server form dialog box alert if submitting empty strings', () => {
  render(<AddServerForm />);
  screen.getByText(/Add new server/i).click();
  screen.getByText(/Save/i).click();
  expect(global.alert).toHaveBeenCalledTimes(1);
});

test('renders add server form dialog box cancel hides dialog box', () => {
  render(<AddServerForm />);
  screen.getByText(/Add new server/i).click();
  screen.getByText(/Cancel/i).click();
  const dialogElement = screen.getAllByLabelText(/Username/i);
  expect(dialogElement[0]).not.toBeVisible();
});