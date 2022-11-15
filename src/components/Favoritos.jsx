import { Box, IconButton, List, ListItemButton, ListSubheader, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getFavCharacters, getFavEpisodes, removeFavCharacter, removeFavEpisode } from '../helpers/storage'
import FavoriteIcon from '@mui/icons-material/Favorite';


export const Favoritos = () => {
  const [seccion, setSeccion] = useState("0")
  const characters = getFavCharacters()
  const [favoritos, setFavoritos] = useState(characters)
  const episodes = getFavEpisodes()

  const handleChange = (e, value) => {
    if (value == null) return
    setSeccion(value)
    console.log(value)
    value == 1 ? setFavoritos(episodes) : setFavoritos(characters)
  }

  const handleClick = (item) => {
    seccion == "1" ? removeFavEpisode(item) : removeFavCharacter(item)
    seccion == "1" ? setFavoritos(getFavEpisodes()) : setFavoritos(getFavCharacters())
    console.log(item)

  }

  return (
    <>
      <Box variant='div' sx={{ flexGrow: 1, height: '100vh', overflow: 'scroll', paddingBottom: '100px' }}  >
        <Box variant='div' display="flex" justifyContent="space-between" alignItems="center" gap={2} margin={2}>

          <Typography variant='h4' >Favoritos</Typography>
          <ToggleButtonGroup
            color="primary"
            value={seccion}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton variant="outlined" value="0">Personajes</ToggleButton >
            <ToggleButton variant="outlined" value="1">Capitulos</ToggleButton >
          </ToggleButtonGroup>
        </Box>
        <List sx={{ mx: '15%' }} >

          {
            favoritos.length > 0 ?
              favoritos.map((x, i) => (
                <Paper elevation={4} key={i} sx={{}}>
                  <ListItemButton sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }} key={i} onClick={() => handleClick(x)} >
                    <Box variant='div' sx={{display: 'flex', alignItems: 'center', gap: 2}}>

                      {seccion == 0 ?
                      <img
                        key={i}
                        style={{ width: 50, borderRadius: '50%' }}
                        src={x.image}
                        alt="image"
                        />
                      :
                      <Typography>{x.episode[2]} x {x.episode.split('').slice(4,6).join("")} |</Typography>
                      }
                        {x.name}
                    </Box>
                    <IconButton >
                      <FavoriteIcon />
                    </IconButton>
                  </ListItemButton>
                </Paper>
              ))
              :
              <Paper sx={{ p: 2 }}>
                <Typography>No hay {seccion == "1" ? "capitulos" : "personajes"} en favoritos</Typography>
              </Paper>
          }
        </List>
      </Box>
    </>
  )
}
