import { Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Modal, Typography } from '@mui/material'
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
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', margin: 2 }} >
          <img
            style={{ width: 100, borderRadius: '50%' }}
            src={selected.image}
            alt="image"
          />
        </Box>
        <DialogContent>
          <Box sx={{display:'flex'}}>

          <Typography variant='h4' sx={{flexGrow:1}}>
            {selected.name}
          </Typography>
            <LikeCharact charact={selected} width={width} />
          </Box>
          <Divider />
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>


        </DialogContent>
      </Box>
    </Dialog>
  )
}
