import React from 'react';
import { Grid, Paper } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Overview(props) {
  const classes = useStyles();
  const data = props.obj.serverSoftware;
  const eols = props.obj.eols;
  const currentDate = new Date();
  const currDateString = currentDate.toString();

  let totalprograms = 0;
  let updateable = 0; 
  let eolapproaching = 0; 
  let unsupported = 0;

  console.log(data);

  if (Array.isArray(data)) {
    totalprograms = data.length;
    data.forEach(software => {
      if(software.installed_version != software["software.latest_version"]){
        updateable++;
      }
    })
  }

  if (Array.isArray(eols)) {
    eols.forEach(eol => {
      if ((new Date(eol.eol_date) - currentDate) < 0) {
        unsupported++;
      } else if (((new Date(eol.eol_date) - currentDate) < 90 )) {
        eolapproaching++;
      }
    })
  }
  
  console.log("totalprograms:", totalprograms, "updateable:", updateable, "eolapproaching:", eolapproaching, "unsuported:", unsupported);


  return (
    <React.Fragment>
      <Title>Overview</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
          Last updated:  {currDateString}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Title>Total Programs</Title>
          <Typography component="p" variant="h4">
            {totalprograms}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Title>Updateable</Title>
          <Typography component="p" variant="h4">
            {updateable}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Title>EOL Approaching</Title>
          <Typography component="p" variant="h4">
            {eolapproaching}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Title>Unsupported</Title>
          <Typography component="p" variant="h4">
            {unsupported.toString()}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}