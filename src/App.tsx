import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import AllAccordions from './components/Accordion'
import { Header } from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Container>
      <Grid>
        <AllAccordions />
      </Grid>
    </Container>
    </>
  )
}

export default App
