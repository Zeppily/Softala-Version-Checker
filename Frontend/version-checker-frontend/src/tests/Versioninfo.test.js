import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Versioninfo from '../components/Versioninfo';

const serverSoftware = [
    {["software.name"]: "name1", installed_version: "installed1", ["software.latest_version"]: "latest1"},
    {["software.name"]: "name2", installed_version: "installed2", ["software.latest_version"]: "latest2"},
    {["software.name"]: "name3", installed_version: "installed3", ["software.latest_version"]: "latest3"}
]

test('renders software info table', () => {
    render(<Versioninfo serverSoftware = {serverSoftware}/>);
    const tableElement = screen.getByText(/latest3/i);
    expect(tableElement).toBeInTheDocument();
  });

test('renders software info table title', () => {
    render(<Versioninfo serverSoftware = {serverSoftware}/>);
    const tableTitle = screen.getByText(/Software Version Information/i);
    expect(tableTitle).toBeInTheDocument();
  });