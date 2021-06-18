import React, {useState, useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/SaveAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import { FirebaseContext } from '../../components/Firebase'

const Edit = ({id, name, position}) => {

    const {queryOneMenu} = useContext(FirebaseContext);

    const [valueName, setValueName] = useState(name)
    const [valuePosition, setValuePosition] = useState(position)

    const onChangeName = (e) => {
        (e.target.value != undefined) && setValueName(e.target.value);

        console.log(e.target.value)
    }

    const onChangePosition = (e) => {
        (e.target.value != undefined) && setValuePosition(e.target.value);
        
        console.log(e.target.value)
    }

    const save = () => {
        queryOneMenu(id).update({name:valueName, 
                                 position:parseInt(valuePosition)})

        console.log("save", "valueName : ",valueName, "valuePosition :", valuePosition)
    }

    return (
        <div>
            <TextField 
                id="name" 
                label="Nom du menu" 
                variant="outlined"
                onChange={onChangeName}
                defaultValue={name} 
                style={{marginRight:20}}
            />
            <TextField 
                id="position" 
                label="Position" 
                variant="outlined"
                onChange={onChangePosition}
                defaultValue={position} 
                type="number"
            />
            <IconButton aria-label="delete"  onClick={save}>
                <SaveIcon />
            </IconButton>
        </div>
    )
}

export default Edit
