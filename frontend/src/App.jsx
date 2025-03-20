import React from 'react'
import Navbar from './components/NabBar'
import NavRoutes from './routes/NavRoutes'
import Footer from './pages/Footer'
const App = () => {
  return (
    <>
     {/* Nav bar */}
     <Navbar />

     {/* Nav Routes */}
     <NavRoutes />


     {/* Footer */}
     {/* <Footer /> */}
    </>
  )
}

export default App