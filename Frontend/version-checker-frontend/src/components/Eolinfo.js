import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));



export default function Eolinfo(props) {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Title>End-Of-Life Information</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Software name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Eol date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.eols.map((server) => (
            <TableRow key={server.software_name}>
              <TableCell>{server.software_name}</TableCell>
              <TableCell>{server.version}</TableCell>
              <TableCell>{server.eol_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}