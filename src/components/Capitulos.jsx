import { Accordion, AccordionDetails, AccordionSummary, Box, List, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllEpisodes, getData } from '../helpers/getData'
import { CapituloCard } from './CapituloCard'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
export const Capitulos = () => {

  const [listEpisodes, setListEpisodes] = useState([])
  const [allEpisodes, setAllEpisodes] = useState([])
  const [select, setSelect] = useState(0)

  useEffect(() => {
    getAllEpisodes()
      .catch(err => console.log(err))
      .then(resp => {
        console.log(resp)
        setAllEpisodes(resp)
        setListEpisodes(resp)
      })

  }, [])



  const handleChange = (e) => {
    setSelect(e.target.value)
    let newArr = allEpisodes.filter(x => x.episode[2] == e.target.value)
    if (e.target.value == 0) newArr = allEpisodes
    setListEpisodes(newArr)
  }

  return (
    <>
      <Box variant='div' sx={{ flexGrow: 1, height: '100vh', overflow: 'scroll', paddingBottom: '100px' }}  >
        <Box variant='div' display="flex" justifyContent="space-between" alignItems="center" gap={2} margin={2}>
          <Typography variant='h4' >Capitulos</Typography>

        <Select sx={{ width: '200px' }} onChange={handleChange} value={select} placeholder='Temporada'>
          <MenuItem value={0}>Todos los capitulos</MenuItem>
          <MenuItem value={1}>Temporada 1</MenuItem>
          <MenuItem value={2}>Temporada 2</MenuItem>
          <MenuItem value={3}>Temporada 3</MenuItem>
          <MenuItem value={4}>Temporada 4</MenuItem>
          <MenuItem value={5}>Temporada 5</MenuItem>
        </Select>
        </Box>


        <Box sx={{ mt: 1, mx: '15%' }}>
          {
            listEpisodes.map((x, i) => <CapituloCard key={i} capitulo={x} />)
          }
        </Box>
      </Box>
    </>
  )
}
