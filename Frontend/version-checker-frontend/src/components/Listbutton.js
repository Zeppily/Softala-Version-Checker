import React, { Component, useState, useEffect, version } from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import config from '../config.json';
import { Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

  const ITEM_HEIGHT = 48;
  
  export default function LongMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    //Gets the default value set for Redux for useState
    const [currentProject, setCurrentProject] = useState(props.obj.selectedServername);
    
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState(props.obj.serverData);
    const [conditional, setConditional] = useState(true);

    console.log(props.obj.serverData[0].name);

    const checkData = (dataToCheck) => {
      if (Array.isArray(dataToCheck)) {
        setConditional(false)
      }
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      checkData(projects)
    };
  
    //When a project is changed from the dropdown menu
    //Closes the menu
    //Uses the handlechange function from the App.js file to update selectedServer
    //Changes the const that determines what is on the button
    const handleProjectChange = (servername) => {
     
      handleClose()
      props.obj.handleChange(servername)
      setCurrentProject(servername)
    }

    const handleClose = () => {
      setAnchorEl(null);
      
    };

    //Gets project names for the dropdown menu
    useEffect(() => {
        setProjects(props.obj.serverData) 

        handleProjectChange(props.obj.serverData[0].name)

    }, []);



    
    //Calls the backend to start the whole scan process
    const initiateScan = (event) => {
      //projects should never be falsy but you can never be too sure
      if (Array.isArray(projects)) {
        const projectnames = projects.map(project => project.name);
        const projectnamesObj = {name: projectnames};
        setLoading(true);
        fetch(`${config.url}/api/startscan`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(projectnamesObj)
        })
        .then(response => response.json())
        .then((data) => alert(data.message))
        .then(_ => {
          props.obj.handleRefreshClick(event);
          setLoading(false)
        })
        .catch(err => console.error(err))
      } else {
        setLoading(true)
        alert("Array of servers to be scanned was empty. Scan not successful")
        setLoading(false)
      }
    };

    //Sorts data into alphabetical order if the projects is an array
    if (Array.isArray(projects)) {
      projects.sort((a, b) => a.name.localeCompare(b.name))
    }
    
    return (
      <div>
        <Button 
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
         //style={{marginBottom: 10}}
          style={{marginRight: 40}}
          endIcon={<ExpandMoreIcon />}
        >
          
          {currentProject}
          
        </Button>
        
        { conditional ?
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
              Is empty
            </MenuItem>
          </Menu>
          :
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {projects.map((option) => (
              <MenuItem key={option.host} onClick={() => handleProjectChange(option.name)}>
                {option.name}
              </MenuItem>
            ))}
          </Menu>
        }
        

        { loading? 
          <Button>Scan in progress</Button> 
          :
          <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={initiateScan}>
            Start server scan
          </Button>
        }
      </div>
    );

    
  }

  LongMenu.propTypes = {
    obj: PropTypes.object.isRequired
  }