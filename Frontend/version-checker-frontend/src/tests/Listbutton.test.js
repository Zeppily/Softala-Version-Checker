import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Listbutton from '../components/Listbutton';

const selectedServername = "Raahe"

test('renders project menu button', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    const buttonElement = screen.getByText('Raahe');
    expect(buttonElement).toBeInTheDocument();
  });

test('renders project menu after button click', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    screen.getByText('Raahe').click();
    const menuElement = screen.getByRole("menu");
    expect(menuElement).toBeInTheDocument();
  });

test('renders start server scan button and changes text when clicked', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    screen.getByText('Start server scan').click();
    const buttonElement = screen.getByText("Scan in progress");
    expect(buttonElement).toBeInTheDocument();
  });