import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import config from '../config.json';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

export default function AddEolForm(props) {
    const [open, setOpen] = React.useState(false);
    const [neweol, setNewEol] = React.useState({
       software_name: "",
       version: "",
       eol_date: "",   
    })
    
    const submitData = async (e) =>{  
        await addEol(neweol)
            props.handleRefreshClick(e)
            setNewEol({
                software_name: "",
                version: "",
                eol_date: "",   
            })                
    }

   const handleClickOpen = () => {
        setOpen(true);
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {    
        setNewEol({...neweol, [event.target.name]: event.target.value});
    }

    const addEol = async (neweol) => {
       await fetch(`${config.url}/api/eols`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(neweol)
        }) 
        
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                    setOpen(false);
                    alert("New Eol added");
            } else {
                    alert(`Something went wrong.  Status code: ${res.status}`)
            }
             
        })
       
        .catch(err => alert(`There was an error with adding a new EOL: ${err}`))

         
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add new software to the EOL list
            </Button>
            <Dialog open={open} onClose={handleCancelClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new software to the EOL list
                    <Typography component="p" variant="caption">(Fields marked with * are required)</Typography>
                </DialogTitle>
                <DialogContent style={{width:500}}>
                    <InputLabel htmlFor="software_name" style={{marginTop: 20}}>Software Name*</InputLabel>
                    <Input   
                        margin="dense"
                        id="software_name"
                        label="software_name"
                        name="software_name"
                        value={neweol.software_name}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 

                    <InputLabel htmlFor="version" style={{marginTop: 20}}>Version*</InputLabel>
                    <Input   
                        margin="dense"
                        id="version"
                        label="version"
                        name="version"
                        value={neweol.version}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 

                    <InputLabel htmlFor="eol_date" style={{marginTop: 20}}>EOL date*</InputLabel>
                    <Input
                        onChange={e => inputChanged(e)}
                        value={neweol.eol_date}
                        id="eol_date"
                        label="eol_date"
                        name="eol_date"
                        margin="dense"
                        fullWidth
                    /> 
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={submitData} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}