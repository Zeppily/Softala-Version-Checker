import React, { useState, useEffect } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// At the moment this is same as the Versioninfo.js 
// When we have more specific info about the Eol-dates this will be updated.

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Eolinfo() {
  const classes = useStyles();

  const [servers, setServers] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:8080/info/Raahe')
          .then((response) => response.json())
          .then((data) => setServers(data))
          .catch((error) => console.error(error))
      }, []);   

  console.log(servers);

  return (
    <React.Fragment>
      <Title>End-Of-Life Information</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Latest</TableCell>
            <TableCell>npm</TableCell>
            <TableCell>postgreSQL</TableCell>
            <TableCell>OS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servers.map((server) => (
            <TableRow key={server.name}>
              <TableCell>{server.name}</TableCell>
              <TableCell>{server.installed_version}</TableCell>
              <TableCell>{server.latest_version}</TableCell>
              <TableCell>{server.npm}</TableCell>
              <TableCell>{server.postgreSQL}</TableCell>
              <TableCell>{server.os}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Update EOL info
        </Link>
      </div>
    </React.Fragment>
  );
}