import React from 'react'
import Navbar from './components/NabBar'
import NavRoutes from './routes/NavRoutes'

const App = () => {
  return (
    <>
     {/* Nav bar */}
     <Navbar />

     {/* Nav Routes */}
     <NavRoutes />
    </>
  )
}

export default App