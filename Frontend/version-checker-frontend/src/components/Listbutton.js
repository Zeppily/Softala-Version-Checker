import React, { Component, useState, useEffect, version } from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Versioninfo from "./Versioninfo";


  
  const ITEM_HEIGHT = 48;
  
  export default function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const sendName = (servername) => {
      handleClose()
      Versioninfo(servername)
    }

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/projects')
          .then((response) => response.json())
          .then((data) => setProjects(data))
          .catch((error) => console.error(error))
      }, []);

    console.log(projects);

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
        Servers
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
            <MenuItem key={option.name} onClick={() => sendName(option.name)}>
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