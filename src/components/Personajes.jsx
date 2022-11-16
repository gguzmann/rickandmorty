import { Box, Pagination, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData } from '../helpers/getData'
import { ModalCharact } from './ModalCharact'
import { PersonajeCard } from './PersonajeCard'

export const Personajes = ({width}) => {

  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState({
    name: '',
    episode: '',
    origin: ''
  })
  const [search, setSearch] = useState({ name: '' })

  useEffect(() => {
    if (search.name == '') {

      getData('/character?page=', page)
        .catch(err => console.log(err))
        .then(resp => {
          setCharacters(resp.results)
          setMaxPage(resp.info.pages)
        })
    } else {
      let status = ''
      fetch('https://rickandmortyapi.com/api/character/?name=' + search.name + '&page=' + page)
        .then(response => {
          status = response.status
          return response.json()
        })
        .catch(err => console.log(err))
        .then(resp => {
          if (status == 200) {

            setCharacters(resp.results)
            setMaxPage(resp.info.pages)
            console.log(resp)
          }

        })
    }
    window.scrollTo(0, 0)
  }, [page])

  const handleChange = (e, value) => {
    setPage(value)
  }

  const handleClose = () => setOpen(false)
  const handleOpen = (select) => {
    setOpen(true)
    setSelected(select)
  }

  // SEARCH
  const searchCharacter = (e) => {
    let status = ''
    setSearch({ name: e.target.value })
    fetch('https://rickandmortyapi.com/api/character/?name=' + e.target.value + '&page=' + page)
      .then(response => {
        status = response.status
        return response.json()
      })
      .catch(err => console.log(err))
      .then(resp => {
        if (status == 200) {

          setCharacters(resp.results)
          setMaxPage(resp.info.pages)
          setPage(1)
          console.log(resp)
        } else {
          setCharacters([])
          setPage(0)
          setMaxPage(0)



        }

      })
  }



  return (
    <>
      <Box variant='div' sx={{ flexGrow: 1, height: '100vh', overflow: 'scroll', paddingBottom: '100px' }} >

        <Box variant='div' display="flex" justifyContent="space-between" alignItems="center" margin={2}>
          <Typography variant='h4' >Personajes</Typography>

          <TextField id="outlined-basic" variant="outlined" value={search.name} onChange={searchCharacter} placeholder="Buscar personaje" />
        </Box>
        <ModalCharact handleClose={handleClose} open={open} selected={selected} width={width}/>
        <Stack display="flex" justifyContent="center" alignItems="center">
          <Pagination count={maxPage} page={page} onChange={handleChange} />
        </Stack>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

          {
            characters.length > 0 ?
              characters.map((charact, i) => <PersonajeCard key={i} width={width} charact={charact} handleOpen={handleOpen} />)
              :
              <Paper sx={{ p: 2 }}> No se encontraron personajes</Paper>
          }
        </Box>


      </Box>
    </>

  )
}
