import React, { Component, useState, useEffect, version } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, GridList, GridListTile } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Versioninfo from '../components/Versioninfo';
import Overview from '../components/Overview';
import Eolinfo from '../components/Eolinfo';
import Listbutton from '../components/Listbutton';
import AddServerForm from "../components/AddServerForm";
import Deletebutton from '../components/Deletebutton';
import { connect } from "react-redux";
import { selectServername, fetchEolsIfNeeded, invalidateEols, 
          fetchServerSoftwareIfNeeded, invalidateServerSoftware, 
          invalidateServers, fetchServersIfNeeded, newServerAdded } from '../actions';
import PropTypes from 'prop-types';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";


class ServerOverview extends Component {
  static propTypes = {
    selectedServername: PropTypes.string.isRequired,
    eols: PropTypes.array.isRequired,
    serverSoftware: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    serverData: PropTypes.array.isRequired,
    selectAllServers: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { dispatch, selectAllServers } = this.props
    dispatch(fetchServersIfNeeded(selectAllServers))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectAllServers !== this.props.selectAllServers) {
      const { dispatch, selectAllServers } = this.props
      dispatch(fetchServersIfNeeded(selectAllServers))
    }
  }

  handleNewServerAdded = (newServerName) => {
    this.props.dispatch(newServerAdded(newServerName))
  }

  handleChange = nextServername => {
    this.props.dispatch(selectServername(nextServername))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectAllServers } = this.props
    dispatch(invalidateServers(selectAllServers))
  }

  render() {
    const { selectedServername, handleRefreshClick, serverData, 
      serversIsFetching, serversLastUpdated } = this.props
      // let isEmptySoft = false
      // if(typeof serverSoftware != 'object'){
      //   isEmptySoft = true
      // } else {
      //   isEmptySoft = serverSoftware.length === 0
      // }
      // let isEmptyEol = eols.length === 0
      // if(Array.isArray(eols) == false){
      //    isEmptyEol = true
      // }
      console.log(serverData)
      
      return (
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.root} style={{marginTop: 100}}>
              {serverData.map((accordion) => {
                let { name, host, uptime, lastupdated } = accordion;
                if(!uptime){uptime = 0}
                console.log('servername: ', name)
                console.log('host: ', host)
                console.log('uptime: ', uptime)
                console.log('lastupdated: ', lastupdated)
                return (
                  <Accordion defaultClosed>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                      <div className={classes.column}>
                        <Typography className={classes.heading}>{name}</Typography>
                      {/* </div>
                      <div className={classes.column}> */}
                        {/* <Typography style={{leftMargin: 20, rightMargin: 20}}> {} </Typography> */}
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
                        <Typography className={classes.heading}>Total uptime: {uptime} days <br /> 
                        {lastupdated}</Typography>
                      </div>
                        
                    </AccordionDetails>
                    
                    
                    <Divider />
                    <AccordionActions>
                      <Button size="small">Get uptime</Button>
                      <Deletebutton obj = {{
                            selectedServername: name, 
                            handleNewServerAdded: this.handleNewServerAdded,
                            handleChange: this.handleChange
                    }}/>   {/* sends servername data to Deletebutton.js */}
                    </AccordionActions>
                  </Accordion>
                );
              })}
            </div>
          </Container>
      )
          
  }
} 

  


const mapStateToProps = state => {
  const { selectedServername, selectAllServers, serverInfo } = state

  const {
    serversIsFetching,
    serversLastUpdated,
    serversItems: serverData
  } = serverInfo [selectAllServers] || {
    serversIsFetching: true,
    serversItems: []
  }

  return {
    selectedServername,
    serverData,
    serversIsFetching,
    serversLastUpdated,
    selectAllServers
  }
}

export default connect(mapStateToProps)(ServerOverview)

function createStyling() {
  const myStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }))

  console.log(myStyles)
  return myStyles
}
// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     width: "80%"
// //   },
// //   heading: {
// //     fontSize: theme.typography.pxToRem(15),
// //     flexBasis: "33.33%",
// //     flexShrink: 0
// //   },
// //   container: {
// //     paddingTop: theme.spacing(4),
// //     paddingBottom: theme.spacing(4),
// //   },
// //   column: {
// //     flexBasis: '33.33%',
// //   }
// // }));


const classes = createStyling();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionActions from "@material-ui/core/AccordionActions";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Divider from "@material-ui/core/Divider";
// import Button from "@material-ui/core/Button";
// import clsx from 'clsx';
// import Container from '@material-ui/core/Container';
// import Deletebutton from './Deletebutton';
// import { fetchServersIfNeeded } from '../actions';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "80%"
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: "33.33%",
//     flexShrink: 0
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   column: {
//     flexBasis: '33.33%',
//   }
// }));

// export default function ServerOverview() {
//   console.log(fetchServersIfNeeded)
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const data = [
//     {
//       servername: "Raahe",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     },
//     {
//       servername: "Polarbear",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     },
//     {
//       servername: "Testi1",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     },
//     {
//       servername: "Boobies",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     },
//     {
//       servername: "Testi2",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     },
//     {
//       servername: "Aasi",
//       host: "www.testdomain.com",
//       uptime: "HH/MM/SS",
//       lastupdated: "Wed Apr 14 2021 14:08:19"
//     }
//   ];

//   //Sorts data into alphabetical order
//   data.sort((a, b) => a.servername.localeCompare(b.servername))
 
//   return (
//     <Container maxWidth="lg" className={classes.container}>
//       <div className={classes.root} style={{marginTop: 100}}>
//         {data.map((accordion) => {
//           const { servername, host, uptime, lastupdated } = accordion;
//           return (
//             <Accordion defaultClosed>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
//                 <div className={classes.column}>
//                   <Typography className={classes.heading}>{servername}</Typography>
//                 </div>
//                 <div className={classes.column}>
//                   <Typography className={classes.secondaryHeading}>{host}</Typography>
//                 </div>
//               </AccordionSummary>

//               <AccordionDetails className={classes.details}>
//                 <div className={classes.column} />
//                 <div className={clsx(classes.column, classes.helper)}>
//                   <Typography variant="caption">Tekstiä <br />
//                     <a href="#secondary-heading-and-columns" className={classes.link}>
//                       Link to project domain
//                     </a>
//                   </Typography>
//                 </div>

//                 <div className={classes.column} />
//                 <div className={clsx(classes.column, classes.helper)}>
//                   <Typography className={classes.heading}>{uptime} <br /> 
//                   {lastupdated}</Typography>
//                 </div>
                  
//               </AccordionDetails>
              
              
//               <Divider />
//               <AccordionActions>
//                 <Button size="small">Get uptime</Button>
//                 <Deletebutton />
//               </AccordionActions>
//             </Accordion>
//           );
//         })}
//       </div>
//     </Container>
//   );
// }



