import React, { Component, useState, useEffect, version } from "react";
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Deletebutton from '../components/Deletebutton';
import { connect } from "react-redux";
import { selectServername, invalidateServers, fetchServersIfNeeded, newServerAdded } from '../actions';
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
                      
                        <Typography className={classes.secondaryHeading}>{host}</Typography>
                      </div>
                    </AccordionSummary>
    
                    <AccordionDetails className={classes.details}>
                      <div className={classes.column} />
                        <div className={clsx(classes.column, classes.helper)}>
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
                              onClick={()=> this.handleChange(name)}
                          >
                              {name} information
                          </NavLink>

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


const classes = createStyling();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
