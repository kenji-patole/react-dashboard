import {AFF_MODAL_MENU, CHANGE_MENU_DATA, AFF_LOADING_MENU} from './types'

// DONNÉES RETOURNÉES (payload)
export const affMenu = (payload) => ({
    type : AFF_MODAL_MENU,
    payload
}) ;

export const changeMenu = (payload) => ({
    type : CHANGE_MENU_DATA,
    payload
}) ;

export const loadingMenu = (payload) => ({
    type : AFF_LOADING_MENU,
    payload
});





