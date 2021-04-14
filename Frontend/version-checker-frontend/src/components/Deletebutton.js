import React, { Component, useState, useEffect, version } from "react";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'

export default function Deletebutton(props) {

    


    const deleteServer = (e) => {

            alert('deleteServer called '+props.selectedServername)

            /* fetch(`${config.url}/api/projects/`+id,    //add selected project id here eq 'Raahe'
            {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                
            })
            .then(_ => {
                alert("Server Deleted");
                setOpen(false)
            })
            .catch(err => console.error(err)) */
        
    }

    //If pressed OK AGAIN, calls deleteServer()
    const pressOkAgain = (e) => {
        deleteServer(props.selectedServername);
        alert('Server "' + props.selectedServername + '" has been deleted.') 
        // here call function that does the DELETE request.

    }
    //If pressed OK, asks again if you really want to delete the project
    const pressOk = (e) => {
        window.confirm("This action can't be undone. Are you really sure?") &&
            pressOkAgain(e)
    }

    //Delete button to delete project from server
    const deleteReguest = (e) => {
        window.confirm("Are you sure you want to delete project '"+ props.selectedServername+"'?") &&
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
