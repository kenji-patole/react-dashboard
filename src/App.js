import React, { Component, useContext, useEffect, useReducer} from 'react'
import App from 'base-shell/lib'
import MUIConfig from 'material-ui-shell/lib'
import merge from 'base-shell/lib/utils/config'
import _config from './config'
import { FirebaseContext } from 'components/Firebase'

import {changeMenu, loadingMenu} from './Redux/Actions/menu'
import menu from './Redux/Reducers/menu'
import { useDispatch } from 'react-redux'


const config = merge(MUIConfig, _config)



const initMenu = (queryMenus, dispatch) => {

  dispatch( loadingMenu (true)) ;

    queryMenus().onSnapshot(snapshot => {
      let tempListMenu = []

      !snapshot.empty && snapshot.forEach(item => {
  
        tempListMenu.push({id:item.id, ...item.data()})
        
      })

      console.log("tempListMenu", tempListMenu)

      // LES ACTIONS QUI VONT DISPATCHER LES MODIFICATIONS DANS MENU (changeMenu, loadingMenu)
      dispatch( changeMenu (tempListMenu))
      dispatch( loadingMenu (false))

    })

}



  const Demo = () => {

    const {queryMenus} = useContext(FirebaseContext)
    const dispatch = useDispatch()

      useEffect(() => {
        initMenu(queryMenus, dispatch)
        
        console.log("init APP")

      }, [])

    
    return (

        <App config={config} />
      
    )

  }

    

    export default Demo

  

