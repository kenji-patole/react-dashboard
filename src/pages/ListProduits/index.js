import React, {useReducer, useContext, useState, useEffect, Fragment} from 'react'
import Page, { ListPage } from 'material-ui-shell/lib/containers/Page'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { useIntl } from 'react-intl'
import { FirebaseContext } from '../../components/Firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddImageProduit from './addImageProduit'
import DeleteButtonProduit from './deleteButtonProduit'
import Avatar from '@material-ui/core/Avatar';
import list from './data.json'
// import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import EditModalProduit from './editModalProduit'
import { DescriptionOutlined } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import {useSelector, useDispatch} from 'react-redux';
import {affProduit} from '../../Redux/Actions/produit';

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
    name: 'description',
    label: 'Description',
  },
  {
    name: 'price',
    label: 'Price',
  },


]

const Row = ({ index, style, data }) => {

  // LIRE LES DONNÉES DU REDUCER
  const {produit : {affModalProduit}} = useSelector(state => state) 
  console.log(affModalProduit)

  const dispatchProduit = useDispatch()
  
  const { id, name, description = '', price, dateAdd, image } = data

  const openEdit = () => {
    dispatchProduit(
      affProduit({affModalProduit: !affModalProduit, data})
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
          primary={`${name}  Prix: ${price}`}
          secondary={` ${description} `}
        /> 
        <IconButton aria-label="delete" onClick={openEdit}>
              <DescriptionOutlined fontSize="large"/>
          </IconButton>
        <AddImageProduit id={id}/>
        <DeleteButtonProduit id={id}/>
      </ListItem>
      <Divider />
    </div>
  )

}

const PageListProduits = ({listProduits}) => {
  const intl = useIntl()

  return (
    <ListPage
      name="list_produits"
      list={listProduits}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 91 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'list_page_produits',
              defaultMessage: 'List Produits {count} rows',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}

const InfoChargement = ({Message, Loading}) => {

  // console.log(Message, Loading)

  const intl = useIntl()

    return (
      <Page pageTitle={intl.formatMessage({ 
          id: 'Loading',
          defaultMessage: Message})}>
        {
          Loading ? <CircularProgress color="secondary" /> :
          <span>Pas de produits</span>
        }
        
      </Page>
    )

}

const ListProduits = () => {

  const {queryProduits} = useContext(FirebaseContext)

  const [listProduits, setProduits] = useState([])
  const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)

      const unsubQuery = queryProduits().onSnapshot(snapshot => {
          console.log("snapshot type",snapshot, snapshot.type)

          let tempListProduits = []

          !snapshot.empty && snapshot.forEach(item => {

            tempListProduits.push({id:item.id, ...item.data()})
            
          })

          setTimeout(() => {
            setLoading(false)
            setProduits(tempListProduits)
          }, 1000)

      })

    
      return () => {
        unsubQuery()
      }

    }, [])

  return (

    <Fragment>

      <EditModalProduit/>

      {!loading && listProduits.length>0 ? <PageListProduits listProduits={listProduits}/> :
          <InfoChargement 
            Message="Loading"
            Loading={loading}
          />
      }

    </Fragment>

  )

}

export default React.memo(ListProduits);

