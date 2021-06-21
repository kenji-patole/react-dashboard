
import {AFF_MODAL_MENU, CHANGE_MENU_DATA, AFF_LOADING_MENU} from '../Actions/types'

// Initialisation du State du Reducer
const initStateMenu = { affModalMenu: false, 
                        data: null,
                        listMenus: [],
                        loadingMenu: false}

const menu = (state = initStateMenu, action) => {

    console.log("reducer Menu", action)
     
    switch (action.type) {

        case AFF_MODAL_MENU:
            return {...state, ...action.payload}
            break;

        case CHANGE_MENU_DATA:
            return {...state, listMenus: action.payload}
            break;
        
        case AFF_LOADING_MENU:
            return {...state, loadingMenu: action.payload}
    
        default:
            return state
            break;
    }

}

export default menu;