import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import Brightness1Icon from '@material-ui/icons/Brightness1';
import { green } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

// Date comparison of EOL data and Current date
const eol_approaching = (eol_date) => {
  const formatted_eol_date = new Date(eol_date)
  const currentDate = new Date();                                   // Current date
  const diffTime = (formatted_eol_date - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));     // Ceil rounds to next greatest integer


  // Checks if the dates are getting closer to the current date
  if (diffDays >= 182) {                                            // Over half a year left
    return (
      <Brightness1Icon style={{ color: green[500] }} />
    )
  } else if (diffDays < 182 && diffDays >= 90) {                    // Over three months left
    return (
      <Brightness1Icon style={{ color: yellow[500] }} />
    )
  } else if (diffDays < 90 && diffDays > 1) {                       // Less than three months left
    return (
      <Brightness1Icon style={{ color: orange[500] }} />
    )
  } else {                                                          // EOL date is out of date
    return (
      //"Out of date"
      <p style={{ color: red[500] }}>Out of date</p>
    )
  }
}
                                                                 


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
            <TableCell>Eol status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.eols.map((server) => (
            <TableRow key={server.software_name, server.version}>
              <TableCell>{server.software_name}</TableCell>
              <TableCell>{server.version}</TableCell>
              <TableCell>{server.eol_date}</TableCell>
              <TableCell>{eol_approaching(server.eol_date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}