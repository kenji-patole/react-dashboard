import {AFF_MODAL_PRODUIT} from './types'

// DONNÉES RETOURNÉES (payload)
export const affProduit = (payload) => ({
    type : AFF_MODAL_PRODUIT,
    payload
}) ;