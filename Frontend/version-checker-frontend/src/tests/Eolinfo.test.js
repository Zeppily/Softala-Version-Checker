import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Eolinfo from '../components/Eolinfo';

const eols = [
    {software_name: "name1", version: "version1", eol_date: "date1"},
    {software_name: "name2", version: "version2", eol_date: "date2"},
    {software_name: "name3", version: "version3", eol_date: "date3"}
]

test('renders eol table', () => {
    render(<Eolinfo eols = {eols}/>);
    const tableElement = screen.getByText(/date3/i);
    expect(tableElement).toBeInTheDocument();
  });

test('renders eol table title', () => {
    render(<Eolinfo eols = {eols}/>);
    const tableTitle = screen.getByText(/End-Of-Life Information/i);
    expect(tableTitle).toBeInTheDocument();
  });