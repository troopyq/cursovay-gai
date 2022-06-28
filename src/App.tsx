import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AllAccordions from './components/Accordion'
import { LoginPanel } from './components/admin/LoginPanel'
import { Panel } from './components/admin/Panel'
import { Header } from './components/Header'
import { Routers } from './components/Routers'


function App() {

  return (
    <>
    <Routes>
      <Route path='admin' element={<LoginPanel />}/>
      <Route path='panel' element={<Panel />}/>
      <Route path='*' element={<Routers />}/>
    </Routes>
    
    </>
  )
}

export default App
