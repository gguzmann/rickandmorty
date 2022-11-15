import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, createTheme, CssBaseline, Fab, IconButton, Paper, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { Outlet, useNavigate } from 'react-router-dom'
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DvrIcon from '@mui/icons-material/Dvr';
import ScrollToTop from "react-scroll-to-top";

export const Navbar = ({width}) => {


    const navigate = useNavigate()
    const [modeDark, setModeDark] = useState(true)

    const darkMode = createTheme({
        palette: {
            mode: modeDark ? 'dark' : 'light'
        }
    })
    return (
        <Box variant='div' sx={{ height: '100vh', overflow: 'hidden' }}>
            <ThemeProvider theme={darkMode}>
                <CssBaseline />
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h5' sx={{ flexGrow: 1 }}>
                            Rick And Mortys
                        </Typography>
                        {
                            width > 650 &&
                            <>
                                <Button color="inherit" onClick={() => navigate('personajes')}>Personajes</Button>
                                <Button color="inherit" onClick={() => navigate('capitulos')}>Capitulos</Button>
                                <Button color="inherit" onClick={() => navigate('favoritos')}>Favoritos</Button>
                                <ScrollToTop color="inherit" smooth />

                            </>
                            // :
                            // <IconButton>
                            //     <MenuIcon />
                            // </IconButton>

                        }
                        
                        <IconButton color="inherit" onClick={() => setModeDark(!modeDark)}>
                            {
                                modeDark ?
                                    <Brightness5Icon />
                                    :
                                    <Brightness2Icon />

                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Outlet />
                
                {
                    width < 650 &&
                    <Paper variant='outlined' sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
                        <BottomNavigation>
                            <BottomNavigationAction onClick={() => navigate('personajes')} label="Personajes" icon={<GroupIcon />} />
                            <BottomNavigationAction onClick={() => navigate('capitulos')} label="Capitulos" icon={<DvrIcon />} />
                            <BottomNavigationAction onClick={() => navigate('favoritos')} label="Favoritos" icon={<FavoriteIcon />} />
                        </BottomNavigation>
                    </Paper>
                }

            </ThemeProvider>
        </Box>
    )
}
