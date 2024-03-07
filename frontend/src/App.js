import React from 'react'
import Header from './Components/Header'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import Error from './Components/Error'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/*' element={<Error/>} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App