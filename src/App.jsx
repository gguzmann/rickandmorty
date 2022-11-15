import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Capitulos } from './components/Capitulos'
import { Favoritos } from './components/Favoritos'
import { Navbar } from './components/Navbar'
import { Personajes } from './components/Personajes'

const App = () => {

    const [width, setWidth] = useState(window.innerWidth)

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        console.log(width)
        window.addEventListener('resize', handleWindowSizeChange);
        // return () => {
        //     window.removeEventListener('resize', handleWindowSizeChange);
        // }
    }, []);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar width={width} />,
        errorElement: <h1>Error</h1>,
        children: [
            {
                path: '/',
                element: <Personajes width={width}/>
            },
            {
                path: 'personajes',
                element: <Personajes width={width}/>
            },
            {
                path: 'capitulos',
                element: <Capitulos/>
            },
            {
                path: 'favoritos',
                element: <Favoritos/>
            },
        ]
    }
])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App