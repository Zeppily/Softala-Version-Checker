import { render, screen } from '@testing-library/react';
import ServerOverview from '../components/ServerOverview';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = [ thunk ]

//Creating a store for the Redux so we can access required resources from other components
const store = createStore(
  reducer, 
  applyMiddleware(...middleware)
)

test('renders server overview title component', () => {
  render(
        <Provider store={store}>
            <ServerOverview />
        </ Provider>
    );
  const textElement = screen.getByText(/Server Overview/i);
  expect(textElement).toBeInTheDocument();
});

test('renders title total servers', () => {
    render(
        <Provider store={store}>
            <ServerOverview />
        </ Provider>
    );
    const textElement = screen.getByText(/Total Servers/i);
    expect(textElement).toBeInTheDocument();
  });
  
  test('renders title servers not passing scan', () => {
    render(
        <Provider store={store}>
            <ServerOverview />
        </ Provider>
    );
    const textElement = screen.getByText(/Servers not passing scan/i);
    expect(textElement).toBeInTheDocument();
  });

  test('renders title scan successful', () => {
    render(
        <Provider store={store}>
            <ServerOverview />
        </ Provider>
    );
    const textElement = screen.getByText(/Scan status/i);
    expect(textElement).toBeInTheDocument();
  });
  
//   test('renders overview data correctly', () => {
//     render(<Overview obj = {{eols: eols, serverSoftware: serverSoftware}}/>);
//     const totalPrograms = screen.getByText("4");
//     const updateable = screen.getByText("3");
//     const eolapproaching = screen.getByText("2");
//     const unsupported = screen.getByText("1");
//     expect(totalPrograms).toBeInTheDocument();
//     expect(updateable).toBeInTheDocument();
//     expect(eolapproaching).toBeInTheDocument();
//     expect(unsupported).toBeInTheDocument();
//   });