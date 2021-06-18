
import {AFF_MODAL_MENU} from '../Actions/types'

// Initialisation du State du Reducer
const initStateMenu = {affModalMenu: false, 
                        data: null}

const menu = (state = initStateMenu, action) => {

    console.log("reducer Menu", state, action)
     
    switch (action.type) {

        case AFF_MODAL_MENU:
            return action.payload
            break;
    
        default:
            return state
            break;
    }

}

export default menu;