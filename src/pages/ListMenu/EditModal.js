import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { FirebaseContext } from '../../components/Firebase';
import {useSelector, useDispatch} from 'react-redux';
import {affMenu} from '../../Redux/Actions/menu';


const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    exampleWrapper: {
      position: 'relative',
      marginTop: theme.spacing(3),
      height: 380,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
}));
  

  
const EditModal = () => {

    const classes = useStyles();

    let id = '';
    let name ='';
    let position = '';

    // LIRE LES DONNÉES DU REDUCER
    const {menu : {affModalMenu, data}} = useSelector(state => state) 
        console.log(affModalMenu, data)

    if (data !== null) {
        id = data.id
        name = data.name
        position = data.position
    }

    const dispatchMenu = useDispatch()
    

    const {queryOneMenu, queryMenu} = useContext(FirebaseContext);

    const [open, setOpen] = React.useState(false);
    //const [openSpeed, setOpenSpeed] = React.useState(false)
    const [valueName, setValueName] = useState(name)
    const [valuePosition, setValuePosition] = useState(position)

    
    const handleClickOpen = () => {
        // setOpen(true);
        dispatchMenu(
            affMenu({affModalMenu: !affModalMenu, data:null})
        )
        
    };

    const handleClose = () => {
        // setOpen(false);
        dispatchMenu(
            affMenu({affModalMenu: false, data:null})
        )
    };

    const onChangeName = (e) => {
        (e.target.value != undefined) && setValueName(e.target.value);

        console.log(e.target.value)
    }

    const onChangePosition = (e) => {
        (e.target.value != undefined) && setValuePosition(e.target.value);
        
        console.log(e.target.value)
    }

    const save = () => {

        if (data != null ) {
            queryOneMenu(id).update({name:valueName, 
                position:parseInt(valuePosition)}) 

        } else {
            queryMenu().add({
                image:'nc',
                name: valueName,
                position: valuePosition
            })
        }
        
        handleClose()
       

        console.log("save", id, valueName, valuePosition)
    }

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                hidden={affModalMenu}
                icon={<SpeedDialIcon />}
                open={false}
                direction={"up"}
                onClick={handleClickOpen}
            />
            
        
        <Dialog open={affModalMenu} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ajouter Menu</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <TextField 
                    id="name" 
                    label="Nom du menu" 
                    variant="outlined"
                    onChange={onChangeName}
                    defaultValue={name} 
                    style={{marginRight:20}}
                />
            </DialogContentText>
                <TextField 
                    id="position" 
                    label="Position" 
                    variant="outlined"
                    onChange={onChangePosition}
                    defaultValue={position} 
                    type="number"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Annuler
            </Button>
            <Button onClick={save} color="primary">
                Enregistrer
            </Button>
            </DialogActions>
        </Dialog>

        </div>
    );
}

export default EditModal
