import { render, screen } from '@testing-library/react';
import Overview from '../components/Overview';
import '@testing-library/jest-dom/extend-expect'

//Test data for overview data generation testing
//We should get totalPrograms: 4, updateable: 3, eol approaching: 2, unsupported: 1
let currDate = new Date();

const eols = [
  {software_name: "eol approaching / updateable", version: "1.0", eol_date: new Date().setMonth(currDate.getMonth()+1)},
  {software_name: "unsupported", version: "1.0", eol_date: new Date().setMonth(currDate.getMonth()-1)},
  {software_name: "updateable", version: "2.0", eol_date: new Date().setMonth(currDate.getMonth()+4)},
  {software_name: "eol approaching / updateable v2", version: "2.0", eol_date: new Date().setMonth(currDate.getMonth()+2)}
]

const serverSoftware = [
  {["software.name"]: "eol approaching / updateable", installed_version: "1.0", ["software.latest_version"]: "2.0"},
  {["software.name"]: "unsupported", installed_version: "1.0", ["software.latest_version"]: "1.0"},
  {["software.name"]: "updateable", installed_version: "2.0", ["software.latest_version"]: "3.0"},
  {["software.name"]: "eol approaching / updateable v2", installed_version: "2.0", ["software.latest_version"]: "3.0"}
]

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

test('renders overview data correctly', () => {
  render(<Overview obj = {{eols: eols, serverSoftware: serverSoftware}}/>);
  const totalPrograms = screen.getByText("4");
  const updateable = screen.getByText("3");
  const eolapproaching = screen.getByText("2");
  const unsupported = screen.getByText("1");
  expect(totalPrograms).toBeInTheDocument();
  expect(updateable).toBeInTheDocument();
  expect(eolapproaching).toBeInTheDocument();
  expect(unsupported).toBeInTheDocument();
});