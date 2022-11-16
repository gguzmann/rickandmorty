import { Dialog, DialogContent, Divider, List, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import LikeCharact from './LikeCharact'

export const ModalCharact = ({ handleClose, open, selected, width }) => {



  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box variant='div' sx={{ display: 'flex' }}>
        {
          width > 600 &&
          <Box variant='div' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: 2 }} >
            <img
              style={{ width: 100, borderRadius: '50%' }}
              src={selected.image}
              alt="image"
            />

          </Box>
        }
        <DialogContent>

          <Box variant='div' sx={{ display: 'flex', alignItems: 'center' }}>

            <Typography variant='h4' sx={{ flexGrow: 1, textAlign: 'center' }}>
              {selected.name}
            </Typography>
            {
              width < 600 &&
              <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                <img
                  style={{ width: 100, borderRadius: '50%' }}
                  src={selected.image}
                  alt="image"
                />
              </Box>
            }
          </Box>
          <Divider />

          <List sx={{ display: 'flex' }}>
            <Box variant='div'>

              <ListItem> Status: {selected.status} </ListItem>
              <ListItem> Especie: {selected.species} </ListItem>
              <ListItem >Origin: {selected.origin ? selected.origin.name : "no definido"}</ListItem>
            </Box>
            <Box variant='div'>

              <ListItem >Genero: {selected.gender}</ListItem>
              <ListItem >Tipo: {selected.type != "" ? selected.type : "No definido"}</ListItem>
              <ListItem >Apariciones: {selected.episode.length} capitulos</ListItem>
            </Box>
          </List>

          {width < 600 && <Box sx={{ display: 'flex', justifyContent: 'end' }}><LikeCharact charact={selected} width={width} /></Box>}


        </DialogContent>
      </Box>
    </Dialog>
  )
}
