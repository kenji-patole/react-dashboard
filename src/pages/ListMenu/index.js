import React, {useReducer, useContext, useState, useEffect, Fragment} from 'react'
import Page, { ListPage } from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { useIntl } from 'react-intl'
import { FirebaseContext } from '../../components/Firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteButton from './deleteButton'
import AddImage from './addImage'
import Avatar from '@material-ui/core/Avatar';
import Edit from './edit'
import EditModal from './EditModal'
import { DescriptionOutlined } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import {useSelector, useDispatch} from 'react-redux';
import {affMenu} from '../../Redux/Actions/menu';


/*
import list from './data.json'
import { IconButton } from '@material-ui/core'
import { Add, ChangeHistory, MenuBookSharp } from '@material-ui/icons'
*/

const fields = [
  {
    name: 'id',
    label: 'Id',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'position',
    label: 'Position',
  },
  
]

const Row = ({ index, style, data }) => {

    // LIRE LES DONNÉES DU REDUCER
    const {menu : {affModalMenu}} = useSelector(state => state) 
   
    const dispatchMenu = useDispatch()

    const { id, name, position = '', image } = data

    const openEdit = () => {
      dispatchMenu(
        affMenu({affModalMenu: !affModalMenu, data})
      )
    }

  return (
    <div key={`${id}`} style={style}>
      <ListItem alignItems="flex-start">
        {
          (image !== 'nc' && image !== undefined) && <Avatar alt={name} src={image} style={{
            marginRight:15
          }}/>
        }
  
          <ListItemText
            primary={`${name} ${position}`}
          />
          <IconButton aria-label="delete" onClick={openEdit}>
              <DescriptionOutlined fontSize="large"/>
          </IconButton>
        
        <AddImage id={id}/>
        <DeleteButton id={id}/>
      </ListItem>
      <Divider />
    </div>
  )
}


const PageListMenu = ({listMenu}) => {

  const intl = useIntl()

    return (
      <ListPage
        name="list_menu"
        list={listMenu}
        fields={fields}
        Row={Row}
        listProps={{ itemSize: 91 }}
        getPageProps={(list) => {
          return {
            pageTitle: intl.formatMessage(
              {
                id: 'list_page_menu',
                defaultMessage: 'List Menu {count} rows',
              },
              { count: list.length }
            ),
          }
        }}
      />
    )

}

const InfoChargement = ({Message, Loading}) => {

  const intl = useIntl()

    return (
      <Page pageTitle={intl.formatMessage({ 
          id: 'Loading',
          defaultMessage: Message})}>
        {
          Loading ? <CircularProgress color="secondary" /> :
          <span>Pas de menu</span>
        }
        
      </Page>
    )

}

const ListMenu = () => {

    const {menu: {listMenus, loadingMenu}} = useSelector(state => state) 
    console.log(listMenus)

  return (
    
    <Fragment>
      <EditModal/>

      {!loadingMenu && listMenus.length>0 ? <PageListMenu listMenu={listMenus}/> :
          <InfoChargement 
            Message="Loading"
            Loading={loadingMenu}
          />
      }
     
    </Fragment>
       
  )

}

export default ListMenu
