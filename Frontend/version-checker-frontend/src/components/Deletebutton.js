import React, { Component, useState, useEffect, version } from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import config from '../config.json';

export default function Deletebutton(props) {

    const deleteServer = (e) => {

        fetch(`${config.url}/api/projects/${props.obj.selectedServername}`,    //add selected project id here eq 'Raahe'
            {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},       
            })
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    alert(`Server ${props.obj.selectedServername} Deleted`);
                    props.obj.handleNewServerAdded(`${props.obj.selectedServername}deleted}`)
                    props.obj.handleChange("Select Server")
                } else {
                    alert(`Something went wrong. Status code: ${res.status}`)
                }   

            })
            .catch(err => alert(`There was an error during deletion ${err}`))
        
    }

    //If pressed OK calls deleteServer()
    const pressOk = (e) => {
        deleteServer(props.obj.selectedServername);
    }

    //Delete button to delete project from server
    const deleteReguest = (e) => {
        window.confirm("Are you sure you want to delete project '"+ props.obj.selectedServername+"'?") &&
            pressOk(e)
    }

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="secondary"
                onClick={deleteReguest}>
                Delete {props.selectedServername}
            </Button>
        </div>
    );
}

// Routes servername data from App.js
Deletebutton.propTypes = {
    selectedServername: PropTypes.string.isRequired
  }

