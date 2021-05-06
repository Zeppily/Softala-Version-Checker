import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Deletebutton from '../components/Deletebutton';

const selectedServername = "Test"
const serverData = [{host: "fakeaddr", name: "test", username: "fakeUser", password: "fakePass"}]
const handleChange = nextServername => {
    this.props.dispatch(selectedServername(nextServername))
  }

global.alert = jest.fn();
global.confirm = jest.fn()

afterAll(() => {
  jest.fn().mockClear
})

//TODO: Need to figure out a way to test the startscan button when it has the right kind of data and should find the text "Scan in progress"
//Changing fetching servers to redux broke it

test('renders project delete button', () => {
    render(
        <Deletebutton obj = {{
            selectedServername: selectedServername, 
            handleChange: handleChange
    }}/>
    );
    const buttonElement = screen.getByText('Delete');
    expect(buttonElement).toBeInTheDocument();
  });

test('renders delete button and gets confirm window popup', () => {
    render(
        <Deletebutton obj = {{
            selectedServername: selectedServername, 
            handleChange: handleChange
    }}/>
    );
    screen.getByText('Delete').click();
    expect(global.confirm).toHaveBeenCalledTimes(1);
  });