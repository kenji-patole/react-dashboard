import React, {useState, useContext, useEffect} from 'react';
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
import {affProduit} from '../../Redux/Actions/produit';
import { PersonPinCircleOutlined } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


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
  

  
const EditModalProduit = () => {

    const classes = useStyles();

    let id = '';
    let name ='';
    let price = '';
    
    // LIRE LES DONNÉES DU REDUCER
    const {produit : {affModalProduit, data}} = useSelector(state => state) 
        console.log(affModalProduit, data)
    
    const [dataMenu, setDataMenu] = useState(null)
    
        useEffect(() => {
            queryMenus().get().then(snapshot => {
            
                let  dataMenus = snapshot.docs.map(menu => {
                    return (
                        {id: menu.id, ...menu.data()}
                    )
                })
        
                setDataMenu(dataMenus)
        
                //console.log(dataMenu)
            })
            
            return () => {
                
            }
        }, [])

    if (data !== null) {
        id = data.id
        name = data.name
        price = data.price
    }
    

    const dispatchProduit = useDispatch()


    const {queryOneProduit, queryProduit, queryMenus} = useContext(FirebaseContext);
    

    

    
    const [open, setOpen] = React.useState(false);
    //const [openSpeed, setOpenSpeed] = React.useState(false)
    const [valueName, setValueName] = useState(name)
    const [valuePrice, setValuePrice] = useState(price)
    

    
    const handleClickOpen = () => {
        // setOpen(true);
        dispatchProduit(
            affProduit({affModalProduit: !affModalProduit, data:null})
        )
        
    };

    const handleClose = () => {
        // setOpen(false);
        dispatchProduit(
            affProduit({affModalProduit: false, data:null})
        )
    };

    const onChangeName = (e) => {
        (e.target.value != undefined) && setValueName(e.target.value);

        console.log(e.target.value)
    }

    const onChangePrice = (e) => {
        (e.target.value != undefined) && setValuePrice(e.target.value);
        
        console.log(e.target.value)
    }

    const save = () => {

        if (data != null ) {
            queryOneProduit(id).update({name:valueName, 
                price:parseInt(valuePrice)}) 

        } else {
            queryProduit().add({
                image:'nc',
                name: valueName,
                price: valuePrice
            })
        }
        
        handleClose()
       

        console.log("save", id, valueName, valuePrice)
    }

    return (
        <div>
            <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            hidden={affModalProduit}
            icon={<SpeedDialIcon />}
            open={false}
            direction={"up"}
            onClick={handleClickOpen}
            />
            
        
        <Dialog open={affModalProduit} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Ajouter Produit</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <TextField 
                    id="name" 
                    label="Nom du produit" 
                    variant="outlined"
                    onChange={onChangeName}
                    defaultValue={name} 
                    style={{marginRight:20}}
                />
            </DialogContentText>
                <TextField 
                    id="price" 
                    label="Price" 
                    variant="outlined"
                    onChange={onChangePrice}
                    defaultValue={price} 
                    type="number"
                /> 
            <DialogContentText>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    fullWidth
                >
                   {(dataMenu != null) && dataMenu.map(item => (<MenuItem key={item.id} value={item.id}>
                        <em>{item.name}</em>
                    </MenuItem>))}
    
                </Select>
            </DialogContentText>
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

export default React.memo(EditModalProduit)
