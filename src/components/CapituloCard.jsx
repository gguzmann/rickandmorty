import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Button, Paper, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getFavEpisodes, removeFavEpisode, setFavEpisode } from '../helpers/storage';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

export const CapituloCard = ({ capitulo }) => {

  const [like, setLike] = useState([])
  const seasson = capitulo.episode[2]
  const episode = capitulo.episode.split('').slice(4, 6).join("")
  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    setLike(getFavEpisodes())
  }, [])


  const actionLike = () => {
    if (like.some(x => x.id == capitulo.id)) {
      removeFavEpisode(capitulo)
      setLike(getFavEpisodes())
    } else {
      setFavEpisode(capitulo)
      setLike(getFavEpisodes())
    }
  }

  const getPersonajesEpisodes = (cap) => {
    const charactersId = cap.characters.map(x => {
      const id = x.split('/')
      return id[id.length - 1]
    })

    fetch('https://rickandmortyapi.com/api/character/' + charactersId)
      .then(response => response.json())
      .then(resp => {
        setPersonajes(resp)
      })

  }

  return (
    <Accordion sx={{ marginBottom: 1 }} onClick={() => { getPersonajesEpisodes(capitulo) }}>

      <Box variant='div' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
        <AccordionSummary sx={{ flexGrow: 1 }}>
          <Typography>
            {seasson} x {episode} | {capitulo.name}
          </Typography>
        </AccordionSummary>
        <IconButton onClick={() => actionLike(capitulo)}>
          {like.some(x => x.id == capitulo.id) ? <FavoriteIcon color='secondary' /> : <FavoriteBorderIcon color='secondary' />}
        </IconButton>
      </Box>
      <Paper elevation={8} >
        <AccordionDetails>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ab labore tempora tenetur, error, iure modi consequatur assumenda natus, sequi sapiente sunt voluptate libero unde blanditiis mollitia? Eum, tempore voluptatibus.
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', mt: 2 }}>

            <Tooltip title={
              <>
                {
                  personajes.length > 0 &&
                  personajes.map((x, i) => <img
                    key={i}
                    style={{ width: 30, borderRadius: '50%' }}
                    src={x.image}
                    alt="image"
                  />)
                }
              </>
            }>
              <Button variant='outlined' color='success' sx={{display:'flex',gap:1}}>

                <GroupsRoundedIcon />
                <Typography variant='span'>{personajes.length}</Typography>
              </Button>
            </Tooltip>
            <Typography sx={{ margin: 1, fontSize: 12, fontWeight: '', fontStyle: 'italic' }}> - {capitulo.air_date}</Typography>
          </Box>
        </AccordionDetails>
      </Paper>
    </Accordion>
  )
}
