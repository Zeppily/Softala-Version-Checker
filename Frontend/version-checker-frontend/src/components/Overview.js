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

export default function Overview() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Overview</Title>
      <Grid container>
        <Grid item xs={6}>
          <Title>Total Programs</Title>
          <Typography component="p" variant="h4">
            15
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              More info
            </Link>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Title>Updateable</Title>
          <Typography component="p" variant="h4">
            3
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              More info
            </Link>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Title>EOL Approaching</Title>
          <Typography component="p" variant="h4">
            7
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              More info
            </Link>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Title>Unsupported</Title>
          <Typography component="p" variant="h4">
            1
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            on 15 March, 2019
          </Typography>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
              More info
            </Link>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}