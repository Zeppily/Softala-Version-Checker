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
        fetch('http://localhost:8080/projects')
          .then((response) => response.json())
          .then((data) => setProjects(data))
          .catch((error) => console.error(error))
      }, []);

    //TODO: Finish handle update so it calls a function that starts server scan and updates the EoL info to the database  
    const handleUpdate = (event) => {
      
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
            onClick={handleUpdate}
            >
          Update
        </Button>
        </div>
    );

    
  }

  LongMenu.propTypes = {
    obj: PropTypes.object.isRequired
  }