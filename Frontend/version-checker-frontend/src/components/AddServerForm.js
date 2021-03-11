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
       password: "",
       port: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        props.addServer(newserver);
        setNewserver({
            host: "",
            name: "",
            username: "",
            password: "",
            port: ""
        })
        setOpen(false);
    }

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {
        setNewserver({...newserver, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <Button variant="outlined" size="small" style={{color: "#37bd7a", border:"1px solid", borderColor:"#37bd7a", margin: 10}} onClick={handleClickOpen}>
                Add new server
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        value={newserver.name}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        name="username"
                        value={newserver.username}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        name="password"
                        value={newserver.password}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="port"
                        label="Port"
                        name="port"
                        value={newserver.port}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}