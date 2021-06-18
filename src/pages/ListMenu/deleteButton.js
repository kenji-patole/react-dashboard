import React, {useContext, useState} from 'react'
import { FirebaseContext } from '../../components/Firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteButton = ({id}) => {

    const {queryOneMenu} = useContext(FirebaseContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteMenu = async () => {
      
      console.log(id)
      setOpen(false)
        

      await queryOneMenu(id).delete()
       
    }


    return (

      <div>

        <IconButton aria-label="delete"  color="secondary" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Supprimez"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirmez vous la suppression
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Non
            </Button>
            <Button onClick={deleteMenu} color="primary" autoFocus>
              Oui
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
}

export default DeleteButton
