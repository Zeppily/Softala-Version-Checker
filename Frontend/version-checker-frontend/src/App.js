import React, { Component, useState, useEffect, version } from "react";
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Versioninfo from './components/Versioninfo';
import Overview from './components/Overview';
import Eolinfo from './components/Eolinfo';
import Listbutton from './components/Listbutton';
import id from './test.json'
import AddServerForm from "./components/AddServerForm";

import { connect } from "react-redux";
import { selectServername, fetchEolsIfNeeded, invalidateEols, fetchServerSoftwareIfNeeded, invalidateServerSoftware } from './actions'
import PropTypes from 'prop-types'

class App extends Component {
  
  static propTypes = {
    selectedServername: PropTypes.string.isRequired,
    eols: PropTypes.array.isRequired,
    serverSoftware: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedServername } = this.props
    dispatch(fetchEolsIfNeeded(selectedServername))
    dispatch(fetchServerSoftwareIfNeeded(selectedServername))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedServername !== this.props.selectedServername) {
      const { dispatch, selectedServername } = this.props
      dispatch(fetchEolsIfNeeded(selectedServername))
      dispatch(fetchServerSoftwareIfNeeded(selectedServername))
    }
  }

  handleChange = nextServername => {
    this.props.dispatch(selectServername(nextServername))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedServername } = this.props
    dispatch(invalidateEols(selectedServername))
    dispatch(fetchEolsIfNeeded(selectedServername))
    dispatch(invalidateServerSoftware(selectedServername))
    dispatch(fetchServerSoftwareIfNeeded(selectedServername))
  }

  //TODO: Conditional rendering for empty arrays or when fetch doesnt return any rows
  //TODO: Show when the table data has been last updated (Done but needs styling and stuff)
  render() {
    const { selectedServername, eols, isFetching, lastUpdated, serverSoftware, serverSoftwareLastUpdated, serverSoftwareIsFetching, handleRefreshClick } = this.props
    const isEmpty = eols.length === 0
    const serverSoftwareIsEmpty = serverSoftware.length === 0
    return(
      <div className={classes.root}>
        {/* Toolbar/Banner */}
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Version checker
            </Typography>
            <Listbutton obj={{handleChange: this.handleChange, selectedServername: selectedServername}}/>
            <Button variant="contained" color="primary" onClick={this.handleRefreshClick}>
              Update forms
            </Button>
            <AddServerForm />
          </Toolbar>
        </AppBar>

        {/* This is under the topbar for some reason and if taken away cards go under the bar. should be fixed at some point. */}
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              projectName
        </Typography>
      
        {/* Main elements in the dashboard */}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2}>
              {/* Overview */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <Overview />
                </Paper>
              </Grid>

              {/* Software Version Information */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <Versioninfo serverSoftware={serverSoftware}/>
                  <text><h3>Last updated at {new Date(serverSoftwareLastUpdated).toLocaleTimeString()}.{' '} </h3></text>
                </Paper>
              </Grid>

              {/* End-Of-Life Information */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <Eolinfo eols={eols}/>
                  <text><h3>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '} </h3></text>
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedServername, eolsByServername, serverSoftwareByServername } = state
  const {
    isFetching,
    lastUpdated,
    items: eols
  } = eolsByServername [selectedServername] || {
    isFetching: true,
    items: []
  }

  const {
    serverSoftwareIsFetching,
    serverSoftwareLastUpdated,
    serverSoftwareItems: serverSoftware
  } = serverSoftwareByServername [selectedServername] || {
    serverSoftwareIsFetching: true,
    serverSoftwareItems: []
  }

  return {
    selectedServername,
    eols,
    isFetching,
    lastUpdated,
    serverSoftware,
    serverSoftwareIsFetching,
    serverSoftwareLastUpdated
  }
}

export default connect(mapStateToProps)(App)

function createStyling() {
  const myStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24,
      display: 'flex',
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `100%`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 0,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      alignItems: 'left'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  return myStyles
}


const classes = createStyling();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
