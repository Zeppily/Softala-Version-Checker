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

export default function EditServerForm(props) {
    //console.log(props);
    const [open, setOpen] = React.useState(false);
    const [newserver, setNewserver] = React.useState({
       host: props.host,
       name: props.name,
       username: "",
       
    })

   

    const handleClickOpen = () => {
        setOpen(true);
    }

    
    const submitData = () => {
            
                let trimhost = newserver.host.trim()
                let trimname = newserver.name.trim()
                let trimusername = newserver.username.trim()
                
                if(trimhost && trimname && trimusername){
                    let trimmedserver = {host: trimhost, name: trimname, username: trimusername}
                    addServer(trimmedserver);
                    setNewserver({
                        host: "",
                        name: "",
                        username: "",
                        
                    })
                    setOpen(false);
                    
                }else{
                    alert("You must provide Host, Projectname and Username.");
                } 
            } 

    

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {    
        setNewserver({...newserver, [event.target.name]: event.target.value});
    }

    const addServer = (newserver) => {
        fetch(`${config.url}/api/projects/${props.name}`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newserver)
        })
        .then(res => {
            if (res.status == 200 || res.status == 201) {
                alert("Server updated successfully");
                setOpen(false)
                window.location.reload(false); 
            } else {
                alert(`Something went wrong.  Status code: ${res.status}`)
            }
             
        })
        .catch(err => alert(`There was an error with updating a server: ${err}`))

        
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open} onClose={handleCancelClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update 
                    <Typography component="p" variant="caption">(Fields marked with * are required)</Typography>
                </DialogTitle>
                <DialogContent style={{width:500}}>
                    <InputLabel htmlFor="host" style={{marginTop: 20}}>Host*</InputLabel>
                    <Input   
                        margin="dense"
                        id="host"
                        label="Host"
                        name="host"
                        value={newserver.host}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 

                    <InputLabel htmlFor="name" style={{marginTop: 20}}>Name*</InputLabel>
                    <Input   
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        value={newserver.name}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 

                   <InputLabel htmlFor="username" style={{marginTop: 20}}>Username*</InputLabel>                 
                    <Input
                        onChange={e => inputChanged(e)}
                        value={newserver.username}
                        id="username"
                        label="Username"
                        name="username"
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