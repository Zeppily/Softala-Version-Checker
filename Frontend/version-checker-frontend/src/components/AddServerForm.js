import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import config from '../config.json';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

export default function AddServerForm(props) {
    const [open, setOpen] = React.useState(false);
    const [newserver, setNewserver] = React.useState({
       host: "",
       name: "",
       username: "",
       password: "",
              
    })

    const [confirmpassword, setConfirmpassword] = React.useState("");// password confirmation, is not sent to database

    const handleClickOpen = () => {
        setOpen(true);
    }

    // password hide / visible
    const [values, setValues] = React.useState({
        password: "",
        confirmpassword: "",         // password confirmation, is not sent to database
        showPassword: false,
      });
       const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      }; 
    // password hide / visible


    const submitData = () => {
            if (newserver.password !== confirmpassword){      // password comparison happens here
                alert("Passwords don't match");
            } else {
                let trimhost = newserver.host.trim()
                let trimname = newserver.name.trim()
                let trimusername = newserver.username.trim()
                
                if(trimhost && trimname && trimusername){
                    let trimmedserver = {host: trimhost, name: trimname, username: trimusername, password: newserver.password}
                    addServer(trimmedserver);
                    setNewserver({
                        host: "",
                        name: "",
                        username: "",
                        password: ""
                    })
                    setOpen(false);
                    setConfirmpassword("");
                }else{
                    alert("You must provide Host, Projectname and Username.");
                } 
    } 
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {
            
            setNewserver({...newserver, [event.target.name]: event.target.value});
         
    }

    const addServer = (newserver) => {
        fetch(`${config.url}/api/projects`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newserver)
        })
        .then(_ => {
            alert("New Server added");
            setOpen(false)
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add new server
            </Button>
            <Dialog open={open} onClose={handleCancelClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new server 
                    <Typography component="p" variant="caption">(Fields marked with * are required)</Typography>
                </DialogTitle>
                <DialogContent style={{width:600}}>
                   {/*  
                        <TextField
                        autoFocus
                        margin="dense"
                        id="host"
                        label="Host*"
                        name="host"
                        value={newserver.host}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />*/}
                     <InputLabel style={{marginTop: 20}}>Host*</InputLabel>
                    <Input   
                        margin="dense"
                        id="host"
                        label="Host"
                        name="host"
                        value={newserver.host}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 

                   {/*  <TextField
                        margin="dense"
                        id="name"
                        label="Name*"
                        name="name"
                        value={newserver.name}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />  */}

                    <InputLabel style={{marginTop: 20}}>Name*</InputLabel>
                    <Input   
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        value={newserver.name}
                        onChange={e => inputChanged(e)}
                        fullWidth 
                    /> 
                    
                        {/*       
                        <TextField
                        margin="dense"
                        id="username"
                        label="Username*"
                        name="username"
                        value={newserver.username}
                        onChange={e => inputChanged(e)}
                        fullWidth
                        /> */}

                    <InputLabel style={{marginTop: 20}}>Username*</InputLabel>
                    <Input
                        onChange={e => inputChanged(e)}
                        value={newserver.username}
                        id="username"
                        label="Username"
                        name="username"
                        margin="dense"
                        fullWidth 
                    /> 
                    
                   <InputLabel style={{marginTop: 20}}>Password*</InputLabel>
                    <Input
                        type={values.showPassword ? "text" : "password"}
                        onChange={e => inputChanged(e)}
                        value={newserver.password}
                        label="Password"
                        name="password"
                        margin="dense"
                        fullWidth 
                    /> 

                    <InputLabel style={{marginTop: 20}}>Confirm password*</InputLabel>
                    <Input
                        type={values.showPassword ? "text" : "password"}
                        onChange={e => setConfirmpassword(e.target.value)}
                        value={confirmpassword}
                        label="Confirmpassword"
                        name="confirmpassword"
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