import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Deletebutton from './Deletebutton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  column: {
    flexBasis: '33.33%',
  }
}));

export default function ServerOverview() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const data = [
    {
      servername: "Raahe",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    },
    {
      servername: "Polarbear",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    },
    {
      servername: "Testi1",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    },
    {
      servername: "Boobies",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    },
    {
      servername: "Testi2",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    },
    {
      servername: "Aasi",
      host: "www.testdomain.com",
      uptime: "HH/MM/SS",
      lastupdated: "Wed Apr 14 2021 14:08:19"
    }
  ];

  //Sorts data into alphabetical order
  data.sort((a, b) => a.servername.localeCompare(b.servername))
 
  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.root} style={{marginTop: 100}}>
        {data.map((accordion) => {
          const { servername, host, uptime, lastupdated } = accordion;
          return (
            <Accordion defaultClosed>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                <div className={classes.column}>
                  <Typography className={classes.heading}>{servername}</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>{host}</Typography>
                </div>
              </AccordionSummary>

              <AccordionDetails className={classes.details}>
                <div className={classes.column} />
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography variant="caption">Tekstiä <br />
                    <a href="#secondary-heading-and-columns" className={classes.link}>
                      Link to project domain
                    </a>
                  </Typography>
                </div>

                <div className={classes.column} />
                <div className={clsx(classes.column, classes.helper)}>
                  <Typography className={classes.heading}>{uptime} <br /> 
                  {lastupdated}</Typography>
                </div>
                  
              </AccordionDetails>
              
              
              <Divider />
              <AccordionActions>
                <Button size="small">Get uptime</Button>
                <Deletebutton />
              </AccordionActions>
            </Accordion>
          );
        })}
      </div>
    </Container>
  );
}



