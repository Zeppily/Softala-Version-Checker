import React, { Component, useState, useEffect, version } from "react";
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Deletebutton from '../components/Deletebutton';
import AddServerForm from '../components/AddServerForm';
import { connect } from "react-redux";
import { selectServername, invalidateServers, fetchServersIfNeeded, newServerAdded } from '../actions';
import PropTypes from 'prop-types';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import EditServerForm from './EditServerForm.js';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';


class ServerOverview extends Component {
  static propTypes = {
    selectedServername: PropTypes.string.isRequired,
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

    //get total number of servers
    var totalServers = serverData.length;

    // loops through servers that have failed
    let i =0;
    serverData.forEach(e => {
      if(e.scansuccessful != true){
      i++
      }})

    const notPassingServers = i;


    return (

      <Container maxWidth="lg" className={classes.container}>
        <div style={{ marginTop: 100 }}>
          <h1>SERVER OVERVIEW</h1>
          <h3>List of all servers</h3>
          <p>You can view and edit server info here</p>
          <AddServerForm handleNewServerAdded={this.handleNewServerAdded} />
        </div>
        <Grid container>
          <Grid item xs={2}>
             <p>Total servers</p> 
             <h3>{totalServers}</h3>
          </Grid>
          <Grid item xs={4}>
             <p>Servers not passing scan</p> 
             <h3>{notPassingServers}</h3>
          </Grid>
        </Grid>
       
        <div className={classes.root} style={{ marginTop: 50 }}>
          <div>
          <Grid container style={{marginBottom:10}}>
          <Grid item xs={4}>
            <Typography className={classes.heading} style={{ marginLeft: 15 }}>Name</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.heading}style={{ marginLeft: 115 }}>Host</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.heading} style={{ marginLeft: 50 }}>Scan status</Typography>
          </Grid>
          </Grid>
          </div>

          {serverData.map((accordion) => {
            let { name, host, uptime, lastupdated, timestamp, scansuccessful } = accordion; // add password here?
            if (!uptime) { uptime = 0 }
          
              //This works!
              // here boolean comparison weather the latest scan has been successful
              var booleanValue = scansuccessful;// import the scan status here from props
              var scanStatus = "";

                if(booleanValue == true) {
                  scanStatus=(<Brightness1Icon style={{ color: green[500] }} />);
                } else {
                  scanStatus=(<Brightness1Icon style={{ color: red[500] }} />);
                } 

            return (
              <Accordion defaultClosed>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
                  <Grid item xs={4}>
                    <div className={classes.column}>
                      <Typography className={classes.heading}>{name}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.column} style={{ marginLeft: 120 }}>
                      <Typography className={classes.secondaryHeading}>{host}</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className={classes.column} style={{ marginLeft: 120 }}>
                      {/* <Typography className={classes.secondaryHeading} >boolean</Typography> */}
                      {/* <Brightness1Icon style={{ color: green[500] }} /> */}
                      {scanStatus}
                    </div>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails className={classes.details}>
                  <div className={classes.column} />
                  <div className={clsx(classes.column, classes.helper)}>
                    <Typography className={classes.heading}>

                     Date of last scan: {timestamp} {/* server timestamp */}
                    </Typography>
                    <Typography className={classes.heading}>
                      Total uptime: {uptime} days
                    </Typography>
                    <Typography className={classes.heading}>
                      <a href={"https://" + host}>
                        Link to project domain
                      </a>
                    </Typography>

                        <NavLink
                          exact to="/"
                          onClick={() => this.handleChange(name)}>
                          {name} information
                        </NavLink>

                    
                  </div>
                </AccordionDetails>

                <Divider />
                <AccordionActions>
                  {/* <Button size="small">Get uptime</Button> */}

                  {/* EDIT SERVER INFORMATION */}
                  <EditServerForm handleNewServerAdded={this.handleNewServerAdded} name={name} host={host} />

                  <Deletebutton obj={{
                    selectedServername: name,
                    handleNewServerAdded: this.handleNewServerAdded,
                    handleChange: this.handleChange
                  }} />   {/* sends servername data to Deletebutton.js */}
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
  } = serverInfo[selectAllServers] || {
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


const classes = createStyling();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
