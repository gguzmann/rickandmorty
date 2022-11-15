import React, { useEffect, useState } from 'react'
import { getFavCharacters, removeFavCharacter, setFavCharacter } from '../helpers/storage'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

const LikeCharact = ({charact, width}) => {

    const [like, setLike] = useState([])

    useEffect(() => {
        setLike(getFavCharacters())
    }, [])



    const actionLike = () => {
       if( width < 600)
       {

        const isLike = like.some(x => x.id == charact.id)
        if (isLike) {
            removeFavCharacter(charact)
            setLike(getFavCharacters())
        } else {
            setFavCharacter(charact)
            setLike(getFavCharacters())
        }
       }

    }
    return (
        <>
        <IconButton onClick={actionLike}>
                { like.some(x => x.id == charact.id) ? <FavoriteIcon sx={{ fontSize: 35 }} color='secondary' /> : <FavoriteBorderIcon sx={{ fontSize: 35 }} color='secondary' /> }
        </IconButton>

        </>
    )
}

export default LikeCharact