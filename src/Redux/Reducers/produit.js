
import {AFF_MODAL_PRODUIT} from '../Actions/types'

// Initialisation du State du Reducer
const initStateProduit = {affModalProduit: false, 
                        data: null}

const produit = (state = initStateProduit, action) => {

    console.log("reducer Produit", state, action)
     
    switch (action.type) {

        case AFF_MODAL_PRODUIT:
            return action.payload
            break;
    
        default:
            return state
            break;
    }

}

export default produit;