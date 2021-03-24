import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddServerForm(props) {
    const [open, setOpen] = React.useState(false);
    const [newserver, setNewserver] = React.useState({
       host: "",
       name: "",
       username: "",
       password: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const submitData = () => {
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
        fetch("http://localhost:8000/api/projects",
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
            <Button variant="contained" color="primary" style={{border:"1px solid", margin: 10}} onClick={handleClickOpen}>
                Add new server
            </Button>
            <Dialog open={open} onClose={handleCancelClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new server</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="host"
                        label="Host"
                        name="host"
                        value={newserver.host}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        value={newserver.name}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="username"
                        label="Username"
                        name="username"
                        value={newserver.username}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        name="password"
                        value={newserver.password}
                        onChange={e => inputChanged(e)}
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