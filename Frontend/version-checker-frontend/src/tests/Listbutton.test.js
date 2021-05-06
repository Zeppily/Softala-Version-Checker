import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Listbutton from '../components/Listbutton';

const selectedServername = "Test"
const serverData = [{host: "fakeaddr", name: "test", username: "fakeUser", password: "fakePass"}]

global.alert = jest.fn();

afterAll(() => {
  jest.fn().mockClear
})

const handleChange = nextServername => {'test'}

//TODO: Need to figure out a way to test the startscan button when it has the right kind of data and should find the text "Scan in progress"
//Changing fetching servers to redux broke it

test('renders project menu button', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    const buttonElement = screen.getByText('Test');
    expect(buttonElement).toBeInTheDocument();
  });

test('renders project menu after button click', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    screen.getByText('Test').click();
    const menuElement = screen.getByRole("menu");
    expect(menuElement).toBeInTheDocument();
  });

test('renders start server scan button and gets alert because of faulty data', () => {
    render(<Listbutton obj={{selectedServername: selectedServername}}/>);
    screen.getByText('Start server scan').click();
    expect(global.alert).toHaveBeenCalledTimes(1);
  });

test('renders start server scan button and changes text when clicked', () => {
    render(<Listbutton obj={{selectedServername: selectedServername, serverData: serverData, handleChange: handleChange}}/>);
    screen.getByText('Start server scan').click();
    const buttonElement = screen.getByText("Scan in progress");
    expect(buttonElement).toBeInTheDocument();
  });