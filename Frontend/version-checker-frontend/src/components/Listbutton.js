import React, { Component, useState, useEffect, version } from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

  const ITEM_HEIGHT = 48;
  
  export default function LongMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    //Gets the default value set for Redux for useState
    const [currentProject, setCurrentProject] = useState(props.obj.selectedServername);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
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

    const [projects, setProjects] = useState([]);

    //Gets project names for the dropdown menu
    useEffect(() => {
        fetch('http://localhost:8000/api/projects')
          .then((response) => response.json())
          .then((data) => setProjects(data.data))
          .catch((error) => console.error(error))
          
      }, []);




    //TODO: Finish "initiate scan" so it calls a function that starts server scan and updates the EoL info to the database 
  
    const initiateScan = (event) => {
      const projectnames = projects.map(project => project.name);
      const projectnamesObj = {projects: projectnames}
      console.log(JSON.stringify(projectnamesObj))
      fetch("http://localhost:8000/startscan",
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(projectnamesObj)
      })
      .then(response => response.json())
      .then((data) => console.log(data))
      .then(_ => {
        props.obj.handleRefreshClick();
      })
      .catch(err => console.error(err))
    };
  


    return (
      <div>
        <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{marginLeft: 30}}
      >
        {currentProject}
      </Button>
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
            <MenuItem key={option.name} onClick={() => handleProjectChange(option.name)}>
              {option.name}
            </MenuItem>
          ))}
        </Menu>
        <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={initiateScan}>
          Start server scan
        </Button>
        </div>
    );

    
  }

  LongMenu.propTypes = {
    obj: PropTypes.object.isRequired
  }