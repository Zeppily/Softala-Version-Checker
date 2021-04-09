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
import Listbutton from './Listbutton';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Versioninfo(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Software Version Information</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Latest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.serverSoftware.map((server) => (
            <TableRow key={server["software.name"]}>
              <TableCell>{server["software.name"]}</TableCell>
              <TableCell>{server.installed_version}</TableCell>
              <TableCell>{server["software.latest_version"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}