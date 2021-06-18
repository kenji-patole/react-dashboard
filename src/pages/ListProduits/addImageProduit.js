import React, {useContext, useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { FirebaseContext } from 'components/Firebase'
import { useSnackbar } from 'notistack'
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const extensionIsOk = (extension) => {

    switch (extension) {

        case "image/jpeg":
        case "image/jpg":
        case "image/png":
            return true
            break;
    
        default:
            return false
            break;
    }

}

const affSnackBar = (enqueueSnackbar, msg) => {

    enqueueSnackbar(msg, {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })


}

const AddImageProduit = ({id}) => {

    const { enqueueSnackbar } = useSnackbar()

    const {queryOneProduit, storage} = useContext(FirebaseContext);

    const [loadingImg, setLoadingImg] = useState(false)

    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null)

    const handleClick = event => {
        hiddenFileInput.current.click()
    }


    const add = (e) => {
        
        console.log(e.target.files[0])

        const file = e.target.files[0]

        if(!extensionIsOk(file.type)) {
            affSnackBar(enqueueSnackbar, "Mauvais fichier");
            return;
        }

        console.log('start of upload')
        // async magic goes here...

        const folderImg = `/images/produits/${id}/`; // DOSSIER DE L'IMAGE

        const buckImg = storage.ref(`${folderImg}`).child(file.name)
        
        const uploadTask = buckImg.put(file)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
            setLoadingImg(true)
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
            setLoadingImg(false)
          //catches the errors
          console.log(err)
        }, () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          buckImg.getDownloadURL()
           .then( async fireBaseUrl => {

               await queryOneProduit(id).update({image:fireBaseUrl})
               setLoadingImg(false)

               affSnackBar(enqueueSnackbar, "Is OK")
               console.log(fireBaseUrl)
            //  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
           })
        })

        console.log(file.size/1024/1024 < 1, 'This file size is :' +file.size/1024/1024 + "MiB")

    }

    
    return ( 

        loadingImg ? <CircularProgress color="secondary" /> :
        <div>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={add}
                style={{display:'none'}}
            />
            <IconButton color="primary" aria-label="upload picture" component="span"
                onClick={handleClick}
            >
                <PhotoCamera />
            </IconButton>
        </div>
        
    )
}

export default AddImageProduit
