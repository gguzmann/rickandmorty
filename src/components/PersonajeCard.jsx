import { Card, CardActionArea, CardContent, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/system';
import { getFavCharacters, removeFavCharacter, setFavCharacter } from '../helpers/storage';

export const PersonajeCard = ({ width, charact, handleOpen }) => {
    const [hover, setHover] = useState(false)
    const [like, setLike] = useState([])

    useEffect(() => {
        setLike(getFavCharacters())
    }, [])

    const actionLike = () => {
        const isLike = like.some(x => x.id == charact.id)
        if (isLike) {
            removeFavCharacter(charact)
            setLike(getFavCharacters())
        } else {
            setFavCharacter(charact)
            setLike(getFavCharacters())
        }
    }

    const styleImage = {
        opacity: hover ? .1 : 1,
    }



    return (
        <Card sx={{ display: 'flex', flexGrow: 1, margin: '20px', maxWidth: 250, minWidth: 250 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => {width < 600 && handleOpen(charact)}}>

            
            <Box variant='div' position='relative'>

                <CardMedia
                    component="img"
                    image={charact.image}
                    alt={charact.name}
                    sx={styleImage}

                />
                {
                    hover &&
                    <>
                        <Typography variant='h4' style={{
                            position: 'absolute',
                            top: 8,
                            textAlign: 'center',
                            width: '100%'
                        }} >
                            {charact.name}
                        </Typography>
                        {
                            width > 650 &&
                         <Typography variant='span' style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            marginLeft: 10,
                            display: 'flex'
                        }} >
                            <IconButton onClick={() => actionLike()}>
                                {
                                    like.some(x => x.id == charact.id) ?
                                        <FavoriteIcon sx={{ fontSize: 75 }} color='secondary' />
                                        :
                                        <FavoriteBorderIcon sx={{ fontSize: 75 }} color='secondary' />
                                }
                            </IconButton>
                            <Divider sx={{ borderRight: 'solid' }} />
                            <IconButton onClick={() => handleOpen(charact)}>
                                <OpenInNewIcon sx={{ fontSize: 75, }} />
                            </IconButton>
                        </Typography> 
                        }
                    </>

                }
            </Box>
        </Card>
    )
}
